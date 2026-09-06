#!/usr/bin/env node
/**
 * Repo invariants that must hold on every build (wired as "prebuild", so it
 * runs locally and on the deployment host). Pure node, no dependencies, sub-second.
 *
 * 1. The Microsoft Bookings URL lives in lib/booking.ts and nowhere else under
 *    app/, components/, lib/; BOOKING_URL is only used by the /book redirect;
 *    and every known booking button still routes through BOOK_PATH, so the
 *    click is recorded on our own domain before the visitor leaves.
 * 2. The LinkedIn Insight Tag and Google Tag Manager loaders are defined once
 *    and rendered only from the root layout. A second copy double-counts.
 * 3. /thank-you and /book stay out of the sitemap (they are noindex landing pages).
 * 4. No em dash (U+2014) anywhere in app/, components/ or lib/: copy or comments.
 * 5. railway.json is valid and cannot silently bypass this script, pin a port,
 *    or point its health check at a route the app does not serve; and the Node
 *    version on the build host matches package.json engines.
 * 6. .gitignore still excludes internal notes from a git-based deployment.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SCAN_DIRS = ['app', 'components', 'lib']
const EXTENSIONS = /\.(ts|tsx|js|jsx|mjs|mdx|md|json|css)$/

/** Every file that renders a booking button. Add here when adding a button. */
const BOOK_CALLSITES = [
  'app/about/page.tsx',
  'app/services/page.tsx',
  'app/contact/page.tsx',
  'components/consulting/ConsultingCTA.tsx',
  'components/consulting/Hero.tsx',
  'components/consulting/ServicePageLayout.tsx',
  'components/technology/ProductPageLayout.tsx',
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (EXTENSIONS.test(name)) out.push(full)
  }
  return out
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)))
const failures = []

function findLines(pattern) {
  const hits = []
  for (const file of files) {
    const rel = relative(ROOT, file).replace(/\\/g, '/')
    readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        if (pattern.test(line)) hits.push({ rel, line: i + 1, text: line.trim().slice(0, 100) })
      })
  }
  return hits
}

function expectOnly(label, hits, allowed) {
  const bad = hits.filter((h) => !allowed.includes(h.rel))
  for (const h of bad) failures.push(`${label}: ${h.rel}:${h.line}: ${h.text}`)
  if (hits.length === 0) failures.push(`${label}: expected at least one occurrence in ${allowed.join(', ')}, found none`)
}

// 1. Booking URL centralised, only the redirect uses it, every button routes through /book.
expectOnly('Bookings URL outside lib/booking.ts', findLines(/outlook\.office\.com/), ['lib/booking.ts'])
expectOnly(
  'BOOKING_URL used outside the /book redirect',
  findLines(/\bBOOKING_URL\b/),
  ['lib/booking.ts', 'components/contact/BookRedirect.tsx'],
)
const bookPathFiles = new Set(findLines(/\bBOOK_PATH\b/).map((h) => h.rel))
for (const f of BOOK_CALLSITES) {
  if (!bookPathFiles.has(f)) failures.push(`Booking button no longer routed through /book (BOOK_PATH missing): ${f}`)
}

// 2. One tracking loader each, rendered only from the root layout.
expectOnly('LinkedIn Insight Tag snippet defined more than once', findLines(/snap\.licdn\.com/), [
  'components/analytics/LinkedInInsightTag.tsx',
])
expectOnly('Google Tag Manager snippet defined more than once', findLines(/googletagmanager\.com\/gtm\.js/), [
  'components/analytics/GoogleTagManager.tsx',
])
expectOnly('LinkedIn Insight Tag rendered outside the root layout', findLines(/<LinkedInInsightTag\b/), ['app/layout.tsx'])
expectOnly('Google Tag Manager rendered outside the root layout', findLines(/<GoogleTagManager\b/), ['app/layout.tsx'])

// 3. Landing pages stay out of the sitemap.
for (const h of findLines(/\/(thank-you|book)\b/).filter((h) => h.rel === 'app/sitemap.ts')) {
  failures.push(`Noindex landing page listed in the sitemap: ${h.rel}:${h.line}: ${h.text}`)
}

// 4. No em dashes.
for (const h of findLines(/—/)) failures.push(`Em dash: ${h.rel}:${h.line}: ${h.text}`)

// 5. Deployment configuration. These run here rather than in a dashboard so a
//    broken deploy config fails the build instead of failing at 3am, and
//    because this file runs as "prebuild", check 5f executes on the deployment
//    host itself, which is the only check with any grip on the real runtime.
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
let railway
try {
  railway = JSON.parse(readFileSync(join(ROOT, 'railway.json'), 'utf8'))
} catch (e) {
  // An unparseable railway.json is not an error to the platform: it is ignored
  // silently and the dashboard's own settings are used, so the file would look
  // authoritative while controlling nothing.
  failures.push(`railway.json is missing or not valid JSON (the platform would silently ignore it): ${e.message}`)
}

// `JSON.parse` accepts "null" and "0", which are valid JSON but useless as
// config: the platform falls back to its dashboard exactly as it does for an
// unparseable file. Without this, a semantically empty file skipped every check
// below and the gate printed OK.
if (railway !== undefined && (railway === null || typeof railway !== 'object' || Array.isArray(railway))) {
  failures.push(`railway.json must contain a JSON object, found ${JSON.stringify(railway)} (the platform would silently fall back to dashboard settings)`)
  railway = undefined
}

if (railway) {
  // 5a. The builder decides whether build-time variables reach the bundle.
  if (railway.build?.builder !== 'NIXPACKS') {
    failures.push(`railway.json build.builder must be NIXPACKS, found ${JSON.stringify(railway.build?.builder)}`)
  }
  // 5b + 5c. The build must go through npm run build, AND prebuild must still
  //   be this file. Either alone is bypassable: rewriting the build command
  //   skips this script, and so does emptying prebuild while the command stays.
  if (railway.build?.buildCommand !== 'npm run build') {
    failures.push(`railway.json build.buildCommand must be "npm run build" so these invariants run on the host, found ${JSON.stringify(railway.build?.buildCommand)}`)
  }
  if (!/check-invariants\.mjs/.test(pkg.scripts?.prebuild || '')) {
    failures.push('package.json prebuild no longer runs check-invariants.mjs, so the deploy host would build without these checks')
  }
  // 5d. The start command must resolve to the package script, so the two cannot
  //   drift apart, and must not pin a port: the platform assigns one via $PORT
  //   and a hardcoded port means the container is never reachable.
  const start = railway.deploy?.startCommand || ''
  if (start !== 'npm start') {
    failures.push(`railway.json deploy.startCommand must be "npm start" so it cannot drift from package.json, found ${JSON.stringify(start)}`)
  }
  if (!pkg.scripts?.start) {
    failures.push('package.json has no "start" script, but railway.json start command calls it')
  }
  const effectiveStart = `${start} ${pkg.scripts?.start || ''}`
  if (/-p\s*\d|--port[= ]\d/.test(effectiveStart)) {
    failures.push(`Start path pins a port; the platform assigns one through $PORT and the container would be unreachable: ${effectiveStart.trim()}`)
  }
  // 5e. A health check pointing at a path the app does not serve makes every
  //   deploy fail after the timeout, with no other symptom. An ABSENT path is
  //   worse and used to pass here by accident: with no health check at all the
  //   platform promotes a container that boots but errors on every request.
  if (!Object.prototype.hasOwnProperty.call(railway.deploy || {}, 'healthcheckPath')) {
    failures.push('railway.json has no deploy.healthcheckPath: the platform would promote a container that boots but serves errors')
  } else {
    const health = railway.deploy.healthcheckPath
    if (typeof health !== 'string' || !health.startsWith('/') || health.includes('..')) {
      failures.push(`railway.json healthcheckPath must be an absolute path within the app, found ${JSON.stringify(health)}`)
    } else if (health !== '/') {
      // Accept a route handler as well as a page: a handler is the better shape
      // for a health endpoint, and only accepting page.tsx would reject it.
      const dir = join(ROOT, 'app', health)
      const servable = ['page.tsx', 'page.jsx', 'page.js', 'page.mdx', 'route.ts', 'route.js'].some((f) => {
        try { return statSync(join(dir, f)).isFile() } catch { return false }
      })
      if (!servable) failures.push(`railway.json healthcheckPath ${JSON.stringify(health)} is not a route this app serves; every deploy would fail its health check`)
    }
  }

  // 5g. The contact form's rate limiter counts in the process's own memory, so
  //   its limits divide by the number of instances. Scaling out from a dashboard
  //   would weaken it silently, with no build failure and no log line.
  if (railway.deploy?.numReplicas !== 1) {
    failures.push(`railway.json deploy.numReplicas must be 1: the contact form's rate limit is held in process memory and would be divided across instances, found ${JSON.stringify(railway.deploy?.numReplicas)}`)
  }
}

// 5f. Runs on the deployment host during its build: the Node major version
//   there must satisfy what package.json declares, or the runtime differs from
//   the one everything was verified on.
// The format is constrained on purpose rather than parsing semver by hand. A
// naive "first number in the string" comparison FALSE-FAILS on ordinary ranges
// (">=20 <23" and "20 || 22" both read as 20) and would block a legitimate
// deploy from the build host, with a misleading message. Requiring an exact
// major keeps this dependency-free file honest about what it can check.
const declared = pkg.engines?.node
if (!declared) {
  failures.push('package.json declares no engines.node, so the build host is free to pick any Node version')
} else {
  const m = String(declared).match(/^(\d+)\.x$/)
  if (!m) {
    failures.push(`package.json engines.node must be exactly "<major>.x" so this check can compare it reliably, found ${JSON.stringify(declared)}`)
  } else if (m[1] !== process.versions.node.split('.')[0]) {
    failures.push(`Node ${process.versions.node} does not satisfy package.json engines.node "${declared}"`)
  }
}

// 6. Internal notes must stay out of any deployment. .vercelignore carries this
//    today and is deleted once the move is finished, so assert the property
//    against .gitignore, which is what a git-based deploy actually reads.
let gitignore = ''
try {
  gitignore = readFileSync(join(ROOT, '.gitignore'), 'utf8')
} catch (e) {
  failures.push('.gitignore could not be read, so nothing guarantees internal files stay out of a git-based deployment: ' + e.message)
}
for (const pattern of ['.claude/', '*.pdf']) {
  if (!gitignore.split(/\r?\n/).some((l) => l.trim() === pattern)) {
    failures.push(`.gitignore no longer excludes ${pattern}; internal files could reach a git-based deployment`)
  }
}

if (failures.length) {
  console.error('check-invariants: FAIL')
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}
console.log(`check-invariants: OK (${files.length} files scanned)`)
