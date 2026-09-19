import { classNames } from '../../utils/classNames';
import styles from './PageHero.module.css';

interface PageHeroProps {
  /** Id of the `h1`, referenced by `aria-labelledby`. */
  titleId: string;
  eyebrow?: string;
  title: string;
  description: string;
  /** Less room below the hero, for pages whose content follows closely. */
  tight?: boolean;
}

/** Centered text-only page header with the page's `h1`. */
export function PageHero({
  titleId,
  eyebrow,
  title,
  description,
  tight = false,
}: PageHeroProps) {
  return (
    <section
      className={classNames(styles.hero, tight && styles.tight)}
      aria-labelledby={titleId}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 id={titleId} className={styles.title}>
        {title}
      </h1>
      <p className={styles.description}>{description}</p>
    </section>
  );
}
