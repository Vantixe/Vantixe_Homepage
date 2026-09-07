# Vantixe Homepage - Infrastructure & Deployment

## Architecture

One Next.js application serving two domains:

| Domain | Purpose | Theme |
|--------|---------|-------|
| **www.vantixe.com** | Consulting / Advisory | Bright |
| **vantixe.ai** | Technology / Products | Dark |

Both domains point to the same Railway service. Middleware detects the domain and routes accordingly.

## Stack

- **Framework:** Next.js 16.2 (App Router, Turbopack) + TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Hosting:** Railway (Pro plan), migrated from Vercel on 7 September 2026
- **CDN / proxy:** Cloudflare, proxied (orange cloud) on all four homepage hostnames
- **DNS:** Cloudflare (both domains)
- **Domain registrar:** Cloudflare

## How It Works

```
vantixe.com      -->  301 to www.vantixe.com   (issued by a Cloudflare rule, not the app)
www.vantixe.com  -->  Cloudflare  -->  Railway  -->  Consulting pages (/, /about, /services, /contact)
www.vantixe.ai   -->  308 to vantixe.ai       (issued by the app itself)
vantixe.ai       -->  Cloudflare  -->  Railway  -->  Middleware rewrites to /technology/* pages
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
| CNAME | @ | krfmpm9p.up.railway.app | Proxied |
| CNAME | www | eowuchpv.up.railway.app | Proxied |
| TXT | _railway-verify | railway-verify=a7c3e187... | DNS only |
| TXT | _railway-verify.www | railway-verify=e94c4709... | DNS only |

Cloudflare flattens the CNAME at the apex, which is why a CNAME can sit at `@` alongside the
MX records. The apex A record that pointed at Vercel was removed by Railway's one-time
Cloudflare authorisation.

**Do not touch:** MX, TXT, NS and SRV records (email and verification), and the CNAME records for
agent, beone-demo, books, demotprm, expenses, mtr-mcp, talentshow, tprm and the edge-* and
autodiscover entries. Those are other applications and services. The zone held 37 records after
the migration; only 4 of them belong to this site.

### vantixe.ai (Cloudflare)

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | hkdafme2.up.railway.app | Proxied |
| CNAME | www | e7zw1k9l.up.railway.app | Proxied |
| TXT | _railway-verify | railway-verify=23516481... | DNS only |
| TXT | _railway-verify.www | railway-verify=d0cc14c7... | DNS only |

**Do not touch:** the `category` and `category-api` CNAMEs (a separate application) or the TXT
records. One Vercel leftover remains, `TXT _vercel.vantixe.ai`, kept until the Vercel project is
deleted; it is inert.

## Deploying

### Standard deployment (to production)

Railway auto-deploys from the `production` branch. Nothing on your machine can reach the live
site, and `main` cannot either, which is the point: an ordinary push is not a deployment.

```bash
git push origin main:production
```

That push IS the deployment and is the action that needs the owner's approval. Railway builds
what is on that branch, watch it in the service's Deployments tab.

### Rolling back

In Railway, Deployments tab, pick the previous successful deployment and choose Redeploy. That
is faster and safer than reverting a commit. DNS does not change.

### Local development

```bash
npm run dev
```

Runs on http://localhost:4000 (port configured in package.json, registered in `C:\Claude_Apps\.env.ports`).

## Railway Service

- **Repo:** Vantixe/Vantixe_Homepage
- **Deploy branch:** `production` (NOT `main`)
- **Platform URL:** vantixehomepage-production.up.railway.app (kept; used for verification)
- **Config:** `railway.json`, pinned to one instance

### Vercel, retained for rollback

The Vercel project still exists at https://vercel.com/michael-seitzs-projects/vantixe-homepage
with its environment variables intact, and `vercel.json` and `.vercelignore` are still in the
repo. Nothing points at it. To roll back, repoint the four Cloudflare CNAMEs at Vercel:
`A @ -> 216.198.79.1` and `CNAME www -> 55f92a91e4a6e9b3.vercel-dns-017.com`, proxy OFF.
Delete the project, those two files and the `_vercel` TXT record once a clean period has passed.

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
| `vercel.json` | Left over from Vercel. Retained only so a rollback needs no code change |
| `app/globals.css` | Tailwind theme tokens (bright + dark palettes) |

## Environment Variables (Railway)

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
| `CONTACT_GLOBAL_HOURLY_LIMIT` | Shared hourly cap on contact form messages actually sent. Defaults to 50, set by the owner. Only successful sends count, so filling it costs an attacker a solved bot challenge each. Note the consequence: once 50 genuine messages arrive within an hour the form turns everyone else away until the oldest ages out |
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
7. `npm run verify:deploy` and `npm run verify:tracking` against the live site after shipping,
   with `VERIFY_BASE_URL=https://www.vantixe.com`. Note that the host-header cases cannot pass
   through Cloudflare: it terminates TLS and requires the certificate name to match, so a faked
   Host either gets a 403 from Cloudflare or fails the handshake outright. That is a stronger
   protection than the app's own check, not a regression.
8. Committed and pushed to `main` first. Only then `git push origin main:production`.

## Important Notes

- **Auto-deploy** runs from the `production` branch, never from `main`, so an ordinary push
  cannot reach the live site. Shipping is `git push origin main:production`, and that push is
  what needs the owner's approval.
- **Cloudflare proxy is ON** (orange cloud) on all four homepage hostnames. Railway's one-time
  Cloudflare authorisation set it that way and the certificates issued correctly, so the
  earlier worry that the proxy must start OFF turned out not to apply to this path.
- **OUTSTANDING: `/videos/*` is not yet excluded from the Cloudflare cache.** Cloudflare's
  Service-Specific Terms restrict serving video through the CDN without a paid video product,
  and the two promo films loop on both homepages. Add a Cache Rule bypassing `/videos/*` on
  both zones. This needs a token with Cache Rules permission; the DNS token cannot do it.
- **OUTSTANDING: `EXTRA_API_HOSTS` is still set** in Railway to the platform URL. It was needed
  only while verifying before DNS moved. Clear it, then redeploy. Every cold start logs a
  warning while it is set.
- **Replacing anything in `public/`** now needs a Cloudflare cache purge for that path. The
  cache headers deliberately avoid `immutable` so a replaced file reaches visitors within a
  day, but the edge still holds the old copy until it is purged.
- **Old GitHub Pages setup is replaced** - the CNAME file and GitHub Pages config are no longer used.
- **Port 4000** is reserved for this project in `C:\Claude_Apps\.env.ports`.
