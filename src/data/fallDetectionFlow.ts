import { AlertIcon, CheckCircleIcon, MotionIcon, PulseSpikeIcon } from '../components/icons';
import type { FlowStage } from '../components/flow-diagram/FlowDiagram';

export const fallDetectionFlow: FlowStage[] = [
  { icon: MotionIcon, label: 'Movimento normal' },
  { icon: PulseSpikeIcon, label: 'Mudança brusca de aceleração e orientação' },
  { icon: CheckCircleIcon, label: 'Padrão compatível com uma queda' },
  { icon: AlertIcon, label: 'Alerta enviado', tone: 'alert' },
];
