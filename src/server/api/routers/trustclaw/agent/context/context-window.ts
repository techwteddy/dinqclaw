const GEMINI_CONTEXT_WINDOWS: Record<string, number> = {
  "gemini-3.5-flash": 1_048_576,
  "gemini-3.1-flash-lite": 1_048_576,
};

const DEFAULT_CONTEXT_WINDOW = 1_048_576;

export function getContextWindow(modelId: string): number {
  return GEMINI_CONTEXT_WINDOWS[modelId] ?? DEFAULT_CONTEXT_WINDOW;
}
