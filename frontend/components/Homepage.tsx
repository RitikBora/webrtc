import { CtaSection } from "./marketing/CtaSection";
import { FaqSection } from "./marketing/FaqSection";
import { FeaturesSection } from "./marketing/FeaturesSection";
import { HeroSection } from "./marketing/HeroSection";
import { LogosSection } from "./marketing/LogosSection";
import { PricingSection } from "./marketing/PricingSection";
import { ShowcaseSection } from "./marketing/ShowcaseSection";
import { TestimonialsSection } from "./marketing/TestimonialsSection";

export function Homepage() {
  return (
    <main className="flex-1 bg-background">
      <HeroSection />
      <LogosSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
