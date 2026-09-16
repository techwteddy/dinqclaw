import { Lightbulb } from "lucide-react";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <Lightbulb className="text-muted-foreground/50 size-10" />
      <h1 className="text-xl font-semibold md:text-2xl">Ideas coming soon</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        Capture sparks of inspiration and let Lucy help you develop them.
      </p>
    </div>
  );
}
