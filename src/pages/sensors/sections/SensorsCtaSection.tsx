import { CallToAction } from '../../../components/call-to-action/CallToAction';
import styles from './SensorsCtaSection.module.css';

export function SensorsCtaSection() {
  return (
    <section className={styles.section} aria-label="Chamada para ação">
      <CallToAction
        title="Quer entender o projeto como um todo?"
        description="Volte para a página Sobre o projeto e veja como tudo se conecta."
        primaryAction={{ label: 'Sobre o projeto', to: '/sobre' }}
        secondaryLabel="Entrar"
      />
    </section>
  );
}
