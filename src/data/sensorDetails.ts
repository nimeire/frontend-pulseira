import {
  BatteryIcon,
  ChipIcon,
  LedIcon,
  MotionIcon,
  PanicButtonIcon,
  type IconComponent,
} from '../components/icons';
// TODO: trocar pela foto do ESP-12E quando houver (por ora, a do ESP32).
import espImage from '../assets/images/hardware/ESP32.avif';
import mpu6050Image from '../assets/images/hardware/MPU6050.avif';

export interface SensorDetail {
  id: string;
  icon: IconComponent;
  name: string;
  role: string;
  /** Frase curta exibida no card; o texto completo aparece no pop-up. */
  summary: string;
  image?: string;
  imageAlt?: string;
  whatItDoes: string;
  whyItMatters: string;
  whatUserNotices: string;
}

export const sensorDetails: SensorDetail[] = [
  {
    id: 'esp12e',
    icon: ChipIcon,
    name: 'ESP-12E',
    role: 'Unidade de controle',
    summary: 'O cérebro da pulseira: lê os sensores e envia os alertas.',
    image: espImage,
    imageAlt:
      'Módulo ESP, o microcontrolador que funciona como unidade de controle da pulseira (foto ilustrativa)',
    whatItDoes:
      'É o microcontrolador da pulseira: lê o sensor de movimento e o botão de pânico, acende os LEDs e decide quando um alerta precisa ser enviado.',
    whyItMatters:
      'Sem ele, os outros componentes não conversam entre si nem chegam ao sistema — é quem processa as leituras e envia os alertas ao servidor por conexão Wi-Fi.',
    whatUserNotices:
      'Na prática, é invisível: o usuário só percebe o resultado do seu trabalho, que são os LEDs e os alertas chegando ao responsável.',
  },
  {
    id: 'mpu6050',
    icon: MotionIcon,
    name: 'MPU6050',
    role: 'Detecção de quedas',
    summary: 'Mede o movimento para reconhecer uma possível queda.',
    image: mpu6050Image,
    imageAlt:
      'Módulo MPU6050: placa azul com o sensor de acelerômetro e giroscópio',
    whatItDoes:
      'Combina acelerômetro e giroscópio para medir aceleração e rotação em três eixos, várias vezes por segundo.',
    whyItMatters:
      'Mudanças bruscas nesses valores são o que permite reconhecer um padrão de movimento compatível com uma queda.',
    whatUserNotices:
      'Quando um padrão desse tipo é identificado, o responsável recebe um alerta automático — sem que o usuário precise fazer nada.',
  },
  {
    id: 'botao',
    icon: PanicButtonIcon,
    name: 'Botão de pânico',
    role: 'Pedido de ajuda',
    summary: 'Um toque para avisar o responsável em qualquer emergência.',
    whatItDoes:
      'É um botão físico na pulseira. Quando apertado, envia um alerta ao responsável, mesmo sem nenhuma queda.',
    whyItMatters:
      'Nem toda emergência é uma queda: um mal-estar ou uma situação de risco também podem exigir ajuda, e o botão dá à pessoa uma forma direta de pedi-la.',
    whatUserNotices:
      'Ao apertar o botão, o LED de alerta acende e o responsável é avisado.',
  },
  {
    id: 'leds',
    icon: LedIcon,
    name: 'LEDs indicadores',
    role: 'Sinalização',
    summary: 'Um mostra que a pulseira está pronta; o outro, que um alerta foi disparado.',
    whatItDoes:
      'São dois LEDs: um indica que a pulseira está ligada e configurada; o outro acende quando uma queda é detectada ou o botão de pânico é apertado.',
    whyItMatters:
      'Mostram à pessoa o estado da pulseira sem precisar de tela ou celular — e confirmam que o alerta foi disparado.',
    whatUserNotices:
      'LED de status aceso: a pulseira está pronta. LED de alerta aceso: um alerta foi disparado.',
  },
  {
    id: 'energia',
    icon: BatteryIcon,
    name: 'Alimentação',
    role: 'Energia',
    summary: 'Powerbank no protótipo e bateria no produto final.',
    whatItDoes:
      'No protótipo, a pulseira é alimentada por um powerbank. No produto final, seria alimentada por uma bateria própria.',
    whyItMatters:
      'A energia limita a autonomia e o tamanho do dispositivo, por isso a bateria definitiva ainda será dimensionada.',
    whatUserNotices:
      'No protótipo, o powerbank faz a pulseira ficar maior do que será no produto real.',
  },
];
