import { ArrowRight, CircleCheck, CircleX } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { AnimateOnView } from "~/components/core/animate-on-view";

type Indicator = "check" | "x";

interface ComparisonRow {
  category: string;
  redat: string;
  generic: string;
  genericIndicator: Indicator;
}

const ROWS: ComparisonRow[] = [
  {
    category: "Memory",
    redat: "Remembers you across every chat",
    generic: "Starts from scratch each session",
    genericIndicator: "x",
  },
  {
    category: "Actions",
    redat: "Takes real actions in your apps",
    generic: "Mostly answers — doesn't do the work",
    genericIndicator: "x",
  },
  {
    category: "Telegram",
    redat: "Works where you already chat",
    generic: "Stuck in a browser tab",
    genericIndicator: "x",
  },
  {
    category: "Language",
    redat: "Speaks Amharic and 13+ languages",
    generic: "English-first, shallow localization",
    genericIndicator: "x",
  },
  {
    category: "Integrations",
    redat: "1,000+ apps via secure OAuth",
    generic: "Copy-paste and manual workarounds",
    genericIndicator: "x",
  },
  {
    category: "Schedule",
    redat: "Works while you sleep",
    generic: "Only when you're online",
    genericIndicator: "x",
  },
];

function IndicatorIcon({ type }: { type: Indicator }) {
  switch (type) {
    case "check":
      return <CircleCheck className="h-5 w-5 shrink-0 text-[#E8A045]" />;
    case "x":
      return <CircleX className="h-5 w-5 shrink-0 text-destructive" />;
  }
}

export function ComparisonSection() {
  return (
    <section className="bg-[#010812] px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimateOnView
          as="h2"
          className="text-foreground mb-3 text-center text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
        >
          Redat vs generic AI assistants
        </AnimateOnView>
        <AnimateOnView
          as="p"
          className="text-muted-foreground mx-auto mb-10 max-w-2xl text-center text-base md:mb-16 md:text-lg"
          delay={0.05}
        >
          Like Meta Muse — but built for the Ethiopian diaspora and anyone who
          wants an AI that understands their world.
        </AnimateOnView>

        <AnimateOnView
          className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0"
          delay={0.1}
          margin="-50px"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-6">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="border-border border-b">
                  <th className="py-4 pr-4 text-left" />
                  <th className="text-foreground px-4 py-4 text-center text-sm font-semibold md:text-base">
                    Redat
                  </th>
                  <th className="text-muted-foreground px-4 py-4 text-center text-sm font-semibold md:text-base">
                    Generic AI
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.category} className="border-border border-b">
                    <td className="text-foreground py-4 pr-4 text-sm font-medium md:text-base">
                      {row.category}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <IndicatorIcon type="check" />
                        <span className="text-muted-foreground text-xs md:text-sm">
                          {row.redat}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <IndicatorIcon type={row.genericIndicator} />
                        <span className="text-muted-foreground text-xs md:text-sm">
                          {row.generic}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateOnView>

        <AnimateOnView
          className="mt-10 flex justify-center md:mt-16"
          delay={0.2}
        >
          <Link href="/login">
            <Button
              size="lg"
              className="h-12 w-full bg-[#E8A045] px-8 text-base text-[#010812] hover:bg-[#C8862E] sm:w-auto"
            >
              Meet Lucy
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </AnimateOnView>
      </div>
    </section>
  );
}
