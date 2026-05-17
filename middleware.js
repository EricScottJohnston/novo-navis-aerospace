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
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.xml|.*\\.txt).*)',
  ],
}

import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';

  // Reject requests coming from localhost:4200
  if (origin.includes('localhost:4200') || referer.includes('localhost:4200')) {
    return new NextResponse('Access Denied: Localhost requests are restricted.', {
      status: 403,
    });
  }
