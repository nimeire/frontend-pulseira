export type TipoAlerta = 'queda' | 'botao_panico';

/** Mesmo ciclo de vida de `StatusAlerta` no back-end (../backend-pulseira). */
export type StatusAlerta =
  | 'pendente'
  | 'reconhecido'
  | 'resolvido'
  | 'falso_positivo';

/** Espelha `Alerta` do back-end: um evento que exige atenção do responsável. */
export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  status: StatusAlerta;
  geradoEm: string;
}

/** Quantos alertas esperam atendimento e qual foi o mais recente (`GET /api/alertas/resumo`). */
export interface ResumoAlertas {
  pendentes: number;
  ultimoAlerta: Alerta | null;
}

/** Uma página de alertas (`pagina` começa em 1). */
export interface PaginaAlertas {
  itens: Alerta[];
  pagina: number;
  totalItens: number;
  totalPaginas: number;
}
