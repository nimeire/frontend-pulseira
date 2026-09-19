import { Link } from 'react-router-dom';
import {
  backendCreators,
  copyrightHolder,
  footerColumns,
  otherCreators,
  type Creator,
} from '../../data/footerData';
import styles from './Footer.module.css';

function CreatorList({ creators }: { creators: readonly Creator[] }) {
  return (
    <ul className={styles.creatorGroup}>
      {creators.map((creator) => (
        <li key={creator.githubUrl} className={styles.creator}>
          <a
            className={styles.creatorLink}
            href={creator.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            {creator.name}
          </a>
          <span className={styles.creatorRole}>{creator.role}</span>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <nav
            className={styles.columns}
            aria-label="Links institucionais"
          >
            {footerColumns.map((column) => (
              <div key={column.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href}>{link.label}</Link>
                      ) : (
                        <a href={link.href}>{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className={styles.team}>
            <h3 className={styles.columnTitle}>Desenvolvido por</h3>
            <div className={styles.creators}>
              <CreatorList creators={backendCreators} />
              <CreatorList creators={otherCreators} />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} {copyrightHolder}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
