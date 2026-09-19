import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  /** Optional explicit content. Falls back to the matched route via Outlet. */
  children?: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
