import "server-only";

import type { PostgrestError } from "@supabase/supabase-js";
import type { LanguageModelUsage } from "ai";
import { getSupabaseAdmin, isSupabaseConfigured } from "~/server/clients/supabase";

export const DINQCLAW_DAILY_TOKEN_LIMIT = 50_000;

export const DINQCLAW_DAILY_LIMIT_MESSAGE =
  "You have reached your daily limit of 50,000 tokens. It resets at midnight. Stay tuned for upgrade options.";

export function sumTokenUsage(
  usage: LanguageModelUsage | undefined,
): number {
  if (!usage) return 0;
  const inputTokens = usage.inputTokens ?? 0;
  const outputTokens = usage.outputTokens ?? 0;
  const cacheReadTokens = usage.inputTokenDetails?.cacheReadTokens ?? 0;
  const cacheWriteTokens = usage.inputTokenDetails?.cacheWriteTokens ?? 0;
  return inputTokens + outputTokens + cacheReadTokens + cacheWriteTokens;
}

export async function checkDinqclawTokenLimit(
  userId: string,
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return true;

  const rpcResult: {
    data: boolean | null;
    error: PostgrestError | null;
  } = await supabase.rpc("check_dinqclaw_limit", {
    p_user_id: userId,
    p_daily_limit: DINQCLAW_DAILY_TOKEN_LIMIT,
  });
  const { data, error } = rpcResult;

  if (error) return true;
  return data === true;
}

export async function resolveDinqId(options: {
  userId: string;
  telegramChatId?: string;
}): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  if (options.telegramChatId) {
    const { data } = await supabase
      .from("dinqclaw_connections")
      .select("dinq_id")
      .eq("telegram_chat_id", options.telegramChatId)
      .maybeSingle();

    if (data?.dinq_id && typeof data.dinq_id === "string") {
      return data.dinq_id;
    }
  }

  const { data } = await supabase
    .from("dinqclaw_connections")
    .select("dinq_id")
    .eq("user_id", options.userId)
    .maybeSingle();

  if (data?.dinq_id && typeof data.dinq_id === "string") {
    return data.dinq_id;
  }

  return null;
}

export async function logDinqclawUsage(options: {
  userId: string;
  dinqId: string | null;
  tokensUsed: number;
  messages?: number;
}): Promise<void> {
  if (options.tokensUsed <= 0) return;

  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  await supabase.rpc("log_dinqclaw_usage", {
    p_user_id: options.userId,
    p_dinq_id: options.dinqId ?? "",
    p_tokens: options.tokensUsed,
    p_messages: options.messages ?? 1,
  });
}

export function isDinqclawUsageConfigured(): boolean {
  return isSupabaseConfigured();
}
