import { useMemo, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { AlertHistory } from '../../components/alert-history/AlertHistory';
import { Notice } from '../../components/notice/Notice';
import { usePageMeta } from '../../hooks/usePageMeta';
import { pacienteMock, pulseiraMock, responsavelMock } from '../../data/pacienteMock';
import { gerarAlertasMock } from '../../data/alertasMock';
import type { InformacoesMedicas } from '../../types/paciente';
import type { Pulseira } from '../../types/pulseira';
import type { Responsavel } from '../../types/responsavel';
import { ConexoesSection } from './sections/ConexoesSection';
import { StatusAtualSection } from './sections/StatusAtualSection';
import { DadosMedicosSection } from './sections/DadosMedicosSection';
import styles from './PacientePage.module.css';

const PAGE_TITLE = 'Minha dashboard — Zelo';
const PAGE_DESCRIPTION =
  'Dashboard do paciente: conexão com a pulseira e com o responsável, status, alertas e dados médicos.';

export function PacientePage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  const [pulseira, setPulseira] = useState<Pulseira>(pulseiraMock);
  // Já começa vinculado: quem inicia o vínculo é o responsável, digitando o
  // código do paciente (ver ConexaoPacienteSection) — não tem como "conectar"
  // o responsável a partir desta página, só desvincular.
  const [responsavel, setResponsavel] = useState<Responsavel | null>(
    responsavelMock,
  );
  const [informacoesMedicas, setInformacoesMedicas] = useState<InformacoesMedicas>(
    pacienteMock.informacoesMedicas,
  );
  const alertas = useMemo(() => gerarAlertasMock(), []);

  function handleConectarPulseira(dispositivoId: string) {
    setPulseira({
      dispositivoId,
      status: 'conectada',
      vinculadaEm: new Date().toISOString(),
      ultimoSinalEm: new Date().toISOString(),
    });
  }

  function handleDesconectarPulseira() {
    setPulseira((current) => ({ ...current, status: 'desconectada' }));
  }

  function handleDesconectarResponsavel() {
    setResponsavel(null);
  }

  return (
    <DashboardLayout badgeLabel="Paciente">
      <div className={styles.page}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Olá, {pacienteMock.nome.split(' ')[0]}</h1>
          <p className={styles.subtitle}>
            Sua pulseira, seus alertas e sua saúde.
          </p>
        </div>

        <ConexoesSection
          pulseira={pulseira}
          responsavel={responsavel}
          codigoVinculo={pacienteMock.codigoVinculo}
          onConectarPulseira={handleConectarPulseira}
          onDesconectarPulseira={handleDesconectarPulseira}
          onDesconectarResponsavel={handleDesconectarResponsavel}
        />

        {pulseira.status === 'conectada' ? (
          <StatusAtualSection pulseira={pulseira} alertas={alertas} />
        ) : (
          <Notice>Conecte a pulseira para ver o status.</Notice>
        )}

        <section className={styles.alertas} aria-label="Meus alertas">
          <h2 className={styles.sectionTitle}>Meus alertas</h2>
          <AlertHistory alertas={alertas} />
        </section>

        <DadosMedicosSection
          informacoesMedicas={informacoesMedicas}
          onChange={setInformacoesMedicas}
        />
      </div>
    </DashboardLayout>
  );
}
