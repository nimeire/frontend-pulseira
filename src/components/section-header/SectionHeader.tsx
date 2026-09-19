import type { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
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
  const classes = classNames(
    styles.header,
    align === 'center' && styles.center,
  );

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
