# Vantixe Homepage - Infrastructure & Deployment

## Architecture

One Next.js application serving two domains:

| Domain | Purpose | Theme |
|--------|---------|-------|
| **www.vantixe.com** | Consulting / Advisory | Bright |
| **vantixe.ai** | Technology / Products | Dark |

Both domains point to the same Vercel project. Middleware detects the domain and routes accordingly.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Hosting:** Vercel (Hobby plan)
- **DNS:** Cloudflare (both domains)
- **Domain registrar:** Cloudflare

## How It Works

```
vantixe.com  -->  Vercel  -->  Consulting pages (/, /about, /services, /contact)
vantixe.ai   -->  Vercel  -->  Middleware rewrites to /technology/* pages
```

The middleware (`middleware.ts`) does:
- Detects `vantixe.ai` from the `Host` header
- Rewrites `vantixe.ai/` to `/technology`
- Rewrites `vantixe.ai/tprm` to `/technology/tprm` (same for the other products and `/security`)

**Adding a new page under `vantixe.ai`?** Paths not in the rewrite list fall through to
`NextResponse.next()`, so any route in `app/` is also served on the `.ai` domain at the same
path (`vantixe.ai/contact`, `vantixe.ai/thank-you`, `vantixe.ai/book`, `vantixe.ai/privacy`
all work). The rewrite list only maps the `.ai` root paths onto `/technology/*`.
- Sets a `vantixe-domain` cookie so the Navbar knows which theme to show

## DNS Configuration

### vantixe.com (Cloudflare)

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 216.198.79.1 | DNS only |
| CNAME | www | 55f92a91e4a6e9b3.vercel-dns-017.com. | DNS only |

**Do not touch:** MX, TXT, NS records (email), CNAME records for agent, tprm, expenses, talentshow (other apps on Railway/Vercel).

### vantixe.ai (Cloudflare)

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 216.198.79.1 | DNS only |
| CNAME | www | 55f92a91e4a6e9b3.vercel-dns-017.com. | DNS only |
| TXT | _vercel | vc-domain-verify=vantixe... | DNS only |

## Deploying

### Standard deployment (to production)

From the project root:

```bash
cd c:\Claude_Apps\Vantixe_Homepage
npx vercel --prod
```

This builds and deploys to both www.vantixe.com and vantixe.ai.

### Preview deployment (for testing)

```bash
npx vercel
```

This deploys to a temporary `*.vercel.app` URL for review before going live.

### Local development

```bash
npm run dev
```

Runs on http://localhost:4000 (port configured in package.json, registered in `C:\Claude_Apps\.env.ports`).

## Vercel Project

- **Project name:** vantixe-homepage
- **Scope:** michael-seitzs-projects
- **Dashboard:** https://vercel.com/michael-seitzs-projects/vantixe-homepage
- **Auto-deploy from GitHub:** No (manual deploy via CLI to stay on free plan)
- **Vercel URL:** vantixe-homepage.vercel.app

## Pages

### Consulting (www.vantixe.com)

| Path | Description |
|------|-------------|
| `/` | Homepage (consulting sections + tech teaser at bottom) |
| `/about` | Company story, founder profile |
| `/services` | Services overview (7 services) |
| `/services/cost-optimization` | Cost Optimization detail |
| `/services/procurement-transformation` | Procurement Transformation detail |
| `/services/category-management` | Category Management detail |
| `/services/supplier-management` | Supplier Management detail |
| `/services/risk-management` | Risk Management detail |
| `/services/capability-building` | Capability Building detail |
| `/services/ai-enabled-solutions` | AI-Enabled Solutions detail |
| `/contact` | Contact info, booking link |
| `/thank-you` | Landing page after a contact form submission (noindex). Carries `?topic=&product=` for ad reporting |
| `/book` | Interstitial for every "book a meeting" button: records the click, then redirects to Microsoft Bookings (noindex) |
| `/privacy` | Privacy policy: what the sites collect, the third parties, cookies and opt-outs |
| `/insights` | Placeholder (noindex) |

### Technology (vantixe.ai)

| vantixe.ai path | Internal path | Description |
|-----------------|---------------|-------------|
| `/` | `/technology` | Technology platform overview |
| `/tprm` | `/technology/tprm` | TPRM product page (promo video + screenshot carousel) |
| `/sourcing-agent` | `/technology/sourcing-agent` | Autonomous Sourcing and Negotiation page (promo video + screenshot carousel) |
| `/category-strategy` | `/technology/category-strategy` | Category Strategy product page (screenshot carousel) |
| `/security` | `/technology/security` | ISO 27001 certification and security controls |
| `/contact`, `/thank-you`, `/book`, `/privacy` | same paths | Served unchanged on vantixe.ai (middleware passthrough) |

## Key Files

| File | Purpose |
|------|---------|
| `middleware.ts` | Domain detection, path rewrites, cookie setting |
| `lib/domains.ts` | Domain URLs and helper functions |
| `lib/products.ts` | Product data (TPRM, Autonomous Sourcing, Category Strategy) |
| `lib/services.ts` | All 7 service page content |
| `components/layout/Navbar.tsx` | Theme-aware navbar with dropdowns |
| `components/technology/ProductDemo.tsx` | Screenshot carousel for product pages |
| `lib/videos.ts` | Product promo films: file paths and VideoObject metadata, one entry per product |
| `lib/booking.ts` | The Microsoft Bookings URL (only `/book` uses it) and `BOOK_PATH` for every booking button |
| `components/contact/ContactForm.tsx` | Lead form: on success pushes `contact_form_submit` to GTM, then redirects to `/thank-you` |
| `scripts/check-invariants.mjs` | Runs before every build: one booking URL, one tag loader each, no em dashes |
| `scripts/verify-tracking.mjs` | Browser check of the redirect and /book behaviour against the dev server (plain and tagged runs) |
| `scripts/serve-tagged.mjs` | Production build + server on 4001 with fake tracking ids for the tagged run |
| `scripts/check-invariants.selftest.mjs` | Deliberately breaks each invariant and asserts the check goes red. A gate never seen to fail is not known to work |
| `scripts/verify-deployment.mjs` | Behaviour checks against a running server: cache headers, the bot check, the host guard, the rate limit, apex and www redirects, the two-domain split |
| `railway.json` | Railway build and deploy config. Pinned to one instance because the contact form's rate limit lives in process memory |
| `vercel.json` | Pins the build command to `npm run build` so the invariant check runs on Vercel too |
| `app/globals.css` | Tailwind theme tokens (bright + dark palettes) |

## Environment Variables (Vercel Production)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Contact form email delivery |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile bot check on the form |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (Google Ads conversion tracking). Production only |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag. Production only, never set locally |
| `NEXT_PUBLIC_LINKEDIN_BOOKING_CONVERSION_ID` | Optional event-specific LinkedIn conversion fired on `/book` |

Two of these are true secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`), two have safe
defaults (`CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`), and the four `NEXT_PUBLIC_*` values are
public by design: they are baked into the JavaScript at BUILD time, so changing one needs a
rebuild, not a restart, and a missing one produces a page that looks correct while tracking
nothing.

Optional, both runtime only:

| Variable | Purpose |
|----------|---------|
| `CONTACT_GLOBAL_HOURLY_LIMIT` | Shared hourly cap on contact form sends. Defaults to 500 |
| `ALLOW_UNVERIFIED_CONTACT` | Set to `1` ONLY to run the form with no bot check. Without a Turnstile secret the endpoint otherwise refuses every submission, by design |
| `EXTRA_API_HOSTS` | Extra hostnames allowed to reach `/api/*`, comma separated. Its only intended use is a temporary platform URL during a migration. Every cold start logs a warning while it is set. Clear it afterwards |

**Never set `NODE_ENV` as a service variable.** The build tools live in devDependencies, so
`NODE_ENV=production` makes the install skip them and the build fails on a missing Tailwind
plugin.

## Conversion Tracking

Both ad platforms count leads by page load, so the contact form performs a real navigation to
`/thank-you?topic=<intent>&product=<product>` after a successful send, and every booking button
goes through `/book` before Microsoft Bookings. The form is reachable on both domains, so the
rules must match by path, not by full URL:

| Platform | Rule |
|----------|------|
| LinkedIn Campaign Manager | Page load, **URL contains** `/thank-you` (message sent) |
| LinkedIn Campaign Manager | Page load, **URL contains** `/book` (booking started) |
| Google Tag Manager | Existing trigger on the `contact_form_submit` dataLayer event (carries `intent`, `product`) |

This machine blocks LinkedIn's ad domains at DNS level, so LinkedIn checks must be done from a
phone on mobile data or in Campaign Manager.

## Pre-Deploy Checklist

1. `npm run check` (also runs automatically before every build).
2. `npm run dev` in one terminal, `npm run verify:tracking` in another: FAIL 0. Cases that
   need production-only tags report SKIP here.
3. `npm run serve:tagged` (production build with fake tracking ids served on port 4001; every
   Google and LinkedIn request is blocked by the script) and `npm run verify:tracking:tagged`:
   strict, SKIP counts as failure.
4. Owner walkthrough in the browser on localhost:4000.
5. `npm run check:selftest`: every invariant check proven to fail when broken.
6. `npm run verify:deploy` against a local `next start`: PASS with no failures.
7. `git status` shows only what is meant to ship. Note `npx vercel --prod` deploys the WORKING
   DIRECTORY, not git HEAD. Railway is the opposite: it builds what is on the deploy branch in
   GitHub, so nothing local can be shipped by accident, and nothing local ships at all.

## Important Notes

- **Auto-deploy, while on Vercel:** not enabled. The repo is under a GitHub Organization,
  which needs a paid Vercel plan for it. Ship with `npx vercel --prod`.
  **After the Railway move:** auto-deploy runs from a dedicated `production` branch, never
  from `main`, so an ordinary push cannot reach the live site. Shipping is then
  `git push origin main:production`, and that push is what needs the owner's approval.
- **Cloudflare proxy, while on Vercel:** must stay OFF (grey cloud) for every record pointing
  at Vercel. The orange cloud breaks Vercel's certificate handling.
  **After the Railway move:** the proxy goes ON, but only once Railway has issued its
  certificates against DNS that already points at it, and the zone's SSL mode must be set to
  Full (strict). Turning both on at once prevents the certificate ever being issued.
  `/videos/*` must be excluded from the Cloudflare cache: their terms restrict serving video
  through the CDN without a paid video product, and the two promo films loop on both homepages.
- **Replacing anything in `public/`** now needs a Cloudflare cache purge for that path. The
  cache headers deliberately avoid `immutable` so a replaced file reaches visitors within a
  day, but the edge still holds the old copy until it is purged.
- **Old GitHub Pages setup is replaced** - the CNAME file and GitHub Pages config are no longer used.
- **Port 4000** is reserved for this project in `C:\Claude_Apps\.env.ports`.
