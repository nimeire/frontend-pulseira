import { ConnectionCard } from '../../../components/connection-card/ConnectionCard';
import { PatientCodeCard } from '../../../components/patient-code-card/PatientCodeCard';
import { WristbandIcon } from '../../../components/icons';
import type { Pulseira } from '../../../types/pulseira';
import type { Responsavel } from '../../../types/responsavel';
import styles from './ConexoesSection.module.css';

interface ConexoesSectionProps {
  pulseira: Pulseira;
  responsavel: Responsavel | null;
  codigoVinculo: string;
  onConectarPulseira: (dispositivoId: string) => void;
  onDesconectarPulseira: () => void;
  onDesconectarResponsavel: () => void;
}

export function ConexoesSection({
  pulseira,
  responsavel,
  codigoVinculo,
  onConectarPulseira,
  onDesconectarPulseira,
  onDesconectarResponsavel,
}: ConexoesSectionProps) {
  return (
    <section className={styles.section} aria-label="Conexões">
      <div className={styles.grid}>
        <ConnectionCard
          icon={WristbandIcon}
          title="Pulseira"
          description="Pareie a pulseira para ela enviar alertas."
          connected={pulseira.status === 'conectada'}
          connectedSummary={
            <p className={styles.summary}>
              Dispositivo <strong>{pulseira.dispositivoId}</strong>
            </p>
          }
          inputId="codigo-pulseira"
          inputLabel="Código do dispositivo"
          inputPlaceholder="Ex.: ESP12E-7F3A"
          connectLabel="Conectar pulseira"
          disconnectLabel="Desconectar pulseira"
          onConnect={onConectarPulseira}
          onDisconnect={onDesconectarPulseira}
        />

        <PatientCodeCard
          codigoVinculo={codigoVinculo}
          responsavel={responsavel}
          onDesvincular={onDesconectarResponsavel}
        />
      </div>
    </section>
  );
}
