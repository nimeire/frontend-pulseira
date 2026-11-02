import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { classNames } from '../../utils/classNames';
import { rotaInicial } from '../../utils/perfil';
import { Avatar } from '../avatar/Avatar';
import {
  ChevronDownIcon,
  LayoutIcon,
  LogOutIcon,
  SettingsIcon,
} from '../icons';
import styles from './UserMenu.module.css';

const rotuloPorPerfil = {
  PACIENTE: 'Paciente',
  RESPONSAVEL: 'Responsável',
  ADMIN: 'Administrador',
} as const;

/** Telas que só existem logado: ao sair delas, vai para o login. */
const AREA_LOGADA = /^\/(admin|paciente|responsavel|perfil)(\/|$)/;

/** Foto + nome da conta logada; ao clicar abre "Meu painel", "Editar perfil" e "Sair". */
export function UserMenu() {
  const { conta, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [aberto, setAberto] = useState(false);
  const raizRef = useRef<HTMLDivElement>(null);
  const gatilhoRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!aberto) return;

    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();

    function aoClicarFora(event: MouseEvent) {
      if (!raizRef.current?.contains(event.target as Node)) setAberto(false);
    }
    function aoTeclar(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setAberto(false);
        gatilhoRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', aoClicarFora);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  if (!conta) return null;

  const primeiroNome = conta.nome.split(' ')[0];

  // Setas para cima e para baixo percorrem os itens do menu.
  function aoTeclarNoMenu(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();

    const itens = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    const atual = itens.indexOf(document.activeElement as HTMLElement);
    const passo = event.key === 'ArrowDown' ? 1 : -1;
    itens[(atual + passo + itens.length) % itens.length]?.focus();
  }

  function handleSair() {
    setAberto(false);
    logout();
    if (AREA_LOGADA.test(pathname)) navigate('/login');
  }

  return (
    <div className={styles.raiz} ref={raizRef}>
      <button
        ref={gatilhoRef}
        type="button"
        className={styles.gatilho}
        aria-haspopup="menu"
        aria-expanded={aberto}
        aria-controls={menuId}
        aria-label={`Menu da conta de ${primeiroNome}`}
        onClick={() => setAberto((valor) => !valor)}
      >
        <Avatar
          name={conta.nome}
          photoUrl={conta.fotoUrl ?? undefined}
          alt=""
          size={36}
        />
        <span className={styles.nome}>{primeiroNome}</span>
        <ChevronDownIcon
          className={classNames(styles.seta, aberto && styles.setaAberta)}
        />
      </button>

      {aberto && (
        <div
          id={menuId}
          ref={menuRef}
          className={styles.menu}
          role="menu"
          aria-label="Conta"
          onKeyDown={aoTeclarNoMenu}
        >
          <div className={styles.cabecalho}>
            <Avatar
              name={conta.nome}
              photoUrl={conta.fotoUrl ?? undefined}
              alt=""
              size={48}
            />
            <div className={styles.quem}>
              <strong className={styles.quemNome}>{conta.nome}</strong>
              <span className={styles.quemEmail}>{conta.email}</span>
              <span className={styles.quemTipo}>
                {rotuloPorPerfil[conta.perfil]}
              </span>
            </div>
          </div>

          <Link
            role="menuitem"
            className={styles.item}
            to={rotaInicial(conta.perfil)}
            onClick={() => setAberto(false)}
          >
            <LayoutIcon />
            Meu painel
          </Link>
          {conta.perfil !== 'ADMIN' && (
            <Link
              role="menuitem"
              className={styles.item}
              to="/perfil"
              onClick={() => setAberto(false)}
            >
              <SettingsIcon />
              Editar perfil
            </Link>
          )}
          <button
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={handleSair}
          >
            <LogOutIcon />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
