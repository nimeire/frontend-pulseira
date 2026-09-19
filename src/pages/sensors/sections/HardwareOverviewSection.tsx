import { SectionHeader } from '../../../components/section-header/SectionHeader';
import styles from './TextSection.module.css';

export function HardwareOverviewSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="hardware-overview-title"
    >
      <SectionHeader
        id="hardware-overview-title"
        title="Visão geral do hardware"
      />
      <p className={styles.body}>
        A pulseira reúne três componentes que trabalham em conjunto: o
        módulo GPS obtém a localização, o acelerômetro e giroscópio medem
        o movimento, e o ESP32 — a unidade de controle — lê os dados dos
        dois, processa essas informações e as envia para o sistema Zelo
        por conexão de rede.
      </p>
    </section>
  );
}
