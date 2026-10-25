/** Mantém só dígitos e limita ao tamanho máximo informado. */
function apenasDigitos(valor: string, maxDigitos: number): string {
  return valor.replace(/\D/g, '').slice(0, maxDigitos);
}

/** Formata progressivamente como CPF: 000.000.000-00. */
export function formatarCpf(valor: string): string {
  const digitos = apenasDigitos(valor, 11);

  const partes = [
    digitos.slice(0, 3),
    digitos.slice(3, 6),
    digitos.slice(6, 9),
  ].filter(Boolean);

  let resultado = partes.join('.');
  if (digitos.length > 9) {
    resultado += `-${digitos.slice(9, 11)}`;
  }

  return resultado;
}

/** Formata progressivamente como telefone: (00) 00000-0000 (ou 8 dígitos). */
export function formatarTelefone(valor: string): string {
  const digitos = apenasDigitos(valor, 11);

  if (digitos.length === 0) return '';
  if (digitos.length <= 2) return `(${digitos}`;

  const ddd = digitos.slice(0, 2);
  const corte = digitos.length > 10 ? 7 : 6;
  const inicio = digitos.slice(2, corte);
  const fim = digitos.slice(corte);

  return fim ? `(${ddd}) ${inicio}-${fim}` : `(${ddd}) ${inicio}`;
}

/** Formata progressivamente como data: dd/mm/aaaa. */
export function formatarDataBr(valor: string): string {
  const digitos = apenasDigitos(valor, 8);

  const partes = [digitos.slice(0, 2), digitos.slice(2, 4)].filter(Boolean);

  let resultado = partes.join('/');
  if (digitos.length > 4) {
    resultado += `/${digitos.slice(4, 8)}`;
  }

  return resultado;
}
