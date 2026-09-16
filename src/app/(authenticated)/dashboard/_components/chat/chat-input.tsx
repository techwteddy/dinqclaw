"use client";

import { useCallback } from "react";
import type { ChatStatus } from "ai";
import { showErrorToast } from "~/components/core/toast-notifications";
import { PromptInputBox } from "~/components/ui/prompt-input-box";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  status: ChatStatus;
}

const MAX_MESSAGE_LENGTH = 50_000;

export function ChatInput({ onSend, onStop, status }: ChatInputProps) {
  const isStreaming = status === "streaming" || status === "submitted";

  const handleSend = useCallback(
    (message: string) => {
      const trimmed = message.trim();
      if (!trimmed || isStreaming) return;
      if (trimmed.length > MAX_MESSAGE_LENGTH) {
        showErrorToast(
          `Message is too long (${trimmed.length.toLocaleString()}/${MAX_MESSAGE_LENGTH.toLocaleString()})`,
        );
        return;
      }
      onSend(trimmed);
    },
    [isStreaming, onSend],
  );

  return (
    <div className="border-border bg-background border-t p-3 md:p-4">
      <div className="mx-auto max-w-2xl">
        <PromptInputBox
          onSend={handleSend}
          onStop={onStop}
          isLoading={isStreaming}
          placeholder={
            isStreaming ? "Waiting for response..." : "Ask me anything..."
          }
        />
      </div>
    </div>
  );
}
