import { z } from "zod";

export const ALLOWED_GEMINI_MODELS = [
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
] as const;

export const DEFAULT_GEMINI_MODEL = "gemini-1.5-flash";

export type AllowedGeminiModel = (typeof ALLOWED_GEMINI_MODELS)[number];

export const allowedGeminiModelSchema = z.enum(ALLOWED_GEMINI_MODELS);

/** @deprecated Use allowedGeminiModelSchema — kept for gradual import renames */
export const allowedAnthropicModelSchema = allowedGeminiModelSchema;

/** @deprecated Use ALLOWED_GEMINI_MODELS */
export const ALLOWED_ANTHROPIC_MODELS = ALLOWED_GEMINI_MODELS;

export const createInstanceInput = z.object({
  anthropicModel: allowedGeminiModelSchema.default(DEFAULT_GEMINI_MODEL),
});

export type CreateInstanceInput = z.infer<typeof createInstanceInput>;
