import { useState, type FormEvent } from 'react';
import { ChecklistField } from '../checklist-field/ChecklistField';
import { useNotificar } from '../../hooks/useNotificar';
import { mensagemDeErro } from '../../services/api';
import { Button } from '../ui/Button';
import {
  alergiasComuns,
  condicoesComuns,
  medicamentosComuns,
  tiposSanguineos,
} from '../../data/opcoesMedicas';
import type { InformacoesMedicas, TipoSanguineo } from '../../types/paciente';
import styles from './InformacoesMedicasForm.module.css';

interface InformacoesMedicasFormProps {
  value: InformacoesMedicas;
  onChange: (value: InformacoesMedicas) => void;
  /** Envia o formulário para a API; se falhar, a mensagem do erro aparece no formulário. */
  onSalvar: () => Promise<void>;
}

export function InformacoesMedicasForm({
  value,
  onChange,
  onSalvar,
}: InformacoesMedicasFormProps) {
  const [salvando, setSalvando] = useState(false);
  const notificar = useNotificar();

  function atualizar(parcial: Partial<InformacoesMedicas>) {
    onChange({ ...value, ...parcial });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSalvando(true);
    try {
      await onSalvar();
      notificar.sucesso('Dados de saúde salvos!');
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ChecklistField
        legend="Tipo sanguíneo"
        name="tipo-sanguineo"
        options={tiposSanguineos}
        value={value.tipoSanguineo ? [value.tipoSanguineo] : []}
        onChange={(next) =>
          atualizar({ tipoSanguineo: (next[0] as TipoSanguineo) ?? null })
        }
        multiple={false}
      />

      <ChecklistField
        legend="Alergias"
        name="alergias"
        options={alergiasComuns}
        value={value.alergias}
        onChange={(next) => atualizar({ alergias: next })}
        hint="Marque quantas quiser."
      />

      <ChecklistField
        legend="Condições de saúde"
        name="condicoes"
        options={condicoesComuns}
        value={value.condicoes}
        onChange={(next) => atualizar({ condicoes: next })}
      />

      <ChecklistField
        legend="Remédios que toma sempre"
        name="medicamentos"
        options={medicamentosComuns}
        value={value.medicamentosUsoContinuo}
        onChange={(next) => atualizar({ medicamentosUsoContinuo: next })}
      />

      <label className={styles.textareaField}>
        <span className={styles.textareaLabel}>Outras informações</span>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="O que mais é importante saber"
          value={value.observacoes}
          onChange={(event) => atualizar({ observacoes: event.target.value })}
        />
      </label>

      <div className={styles.footer}>
        <Button type="submit" disabled={salvando}>
          {salvando ? 'Salvando…' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}
