import { CheckCircleIcon } from '../icons';
import styles from './SummaryCard.module.css';

interface SummaryCardProps {
  title: string;
  points: readonly string[];
}

export function SummaryCard({ title, points }: SummaryCardProps) {
  return (
    <section className={styles.card} aria-labelledby="summary-title">
      <h2 id="summary-title" className={styles.title}>
        {title}
      </h2>
      <ul className={styles.list}>
        {points.map((point) => (
          <li key={point} className={styles.item}>
            <CheckCircleIcon className={styles.icon} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
