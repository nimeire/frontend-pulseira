import { useEffect, useRef, useState } from 'react';
import { Accordion, type AccordionItem } from '../../../components/accordion/Accordion';
import { Pagination } from '../../../components/pagination/Pagination';
import { PERGUNTAS_POR_PAGINA, type FaqItem } from '../../../data/faq';
import { usePaginacao } from '../../../hooks/usePaginacao';
import { getScrollBehavior } from '../../../utils/scroll';
import styles from './FaqListSection.module.css';

interface FaqListSectionProps {
  perguntas: readonly FaqItem[];
}

interface ItemAberto {
  pagina: number;
  id: string;
}

function toAccordionItem(item: FaqItem): AccordionItem {
  return {
    id: String(item.id),
    titulo: item.pergunta,
    conteudo: <p>{item.resposta}</p>,
  };
}

export function FaqListSection({ perguntas }: FaqListSectionProps) {
  const {
    itensDaPagina,
    paginaAtual,
    totalPaginas,
    total,
    primeiroItem,
    ultimoItem,
    irParaPagina,
  } = usePaginacao(perguntas, PERGUNTAS_POR_PAGINA);

  // An open item only counts on the page it was opened on, so changing page
  // (buttons, back/forward, edited URL) always starts with everything closed.
  const [aberto, setAberto] = useState<ItemAberto | null>(null);
  const abertoId = aberto?.pagina === paginaAtual ? aberto.id : null;

  const listaRef = useRef<HTMLDivElement>(null);
  const paginaAnterior = useRef(paginaAtual);

  useEffect(() => {
    if (paginaAnterior.current === paginaAtual) {
      return;
    }
    paginaAnterior.current = paginaAtual;
    setAberto(null);

    const lista = listaRef.current;
    lista?.focus({ preventScroll: true });
    lista?.scrollIntoView({ block: 'start', behavior: getScrollBehavior() });
  }, [paginaAtual]);

  const handleToggle = (id: string) => {
    setAberto(abertoId === id ? null : { pagina: paginaAtual, id });
  };

  if (total === 0) {
    return (
      <section className={styles.section} aria-label="Perguntas frequentes">
        <p className={styles.empty}>
          Ainda não há perguntas por aqui. Volte em breve ou fale com a nossa
          equipe pela página de contato.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label="Perguntas frequentes">
      <div ref={listaRef} tabIndex={-1} className={styles.list}>
        <Accordion
          items={itensDaPagina.map(toAccordionItem)}
          abertoId={abertoId}
          onToggle={handleToggle}
        />
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        Mostrando perguntas {primeiroItem} a {ultimoItem} de {total}
      </p>

      <Pagination
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onChange={irParaPagina}
        ariaLabel="Paginação das perguntas frequentes"
      />
    </section>
  );
}
