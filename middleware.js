import { NextResponse } from 'next/server'

const ALLOWED_COUNTRIES = new Set(['US', 'CA', 'IE', 'GB', 'AU'])

export function middleware(req) {
  const country = req.geo?.country || req.headers.get('x-vercel-ip-country')
  if (country && !ALLOWED_COUNTRIES.has(country)) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/intake', '/api/:path*'],
}
