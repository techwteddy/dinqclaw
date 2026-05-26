const GEMINI_CONTEXT_WINDOWS: Record<string, number> = {
  "gemini-2.0-flash": 1_048_576,
  "gemini-1.5-pro": 2_097_152,
  "gemini-1.5-flash": 1_048_576,
};

const DEFAULT_CONTEXT_WINDOW = 1_048_576;

export function getContextWindow(modelId: string): number {
  return GEMINI_CONTEXT_WINDOWS[modelId] ?? DEFAULT_CONTEXT_WINDOW;
}
