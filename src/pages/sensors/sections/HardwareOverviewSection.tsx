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
        A pulseira reúne poucos componentes que trabalham em conjunto: o
        acelerômetro e giroscópio (MPU6050) medem o movimento, o ESP-12E —
        a unidade de controle — lê esses dados e o botão de pânico,
        processa tudo e envia os alertas para o sistema Zelo por Wi-Fi.
        Dois LEDs mostram o estado da pulseira: um indica que ela está
        ligada e configurada, e o outro acende quando uma queda é detectada
        ou o botão é apertado. No protótipo, a energia vem de um powerbank;
        no produto final, viria de uma bateria.
      </SectionText>
    </ContentSection>
  );
}
