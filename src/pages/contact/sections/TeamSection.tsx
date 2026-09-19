import { ContentSection } from '../../../components/content-section/ContentSection';
import { TeamMemberCard } from '../../../components/team-member-card/TeamMemberCard';
import { backendCreators, otherCreators } from '../../../data/footerData';
import styles from './TeamSection.module.css';

// Backend first so the 3-over-2 grid puts them on the top row.
const orderedCreators = [...backendCreators, ...otherCreators];

export function TeamSection() {
  return (
    <ContentSection
      titleId="team-title"
      title="Desenvolvedores"
      titleAlign="center"
      isLast
    >
      <ul className={styles.grid}>
        {orderedCreators.map((creator) => (
          <TeamMemberCard key={creator.githubUrl} {...creator} />
        ))}
      </ul>
    </ContentSection>
  );
}
