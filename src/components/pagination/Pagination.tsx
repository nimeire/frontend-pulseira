import { gerarItensPaginacao } from '../../utils/paginacao';
import styles from './Pagination.module.css';

interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
  /** Accessible name of the navigation landmark, e.g. "Paginação das perguntas". */
  ariaLabel: string;
}

export function Pagination({
  paginaAtual,
  totalPaginas,
  onChange,
  ariaLabel,
}: PaginationProps) {
  if (totalPaginas <= 1) {
    return null;
  }

  const isPrimeira = paginaAtual <= 1;
  const isUltima = paginaAtual >= totalPaginas;

  return (
    <nav className={styles.nav} aria-label={ariaLabel}>
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.button}
            disabled={isPrimeira}
            aria-label="Ir para a página anterior"
            onClick={() => onChange(paginaAtual - 1)}
          >
            Anterior
          </button>
        </li>

        {gerarItensPaginacao(paginaAtual, totalPaginas).map((item, index) =>
          item === 'reticencias' ? (
            <li key={`reticencias-${index}`} className={styles.ellipsis}>
              <span aria-hidden="true">…</span>
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={
                  item === paginaAtual
                    ? `${styles.button} ${styles.current}`
                    : styles.button
                }
                aria-label={`Ir para a página ${item}`}
                aria-current={item === paginaAtual ? 'page' : undefined}
                onClick={() => onChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className={styles.button}
            disabled={isUltima}
            aria-label="Ir para a próxima página"
            onClick={() => onChange(paginaAtual + 1)}
          >
            Próxima
          </button>
        </li>
      </ul>

      <p className={styles.summary}>
        Página {paginaAtual} de {totalPaginas}
      </p>
    </nav>
  );
}
