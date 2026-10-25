/** Cada validador devolve a mensagem de erro, ou `null` quando o valor é válido. */
type Resultado = string | null;

const REGEX_NOME = /^\p{L}[\p{L}' -]*$/u;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_TELEFONE = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const REGEX_CPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const REGEX_DATA = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const REGEX_SENHA = /^[A-Za-z0-9]+$/;

export const SENHA_TAMANHO_MINIMO = 6;

/** Limites de caracteres dos campos de texto livre (os com máscara já têm tamanho fixo). */
export const LIMITES = {
  nome: 100,
  email: 254,
  senha: 32,
} as const;
const ANO_MINIMO = 1900;

export function validarNome(valor: string): Resultado {
  const nome = valor.trim();
  if (nome === '') return 'Informe seu nome completo.';
  if (!REGEX_NOME.test(nome)) return 'O nome deve ter apenas letras.';
  if (!nome.includes(' ')) return 'Informe nome e sobrenome.';
  return null;
}

export function validarCpf(valor: string): Resultado {
  return REGEX_CPF.test(valor) ? null : 'Informe o CPF completo: 000.000.000-00.';
}

export function validarEmail(valor: string): Resultado {
  return REGEX_EMAIL.test(valor.trim())
    ? null
    : 'Informe um e-mail válido, como nome@exemplo.com.';
}

/** Telefone é opcional: vazio é válido, mas o que for digitado segue (xx) xxxxx-xxxx. */
export function validarTelefone(valor: string): Resultado {
  if (valor === '') return null;
  return REGEX_TELEFONE.test(valor)
    ? null
    : 'Use o formato (00) 00000-0000.';
}

export function validarDataNascimento(valor: string): Resultado {
  const mensagemFormato = 'Use o formato dd/mm/aaaa.';
  const partes = REGEX_DATA.exec(valor);
  if (!partes) return mensagemFormato;

  const dia = Number(partes[1]);
  const mes = Number(partes[2]);
  const ano = Number(partes[3]);
  const data = new Date(ano, mes - 1, dia);

  const existe =
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia;
  if (!existe || ano < ANO_MINIMO) return 'Informe uma data válida.';
  if (data > new Date()) return 'A data não pode estar no futuro.';

  return null;
}

export function validarSenha(valor: string): Resultado {
  if (valor !== '' && !REGEX_SENHA.test(valor)) {
    return 'Só são permitidas letras (sem acento) e números, sem símbolos ou espaços.';
  }
  if (valor.length < SENHA_TAMANHO_MINIMO) {
    return `A senha precisa ter no mínimo ${SENHA_TAMANHO_MINIMO} caracteres.`;
  }
  return null;
}

export function validarConfirmacaoSenha(
  senha: string,
  confirmacao: string,
): Resultado {
  return senha === confirmacao ? null : 'As senhas não coincidem.';
}
