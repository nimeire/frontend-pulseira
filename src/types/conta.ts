/** Tipo de conta, igual a `PerfilConta` do back-end (../backend-pulseira). */
export type PerfilConta = 'PACIENTE' | 'RESPONSAVEL' | 'ADMIN';

/** Conta logada (`GET /api/auth/me`). Nunca inclui senha. */
export interface Conta {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  perfil: PerfilConta;
  /** Só em contas PACIENTE: a pessoa monitorada que a conta representa. */
  pessoaMonitoradaId: string | null;
  /** Foto de perfil (data URL), ou `null` se não tiver. */
  fotoUrl: string | null;
}
