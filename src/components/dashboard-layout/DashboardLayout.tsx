import type { ReactNode } from 'react';
import { Header } from '../header/Header';
import { PageContainer } from '../layout/PageContainer';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  /** Short label next to the brand, e.g. "Admin", "Paciente", "Responsável". */
  badgeLabel: string;
  children: ReactNode;
}

/**
 * Shell (no site footer) shared by /admin, /paciente, /responsavel and /perfil.
 * Usa o mesmo `Header` do site, para o logo, o menu e o botão de tema ficarem
 * sempre no mesmo lugar ao navegar entre as páginas.
 */
export function DashboardLayout({ badgeLabel, children }: DashboardLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header badge={badgeLabel} />

      <main className={styles.main}>
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}
