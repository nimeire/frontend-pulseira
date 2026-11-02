import { useContext } from 'react';
import { ConfirmacaoContext } from '../context/confirmacao-context';

export function useConfirmar() {
  const confirmar = useContext(ConfirmacaoContext);

  if (!confirmar) {
    throw new Error('useConfirmar must be used within a ConfirmacaoProvider');
  }

  return confirmar;
}
