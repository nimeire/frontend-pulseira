import { CallToAction } from '../../../components/call-to-action/CallToAction';
import styles from './AboutCtaSection.module.css';

export function AboutCtaSection() {
  return (
    <section className={styles.section} aria-label="Chamada para ação">
      <CallToAction
        title="Quer entender melhor a tecnologia por trás do Zelo?"
        description="Conheça os sensores que tornam o monitoramento e a detecção de quedas possíveis."
        primaryAction={{ label: 'Conheça os sensores', to: '/sensores' }}
        secondaryLabel="Entrar"
      />
    </section>
  );
}
