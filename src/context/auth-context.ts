import { createContext } from 'react';
import type { Conta } from '../types/conta';

export interface AuthContextValue {
  /** Conta logada, ou `null` se ninguém entrou. */
  conta: Conta | null;
  /** `true` enquanto uma sessão guardada ainda está sendo conferida na API. */
  restaurando: boolean;
  /** Confere e-mail e senha na API; `lembrar` mantém a sessão depois de fechar o navegador. */
  login: (email: string, senha: string, lembrar: boolean) => Promise<Conta>;
  logout: () => void;
  /** Troca os dados da conta logada (depois de salvar foto, telefone, tipo...). */
  atualizarConta: (conta: Conta) => void;
  /** Depois de trocar e-mail ou senha: passa a enviar as credenciais novas à API. */
  trocarCredenciais: (email: string, senha: string) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
