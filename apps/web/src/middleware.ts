import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');

    if (request.nextUrl.pathname.startsWith('/board/history') && !token) {
        return NextResponse.rewrite(new URL('/auth/sign-in', request.url))
      }

    return NextResponse.next();
}

export const config = {
    matcher: ['/board/history/:path*'], 
};
