import { NextRequest, NextResponse } from "next/server";
import { createSession, makeSessionCookie } from "@/lib/sessions";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/api/auth/callback`;

  console.log("=== CALLBACK DEBUG ===");
  console.log("code present:", !!code);
  console.log("error:", error, errorDescription);
  console.log("baseUrl:", baseUrl);
  console.log("redirectUri:", redirectUri);

  if (error) {
    console.log("OAuth error:", error, errorDescription);
    return NextResponse.redirect(new URL(`/?auth=error&msg=${encodeURIComponent(errorDescription || error)}`, baseUrl));
  }

  if (!code) {
    console.log("No code provided");
    return NextResponse.redirect(new URL("/?auth=missing_code", baseUrl));
  }

  const DISCORD_API_URL = "https://discord.com/api/v10";
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";
  const GUILD_ID = process.env.DISCORD_GUILD_ID || "";
  const SESSION_SECRET = process.env.SESSION_SECRET || "odf_base_session_secret_v3_xK9mP2nL4qR8tW6yZ1aB3cD5eF7gH0jI";

  console.log("CLIENT_ID configured:", !!CLIENT_ID);
  console.log("BOT_TOKEN configured:", !!BOT_TOKEN);
  console.log("GUILD_ID configured:", GUILD_ID);

  try {
    console.log("Exchanging code for token...");

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    const tokenRes = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const tokenText = await tokenRes.text();
    console.log("Token response status:", tokenRes.status);

    if (!tokenRes.ok) {
      console.log("Token exchange failed:", tokenText.substring(0, 200));
      return NextResponse.redirect(new URL(`/?auth=failed&msg=token_exchange_failed`, baseUrl));
    }

    const tokenData = JSON.parse(tokenText);
    console.log("Token obtained, fetching user...");

    const userRes = await fetch(`${DISCORD_API_URL}/users/@me`, {
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

    // TEMPORARY BYPASS FOR TESTING - Set ALLOW_ALL_TESTERS=true in .env to bypass membership
    const allowAllTesters = process.env.ALLOW_ALL_TESTERS === "true";
    if (allowAllTesters) {
      console.log("ALLOW_ALL_TESTERS enabled - granting member access");
      isMember = true;
    } else if (!GUILD_ID || !BOT_TOKEN) {
      console.log("GUILD_ID or BOT_TOKEN not configured - granting member access");
      isMember = true;
    } else {
      try {
        const memberRes = await fetch(`${DISCORD_API_URL}/guilds/${GUILD_ID}/members/${discordUser.id}`, {
          headers: { Authorization: `Bot ${BOT_TOKEN}` },
        });

        console.log("Membership check status:", memberRes.status);
        console.log("Membership check headers:", JSON.stringify(Object.fromEntries(memberRes.headers.entries())));

        if (memberRes.status === 200) {
          isMember = true;
          const memberData = await memberRes.json();
          console.log("Member data:", JSON.stringify(memberData));
        } else if (memberRes.status === 404) {
          console.log("User is NOT a member of the guild");
          isMember = false;
        } else {
          const errorText = await memberRes.text();
          console.log("Membership check error response:", errorText);
        }
      } catch (e) {
        console.log("Membership check exception:", e);
      }
    }

    const isAdmin = (process.env.ADMIN_DISCORD_IDS || "").split(",").includes(discordUser.id);
    console.log("isMember:", isMember, "isAdmin:", isAdmin);

    const sessionToken = createSession(
      {
        id: discordUser.id,
        username: discordUser.username,
        discriminator: discordUser.discriminator || "0",
        avatar: discordUser.avatar || "",
        email: discordUser.email || "",
        isMember,
        isAdmin,
      },
      SESSION_SECRET
    );

    console.log("Session created, redirecting to dashboard...");

    const response = NextResponse.redirect(new URL("/dashboard", baseUrl));
    const cookieValue = makeSessionCookie(sessionToken);
    response.headers.set("Set-Cookie", cookieValue);

    return response;
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.redirect(new URL(`/?auth=failed&msg=${encodeURIComponent(String(err))}`, baseUrl));
  }
}