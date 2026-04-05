# Vantixe Homepage

## Dev Server
- **Port**: 4000 (registered in `C:\Claude_Apps\.env.ports`)
- **Start**: `npm run dev` (runs on http://localhost:4000)

## Stack
- Next.js 15 (App Router) + Tailwind CSS 4 + TypeScript + Framer Motion
- Deployment target: Vercel

## Architecture
- Dual-identity site: vantixe.com (consulting, bright theme) + vantixe.ai (technology, dark theme)
- Until .ai domain is purchased, `/technology/*` paths serve the dark tech pages on vantixe.com
- Middleware rewrites vantixe.ai root → /technology when the domain is connected

## Key Directories
- `app/` — Next.js App Router pages
- `app/technology/` — Dark-themed tech pages (TPRM, Negotiation Agent, Category Strategy)
- `components/consulting/` — Bright theme consulting sections
- `components/technology/` — Dark theme tech sections
- `components/ui/` — Shared UI components
- `components/animations/` — Framer Motion animation wrappers
- `lib/` — Product data, integration data, utilities
- `public/images/` — Static assets
