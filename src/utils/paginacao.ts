export interface FatiaPaginada<T> {
  itensDaPagina: readonly T[];
  /** 1-based position of the first item on the page (0 when the list is empty). */
  primeiroItem: number;
  /** 1-based position of the last item on the page (0 when the list is empty). */
  ultimoItem: number;
}

/** A page number, or an ellipsis standing in for skipped pages. */
export type ItemPaginacao = number | 'reticencias';

const POSITIVE_INTEGER = /^\d+$/;
const MAX_PAGINAS_SEM_RETICENCIAS = 7;

export function calcularTotalPaginas(total: number, porPagina: number): number {
  return porPagina > 0 ? Math.ceil(total / porPagina) : 0;
}

/**
 * Turns a raw value (e.g. from a query string) into a valid page number.
 * Anything missing, non-numeric, below 1 or above the last page becomes 1.
 */
export function interpretarPagina(
  valor: string | null,
  totalPaginas: number,
): number {
  if (valor === null || !POSITIVE_INTEGER.test(valor)) {
    return 1;
  }

  const pagina = Number(valor);
  return pagina >= 1 && pagina <= totalPaginas ? pagina : 1;
}

export function fatiar<T>(
  itens: readonly T[],
  pagina: number,
  porPagina: number,
): FatiaPaginada<T> {
  const inicio = (pagina - 1) * porPagina;
  const itensDaPagina = itens.slice(inicio, inicio + porPagina);

  return {
    itensDaPagina,
    primeiroItem: itensDaPagina.length > 0 ? inicio + 1 : 0,
    ultimoItem: itensDaPagina.length > 0 ? inicio + itensDaPagina.length : 0,
  };
}

/** Page buttons to render, collapsing long ranges into ellipses. */
export function gerarItensPaginacao(
  paginaAtual: number,
  totalPaginas: number,
): ItemPaginacao[] {
  if (totalPaginas <= MAX_PAGINAS_SEM_RETICENCIAS) {
    return Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }

  const paginas = new Set<number>([
    1,
    totalPaginas,
    paginaAtual - 1,
    paginaAtual,
    paginaAtual + 1,
  ]);
  const ordenadas = [...paginas]
    .filter((pagina) => pagina >= 1 && pagina <= totalPaginas)
    .sort((a, b) => a - b);

  const itens: ItemPaginacao[] = [];
  ordenadas.forEach((pagina, index) => {
    const anterior = ordenadas[index - 1];
    if (anterior !== undefined && pagina - anterior > 1) {
      itens.push('reticencias');
    }
    itens.push(pagina);
  });

  return itens;
}
