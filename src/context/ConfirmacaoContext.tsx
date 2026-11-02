import { useCallback, useRef, useState, type ReactNode } from 'react';
import { Modal } from '../components/modal/Modal';
import { Button } from '../components/ui/Button';
import {
  ConfirmacaoContext,
  type Confirmar,
  type OpcoesConfirmacao,
} from './confirmacao-context';
import styles from './ConfirmacaoContext.module.css';

interface Pedido {
  opcoes: OpcoesConfirmacao;
  responder: (confirmou: boolean) => void;
}

/** Troca o `window.confirm` do navegador por uma janela no estilo do site. */
export function ConfirmacaoProvider({ children }: { children: ReactNode }) {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  const confirmar = useCallback<Confirmar>(
    (opcoes) =>
      new Promise<boolean>((resolve) => {
        focoAnterior.current = document.activeElement as HTMLElement | null;
        setPedido({ opcoes, responder: resolve });
      }),
    [],
  );

  function responder(confirmou: boolean) {
    pedido?.responder(confirmou);
    setPedido(null);
    // Devolve o foco a quem abriu a confirmação (acessibilidade por teclado).
    focoAnterior.current?.focus();
  }

  return (
    <ConfirmacaoContext.Provider value={confirmar}>
      {children}
      {pedido && (
        <Modal
          titulo={pedido.opcoes.titulo}
          tamanho="pequeno"
          onClose={() => responder(false)}
        >
          <p className={styles.mensagem}>{pedido.opcoes.mensagem}</p>
          <div className={styles.acoes}>
            <Button
              variant="secondary"
              data-autofocus
              onClick={() => responder(false)}
            >
              {pedido.opcoes.cancelar ?? 'Cancelar'}
            </Button>
            <Button onClick={() => responder(true)}>
              {pedido.opcoes.confirmar ?? 'Confirmar'}
            </Button>
          </div>
        </Modal>
      )}
    </ConfirmacaoContext.Provider>
  );
}
