import "server-only";

import { gateway, type LanguageModel } from "ai";
import {
  ALLOWED_GEMINI_MODELS,
  DEFAULT_GEMINI_MODEL,
  type AllowedGeminiModel,
} from "~/server/api/routers/trustclaw/createInstance.schema";

const LEGACY_ANTHROPIC_MODEL_MAP: Record<string, AllowedGeminiModel> = {
  "claude-sonnet-4-5-20250929": "gemini-1.5-flash",
  "claude-opus-4-6": "gemini-1.5-pro",
  "claude-haiku-4-5-20251001": "gemini-1.5-flash-8b",
};

export function resolveStoredGeminiModel(storedModelId: string): AllowedGeminiModel {
  if ((ALLOWED_GEMINI_MODELS as readonly string[]).includes(storedModelId)) {
    return storedModelId as AllowedGeminiModel;
  }
  return LEGACY_ANTHROPIC_MODEL_MAP[storedModelId] ?? DEFAULT_GEMINI_MODEL;
}

export function getAgentLanguageModel(storedModelId: string): LanguageModel {
  const modelId = resolveStoredGeminiModel(storedModelId);
  return gateway(`google/${modelId}`);
}
