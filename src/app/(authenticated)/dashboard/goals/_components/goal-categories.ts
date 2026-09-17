import {
  Briefcase,
  Circle,
  Heart,
  Palette,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import type { GoalCategory } from "./goals.schema";

export const GOAL_CATEGORIES = [
  { value: "health", label: "Health", icon: Heart },
  { value: "relationships", label: "Relationships", icon: Users },
  { value: "finance", label: "Finance", icon: Wallet },
  { value: "career", label: "Career", icon: Briefcase },
  { value: "interests", label: "Interests", icon: Palette },
  { value: "productivity", label: "Productivity", icon: Zap },
  { value: "other", label: "Something else", icon: Circle },
] as const satisfies ReadonlyArray<{
  value: GoalCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}>;

export function goalCategoryLabel(category: GoalCategory) {
  return (
    GOAL_CATEGORIES.find((entry) => entry.value === category)?.label ??
    "Something else"
  );
}
