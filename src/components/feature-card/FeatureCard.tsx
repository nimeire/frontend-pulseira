import type { ComponentType } from 'react';
import type { IconProps } from '../icons';
import styles from './FeatureCard.module.css';

export type FeatureCardTone = 'primary' | 'success';

interface FeatureCardProps {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  tone?: FeatureCardTone;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = 'primary',
}: FeatureCardProps) {
  const iconWrapperClass = [
    styles.iconWrapper,
    tone === 'success' ? styles.success : styles.primary,
  ].join(' ');

  return (
    <li className={styles.card}>
      <span className={iconWrapperClass}>
        <Icon />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
}
