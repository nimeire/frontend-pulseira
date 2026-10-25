import { classNames } from '../../../utils/classNames';
import type {
  PulseiraCadastrada,
  StatusPulseiraCadastrada,
} from '../../../types/pulseira';
import styles from './AdminPulseirasSection.module.css';

interface AdminPulseirasSectionProps {
  pulseiras: PulseiraCadastrada[];
}

const rotuloPorStatus: Record<StatusPulseiraCadastrada, string> = {
  ativa: 'Ativa',
  inativa: 'Inativa',
  em_manutencao: 'Em manutenção',
};

export function AdminPulseirasSection({ pulseiras }: AdminPulseirasSectionProps) {
  return (
    <section className={styles.section} aria-label="Pulseiras">
      <h2 className={styles.title}>Pulseiras</h2>

      <ul className={styles.list}>
        {pulseiras.map((pulseira) => (
          <li key={pulseira.id} className={styles.item}>
            <div className={styles.info}>
              <strong className={styles.device}>{pulseira.dispositivoId}</strong>
              <span className={styles.patient}>
                {pulseira.pacienteNome ?? 'Sem paciente'}
              </span>
            </div>
            <span
              className={classNames(
                styles.badge,
                styles[`badge_${pulseira.status}`],
              )}
            >
              {rotuloPorStatus[pulseira.status]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
