import {
  AlertIcon,
  CheckCircleIcon,
  HistoryIcon,
  WristbandIcon,
} from '../../../components/icons';
import { StatCard } from '../../../components/stat-card/StatCard';
import { tempoRelativo } from '../../../utils/tempo';
import type { Alerta } from '../../../types/alerta';
import type { Pulseira } from '../../../types/pulseira';
import styles from './StatusAtualSection.module.css';

interface StatusAtualSectionProps {
  pulseira: Pulseira;
  alertas: Alerta[];
}

export function StatusAtualSection({
  pulseira,
  alertas,
}: StatusAtualSectionProps) {
  const temAlertaEmAberto = alertas.some(
    (alerta) => alerta.status === 'pendente',
  );
  const ultimoAlerta = alertas[0];

  return (
    <section className={styles.section} aria-label="Status atual">
      <h2 className={styles.title}>Status agora</h2>

      <div className={styles.cards}>
        <StatCard
          icon={temAlertaEmAberto ? AlertIcon : CheckCircleIcon}
          tone={temAlertaEmAberto ? 'alert' : 'success'}
          value={temAlertaEmAberto ? 'Alerta enviado' : 'Tudo bem'}
          label="Status atual"
        />
        <StatCard
          icon={HistoryIcon}
          value={ultimoAlerta ? tempoRelativo(ultimoAlerta.geradoEm) : 'Nenhum'}
          label="Último alerta"
        />
        <StatCard
          icon={WristbandIcon}
          value={
            pulseira.ultimoSinalEm
              ? tempoRelativo(pulseira.ultimoSinalEm)
              : '—'
          }
          label="Último sinal da pulseira"
        />
      </div>
    </section>
  );
}
