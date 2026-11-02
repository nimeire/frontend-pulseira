import { useEffect, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { AlertIcon, CheckCircleIcon, CloseIcon } from '../icons';
import type { TipoNotificacao } from '../../context/notificacao-context';
import styles from './Snackbars.module.css';

export interface ItemSnackbar {
  id: number;
  tipo: TipoNotificacao;
  mensagem: string;
}

interface SnackbarsProps {
  itens: ItemSnackbar[];
  onFechar: (id: number) => void;
}

/**
 * Pilha de avisos no canto superior direito. Fica na "camada de cima" do
 * navegador (popover), então aparece até por cima de janelas abertas (modais).
 */
export function Snackbars({ itens, onFechar }: SnackbarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const aberto = container.matches(':popover-open');
    if (itens.length === 0) {
      if (aberto) container.hidePopover();
      return;
    }

    // Reabrir leva o container para o topo da pilha, acima de um modal aberto depois.
    if (aberto) container.hidePopover();
    container.showPopover();
  }, [itens]);

  return (
    <div
      ref={containerRef}
      popover="manual"
      className={styles.container}
      aria-label="Notificações"
    >
      {itens.map((item) => {
        const erro = item.tipo === 'erro';
        const Icone = erro ? AlertIcon : CheckCircleIcon;

        return (
          <div
            key={item.id}
            role={erro ? 'alert' : 'status'}
            className={classNames(styles.item, erro ? styles.erro : styles.sucesso)}
          >
            <Icone className={styles.icone} />
            <p className={styles.mensagem}>{item.mensagem}</p>
            <button
              type="button"
              className={styles.fechar}
              aria-label="Fechar aviso"
              onClick={() => onFechar(item.id)}
            >
              <CloseIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
