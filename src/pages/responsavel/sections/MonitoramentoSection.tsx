import {
  AlertIcon,
  CheckCircleIcon,
  HistoryIcon,
  WristbandIcon,
} from '../../../components/icons';
import { StatCard } from '../../../components/stat-card/StatCard';
import { tempoRelativo } from '../../../utils/tempo';
import type { Alerta } from '../../../types/alerta';
import styles from './MonitoramentoSection.module.css';

interface MonitoramentoSectionProps {
  alertas: Alerta[];
  /** Última vez que a pulseira do paciente se comunicou com o sistema. */
  ultimoSinalEm: string;
}

export function MonitoramentoSection({
  alertas,
  ultimoSinalEm,
}: MonitoramentoSectionProps) {
  const pendentes = alertas.filter((alerta) => alerta.status === 'pendente');
  const temPendente = pendentes.length > 0;
  const ultimoAlerta = alertas[0];

  return (
    <section className={styles.section} aria-label="Situação atual">
      <h2 className={styles.title}>Situação agora</h2>

      <div className={styles.cards}>
        <StatCard
          icon={temPendente ? AlertIcon : CheckCircleIcon}
          tone={temPendente ? 'alert' : 'success'}
          value={
            temPendente
              ? `${pendentes.length} alerta${pendentes.length > 1 ? 's' : ''} pendente${pendentes.length > 1 ? 's' : ''}`
              : 'Tudo bem'
          }
          label="Status atual"
        />
        <StatCard
          icon={HistoryIcon}
          value={ultimoAlerta ? tempoRelativo(ultimoAlerta.geradoEm) : 'Nenhum'}
          label="Último alerta"
        />
        <StatCard
          icon={WristbandIcon}
          value={tempoRelativo(ultimoSinalEm)}
          label="Último sinal da pulseira"
        />
      </div>
    </section>
  );
}
