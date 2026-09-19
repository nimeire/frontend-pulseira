import styles from './PolicyContent.module.css';

// Splitting on a capturing group keeps the bracketed parts at odd indexes.
const PLACEHOLDER_PATTERN = /(\[[^\]]+\])/;

interface PlaceholderTextProps {
  texto: string;
}

/** Renders text, highlighting any `[PLACEHOLDER]` that still needs filling in. */
export function PlaceholderText({ texto }: PlaceholderTextProps) {
  const parts = texto.split(PLACEHOLDER_PATTERN);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark key={`${index}-${part}`} className={styles.placeholder}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
