import type { PerfilConta } from '../types/conta';

const rotaPorPerfil: Record<PerfilConta, string> = {
  PACIENTE: '/paciente',
  RESPONSAVEL: '/responsavel',
  ADMIN: '/admin',
};

/** Painel de cada tipo de conta: para onde o login e as rotas protegidas mandam. */
export function rotaInicial(perfil: PerfilConta): string {
  return rotaPorPerfil[perfil];
}
