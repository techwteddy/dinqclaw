import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimateOnView } from "~/components/core/animate-on-view";

export function BottomCtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#010812] px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.542_0.213_277/0.12),transparent_70%)]" />

      <AnimateOnView className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          Ready to meet your personal assistant?
        </h2>
        <p className="text-base text-muted-foreground md:text-lg">
          Your AI is waiting. Set it up in seconds.
        </p>
        <Link
          href="/login"
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#6C5CE7] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#5a4bd6] sm:w-auto"
        >
          Get Started Free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimateOnView>
    </section>
  );
}
