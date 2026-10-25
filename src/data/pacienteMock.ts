import type { Paciente } from '../types/paciente';
import type { Responsavel } from '../types/responsavel';
import type { Pulseira } from '../types/pulseira';

/**
 * Dados fictícios usados pelas dashboards de paciente/responsável enquanto
 * não há back-end conectado — ver "Pendências reais" no CLAUDE.md. O
 * formato segue `PessoaMonitorada`/`Cuidador`/`Pulseira` do back-end
 * (../backend-pulseira), pra facilitar trocar pelo fetch real depois.
 */
export const pacienteMock: Paciente = {
  id: 'paciente-1',
  nome: 'Antônio Ferreira Lima',
  dataNascimento: '1948-03-22',
  telefone: '(13) 99812-3344',
  codigoVinculo: 'ZELO-4T7P',
  endereco: {
    logradouro: 'Rua das Andorinhas',
    numero: '245',
    bairro: 'Boqueirão',
    cidade: 'Praia Grande',
    estado: 'SP',
    cep: '11700-100',
  },
  informacoesMedicas: {
    tipoSanguineo: 'O+',
    alergias: ['dipirona', 'aas'],
    condicoes: ['hipertensao', 'mobilidade_reduzida'],
    medicamentosUsoContinuo: ['anti_hipertensivo'],
    observacoes: 'Usa bengala para caminhar distâncias mais longas.',
  },
};

export const responsavelMock: Responsavel = {
  id: 'responsavel-1',
  nome: 'Camila Ferreira Lima',
  email: 'camila.lima@example.com',
  telefone: '(13) 99755-8821',
};

export const pulseiraMock: Pulseira = {
  dispositivoId: 'ESP12E-7F3A',
  status: 'desconectada',
  vinculadaEm: null,
  ultimoSinalEm: null,
};
