import { AuthLayout } from '../../../components/auth-layout/AuthLayout';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { LoginFormSection } from './sections/LoginFormSection';

const PAGE_TITLE = 'Entrar — Zelo';
const PAGE_DESCRIPTION =
  'Acesse sua conta Zelo para acompanhar a localização e a segurança de quem você ama.';

export function LoginPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  return (
    <AuthLayout
      formTitleId="login-title"
      formTitle="Login"
      formDescription="Bem-vindo de volta! Faça login para continuar."
    >
      <LoginFormSection />
    </AuthLayout>
  );
}
