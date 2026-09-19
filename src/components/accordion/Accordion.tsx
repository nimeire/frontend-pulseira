import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDownIcon } from '../icons';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  titulo: string;
  conteudo: ReactNode;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  /** Id of the open item, or null when all are closed (single-open accordion). */
  abertoId: string | null;
  onToggle: (id: string) => void;
  /** Heading level for each item title; pick the one that fits the page outline. */
  nivelTitulo?: 'h2' | 'h3';
}

export function Accordion({
  items,
  abertoId,
  onToggle,
  nivelTitulo: Heading = 'h2',
}: AccordionProps) {
  const baseId = useId();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    evento: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const total = items.length;
    let destino: number;

    switch (evento.key) {
      case 'ArrowDown':
        destino = (index + 1) % total;
        break;
      case 'ArrowUp':
        destino = (index - 1 + total) % total;
        break;
      case 'Home':
        destino = 0;
        break;
      case 'End':
        destino = total - 1;
        break;
      default:
        return;
    }

    evento.preventDefault();
    triggers.current[destino]?.focus();
  };

  return (
    <ul className={styles.list}>
      {items.map((item, index) => {
        const isOpen = item.id === abertoId;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <li key={item.id} className={styles.item}>
            <Heading className={styles.heading}>
              <button
                ref={(element) => {
                  triggers.current[index] = element;
                }}
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(item.id)}
                onKeyDown={(evento) => handleKeyDown(evento, index)}
              >
                <span>{item.titulo}</span>
                <ChevronDownIcon
                  className={isOpen ? styles.chevronOpen : styles.chevron}
                />
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={isOpen ? styles.panelOpen : styles.panel}
            >
              <div className={styles.panelClip}>
                <div className={styles.panelContent}>{item.conteudo}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
