import type { CSSProperties } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  photoUrl?: string;
  /** Texto alternativo da foto. Padrão: "Caricatura de {nome}"; use "" quando o nome já aparece ao lado. */
  alt?: string;
  /** Overrides the default 96px size, e.g. for compact table rows. */
  size?: number;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, photoUrl, alt, size }: AvatarProps) {
  const dimension = size ?? 96;
  const style: CSSProperties | undefined = size
    ? { width: size, height: size, fontSize: 'var(--font-size-xs)' }
    : undefined;

  if (photoUrl) {
    return (
      <img
        className={styles.avatar}
        src={photoUrl}
        alt={alt ?? `Caricatura de ${name}`}
        width={dimension}
        height={dimension}
        style={style}
        loading="lazy"
      />
    );
  }

  return (
    <span className={styles.avatar} style={style} role="img" aria-label={name}>
      <span aria-hidden="true">{getInitials(name)}</span>
    </span>
  );
}
