import {
  AlertIcon,
  BellIcon,
  EyeIcon,
  HeartPulseIcon,
  HistoryIcon,
  LocationPinIcon,
  ShieldIcon,
  WristbandIcon,
  type IconProps,
} from '../components/icons';
import type { FeatureCardTone } from '../components/feature-card/FeatureCard';
import type { ComponentType } from 'react';

export interface Benefit {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  tone?: FeatureCardTone;
}

export const beneficios: Benefit[] = [
  {
    icon: WristbandIcon,
    title: 'Monitoramento contínuo, sem depender do celular',
    description:
      'A pulseira acompanha a rotina o tempo todo, sem exigir que ninguém carregue ou opere um smartphone.',
  },
  {
    icon: AlertIcon,
    title: 'Detecção automática de quedas',
    description:
      'Identifica padrões de movimento compatíveis com uma queda e age sem precisar de nenhuma ação da pessoa.',
    tone: 'success',
  },
  {
    icon: BellIcon,
    title: 'Alertas imediatos para o responsável',
    description:
      'Quem cuida é avisado assim que um possível evento é identificado, sem demora na comunicação.',
  },
  {
    icon: LocationPinIcon,
    title: 'Localização em tempo real no mapa',
    description:
      'A posição atual da pessoa monitorada fica visível a qualquer momento para quem acompanha.',
    tone: 'success',
  },
  {
    icon: HistoryIcon,
    title: 'Histórico de localização e eventos',
    description:
      'É possível consultar deslocamentos e alertas anteriores para entender padrões ao longo do tempo.',
  },
  {
    icon: ShieldIcon,
    title: 'Mais autonomia e segurança',
    description:
      'A pessoa monitorada ganha liberdade para seguir sua rotina, com uma camada extra de segurança discreta.',
    tone: 'success',
  },
  {
    icon: HeartPulseIcon,
    title: 'Tranquilidade para família e cuidadores',
    description:
      'Saber que existe um sistema acompanhando reduz a ansiedade de quem cuida à distância.',
  },
  {
    icon: EyeIcon,
    title: 'Interface acessível',
    description:
      'Textos com bom contraste e leitura facilitada, pensados também para quem tem baixa visão.',
    tone: 'success',
  },
];
