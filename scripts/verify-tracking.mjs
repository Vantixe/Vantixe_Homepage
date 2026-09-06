#!/usr/bin/env node
/**
 * Behavioural check for the conversion-tracking pages, run against a dev
 * server with the system Edge browser (playwright-core, "msedge" channel, no
 * browser download). Every third-party request (Google, LinkedIn, Microsoft
 * Bookings, Cloudflare) is intercepted: nothing leaves the machine.
 *
 * Plain run (production-only tags absent, their cases report SKIP):
 *   npm run dev                       (terminal 1)
 *   npm run verify:tracking           (terminal 2)
 *
 * Tagged run (exercises the GTM callback path, the Insight Tag and the
 * conversion call with FAKE ids; the tags themselves are blocked):
 *   npm run serve:tagged              (terminal 1: builds with fake ids, serves on 4001)
 *   npm run verify:tracking:tagged    (terminal 2; strict, SKIP counts as failure)
 *
 * Exit codes: 0 all green; 1 any FAIL (or any SKIP in strict mode);
 * 2 when the server or Edge is missing.
 */
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright-core'

const TAGGED = process.argv.includes('--tagged')
let BASE = process.env.VERIFY_BASE_URL || (TAGGED ? 'http://localhost:4001' : 'http://localhost:4000')
const STRICT = TAGGED || process.env.VERIFY_STRICT === '1'

/**
 * Require the production tags to be present rather than discovering whether
 * they are.
 *
 * Without this the suite probes the homepage and, finding no tag, inverts every
 * assertion into "correctly absent" and records SKIP. Against a server that is
 * SUPPOSED to be tagged, that is the failure reported as a pass. STRICT alone
 * turns those SKIPs red but says only "SKIP is a failure", which does not tell
 * the reader that a tag is missing. Set this whenever the target is expected to
 * be fully configured, such as any deployed environment.
 */
const EXPECT_TAGS = TAGGED || process.env.VERIFY_EXPECT_TAGS === '1'

/**
 * Exercise the two-domain behaviour against a server whose DNS name is not yet
 * the real one. Set VERIFY_AS_HOST=vantixe.ai and the suite drives the browser
 * at that hostname while resolving it to whatever VERIFY_BASE_URL points at.
 *
 * Note for anyone tempted to simplify this: passing the Host header directly,
 * via Playwright's extraHTTPHeaders or Node's fetch, does NOT work. Node's
 * fetch silently ignores it and Chromium rejects the navigation with
 * ERR_INVALID_ARGUMENT. Both were measured against a control. Resolver rules
 * are the only approach that produces a real Host header.
 */
const RAW_URL = new URL(BASE)
const AS_HOST = (process.env.VERIFY_AS_HOST || '').trim()
if (AS_HOST) {
  BASE = `${RAW_URL.protocol}//${AS_HOST}${RAW_URL.port ? ':' + RAW_URL.port : ''}`
}
const LAUNCH_ARGS = AS_HOST
  ? [`--host-resolver-rules=MAP ${AS_HOST} ${RAW_URL.hostname}`, '--ignore-certificate-errors']
  : []
const CONTEXT_OPTIONS = AS_HOST ? { ignoreHTTPSErrors: true } : {}

/**
 * Plain HTTP GET that reaches the real address while presenting the hostname
 * under test. Used where a browser is overkill; fetch cannot do this because it
 * drops a Host override.
 */
async function getText(path) {
  const mod = RAW_URL.protocol === 'https:' ? await import('node:https') : await import('node:http')
  return new Promise((resolve, reject) => {
    const req = mod.request(
      {
        host: RAW_URL.hostname,
        port: RAW_URL.port || (RAW_URL.protocol === 'https:' ? 443 : 80),
        path,
        headers: { Host: AS_HOST || RAW_URL.host },
        rejectUnauthorized: false,
      },
      (res) => {
        let body = ''
        res.on('data', (d) => { body += d })
        res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }))
      }
    )
    req.on('error', reject)
    req.end()
  })
}

/** Read, never retype: lib/booking.ts is the single holder of this URL. */
const BOOKING_URL = readFileSync(new URL('../lib/booking.ts', import.meta.url), 'utf8').match(/'(https:\/\/outlook[^']+)'/)[1]
const BOOKING_HOST_GLOB = '**outlook.office.com/**'
const GENERIC_HEADING = 'Thanks, we have your message.'

const results = []
const record = (name, status, detail = '') => {
  results.push({ name, status, detail })
  console.log(`${status.padEnd(4)} ${name}${detail ? '  (' + detail + ')' : ''}`)
}
const assert = (cond, msg) => {
  if (!cond) throw new Error(msg)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function serverUp() {
  try {
    const res = await getText('/')
    return res.status < 500
  } catch {
    return false
  }
}

/** Mirror every dataLayer.push into sessionStorage so it survives the full-page redirect. */
const DATALAYER_MIRROR = `
  (() => {
    const dl = [];
    const orig = dl.push.bind(dl);
    dl.push = function (...args) {
      try {
        const m = JSON.parse(sessionStorage.getItem('__dl') || '[]');
        for (const a of args) m.push({ event: a && a.event, intent: a && a.intent, product: a && a.product, hasCallback: !!(a && typeof a.eventCallback === 'function') });
        sessionStorage.setItem('__dl', JSON.stringify(m));
      } catch {}
      return orig(...args);
    };
    window.dataLayer = dl;
  })();
`

/**
 * Stand-in for the Turnstile widget (the dev server may pass a site key, which
 * keeps the submit button disabled until a token arrives). Installed before
 * page scripts, so the form's "already loaded" branch calls render() directly.
 * The API route is mocked in every form case, so the fake token is never verified.
 * Case h covers the real loading path without this stub.
 */
const TURNSTILE_STUB = `
  window.turnstile = {
    render: (el, opts) => { setTimeout(() => opts.callback('verify-script-token'), 0); return 'stub'; },
    reset: () => {},
    remove: () => {},
  };
`

/** Nothing reaches Google or LinkedIn from this script, tagged run included. */
async function blockThirdParties(page, { licdn = 'abort' } = {}) {
  await page.route('**googletagmanager.com/**', (r) => r.abort())
  await page.route('**px.ads.linkedin.com/**', (r) => r.abort())
  if (licdn === 'abort') await page.route('**snap.licdn.com/**', (r) => r.abort())
}

async function formContext(browser, extraInit) {
  const ctx = await browser.newContext(CONTEXT_OPTIONS)
  await ctx.addInitScript(TURNSTILE_STUB)
  if (extraInit) await ctx.addInitScript(extraInit)
  return ctx
}

async function fillForm(page) {
  await page.fill('#name', 'Verify Script')
  await page.fill('#company', 'Vantixe Test')
  await page.fill('#email', 'verify@example.com')
  await page.fill('#message', 'Automated tracking verification. Not a real enquiry.')
}

const okJson = (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })

/**
 * Count real document loads of the main frame. 'framenavigated' would also
 * fire for the history.replaceState Next.js performs on arrival, so count the
 * navigation requests instead: one per page load, none for in-page updates.
 */
function countNavigations(page) {
  const state = { count: 0, urls: [] }
  page.on('request', (req) => {
    if (req.isNavigationRequest() && req.frame() === page.mainFrame() && req.resourceType() === 'document') {
      state.count++
      state.urls.push(req.url())
    }
  })
  return state
}

async function submitButtonUsable(page) {
  await page.waitForFunction(
    () => {
      const b = document.querySelector('button[type="submit"]')
      return !!b && !b.disabled && /Send message/.test(b.textContent || '')
    },
    null,
    { timeout: 8000 },
  )
}

async function run() {
  if (!(await serverUp())) {
    console.error(`verify-tracking: no dev server at ${BASE}. Start it with "npm run ${TAGGED ? 'serve:tagged' : 'dev'}" first.`)
    process.exit(2)
  }
  let browser
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true, args: LAUNCH_ARGS })
  } catch (e) {
    console.error('verify-tracking: could not launch Microsoft Edge via playwright-core. ' + e.message)
    process.exit(2)
  }

  const waitFor = async (pred, ms) => {
    const t0 = Date.now()
    while (!pred() && Date.now() - t0 < ms) await sleep(50)
    return pred()
  }

  // Capability probe: which production-only tags does this server render? Read
  // from the server HTML (the loader snippets are part of it), not from the DOM,
  // which only gains the script elements after hydration.
  const homeHtml = (await getText('/')).body
  const hasInsightTag = homeHtml.includes('snap.licdn.com')
  const hasGtm = homeHtml.includes('googletagmanager.com/gtm.js')
  console.log(`server ${BASE}${AS_HOST ? ` (as ${AS_HOST}, resolved to ${RAW_URL.host})` : ''}: insight tag ${hasInsightTag ? 'ON' : 'off'}, GTM ${hasGtm ? 'ON' : 'off'}${STRICT ? ', strict mode' : ''}\n`)

  // When the target is supposed to be fully configured, a missing tag is the
  // defect this suite exists to find. Say so here, once, instead of letting a
  // dozen cases quietly invert themselves into "correctly absent" and pass.
  if (EXPECT_TAGS && !hasInsightTag) record('probe. server renders the LinkedIn Insight Tag', 'FAIL', 'NEXT_PUBLIC_LINKEDIN_PARTNER_ID is not set on this server, but this run requires it')
  if (EXPECT_TAGS && !hasGtm) record('probe. server renders Google Tag Manager', 'FAIL', 'NEXT_PUBLIC_GTM_ID is not set on this server, but this run requires it')

  // a. Both new pages: 200, noindex, an h1, and the Insight Tag injected exactly
  //    once. Tag presence is observed from inside the page (console channel):
  //    /book starts its hop while the document is still alive, and element
  //    lookups from outside would wait on that pending navigation.
  for (const path of ['/thank-you', '/book']) {
    try {
      const ctx = await browser.newContext(CONTEXT_OPTIONS)
      await ctx.addInitScript(`
        new MutationObserver((muts) => {
          for (const m of muts) for (const n of m.addedNodes) {
            if (n.tagName === 'SCRIPT' && n.id === 'linkedin-insight') console.log('__mark insightTag ' + Date.now());
          }
        }).observe(document, { childList: true, subtree: true });
      `)
      const page = await ctx.newPage()
      const tagMarks = []
      page.on('console', (m) => { if (m.text().startsWith('__mark insightTag')) tagMarks.push(Number(m.text().split(' ')[2])) })
      let tagRequestAt = 0
      page.on('request', (r) => { if (/li\.lms-analytics\/insight\.min\.js/.test(r.url()) && !tagRequestAt) tagRequestAt = Date.now() })
      await blockThirdParties(page)
      let hopAt = 0
      await page.route(BOOKING_HOST_GLOB, async (r) => {
        hopAt = hopAt || Date.now()
        await sleep(20000)
        await r.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>bookings-stub</body></html>' }).catch(() => {})
      })
      const res = await page.goto(BASE + path, { waitUntil: 'domcontentloaded' })
      assert(res && res.status() === 200, `status ${res && res.status()}`)
      const robots = await page.locator('meta[name="robots"]').first().getAttribute('content')
      assert(robots && /noindex/.test(robots), `robots meta is ${robots}`)
      assert((await page.locator('h1').count()) >= 1, 'no h1')
      if (hasInsightTag) {
        assert(await waitFor(() => tagMarks.length > 0, 10000), `Insight Tag never injected on ${path} although the server renders it on /`)
        await sleep(500)
        assert(tagMarks.length === 1, `Insight Tag injected ${tagMarks.length} times on ${path}`)
        assert(tagRequestAt > 0, 'Insight Tag script was never requested')
        if (path === '/book') {
          assert(await waitFor(() => hopAt > 0, 6000), '/book never left for Bookings')
          assert(tagRequestAt <= hopAt, `/book left ${tagRequestAt - hopAt} ms BEFORE the Insight Tag was requested`)
        }
        record(`a. ${path}: 200, noindex, Insight Tag injected exactly once${path === '/book' ? ' before the hop' : ''}`, 'PASS')
      } else {
        await sleep(1500)
        assert(tagMarks.length === 0, `Insight Tag injected on ${path} although the server does not render it on /`)
        record(`a. ${path}: 200, noindex`, 'PASS')
        record(`a. ${path}: Insight Tag injected exactly once`, 'SKIP', 'NEXT_PUBLIC_LINKEDIN_PARTNER_ID not set on this server')
      }
      await ctx.close()
    } catch (e) {
      record(`a. ${path}: 200, noindex, tag count`, 'FAIL', e.message)
    }
  }

  // b. Query string is never reflected, and hostile keys never break the page.
  {
    const name = 'b. /thank-you ignores hostile query strings'
    try {
      const page = await browser.newPage()
      await blockThirdParties(page)
      await page.goto(BASE + '/thank-you?topic=%3Cscript%3Ealert(1)%3C%2Fscript%3E&product=%3Cb%3Ex', { waitUntil: 'load' })
      // Next.js embeds the request URL (escaped) in its data payload; what matters
      // is the rendered page: no text and no element built from the query string.
      const text = await page.evaluate(() => document.body.innerText)
      assert(!text.includes('alert(1)') && !text.includes('<b>'), 'query string content rendered as text')
      const injected = await page.evaluate(() => document.querySelectorAll('main script, main b').length)
      assert(injected === 0, 'query string content rendered as an element')
      let h1 = await page.locator('h1').first().textContent()
      assert(h1 && h1.includes(GENERIC_HEADING), `unexpected heading: ${h1}`)
      // Prototype keys must fall through to the generic heading, not crash the render.
      for (const key of ['__proto__', 'constructor', 'toString', 'hasOwnProperty']) {
        const res = await page.goto(`${BASE}/thank-you?topic=${key}`, { waitUntil: 'load' })
        assert(res && res.status() === 200, `topic=${key} returned ${res && res.status()}`)
        h1 = await page.locator('h1').first().textContent()
        assert(h1 && h1.includes(GENERIC_HEADING), `topic=${key} rendered heading: ${h1}`)
      }
      // Repeated keys arrive as arrays and must also fall through.
      await page.goto(`${BASE}/thank-you?topic=demo&topic=quote`, { waitUntil: 'load' })
      h1 = await page.locator('h1').first().textContent()
      assert(h1 && h1.includes(GENERIC_HEADING), `array topic rendered heading: ${h1}`)
      await page.close()
      record(name, 'PASS')
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // c. Happy path: exactly one full navigation to /thank-you with topic and
  //    product, the GTM event mirrored first, and Back returns a usable form.
  {
    const name = 'c. successful submit redirects once to /thank-you?topic=demo&product=tprm'
    try {
      const ctx = await formContext(browser, DATALAYER_MIRROR)
      const page = await ctx.newPage()
      await blockThirdParties(page)
      await page.route('**/api/contact', okJson)
      await page.goto(BASE + '/contact?topic=demo&product=tprm', { waitUntil: 'load' })
      await page.waitForSelector('#product')
      await fillForm(page)
      const nav = countNavigations(page)
      await page.click('button[type="submit"]')
      await page.waitForURL(/\/thank-you/, { timeout: 15000 })
      await page.waitForLoadState('load')
      await sleep(2000) // a second, late navigation would show up here
      const url = new URL(page.url())
      assert(url.searchParams.get('topic') === 'demo', `topic=${url.searchParams.get('topic')}`)
      assert(url.searchParams.get('product') === 'tprm', `product=${url.searchParams.get('product')}`)
      assert(nav.count === 1, `expected 1 document load, saw ${nav.count}: ${nav.urls.join(' | ')}`)
      const mirrored = JSON.parse(await page.evaluate(() => sessionStorage.getItem('__dl') || '[]'))
      const ev = mirrored.find((m) => m.event === 'contact_form_submit')
      assert(ev, 'contact_form_submit never pushed to dataLayer')
      assert(ev.intent === 'demo' && ev.product === 'tprm', `event carried intent=${ev.intent} product=${ev.product}`)
      if (hasGtm) assert(ev.hasCallback, 'GTM configured but no eventCallback on the event')
      else assert(!ev.hasCallback, 'no GTM on this server but an eventCallback was attached')
      // Back: the form must be usable, and must STAY usable (no resumed timer
      // replacing it with the success card or redirecting again).
      await page.goBack()
      await page.waitForSelector('form', { timeout: 8000 })
      await submitButtonUsable(page)
      await sleep(4500)
      assert(new URL(page.url()).pathname === '/contact', `redirected again after Back: ${page.url()}`)
      assert((await page.locator('form').count()) === 1, 'form replaced by the success card after Back')
      await ctx.close()
      record(name, 'PASS', hasGtm ? 'GTM callback path, Back usable' : 'no-GTM fast path, Back usable')
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // d. GTM paths: only meaningful when the server renders GTM.
  {
    const name1 = 'd. GTM eventCallback triggers exactly one navigation'
    const name2 = 'd. leaving /contact during the GTM wait never redirects the visitor'
    if (!hasGtm) {
      record(name1, 'SKIP', 'NEXT_PUBLIC_GTM_ID not set on this server')
      record(name2, 'SKIP', 'NEXT_PUBLIC_GTM_ID not set on this server')
    } else {
      try {
        // eventCallback invoked synchronously by the (stubbed) container.
        const ctx = await formContext(
          browser,
          `(() => { const dl = []; dl.push = function (...args) { for (const a of args) { if (a && typeof a.eventCallback === 'function') a.eventCallback(); } return 0; }; window.dataLayer = dl; })();`,
        )
        const page = await ctx.newPage()
        await blockThirdParties(page)
        await page.route('**/api/contact', okJson)
        await page.goto(BASE + '/contact', { waitUntil: 'load' })
        await fillForm(page)
        const nav = countNavigations(page)
        await page.click('button[type="submit"]')
        await page.waitForURL(/\/thank-you/, { timeout: 15000 })
        await sleep(2500)
        assert(nav.count === 1, `expected 1 document load, saw ${nav.count}`)
        await ctx.close()
        record(name1, 'PASS')
      } catch (e) {
        record(name1, 'FAIL', e.message)
      }
      try {
        // Container never calls back (blocked GTM): the 1500 ms fallback is armed.
        // Leaving the page in that window must cancel it.
        const ctx = await formContext(browser, `(() => { const dl = []; dl.push = function () { return 0; }; window.dataLayer = dl; })();`)
        const page = await ctx.newPage()
        await blockThirdParties(page)
        await page.route('**/api/contact', okJson)
        await page.goto(BASE + '/contact', { waitUntil: 'load' })
        await fillForm(page)
        await page.click('button[type="submit"]')
        await sleep(300)
        await page.click('nav a[href="/about"]')
        // First hit of /about on a dev server compiles it; allow for that.
        await page.waitForURL(/\/about/, { timeout: 30000 })
        await sleep(2500)
        assert(new URL(page.url()).pathname === '/about', `visitor was yanked to ${page.url()}`)
        await ctx.close()
        record(name2, 'PASS')
      } catch (e) {
        record(name2, 'FAIL', e.message)
      }
    }
  }

  // e. Error path: message shown, no navigation, button usable again.
  {
    const name = 'e. failed submit shows the error and stays on /contact'
    try {
      const ctx = await formContext(browser)
      const page = await ctx.newPage()
      await blockThirdParties(page)
      await page.route('**/api/contact', (r) => r.fulfill({ status: 400, contentType: 'application/json', body: '{"error":"Verify script forced error"}' }))
      await page.goto(BASE + '/contact', { waitUntil: 'load' })
      await fillForm(page)
      const nav = countNavigations(page)
      await page.click('button[type="submit"]')
      await page.waitForSelector('text=Verify script forced error', { timeout: 10000 })
      await sleep(2000)
      assert(nav.count === 0, `expected no navigation, saw ${nav.count}`)
      assert(new URL(page.url()).pathname === '/contact', `left /contact: ${page.url()}`)
      await submitButtonUsable(page)
      await ctx.close()
      record(name, 'PASS')
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // f. Honeypot: success card on the form page itself, no event, no navigation.
  {
    const name = 'f. honeypot submit shows the success card without tracking or redirect'
    try {
      const ctx = await formContext(browser, DATALAYER_MIRROR)
      const page = await ctx.newPage()
      await blockThirdParties(page)
      await page.route('**/api/contact', okJson)
      await page.goto(BASE + '/contact', { waitUntil: 'load' })
      await fillForm(page)
      await page.fill('#website', 'http://spam.example', { force: true })
      const nav = countNavigations(page)
      await page.click('button[type="submit"]')
      await page.waitForSelector('h3:has-text("Thanks, we’ve got it.")', { timeout: 10000 })
      await sleep(1500)
      assert(nav.count === 0, `expected no navigation, saw ${nav.count}`)
      assert(new URL(page.url()).pathname === '/contact', `left /contact: ${page.url()}`)
      const mirrored = JSON.parse(await page.evaluate(() => sessionStorage.getItem('__dl') || '[]'))
      assert(!mirrored.some((m) => m.event === 'contact_form_submit'), 'honeypot submit pushed contact_form_submit')
      await ctx.close()
      record(name, 'PASS')
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // The /book document is replaced by the hop to Bookings, so nothing can be
  // read from it afterwards. Timing marks and queue contents travel through the
  // console instead, which survives the navigation.
  function consoleMarks(page) {
    const marks = {}
    page.on('console', (m) => {
      const t = m.text()
      const hit = /^__mark (\S+) (.*)$/.exec(t)
      if (hit) marks[hit[1]] = hit[2]
    })
    return marks
  }
  /** Answer the hop to Bookings late, recording when it was attempted; the /book document stays alive meanwhile. */
  async function holdBookingHop(page) {
    const state = { url: null, at: 0 }
    await page.route(BOOKING_HOST_GLOB, async (r) => {
      state.url = r.request().url()
      state.at = Date.now()
      await sleep(20000)
      await r.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>bookings-stub</body></html>' }).catch(() => {})
    })
    return state
  }
  // g1. /book waits for the Insight Tag to load, then a grace period, then leaves for the exact Bookings URL.
  {
    const name = 'g1. /book redirects to Bookings only after the Insight Tag has loaded'
    try {
      const ctx = await browser.newContext(CONTEXT_OPTIONS)
      // Stand-in tag element with the selector BookRedirect polls for; served slowly so
      // "waited for the tag" is falsifiable. The real tag (when rendered) hits the same route.
      await ctx.addInitScript(`
        document.addEventListener('DOMContentLoaded', () => {
          const s = document.createElement('script');
          s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
          s.async = true;
          s.onload = () => { console.log('__mark tagLoadedAt ' + Date.now()); };
          document.head.appendChild(s);
        });
      `)
      const page = await ctx.newPage()
      const marks = consoleMarks(page)
      await blockThirdParties(page, { licdn: 'serve' })
      await page.route('**snap.licdn.com/li.lms-analytics/insight.min.js', async (r) => {
        await sleep(500)
        r.fulfill({ status: 200, contentType: 'application/javascript', body: 'window.__tagRan = true;' })
      })
      const hop = await holdBookingHop(page)
      await page.goto(BASE + '/book', { waitUntil: 'load' })
      const loadedAt = Date.now()
      assert(await waitFor(() => hop.url, 6000), 'no navigation to Microsoft Bookings within 6 s of page load')
      assert(hop.url === BOOKING_URL, `expected ${BOOKING_URL}, got ${hop.url}`)
      assert(marks.tagLoadedAt, 'left before the stand-in Insight Tag had loaded')
      const tagLoadedAt = Number(marks.tagLoadedAt)
      assert(hop.at >= tagLoadedAt + 200, `left ${hop.at - tagLoadedAt} ms after the tag loaded, expected the grace period`)
      assert(hop.at - loadedAt < 2500, `left ${hop.at - loadedAt} ms after page load, expected well under the cap plus the slow tag`)
      await ctx.close()
      record(name, 'PASS', `left ${hop.at - tagLoadedAt} ms after tag load`)
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // g2. Blocked tag (this developer machine, ad blockers): the redirect still happens quickly.
  {
    const name = 'g2. /book still redirects when the Insight Tag is blocked'
    try {
      const ctx = await browser.newContext(CONTEXT_OPTIONS)
      await ctx.addInitScript(`
        document.addEventListener('DOMContentLoaded', () => {
          const s = document.createElement('script');
          s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
          document.head.appendChild(s);
        });
      `)
      const page = await ctx.newPage()
      await blockThirdParties(page) // licdn aborted
      const hop = await holdBookingHop(page)
      await page.goto(BASE + '/book', { waitUntil: 'domcontentloaded' })
      const loadedAt = Date.now()
      assert(await waitFor(() => hop.url, 6000), 'no navigation to Microsoft Bookings within 6 s of page load')
      assert(hop.at - loadedAt < 2000, `took ${hop.at - loadedAt} ms after page load, expected the error path or the 1200 ms cap`)
      await ctx.close()
      record(name, 'PASS', `${hop.at - loadedAt} ms after page load`)
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // g3. Conversion call: BookRedirect creates LinkedIn's queue shim itself when the
  //     tag has not run, and the call sits in that queue for the tag to replay.
  {
    const name = 'g3. /book queues the conversion event through the Insight Tag shim'
    try {
      const ctx = await browser.newContext(CONTEXT_OPTIONS)
      // No pre-stub: intercept the assignment BookRedirect makes, then watch its queue.
      await ctx.addInitScript(`
        Object.defineProperty(window, 'lintrk', {
          configurable: true,
          get() { return undefined },
          set(v) {
            Object.defineProperty(window, 'lintrk', { value: v, writable: true, configurable: true });
            const t = setInterval(() => {
              const tr = v && v.q && v.q.find((c) => c[0] === 'track');
              if (tr) { console.log('__mark queued ' + JSON.stringify(tr[1])); clearInterval(t); }
            }, 10);
          },
        });
      `)
      const page = await ctx.newPage()
      const marks = consoleMarks(page)
      await blockThirdParties(page) // tag never loads, so the queue is never drained
      const hop = await holdBookingHop(page)
      await page.goto(BASE + '/book', { waitUntil: 'domcontentloaded' })
      await waitFor(() => hop.url, 6000)
      await sleep(200)
      await ctx.close()
      if (marks.queued) record(name, 'PASS', `queued ${marks.queued}`)
      else record(name, 'SKIP', 'NEXT_PUBLIC_LINKEDIN_BOOKING_CONVERSION_ID not set on this server')
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // g4. /book replaces its own history entry: Back from Bookings returns to the page before /book.
  {
    const name = 'g4. Back from Bookings skips /book'
    try {
      const page = await browser.newPage()
      await blockThirdParties(page)
      await page.route(BOOKING_HOST_GLOB, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>bookings-stub</body></html>' }))
      await page.goto(BASE + '/contact', { waitUntil: 'load' })
      await page.goto(BASE + '/book', { waitUntil: 'commit' })
      await page.waitForURL(/outlook\.office\.com/, { timeout: 10000 })
      await page.goBack({ waitUntil: 'commit', timeout: 15000 })
      assert(await waitFor(() => new URL(page.url()).pathname !== '/book', 5000), 'Back landed on /book')
      assert(new URL(page.url()).pathname === '/contact', `Back landed on ${page.url()} (assign instead of replace?)`)
      await page.close()
      record(name, 'PASS')
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  // h. Real Turnstile wiring (no stub): button disabled until the widget calls back.
  {
    const name = 'h. submit stays disabled until the Turnstile widget returns a token'
    try {
      const page = await browser.newPage()
      await blockThirdParties(page)
      let scriptRequested = false
      await page.route('**challenges.cloudflare.com/turnstile/v0/api.js*', (r) => {
        scriptRequested = true
        r.fulfill({
          status: 200,
          contentType: 'application/javascript',
          body: `window.turnstile = { render: (el, o) => { setTimeout(() => o.callback('t'), 300); return 'w'; }, reset: () => {}, remove: () => {} }; window.onTurnstileLoad && window.onTurnstileLoad();`,
        })
      })
      await page.goto(BASE + '/contact', { waitUntil: 'load' })
      await waitFor(() => scriptRequested, 10000)
      if (!scriptRequested) {
        await page.close()
        record(name, 'SKIP', 'NEXT_PUBLIC_TURNSTILE_SITE_KEY not set on this server')
      } else {
        const enabledEarly = await page.locator('button[type="submit"]').isEnabled()
        assert(!enabledEarly, 'submit was enabled before any Turnstile token: the spam gate is off')
        await page.waitForFunction(() => { const b = document.querySelector('button[type="submit"]'); return b && !b.disabled }, null, { timeout: 8000 })
        await page.close()
        record(name, 'PASS')
      }
    } catch (e) {
      record(name, 'FAIL', e.message)
    }
  }

  await browser.close()
  const count = (s) => results.filter((r) => r.status === s).length
  const failed = count('FAIL')
  const skipped = count('SKIP')
  console.log(`\nverify-tracking: PASS ${count('PASS')}, SKIP ${skipped}, FAIL ${failed}`)
  if (skipped && !STRICT) console.log('SKIP rows cover production-only configuration. Run the tagged suite (npm run serve:tagged + npm run verify:tracking:tagged) to exercise them.')
  if (failed) process.exit(1)
  if (STRICT && skipped) {
    console.error('verify-tracking: strict mode, SKIP is a failure')
    process.exit(1)
  }
}

run().catch((e) => {
  console.error('verify-tracking: crashed: ' + (e.stack || e.message))
  process.exit(1)
})
