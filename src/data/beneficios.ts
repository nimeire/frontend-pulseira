import {
  AlertIcon,
  BellIcon,
  EyeIcon,
  HeartPulseIcon,
  HistoryIcon,
  PanicButtonIcon,
  ShieldIcon,
  WristbandIcon,
  type IconComponent,
} from '../components/icons';
import type { FeatureCardTone } from '../components/feature-card/FeatureCard';

export interface Benefit {
  icon: IconComponent;
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
    title: 'Detecção automática de possíveis quedas',
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
    icon: PanicButtonIcon,
    title: 'Botão de pânico',
    description:
      'Em qualquer situação de risco, a pessoa pode apertar o botão da pulseira e avisar o responsável na hora.',
    tone: 'success',
  },
  {
    icon: HistoryIcon,
    title: 'Histórico de alertas e eventos',
    description:
      'É possível consultar os alertas e eventos anteriores para entender padrões ao longo do tempo.',
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
