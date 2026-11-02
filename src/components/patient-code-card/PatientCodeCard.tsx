import { useState } from 'react';
import { classNames } from '../../utils/classNames';
import { UsersIcon } from '../icons';
import { Avatar } from '../avatar/Avatar';
import { StatusBadge } from '../status-badge/StatusBadge';
import { Button } from '../ui/Button';
import type { Responsavel } from '../../types/responsavel';
import connectionStyles from '../connection-card/ConnectionCard.module.css';
import styles from './PatientCodeCard.module.css';

interface PatientCodeCardProps {
  codigoVinculo: string;
  responsaveis: Responsavel[];
  onDesvincular: (responsavelId: string) => void;
}

/**
 * Card do lado do paciente: mostra o código para compartilhar com quantos
 * responsáveis quiser e a lista de quem já acompanha. Quem inicia o vínculo,
 * digitando o código, é sempre o responsável (ver `ConexaoPacienteSection`).
 */
export function PatientCodeCard({
  codigoVinculo,
  responsaveis,
  onDesvincular,
}: PatientCodeCardProps) {
  const [copiado, setCopiado] = useState(false);
  const total = responsaveis.length;

  async function handleCopiar() {
    try {
      await navigator.clipboard.writeText(codigoVinculo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível (ex.: contexto não seguro) — o código já
      // está visível na tela pra copiar manualmente.
    }
  }

  return (
    <div className={connectionStyles.card}>
      <div className={connectionStyles.header}>
        <span className={connectionStyles.iconWrapper}>
          <UsersIcon />
        </span>
        <div className={connectionStyles.headerText}>
          <h3 className={connectionStyles.title}>Responsáveis</h3>
          <p className={connectionStyles.description}>
            Compartilhe este código com quem vai acompanhar você.
          </p>
        </div>
        <span
          className={classNames(
            connectionStyles.status,
            total > 0
              ? connectionStyles.statusConnected
              : connectionStyles.statusDisconnected,
          )}
        >
          {total === 0
            ? 'Não conectado'
            : total === 1
              ? '1 conectado'
              : `${total} conectados`}
        </span>
      </div>

      {total > 0 && (
        <ul className={styles.lista}>
          {responsaveis.map((responsavel) => (
            <li key={responsavel.id} className={styles.linha}>
              <Avatar
                name={responsavel.nome}
                photoUrl={responsavel.fotoUrl ?? undefined}
                alt=""
                size={44}
              />
              <div className={styles.info}>
                <p className={styles.nome} title={responsavel.nome}>
                  {responsavel.nome}
                </p>
                <p className={styles.email} title={responsavel.email}>
                  {responsavel.email}
                </p>
                <StatusBadge ativo={responsavel.ativo} />
              </div>
              <Button
                variant="secondary"
                onClick={() => onDesvincular(responsavel.id)}
                aria-label={`Desvincular ${responsavel.nome}`}
              >
                Desvincular
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.shareBox}>
        <span className={styles.codeLabel}>Seu código</span>
        <div className={styles.codeRow}>
          <code className={styles.code}>{codigoVinculo}</code>
          <Button variant="secondary" onClick={handleCopiar}>
            {copiado ? 'Copiado!' : 'Copiar código'}
          </Button>
        </div>
      </div>
    </div>
  );
}
