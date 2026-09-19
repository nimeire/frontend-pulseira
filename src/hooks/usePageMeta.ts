import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
}

/** Sets the document title and meta description while the page is mounted. */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const descriptionTag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousTitle = document.title;
    const previousDescription = descriptionTag?.content;

    document.title = title;
    if (descriptionTag) {
      descriptionTag.content = description;
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription !== undefined) {
        descriptionTag.content = previousDescription;
      }
    };
  }, [title, description]);
}
