import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  align = 'left',
  id,
}: SectionHeaderProps) {
  const classes = [styles.header, align === 'center' ? styles.center : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
