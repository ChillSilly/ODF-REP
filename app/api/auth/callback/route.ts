import { NextRequest, NextResponse } from "next/server";
import { createSession, makeSessionCookie } from "@/lib/sessions";

export const dynamic = "force-dynamic";

const ADMIN_USER_IDS = ["1504945911850205205"];
const CLIENT_ID = process.env.DISCORD_CLIENT_ID || "1504945911850205205";
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "KckngUYE-NTj8J_8eyE6M8Nn6RdJdczD";
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "MTUwNDk0NTkxMTg1MDIwNTIwNQ.GY7jiO.d8c5UQyZkIts3bDA1oft5a1dMF3uXIrfu1vD0s";
const GUILD_ID = process.env.DISCORD_GUILD_ID || "1456106000099578060";
const SESSION_SECRET = process.env.SESSION_SECRET || "odf_base_session_secret_v3_xK9mP2nL4qR8tW6yZ1aB3cD5eF7gH0jI";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Determine current origin dynamically
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // The redirect URI for token exchange MUST exactly match what was sent to Discord in the login route.
  // The login route uses the current domain's own callback.
  const redirectUri = `${baseUrl}/api/auth/callback`;

  console.log("=== CALLBACK DEBUG ===");
  console.log("code present:", !!code);
  console.log("error:", error, errorDescription);
  console.log("baseUrl:", baseUrl);
  console.log("redirectUri for token exchange:", redirectUri);

  if (error) {
    console.log("OAuth error:", error, errorDescription);
    return NextResponse.redirect(new URL(`/?auth=error&msg=${encodeURIComponent(errorDescription || error)}`, baseUrl));
  }

  if (!code) {
    console.log("No code provided");
    return NextResponse.redirect(new URL("/?auth=missing_code", baseUrl));
  }

  try {
    console.log("Exchanging code for token...");
    
    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    const tokenRes = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const tokenText = await tokenRes.text();
    console.log("Token response:", tokenRes.status, tokenText.substring(0, 200));

    if (!tokenRes.ok) {
      console.log("Token exchange failed:", tokenText);
      return NextResponse.redirect(new URL(`/?auth=failed&msg=token_exchange_failed`, baseUrl));
    }

    const tokenData = JSON.parse(tokenText);
    console.log("Token obtained, fetching user...");
    
    const userRes = await fetch("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      console.log("Failed to get user");
      return NextResponse.redirect(new URL("/?auth=failed&msg=user_error", baseUrl));
    }

    const discordUser = await userRes.json();
    console.log("User:", discordUser.username, discordUser.id);
    
    console.log("Checking membership in guild:", GUILD_ID);
    let isMember = false;

    try {
      const memberRes = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordUser.id}`, {
        headers: { Authorization: `Bot ${BOT_TOKEN}` },
      });
      
      console.log("Membership check:", memberRes.status);
      isMember = memberRes.ok;
    } catch (e) {
      console.log("Membership check error:", e);
    }

    const isAdmin = ADMIN_USER_IDS.includes(discordUser.id);
    console.log("isMember:", isMember, "isAdmin:", isAdmin);

    const sessionToken = createSession(
      {
        id: discordUser.id,
        username: discordUser.username,
        discriminator: discordUser.discriminator,
        avatar: discordUser.avatar || "",
        isMember,
        isAdmin,
      },
      SESSION_SECRET
    );

    console.log("Session created, redirecting to dashboard...");
    
    const response = NextResponse.redirect(new URL("/dashboard", baseUrl));
    const cookieValue = makeSessionCookie(sessionToken);
    console.log("Setting cookie:", cookieValue.substring(0, 50) + "...");
    response.headers.set("Set-Cookie", cookieValue);
    
    return response;
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(new URL(`/?auth=failed&msg=${encodeURIComponent(String(err))}`, baseUrl));
  }
}