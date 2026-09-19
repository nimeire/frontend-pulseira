import type { SecaoPolitica } from '../../types/politica';
import { PolicyBlocks } from './PolicyBlocks';
import styles from './PolicyContent.module.css';

interface PolicySectionProps {
  secao: SecaoPolitica;
  numero: number;
}

export function PolicySection({ secao, numero }: PolicySectionProps) {
  const titleId = `${secao.id}-titulo`;

  return (
    <section id={secao.id} className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {numero}. {secao.titulo}
      </h2>
      <PolicyBlocks blocos={secao.conteudo} />
    </section>
  );
}
