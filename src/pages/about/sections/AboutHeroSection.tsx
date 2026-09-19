import { siteConfig } from '../../../data/siteConfig';
import pulseiraLado from '../../../assets/images/pulseira-lado.avif';
import styles from './AboutHeroSection.module.css';

export function AboutHeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{siteConfig.tagline}</p>
        <h1 id="about-hero-title" className={styles.title}>
          Sobre o projeto
        </h1>
        <p className={styles.description}>
          O {siteConfig.name} nasceu para dar mais segurança a quem vive
          sozinho ou passa boa parte do dia sem companhia, sem depender de
          uma ação ativa da pessoa monitorada em um momento de emergência.
        </p>
      </div>
      <div className={styles.media}>
        <img
          className={styles.illustration}
          src={pulseiraLado}
          alt="Pulseira inteligente Zelo, vista de lado"
          width={480}
          height={360}
        />
      </div>
    </section>
  );
}
