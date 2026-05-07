// middleware.js — root of your Next.js project
// Routes news.novonavis.com traffic to /news pages
// Place this file at the root of your repo, same level as /pages

import { NextResponse } from 'next/server'

export function middleware(request) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Handle news.novonavis.com
  if (hostname.startsWith('news.')) {
    // Don't rewrite if already under /news to avoid infinite loop
    if (!url.pathname.startsWith('/news')) {
      url.pathname = `/news${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
