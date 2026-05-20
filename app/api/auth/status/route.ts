import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessions";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.SESSION_SECRET || "odf_base_session_secret_v3_xK9mP2nL4qR8tW6yZ1aB3cD5eF7gH0jI";
  
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/odf_session=([^;]+)/);
  
  if (!match) {
    return NextResponse.json({ authenticated: false });
  }

  const session = getSession(match[1], secret);
  
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.userId,
      username: session.username,
      avatar: session.avatar,
      isMember: session.isMember,
      isAdmin: session.isAdmin,
    },
  });
}