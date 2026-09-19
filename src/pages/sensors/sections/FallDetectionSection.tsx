import { SectionHeader } from '../../../components/section-header/SectionHeader';
import { FlowDiagram } from '../../../components/flow-diagram/FlowDiagram';
import { fallDetectionFlow } from '../../../data/fallDetectionFlow';
import styles from './FlowSection.module.css';

export function FallDetectionSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="fall-detection-title"
    >
      <SectionHeader
        id="fall-detection-title"
        title="Como a queda é identificada"
        description="Um resumo simplificado do caminho que os dados percorrem até virar um alerta."
      />
      <FlowDiagram
        stages={fallDetectionFlow}
        ariaLabel="Etapas da identificação de uma queda"
      />
    </section>
  );
}
