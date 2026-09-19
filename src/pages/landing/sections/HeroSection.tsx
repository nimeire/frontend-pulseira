import { heroContent } from '../../../data/landingContent';
import { LinkButton } from '../../../components/ui/LinkButton';
import pulseiraFrente from '../../../assets/images/pulseira-frente.avif';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{heroContent.eyebrow}</p>
        <h1 id="hero-title" className={styles.title}>
          {heroContent.title}
        </h1>
        <p className={styles.description}>{heroContent.description}</p>
        <div className={styles.actions}>
          <LinkButton to="/sobre" variant="primary">
            Conheça o projeto
          </LinkButton>
          <LinkButton to="/sensores" variant="secondary">
            Ver os sensores
          </LinkButton>
        </div>
      </div>
      <div className={styles.media}>
        <img
          className={styles.illustration}
          src={pulseiraFrente}
          alt="Pulseira inteligente Zelo, vista de frente"
          width={480}
          height={360}
        />
      </div>
    </section>
  );
}
