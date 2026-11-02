export type StatusConexaoPulseira = 'conectada' | 'desconectada';

/**
 * Pulseira de uma pessoa, vista do app. Espelha `Pulseira` do back-end
 * (../backend-pulseira): `conectada` = status ATIVA e vinculada à pessoa.
 */
export interface Pulseira {
  id: string;
  dispositivoId: string;
  status: StatusConexaoPulseira;
  vinculadaEm: string | null;
  /** Última vez que a pulseira se comunicou com o sistema. */
  ultimoSinalEm: string | null;
}

export type StatusPulseiraCadastrada = 'ativa' | 'inativa' | 'em_manutencao';

/** Linha da lista de pulseiras do `/admin` (espelha `StatusPulseira` do back-end). */
export interface PulseiraCadastrada {
  id: string;
  dispositivoId: string;
  status: StatusPulseiraCadastrada;
  pacienteNome: string | null;
}
