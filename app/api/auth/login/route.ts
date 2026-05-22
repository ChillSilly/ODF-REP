import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const state = crypto.randomUUID();
  const clientId = process.env.DISCORD_CLIENT_ID || "1504945911850205205";
  const appUrl = process.env.APP_URL || "https://odf-sigma.vercel.app";
  const redirectUri = `${appUrl}/api/auth/callback`;
  const scopes = "guilds.members.read identify email";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes,
    state,
  });
  const oauthUrl = `https://discord.com/oauth2/authorize?${params.toString()}`;

  console.log("OAuth URL:", oauthUrl);
  console.log("redirectUri:", redirectUri);

  return NextResponse.redirect(oauthUrl);
}
