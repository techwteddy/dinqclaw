"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { LANGUAGES, type LanguageKey } from "./onboarding.consts";
import { StepLayout, itemVariants } from "./step-layout";

interface LanguageStepProps {
  value: LanguageKey;
  onChange: (language: LanguageKey) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function LanguageStep({
  value,
  onChange,
  onNext,
  onBack,
  onSkip,
}: LanguageStepProps) {
  return (
    <StepLayout
      title="What language should I speak?"
      onNext={onNext}
      onBack={onBack}
      onSkip={onSkip}
    >
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {LANGUAGES.map((language) => (
            <button
              key={language.key}
              type="button"
              onClick={() => onChange(language.key)}
              className={cn(
                "min-h-[44px] cursor-pointer rounded-lg border p-3 text-left transition-all",
                value === language.key
                  ? "border-primary ring-primary ring-2"
                  : "border-border hover:border-primary/50",
                language.key === "other" && "sm:col-span-3",
              )}
            >
              <p className="text-sm font-medium">{language.label}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </StepLayout>
  );
}
