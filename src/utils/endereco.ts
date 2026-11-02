import type { Endereco } from '../types/paciente';

/** "Rua X, 245 — Bairro, Cidade - UF", pulando o que não foi informado. */
export function formatarEndereco(endereco: Endereco | null): string {
  if (!endereco) return '';

  const rua = [endereco.logradouro, endereco.numero].filter(Boolean).join(', ');
  const cidade = [endereco.cidade, endereco.estado].filter(Boolean).join(' - ');
  const regiao = [endereco.bairro, cidade].filter(Boolean).join(', ');

  const cep = endereco.cep && endereco.cep.length === 8 ? `CEP ${endereco.cep.slice(0, 5)}-${endereco.cep.slice(5)}` : '';

  return [[rua, endereco.complemento].filter(Boolean).join(' · '), regiao, cep].filter(Boolean).join(' — ');
}
