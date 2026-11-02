import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  ApiError,
  codificarCredenciais,
  definirCredenciais,
  registrarAoNaoAutorizado,
} from '../services/api';
import { entrar, obterConta } from '../services/zelo';
import type { Conta } from '../types/conta';
import { AuthContext, type AuthContextValue } from './auth-context';

const STORAGE_KEY = 'zelo:sessao';

/** Sem "Lembrar de mim" a sessão vai para o sessionStorage (some ao fechar a aba). */
function lerSessaoGuardada(): string | null {
  try {
    return (
      window.localStorage.getItem(STORAGE_KEY) ??
      window.sessionStorage.getItem(STORAGE_KEY)
    );
  } catch {
    return null;
  }
}

function guardarSessao(credenciais: string, lembrar: boolean): void {
  try {
    const destino = lembrar ? window.localStorage : window.sessionStorage;
    const outro = lembrar ? window.sessionStorage : window.localStorage;
    destino.setItem(STORAGE_KEY, credenciais);
    outro.removeItem(STORAGE_KEY);
  } catch {
    // Armazenamento bloqueado: a sessão vale só até recarregar a página.
  }
}

function sessaoEstaNoLocalStorage(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

function apagarSessao(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nada a apagar.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [conta, setConta] = useState<Conta | null>(null);
  const [restaurando, setRestaurando] = useState<boolean>(
    () => lerSessaoGuardada() !== null,
  );

  const sair = useCallback(() => {
    definirCredenciais(null);
    apagarSessao();
    setConta(null);
  }, []);

  useEffect(() => {
    registrarAoNaoAutorizado(sair);
    return () => registrarAoNaoAutorizado(null);
  }, [sair]);

  useEffect(() => {
    const guardada = lerSessaoGuardada();
    if (guardada === null) return;

    let ativo = true;
    definirCredenciais(guardada);
    obterConta()
      .then((contaAtual) => {
        if (ativo) setConta(contaAtual);
      })
      .catch((falha) => {
        if (ativo && falha instanceof ApiError && falha.status === 401) sair();
      })
      .finally(() => {
        if (ativo) setRestaurando(false);
      });

    return () => {
      ativo = false;
    };
  }, [sair]);

  const login = useCallback(
    async (email: string, senha: string, lembrar: boolean) => {
      const { conta: contaNova, credenciais } = await entrar(email, senha);
      definirCredenciais(credenciais);
      guardarSessao(credenciais, lembrar);
      setConta(contaNova);
      return contaNova;
    },
    [],
  );

  const trocarCredenciais = useCallback((email: string, senha: string) => {
    const credenciais = codificarCredenciais(email.trim(), senha);
    definirCredenciais(credenciais);
    guardarSessao(credenciais, sessaoEstaNoLocalStorage());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      conta,
      restaurando,
      login,
      logout: sair,
      atualizarConta: setConta,
      trocarCredenciais,
    }),
    [conta, restaurando, login, sair, trocarCredenciais],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
