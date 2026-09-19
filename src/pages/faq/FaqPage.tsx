import { PageContainer } from '../../components/layout/PageContainer';
import { faq } from '../../data/faq';
import { usePageMeta } from '../../hooks/usePageMeta';
import { FaqCtaSection } from './sections/FaqCtaSection';
import { FaqHeroSection } from './sections/FaqHeroSection';
import { FaqListSection } from './sections/FaqListSection';

const PAGE_TITLE = 'Perguntas frequentes — Zelo';
const PAGE_DESCRIPTION =
  'Tire suas dúvidas sobre o Zelo: como a pulseira funciona, como a queda é detectada, localização, bateria e segurança dos dados.';

export function FaqPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  return (
    <PageContainer>
      <FaqHeroSection />
      <FaqListSection perguntas={faq} />
      <FaqCtaSection />
    </PageContainer>
  );
}
