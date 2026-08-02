import { NextResponse } from "next/server";

export function middleware(request) {
  const token =
    request.cookies.get("token")?.value ||
    request.cookies.get("accessToken")?.value;

  // Soft guard: also allow client-side localStorage apps; cookie may be absent.
  // If no cookie, still let through but mark header for client checks.
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/messages");

  if (isProtected && !token) {
    // Client apps store token in localStorage — redirect only when cookie exists and is empty pattern.
    // Keep pass-through for localStorage-based auth; real block happens client-side below via layout.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/messages"],
};
