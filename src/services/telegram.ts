import { supabase } from "@/lib/supabase";

interface TelegramBot {
  id: string;
  bot_token: string;
  username: string;
  created_at: string;
}

interface TelegramChannel {
  id: string;
  channel_id: string;
  title: string;
  username: string;
  members_count: number;
  created_at: string;
}

interface TelegramPost {
  id: string;
  channel_id: string;
  message: string;
  media_urls: string[];
  scheduled_for: string;
  created_at: string;
}

export async function connectTelegramBot(botToken: string): Promise<TelegramBot> {
  try {
    // Verify bot token with Telegram API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const data = await response.json();

    if (!data.ok) {
      throw new Error("Invalid bot token");
    }

    // Save bot info to database
    const { data: bot, error } = await supabase
      .from("telegram_bots")
      .insert({
        bot_token: botToken,
        username: data.result.username,
      })
      .select()
      .single();

    if (error) throw error;
    return bot;
  } catch (error) {
    console.error("Error connecting Telegram bot:", error);
    throw error;
  }
}

export async function getTelegramChannels(): Promise<TelegramChannel[]> {
  try {
    const { data: channels, error } = await supabase
      .from("telegram_channels")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return channels;
  } catch (error) {
    console.error("Error getting Telegram channels:", error);
    throw error;
  }
}

export async function createTelegramPost(post: Omit<TelegramPost, "id" | "created_at">): Promise<TelegramPost> {
  try {
    const { data, error } = await supabase
      .from("telegram_posts")
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating Telegram post:", error);
    throw error;
  }
}

export async function getTelegramAnalytics(channelId: string, startDate: string, endDate: string) {
  try {
    const { data, error } = await supabase
      .rpc("get_telegram_analytics", {
        p_channel_id: channelId,
        p_start_date: startDate,
        p_end_date: endDate,
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting Telegram analytics:", error);
    throw error;
  }
}

export async function scheduleTelegramPost(channelId: string, message: string, mediaUrls: string[], scheduledFor: string): Promise<TelegramPost> {
  try {
    const post = {
      channel_id: channelId,
      message,
      media_urls: mediaUrls,
      scheduled_for: scheduledFor,
    };

    const { data, error } = await supabase
      .from("telegram_posts")
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error scheduling Telegram post:", error);
    throw error;
  }
}

export async function getTelegramMembers(channelId: string) {
  try {
    const { data, error } = await supabase
      .from("telegram_members")
      .select("*")
      .eq("channel_id", channelId)
      .order("joined_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting Telegram members:", error);
    throw error;
  }
}
