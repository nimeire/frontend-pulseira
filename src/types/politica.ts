export interface TermoGlossario {
  termo: string;
  definicao: string;
}

/**
 * Building blocks of the privacy policy text. Any `[TEXTO ENTRE COLCHETES]`
 * inside a string is rendered as a highlighted placeholder to be filled in.
 */
export type BlocoPolitica =
  | { tipo: 'paragrafo'; texto: string }
  | { tipo: 'subtitulo'; texto: string }
  | { tipo: 'lista'; itens: readonly string[] }
  | { tipo: 'glossario'; itens: readonly TermoGlossario[] }
  | { tipo: 'destaque'; texto: string }
  | { tipo: 'link'; texto: string; para: string };

export interface SecaoPolitica {
  id: string;
  titulo: string;
  conteudo: readonly BlocoPolitica[];
}
