import { siteConfig } from '../../../data/siteConfig';
import {
  ContentSection,
  SectionText,
} from '../../../components/content-section/ContentSection';

export function ProblemSection() {
  return (
    <ContentSection
      titleId="problem-title"
      title="O problema que resolvemos"
      gap="md"
    >
      <SectionText>
        Quedas acontecem de forma inesperada e, quando a pessoa está
        sozinha, pode demorar até que alguém perceba e chegue para ajudar.
        Compartilhar a localização pelo celular depende de uma ação ativa
        do usuário — e numa emergência, ele pode simplesmente não conseguir
        fazer isso. O {siteConfig.name} elimina essa dependência: o alerta
        parte da própria pulseira, automaticamente.
      </SectionText>
    </ContentSection>
  );
}
