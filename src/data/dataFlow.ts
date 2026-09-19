import { DatabaseIcon, MonitorIcon, ServerIcon, WristbandIcon } from '../components/icons';
import type { FlowStage } from '../components/flow-diagram/FlowDiagram';

export const dataFlow: FlowStage[] = [
  { icon: WristbandIcon, label: 'Pulseira' },
  { icon: ServerIcon, label: 'API (Spring Boot)' },
  { icon: DatabaseIcon, label: 'Banco de dados (MongoDB)' },
  { icon: MonitorIcon, label: 'Site' },
];
