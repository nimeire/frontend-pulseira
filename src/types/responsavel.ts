/** Espelha `Cuidador` do back-end (../backend-pulseira). */
export interface Responsavel {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  /** Conta de acesso ativa (o admin pode desativar). */
  ativo: boolean;
  fotoUrl: string | null;
}
