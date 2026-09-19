import { AlertIcon, DatabaseIcon, MonitorIcon, MotionIcon } from '../components/icons';
import type { StepItem } from '../components/step-list/StepList';

export const passos: StepItem[] = [
  {
    icon: MotionIcon,
    title: 'Acompanhamento contínuo',
    description:
      'A pulseira acompanha a localização e os movimentos do usuário durante a rotina normal do dia a dia.',
  },
  {
    icon: AlertIcon,
    title: 'Identificação de uma possível queda',
    description:
      'Ao identificar um movimento compatível com uma queda, ela envia um alerta automaticamente, sem precisar de nenhuma ação da pessoa.',
    tone: 'alert',
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
      'O responsável acompanha tudo pelo site: localização no mapa, alertas recebidos e histórico de eventos.',
  },
];
