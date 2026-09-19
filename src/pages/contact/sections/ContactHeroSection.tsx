import styles from './ContactHeroSection.module.css';

export function ContactHeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="contact-hero-title">
      <p className={styles.eyebrow}>Fale com a gente</p>
      <h1 id="contact-hero-title" className={styles.title}>
        Contato
      </h1>
      <p className={styles.description}>
        Este é um projeto acadêmico interdisciplinar da FATEC Praia Grande.
        Ficou com dúvidas, sugestões ou quer conversar sobre o Zelo? Fale
        diretamente com quem desenvolveu.
      </p>
    </section>
  );
}
