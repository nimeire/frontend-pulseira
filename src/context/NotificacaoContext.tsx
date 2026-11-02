import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Snackbars, type ItemSnackbar } from '../components/snackbar/Snackbars';
import {
  NotificacaoContext,
  type Notificar,
  type TipoNotificacao,
} from './notificacao-context';

const DURACAO_MS: Record<TipoNotificacao, number> = {
  sucesso: 4000,
  erro: 7000,
};
/** Mais que isso empilhado vira bagunça: os mais antigos saem. */
const MAXIMO_NA_TELA = 4;

/** Avisos curtos (sucesso/erro) no canto superior direito, que somem sozinhos. */
export function NotificacaoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemSnackbar[]>([]);
  const proximoId = useRef(0);
  const temporizadores = useRef(new Map<number, number>());

  const remover = useCallback((id: number) => {
    window.clearTimeout(temporizadores.current.get(id));
    temporizadores.current.delete(id);
    setItens((atuais) => atuais.filter((item) => item.id !== id));
  }, []);

  const adicionar = useCallback(
    (tipo: TipoNotificacao, mensagem: string) => {
      proximoId.current += 1;
      const id = proximoId.current;
      setItens((atuais) =>
        [...atuais, { id, tipo, mensagem }].slice(-MAXIMO_NA_TELA),
      );
      temporizadores.current.set(
        id,
        window.setTimeout(() => remover(id), DURACAO_MS[tipo]),
      );
    },
    [remover],
  );

  useEffect(() => {
    const temporizadoresAtuais = temporizadores.current;
    return () => temporizadoresAtuais.forEach((t) => window.clearTimeout(t));
  }, []);

  const notificar = useMemo<Notificar>(
    () => ({
      sucesso: (mensagem) => adicionar('sucesso', mensagem),
      erro: (mensagem) => adicionar('erro', mensagem),
    }),
    [adicionar],
  );

  return (
    <NotificacaoContext.Provider value={notificar}>
      {children}
      <Snackbars itens={itens} onFechar={remover} />
    </NotificacaoContext.Provider>
  );
}
