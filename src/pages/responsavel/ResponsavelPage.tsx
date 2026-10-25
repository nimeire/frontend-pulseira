import { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { Notice } from '../../components/notice/Notice';
import { usePageMeta } from '../../hooks/usePageMeta';
import { pacienteMock } from '../../data/pacienteMock';
import { gerarAlertasMock, gerarUltimoSinalMock } from '../../data/alertasMock';
import type { Alerta, StatusAlerta } from '../../types/alerta';
import type { Paciente } from '../../types/paciente';
import { ConexaoPacienteSection } from './sections/ConexaoPacienteSection';
import { MonitoramentoSection } from './sections/MonitoramentoSection';
import { DadosPacienteSection } from './sections/DadosPacienteSection';
import { LogSection } from './sections/LogSection';
import styles from './ResponsavelPage.module.css';

const PAGE_TITLE = 'Painel do responsável — Zelo';
const PAGE_DESCRIPTION =
  'Painel do responsável: conexão com o paciente, alertas de queda e de pânico, status da pulseira e dados médicos.';

export function ResponsavelPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [alertas, setAlertas] = useState<Alerta[]>(() => gerarAlertasMock());
  const [ultimoSinalEm] = useState(() => gerarUltimoSinalMock());

  function handleConectar() {
    // Mock: qualquer código aceita e vincula o paciente de exemplo.
    setPaciente(pacienteMock);
  }

  function handleDesconectar() {
    setPaciente(null);
  }

  function handleChangeStatus(id: string, status: StatusAlerta) {
    setAlertas((current) =>
      current.map((alerta) =>
        alerta.id === id ? { ...alerta, status } : alerta,
      ),
    );
  }

  return (
    <DashboardLayout badgeLabel="Responsável">
      <div className={styles.page}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Painel do responsável</h1>
          <p className={styles.subtitle}>
            Alertas, status e saúde de quem você cuida.
          </p>
        </div>

        <ConexaoPacienteSection
          paciente={paciente}
          onConectar={handleConectar}
          onDesconectar={handleDesconectar}
        />

        {paciente ? (
          <>
            <MonitoramentoSection
              alertas={alertas}
              ultimoSinalEm={ultimoSinalEm}
            />
            <LogSection alertas={alertas} onChangeStatus={handleChangeStatus} />
            <DadosPacienteSection paciente={paciente} />
          </>
        ) : (
          <Notice>Conecte-se a um paciente para começar.</Notice>
        )}
      </div>
    </DashboardLayout>
  );
}
