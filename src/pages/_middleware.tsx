import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // const token = req.cookies
  // const { pathname, origin } = req.nextUrl
  // if (!token.jwtToken) {
  //   if (pathname !== '/login') {
  //     return NextResponse.redirect(new URL('/login', req.nextUrl))
  //   }
  // } else {
  //   if (pathname === '/login') {
  //     return NextResponse.redirect(new URL(`/`, req.nextUrl))
  //   } else {
  //     return NextResponse.next()
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*', '/login']
}
