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
        Pedir ajuda pelo celular depende de uma ação ativa do usuário — e
        numa emergência, ele pode simplesmente não conseguir fazer isso. O &nbsp;
        {siteConfig.name} reduz essa dependência: a queda é detectada pela
        própria pulseira, que envia o alerta automaticamente, e o botão de
        pânico permite pedir ajuda com um único toque.
      </SectionText>
    </ContentSection>
  );
}
