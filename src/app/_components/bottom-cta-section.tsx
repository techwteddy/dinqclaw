import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimateOnView } from "~/components/core/animate-on-view";

export function BottomCtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#010812] px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.761_0.135_38/0.12),transparent_70%)]" />

      <AnimateOnView className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          Ready to meet Lucy?
        </h2>
        <p className="text-base text-muted-foreground md:text-lg">
          Your AI helper is waiting — on the web and on Telegram.
        </p>
        <Link
          href="/login"
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#E8A045] px-8 py-3 text-base font-semibold text-[#010812] transition-colors hover:bg-[#C8862E] sm:w-auto"
        >
          Meet Lucy
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimateOnView>
    </section>
  );
}
