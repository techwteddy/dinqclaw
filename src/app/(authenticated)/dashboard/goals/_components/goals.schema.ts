import { z } from "zod";

export const GOALS_STORAGE_KEY = "redat.goals";

export const goalCategory = z.enum([
  "health",
  "relationships",
  "finance",
  "career",
  "interests",
  "productivity",
  "other",
]);
export type GoalCategory = z.infer<typeof goalCategory>;

export const storedGoal = z.object({
  id: z.string(),
  category: goalCategory,
  description: z.string(),
  createdAt: z.string(),
});
export type StoredGoal = z.infer<typeof storedGoal>;

export const storedGoals = z.array(storedGoal);

export const createGoalInput = z.object({
  category: goalCategory,
  description: z.string().min(1, "Tell Lucy what you're after").max(500),
});
export type CreateGoalInput = z.infer<typeof createGoalInput>;
