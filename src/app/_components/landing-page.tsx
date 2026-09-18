import { LandingNav } from "./landing-nav";
import { LandingHero } from "./marketing/landing-hero";
import { ParallaxSections } from "./marketing/parallax-sections";
import { IntegrationHero } from "./marketing/integration-hero";
import { ComparisonSection } from "./comparison-section";
import { BottomCtaSection } from "./bottom-cta-section";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#010812] text-foreground">
      <LandingNav />
      <main className="flex-1 pt-14">
        <LandingHero />
        <ParallaxSections />
        <IntegrationHero />
        <ComparisonSection />
        <BottomCtaSection />
      </main>
      <footer className="border-t border-white/10 px-4 py-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
          <p className="text-foreground text-sm font-medium">
            Redat — ረዳት — helper in Amharic
          </p>
          <p className="text-muted-foreground text-xs">
            Built by Dinq. Powered by Lucy.
          </p>
        </div>
      </footer>
    </div>
  );
}
