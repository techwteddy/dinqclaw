import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "~/env";

const AI_GATEWAY_BASE_URL = "https://ai-gateway.vercel.sh/v3/ai";

function resolveApiKey(): string {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY;
  if (gatewayKey) return gatewayKey;
  if (env.GOOGLE_GENERATIVE_AI_API_KEY) return env.GOOGLE_GENERATIVE_AI_API_KEY;
  return "";
}

function useAiGateway(): boolean {
  return !!(
    process.env.AI_GATEWAY_API_KEY ||
    process.env.VERCEL ||
    process.env.VERCEL_OIDC_TOKEN
  );
}

export const google = createGoogleGenerativeAI({
  apiKey: resolveApiKey(),
  ...(useAiGateway() ? { baseURL: AI_GATEWAY_BASE_URL } : {}),
});
