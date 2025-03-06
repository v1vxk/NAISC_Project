import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has('auth_token')

  // Paths that don't require authentication
  const publicPaths = ['/login', '/api']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // Allow API and public paths to pass through
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Redirect to login if accessing protected route while not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
