import { ContentSection } from '../../../components/content-section/ContentSection';
import { ImageGallery } from '../../../components/image-gallery/ImageGallery';
import { galleryImages } from '../../../data/galleryImages';

export function GallerySection() {
  return (
    <ContentSection titleId="gallery-title" title="A pulseira Zelo">
      <ImageGallery images={galleryImages} />
    </ContentSection>
  );
}
