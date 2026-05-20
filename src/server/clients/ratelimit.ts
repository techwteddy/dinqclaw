import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import moment from "moment";
import { env } from "~/env";

export function isUpstashRateLimitConfigured(): boolean {
  return !!(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
}

function getUpstashRedis(): Redis | null {
  if (!isUpstashRateLimitConfigured()) return null;
  return new Redis({
    url: env.UPSTASH_REDIS_REST_URL!,
    token: env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

const globalForRatelimit = globalThis as typeof globalThis & {
  signUpRatelimit?: Ratelimit;
  chatRatelimit?: Ratelimit;
  telegramRatelimit?: Ratelimit;
};

function getSignUpRatelimit(): Ratelimit | null {
  const redis = getUpstashRedis();
  if (!redis) return null;
  globalForRatelimit.signUpRatelimit ??= new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "dinqclaw:ratelimit:sign-up",
  });
  return globalForRatelimit.signUpRatelimit;
}

function getChatRatelimit(): Ratelimit | null {
  const redis = getUpstashRedis();
  if (!redis) return null;
  globalForRatelimit.chatRatelimit ??= new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    prefix: "dinqclaw:ratelimit:chat",
  });
  return globalForRatelimit.chatRatelimit;
}

function getTelegramRatelimit(): Ratelimit | null {
  const redis = getUpstashRedis();
  if (!redis) return null;
  globalForRatelimit.telegramRatelimit ??= new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 h"),
    prefix: "dinqclaw:ratelimit:telegram",
  });
  return globalForRatelimit.telegramRatelimit;
}

export function formatRateLimitMessage(options: {
  limit: number;
  unit: string;
  period: string;
  resetMs: number;
}): string {
  const resetAt = moment(options.resetMs).format("MMM D, YYYY h:mm A");
  return `You've reached your limit of ${options.limit} ${options.unit} per ${options.period}. Try again after ${resetAt}.`;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

async function isRateLimited(
  ratelimit: Ratelimit | null,
  identifier: string,
): Promise<{
  limited: boolean;
  limit: number;
  reset: number;
} | null> {
  if (!ratelimit) return null;
  const result = await ratelimit.limit(identifier);
  return {
    limited: !result.success,
    limit: result.limit,
    reset: result.reset,
  };
}

export async function checkSignUpRateLimit(
  request: Request,
): Promise<Response | null> {
  const ratelimit = getSignUpRatelimit();
  const result = await isRateLimited(ratelimit, getClientIp(request));
  if (!result?.limited) return null;

  const message = formatRateLimitMessage({
    limit: result.limit,
    unit: "sign-up attempts",
    period: "hour",
    resetMs: result.reset,
  });

  return Response.json({ message }, { status: 429 });
}

export async function checkChatRateLimit(
  userId: string,
): Promise<Response | null> {
  const ratelimit = getChatRatelimit();
  const result = await isRateLimited(ratelimit, userId);
  if (!result?.limited) return null;

  const message = formatRateLimitMessage({
    limit: result.limit,
    unit: "chat messages",
    period: "day",
    resetMs: result.reset,
  });

  return new Response(message, { status: 429 });
}

export async function checkTelegramMessageRateLimit(
  chatId: string,
): Promise<string | null> {
  const ratelimit = getTelegramRatelimit();
  const result = await isRateLimited(ratelimit, chatId);
  if (!result?.limited) return null;

  return formatRateLimitMessage({
    limit: result.limit,
    unit: "Telegram messages",
    period: "hour",
    resetMs: result.reset,
  });
}
