import { AlertasPaginados } from '../../../components/alertas-paginados/AlertasPaginados';
import type { StatusAlerta } from '../../../types/alerta';
import styles from './LogSection.module.css';

interface LogSectionProps {
  pessoaId: string;
  versao: number;
  onChangeStatus: (id: string, status: Exclude<StatusAlerta, 'pendente'>) => void;
}

export function LogSection({ pessoaId, versao, onChangeStatus }: LogSectionProps) {
  return (
    <section className={styles.section} aria-label="Alertas">
      <div className={styles.heading}>
        <h2 className={styles.title}>Alertas</h2>
        <p className={styles.subtitle}>
          Das últimas 24 horas. Para ver os mais antigos, use "Mostrar todos".
        </p>
      </div>

      <div className={styles.card}>
        <AlertasPaginados
          key={pessoaId}
          pessoaId={pessoaId}
          versao={versao}
          onAtender={onChangeStatus}
        />
      </div>
    </section>
  );
}
