import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const DISCORD_API_URL = "https://discord.com/api/v10";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken) {
      if (supabaseAdmin) {
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("username, avatar_url")
          .eq("discord_id", userId)
          .maybeSingle();

        if (profile) {
          let defaultIndex = 0;
          try {
            defaultIndex = Number((BigInt(userId) >> BigInt(22)) % BigInt(6));
          } catch {}

          return NextResponse.json({
            id: userId,
            username: profile.username || "Owner",
            discriminator: null,
            avatar: null,
            avatarUrl: profile.avatar_url || `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`,
            global_name: profile.username || "Owner",
          });
        }
      }
      return NextResponse.json(
        { error: "Discord bot token not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(`${DISCORD_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (supabaseAdmin) {
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("username, avatar_url")
          .eq("discord_id", userId)
          .maybeSingle();

        if (profile) {
          let defaultIndex = 0;
          try {
            defaultIndex = Number((BigInt(userId) >> BigInt(22)) % BigInt(6));
          } catch {}

          return NextResponse.json({
            id: userId,
            username: profile.username || "Owner",
            discriminator: null,
            avatar: null,
            avatarUrl: profile.avatar_url || `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`,
            global_name: profile.username || "Owner",
          });
        }
      }
      if (response.status === 404) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: response.status }
      );
    }

    const user = await response.json();

    // Construct avatar URL if avatar exists, otherwise use default avatar
    let avatarUrl = null;
    if (user.avatar) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.png?size=256`;
    } else {
      // Default avatar based on user discriminator or user ID
      let defaultIndex: number;
      if (user.discriminator) {
        defaultIndex = parseInt(user.discriminator) % 5;
      } else {
        const bigUserId = BigInt(userId);
        defaultIndex = Number((bigUserId >> BigInt(22)) % BigInt(6));
      }
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      avatarUrl: avatarUrl,
      global_name: user.global_name,
    });
  } catch (error) {
    console.error("Discord API error:", error);
    try {
      if (supabaseAdmin) {
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("username, avatar_url")
          .eq("discord_id", userId)
          .maybeSingle();

        if (profile) {
          let defaultIndex = 0;
          try {
            defaultIndex = Number((BigInt(userId) >> BigInt(22)) % BigInt(6));
          } catch {}

          return NextResponse.json({
            id: userId,
            username: profile.username || "Owner",
            discriminator: null,
            avatar: null,
            avatarUrl: profile.avatar_url || `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`,
            global_name: profile.username || "Owner",
          });
        }
      }
    } catch (fallbackError) {
      console.error("Supabase fallback error:", fallbackError);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
