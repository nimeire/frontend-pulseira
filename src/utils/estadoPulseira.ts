import type { Pulseira } from '../types/pulseira';
import { aconteceuHaMenosDe, tempoRelativo } from './tempo';

/** Acima disso sem nenhuma leitura, a pulseira é considerada sem sinal. */
const LIMITE_SEM_SINAL_MS = 2 * 60 * 1000;

export interface EstadoPulseira {
  value: string;
  label: string;
  tone: 'primary' | 'success';
}

/** Texto do cartão "Pulseira" das dashboards: diz em palavras se ela está falando com o sistema. */
export function descreverPulseira(pulseira: Pulseira | null): EstadoPulseira {
  if (!pulseira || pulseira.status !== 'conectada') {
    return {
      value: 'Sem pulseira',
      label: 'Nenhuma pulseira conectada',
      tone: 'primary',
    };
  }

  if (!pulseira.ultimoSinalEm) {
    return {
      value: 'Aguardando sinal',
      label: 'A pulseira ainda não enviou dados',
      tone: 'primary',
    };
  }

  const label = `Último sinal ${tempoRelativo(pulseira.ultimoSinalEm)}`;
  return aconteceuHaMenosDe(pulseira.ultimoSinalEm, LIMITE_SEM_SINAL_MS)
    ? { value: 'Online', label, tone: 'success' }
    : { value: 'Sem sinal', label, tone: 'primary' };
}
