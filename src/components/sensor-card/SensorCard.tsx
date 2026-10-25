import type { IconComponent } from '../icons';
import { Button } from '../ui/Button';
import styles from './SensorCard.module.css';

const IMAGE_WIDTH = 750;
const IMAGE_HEIGHT = 833;

interface SensorCardProps {
  icon: IconComponent;
  name: string;
  role: string;
  summary: string;
  /** Foto do componente; sem ela, o card mostra só o ícone em destaque. */
  image?: string;
  imageAlt?: string;
  onShowMore: () => void;
}

export function SensorCard({
  icon: Icon,
  name,
  role,
  summary,
  image,
  imageAlt,
  onShowMore,
}: SensorCardProps) {
  return (
    <li className={styles.card}>
      {image ? (
        <img
          className={styles.image}
          src={image}
          alt={imageAlt ?? ''}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          loading="lazy"
        />
      ) : (
        <div className={styles.imagePlaceholder} aria-hidden="true">
          <Icon className={styles.placeholderIcon} />
        </div>
      )}

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

        <p className={styles.summary}>{summary}</p>

        <Button
          variant="secondary"
          className={styles.more}
          onClick={onShowMore}
          aria-haspopup="dialog"
          aria-label={`Ver mais sobre ${name}`}
        >
          Ver mais
        </Button>
      </div>
    </li>
  );
}
