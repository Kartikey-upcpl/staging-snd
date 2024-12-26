import { NextRequest, NextResponse } from 'next/server';

const userProtection = process.env.USER_PROTECTION === 'TRUE';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isLogin = req.cookies.get('User-Token')?.value;

    // Detect mobile user-agent
    const userAgent = req.headers.get('user-agent') || '';
    const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
    
    // Redirect mobile users from `/` to `/m`
    if (isMobile && path === '/') {
        return NextResponse.redirect(new URL('/m', req.url));
    }

      // Redirect desktop users to `/` if they are on `/m`
      if (!isMobile && path === '/m') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Enable user protection allways redirect to login page if user is not logged in
    if (userProtection && isLogin === undefined) {
        return NextResponse.redirect(new URL('/login', req.url));
    } else {
        if (!isLogin && path.startsWith('/my-account')) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (isLogin && path == '/login') {
            return NextResponse.redirect(new URL('/my-account', req.url));
        }

    }
    return NextResponse.next()
}


export const config = {
    // matcher: ['/my-account', '/my-account/:path*', '/login'],
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|login|_next/static|_next/image|favicon.ico|assets).*)',
    ],
}