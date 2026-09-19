import type { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { SectionHeader } from '../section-header/SectionHeader';
import styles from './ContentSection.module.css';

interface ContentSectionProps {
  /** Anchor id of the section itself (e.g. targeted by footer links). */
  id?: string;
  /** Id of the section title, referenced by `aria-labelledby`. */
  titleId: string;
  title: ReactNode;
  description?: ReactNode;
  titleAlign?: 'left' | 'center';
  /** Space between the section's children: text blocks use `md`. */
  gap?: 'md' | 'lg';
  /** Adds extra room below, for the last section of a page. */
  isLast?: boolean;
  children: ReactNode;
}

/** A page section: top border, vertical rhythm and a titled header. */
export function ContentSection({
  id,
  titleId,
  title,
  description,
  titleAlign,
  gap = 'lg',
  isLast = false,
  children,
}: ContentSectionProps) {
  const classes = classNames(
    styles.section,
    gap === 'md' ? styles.gapMd : styles.gapLg,
    isLast && styles.last,
  );

  return (
    <section id={id} className={classes} aria-labelledby={titleId}>
      <SectionHeader
        id={titleId}
        title={title}
        description={description}
        align={titleAlign}
      />
      {children}
    </section>
  );
}

/** Body paragraph for a text-only section. */
export function SectionText({ children }: { children: ReactNode }) {
  return <p className={styles.text}>{children}</p>;
}
