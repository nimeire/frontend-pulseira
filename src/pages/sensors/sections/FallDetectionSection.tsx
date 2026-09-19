import { ContentSection } from '../../../components/content-section/ContentSection';
import { FlowDiagram } from '../../../components/flow-diagram/FlowDiagram';
import { fallDetectionFlow } from '../../../data/fallDetectionFlow';

export function FallDetectionSection() {
  return (
    <ContentSection
      titleId="fall-detection-title"
      title="Como a queda é identificada"
      description="Um resumo simplificado do caminho que os dados percorrem até virar um alerta."
    >
      <FlowDiagram
        stages={fallDetectionFlow}
        ariaLabel="Etapas da identificação de uma queda"
      />
    </ContentSection>
  );
}
