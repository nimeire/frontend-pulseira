import { AlertIcon, DatabaseIcon, MonitorIcon, MotionIcon } from '../components/icons';
import type { StepItem } from '../components/step-list/StepList';

export const passos: StepItem[] = [
  {
    icon: MotionIcon,
    title: 'Acompanhamento contínuo',
    description:
      'A pulseira acompanha os movimentos do usuário durante a rotina normal do dia a dia.',
  },
  {
    icon: AlertIcon,
    title: 'Queda detectada ou botão de pânico',
    description:
      'Ao identificar um movimento compatível com uma queda — ou quando o botão de pânico é apertado — a pulseira envia um alerta automaticamente.',
  },
  {
    icon: DatabaseIcon,
    title: 'Processamento seguro dos dados',
    description:
      'Os dados chegam ao sistema Zelo, que os processa e guarda com segurança.',
  },
  {
    icon: MonitorIcon,
    title: 'Acompanhamento pelo responsável',
    description:
      'O responsável recebe o alerta e acompanha tudo pelo site: alertas recebidos e histórico de eventos.',
  },
];
