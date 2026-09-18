import Image from "next/image";
import type { ReactNode } from "react";
import {
  Brain,
  Clock,
  Globe,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { AnimateOnView } from "~/components/core/animate-on-view";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
}

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "Lucy never forgets",
    description: (
      <>
        Persistent <strong>memory</strong> across all your conversations — on
        web and Telegram.
      </>
    ),
  },
  {
    icon: Layers,
    title: "Connected to everything",
    description: (
      <>
        <strong>1,000+ apps</strong> via secure OAuth. Lucy takes real actions
        on your behalf.
      </>
    ),
  },
  {
    icon: Clock,
    title: "Works while you sleep",
    description: (
      <>
        <strong>Scheduled tasks</strong> and cron jobs keep Lucy working
        overnight.
      </>
    ),
  },
  {
    icon: Globe,
    title: "Your language, your world",
    description: (
      <>
        Supports <strong>Amharic</strong>, English, and 12 other languages.
      </>
    ),
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <AnimateOnView delay={index * 0.1}>
      <div className="from-border via-border/50 h-full rounded-xl bg-linear-to-br to-transparent p-px">
        <div className="bg-card flex h-full flex-col gap-4 rounded-xl p-6">
          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full shadow-[0_0_15px_oklch(0.761_0.135_38/0.2)]">
            <feature.icon className="text-foreground h-5 w-5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-foreground font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </AnimateOnView>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <Image
        src="/images/elements/quarter_circle.svg"
        alt=""
        aria-hidden
        width={800}
        height={800}
        priority={false}
        className="pointer-events-none absolute top-0 -right-40 hidden h-[500px] w-[500px] opacity-[0.07] md:h-[700px] md:w-[700px] dark:block"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            Your personal AI that gets things done
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base md:text-lg">
            Redat (ረዳት) means helper in Amharic. Meet Lucy — she remembers your
            world, connects to your tools, and works on your behalf 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
