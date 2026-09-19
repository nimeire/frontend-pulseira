import type { ComponentType } from 'react';
import type { IconProps } from '../icons';
import styles from './SensorCard.module.css';

const IMAGE_WIDTH = 750;
const IMAGE_HEIGHT = 833;

interface SensorCardProps {
  icon: ComponentType<IconProps>;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  whatItDoes: string;
  whyItMatters: string;
  whatUserNotices: string;
}

export function SensorCard({
  icon: Icon,
  name,
  role,
  image,
  imageAlt,
  whatItDoes,
  whyItMatters,
  whatUserNotices,
}: SensorCardProps) {
  return (
    <li className={styles.card}>
      <img
        className={styles.image}
        src={image}
        alt={imageAlt}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        loading="lazy"
      />

      <div className={styles.body}>
        <div className={styles.heading}>
          <span className={styles.iconWrapper}>
            <Icon />
          </span>
          <div>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.role}>{role}</p>
          </div>
        </div>

        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>O que faz</dt>
            <dd>{whatItDoes}</dd>
          </div>
          <div className={styles.detail}>
            <dt>Por que é importante</dt>
            <dd>{whyItMatters}</dd>
          </div>
          <div className={styles.detail}>
            <dt>O que você percebe na prática</dt>
            <dd>{whatUserNotices}</dd>
          </div>
        </dl>
      </div>
    </li>
  );
}
