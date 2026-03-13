import { NextRequest, NextResponse } from "next/server";

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "cargofi2026";
const COOKIE_NAME = "cargofi_demo_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /demo routes (not /demo/login or /demo/auth)
  if (
    pathname.startsWith("/demo") &&
    !pathname.startsWith("/demo/login") &&
    !pathname.startsWith("/demo/auth")
  ) {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (cookie?.value !== DEMO_PASSWORD) {
      const loginUrl = new URL("/demo/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/demo/:path*"],
};
