import { Button } from '../ui/Button';
import { Notice } from '../notice/Notice';
import styles from './PainelEstado.module.css';

interface PainelEstadoProps {
  carregando: boolean;
  erro: string | null;
  onTentarDeNovo: () => void;
}

/** Tela de espera/erro das dashboards enquanto os dados da API não chegaram. */
export function PainelEstado({
  carregando,
  erro,
  onTentarDeNovo,
}: PainelEstadoProps) {
  if (carregando) {
    return (
      <p className={styles.carregando} role="status">
        Carregando…
      </p>
    );
  }

  return (
    <div className={styles.erro}>
      <Notice>{erro ?? 'Não foi possível carregar os dados.'}</Notice>
      <Button onClick={onTentarDeNovo}>Tentar de novo</Button>
    </div>
  );
}
