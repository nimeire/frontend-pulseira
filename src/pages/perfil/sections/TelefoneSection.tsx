import { useState, type FormEvent } from 'react';
import { FormField } from '../../../components/form-field/FormField';
import { PhoneIcon } from '../../../components/icons';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useNotificar } from '../../../hooks/useNotificar';
import { mensagemDeErro } from '../../../services/api';
import { trocarTelefone } from '../../../services/zelo';
import { formatarTelefone } from '../../../utils/mascaras';
import { validarTelefone } from '../../../utils/validacoes';
import { PerfilCard } from '../PerfilCard';
import styles from '../PerfilCard.module.css';

export function TelefoneSection() {
  const { conta, atualizarConta } = useAuth();
  const notificar = useNotificar();
  const [telefone, setTelefone] = useState(() => formatarTelefone(conta?.telefone ?? ''));
  const [erroCampo, setErroCampo] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const problema = validarTelefone(telefone);
    if (problema) {
      setErroCampo(problema);
      return;
    }

    setOcupado(true);
    try {
      atualizarConta(await trocarTelefone(telefone));
      notificar.sucesso(telefone ? 'Telefone atualizado!' : 'Telefone removido.');
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
    } finally {
      setOcupado(false);
    }
  }

  return (
    <PerfilCard titulo="Telefone" descricao="Deixe vazio para remover.">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField
          id="perfil-telefone"
          label="Telefone"
          icon={PhoneIcon}
          type="tel"
          inputMode="tel"
          placeholder="(00) 00000-0000"
          autoComplete="tel"
          maxLength={15}
          error={erroCampo}
          value={telefone}
          onChange={(event) => {
            setErroCampo(null);
            setTelefone(formatarTelefone(event.target.value));
          }}
        />
        <div className={styles.acoes}>
          <Button type="submit" disabled={ocupado}>
            {ocupado ? 'Salvando…' : 'Salvar telefone'}
          </Button>
        </div>
      </form>
    </PerfilCard>
  );
}
