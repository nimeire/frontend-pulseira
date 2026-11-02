import { useState } from 'react';
import { AlertasPaginados } from '../../components/alertas-paginados/AlertasPaginados';
import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { Notice } from '../../components/notice/Notice';
import { PainelEstado } from '../../components/painel-estado/PainelEstado';
import { useAcao } from '../../hooks/useAcao';
import { useAuth } from '../../hooks/useAuth';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useRecurso } from '../../hooks/useRecurso';
import {
  carregarPainelPaciente,
  desparearPulseira,
  desvincularResponsavel,
  parearPulseira,
  salvarInformacoesMedicas,
} from '../../services/zelo';
import type { InformacoesMedicas } from '../../types/paciente';
import { ConexoesSection } from './sections/ConexoesSection';
import { StatusAtualSection } from './sections/StatusAtualSection';
import { DadosMedicosSection } from './sections/DadosMedicosSection';
import styles from './PacientePage.module.css';

const PAGE_TITLE = 'Minha dashboard — Zelo';
const PAGE_DESCRIPTION =
  'Dashboard do paciente: conexão com a pulseira e com os responsáveis, status, alertas e dados médicos.';
const INTERVALO_ATUALIZACAO_MS = 15_000;

export function PacientePage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  const { conta } = useAuth();
  const pessoaId = conta?.pessoaMonitoradaId ?? null;
  const { dados, carregando, erro, recarregar } = useRecurso(
    () => carregarPainelPaciente(pessoaId ?? ''),
    pessoaId,
    INTERVALO_ATUALIZACAO_MS,
  );
  const executar = useAcao(recarregar);
  // Guarda o que a pessoa está digitando: a recarga automática não pode apagar isso.
  const [edicaoSaude, setEdicaoSaude] = useState<InformacoesMedicas | null>(null);

  if (!dados) {
    return (
      <DashboardLayout badgeLabel="Paciente">
        <PainelEstado
          carregando={carregando}
          erro={erro}
          onTentarDeNovo={recarregar}
        />
      </DashboardLayout>
    );
  }

  const { paciente, pulseira, responsaveis, resumo } = dados;
  const informacoesMedicas = edicaoSaude ?? paciente.informacoesMedicas;

  return (
    <DashboardLayout badgeLabel="Paciente">
      <div className={styles.page}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Olá, {paciente.nome.split(' ')[0]}</h1>
          <p className={styles.subtitle}>
            Sua pulseira, seus alertas e sua saúde.
          </p>
        </div>

        <ConexoesSection
          pulseira={pulseira}
          responsaveis={responsaveis}
          codigoVinculo={paciente.codigoVinculo ?? ''}
          onConectarPulseira={(dispositivoId) =>
            executar(() => parearPulseira(dispositivoId), 'Pulseira conectada!')
          }
          onDesconectarPulseira={() =>
            pulseira
              ? executar(
                  () => desparearPulseira(pulseira.id),
                  'Pulseira desconectada.',
                )
              : undefined
          }
          onDesconectarResponsavel={(responsavelId) =>
            executar(
              () => desvincularResponsavel(paciente.id, responsavelId),
              'Responsável desvinculado.',
            )
          }
        />

        {pulseira?.status === 'conectada' ? (
          <StatusAtualSection pulseira={pulseira} resumo={resumo} />
        ) : (
          <Notice>Conecte a pulseira para ver o status.</Notice>
        )}

        <section className={styles.alertas} aria-label="Meus alertas">
          <h2 className={styles.sectionTitle}>Meus alertas</h2>
          <AlertasPaginados pessoaId={paciente.id} versao={0} />
        </section>

        <DadosMedicosSection
          informacoesMedicas={informacoesMedicas}
          onChange={setEdicaoSaude}
          onSalvar={() => salvarInformacoesMedicas(paciente.id, informacoesMedicas)}
        />
      </div>
    </DashboardLayout>
  );
}
