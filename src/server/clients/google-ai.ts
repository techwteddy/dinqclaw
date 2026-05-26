import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "~/env";

function resolveApiKey(): string {
  if (env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return env.GOOGLE_GENERATIVE_AI_API_KEY;
  }
  return "";
}

function createGoogleProvider() {
  return createGoogleGenerativeAI({
    apiKey: resolveApiKey(),
  });
}

export const google = createGoogleProvider();
