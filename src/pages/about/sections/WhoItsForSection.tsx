import { ContentSection } from '../../../components/content-section/ContentSection';
import { FeatureCard } from '../../../components/feature-card/FeatureCard';
import { profiles, targetGroups } from '../../../data/audiences';
import styles from './WhoItsForSection.module.css';

export function WhoItsForSection() {
  return (
    <ContentSection titleId="who-its-for-title" title="Para quem é">
      <ul className={styles.tags}>
        {targetGroups.map((group) => {
          const Icon = group.icon;
          return (
            <li key={group.label} className={styles.tag}>
              <Icon className={styles.tagIcon} />
              {group.label}
            </li>
          );
        })}
      </ul>

      <ul className={styles.profiles}>
        {profiles.map((profile) => (
          <FeatureCard
            key={profile.title}
            icon={profile.icon}
            title={profile.title}
            description={profile.description}
            tone="success"
          />
        ))}
      </ul>
    </ContentSection>
  );
}
