import { SectionHeader } from '../../../components/section-header/SectionHeader';
import { FeatureCard } from '../../../components/feature-card/FeatureCard';
import { beneficios } from '../../../data/beneficios';
import styles from './AboutBenefitsSection.module.css';

export function AboutBenefitsSection() {
  return (
    <section
      id="beneficios"
      className={styles.section}
      aria-labelledby="about-benefits-title"
    >
      <SectionHeader
        id="about-benefits-title"
        title="Benefícios de usar a pulseira"
      />
      <ul className={styles.grid}>
        {beneficios.map((benefit) => (
          <FeatureCard
            key={benefit.title}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            tone={benefit.tone}
          />
        ))}
      </ul>
    </section>
  );
}
