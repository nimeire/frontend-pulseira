import { ChipIcon, LocationPinIcon, MotionIcon, type IconProps } from '../components/icons';
import type { ComponentType } from 'react';
import esp32Image from '../assets/images/hardware/ESP32.avif';
import gpsImage from '../assets/images/hardware/GPS-NEO-6M.avif';
import mpu6050Image from '../assets/images/hardware/MPU6050.avif';

export interface SensorDetail {
  id: string;
  icon: ComponentType<IconProps>;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  whatItDoes: string;
  whyItMatters: string;
  whatUserNotices: string;
}

export const sensorDetails: SensorDetail[] = [
  {
    id: 'esp32',
    icon: ChipIcon,
    name: 'ESP32',
    role: 'Unidade de controle',
    image: esp32Image,
    imageAlt:
      'Módulo ESP32-WROOM-32, o microcontrolador que funciona como unidade de controle da pulseira',
    whatItDoes:
      'É o microcontrolador da pulseira: lê continuamente os dados do GPS e do acelerômetro/giroscópio e decide o que fazer com eles.',
    whyItMatters:
      'Sem ele, os outros dois componentes não conversam entre si nem chegam a lugar nenhum — é quem processa as leituras e envia tudo ao servidor por conexão de rede.',
    whatUserNotices:
      'Na prática, é invisível: o usuário só percebe o resultado do seu trabalho, que são as atualizações de localização e os alertas chegando no site.',
  },
  {
    id: 'gps',
    icon: LocationPinIcon,
    name: 'GPS NEO-6M',
    role: 'Localização',
    image: gpsImage,
    imageAlt:
      'Módulo GPS NEO-6M: placa azul com o chip de posicionamento e um cabo de antena',
    whatItDoes:
      'Capta sinais de satélite e calcula as coordenadas geográficas onde a pulseira está no momento.',
    whyItMatters:
      'É a base de toda a funcionalidade de localização do Zelo — sem coordenadas, não há ponto no mapa nem histórico de deslocamento.',
    whatUserNotices:
      'O responsável vê a posição do usuário atualizada no mapa do site, praticamente em tempo real.',
  },
  {
    id: 'mpu6050',
    icon: MotionIcon,
    name: 'MPU6050',
    role: 'Movimento',
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
];
