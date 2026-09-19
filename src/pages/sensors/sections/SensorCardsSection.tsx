import { SectionHeader } from '../../../components/section-header/SectionHeader';
import { SensorCard } from '../../../components/sensor-card/SensorCard';
import { sensorDetails } from '../../../data/sensorDetails';
import styles from './SensorCardsSection.module.css';

export function SensorCardsSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="sensor-cards-title"
    >
      <SectionHeader id="sensor-cards-title" title="Os componentes, um a um" />
      <ul className={styles.grid}>
        {sensorDetails.map((sensor) => (
          <SensorCard
            key={sensor.id}
            icon={sensor.icon}
            name={sensor.name}
            role={sensor.role}
            image={sensor.image}
            imageAlt={sensor.imageAlt}
            whatItDoes={sensor.whatItDoes}
            whyItMatters={sensor.whyItMatters}
            whatUserNotices={sensor.whatUserNotices}
          />
        ))}
      </ul>
    </section>
  );
}
