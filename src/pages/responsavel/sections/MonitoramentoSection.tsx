import { AlertIcon, CheckCircleIcon, WristbandIcon } from '../../../components/icons';
import { StatCard } from '../../../components/stat-card/StatCard';
import { descreverPulseira } from '../../../utils/estadoPulseira';
import { tempoRelativo } from '../../../utils/tempo';
import type { ResumoAlertas } from '../../../types/alerta';
import type { Pulseira } from '../../../types/pulseira';
import styles from './MonitoramentoSection.module.css';

interface MonitoramentoSectionProps {
  resumo: ResumoAlertas;
  pulseira: Pulseira | null;
}

export function MonitoramentoSection({
  resumo,
  pulseira,
}: MonitoramentoSectionProps) {
  const { pendentes, ultimoAlerta } = resumo;
  const temPendente = pendentes > 0;
  const estadoPulseira = descreverPulseira(pulseira);

  return (
    <section className={styles.section} aria-label="Situação atual">
      <h2 className={styles.title}>Situação agora</h2>

      <div className={styles.cards}>
        <StatCard
          icon={temPendente ? AlertIcon : CheckCircleIcon}
          tone={temPendente ? 'alert' : 'success'}
          value={
            temPendente
              ? `${pendentes} alerta${pendentes > 1 ? 's' : ''} pendente${pendentes > 1 ? 's' : ''}`
              : 'Tudo bem'
          }
          label={
            ultimoAlerta
              ? `Último alerta ${tempoRelativo(ultimoAlerta.geradoEm)}`
              : 'Nenhum alerta ainda'
          }
        />
        <StatCard
          icon={WristbandIcon}
          tone={estadoPulseira.tone}
          value={estadoPulseira.value}
          label={estadoPulseira.label}
        />
      </div>
    </section>
  );
}
