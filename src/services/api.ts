const URL_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(
  /\/+$/,
  '',
);

const MENSAGEM_SEM_CONEXAO =
  'Não foi possível falar com o servidor. Confira se a API está ligada e tente de novo.';
const MENSAGEM_PADRAO = 'Algo deu errado. Tente de novo.';

/** Erro devolvido pela API (`{ status, erro, instante }`) ou falha de conexão (status 0). */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function mensagemDeErro(erro: unknown): string {
  return erro instanceof ApiError ? erro.message : MENSAGEM_PADRAO;
}

/** `email:senha` em Base64 (UTF-8), o formato do cabeçalho HTTP Basic. */
export function codificarCredenciais(email: string, senha: string): string {
  const bytes = new TextEncoder().encode(`${email}:${senha}`);
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''));
}

let credenciaisAtuais: string | null = null;
let aoNaoAutorizado: (() => void) | null = null;

export function definirCredenciais(credenciais: string | null): void {
  credenciaisAtuais = credenciais;
}

/** Chamado quando uma conta já logada recebe 401 (ex.: conta desativada). */
export function registrarAoNaoAutorizado(callback: (() => void) | null): void {
  aoNaoAutorizado = callback;
}

interface Opcoes {
  /** Credenciais explícitas (usadas só na tentativa de login, antes de existir sessão). */
  credenciais?: string;
}

export async function requisitar<T>(
  metodo: 'GET' | 'POST' | 'PUT' | 'DELETE',
  caminho: string,
  corpo?: unknown,
  opcoes: Opcoes = {},
): Promise<T> {
  const credenciais = opcoes.credenciais ?? credenciaisAtuais;
  const cabecalhos: Record<string, string> = { Accept: 'application/json' };
  if (credenciais) cabecalhos.Authorization = `Basic ${credenciais}`;
  if (corpo !== undefined) cabecalhos['Content-Type'] = 'application/json';

  let resposta: Response;
  try {
    resposta = await fetch(`${URL_BASE}${caminho}`, {
      method: metodo,
      headers: cabecalhos,
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
  } catch {
    throw new ApiError(0, MENSAGEM_SEM_CONEXAO);
  }

  if (resposta.ok) {
    if (resposta.status === 204) return undefined as T;
    const texto = await resposta.text();
    return (texto ? JSON.parse(texto) : undefined) as T;
  }

  if (resposta.status === 401 && !opcoes.credenciais && credenciaisAtuais) {
    aoNaoAutorizado?.();
  }

  let mensagem = MENSAGEM_PADRAO;
  try {
    const dados: { erro?: string } = await resposta.json();
    if (dados.erro) mensagem = dados.erro;
  } catch {
    // Corpo sem JSON (ex.: erro do servidor): mantém a mensagem padrão.
  }
  throw new ApiError(resposta.status, mensagem);
}
