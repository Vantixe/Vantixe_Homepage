import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const isAi = host.includes('vantixe.ai')

  // When accessing vantixe.ai, rewrite paths to /technology/*
  if (isAi) {
    const { pathname } = request.nextUrl
    let response: NextResponse

    if (pathname === '/') {
      response = NextResponse.rewrite(new URL('/technology', request.url))
    } else if (
      pathname === '/tprm' ||
      pathname === '/negotiation-agent' ||
      pathname === '/category-strategy'
    ) {
      response = NextResponse.rewrite(
        new URL(`/technology${pathname}`, request.url)
      )
    } else {
      response = NextResponse.next()
    }

    // Set cookie so client components know we're on .ai domain
    response.cookies.set('vantixe-domain', 'ai', { path: '/' })
    return response
  }

  const response = NextResponse.next()
  response.cookies.set('vantixe-domain', 'com', { path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|images|logos|.*\\..*).*)'],
}
