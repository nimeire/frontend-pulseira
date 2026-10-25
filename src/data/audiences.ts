import {
  HeartPulseIcon,
  BellIcon,
  ShieldIcon,
  WristbandIcon,
  type IconComponent,
} from '../components/icons';

export interface TargetGroup {
  icon: IconComponent;
  label: string;
}

export const targetGroups: TargetGroup[] = [
  { icon: HeartPulseIcon, label: 'Idosos' },
  { icon: ShieldIcon, label: 'Pessoas com mobilidade reduzida' },
  {
    icon: BellIcon,
    label: 'Profissionais que atuam em locais isolados',
  },
];

export interface ProfileCard {
  icon: IconComponent;
  title: string;
  description: string;
}

export const profiles: ProfileCard[] = [
  {
    icon: WristbandIcon,
    title: 'Usuário monitorado',
    description:
      'Usa a pulseira no dia a dia. Os movimentos são acompanhados automaticamente e, em uma emergência, basta apertar o botão de pânico.',
  },
  {
    icon: HeartPulseIcon,
    title: 'Responsável (familiar, cuidador ou profissional de saúde)',
    description:
      'Acompanha pelo site: recebe os alertas de queda e de pânico e consulta o histórico de eventos de quem está sendo monitorado.',
  },
];
