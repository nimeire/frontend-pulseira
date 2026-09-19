import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import { CloseIcon, MenuIcon } from '../icons';
import styles from './Header.module.css';

const navLinks = [{ label: 'Sobre o projeto', to: '/sobre' }];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Keep the mobile panel in sync if the viewport grows past the
  // breakpoint while it's open (e.g. rotating a tablet).
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = () => setIsMenuOpen(false);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink className={styles.brand} to="/" end>
          <img
            className={styles.logo}
            src={siteConfig.logoSrc}
            alt=""
            width={40}
            height={40}
          />
          <span className={styles.brandName}>{siteConfig.name}</span>
        </NavLink>

        <div className={styles.right}>
          <nav className={styles.nav} aria-label="Navegação principal">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button variant="secondary">Entrar</Button>
            <ThemeToggle />
          </div>

          <IconButton
            className={styles.menuTrigger}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu}>
          <nav
            className={styles.mobileNav}
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button
            variant="secondary"
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(false)}
          >
            Entrar
          </Button>
          <div className={styles.mobileMenuThemeRow}>
            <span>Tema</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
