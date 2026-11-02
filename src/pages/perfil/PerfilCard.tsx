import { useId, type ReactNode } from 'react';
import styles from './PerfilCard.module.css';

interface PerfilCardProps {
  titulo: string;
  descricao?: string;
  children: ReactNode;
}

export function PerfilCard({ titulo, descricao, children }: PerfilCardProps) {
  const tituloId = useId();

  return (
    <section className={styles.card} aria-labelledby={tituloId}>
      <div className={styles.cabecalho}>
        <h2 id={tituloId} className={styles.titulo}>
          {titulo}
        </h2>
        {descricao && <p className={styles.descricao}>{descricao}</p>}
      </div>
      {children}
    </section>
  );
}
