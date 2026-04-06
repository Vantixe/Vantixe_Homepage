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
- Rewrites `vantixe.ai/tprm` to `/technology/tprm` (same for other products)
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
| `/insights` | Placeholder (noindex) |

### Technology (vantixe.ai)

| vantixe.ai path | Internal path | Description |
|-----------------|---------------|-------------|
| `/` | `/technology` | Technology platform overview |
| `/tprm` | `/technology/tprm` | TPRM product page (with demo carousel) |
| `/negotiation-agent` | `/technology/negotiation-agent` | Negotiation Agent page (with demo carousel) |
| `/category-strategy` | `/technology/category-strategy` | Category Strategy (coming soon) |

## Key Files

| File | Purpose |
|------|---------|
| `middleware.ts` | Domain detection, path rewrites, cookie setting |
| `lib/domains.ts` | Domain URLs and helper functions |
| `lib/products.ts` | Product data (TPRM, Negotiation Agent, Category Strategy) |
| `lib/services.ts` | All 7 service page content |
| `components/layout/Navbar.tsx` | Theme-aware navbar with dropdowns |
| `components/technology/ProductDemo.tsx` | Screenshot carousel for product pages |
| `app/globals.css` | Tailwind theme tokens (bright + dark palettes) |

## Important Notes

- **Do not enable GitHub auto-deploy** - the repo is under a GitHub Organization (Vantixe), which requires Vercel Pro plan for auto-deploy. Use `npx vercel --prod` instead.
- **Cloudflare proxy must be disabled** (grey cloud / DNS only) for all Vercel-pointed records. Orange cloud breaks Vercel SSL.
- **Old GitHub Pages setup is replaced** - the CNAME file and GitHub Pages config are no longer used.
- **Port 4000** is reserved for this project in `C:\Claude_Apps\.env.ports`.
