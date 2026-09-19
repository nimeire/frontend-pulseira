import styles from './ImageGallery.module.css';

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <ul className={styles.grid}>
      {images.map((image) => (
        <li key={image.src} className={styles.item}>
          <figure className={styles.figure}>
            <img
              className={styles.image}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
            />
            <figcaption className={styles.caption}>
              {image.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
