export type TipoSanguineo =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

/** Todos os campos são opcionais: o back-end só guarda o que a pessoa informou. */
export interface Endereco {
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  cep?: string | null;
}

/** Espelha `InformacoesMedicas` do back-end (../backend-pulseira). */
export interface InformacoesMedicas {
  tipoSanguineo: TipoSanguineo | null;
  alergias: string[];
  condicoes: string[];
  medicamentosUsoContinuo: string[];
  observacoes: string;
}

/** Espelha `PessoaMonitorada` do back-end (../backend-pulseira). */
export interface Paciente {
  id: string;
  nome: string;
  /** Data ISO (aaaa-mm-dd). */
  dataNascimento: string;
  telefone: string | null;
  endereco: Endereco | null;
  informacoesMedicas: InformacoesMedicas;
  /** Só vem preenchido para o próprio paciente; o responsável não vê. */
  codigoVinculo: string | null;
  /** Conta ativa; para quem não tem conta, vale o cadastro. */
  ativo: boolean;
  fotoUrl: string | null;
}

/** Dados mínimos mostrados ao responsável antes de ele confirmar o vínculo. */
export interface PacienteResumo {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  ativo: boolean;
  fotoUrl: string | null;
}
