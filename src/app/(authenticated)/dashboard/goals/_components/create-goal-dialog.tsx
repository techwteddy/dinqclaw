"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { goalCategoryLabel } from "./goal-categories";
import type { GoalCategory } from "./goals.schema";

interface CreateGoalDialogProps {
  category: GoalCategory | null;
  onClose: () => void;
  onCreate: (category: GoalCategory, description: string) => void;
}

export function CreateGoalDialog({
  category,
  onClose,
  onCreate,
}: CreateGoalDialogProps) {
  const [description, setDescription] = useState("");
  const trimmed = description.trim();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setDescription("");
      onClose();
    }
  };

  const handleCreate = () => {
    if (!category || !trimmed) return;
    onCreate(category, trimmed);
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={category !== null} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? goalCategoryLabel(category) : "New goal"}
          </DialogTitle>
          <DialogDescription>
            Tell Lucy what you&apos;re after and she&apos;ll help you track it.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Run a 10k by the end of the year"
          className="min-h-24 resize-none"
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!trimmed}
            className="bg-[#E8A045] text-[#010812] hover:bg-[#E8A045]/90"
          >
            Track goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
