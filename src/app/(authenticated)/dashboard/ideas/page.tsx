import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { IDEA_SUGGESTIONS } from "./_components/idea-suggestions";

export default function Page() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Ideas</h1>
        <Separator className="mt-4" />

        <h2 className="text-muted-foreground mt-6 text-xs font-medium tracking-wide uppercase">
          Suggested for you
        </h2>

        <ul className="mt-3 space-y-2">
          {IDEA_SUGGESTIONS.map((idea) => (
            <li key={idea.title}>
              <Link
                href={`/dashboard?prompt=${encodeURIComponent(idea.prompt)}`}
                className="border-border bg-card hover:bg-accent flex items-start gap-3 rounded-xl border p-3 transition-colors"
              >
                <idea.icon className="mt-0.5 size-4 shrink-0 text-[#E8A045]" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{idea.title}</p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {idea.description}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
