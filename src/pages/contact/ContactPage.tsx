import { PageContainer } from '../../components/layout/PageContainer';
import { ContactHeroSection } from './sections/ContactHeroSection';
import { TeamSection } from './sections/TeamSection';

export function ContactPage() {
  return (
    <PageContainer>
      <ContactHeroSection />
      <TeamSection />
    </PageContainer>
  );
}
