import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CLIENT_ID = process.env.DISCORD_CLIENT_ID || "1504945911850205205";

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Use the current domain's own callback as the redirect URI.
  // This URI MUST be registered in the Discord Developer Portal under OAuth2 → Redirects.
  const redirectUri = `${baseUrl}/api/auth/callback`;

  const state = Math.random().toString(36).substring(2, 15);
  const scopes = "guilds.members.read identify";

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes,
    state,
  });

  const discordAuthUrl = `https://discord.com/oauth2/authorize?${params.toString()}`;
  return NextResponse.redirect(discordAuthUrl);
}
