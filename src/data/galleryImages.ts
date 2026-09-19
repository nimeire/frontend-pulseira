import pulseiraFrente from '../assets/images/pulseira-frente.avif';
import pulseiraLado from '../assets/images/pulseira-lado.avif';
import pulseiraTras from '../assets/images/pulseira-tras.avif';
import type { GalleryImage } from '../components/image-gallery/ImageGallery';

export const galleryImages: GalleryImage[] = [
  {
    src: pulseiraFrente,
    alt: 'Pulseira inteligente Zelo vista de frente, com o ícone de localização em destaque',
    caption: 'Vista frontal',
    width: 480,
    height: 360,
  },
  {
    src: pulseiraLado,
    alt: 'Pulseira inteligente Zelo vista de lado, mostrando o formato da pulseira e a fivela',
    caption: 'Vista lateral',
    width: 480,
    height: 360,
  },
  {
    src: pulseiraTras,
    alt: 'Pulseira inteligente Zelo vista de trás, mostrando o compartimento dos sensores',
    caption: 'Vista traseira',
    width: 480,
    height: 360,
  },
];
