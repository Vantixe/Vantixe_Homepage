import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const INTENT_LABELS: Record<string, string> = {
  quote: 'Quote / proposal request',
  callback: 'Callback request',
  demo: 'Product demo request',
  general: 'General inquiry',
  press: 'Speaking / press',
}

const PRODUCT_LABELS: Record<string, string> = {
  tprm: 'TPRM: Third-Party Risk Management',
  'sourcing-agent': 'Autonomous Sourcing and Negotiation',
  'category-strategy': 'Category Strategy: Guided Strategy Platform',
  all: 'The full platform',
}

interface Payload {
  intent?: string
  product?: string | null
  name?: string
  company?: string
  email?: string
  phone?: string | null
  country?: string | null
  companySize?: string | null
  message?: string
  preferredTime?: string | null
  subscribe?: boolean
  website?: string // honeypot
  turnstileToken?: string
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function verifyTurnstile(token: string, secret: string, remoteIp?: string) {
  const body = new URLSearchParams()
  body.append('secret', secret)
  body.append('response', token)
  if (remoteIp) body.append('remoteip', remoteIp)

  // Bounded: without a timeout a degraded verification service holds a request
  // slot for minutes on a single-instance container. Throwing here fails the
  // submission closed, which is the safe direction.
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
    signal: AbortSignal.timeout(5000),
  })
  const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
  return Boolean(data.success)
}

/** Best-effort client address. Cloudflare's header first when it is in front. */
function clientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

/**
 * In-process submission limit.
 *
 * Every accepted submission sends mail from a verified domain to the single
 * lead inbox, so unchecked volume costs money, buries real enquiries and puts
 * the sending domain's reputation at risk. Vercel's plan cap used to be a crude
 * backstop; a usage-metered host has none, so the limit has to live here.
 *
 * One instance serves the site, so in-memory is sufficient and needs no
 * dependency. It resets on deploy, which is acceptable: this exists to stop
 * sustained scripted abuse, not to be an audit record.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_PER_IP = 5
/**
 * Shared hourly ceiling. Deliberately far above real enquiry volume: it is a
 * runaway backstop, not a live control.
 *
 * It must never be cheap to fill, because a full bucket closes the form for
 * everyone, and the form is the site's only conversion path under paid ads. So
 * the counter is incremented only for submissions that have already passed the
 * bot check (see recordSend), which prices a denial-of-service at one solved
 * challenge per slot instead of one empty POST per slot.
 */
const RATE_GLOBAL_PER_HOUR = Number(process.env.CONTACT_GLOBAL_HOURLY_LIMIT || 20)
const ipHits = new Map<string, number[]>()
let globalHits: number[] = []
let warnedUnknownIp = false
let warnedGlobalCeiling = 0

/**
 * Read-only check, run early so an abusive caller is refused cheaply.
 * Nothing is counted here: see recordSend.
 */
function rateLimited(ip: string): false | 'ip' | 'global' {
  const now = Date.now()

  globalHits = globalHits.filter((t) => now - t < 60 * 60 * 1000)
  if (globalHits.length >= RATE_GLOBAL_PER_HOUR) {
    // Silence here would make a site-wide outage invisible, so say it, at most
    // once a minute to avoid drowning the log.
    if (now - warnedGlobalCeiling > 60_000) {
      warnedGlobalCeiling = now
      console.error(`[contact] global hourly ceiling of ${RATE_GLOBAL_PER_HOUR} reached: the form is refusing every visitor until it drains`)
    }
    return 'global'
  }

  // An unresolvable address would otherwise put every visitor in one bucket and
  // throttle the whole world to a handful of messages, indistinguishable from
  // working. Skip the per-IP limit instead, and say so once.
  if (ip === 'unknown') {
    if (!warnedUnknownIp) {
      warnedUnknownIp = true
      console.error('[contact] no client address on the request: the per-visitor rate limit is inactive, only the global ceiling applies')
    }
    return false
  }

  const recent = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_PER_IP) {
    ipHits.set(ip, recent)
    return 'ip'
  }
  return false
}

/**
 * Count one accepted submission. Called only after the bot check has passed and
 * immediately before the mail is sent, so a rejected or unverified request
 * cannot spend either budget. Counting attempts rather than sends would let
 * three mistyped fields lock a real visitor out for ten minutes.
 */
function recordSend(ip: string): void {
  const now = Date.now()
  globalHits.push(now)
  if (ip === 'unknown') return

  const recent = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  ipHits.set(ip, recent)

  // Keep the map from growing without bound on a long-lived process.
  if (ipHits.size > 5000) {
    for (const [key, times] of ipHits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) ipHits.delete(key)
    }
  }
}

export async function POST(req: NextRequest) {
  let payload: Payload
  try {
    payload = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: silently accept (200) so bots think they succeeded, but don't send.
  // Checked before the rate limit on purpose: a bot filling the honeypot must
  // not be able to spend the budget that real visitors share.
  if (payload.website && payload.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const ip = clientIp(req)
  const limited = rateLimited(ip)
  if (limited) {
    return NextResponse.json(
      {
        error:
          limited === 'global'
            ? 'We are receiving an unusual number of messages right now. Please email hello@vantixe.com and we will pick it up straight away.'
            : 'Too many messages from this connection. Please try again shortly, or email hello@vantixe.com.',
      },
      { status: 429 }
    )
  }

  // Validate required fields
  const intent = String(payload.intent || '').trim()
  const name = String(payload.name || '').trim()
  const company = String(payload.company || '').trim()
  const email = String(payload.email || '').trim()
  const message = String(payload.message || '').trim()

  if (!intent || !Object.hasOwn(INTENT_LABELS, intent)) {
    return NextResponse.json({ error: 'Please choose what we can help with.' }, { status: 400 })
  }
  if (!name || !company || !email || !message) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long (5,000 character max).' }, { status: 400 })
  }
  if (intent === 'callback' && !(payload.phone && String(payload.phone).trim())) {
    return NextResponse.json({ error: 'Phone number is required for a callback.' }, { status: 400 })
  }
  if (intent === 'demo' && !(payload.product && Object.hasOwn(PRODUCT_LABELS, String(payload.product)))) {
    return NextResponse.json({ error: 'Please choose which product you’d like to see.' }, { status: 400 })
  }

  // Turnstile verification. This endpoint never sends mail without a verified
  // token unless someone has explicitly said otherwise.
  //
  // The condition is deliberately keyed on RUNTIME variables only. An earlier
  // version guarded on NEXT_PUBLIC_TURNSTILE_SITE_KEY, which Next replaces with
  // a literal at build time: built without that variable, the whole guard was
  // dead code and eliminated from the bundle, so the endpoint silently reverted
  // to sending unverified mail. That is precisely the state a fresh deployment
  // with a missed build variable produces, which made the guard absent exactly
  // when it was needed. Verified by grepping the compiled output of two builds.
  //
  // ALLOW_UNVERIFIED_CONTACT=1 is the explicit opt-out, for local development
  // and for a deployment that has deliberately chosen honeypot-only protection.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (!turnstileSecret && process.env.ALLOW_UNVERIFIED_CONTACT !== '1') {
    console.error('[contact] TURNSTILE_SECRET_KEY is not set: refusing to accept submissions unverified (set ALLOW_UNVERIFIED_CONTACT=1 to allow honeypot-only protection)')
    return NextResponse.json(
      { error: 'The form is temporarily unavailable. Please email hello@vantixe.com.' },
      { status: 500 }
    )
  }
  // The mirror mistake: a secret configured but no public key, so no widget ever
  // renders and every submission fails the token check with nothing in the log.
  if (turnstileSecret && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    console.error('[contact] TURNSTILE_SECRET_KEY is set but NEXT_PUBLIC_TURNSTILE_SITE_KEY was missing at build time: the widget cannot render, so every submission will be rejected')
  }
  if (turnstileSecret) {
    const token = String(payload.turnstileToken || '')
    if (!token) {
      return NextResponse.json({ error: 'Please complete the verification challenge.' }, { status: 400 })
    }
    const ok = await verifyTurnstile(token, turnstileSecret, ip === 'unknown' ? undefined : ip)
    if (!ok) {
      return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 400 })
    }
  }

  // Send email via Resend
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not configured')
    return NextResponse.json({ error: 'Email is not configured on the server.' }, { status: 500 })
  }

  const from = process.env.CONTACT_FROM_EMAIL || 'Vantixe <contact@vantixe.com>'
  const to = process.env.CONTACT_TO_EMAIL || 'hello@vantixe.com'

  const intentLabel = INTENT_LABELS[intent]
  const productLabel =
    payload.product && Object.hasOwn(PRODUCT_LABELS, String(payload.product))
      ? PRODUCT_LABELS[String(payload.product)]
      : null
  const subjectBits = [intentLabel, company].filter(Boolean).join(' / ')

  const rows: [string, string | null | undefined][] = [
    ['Intent', intentLabel],
    ['Product', productLabel],
    ['Name', name],
    ['Company', company],
    ['Email', email],
    ['Phone', payload.phone ? String(payload.phone) : null],
    ['Country', payload.country ? String(payload.country) : null],
    ['Company size', payload.companySize ? String(payload.companySize) : null],
    ['Preferred time', payload.preferredTime ? String(payload.preferredTime) : null],
    ['Subscribe to insights', payload.subscribe ? 'Yes' : 'No'],
  ]

  const htmlRows = rows
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5C677D;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 0;color:#001219;font-size:14px;">${escapeHtml(String(v))}</td></tr>`,
    )
    .join('')

  const html = `
<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,sans-serif;background:#F8F9FA;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #eee;">
    <h2 style="margin:0 0 4px;color:#001219;font-size:20px;">New inquiry: ${escapeHtml(intentLabel)}</h2>
    <p style="margin:0 0 24px;color:#5C677D;font-size:14px;">via vantixe.com contact form</p>
    <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
    <h3 style="margin:24px 0 8px;color:#001219;font-size:15px;">Message</h3>
    <div style="white-space:pre-wrap;color:#001219;font-size:14px;line-height:1.6;padding:16px;background:#F8F9FA;border-radius:8px;border:1px solid #eee;">${escapeHtml(message)}</div>
  </div>
</body></html>`.trim()

  const text =
    rows
      .filter(([, v]) => v != null && String(v).trim() !== '')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n') + `\n\nMessage:\n${message}\n`

  // Count the submission only now: it has passed the honeypot, validation and
  // the bot check, so a slot costs an attacker a solved challenge rather than
  // an empty POST.
  recordSend(ip)

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Vantixe] ${subjectBits}`,
      html,
      text,
    })
    if (result.error) {
      console.error('[contact] Resend error:', result.error)
      return NextResponse.json({ error: 'Could not send your message. Please email hello@vantixe.com.' }, { status: 502 })
    }
  } catch (err) {
    console.error('[contact] Resend exception:', err)
    return NextResponse.json({ error: 'Could not send your message. Please email hello@vantixe.com.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
