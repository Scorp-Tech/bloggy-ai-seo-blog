import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('session:: ', { session })

  // If no session and trying to access protected routes
  // if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
  //   const redirectUrl = req.nextUrl.clone();
  //   redirectUrl.pathname = '/login';
  //   console.log('redirectUrl: 1: ', { redirectUrl })
  //   redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  //   return NextResponse.redirect(redirectUrl);
  // }

  // // If session exists and trying to access auth pages
  // if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
  //   const redirectUrl = req.nextUrl.clone();
  //   redirectUrl.pathname = '/dashboard';
  //   console.log('redirectUrl: 2: ', { redirectUrl })
  //   return NextResponse.redirect(redirectUrl);
  // }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}; 