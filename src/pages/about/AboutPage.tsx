import { PageContainer } from '../../components/layout/PageContainer';
import { AboutHeroSection } from './sections/AboutHeroSection';
import { WhatIsZeloSection } from './sections/WhatIsZeloSection';
import { ProblemSection } from './sections/ProblemSection';
import { AboutHowItWorksSection } from './sections/AboutHowItWorksSection';
import { GallerySection } from './sections/GallerySection';
import { AboutBenefitsSection } from './sections/AboutBenefitsSection';
import { WhoItsForSection } from './sections/WhoItsForSection';
import { DevelopmentSection } from './sections/DevelopmentSection';
import { AboutCtaSection } from './sections/AboutCtaSection';

export function AboutPage() {
  return (
    <PageContainer>
      <AboutHeroSection />
      <WhatIsZeloSection />
      <ProblemSection />
      <AboutHowItWorksSection />
      <GallerySection />
      <AboutBenefitsSection />
      <WhoItsForSection />
      <DevelopmentSection />
      <AboutCtaSection />
    </PageContainer>
  );
}
