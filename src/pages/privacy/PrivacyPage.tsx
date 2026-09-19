import { PageContainer } from '../../components/layout/PageContainer';
import { BackToTopButton } from '../../components/back-to-top/BackToTopButton';
import { PolicySection } from '../../components/policy-content/PolicySection';
import { SummaryCard } from '../../components/summary-card/SummaryCard';
import { TableOfContents } from '../../components/table-of-contents/TableOfContents';
import {
  AVISO_REVISAO_JURIDICA,
  RESUMO_POLITICA,
  SUBTITULO_POLITICA,
  TITULO_POLITICA,
  ULTIMA_ATUALIZACAO,
  secoesPolitica,
} from '../../data/politicaPrivacidade';
import { useActiveSection } from '../../hooks/useActiveSection';
import { usePageMeta } from '../../hooks/usePageMeta';
import styles from './PrivacyPage.module.css';

const PAGE_TITLE = `${TITULO_POLITICA} — Zelo`;
const PAGE_DESCRIPTION =
  'Saiba quais dados o Zelo coleta, por que, como são protegidos e como exercer seus direitos previstos na LGPD.';

const tocItems = secoesPolitica.map(({ id, titulo }) => ({
  id,
  label: titulo,
}));
const sectionIds = tocItems.map((item) => item.id);

// UTC on both ends so the date never shifts by a day with the visitor's timezone.
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
  timeZone: 'UTC',
});
const updatedAt = new Date(`${ULTIMA_ATUALIZACAO}T00:00:00Z`);

export function PrivacyPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });
  const activeId = useActiveSection(sectionIds);

  return (
    <PageContainer>
      <header className={styles.header}>
        <h1 className={styles.title}>{TITULO_POLITICA}</h1>
        <p className={styles.subtitle}>{SUBTITULO_POLITICA}</p>
        <p className={styles.updated}>
          Última atualização:{' '}
          <time dateTime={ULTIMA_ATUALIZACAO}>
            {dateFormatter.format(updatedAt)}
          </time>
        </p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.aside}>
          <TableOfContents
            items={tocItems}
            activeId={activeId}
            title="Índice"
            ariaLabel="Índice da política de privacidade"
          />
        </aside>

        <article className={styles.article}>
          <SummaryCard
            title="Resumo em linguagem simples"
            points={RESUMO_POLITICA}
          />

          {secoesPolitica.map((secao, index) => (
            <PolicySection key={secao.id} secao={secao} numero={index + 1} />
          ))}

          <p className={styles.disclaimer}>{AVISO_REVISAO_JURIDICA}</p>
        </article>
      </div>

      <BackToTopButton />
    </PageContainer>
  );
}
