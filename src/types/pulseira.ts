export type StatusConexaoPulseira = 'conectada' | 'desconectada';

/**
 * Estado de pareamento da pulseira física com o paciente, visto do app.
 * Espelha parcialmente `Pulseira`/`StatusPulseira` do back-end
 * (../backend-pulseira) — aqui só interessam os dois estados de conexão.
 */
export interface Pulseira {
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
