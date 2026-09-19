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
        O {siteConfig.name} é uma pulseira inteligente que acompanha a
        localização de uma pessoa e identifica possíveis quedas
        automaticamente. Quando algo assim acontece, um alerta é enviado
        para quem cuida dela — sem a pessoa precisar pegar o celular ou
        pedir ajuda.
      </SectionText>
    </ContentSection>
  );
}
