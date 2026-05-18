import { LandingNav } from "./landing-nav";
import { LandingHero } from "./marketing/landing-hero";
import { ParallaxSections } from "./marketing/parallax-sections";
import { IntegrationHero } from "./marketing/integration-hero";
import { ComparisonSection } from "./comparison-section";
import { BottomCtaSection } from "./bottom-cta-section";
import { DinqClawBrand } from "./dinqclaw-brand";

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
      <footer className="border-t border-white/10 px-4 py-6">
        <div className="flex justify-center">
          <DinqClawBrand size="sm" />
        </div>
      </footer>
    </div>
  );
}
