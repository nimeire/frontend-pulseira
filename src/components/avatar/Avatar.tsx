import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  photoUrl?: string;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, photoUrl }: AvatarProps) {
  if (photoUrl) {
    return (
      <img
        className={styles.avatar}
        src={photoUrl}
        alt={`Caricatura de ${name}`}
        width={96}
        height={96}
        loading="lazy"
      />
    );
  }

  return (
    <span className={styles.avatar} role="img" aria-label={name}>
      <span aria-hidden="true">{getInitials(name)}</span>
    </span>
  );
}
