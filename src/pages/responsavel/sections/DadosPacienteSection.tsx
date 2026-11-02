import { Avatar } from '../../../components/avatar/Avatar';
import { StatusBadge } from '../../../components/status-badge/StatusBadge';
import { InformacoesMedicasView } from '../../../components/informacoes-medicas-view/InformacoesMedicasView';
import { calcularIdade } from '../../../utils/idade';
import { formatarEndereco } from '../../../utils/endereco';
import type { Paciente } from '../../../types/paciente';
import styles from './DadosPacienteSection.module.css';

interface DadosPacienteSectionProps {
  paciente: Paciente;
}

export function DadosPacienteSection({ paciente }: DadosPacienteSectionProps) {
  const idade = calcularIdade(paciente.dataNascimento);
  const endereco = formatarEndereco(paciente.endereco);

  return (
    <section className={styles.section} aria-label="Dados do paciente">
      <h2 className={styles.title}>Dados do paciente</h2>

      <div className={styles.card}>
        <div className={styles.profile}>
          <Avatar
            name={paciente.nome}
            photoUrl={paciente.fotoUrl ?? undefined}
            alt=""
            size={56}
          />
          <div>
            <p className={styles.name}>{paciente.nome}</p>
            <StatusBadge ativo={paciente.ativo} />
            <p className={styles.meta}>
              {[`${idade} anos`, paciente.telefone].filter(Boolean).join(' · ')}
            </p>
            {endereco && <p className={styles.meta}>{endereco}</p>}
          </div>
        </div>

        <hr className={styles.divider} />

        <InformacoesMedicasView
          informacoesMedicas={paciente.informacoesMedicas}
        />
      </div>
    </section>
  );
}
