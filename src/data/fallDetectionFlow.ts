import {
  AlertIcon,
  CheckCircleIcon,
  LedIcon,
  MotionIcon,
  PanicButtonIcon,
  PulseSpikeIcon,
} from '../components/icons';
import type { FlowStage } from '../components/flow-diagram/FlowDiagram';

export const fallDetectionFlow: FlowStage[] = [
  { icon: MotionIcon, label: 'Movimento normal' },
  { icon: PulseSpikeIcon, label: 'Mudança brusca de aceleração e orientação' },
  { icon: CheckCircleIcon, label: 'Padrão compatível com uma queda' },
  { icon: LedIcon, label: 'LED de alerta acende' },
  { icon: AlertIcon, label: 'Alerta enviado ao responsável' },
];

export const panicButtonFlow: FlowStage[] = [
  { icon: PanicButtonIcon, label: 'Botão de pânico apertado' },
  { icon: LedIcon, label: 'LED de alerta acende' },
  { icon: AlertIcon, label: 'Alerta enviado ao responsável' },
];
