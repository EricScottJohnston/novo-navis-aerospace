// middleware.js — root of your Next.js project
// 1. Routes news.novonavis.com traffic to /news pages
// 2. Rejects requests from localhost:4200
// Place this file at the root of your repo, same level as /pages

import { NextResponse } from 'next/server'

export function middleware(request) {
  const hostname = request.headers.get('host') || ''
  const origin   = request.headers.get('origin') || ''
  const referer  = request.headers.get('referer') || ''
  const url      = request.nextUrl.clone()

  // ── Reject localhost:4200 requests ────────────────────────────
  if (origin.includes('localhost:4200') || referer.includes('localhost:4200')) {
    return new NextResponse('Access Denied: Localhost requests are restricted.', {
      status: 403,
    })
  }

  // ── Route news.novonavis.com to /news/* ───────────────────────
  if (hostname.startsWith('news.')) {
    if (!url.pathname.startsWith('/news')) {
      url.pathname = `/news${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.xml|.*\\.txt).*)',
  ],
}