import { siteConfig } from '../../../data/siteConfig';
import {
  ContentSection,
  SectionText,
} from '../../../components/content-section/ContentSection';
import { Notice } from '../../../components/notice/Notice';

export function DevelopmentSection() {
  return (
    <ContentSection
      titleId="development-title"
      title="Sobre o desenvolvimento"
      gap="md"
    >
      <SectionText>
        O {siteConfig.name} é uma prova de conceito desenvolvida como
        projeto interdisciplinar do curso de Desenvolvimento de Software
        Multiplataforma da FATEC Praia Grande, integrando hardware,
        back-end, banco de dados e front-end.
      </SectionText>
      <Notice>
        Este projeto é um protótipo acadêmico e não é um equipamento
        médico certificado. Ele não substitui supervisão profissional nem
        cuidados de saúde formais.
      </Notice>
    </ContentSection>
  );
}
