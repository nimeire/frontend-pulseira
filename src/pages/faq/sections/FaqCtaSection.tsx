import { CallToAction } from '../../../components/call-to-action/CallToAction';
import styles from './FaqCtaSection.module.css';

export function FaqCtaSection() {
  return (
    <section className={styles.section} aria-label="Fale com a equipe">
      <CallToAction
        title="Não encontrou o que procurava?"
        description="Fale com a equipe que desenvolveu o Zelo pela página de contato."
        primaryAction={{ label: 'Ir para o contato', to: '/contato' }}
      />
    </section>
  );
}
