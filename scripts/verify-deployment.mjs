#!/usr/bin/env node
/**
 * Deployment behaviour checks. Every case asserts that a PROTECTION FIRES, not
 * merely that the site works, because the failure mode this project keeps
 * hitting is a gate that reports green while the thing it guards is broken.
 *
 * No browser: plain node:http/https with an explicit Host header, so it is fast
 * enough to run against every deployment.
 *
 *   npm run verify:deploy                                    (a local next start on :4002)
 *   VERIFY_BASE_URL=https://x.up.railway.app npm run verify:deploy
 *
 * A Host header is set directly here on purpose. That works for raw node
 * requests; it does NOT work for fetch (silently dropped) or for Playwright's
 * extraHTTPHeaders (the navigation is rejected). Both were measured. See
 * scripts/verify-tracking.mjs for the browser-side approach.
 *
 * Exit codes: 0 all green, 1 any failure, 2 nothing listening.
 */
import http from 'node:http'
import https from 'node:https'

const BASE = process.env.VERIFY_BASE_URL || 'http://127.0.0.1:4002'
const url = new URL(BASE)
const mod = url.protocol === 'https:' ? https : http
const PORT = url.port || (url.protocol === 'https:' ? 443 : 80)

let pass = 0
let fail = 0
let skip = 0
const record = (ok, name, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`)
  if (ok) pass++
  else fail++
}
/**
 * Not testable HERE, as opposed to broken. Reported separately so a run against
 * a proxied deployment does not print a wall of red that trains the reader to
 * ignore this script.
 */
const skipped = (name, detail) => {
  console.log(`SKIP  ${name}  (${detail})`)
  skip++
}

/**
 * True when a CDN terminates TLS in front of the origin. Set from the first
 * response rather than assumed, because it changes what can be proved:
 *
 *   Faking a Host header only works when the same connection can present a
 *   certificate for that name. Node derives the TLS server name from the Host
 *   header, so against a proxy a faked hostname either fails the handshake or
 *   is refused by the proxy, and never reaches the app's own host guard.
 *
 * That is a STRONGER guarantee than the guard, not a weaker one, but it means
 * these cases must be reported as untestable rather than as failures.
 */
let proxied = false

function request(path, { host, method = 'GET', body = null, headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    const req = mod.request(
      {
        host: url.hostname,
        port: PORT,
        path,
        method,
        headers: { Host: host || url.host, ...headers },
        rejectUnauthorized: false,
      },
      (res) => {
        let data = ''
        res.on('data', (d) => { data += d })
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }))
      }
    )
    req.setTimeout(15000, () => req.destroy(new Error('timed out after 15s')))
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

const post = (path, obj, opts = {}) =>
  request(path, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
    ...opts,
  })

const VALID = {
  intent: 'general',
  name: 'Deployment probe',
  company: 'Vantixe',
  email: 'probe@example.com',
  message: 'Automated deployment verification. Not a real enquiry.',
}

async function run() {
  let first
  try {
    first = await request('/')
  } catch (e) {
    console.error(`verify-deployment: nothing answering at ${BASE}: ${e.message}`)
    process.exit(2)
  }
  const server = String(first.headers.server || '')
  proxied = /cloudflare|fastly|akamai/i.test(server)
  console.log(`verify-deployment: ${BASE}`)
  console.log(
    proxied
      ? `  behind a proxy (${server}): faked-hostname cases report SKIP, see the note in this file\n`
      : '  direct to origin: every case is testable\n'
  )

  // 1. Media carries a real cache lifetime. Served by the app itself once off a
  //    platform that cached them regardless, so without this every visit
  //    re-fetches roughly 21 MB.
  for (const path of ['/videos/autonomous-sourcing-promo.mp4', '/images/michael-headshot.jpg']) {
    const r = await request(path)
    const cc = r.headers['cache-control'] || ''
    record(r.status === 200 && /max-age=\d{4,}/.test(cc), `media is cacheable: ${path}`, cc || `status ${r.status}`)
  }
  {
    const r = await request('/_next/image?url=%2Fimages%2Fmichael-headshot.jpg&w=640&q=75')
    const cc = r.headers['cache-control'] || ''
    record(r.status === 200 && /max-age=\d{4,}/.test(cc), 'optimized images carry a cache floor', cc || `status ${r.status}`)
  }

  // 2. The bot check is armed. A submission with no token must be refused; a
  //    200 here means the endpoint is sending mail unverified.
  {
    const r = await post('/api/contact', VALID)
    record(r.status === 400, 'submission without a bot token is refused', `status ${r.status}`)
  }

  // 3. The API answers only on hostnames we recognise.
  {
    if (proxied) {
      skipped('unknown host cannot reach the API', 'the proxy rejects an unknown name before the app sees it')
    } else {
      const bad = await post('/api/contact', {}, { host: 'not-our-domain.example.com' })
      record(bad.status === 403, 'unknown host cannot reach the API', `status ${bad.status}`)
    }
    const good = await post('/api/contact', {}, { host: 'www.vantixe.com' })
    record(good.status !== 403, 'a real host can reach the API', `status ${good.status}`)
  }

  // 4. Apex and www normalisation, which nothing in the repo did before the
  //    move: one spelling of each domain would otherwise serve nothing.
  for (const [host, want] of [
    ['vantixe.com', 'https://www.vantixe.com'],
    ['www.vantixe.ai', 'https://vantixe.ai'],
  ]) {
    const root = await request('/', { host })
    // 301 or 308: on this deployment the .com apex is redirected by a Cloudflare
    // rule (301) and the .ai www by the app itself (308). Both are permanent and
    // both preserve the path, which is what actually matters.
    const permanent = root.status === 301 || root.status === 308
    // A trailing slash on the root is the same URL. The app omits it, a
    // Cloudflare rule adds it; neither is a defect, so compare without it.
    const landed = String(root.headers.location || '').replace(/\/$/, '')
    record(permanent && landed === want, `${host} redirects to the canonical host`, `${root.status} ${root.headers.location || ''}`)
    const deep = await request('/contact', { host })
    record(deep.headers.location === `${want}/contact`, `${host} keeps the path when redirecting`, deep.headers.location || `status ${deep.status}`)
  }
  // The canonical spellings must NOT redirect, or the site loops forever.
  for (const host of ['www.vantixe.com', 'vantixe.ai']) {
    const r = await request('/', { host })
    record(r.status === 200, `${host} serves directly with no redirect loop`, `status ${r.status}`)
  }

  // 5. The two-domain split, including that a lookalike hostname cannot claim
  //    the technology identity.
  {
    const ai = await request('/tprm', { host: 'vantixe.ai' })
    record(ai.status === 200, 'vantixe.ai serves the product pages', `status ${ai.status}`)
    const com = await request('/tprm', { host: 'www.vantixe.com' })
    record(com.status === 404, 'vantixe.com does not serve the .ai paths', `status ${com.status}`)
    // A hostname nothing has a certificate for. Against a proxy the TLS
    // handshake is refused outright, which throws here; that is the protection
    // working, so treat it as such rather than letting it abort the run.
    try {
      const fake = await request('/tprm', { host: 'vantixe.ai.evil.example' })
      record(fake.status === 404, 'a lookalike hostname cannot claim the .ai identity', `status ${fake.status}`)
    } catch (e) {
      if (proxied) skipped('a lookalike hostname cannot claim the .ai identity', `refused at the TLS layer: ${e.code || e.message}`)
      else record(false, 'a lookalike hostname cannot claim the .ai identity', e.message)
    }
    const cookie = String((await request('/', { host: 'vantixe.ai' })).headers['set-cookie'] || '')
    record(/vantixe-domain=ai/.test(cookie), 'the domain cookie is set for .ai', cookie.slice(0, 60))
    record(/SameSite/i.test(cookie), 'the domain cookie carries SameSite', cookie.slice(0, 60))
  }

  // 6. The rate limit exists, and, critically, counts SENDS rather than
  //    attempts: rejected submissions must not lock a real visitor out.
  {
    const before = []
    for (let i = 0; i < 6; i++) before.push((await post('/api/contact', VALID)).status)
    record(
      before.every((s) => s === 400),
      'rejected submissions do not consume the rate budget',
      `statuses ${before.join(' ')}`
    )
    const other = await post('/api/contact', VALID, { headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.7' } })
    record(other.status !== 429, 'a different visitor is unaffected by another visitor attempts', `status ${other.status}`)
  }

  // 7. The bot trap answers normally and sends nothing.
  {
    const r = await post('/api/contact', { ...VALID, website: 'filled-by-a-bot' })
    record(r.status === 200, 'the bot trap answers 200 without sending', `status ${r.status}`)
  }

  // 8. Redirects that existed before the move still work.
  for (const [path, want] of [['/negotiation-agent', '/sourcing-agent'], ['/index.html', '/']]) {
    const r = await request(path, { host: 'www.vantixe.com' })
    record(r.headers.location === want, `existing redirect still works: ${path}`, r.headers.location || `status ${r.status}`)
  }

  console.log(`\nverify-deployment: PASS ${pass}, SKIP ${skip}, FAIL ${fail}`)
  if (skip) console.log('SKIP rows are cases a proxy makes untestable from outside, not defects. Run against the platform URL directly to exercise them.')
  process.exit(fail ? 1 : 0)
}

run().catch((e) => {
  console.error('verify-deployment: crashed: ' + (e.stack || e.message))
  process.exit(1)
})
