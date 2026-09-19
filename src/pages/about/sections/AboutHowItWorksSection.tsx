import { Link } from 'react-router-dom';
import { ContentSection } from '../../../components/content-section/ContentSection';
import { StepList } from '../../../components/step-list/StepList';
import { ArrowRightIcon } from '../../../components/icons';
import { passos } from '../../../data/passos';
import styles from './AboutHowItWorksSection.module.css';

export function AboutHowItWorksSection() {
  return (
    <ContentSection
      id="como-funciona"
      titleId="about-how-it-works-title"
      title="Como funciona"
    >
      <StepList steps={passos} />
      <Link className={styles.techLink} to="/sensores">
        Quer saber mais sobre a tecnologia? Conheça os sensores
        <ArrowRightIcon className={styles.techLinkIcon} />
      </Link>
    </ContentSection>
  );
}
