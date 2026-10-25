import type { IconComponent } from '../icons';
import { classNames } from '../../utils/classNames';
import styles from './StepList.module.css';

export interface StepItem {
  icon: IconComponent;
  title: string;
  description: string;
}

interface StepListProps {
  steps: StepItem[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <ol className={styles.list}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const markerClass = classNames(styles.marker, styles.primary);

        return (
          <li key={step.title} className={styles.step}>
            <span className={markerClass}>
              <Icon />
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
            </span>
            <div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
