import { useCallback } from 'react';
import { mensagemDeErro } from '../services/api';
import { useNotificar } from './useNotificar';

/**
 * Roda uma ação da dashboard (conectar, desvincular, atender alerta...) e
 * depois recarrega os dados. Avisa o resultado no canto da tela: a mensagem de
 * sucesso (se informada) ou o erro da API.
 */
export function useAcao(recarregar: () => Promise<void>) {
  const notificar = useNotificar();

  return useCallback(
    async (acao: () => Promise<void>, mensagemSucesso?: string) => {
      try {
        await acao();
        await recarregar();
        if (mensagemSucesso) notificar.sucesso(mensagemSucesso);
      } catch (falha) {
        notificar.erro(mensagemDeErro(falha));
      }
    },
    [recarregar, notificar],
  );
}
