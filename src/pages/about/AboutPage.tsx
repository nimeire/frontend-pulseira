import { CallToActionSection } from '../../components/call-to-action/CallToActionSection';
import { PageContainer } from '../../components/layout/PageContainer';
import { AboutHeroSection } from './sections/AboutHeroSection';
import { WhatIsZeloSection } from './sections/WhatIsZeloSection';
import { ProblemSection } from './sections/ProblemSection';
import { AboutHowItWorksSection } from './sections/AboutHowItWorksSection';
import { GallerySection } from './sections/GallerySection';
import { AboutBenefitsSection } from './sections/AboutBenefitsSection';
import { WhoItsForSection } from './sections/WhoItsForSection';
import { DevelopmentSection } from './sections/DevelopmentSection';

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
      <CallToActionSection
        ariaLabel="Chamada para ação"
        title="Quer entender melhor a tecnologia por trás do Zelo?"
        description="Conheça os sensores que tornam o monitoramento e a detecção de quedas possíveis."
        primaryAction={{ label: 'Conheça os sensores', to: '/sensores' }}
        secondaryLabel="Entrar"
      />
    </PageContainer>
  );
}
