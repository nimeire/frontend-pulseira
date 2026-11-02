import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import { FormField } from '../../../../components/form-field/FormField';
import { PasswordField } from '../../../../components/form-field/PasswordField';
import { MailIcon } from '../../../../components/icons';
import { useAuth } from '../../../../hooks/useAuth';
import { useNotificar } from '../../../../hooks/useNotificar';
import { mensagemDeErro } from '../../../../services/api';
import { rotaInicial } from '../../../../utils/perfil';
import { LIMITES } from '../../../../utils/validacoes';
import formStyles from '../../../../components/auth-layout/AuthForm.module.css';

export function LoginFormSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const notificar = useNotificar();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const avisouCadastro = useRef(false);

  const acabouDeCadastrar =
    (location.state as { cadastrado?: boolean } | null)?.cadastrado === true;

  useEffect(() => {
    if (acabouDeCadastrar && !avisouCadastro.current) {
      avisouCadastro.current = true;
      notificar.sucesso('Conta criada! Entre para continuar.');
    }
  }, [acabouDeCadastrar, notificar]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviando(true);
    try {
      const conta = await login(email, senha, lembrar);
      navigate(rotaInicial(conta.perfil), { replace: true });
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
      setEnviando(false);
    }
  }

  return (
    <>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <FormField
          id="login-email"
          label="E-mail"
          icon={MailIcon}
          type="email"
          placeholder="Seu e-mail"
          autoComplete="username"
          maxLength={LIMITES.email}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <PasswordField
          id="login-senha"
          label="Senha"
          placeholder="Sua senha"
          autoComplete="current-password"
          maxLength={LIMITES.senha}
          required
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <div className={formStyles.row}>
          <label className={formStyles.checkboxLabel}>
            <input
              type="checkbox"
              className={formStyles.checkbox}
              checked={lembrar}
              onChange={(event) => setLembrar(event.target.checked)}
            />
            Lembrar de mim
          </label>
        </div>

        <Button type="submit" className={formStyles.submit} disabled={enviando}>
          {enviando ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <p className={formStyles.footer}>
        Não tem uma conta?{' '}
        <Link className={formStyles.footerLink} to="/cadastro">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
