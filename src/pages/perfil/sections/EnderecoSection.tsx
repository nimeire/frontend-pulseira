import { useState, type FormEvent } from 'react';
import { FormField } from '../../../components/form-field/FormField';
import { LocationPinIcon } from '../../../components/icons';
import { Button } from '../../../components/ui/Button';
import { useNotificar } from '../../../hooks/useNotificar';
import { useRecurso } from '../../../hooks/useRecurso';
import { mensagemDeErro } from '../../../services/api';
import { buscarPaciente, salvarEndereco } from '../../../services/zelo';
import { formatarCep } from '../../../utils/mascaras';
import type { Endereco } from '../../../types/paciente';
import { PerfilCard } from '../PerfilCard';
import cardStyles from '../PerfilCard.module.css';
import styles from './EnderecoSection.module.css';

const DESCRICAO = 'Opcional. Seu responsável vê em caso de emergência.';

interface EnderecoSectionProps {
  pessoaId: string;
}

export function EnderecoSection({ pessoaId }: EnderecoSectionProps) {
  const { dados, carregando, erro } = useRecurso(() => buscarPaciente(pessoaId), pessoaId);

  return (
    <PerfilCard titulo="Endereço" descricao={DESCRICAO}>
      {dados ? (
        <EnderecoForm pessoaId={pessoaId} inicial={dados.endereco ?? {}} />
      ) : (
        <p className={cardStyles.descricao}>{carregando ? 'Carregando…' : erro}</p>
      )}
    </PerfilCard>
  );
}

function EnderecoForm({ pessoaId, inicial }: { pessoaId: string; inicial: Endereco }) {
  const notificar = useNotificar();
  const [endereco, setEndereco] = useState<Endereco>(inicial);
  const [ocupado, setOcupado] = useState(false);

  function atualizar(parcial: Partial<Endereco>) {
    setEndereco((atual) => ({ ...atual, ...parcial }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOcupado(true);
    try {
      await salvarEndereco(pessoaId, endereco);
      notificar.sucesso('Endereço salvo!');
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
    } finally {
      setOcupado(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <FormField
          id="end-cep"
          label="CEP"
          icon={LocationPinIcon}
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="00000-000"
          maxLength={9}
          value={formatarCep(endereco.cep ?? '')}
          onChange={(e) => atualizar({ cep: formatarCep(e.target.value) })}
        />
        <FormField
          id="end-logradouro"
          label="Rua"
          icon={LocationPinIcon}
          autoComplete="address-line1"
          maxLength={120}
          className={styles.wide}
          value={endereco.logradouro ?? ''}
          onChange={(e) => atualizar({ logradouro: e.target.value })}
        />
        <FormField
          id="end-numero"
          label="Número"
          icon={LocationPinIcon}
          maxLength={10}
          value={endereco.numero ?? ''}
          onChange={(e) => atualizar({ numero: e.target.value })}
        />
        <FormField
          id="end-complemento"
          label="Complemento"
          icon={LocationPinIcon}
          maxLength={60}
          value={endereco.complemento ?? ''}
          onChange={(e) => atualizar({ complemento: e.target.value })}
        />
        <FormField
          id="end-bairro"
          label="Bairro"
          icon={LocationPinIcon}
          maxLength={60}
          value={endereco.bairro ?? ''}
          onChange={(e) => atualizar({ bairro: e.target.value })}
        />
        <FormField
          id="end-cidade"
          label="Cidade"
          icon={LocationPinIcon}
          autoComplete="address-level2"
          maxLength={60}
          value={endereco.cidade ?? ''}
          onChange={(e) => atualizar({ cidade: e.target.value })}
        />
        <FormField
          id="end-estado"
          label="UF"
          icon={LocationPinIcon}
          autoComplete="address-level1"
          placeholder="SP"
          maxLength={2}
          value={endereco.estado ?? ''}
          onChange={(e) => atualizar({ estado: e.target.value.toUpperCase() })}
        />
      </div>

      <div className={cardStyles.acoes}>
        <Button type="submit" disabled={ocupado}>
          {ocupado ? 'Salvando…' : 'Salvar endereço'}
        </Button>
      </div>
    </form>
  );
}
