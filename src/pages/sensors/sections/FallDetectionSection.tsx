import { ContentSection } from '../../../components/content-section/ContentSection';
import { FlowDiagram } from '../../../components/flow-diagram/FlowDiagram';
import {
  fallDetectionFlow,
  panicButtonFlow,
} from '../../../data/fallDetectionFlow';
import styles from './FallDetectionSection.module.css';

export function FallDetectionSection() {
  return (
    <ContentSection
      titleId="fall-detection-title"
      title="Como o alerta é disparado"
      description="Um resumo simplificado dos dois caminhos que levam a um alerta: a queda detectada pelo sensor e o botão de pânico."
    >
      <div className={styles.flows}>
        <div className={styles.flow}>
          <h3 className={styles.flowTitle}>Queda detectada</h3>
          <FlowDiagram
            stages={fallDetectionFlow}
            ariaLabel="Etapas da identificação de uma queda"
          />
        </div>
        <div className={styles.flow}>
          <h3 className={styles.flowTitle}>Botão de pânico</h3>
          <FlowDiagram
            stages={panicButtonFlow}
            ariaLabel="Etapas do alerta pelo botão de pânico"
          />
        </div>
      </div>
    </ContentSection>
  );
}
