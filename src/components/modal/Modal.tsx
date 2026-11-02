import { useEffect, useId, useRef, type ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { CloseIcon } from '../icons';
import { IconButton } from '../ui/IconButton';
import styles from './Modal.module.css';

interface ModalProps {
  titulo: string;
  onClose: () => void;
  /** `pequeno` para confirmações; `padrao` para listas e formulários. */
  tamanho?: 'padrao' | 'pequeno';
  children: ReactNode;
}

/** Janela flutuante (<dialog> nativo: foco preso, Esc fecha, clicar fora fecha). */
export function Modal({
  titulo,
  onClose,
  tamanho = 'padrao',
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tituloId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    // Um elemento marcado com data-autofocus (ex.: o botão seguro de uma confirmação) recebe o foco.
    dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={classNames(styles.dialog, tamanho === 'pequeno' && styles.pequeno)}
      aria-labelledby={tituloId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <header className={styles.cabecalho}>
        <h2 id={tituloId} className={styles.titulo}>
          {titulo}
        </h2>
        <IconButton aria-label="Fechar" onClick={() => dialogRef.current?.close()}>
          <CloseIcon />
        </IconButton>
      </header>
      <div className={styles.corpo}>{children}</div>
    </dialog>
  );
}
