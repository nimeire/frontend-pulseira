import { SectionHeader } from '../../../components/section-header/SectionHeader';
import textStyles from './TextSection.module.css';
import styles from './LimitationsSection.module.css';

export function LimitationsSection() {
  return (
    <section
      className={textStyles.section}
      aria-labelledby="limitations-title"
    >
      <SectionHeader id="limitations-title" title="Limitações e transparência" />
      <p className={styles.notice}>
        Este é um sistema em fase de prova de conceito. A detecção de
        quedas pode gerar falsos positivos (alertas sem queda real) ou
        falsos negativos (uma queda não identificada). Estamos
        transparentes sobre essas limitações enquanto o projeto evolui.
      </p>
    </section>
  );
}
