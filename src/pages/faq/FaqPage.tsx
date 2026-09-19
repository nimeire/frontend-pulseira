import { CallToActionSection } from '../../components/call-to-action/CallToActionSection';
import { PageContainer } from '../../components/layout/PageContainer';
import { PageHero } from '../../components/page-hero/PageHero';
import { faq } from '../../data/faq';
import { usePageMeta } from '../../hooks/usePageMeta';
import { FaqListSection } from './sections/FaqListSection';

const PAGE_TITLE = 'Perguntas frequentes — Zelo';
const PAGE_DESCRIPTION =
  'Tire suas dúvidas sobre o Zelo: como a pulseira funciona, como a queda é detectada, localização, bateria e segurança dos dados.';

export function FaqPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  return (
    <PageContainer>
      <PageHero
        titleId="faq-hero-title"
        title="Perguntas frequentes"
        description="Tire suas dúvidas sobre o Zelo"
        tight
      />
      <FaqListSection perguntas={faq} />
      <CallToActionSection
        ariaLabel="Fale com a equipe"
        compact
        title="Não encontrou o que procurava?"
        description="Fale com a equipe que desenvolveu o Zelo pela página de contato."
        primaryAction={{ label: 'Ir para o contato', to: '/contato' }}
      />
    </PageContainer>
  );
}
