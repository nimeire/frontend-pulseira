import { useContext } from 'react';
import { NotificacaoContext } from '../context/notificacao-context';

/** `notificar.sucesso("Salvo!")` / `notificar.erro("...")`: aviso no canto superior direito. */
export function useNotificar() {
  const notificar = useContext(NotificacaoContext);

  if (!notificar) {
    throw new Error('useNotificar must be used within a NotificacaoProvider');
  }

  return notificar;
}
