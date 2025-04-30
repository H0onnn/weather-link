import { NextRequest, NextResponse } from 'next/server';

import { PATH } from './constants/paths';

type PathValue = (typeof PATH)[keyof typeof PATH];

// 로그인한 사용자가 접근할 수 없는 경로
const authRoutes: PathValue[] = [PATH.signUp, PATH.findPassword];

// 로그인하지 않은 사용자가 접근할 수 있는 경로
const publicRoutes: PathValue[] = [PATH.signUp, PATH.login, PATH.findPassword];

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('token')?.value;

  const isPathValue = (path: string): path is PathValue => {
    return Object.values(PATH).includes(path as PathValue);
  };

  const isAuthRoute = isPathValue(pathname) && authRoutes.includes(pathname);
  const isPublicRoute = isPathValue(pathname) && publicRoutes.includes(pathname);

  if (accessToken) {
    if (isAuthRoute) {
      console.info(`[Middleware] Logged in user accessing ${pathname}. Redirecting to ${PATH.root}`);
      return NextResponse.redirect(new URL(PATH.root, request.url));
    }
  } else {
    if (!isPublicRoute) {
      console.info(`[Middleware] Logged out user accessing ${pathname}. Redirecting to ${PATH.login}`);
      return NextResponse.redirect(new URL(PATH.login, request.url));
    }
  }

  console.info(`[Middleware] Allowing access to ${pathname}`);
  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
