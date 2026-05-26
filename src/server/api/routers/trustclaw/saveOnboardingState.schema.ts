import { z } from "zod";
import {
  allowedGeminiModelSchema,
  DEFAULT_GEMINI_MODEL,
} from "./createInstance.schema";

export const onboardingStepSchema = z.enum([
  "name",
  "language",
  "writing-style",
  "personality",
  "emoji",
  "lore",
  "model",
  "integrations",
  "telegram",
]);

export type OnboardingStep = z.infer<typeof onboardingStepSchema>;

export const saveOnboardingStateInput = z.object({
  currentStep: onboardingStepSchema,
  name: z.string().default(""),
  language: z.string().nullable().default(null),
  writingStyle: z.string().nullable().default(null),
  personality: z.string().nullable().default(null),
  emoji: z.string().nullable().default(null),
  lore: z.string().default(""),
  anthropicModel: allowedGeminiModelSchema.default(DEFAULT_GEMINI_MODEL),
});

export type SaveOnboardingStateInput = z.infer<typeof saveOnboardingStateInput>;
