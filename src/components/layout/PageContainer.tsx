import type { ReactNode } from 'react';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  children: ReactNode;
}

/** Centers page content and applies the shared max-width/gutter used by every route. */
export function PageContainer({ children }: PageContainerProps) {
  return <div className={styles.page}>{children}</div>;
}
