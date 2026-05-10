import { SEOHead } from '@/components/seo/SEOHead';
import {
  HeroSection,
  TrustedBySection,
  FeaturesSection,
  HowItWorksSection,
  SavingsSection,
  FAQSection,
  CTASection,
} from '@/features/landing';

export default function LandingPage() {
  return (
    <>
      <SEOHead />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <SavingsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
