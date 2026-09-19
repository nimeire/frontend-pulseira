import { Button } from '../ui/Button';
import { LinkButton } from '../ui/LinkButton';
import styles from './CallToAction.module.css';

interface LinkAction {
  label: string;
  to: string;
}

interface CallToActionProps {
  title: string;
  description?: string;
  primaryAction: LinkAction;
  secondaryLabel?: string;
}

export function CallToAction({
  title,
  description,
  primaryAction,
  secondaryLabel,
}: CallToActionProps) {
  return (
    <div className={styles.cta}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.actions}>
        <LinkButton to={primaryAction.to} variant="onPrimary">
          {primaryAction.label}
        </LinkButton>
        {secondaryLabel && (
          <Button variant="onPrimaryGhost">{secondaryLabel}</Button>
        )}
      </div>
    </div>
  );
}
