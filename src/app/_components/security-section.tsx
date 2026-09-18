import { Shield, Lock, Cloud } from "lucide-react";
import { AnimateOnView } from "~/components/core/animate-on-view";

const PILLARS = [
  {
    icon: Lock,
    label: "OAUTH ONLY",
    description:
      "Lucy connects to your apps through managed OAuth. No passwords stored or shared — revoke access in one click.",
  },
  {
    icon: Cloud,
    label: "SANDBOXED ACTIONS",
    description:
      "Every action runs in an isolated cloud environment. Nothing executes on your machine, and the sandbox is gone when the task is done.",
  },
  {
    icon: Shield,
    label: "BUILT FOR TRUST",
    description:
      "Full action logs, encrypted credentials, and a managed tool surface — so you can let Lucy work without handing over the keys to your world.",
  },
] as const;

export function SecuritySection() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimateOnView className="mb-10 md:mb-16">
          <p className="text-muted-foreground mb-4 font-mono text-xs font-medium uppercase tracking-widest">
            Security by design
          </p>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            An assistant that acts —
            <br />
            without compromising you.
          </h2>
        </AnimateOnView>

        <div className="divide-border divide-y">
          {PILLARS.map((pillar, index) => (
            <AnimateOnView
              key={pillar.label}
              className="flex flex-col gap-4 py-8 first:pt-0 last:pb-0 md:flex-row md:gap-12"
              delay={index * 0.1}
              margin="-50px"
            >
              <div className="flex shrink-0 items-center gap-3 md:w-64">
                <pillar.icon className="text-[#E8A045] h-5 w-5 shrink-0" />
                <span className="text-muted-foreground font-mono text-xs font-medium tracking-wider">
                  {pillar.label}
                </span>
              </div>
              <p className="text-foreground leading-relaxed">
                {pillar.description}
              </p>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
