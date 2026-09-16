import { Target } from "lucide-react";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <Target className="text-muted-foreground/50 size-10" />
      <h1 className="text-xl font-semibold md:text-2xl">Goals coming soon</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        Set targets and track progress toward them with Lucy.
      </p>
    </div>
  );
}
