"use client";

import { useCallback, useEffect, useState } from "react";

import {
  GOALS_STORAGE_KEY,
  storedGoals,
  type GoalCategory,
  type StoredGoal,
} from "./goals.schema";

function readGoals(): StoredGoal[] {
  const raw = localStorage.getItem(GOALS_STORAGE_KEY);
  if (!raw) return [];
  const parsed = storedGoals.safeParse(JSON.parse(raw));
  return parsed.success ? parsed.data : [];
}

export function useStoredGoals() {
  const [goals, setGoals] = useState<StoredGoal[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      setGoals(readGoals());
    } catch {
      setGoals([]);
    }
    setIsHydrated(true);
  }, []);

  const persist = useCallback((next: StoredGoal[]) => {
    setGoals(next);
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addGoal = useCallback(
    (category: GoalCategory, description: string) => {
      persist([
        ...goals,
        {
          id: crypto.randomUUID(),
          category,
          description,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    [goals, persist],
  );

  const removeGoal = useCallback(
    (id: string) => {
      persist(goals.filter((goal) => goal.id !== id));
    },
    [goals, persist],
  );

  return { goals, isHydrated, addGoal, removeGoal };
}
