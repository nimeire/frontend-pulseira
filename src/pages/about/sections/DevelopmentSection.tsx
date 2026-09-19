import { siteConfig } from '../../../data/siteConfig';
import { SectionHeader } from '../../../components/section-header/SectionHeader';
import textStyles from './TextSection.module.css';
import styles from './DevelopmentSection.module.css';

export function DevelopmentSection() {
  return (
    <section
      className={textStyles.section}
      aria-labelledby="development-title"
    >
      <SectionHeader id="development-title" title="Sobre o desenvolvimento" />
      <p className={textStyles.body}>
        O {siteConfig.name} é uma prova de conceito desenvolvida como
        projeto interdisciplinar do curso de Desenvolvimento de Software
        Multiplataforma da FATEC Praia Grande, integrando hardware,
        back-end, banco de dados e front-end.
      </p>
      <p className={styles.notice}>
        Este projeto é um protótipo acadêmico e não é um equipamento
        médico certificado. Ele não substitui supervisão profissional nem
        cuidados de saúde formais.
      </p>
    </section>
  );
}
