import { Link, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { ArrowLeftIcon } from '../../components/icons';
import { useAuth } from '../../hooks/useAuth';
import { usePageMeta } from '../../hooks/usePageMeta';
import { rotaInicial } from '../../utils/perfil';
import { EmailSection } from './sections/EmailSection';
import { EnderecoSection } from './sections/EnderecoSection';
import { FotoSection } from './sections/FotoSection';
import { SenhaSection } from './sections/SenhaSection';
import { TelefoneSection } from './sections/TelefoneSection';
import { TipoContaSection } from './sections/TipoContaSection';
import styles from './PerfilPage.module.css';

const PAGE_TITLE = 'Editar perfil — Zelo';
const PAGE_DESCRIPTION =
  'Configurações da conta: foto de perfil, telefone, endereço, e-mail, senha e tipo de conta.';

const rotuloPorPerfil = {
  PACIENTE: 'Paciente',
  RESPONSAVEL: 'Responsável',
  ADMIN: 'Admin',
} as const;

export function PerfilPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });
  const { conta } = useAuth();

  if (!conta) return null;

  // A conta de administrador não tem perfil para editar: volta ao painel.
  if (conta.perfil === 'ADMIN') {
    return <Navigate to={rotaInicial(conta.perfil)} replace />;
  }

  return (
    <DashboardLayout badgeLabel={rotuloPorPerfil[conta.perfil]}>
      <div className={styles.page}>
        <div className={styles.heading}>
          <Link className={styles.voltar} to={rotaInicial(conta.perfil)}>
            <ArrowLeftIcon />
            Voltar ao painel
          </Link>
          <h1 className={styles.title}>Editar perfil</h1>
          <p className={styles.subtitle}>{conta.nome}</p>
        </div>

        <FotoSection />
        <TelefoneSection />
        {conta.perfil === 'PACIENTE' && conta.pessoaMonitoradaId && (
          <EnderecoSection pessoaId={conta.pessoaMonitoradaId} />
        )}
        <EmailSection />
        <SenhaSection />
        <TipoContaSection />
      </div>
    </DashboardLayout>
  );
}
