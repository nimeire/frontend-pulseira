import { SectionHeader } from '../../../components/section-header/SectionHeader';
import { TeamMemberCard } from '../../../components/team-member-card/TeamMemberCard';
import { backendCreators, otherCreators } from '../../../data/footerData';
import styles from './TeamSection.module.css';

// Backend first so the 3-over-2 grid puts them on the top row.
const orderedCreators = [...backendCreators, ...otherCreators];

export function TeamSection() {
  return (
    <section className={styles.section} aria-labelledby="team-title">
      <SectionHeader id="team-title" title="Desenvolvedores" align="center" />
      <ul className={styles.grid}>
        {orderedCreators.map((creator) => (
          <TeamMemberCard key={creator.githubUrl} {...creator} />
        ))}
      </ul>
    </section>
  );
}
