import styles from './SensorsHeroSection.module.css';

export function SensorsHeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="sensors-hero-title">
      <p className={styles.eyebrow}>Tecnologia</p>
      <h1 id="sensors-hero-title" className={styles.title}>
        Sensores
      </h1>
      <p className={styles.description}>
        Conheça os componentes que permitem localizar o usuário e
        identificar possíveis quedas: como cada um funciona e por que ele
        importa para o funcionamento do Zelo.
      </p>
    </section>
  );
}
