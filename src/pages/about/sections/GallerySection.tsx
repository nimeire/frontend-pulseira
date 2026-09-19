import { SectionHeader } from '../../../components/section-header/SectionHeader';
import { ImageGallery } from '../../../components/image-gallery/ImageGallery';
import { galleryImages } from '../../../data/galleryImages';
import styles from './GallerySection.module.css';

export function GallerySection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="gallery-title"
    >
      <SectionHeader id="gallery-title" title="A pulseira Zelo" />
      <ImageGallery images={galleryImages} />
    </section>
  );
}
