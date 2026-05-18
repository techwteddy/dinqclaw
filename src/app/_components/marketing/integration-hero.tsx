"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INTEGRATION_LOGOS } from "./integration-logos";

function LogoMarquee({ reverse = false }: { reverse?: boolean }) {
  const logos = [...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-8 py-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {logos.map((tool, index) => (
          <div
            key={`${tool.slug}-${index}`}
            className="border-border flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
            title={tool.name}
          >
            <Image
              src={`/images/logos/${tool.slug}.svg`}
              alt={tool.name}
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationHero() {
  return (
    <section className="relative overflow-hidden bg-[#010812] px-4 py-20 md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.542_0.213_277/0.12),transparent_65%)]" />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="mb-4 inline-block rounded-full border border-[#6C5CE7]/30 bg-[#6C5CE7]/15 px-4 py-1.5 text-sm font-medium text-[#6C5CE7]">
          1000+ Integrations
        </span>
        <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Connect every tool you already use
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base md:text-lg">
          Gmail, GitHub, Notion, Slack, and hundreds more — connected through
          managed OAuth in a single click.
        </p>
      </div>
      <div className="relative z-10 mx-auto mt-12 max-w-6xl space-y-4">
        <LogoMarquee />
        <LogoMarquee reverse />
      </div>
      <div className="relative z-10 mt-10 flex justify-center">
        <Link
          href="/login"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#6C5CE7] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#5a4bd6]"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
