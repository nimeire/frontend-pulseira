import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { BlocoPolitica } from '../../types/politica';
import { PlaceholderText } from './PlaceholderText';
import styles from './PolicyContent.module.css';

function renderBloco(bloco: BlocoPolitica): ReactNode {
  switch (bloco.tipo) {
    case 'paragrafo':
      return (
        <p className={styles.paragraph}>
          <PlaceholderText texto={bloco.texto} />
        </p>
      );
    case 'subtitulo':
      return (
        <h3 className={styles.subtitle}>
          <PlaceholderText texto={bloco.texto} />
        </h3>
      );
    case 'lista':
      return (
        <ul className={styles.list}>
          {bloco.itens.map((item) => (
            <li key={item}>
              <PlaceholderText texto={item} />
            </li>
          ))}
        </ul>
      );
    case 'glossario':
      return (
        <dl className={styles.glossary}>
          {bloco.itens.map((item) => (
            <div key={item.termo} className={styles.glossaryItem}>
              <dt>{item.termo}</dt>
              <dd>{item.definicao}</dd>
            </div>
          ))}
        </dl>
      );
    case 'destaque':
      return (
        <p className={styles.callout}>
          <PlaceholderText texto={bloco.texto} />
        </p>
      );
    case 'link':
      return (
        <p className={styles.paragraph}>
          <Link className={styles.link} to={bloco.para}>
            {bloco.texto}
          </Link>
        </p>
      );
    default: {
      const exhaustive: never = bloco;
      return exhaustive;
    }
  }
}

interface PolicyBlocksProps {
  blocos: readonly BlocoPolitica[];
}

export function PolicyBlocks({ blocos }: PolicyBlocksProps) {
  return (
    <>
      {blocos.map((bloco, index) => (
        <div key={`${bloco.tipo}-${index}`} className={styles.block}>
          {renderBloco(bloco)}
        </div>
      ))}
    </>
  );
}
