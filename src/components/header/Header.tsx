import { useEffect, useState, useSyncExternalStore } from 'react';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { useAuth } from '../../hooks/useAuth';
import { rotaInicial } from '../../utils/perfil';
import { LinkButton } from '../ui/LinkButton';
import { Button } from '../ui/Button';
import { Avatar } from '../avatar/Avatar';
import { UserMenu } from '../user-menu/UserMenu';
import { IconButton } from '../ui/IconButton';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import { CloseIcon, MenuIcon } from '../icons';
import styles from './Header.module.css';

const navLinks = [{ label: 'Sobre o projeto', to: '/sobre' }];

// Mesmo breakpoint do menu mobile (ver Header.module.css).
const CONSULTA_CELULAR = '(max-width: 767px)';

function assinarCelular(aviso: () => void) {
  const consulta = window.matchMedia(CONSULTA_CELULAR);
  consulta.addEventListener('change', aviso);
  return () => consulta.removeEventListener('change', aviso);
}

function ehCelular() {
  return window.matchMedia(CONSULTA_CELULAR).matches;
}

interface HeaderProps {
  /** Selo ao lado do logo nas telas logadas, ex.: "Paciente", "Admin". */
  badge?: string;
}

export function Header({ badge }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { conta, logout } = useAuth();
  const celular = useSyncExternalStore(assinarCelular, ehCelular, () => false);
  // No celular, logado: o logo vira só marca (sem link para o início) e o menu não lista o site.
  const logoSemLink = Boolean(conta) && celular;

  function handleSairNoCelular() {
    setIsMenuOpen(false);
    logout();
  }

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

  const marca = (
    <>
      <img
        className={styles.logo}
        src={siteConfig.logoSrc}
        alt=""
        width={40}
        height={40}
      />
      <span className={styles.brandName}>{siteConfig.name}</span>
      {badge && <span className={styles.badge}>{badge}</span>}
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {logoSemLink ? (
          <div className={styles.brand}>{marca}</div>
        ) : (
          <NavLink className={styles.brand} to="/" end>
            {marca}
          </NavLink>
        )}

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
            {conta ? (
              <UserMenu />
            ) : (
              <LinkButton variant="secondary" to="/login">
                Entrar
              </LinkButton>
            )}
            {/* O tema fica sempre na ponta direita, igual à tela de login. */}
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
          {!conta && (
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
          )}
          {conta ? (
            <div className={styles.mobileUser}>
              <div className={styles.mobileUserInfo}>
                <Avatar
                  name={conta.nome}
                  photoUrl={conta.fotoUrl ?? undefined}
                  alt=""
                  size={44}
                />
                <div className={styles.mobileUserText}>
                  <strong>{conta.nome}</strong>
                  <span>{conta.email}</span>
                </div>
              </div>
              <LinkButton
                variant="secondary"
                to={rotaInicial(conta.perfil)}
                onClick={() => setIsMenuOpen(false)}
              >
                Meu painel
              </LinkButton>
              {conta.perfil !== 'ADMIN' && (
                <LinkButton
                  variant="secondary"
                  to="/perfil"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Editar perfil
                </LinkButton>
              )}
              <Button variant="secondary" onClick={handleSairNoCelular}>
                Sair
              </Button>
            </div>
          ) : (
            <LinkButton
              variant="secondary"
              className={styles.mobileMenuButton}
              to="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </LinkButton>
          )}
          <div className={styles.mobileMenuThemeRow}>
            <span>Tema</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
