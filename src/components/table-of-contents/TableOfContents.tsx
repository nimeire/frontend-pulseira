import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '../icons';
import { getScrollBehavior } from '../../utils/scroll';
import styles from './TableOfContents.module.css';

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: readonly TocItem[];
  activeId: string | null;
  title: string;
  ariaLabel: string;
}

export function TableOfContents({
  items,
  activeId,
  title,
  ariaLabel,
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    // Scrolls directly so re-clicking the current section still works; the
    // router also updates the URL hash.
    document
      .getElementById(id)
      ?.scrollIntoView({ block: 'start', behavior: getScrollBehavior() });
  };

  const listClass = [styles.list, isOpen ? styles.open : '']
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={styles.toc} aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {title}
        <ChevronDownIcon
          className={isOpen ? styles.chevronOpen : styles.chevron}
        />
      </button>
      <p className={styles.heading}>{title}</p>

      <ol id={listId} className={listClass}>
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const linkClass = [styles.link, isActive ? styles.active : '']
            .filter(Boolean)
            .join(' ');

          return (
            <li key={item.id}>
              <Link
                className={linkClass}
                to={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => handleLinkClick(item.id)}
              >
                {index + 1}. {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
