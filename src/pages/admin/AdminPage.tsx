import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { PainelEstado } from '../../components/painel-estado/PainelEstado';
import { useAcao } from '../../hooks/useAcao';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useRecurso } from '../../hooks/useRecurso';
import {
  alterarStatusUsuario,
  carregarPainelAdmin,
  excluirUsuario,
} from '../../services/zelo';
import { AdminStatsSection } from './sections/AdminStatsSection';
import { AdminUsersSection } from './sections/AdminUsersSection';
import { AdminPulseirasSection } from './sections/AdminPulseirasSection';
import styles from './AdminPage.module.css';

const PAGE_TITLE = 'Administração — Zelo';
const PAGE_DESCRIPTION =
  'Painel administrativo do Zelo: usuários cadastrados, pulseiras e status.';
const INTERVALO_ATUALIZACAO_MS = 30_000;

export function AdminPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  const { dados, carregando, erro, recarregar } = useRecurso(
    carregarPainelAdmin,
    'painel-admin',
    INTERVALO_ATUALIZACAO_MS,
  );
  const executar = useAcao(recarregar);

  if (!dados) {
    return (
      <DashboardLayout badgeLabel="Admin">
        <PainelEstado
          carregando={carregando}
          erro={erro}
          onTentarDeNovo={recarregar}
        />
      </DashboardLayout>
    );
  }

  const { usuarios, pulseiras } = dados;

  function handleToggleStatus(id: string) {
    const usuario = usuarios.find((item) => item.id === id);
    if (!usuario) return;
    const ativar = usuario.status !== 'ativo';
    executar(
      () => alterarStatusUsuario(id, ativar),
      ativar ? 'Conta ativada.' : 'Conta desativada.',
    );
  }

  function handleDelete(id: string) {
    executar(() => excluirUsuario(id), 'Usuário excluído.');
  }

  return (
    <DashboardLayout badgeLabel="Admin">
      <div className={styles.page}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Painel administrativo</h1>
          <p className={styles.subtitle}>Usuários e pulseiras do Zelo.</p>
        </div>

        <AdminStatsSection usuarios={usuarios} pulseiras={pulseiras} />
        <AdminUsersSection
          usuarios={usuarios}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
        <AdminPulseirasSection pulseiras={pulseiras} />
      </div>
    </DashboardLayout>
  );
}
