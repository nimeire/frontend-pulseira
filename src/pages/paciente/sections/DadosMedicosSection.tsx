import { InformacoesMedicasForm } from '../../../components/informacoes-medicas-form/InformacoesMedicasForm';
import type { InformacoesMedicas } from '../../../types/paciente';
import styles from './DadosMedicosSection.module.css';

interface DadosMedicosSectionProps {
  informacoesMedicas: InformacoesMedicas;
  onChange: (value: InformacoesMedicas) => void;
  onSalvar: () => Promise<void>;
}

export function DadosMedicosSection({
  informacoesMedicas,
  onChange,
  onSalvar,
}: DadosMedicosSectionProps) {
  return (
    <section className={styles.section} aria-label="Dados médicos">
      <div className={styles.heading}>
        <h2 className={styles.title}>Dados de saúde</h2>
        <p className={styles.subtitle}>
          Seu responsável vê isso em caso de emergência.
        </p>
      </div>

      <div className={styles.card}>
        <InformacoesMedicasForm
          value={informacoesMedicas}
          onChange={onChange}
          onSalvar={onSalvar}
        />
      </div>
    </section>
  );
}
