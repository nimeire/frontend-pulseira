import { AlertHistory } from '../../../components/alert-history/AlertHistory';
import type { Alerta, StatusAlerta } from '../../../types/alerta';
import styles from './LogSection.module.css';

interface LogSectionProps {
  alertas: Alerta[];
  onChangeStatus: (id: string, status: StatusAlerta) => void;
}

export function LogSection({ alertas, onChangeStatus }: LogSectionProps) {
  return (
    <section className={styles.section} aria-label="Histórico de alertas">
      <div className={styles.heading}>
        <h2 className={styles.title}>Alertas</h2>
        <p className={styles.subtitle}>
          Quedas detectadas e acionamentos do botão de pânico.
        </p>
      </div>

      <div className={styles.card}>
        <AlertHistory alertas={alertas} onChangeStatus={onChangeStatus} />
      </div>
    </section>
  );
}
