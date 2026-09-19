import { classNames } from '../../utils/classNames';
import { CallToAction, type CallToActionProps } from './CallToAction';
import styles from './CallToActionSection.module.css';

interface CallToActionSectionProps extends CallToActionProps {
  /** Accessible name of the section landmark. */
  ariaLabel: string;
  /** Less room above the banner, for pages that end with a short list. */
  compact?: boolean;
}

/** A `CallToAction` banner wrapped with the spacing used at the end of a page. */
export function CallToActionSection({
  ariaLabel,
  compact = false,
  ...callToAction
}: CallToActionSectionProps) {
  return (
    <section
      className={classNames(styles.section, compact && styles.compact)}
      aria-label={ariaLabel}
    >
      <CallToAction {...callToAction} />
    </section>
  );
}
