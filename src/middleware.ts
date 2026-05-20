import { NextRequest, NextResponse } from 'next/server';

const BUYER_ROLES = ['BUYER'];
const FARMER_ROLES = ['FARMER'];
const RIDER_ROLES = ['RIDER'];
const DASHBOARD_ROLES = ['COOP_MANAGER', 'ADMIN'];
const ADMIN_ROLES = ['ADMIN'];

export function middleware(req: NextRequest) {
  const role = req.cookies.get('zao-role')?.value ?? '';
  const { pathname } = req.nextUrl;

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/login';

  if (pathname.startsWith('/buy') && !BUYER_ROLES.includes(role))
    return NextResponse.redirect(loginUrl);

  if (pathname.startsWith('/farmer') && !FARMER_ROLES.includes(role))
    return NextResponse.redirect(loginUrl);

  if (pathname.startsWith('/rider') && !RIDER_ROLES.includes(role))
    return NextResponse.redirect(loginUrl);

  if (pathname.startsWith('/dashboard') && !DASHBOARD_ROLES.includes(role))
    return NextResponse.redirect(loginUrl);

  if (pathname.startsWith('/admin') && !ADMIN_ROLES.includes(role))
    return NextResponse.redirect(loginUrl);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/buy/:path*',
    '/farmer/:path*',
    '/rider/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};
