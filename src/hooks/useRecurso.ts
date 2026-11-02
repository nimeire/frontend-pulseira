import { useCallback, useEffect, useRef, useState } from 'react';
import { mensagemDeErro } from '../services/api';

interface Recurso<T> {
  dados: T | undefined;
  /** `true` só na primeira carga; as recargas (polling) não piscam a tela. */
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
}

/**
 * Carrega dados da API ao montar e, se `intervaloMs` for informado, recarrega
 * de tempos em tempos (polling). `chave` reinicia a carga quando muda; com
 * `null` nada é buscado.
 */
export function useRecurso<T>(
  carregar: () => Promise<T>,
  chave: string | null,
  intervaloMs?: number,
): Recurso<T> {
  const [dados, setDados] = useState<T | undefined>(undefined);
  const [carregando, setCarregando] = useState(chave !== null);
  const [erro, setErro] = useState<string | null>(null);
  const carregarRef = useRef(carregar);

  useEffect(() => {
    carregarRef.current = carregar;
  });

  const recarregar = useCallback(async () => {
    try {
      setDados(await carregarRef.current());
      setErro(null);
    } catch (falha) {
      setErro(mensagemDeErro(falha));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (chave === null) return;

    recarregar();
    if (!intervaloMs) return;

    const id = window.setInterval(recarregar, intervaloMs);
    return () => window.clearInterval(id);
  }, [chave, intervaloMs, recarregar]);

  return { dados, carregando, erro, recarregar };
}
