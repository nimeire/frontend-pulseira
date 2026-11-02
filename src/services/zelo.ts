import type {
  Alerta,
  PaginaAlertas,
  ResumoAlertas,
  StatusAlerta,
  TipoAlerta,
} from '../types/alerta';
import type { Conta, PerfilConta } from '../types/conta';
import type {
  Endereco,
  InformacoesMedicas,
  Paciente,
  PacienteResumo,
  TipoSanguineo,
} from '../types/paciente';
import type {
  Pulseira,
  PulseiraCadastrada,
  StatusPulseiraCadastrada,
} from '../types/pulseira';
import type { Responsavel } from '../types/responsavel';
import type { Usuario } from '../types/usuario';
import { formatarCpf } from '../utils/mascaras';
import { codificarCredenciais, requisitar } from './api';

/* ------------------------------------------------------------------ */
/* Formatos que a API devolve (../backend-pulseira) e conversões       */
/* ------------------------------------------------------------------ */

interface InformacoesMedicasApi {
  tipoSanguineo?: string | null;
  alergias?: string[] | null;
  condicoes?: string[] | null;
  medicamentosUsoContinuo?: string[] | null;
  observacoes?: string | null;
}

interface PessoaApi {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string | null;
  endereco: Endereco | null;
  informacoesMedicas: InformacoesMedicasApi | null;
  codigoVinculo: string | null;
  ativo: boolean;
  fotoUrl: string | null;
}

type PessoaResumoApi = PacienteResumo;

interface PulseiraApi {
  id: string;
  dispositivoId: string;
  status: 'ATIVA' | 'INATIVA' | 'EM_MANUTENCAO';
  pessoaMonitoradaId: string | null;
  vinculadaEm: string | null;
  ultimoSinalEm: string | null;
}

interface AlertaApi {
  id: string;
  tipo: 'POSSIVEL_QUEDA' | 'PANICO';
  status: 'PENDENTE' | 'RECONHECIDO' | 'RESOLVIDO' | 'FALSO_POSITIVO';
  geradoEm: string;
}

interface ResumoAlertasApi {
  pendentes: number;
  ultimoAlerta: AlertaApi | null;
}

interface PaginaAlertasApi {
  itens: AlertaApi[];
  pagina: number;
  totalItens: number;
  totalPaginas: number;
}

interface UsuarioAdminApi {
  id: string;
  nome: string;
  perfil: PerfilConta;
  cpf: string | null;
  email: string;
  ativo: boolean;
}

interface PulseiraAdminApi {
  id: string;
  dispositivoId: string;
  status: 'ATIVA' | 'INATIVA' | 'EM_MANUTENCAO';
  pacienteNome: string | null;
}

const tipoAlerta: Record<AlertaApi['tipo'], TipoAlerta> = {
  POSSIVEL_QUEDA: 'queda',
  PANICO: 'botao_panico',
};

const statusAlerta: Record<AlertaApi['status'], StatusAlerta> = {
  PENDENTE: 'pendente',
  RECONHECIDO: 'reconhecido',
  RESOLVIDO: 'resolvido',
  FALSO_POSITIVO: 'falso_positivo',
};

const statusPulseiraAdmin: Record<
  PulseiraAdminApi['status'],
  StatusPulseiraCadastrada
> = {
  ATIVA: 'ativa',
  INATIVA: 'inativa',
  EM_MANUTENCAO: 'em_manutencao',
};

function paraInformacoesMedicas(
  api: InformacoesMedicasApi | null,
): InformacoesMedicas {
  return {
    tipoSanguineo: (api?.tipoSanguineo as TipoSanguineo | null | undefined) ?? null,
    alergias: api?.alergias ?? [],
    condicoes: api?.condicoes ?? [],
    medicamentosUsoContinuo: api?.medicamentosUsoContinuo ?? [],
    observacoes: api?.observacoes ?? '',
  };
}

function paraPaciente(api: PessoaApi): Paciente {
  return {
    id: api.id,
    nome: api.nome,
    dataNascimento: api.dataNascimento,
    telefone: api.telefone,
    endereco: api.endereco,
    informacoesMedicas: paraInformacoesMedicas(api.informacoesMedicas),
    codigoVinculo: api.codigoVinculo,
    ativo: api.ativo,
    fotoUrl: api.fotoUrl,
  };
}

function paraPulseira(api: PulseiraApi): Pulseira {
  return {
    id: api.id,
    dispositivoId: api.dispositivoId,
    status:
      api.status === 'ATIVA' && api.pessoaMonitoradaId
        ? 'conectada'
        : 'desconectada',
    vinculadaEm: api.vinculadaEm,
    ultimoSinalEm: api.ultimoSinalEm,
  };
}

function paraAlerta(api: AlertaApi): Alerta {
  return {
    id: api.id,
    tipo: tipoAlerta[api.tipo],
    status: statusAlerta[api.status],
    geradoEm: api.geradoEm,
  };
}

function paraUsuario(api: UsuarioAdminApi): Usuario {
  return {
    id: api.id,
    nome: api.nome,
    tipo: api.perfil === 'PACIENTE' ? 'paciente' : 'responsavel',
    cpf: api.cpf ? formatarCpf(api.cpf) : '—',
    email: api.email,
    status: api.ativo ? 'ativo' : 'inativo',
  };
}

/* ------------------------------------------------------------------ */
/* Conta                                                               */
/* ------------------------------------------------------------------ */

/** Confere e-mail e senha na API e devolve a conta com as credenciais prontas para guardar. */
export async function entrar(
  email: string,
  senha: string,
): Promise<{ conta: Conta; credenciais: string }> {
  const credenciais = codificarCredenciais(email.trim(), senha);
  const conta = await requisitar<Conta>('GET', '/api/auth/me', undefined, {
    credenciais,
  });
  return { conta, credenciais };
}

export function obterConta(): Promise<Conta> {
  return requisitar<Conta>('GET', '/api/auth/me');
}

export interface DadosCadastro {
  nome: string;
  cpf: string;
  /** Data ISO (aaaa-mm-dd). */
  dataNascimento: string;
  email: string;
  telefone: string;
  senha: string;
  perfil: 'PACIENTE' | 'RESPONSAVEL';
}

export async function cadastrarConta(dados: DadosCadastro): Promise<void> {
  await requisitar<Conta>('POST', '/api/auth/cadastro', {
    ...dados,
    telefone: dados.telefone || null,
  });
}

/* ------------------------------------------------------------------ */
/* Pessoa monitorada, vínculos, pulseira e alertas                     */
/* ------------------------------------------------------------------ */

export async function buscarPaciente(pessoaId: string): Promise<Paciente> {
  const pessoa = await requisitar<PessoaApi>(
    'GET',
    `/api/pessoas-monitoradas/${pessoaId}`,
  );
  return paraPaciente(pessoa);
}

export async function salvarInformacoesMedicas(
  pessoaId: string,
  informacoes: InformacoesMedicas,
): Promise<void> {
  await requisitar<PessoaApi>(
    'PUT',
    `/api/pessoas-monitoradas/${pessoaId}/informacoes-medicas`,
    informacoes,
  );
}

export async function salvarEndereco(
  pessoaId: string,
  endereco: Endereco,
): Promise<void> {
  await requisitar<PessoaApi>(
    'PUT',
    `/api/pessoas-monitoradas/${pessoaId}/endereco`,
    endereco,
  );
}

export function buscarPacientePorCodigo(codigo: string): Promise<PacienteResumo> {
  return requisitar<PessoaResumoApi>(
    'GET',
    `/api/pessoas-monitoradas/por-codigo/${encodeURIComponent(codigo.trim())}`,
  );
}

export async function listarResponsaveis(
  pessoaId: string,
): Promise<Responsavel[]> {
  return requisitar<Responsavel[]>(
    'GET',
    `/api/pessoas-monitoradas/${pessoaId}/responsaveis`,
  );
}

export async function desvincularResponsavel(
  pessoaId: string,
  responsavelId: string,
): Promise<void> {
  await requisitar<void>(
    'DELETE',
    `/api/pessoas-monitoradas/${pessoaId}/responsaveis/${responsavelId}`,
  );
}

/** `null` quando a pessoa ainda não tem pulseira (a API responde 204). */
export async function buscarPulseira(pessoaId: string): Promise<Pulseira | null> {
  const pulseira = await requisitar<PulseiraApi | undefined>(
    'GET',
    `/api/pessoas-monitoradas/${pessoaId}/pulseira`,
  );
  return pulseira ? paraPulseira(pulseira) : null;
}

export async function parearPulseira(dispositivoId: string): Promise<void> {
  await requisitar<PulseiraApi>('POST', '/api/pulseiras/parear', {
    dispositivoId: dispositivoId.trim(),
  });
}

export async function desparearPulseira(pulseiraId: string): Promise<void> {
  await requisitar<PulseiraApi>('DELETE', `/api/pulseiras/${pulseiraId}/vinculo`);
}

export function vincularPorCodigo(codigo: string): Promise<PacienteResumo> {
  return requisitar<PessoaResumoApi>('POST', '/api/vinculos', {
    codigoVinculo: codigo.trim(),
  });
}

export function listarMeusPacientes(): Promise<PacienteResumo[]> {
  return requisitar<PessoaResumoApi[]>('GET', '/api/vinculos/meus');
}

export async function desvincularPaciente(pessoaId: string): Promise<void> {
  await requisitar<void>('DELETE', `/api/vinculos/${pessoaId}`);
}

interface OpcoesPagina {
  pagina: number;
  tamanho: number;
  /** Só os alertas das últimas 24 horas; `false` traz todos. */
  ultimas24h: boolean;
}

export async function listarAlertasPagina(
  pessoaId: string,
  { pagina, tamanho, ultimas24h }: OpcoesPagina,
): Promise<PaginaAlertas> {
  const consulta = new URLSearchParams({
    pessoaMonitoradaId: pessoaId,
    pagina: String(pagina),
    tamanho: String(tamanho),
    ultimas24h: String(ultimas24h),
  });
  const resposta = await requisitar<PaginaAlertasApi>(
    'GET',
    `/api/alertas/pagina?${consulta}`,
  );
  return {
    itens: resposta.itens.map(paraAlerta),
    pagina: resposta.pagina,
    totalItens: resposta.totalItens,
    totalPaginas: resposta.totalPaginas,
  };
}

export async function buscarResumoAlertas(
  pessoaId: string,
): Promise<ResumoAlertas> {
  const resumo = await requisitar<ResumoAlertasApi>(
    'GET',
    `/api/alertas/resumo?pessoaMonitoradaId=${encodeURIComponent(pessoaId)}`,
  );
  return {
    pendentes: resumo.pendentes,
    ultimoAlerta: resumo.ultimoAlerta ? paraAlerta(resumo.ultimoAlerta) : null,
  };
}

const caminhoDaAcao: Record<
  Exclude<StatusAlerta, 'pendente'>,
  'reconhecer' | 'resolver' | 'falso-positivo'
> = {
  reconhecido: 'reconhecer',
  resolvido: 'resolver',
  falso_positivo: 'falso-positivo',
};

export async function atenderAlerta(
  alertaId: string,
  novoStatus: Exclude<StatusAlerta, 'pendente'>,
): Promise<void> {
  await requisitar<AlertaApi>(
    'PUT',
    `/api/alertas/${alertaId}/${caminhoDaAcao[novoStatus]}`,
    {},
  );
}

/* ------------------------------------------------------------------ */
/* Painéis (várias chamadas juntas)                                    */
/* ------------------------------------------------------------------ */

export interface PainelPaciente {
  paciente: Paciente;
  pulseira: Pulseira | null;
  /** O back-end aceita vários responsáveis por paciente. */
  responsaveis: Responsavel[];
  resumo: ResumoAlertas;
}

export async function carregarPainelPaciente(
  pessoaId: string,
): Promise<PainelPaciente> {
  const [paciente, pulseira, responsaveis, resumo] = await Promise.all([
    buscarPaciente(pessoaId),
    buscarPulseira(pessoaId),
    listarResponsaveis(pessoaId),
    buscarResumoAlertas(pessoaId),
  ]);
  return { paciente, pulseira, responsaveis, resumo };
}

export interface PainelResponsavel {
  /** Todos os pacientes que o responsável acompanha. */
  pacientes: PacienteResumo[];
  /** O paciente aberto no painel (`null` enquanto não houver nenhum). */
  paciente: Paciente | null;
  pulseira: Pulseira | null;
  resumo: ResumoAlertas | null;
}

/** Carrega a lista de pacientes e o painel de um deles (o escolhido, ou o primeiro). */
export async function carregarPainelResponsavel(
  selecionadoId: string | null,
): Promise<PainelResponsavel> {
  const pacientes = await listarMeusPacientes();
  const escolhido = pacientes.find((p) => p.id === selecionadoId) ?? pacientes[0];
  if (!escolhido) {
    return { pacientes, paciente: null, pulseira: null, resumo: null };
  }

  const [paciente, pulseira, resumo] = await Promise.all([
    buscarPaciente(escolhido.id),
    buscarPulseira(escolhido.id),
    buscarResumoAlertas(escolhido.id),
  ]);
  return { pacientes, paciente, pulseira, resumo };
}

/* ------------------------------------------------------------------ */
/* Administração                                                       */
/* ------------------------------------------------------------------ */

export interface PainelAdmin {
  usuarios: Usuario[];
  pulseiras: PulseiraCadastrada[];
}

export async function carregarPainelAdmin(): Promise<PainelAdmin> {
  const [usuarios, pulseiras] = await Promise.all([
    requisitar<UsuarioAdminApi[]>('GET', '/api/admin/usuarios'),
    requisitar<PulseiraAdminApi[]>('GET', '/api/admin/pulseiras'),
  ]);
  return {
    usuarios: usuarios.map(paraUsuario),
    pulseiras: pulseiras.map((pulseira) => ({
      id: pulseira.id,
      dispositivoId: pulseira.dispositivoId,
      status: statusPulseiraAdmin[pulseira.status],
      pacienteNome: pulseira.pacienteNome,
    })),
  };
}

export async function alterarStatusUsuario(
  usuarioId: string,
  ativo: boolean,
): Promise<void> {
  await requisitar<UsuarioAdminApi>(
    'PUT',
    `/api/admin/usuarios/${usuarioId}/status`,
    { ativo },
  );
}

export async function excluirUsuario(usuarioId: string): Promise<void> {
  await requisitar<void>('DELETE', `/api/admin/usuarios/${usuarioId}`);
}

/* ------------------------------------------------------------------ */
/* Configurações da própria conta                                      */
/* ------------------------------------------------------------------ */

/** `null` remove a foto. */
export function trocarFotoPerfil(fotoUrl: string | null): Promise<Conta> {
  return requisitar<Conta>('PUT', '/api/conta/foto', { fotoUrl });
}

/** Vazio remove o telefone. */
export function trocarTelefone(telefone: string): Promise<Conta> {
  return requisitar<Conta>('PUT', '/api/conta/telefone', { telefone });
}

export function trocarEmail(email: string, senhaAtual: string): Promise<Conta> {
  return requisitar<Conta>('PUT', '/api/conta/email', {
    email: email.trim(),
    senhaAtual,
  });
}

export function trocarSenha(
  senhaAtual: string,
  novaSenha: string,
): Promise<Conta> {
  return requisitar<Conta>('PUT', '/api/conta/senha', { senhaAtual, novaSenha });
}

export function trocarTipoConta(
  perfil: 'PACIENTE' | 'RESPONSAVEL',
): Promise<Conta> {
  return requisitar<Conta>('PUT', '/api/conta/perfil', { perfil });
}
