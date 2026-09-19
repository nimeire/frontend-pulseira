import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  calcularTotalPaginas,
  fatiar,
  interpretarPagina,
} from '../utils/paginacao';

const PARAMETRO_PADRAO = 'pagina';

export interface ResultadoPaginacao<T> {
  itensDaPagina: readonly T[];
  paginaAtual: number;
  totalPaginas: number;
  total: number;
  primeiroItem: number;
  ultimoItem: number;
  irParaPagina: (pagina: number) => void;
}

/**
 * Paginates a list, keeping the current page in the URL query string
 * (`?pagina=2`) so the browser's back button and shared links work.
 * Invalid values in the URL fall back to page 1 and are cleaned up.
 */
export function usePaginacao<T>(
  itens: readonly T[],
  porPagina: number,
  parametro: string = PARAMETRO_PADRAO,
): ResultadoPaginacao<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const total = itens.length;
  const totalPaginas = calcularTotalPaginas(total, porPagina);
  const valorNaUrl = searchParams.get(parametro);
  const paginaAtual = interpretarPagina(valorNaUrl, totalPaginas);

  const { itensDaPagina, primeiroItem, ultimoItem } = useMemo(
    () => fatiar(itens, paginaAtual, porPagina),
    [itens, paginaAtual, porPagina],
  );

  const atualizarUrl = useCallback(
    (pagina: number, replace: boolean) => {
      setSearchParams(
        (atuais) => {
          const proximos = new URLSearchParams(atuais);
          if (pagina > 1) {
            proximos.set(parametro, String(pagina));
          } else {
            proximos.delete(parametro);
          }
          return proximos;
        },
        { replace },
      );
    },
    [parametro, setSearchParams],
  );

  const irParaPagina = useCallback(
    (pagina: number) => atualizarUrl(pagina, false),
    [atualizarUrl],
  );

  // Rewrites an invalid or non-canonical value (?pagina=abc, ?pagina=1).
  useEffect(() => {
    if (valorNaUrl === null) {
      return;
    }

    const canonico = paginaAtual > 1 ? String(paginaAtual) : null;
    if (valorNaUrl !== canonico) {
      atualizarUrl(paginaAtual, true);
    }
  }, [valorNaUrl, paginaAtual, atualizarUrl]);

  return {
    itensDaPagina,
    paginaAtual,
    totalPaginas,
    total,
    primeiroItem,
    ultimoItem,
    irParaPagina,
  };
}
