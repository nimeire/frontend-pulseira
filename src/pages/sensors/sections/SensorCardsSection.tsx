import { useState } from 'react';
import { ContentSection } from '../../../components/content-section/ContentSection';
import { SensorCard } from '../../../components/sensor-card/SensorCard';
import { SensorDetailsDialog } from '../../../components/sensor-card/SensorDetailsDialog';
import { sensorDetails } from '../../../data/sensorDetails';
import styles from './SensorCardsSection.module.css';

export function SensorCardsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = sensorDetails.find((sensor) => sensor.id === selectedId);

  return (
    <ContentSection
      titleId="sensor-cards-title"
      title="Os componentes, um a um"
    >
      <ul className={styles.grid}>
        {sensorDetails.map((sensor) => (
          <SensorCard
            key={sensor.id}
            icon={sensor.icon}
            name={sensor.name}
            role={sensor.role}
            summary={sensor.summary}
            image={sensor.image}
            imageAlt={sensor.imageAlt}
            onShowMore={() => setSelectedId(sensor.id)}
          />
        ))}
      </ul>

      {selected && (
        <SensorDetailsDialog
          key={selected.id}
          icon={selected.icon}
          name={selected.name}
          role={selected.role}
          image={selected.image}
          imageAlt={selected.imageAlt}
          whatItDoes={selected.whatItDoes}
          whyItMatters={selected.whyItMatters}
          whatUserNotices={selected.whatUserNotices}
          onClose={() => setSelectedId(null)}
        />
      )}
    </ContentSection>
  );
}
