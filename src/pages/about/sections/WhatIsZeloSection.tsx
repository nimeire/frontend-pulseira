import { siteConfig } from '../../../data/siteConfig';
import {
  ContentSection,
  SectionText,
} from '../../../components/content-section/ContentSection';

export function WhatIsZeloSection() {
  return (
    <ContentSection
      id="o-que-e"
      titleId="what-is-zelo-title"
      title={`O que é o ${siteConfig.name}`}
      gap="md"
    >
      <SectionText>
        O {siteConfig.name} é uma pulseira inteligente que identifica
        possíveis quedas automaticamente e conta com um botão de pânico.
        Quando uma queda é detectada, ou quando o botão é apertado, um
        alerta é enviado para quem cuida da pessoa — sem ela precisar
        pegar o celular.
      </SectionText>
    </ContentSection>
  );
}
