import { AlertIcon, CheckCircleIcon, WristbandIcon } from '../../../components/icons';
import { StatCard } from '../../../components/stat-card/StatCard';
import { descreverPulseira } from '../../../utils/estadoPulseira';
import { aconteceuHaMenosDe, tempoRelativo } from '../../../utils/tempo';
import type { ResumoAlertas } from '../../../types/alerta';
import type { Pulseira } from '../../../types/pulseira';
import styles from './StatusAtualSection.module.css';

/** "Status agora" considera só o que aconteceu nesta janela. */
const JANELA_RECENTE_MS = 30 * 60 * 1000;

interface StatusAtualSectionProps {
  pulseira: Pulseira | null;
  resumo: ResumoAlertas;
}

export function StatusAtualSection({
  pulseira,
  resumo,
}: StatusAtualSectionProps) {
  const ultimo = resumo.ultimoAlerta;
  const recente = ultimo
    ? aconteceuHaMenosDe(ultimo.geradoEm, JANELA_RECENTE_MS)
    : false;
  const estadoPulseira = descreverPulseira(pulseira);

  return (
    <section className={styles.section} aria-label="Status atual">
      <h2 className={styles.title}>Status agora</h2>

      <div className={styles.cards}>
        <StatCard
          icon={recente ? AlertIcon : CheckCircleIcon}
          tone={recente ? 'alert' : 'success'}
          value={recente ? 'Alerta enviado' : 'Tudo bem'}
          label={
            ultimo && recente
              ? `Último alerta ${tempoRelativo(ultimo.geradoEm)}`
              : 'Sem alertas nos últimos 30 minutos'
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
