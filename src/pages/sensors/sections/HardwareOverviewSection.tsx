import {
  ContentSection,
  SectionText,
} from '../../../components/content-section/ContentSection';

export function HardwareOverviewSection() {
  return (
    <ContentSection
      titleId="hardware-overview-title"
      title="Visão geral do hardware"
      gap="md"
    >
      <SectionText>
        A pulseira reúne três componentes que trabalham em conjunto: o
        módulo GPS obtém a localização, o acelerômetro e giroscópio medem
        o movimento, e o ESP32 — a unidade de controle — lê os dados dos
        dois, processa essas informações e as envia para o sistema Zelo
        por conexão de rede.
      </SectionText>
    </ContentSection>
  );
}
