"use client";

import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { assignDinqId } from "./actions";

export function AssignDinqIdForm() {
  const [email, setEmail] = useState("");
  const [dinqId, setDinqId] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4 rounded-lg border border-border/40 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(null);
        startTransition(async () => {
          const result = await assignDinqId(email, dinqId);
          if (result.ok) {
            setIsError(false);
            setMessage(`Assigned ${dinqId.trim()} to ${email.trim()}`);
            setEmail("");
            setDinqId("");
          } else {
            setIsError(true);
            setMessage(result.error);
          }
        });
      }}
    >
      <div>
        <h2 className="text-base font-medium text-[#E8A045]">Assign Dinq ID</h2>
        <p className="text-sm text-muted-foreground">
          Link a DinqPlus client ID to an existing user account
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="assign-email">User email</Label>
          <Input
            id="assign-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@example.com"
            className="border-border/40 bg-white/5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="assign-dinq-id">Dinq ID</Label>
          <Input
            id="assign-dinq-id"
            required
            value={dinqId}
            onChange={(e) => setDinqId(e.target.value)}
            placeholder="DINQ-HAWI42"
            className="border-border/40 bg-white/5 font-mono"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-[#E8A045] text-[#010812] hover:bg-[#E8A045]/90"
      >
        {isPending ? "Assigning…" : "Assign Dinq ID"}
      </Button>
      {message && (
        <p
          className={`text-sm ${isError ? "text-destructive" : "text-muted-foreground"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
