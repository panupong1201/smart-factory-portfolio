import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Allowed IP address
const ALLOWED_IP = '192.168.2.191';

export function middleware(request: NextRequest) {
  // Get client IP from various sources
  const ip = 
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-client-ip') ||
    'unknown';

  // If IP is not allowed, return 403 Forbidden
  if (ip !== ALLOWED_IP) {
    return NextResponse.json(
      { 
        error: 'Access Denied',
        message: `Your IP address (${ip}) is not authorized to access this portfolio.`,
        allowedIP: ALLOWED_IP
      },
      { status: 403 }
    );
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
