import { Navigate } from 'react-router-dom';
import { AuthLayout } from '../../../components/auth-layout/AuthLayout';
import { useAuth } from '../../../hooks/useAuth';
import { rotaInicial } from '../../../utils/perfil';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { CadastroFormSection } from './sections/CadastroFormSection';

const PAGE_TITLE = 'Criar conta — Zelo';
const PAGE_DESCRIPTION =
  'Crie sua conta Zelo e tenha acesso a todos os recursos de monitoramento e segurança.';

export function CadastroPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });
  const { conta } = useAuth();

  if (conta) {
    return <Navigate to={rotaInicial(conta.perfil)} replace />;
  }

  return (
    <AuthLayout
      wide
      formTitleId="cadastro-title"
      formTitle="Cadastro"
      formDescription="Preencha os dados abaixo para criar sua conta."
    >
      <CadastroFormSection />
    </AuthLayout>
  );
}
