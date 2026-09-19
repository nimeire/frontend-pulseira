import type { ReactNode } from 'react';
import styles from './Notice.module.css';

/** Discreet side-bordered note, e.g. a disclaimer inside a text section. */
export function Notice({ children }: { children: ReactNode }) {
  return <p className={styles.notice}>{children}</p>;
}
