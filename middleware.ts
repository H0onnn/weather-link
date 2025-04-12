import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const { next } = NextResponse;

  console.info('middleware test', pathname);

  return next();
};

export const config = {
  matcher: ['/', '/login', '/join'],
};
