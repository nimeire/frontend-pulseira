import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import { FormField } from '../../../../components/form-field/FormField';
import { PasswordField } from '../../../../components/form-field/PasswordField';
import {
  CalendarIcon,
  IdCardIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from '../../../../components/icons';
import {
  formatarCpf,
  formatarDataBr,
  formatarTelefone,
} from '../../../../utils/mascaras';
import {
  LIMITES,
  validarConfirmacaoSenha,
  validarCpf,
  validarDataNascimento,
  validarEmail,
  validarNome,
  validarSenha,
  validarTelefone,
} from '../../../../utils/validacoes';
import formStyles from '../../../../components/auth-layout/AuthForm.module.css';

type Campo =
  | 'nome'
  | 'cpf'
  | 'dataNascimento'
  | 'email'
  | 'telefone'
  | 'senha'
  | 'confirmarSenha';

const ID_DO_CAMPO: Record<Campo, string> = {
  nome: 'cadastro-nome',
  cpf: 'cadastro-cpf',
  dataNascimento: 'cadastro-nascimento',
  email: 'cadastro-email',
  telefone: 'cadastro-telefone',
  senha: 'cadastro-senha',
  confirmarSenha: 'cadastro-confirmar-senha',
};

export function CadastroFormSection() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [tocados, setTocados] = useState<Partial<Record<Campo, boolean>>>({});
  const [focado, setFocado] = useState<Campo | null>(null);
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const erros: Record<Campo, string | null> = {
    nome: validarNome(nome),
    cpf: validarCpf(cpf),
    dataNascimento: validarDataNascimento(dataNascimento),
    email: validarEmail(email),
    telefone: validarTelefone(telefone),
    senha: validarSenha(senha),
    confirmarSenha: validarConfirmacaoSenha(senha, confirmarSenha),
  };

  // Senhas avisam enquanto se digita; os demais campos só depois de saírem deles.
  const interagiu = (campo: Campo) =>
    tentouEnviar ||
    Boolean(tocados[campo]) ||
    (campo === 'senha' && senha !== '') ||
    (campo === 'confirmarSenha' && confirmarSenha !== '');

  const invalido = (campo: Campo) => interagiu(campo) && erros[campo] !== null;

  // A mensagem só ocupa espaço enquanto o campo está em foco; a borda
  // destacada continua sinalizando o erro depois que o foco sai.
  const mensagem = (campo: Campo) =>
    focado === campo && invalido(campo) ? erros[campo] : null;

  const props = (campo: Campo) => ({
    id: ID_DO_CAMPO[campo],
    error: mensagem(campo),
    invalid: invalido(campo),
    onFocus: () => setFocado(campo),
    onBlur: () => {
      setFocado(null);
      setTocados((atual) => ({ ...atual, [campo]: true }));
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTentouEnviar(true);

    const primeiroInvalido = (Object.keys(erros) as Campo[]).find(
      (campo) => erros[campo] !== null,
    );
    if (primeiroInvalido) {
      document.getElementById(ID_DO_CAMPO[primeiroInvalido])?.focus();
      return;
    }

    navigate('/login');
  }

  return (
    <>
      <form
        className={`${formStyles.form} ${formStyles.grid}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <FormField
          {...props('nome')}
          className={formStyles.fullWidth}
          label="Nome completo"
          icon={UserIcon}
          type="text"
          placeholder="Seu nome completo"
          autoComplete="name"
          maxLength={LIMITES.nome}
          required
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <FormField
          {...props('cpf')}
          label="CPF"
          icon={IdCardIcon}
          type="text"
          inputMode="numeric"
          placeholder="000.000.000-00"
          maxLength={14}
          required
          value={cpf}
          onChange={(event) => setCpf(formatarCpf(event.target.value))}
        />

        <FormField
          {...props('dataNascimento')}
          label="Data de nascimento"
          icon={CalendarIcon}
          type="text"
          inputMode="numeric"
          placeholder="dd/mm/aaaa"
          maxLength={10}
          required
          value={dataNascimento}
          onChange={(event) =>
            setDataNascimento(formatarDataBr(event.target.value))
          }
        />

        <FormField
          {...props('email')}
          label="E-mail"
          icon={MailIcon}
          type="email"
          placeholder="Seu e-mail"
          autoComplete="email"
          maxLength={LIMITES.email}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <FormField
          {...props('telefone')}
          label="Telefone (opcional)"
          icon={PhoneIcon}
          type="tel"
          inputMode="tel"
          placeholder="(00) 00000-0000"
          autoComplete="tel"
          maxLength={15}
          value={telefone}
          onChange={(event) =>
            setTelefone(formatarTelefone(event.target.value))
          }
        />

        <PasswordField
          {...props('senha')}
          label="Senha"
          placeholder="Crie uma senha"
          autoComplete="new-password"
          maxLength={LIMITES.senha}
          required
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <PasswordField
          {...props('confirmarSenha')}
          label="Confirmar senha"
          placeholder="Repita a senha"
          autoComplete="new-password"
          maxLength={LIMITES.senha}
          required
          value={confirmarSenha}
          onChange={(event) => setConfirmarSenha(event.target.value)}
        />

        <Button
          type="submit"
          className={`${formStyles.submit} ${formStyles.fullWidth}`}
        >
          Cadastrar
        </Button>
      </form>

      <p className={formStyles.footer}>
        Já tem uma conta?{' '}
        <Link className={formStyles.footerLink} to="/login">
          Faça login
        </Link>
      </p>
    </>
  );
}
