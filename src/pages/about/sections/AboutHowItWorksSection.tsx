import { Link } from 'react-router-dom';
import { SectionHeader } from '../../../components/section-header/SectionHeader';
import { StepList } from '../../../components/step-list/StepList';
import { ArrowRightIcon } from '../../../components/icons';
import { passos } from '../../../data/passos';
import styles from './AboutHowItWorksSection.module.css';

export function AboutHowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className={styles.section}
      aria-labelledby="about-how-it-works-title"
    >
      <SectionHeader id="about-how-it-works-title" title="Como funciona" />
      <StepList steps={passos} />
      <Link className={styles.techLink} to="/sensores">
        Quer saber mais sobre a tecnologia? Conheça os sensores
        <ArrowRightIcon className={styles.techLinkIcon} />
      </Link>
    </section>
  );
}
