import { siteConfig } from '../../../data/siteConfig';
import { SectionHeader } from '../../../components/section-header/SectionHeader';
import styles from './TextSection.module.css';

export function ProblemSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="problem-title"
    >
      <SectionHeader id="problem-title" title="O problema que resolvemos" />
      <p className={styles.body}>
        Quedas acontecem de forma inesperada e, quando a pessoa está
        sozinha, pode demorar até que alguém perceba e chegue para ajudar.
        Compartilhar a localização pelo celular depende de uma ação ativa
        do usuário — e numa emergência, ele pode simplesmente não conseguir
        fazer isso. O {siteConfig.name} elimina essa dependência: o alerta
        parte da própria pulseira, automaticamente.
      </p>
    </section>
  );
}
