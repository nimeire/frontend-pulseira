import { createContext } from 'react';

export interface OpcoesConfirmacao {
  titulo: string;
  mensagem: string;
  /** Texto do botão que confirma. Padrão: "Confirmar". */
  confirmar?: string;
  /** Texto do botão que desiste. Padrão: "Cancelar". */
  cancelar?: string;
}

/** Abre a janela de confirmação e responde `true` (confirmou) ou `false` (desistiu). */
export type Confirmar = (opcoes: OpcoesConfirmacao) => Promise<boolean>;

export const ConfirmacaoContext = createContext<Confirmar | undefined>(
  undefined,
);
