import { CallToActionSection } from '../../components/call-to-action/CallToActionSection';
import { PageContainer } from '../../components/layout/PageContainer';
import { PageHero } from '../../components/page-hero/PageHero';
import { HardwareOverviewSection } from './sections/HardwareOverviewSection';
import { SensorCardsSection } from './sections/SensorCardsSection';
import { FallDetectionSection } from './sections/FallDetectionSection';
import { DataFlowSection } from './sections/DataFlowSection';
import { LimitationsSection } from './sections/LimitationsSection';

export function SensorsPage() {
  return (
    <PageContainer>
      <PageHero
        titleId="sensors-hero-title"
        eyebrow="Tecnologia"
        title="Sensores"
        description="Conheça os componentes que permitem localizar o usuário e identificar possíveis quedas: como cada um funciona e por que ele importa para o funcionamento do Zelo."
      />
      <HardwareOverviewSection />
      <SensorCardsSection />
      <FallDetectionSection />
      <DataFlowSection />
      <LimitationsSection />
      <CallToActionSection
        ariaLabel="Chamada para ação"
        title="Quer entender o projeto como um todo?"
        description="Volte para a página Sobre o projeto e veja como tudo se conecta."
        primaryAction={{ label: 'Sobre o projeto', to: '/sobre' }}
        secondaryLabel="Entrar"
      />
    </PageContainer>
  );
}
