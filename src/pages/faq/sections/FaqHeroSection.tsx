import styles from './FaqHeroSection.module.css';

export function FaqHeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="faq-hero-title">
      <h1 id="faq-hero-title" className={styles.title}>
        Perguntas frequentes
      </h1>
      <p className={styles.description}>Tire suas dúvidas sobre o Zelo</p>
    </section>
  );
}
