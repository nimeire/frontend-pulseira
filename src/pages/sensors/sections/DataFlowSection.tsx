import { ContentSection } from '../../../components/content-section/ContentSection';
import { FlowDiagram } from '../../../components/flow-diagram/FlowDiagram';
import { dataFlow } from '../../../data/dataFlow';

export function DataFlowSection() {
  return (
    <ContentSection
      titleId="data-flow-title"
      title="Do sensor à tela"
      description="O caminho que os dados percorrem, da pulseira até o painel que o responsável acompanha."
    >
      <FlowDiagram
        stages={dataFlow}
        ariaLabel="Fluxo de dados da pulseira até o site"
      />
    </ContentSection>
  );
}
