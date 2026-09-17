"use client";

import { useState } from "react";
import moment from "moment";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { GOAL_CATEGORIES, goalCategoryLabel } from "./goal-categories";
import { CreateGoalDialog } from "./create-goal-dialog";
import { useStoredGoals } from "./use-stored-goals";
import type { GoalCategory } from "./goals.schema";

export function GoalsPageClient() {
  const { goals, isHydrated, addGoal, removeGoal } = useStoredGoals();
  const [activeCategory, setActiveCategory] = useState<GoalCategory | null>(
    null,
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Goals</h1>
      <Separator className="mt-4" />

      <section className="mt-6">
        <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Tracking
        </h2>

        {!isHydrated ? (
          <div className="mt-3 space-y-2">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        ) : goals.length === 0 ? (
          <p className="text-muted-foreground mt-3 text-sm">
            Nothing being tracked yet
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className="border-border bg-card flex items-start gap-3 rounded-xl border p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-[#E8A045]">
                    {goalCategoryLabel(goal.category)}
                  </p>
                  <p className="mt-0.5 text-sm break-words">
                    {goal.description}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Added {moment(goal.createdAt).fromNow()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive size-9 shrink-0"
                  onClick={() => removeGoal(goal.id)}
                >
                  <Trash2 className="size-4" />
                  <span className="sr-only">Remove goal</span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium">Create a goal</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Pick a category, tell Lucy what you&apos;re after
        </p>

        <ul className="border-border mt-3 divide-y overflow-hidden rounded-xl border">
          {GOAL_CATEGORIES.map((category) => (
            <li key={category.value}>
              <button
                type="button"
                onClick={() => setActiveCategory(category.value)}
                className="hover:bg-accent flex w-full items-center gap-3 px-3 py-3 text-left transition-colors"
              >
                <category.icon className="size-4 shrink-0 text-[#E8A045]" />
                <span className="flex-1 text-sm">{category.label}</span>
                <Plus className="text-muted-foreground size-4 shrink-0" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <CreateGoalDialog
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
        onCreate={addGoal}
      />
    </div>
  );
}
