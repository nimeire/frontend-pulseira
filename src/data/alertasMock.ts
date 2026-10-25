import type { Alerta } from '../types/alerta';

const MINUTO = 60 * 1000;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;

/**
 * Alertas fictícios (mais recente primeiro). Um deles já vem pendente para
 * dar para ver o fluxo de reconhecer/resolver na dashboard do responsável.
 */
export function gerarAlertasMock(agora: Date = new Date()): Alerta[] {
  const emIso = (msAtras: number) =>
    new Date(agora.getTime() - msAtras).toISOString();

  return [
    { id: 'al-4', tipo: 'botao_panico', status: 'pendente', geradoEm: emIso(8 * MINUTO) },
    { id: 'al-3', tipo: 'queda', status: 'resolvido', geradoEm: emIso(1 * DIA + 3 * HORA) },
    { id: 'al-2', tipo: 'queda', status: 'falso_positivo', geradoEm: emIso(3 * DIA) },
    { id: 'al-1', tipo: 'botao_panico', status: 'resolvido', geradoEm: emIso(6 * DIA) },
  ];
}

/** Mock: a pulseira do paciente de exemplo se comunicou há 2 minutos. */
export function gerarUltimoSinalMock(agora: Date = new Date()): string {
  return new Date(agora.getTime() - 2 * MINUTO).toISOString();
}
