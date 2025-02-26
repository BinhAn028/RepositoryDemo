import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;
  const allParams = Object.fromEntries(searchParams.entries());
  //

  const response = NextResponse.next();
  console.log('1111111111111')
  // response.headers.set("Access-Control-Expose-Headers", "X-Custom-Header");
  response.headers.set("X-Custom-Header", "Middleware!");
  response.headers.set('x-search-param', JSON.stringify(allParams) || '');
  // response.headers.set('x-path-name', url.pathname || '');
  response.headers.set('x-runtime', process.env.NEXT_RUNTIME || "unknown");
  //
  return response;
}

// only applies this middleware to files in the app directory
export const config = {
  // matcher: '/((?!api|static|.*\\..*|_next).*)',
  matcher: "/((?!static|.*\\..*|_next).*)",
  runtime: "nodejs", // Chạy trên Node.js thay vì Edge
};
