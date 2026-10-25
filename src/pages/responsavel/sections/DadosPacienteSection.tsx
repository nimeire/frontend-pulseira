import { Avatar } from '../../../components/avatar/Avatar';
import { InformacoesMedicasView } from '../../../components/informacoes-medicas-view/InformacoesMedicasView';
import { calcularIdade } from '../../../utils/idade';
import type { Paciente } from '../../../types/paciente';
import styles from './DadosPacienteSection.module.css';

interface DadosPacienteSectionProps {
  paciente: Paciente;
}

export function DadosPacienteSection({ paciente }: DadosPacienteSectionProps) {
  const idade = calcularIdade(paciente.dataNascimento);

  return (
    <section className={styles.section} aria-label="Dados do paciente">
      <h2 className={styles.title}>Dados do paciente</h2>

      <div className={styles.card}>
        <div className={styles.profile}>
          <Avatar name={paciente.nome} size={56} />
          <div>
            <p className={styles.name}>{paciente.nome}</p>
            <p className={styles.meta}>
              {idade} anos · {paciente.telefone}
            </p>
            <p className={styles.meta}>
              {paciente.endereco.logradouro}, {paciente.endereco.numero} —{' '}
              {paciente.endereco.bairro}, {paciente.endereco.cidade} -{' '}
              {paciente.endereco.estado}
            </p>
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
