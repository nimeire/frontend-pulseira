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
