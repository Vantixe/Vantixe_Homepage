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
  'sourcing-agent': 'Sourcing Agent: Quote Negotiation',
  'category-strategy': 'Category Strategy (mid-2026)',
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

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
  return Boolean(data.success)
}

export async function POST(req: NextRequest) {
  let payload: Payload
  try {
    payload = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: silently accept (200) so bots think they succeeded, but don't send.
  if (payload.website && payload.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  // Validate required fields
  const intent = String(payload.intent || '').trim()
  const name = String(payload.name || '').trim()
  const company = String(payload.company || '').trim()
  const email = String(payload.email || '').trim()
  const message = String(payload.message || '').trim()

  if (!intent || !INTENT_LABELS[intent]) {
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
  if (intent === 'demo' && !(payload.product && PRODUCT_LABELS[String(payload.product)])) {
    return NextResponse.json({ error: 'Please choose which product you’d like to see.' }, { status: 400 })
  }

  // Turnstile verification (only if configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecret) {
    const token = String(payload.turnstileToken || '')
    if (!token) {
      return NextResponse.json({ error: 'Please complete the verification challenge.' }, { status: 400 })
    }
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined
    const ok = await verifyTurnstile(token, turnstileSecret, ip)
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
  const productLabel = payload.product ? PRODUCT_LABELS[String(payload.product)] : null
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
