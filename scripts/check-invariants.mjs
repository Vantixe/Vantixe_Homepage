#!/usr/bin/env node
/**
 * Repo invariants that must hold on every build (wired as "prebuild", so it
 * runs locally and on Vercel). Pure node, no dependencies, sub-second.
 *
 * 1. The Microsoft Bookings URL lives in lib/booking.ts and nowhere else under
 *    app/, components/, lib/; BOOKING_URL is only used by the /book redirect;
 *    and every known booking button still routes through BOOK_PATH, so the
 *    click is recorded on our own domain before the visitor leaves.
 * 2. The LinkedIn Insight Tag and Google Tag Manager loaders are defined once
 *    and rendered only from the root layout. A second copy double-counts.
 * 3. /thank-you and /book stay out of the sitemap (they are noindex landing pages).
 * 4. No em dash (U+2014) anywhere in app/, components/ or lib/: copy or comments.
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

if (failures.length) {
  console.error('check-invariants: FAIL')
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}
console.log(`check-invariants: OK (${files.length} files scanned)`)
