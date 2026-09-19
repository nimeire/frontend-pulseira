import { Avatar } from '../avatar/Avatar';
import { GithubIcon, LinkedinIcon, MailIcon } from '../icons';
import type { Creator } from '../../data/footerData';
import styles from './TeamMemberCard.module.css';

type TeamMemberCardProps = Creator;

export function TeamMemberCard({
  name,
  role,
  githubUrl,
  linkedinUrl,
  email,
  photoUrl,
}: TeamMemberCardProps) {
  return (
    <li className={styles.card}>
      <Avatar name={name} photoUrl={photoUrl} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
      </div>
      <ul className={styles.links}>
        <li>
          <a
            className={styles.link}
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub de ${name}`}
          >
            <GithubIcon />
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`LinkedIn de ${name}`}
          >
            <LinkedinIcon />
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href={`mailto:${email}`}
            aria-label={`Enviar e-mail para ${name}`}
          >
            <MailIcon />
          </a>
        </li>
      </ul>
    </li>
  );
}
