import { SectionHeader } from '../../../components/section-header/SectionHeader';
import { FlowDiagram } from '../../../components/flow-diagram/FlowDiagram';
import { dataFlow } from '../../../data/dataFlow';
import styles from './FlowSection.module.css';

export function DataFlowSection() {
  return (
    <section className={styles.section} aria-labelledby="data-flow-title">
      <SectionHeader
        id="data-flow-title"
        title="Do sensor à tela"
        description="O caminho que os dados percorrem, da pulseira até o painel que o responsável acompanha."
      />
      <FlowDiagram stages={dataFlow} ariaLabel="Fluxo de dados da pulseira até o site" />
    </section>
  );
}
