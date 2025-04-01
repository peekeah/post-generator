// middleware.ts (or middleware.js) at the root of your project
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Assuming you're using next-auth

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = [
    '/login',
    '/register',
    '/api/auth',
    // Add other public paths here
  ].some(publicPath => path.startsWith(publicPath));

  // Check if the path contains assets (like images, CSS, JS)
  const isAssetPath = [
    '/_next',
    '/images',
    '/favicon.ico',
    // Add other asset paths here
  ].some(assetPath => path.startsWith(assetPath));

  // Skip authentication for public paths and assets
  if (isPublicPath || isAssetPath) {
    return NextResponse.next();
  }

  // Authenticate user
  const token = await getToken({ req: request });

  // If no token is present, redirect to login or return unauthorized
  if (!token) {
    // For API routes, return an unauthorized response
    if (path.startsWith('/api/')) {
      return NextResponse.json(
        { status: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // For other routes, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // User is authenticated, allow the request to proceed
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except those starting with:
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
