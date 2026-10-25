import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { ArrowLeftIcon } from '../icons';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  formTitleId: string;
  formTitle: string;
  formDescription: string;
  wide?: boolean;
  children: ReactNode;
}

export function AuthLayout({
  formTitleId,
  formTitle,
  formDescription,
  wide = false,
  children,
}: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.topBar}>
        <Link className={styles.backLink} to="/">
          <ArrowLeftIcon />
          Voltar ao site
        </Link>
        <ThemeToggle />
      </div>

      <main className={wide ? `${styles.card} ${styles.cardWide}` : styles.card}>
        <Link className={styles.brand} to="/" aria-label="Zelo — página inicial">
          <img
            className={styles.logo}
            src={siteConfig.logoSrc}
            alt=""
            width={48}
            height={48}
          />
          <span className={styles.brandName}>{siteConfig.name}</span>
        </Link>

        <header className={styles.header}>
          <h1 id={formTitleId} className={styles.title}>
            {formTitle}
          </h1>
          <p className={styles.description}>{formDescription}</p>
        </header>

        {children}
      </main>
    </div>
  );
}
