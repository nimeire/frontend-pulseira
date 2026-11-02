import { useState, type FormEvent } from 'react';
import { PasswordField } from '../../../components/form-field/PasswordField';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useNotificar } from '../../../hooks/useNotificar';
import { mensagemDeErro } from '../../../services/api';
import { trocarSenha } from '../../../services/zelo';
import {
  LIMITES,
  validarConfirmacaoSenha,
  validarSenha,
} from '../../../utils/validacoes';
import { PerfilCard } from '../PerfilCard';
import styles from '../PerfilCard.module.css';

export function SenhaSection() {
  const { conta, trocarCredenciais } = useAuth();
  const notificar = useNotificar();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [ocupado, setOcupado] = useState(false);

  if (!conta) return null;
  const emailDaConta = conta.email;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const problema =
      (senhaAtual ? null : 'Digite a sua senha atual.') ??
      validarSenha(novaSenha) ??
      validarConfirmacaoSenha(novaSenha, confirmacao);
    if (problema) {
      notificar.erro(problema);
      return;
    }

    setOcupado(true);
    try {
      await trocarSenha(senhaAtual, novaSenha);
      // A senha é a credencial de todas as chamadas: passa a enviar a nova.
      trocarCredenciais(emailDaConta, novaSenha);
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmacao('');
      notificar.sucesso('Senha atualizada!');
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
    } finally {
      setOcupado(false);
    }
  }

  return (
    <PerfilCard
      titulo="Senha"
      descricao="Mínimo de 6 caracteres, só letras (sem acento) e números."
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <PasswordField
          id="perfil-senha-atual"
          label="Senha atual"
          autoComplete="current-password"
          maxLength={LIMITES.senha}
          value={senhaAtual}
          onChange={(event) => setSenhaAtual(event.target.value)}
        />
        <PasswordField
          id="perfil-senha-nova"
          label="Nova senha"
          autoComplete="new-password"
          maxLength={LIMITES.senha}
          value={novaSenha}
          onChange={(event) => setNovaSenha(event.target.value)}
        />
        <PasswordField
          id="perfil-senha-confirmar"
          label="Confirmar nova senha"
          autoComplete="new-password"
          maxLength={LIMITES.senha}
          value={confirmacao}
          onChange={(event) => setConfirmacao(event.target.value)}
        />
        <div className={styles.acoes}>
          <Button type="submit" disabled={ocupado}>
            {ocupado ? 'Salvando…' : 'Salvar senha'}
          </Button>
        </div>
      </form>
    </PerfilCard>
  );
}
