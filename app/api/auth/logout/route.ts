import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(new URL("/", url.origin));
  response.headers.set("Set-Cookie", "odf_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  return response;
}