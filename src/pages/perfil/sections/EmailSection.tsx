import { useState, type FormEvent } from 'react';
import { FormField } from '../../../components/form-field/FormField';
import { PasswordField } from '../../../components/form-field/PasswordField';
import { MailIcon } from '../../../components/icons';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useNotificar } from '../../../hooks/useNotificar';
import { mensagemDeErro } from '../../../services/api';
import { trocarEmail } from '../../../services/zelo';
import { LIMITES, validarEmail } from '../../../utils/validacoes';
import { PerfilCard } from '../PerfilCard';
import styles from '../PerfilCard.module.css';

export function EmailSection() {
  const { conta, atualizarConta, trocarCredenciais } = useAuth();
  const notificar = useNotificar();
  const [email, setEmail] = useState(conta?.email ?? '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [erroEmail, setErroEmail] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const problema = validarEmail(email);
    if (problema) {
      setErroEmail(problema);
      return;
    }
    if (!senhaAtual) {
      notificar.erro('Digite a sua senha atual para confirmar.');
      return;
    }

    setOcupado(true);
    try {
      const atualizada = await trocarEmail(email, senhaAtual);
      // O e-mail é o login: a partir de agora o site envia o novo.
      trocarCredenciais(atualizada.email, senhaAtual);
      atualizarConta(atualizada);
      setSenhaAtual('');
      notificar.sucesso('E-mail atualizado! Use o novo e-mail para entrar.');
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
    } finally {
      setOcupado(false);
    }
  }

  return (
    <PerfilCard
      titulo="E-mail"
      descricao="É o e-mail que você usa para entrar. Para trocar, confirme sua senha."
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField
          id="perfil-email"
          label="E-mail"
          icon={MailIcon}
          type="email"
          autoComplete="email"
          maxLength={LIMITES.email}
          error={erroEmail}
          value={email}
          onChange={(event) => {
            setErroEmail(null);
            setEmail(event.target.value);
          }}
        />
        <PasswordField
          id="perfil-email-senha"
          label="Senha atual"
          autoComplete="current-password"
          maxLength={LIMITES.senha}
          value={senhaAtual}
          onChange={(event) => setSenhaAtual(event.target.value)}
        />
        <div className={styles.acoes}>
          <Button type="submit" disabled={ocupado}>
            {ocupado ? 'Salvando…' : 'Salvar e-mail'}
          </Button>
        </div>
      </form>
    </PerfilCard>
  );
}
