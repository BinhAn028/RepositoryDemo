import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;
  const allParams = Object.fromEntries(searchParams.entries());
  //
  const response = NextResponse.next();
  response.headers.set('x-search-param', JSON.stringify(allParams) || '');
  response.headers.set('x-path-name', url.pathname || '');
  response.headers.set('x-original-url', url.origin || '');
  //
  return response;
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
