import { siteConfig } from '../../../data/siteConfig';
import { SectionHeader } from '../../../components/section-header/SectionHeader';
import styles from './TextSection.module.css';

export function WhatIsZeloSection() {
  return (
    <section
      id="o-que-e"
      className={styles.section}
      aria-labelledby="what-is-zelo-title"
    >
      <SectionHeader id="what-is-zelo-title" title={`O que é o ${siteConfig.name}`} />
      <p className={styles.body}>
        O {siteConfig.name} é uma pulseira inteligente que acompanha a
        localização de uma pessoa e identifica possíveis quedas
        automaticamente. Quando algo assim acontece, um alerta é enviado
        para quem cuida dela — sem a pessoa precisar pegar o celular ou
        pedir ajuda.
      </p>
    </section>
  );
}
