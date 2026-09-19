import { PageContainer } from '../../components/layout/PageContainer';
import { PageHero } from '../../components/page-hero/PageHero';
import { TeamSection } from './sections/TeamSection';

export function ContactPage() {
  return (
    <PageContainer>
      <PageHero
        titleId="contact-hero-title"
        eyebrow="Fale com a gente"
        title="Contato"
        description="Este é um projeto acadêmico interdisciplinar da FATEC Praia Grande. Ficou com dúvidas, sugestões ou quer conversar sobre o Zelo? Fale diretamente com quem desenvolveu."
      />
      <TeamSection />
    </PageContainer>
  );
}
