import type { PulseiraCadastrada } from '../types/pulseira';

/** Pulseiras fictícias da tela de administração (sem back-end conectado). */
export const pulseirasMock: PulseiraCadastrada[] = [
  { id: 'p1', dispositivoId: 'ESP12E-7F3A', status: 'ativa', pacienteNome: 'Helena Martins Souza' },
  { id: 'p2', dispositivoId: 'ESP12E-2B91', status: 'ativa', pacienteNome: 'Maria das Graças Pereira' },
  { id: 'p3', dispositivoId: 'ESP12E-C04D', status: 'ativa', pacienteNome: 'Antônio Ferreira Lima' },
  { id: 'p4', dispositivoId: 'ESP12E-91E8', status: 'em_manutencao', pacienteNome: null },
  { id: 'p5', dispositivoId: 'ESP12E-5A60', status: 'inativa', pacienteNome: null },
];
