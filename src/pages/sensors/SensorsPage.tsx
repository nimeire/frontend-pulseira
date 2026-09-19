import { PageContainer } from '../../components/layout/PageContainer';
import { SensorsHeroSection } from './sections/SensorsHeroSection';
import { HardwareOverviewSection } from './sections/HardwareOverviewSection';
import { SensorCardsSection } from './sections/SensorCardsSection';
import { FallDetectionSection } from './sections/FallDetectionSection';
import { DataFlowSection } from './sections/DataFlowSection';
import { LimitationsSection } from './sections/LimitationsSection';
import { SensorsCtaSection } from './sections/SensorsCtaSection';

export function SensorsPage() {
  return (
    <PageContainer>
      <SensorsHeroSection />
      <HardwareOverviewSection />
      <SensorCardsSection />
      <FallDetectionSection />
      <DataFlowSection />
      <LimitationsSection />
      <SensorsCtaSection />
    </PageContainer>
  );
}
