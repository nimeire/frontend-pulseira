import { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { Notice } from '../../components/notice/Notice';
import { PainelEstado } from '../../components/painel-estado/PainelEstado';
import { useAcao } from '../../hooks/useAcao';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useRecurso } from '../../hooks/useRecurso';
import {
  atenderAlerta,
  carregarPainelResponsavel,
  desvincularPaciente,
} from '../../services/zelo';
import { ConexaoPacienteSection } from './sections/ConexaoPacienteSection';
import { MonitoramentoSection } from './sections/MonitoramentoSection';
import { DadosPacienteSection } from './sections/DadosPacienteSection';
import { LogSection } from './sections/LogSection';
import styles from './ResponsavelPage.module.css';

const PAGE_TITLE = 'Painel do responsável — Zelo';
const PAGE_DESCRIPTION =
  'Painel do responsável: conexão com os pacientes, alertas de queda e de pânico, status da pulseira e dados médicos.';
const INTERVALO_ATUALIZACAO_MS = 15_000;

const mensagemDoAtendimento = {
  reconhecido: 'Alerta reconhecido.',
  resolvido: 'Alerta resolvido.',
  falso_positivo: 'Alerta marcado como falso positivo.',
} as const;

export function ResponsavelPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  // Paciente aberto no painel; `null` = o primeiro da lista.
  const [selecionadoId, setSelecionadoId] = useState<string | null>(null);
  // Sobe depois de atender um alerta, para as listas de alertas recarregarem na hora.
  const [versaoAlertas, setVersaoAlertas] = useState(0);

  const { dados, carregando, erro, recarregar } = useRecurso(
    () => carregarPainelResponsavel(selecionadoId),
    `painel:${selecionadoId ?? ''}`,
    INTERVALO_ATUALIZACAO_MS,
  );
  const executar = useAcao(recarregar);

  if (!dados) {
    return (
      <DashboardLayout badgeLabel="Responsável">
        <PainelEstado
          carregando={carregando}
          erro={erro}
          onTentarDeNovo={recarregar}
        />
      </DashboardLayout>
    );
  }

  const { pacientes, paciente, pulseira, resumo } = dados;
  // Logo depois de trocar de paciente, os dados ainda são do anterior até a API responder.
  const trocando = selecionadoId !== null && paciente?.id !== selecionadoId;

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
          pacientes={pacientes}
          selecionadoId={paciente?.id ?? null}
          onSelecionar={setSelecionadoId}
          // Trocar o paciente aberto muda a chave do useRecurso, que já recarrega o painel.
          onVinculado={(novo) => setSelecionadoId(novo.id)}
          onDesconectar={(pacienteId) =>
            executar(async () => {
              await desvincularPaciente(pacienteId);
              if (pacienteId === (paciente?.id ?? null)) setSelecionadoId(null);
            }, 'Paciente desconectado.')
          }
        />

        {!paciente || !resumo ? (
          <Notice>Conecte-se a um paciente para começar.</Notice>
        ) : trocando ? (
          <Notice>Carregando o painel…</Notice>
        ) : (
          <>
            <MonitoramentoSection resumo={resumo} pulseira={pulseira} />
            <LogSection
              pessoaId={paciente.id}
              versao={versaoAlertas}
              onChangeStatus={(alertaId, status) =>
                executar(async () => {
                  await atenderAlerta(alertaId, status);
                  setVersaoAlertas((versao) => versao + 1);
                }, mensagemDoAtendimento[status])
              }
            />
            <DadosPacienteSection paciente={paciente} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
