import { createContext } from 'react';

export type TipoNotificacao = 'sucesso' | 'erro';

export interface Notificar {
  sucesso: (mensagem: string) => void;
  erro: (mensagem: string) => void;
}

export const NotificacaoContext = createContext<Notificar | undefined>(
  undefined,
);
