import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSessionCookie } from "@/lib/sessions";

const publicRoutes = ["/", "/brain", "/glossary", "/market-regimes", "/api"];
const authRoutes = ["/api/auth/login", "/api/auth/callback"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  if (authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const secret = process.env.SESSION_SECRET || "odf_base_session_secret_v3_xK9mP2nL4qR8tW6yZ1aB3cD5eF7gH0jI";
  const cookieHeader = request.headers.get("cookie") || "";
  const session = parseSessionCookie(cookieHeader, secret);

  if (!session) {
    const loginUrl = new URL("/api/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/module/:path*", "/content/:path*", "/admin/:path*"],
};
