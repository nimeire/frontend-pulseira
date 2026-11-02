import { Navigate } from 'react-router-dom';
import { AuthLayout } from '../../../components/auth-layout/AuthLayout';
import { useAuth } from '../../../hooks/useAuth';
import { rotaInicial } from '../../../utils/perfil';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { LoginFormSection } from './sections/LoginFormSection';

const PAGE_TITLE = 'Entrar — Zelo';
const PAGE_DESCRIPTION =
  'Acesse sua conta Zelo para acompanhar os alertas e a segurança de quem você ama.';

export function LoginPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });
  const { conta } = useAuth();

  if (conta) {
    return <Navigate to={rotaInicial(conta.perfil)} replace />;
  }

  return (
    <AuthLayout
      formTitleId="login-title"
      formTitle="Login"
      formDescription="Bem-vindo de volta!"
    >
      <LoginFormSection />
    </AuthLayout>
  );
}
