import { useEffect, useRef } from 'react';
import type { IconComponent } from '../icons';
import { CloseIcon } from '../icons';
import { IconButton } from '../ui/IconButton';
import styles from './SensorDetailsDialog.module.css';

interface SensorDetailsDialogProps {
  icon: IconComponent;
  name: string;
  role: string;
  image?: string;
  imageAlt?: string;
  whatItDoes: string;
  whyItMatters: string;
  whatUserNotices: string;
  onClose: () => void;
}

/** Pop-up modal (<dialog> nativo: foco preso, Esc fecha, devolve o foco ao botão). */
export function SensorDetailsDialog({
  icon: Icon,
  name,
  role,
  image,
  imageAlt,
  whatItDoes,
  whyItMatters,
  whatUserNotices,
  onClose,
}: SensorDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `sensor-dialog-${name.replace(/\W+/g, '-').toLowerCase()}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className={styles.content}>
        <IconButton
          className={styles.close}
          aria-label="Fechar"
          onClick={() => dialogRef.current?.close()}
        >
          <CloseIcon />
        </IconButton>

        {image && (
          <img
            className={styles.image}
            src={image}
            alt={imageAlt ?? ''}
            width={750}
            height={833}
          />
        )}

        <div className={styles.body}>
          <div className={styles.heading}>
            <span className={styles.iconWrapper}>
              <Icon />
            </span>
            <div>
              <h3 id={titleId} className={styles.name}>
                {name}
              </h3>
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
      </div>
    </dialog>
  );
}
