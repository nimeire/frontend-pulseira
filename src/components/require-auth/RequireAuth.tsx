import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { PerfilConta } from '../../types/conta';
import { rotaInicial } from '../../utils/perfil';
import styles from './RequireAuth.module.css';

interface RequireAuthProps {
  /** Só este tipo de conta entra; os outros vão para o próprio painel. Sem isso, qualquer conta logada entra. */
  perfil?: PerfilConta;
  children: ReactNode;
}

export function RequireAuth({ perfil, children }: RequireAuthProps) {
  const { conta, restaurando } = useAuth();

  if (restaurando) {
    return (
      <p className={styles.loading} role="status">
        Carregando…
      </p>
    );
  }

  if (!conta) {
    return <Navigate to="/login" replace />;
  }

  if (perfil && conta.perfil !== perfil) {
    return <Navigate to={rotaInicial(conta.perfil)} replace />;
  }

  return <>{children}</>;
}
