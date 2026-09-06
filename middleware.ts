import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** The only hostnames this deployment answers for in production. */
const AI_HOSTS = new Set(['vantixe.ai', 'www.vantixe.ai'])
const COM_HOSTS = new Set(['vantixe.com', 'www.vantixe.com'])
const DEV_HOSTS = new Set(['localhost', '127.0.0.1'])

/**
 * Extra hostnames allowed to reach the API, comma separated. Empty in normal
 * operation. Its only intended use is the hosting provider's temporary
 * *.up.railway.app address while a new deployment is being verified before the
 * real domains point at it; clear it once they do.
 */
const EXTRA_API_HOSTS = new Set(
  (process.env.EXTRA_API_HOSTS || '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)
)

// This is a temporary override that would otherwise outlive the migration
// invisibly, so make every cold start announce it in the deployment log. Read
// once at module scope, which means changing it needs a restart, not just an
// edit in a dashboard.
if (EXTRA_API_HOSTS.size > 0 && process.env.NODE_ENV === 'production') {
  console.error(`[middleware] EXTRA_API_HOSTS is set (${[...EXTRA_API_HOSTS].join(', ')}): these hostnames can reach the API directly. Clear it once verification is finished.`)
}

/**
 * The cookie only picks a navbar theme, so it is not a security boundary, but
 * there is no reason to send it over plain HTTP or across sites. `secure` is off
 * in development because localhost is not HTTPS.
 */
const COOKIE_OPTIONS = {
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
} as const

/** Strip the port so `localhost:4000` and `vantixe.ai:443` compare cleanly. */
function hostnameOf(request: NextRequest): string {
  return (request.headers.get('host') || '').split(':')[0].toLowerCase()
}

export function middleware(request: NextRequest) {
  const hostname = hostnameOf(request)
  const isAi = AI_HOSTS.has(hostname)

  // The API is the only endpoint that writes anything: it sends mail. The
  // hosting provider's own URL stays publicly reachable after the domains move,
  // so answer the API only on hostnames we recognise. Pages are left alone,
  // because a platform health check arrives under a name we cannot enumerate
  // and must still get a 200.
  //
  // Be honest about the strength of this: Host is a request header the caller
  // chooses, so anyone who sets it to a real domain passes. It stops scanners
  // and anything that reaches the platform URL by its own name, and nothing
  // more. It is NOT a substitute for the rate limit, and it does not make the
  // client-address headers trustworthy. Closing that properly needs a shared
  // secret injected by whatever sits in front, or an origin with no public
  // route at all.
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const allowed =
      isAi ||
      COM_HOSTS.has(hostname) ||
      DEV_HOSTS.has(hostname) ||
      EXTRA_API_HOSTS.has(hostname)
    if (!allowed) {
      return NextResponse.json({ error: 'Not found' }, { status: 403 })
    }
  }

  // When accessing vantixe.ai, rewrite paths to /technology/*
  if (isAi) {
    const { pathname } = request.nextUrl
    let response: NextResponse

    if (pathname === '/') {
      response = NextResponse.rewrite(new URL('/technology', request.url))
    } else if (
      pathname === '/tprm' ||
      pathname === '/sourcing-agent' ||
      pathname === '/category-strategy' ||
      pathname === '/security'
    ) {
      response = NextResponse.rewrite(
        new URL(`/technology${pathname}`, request.url)
      )
    } else {
      response = NextResponse.next()
    }

    // Set cookie so client components know we're on .ai domain
    response.cookies.set('vantixe-domain', 'ai', COOKIE_OPTIONS)
    return response
  }

  const response = NextResponse.next()
  response.cookies.set('vantixe-domain', 'com', COOKIE_OPTIONS)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|images|logos|.*\\..*).*)'],
}
