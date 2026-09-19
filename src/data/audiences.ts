import {
  HeartPulseIcon,
  LocationPinIcon,
  ShieldIcon,
  WristbandIcon,
  type IconProps,
} from '../components/icons';
import type { ComponentType } from 'react';

export interface TargetGroup {
  icon: ComponentType<IconProps>;
  label: string;
}

export const targetGroups: TargetGroup[] = [
  { icon: HeartPulseIcon, label: 'Idosos' },
  { icon: ShieldIcon, label: 'Pessoas com mobilidade reduzida' },
  {
    icon: LocationPinIcon,
    label: 'Profissionais que atuam em locais isolados',
  },
];

export interface ProfileCard {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export const profiles: ProfileCard[] = [
  {
    icon: WristbandIcon,
    title: 'Usuário monitorado',
    description:
      'Usa a pulseira no dia a dia. Não precisa fazer nada além de segui-la usando — a localização e os movimentos são acompanhados automaticamente.',
  },
  {
    icon: HeartPulseIcon,
    title: 'Responsável (familiar, cuidador ou profissional de saúde)',
    description:
      'Acompanha pelo site: vê a localização no mapa, recebe alertas e consulta o histórico de eventos de quem está sendo monitorado.',
  },
];
