import { classNames } from '../../utils/classNames';
import styles from './StatusBadge.module.css';

/** Selo "Conta ativa / Conta inativa" ao lado de uma pessoa conectada. */
export function StatusBadge({ ativo }: { ativo: boolean }) {
  return (
    <span className={classNames(styles.badge, ativo ? styles.ativo : styles.inativo)}>
      {ativo ? 'Conta ativa' : 'Conta inativa'}
    </span>
  );
}
