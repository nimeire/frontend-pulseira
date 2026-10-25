import { classNames } from '../../utils/classNames';
import { tempoRelativo } from '../../utils/tempo';
import { AlertIcon, CheckCircleIcon, PanicButtonIcon } from '../icons';
import { Button } from '../ui/Button';
import type { Alerta, StatusAlerta, TipoAlerta } from '../../types/alerta';
import styles from './AlertHistory.module.css';

interface AlertHistoryProps {
  alertas: Alerta[];
  /** Quando informado, alertas em aberto mostram os botões de atendimento. */
  onChangeStatus?: (id: string, status: StatusAlerta) => void;
}

const tituloPorTipo: Record<TipoAlerta, string> = {
  queda: 'Possível queda',
  botao_panico: 'Botão de pânico',
};

const rotuloPorStatus: Record<StatusAlerta, string> = {
  pendente: 'Pendente',
  reconhecido: 'Reconhecido',
  resolvido: 'Resolvido',
  falso_positivo: 'Falso positivo',
};

const dataHoraFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

function iconePorTipo(tipo: TipoAlerta, emAberto: boolean) {
  if (tipo === 'botao_panico') return PanicButtonIcon;
  return emAberto ? AlertIcon : CheckCircleIcon;
}

/** Lista de alertas (queda e botão de pânico) — mais recente primeiro. */
export function AlertHistory({ alertas, onChangeStatus }: AlertHistoryProps) {
  if (alertas.length === 0) {
    return <p className={styles.empty}>Nenhum alerta até agora.</p>;
  }

  return (
    <ul className={styles.list}>
      {alertas.map((alerta) => {
        const emAberto =
          alerta.status === 'pendente' || alerta.status === 'reconhecido';
        const Icon = iconePorTipo(alerta.tipo, emAberto);

        return (
          <li
            key={alerta.id}
            className={classNames(styles.item, emAberto && styles.itemAlert)}
          >
            <span
              className={classNames(styles.icon, emAberto && styles.iconAlert)}
            >
              <Icon />
            </span>

            <div className={styles.content}>
              <div className={styles.row}>
                <span className={styles.title}>
                  {tituloPorTipo[alerta.tipo]}
                </span>
                <span
                  className={classNames(
                    styles.badge,
                    styles[`badge_${alerta.status}`],
                  )}
                >
                  {rotuloPorStatus[alerta.status]}
                </span>
              </div>
              <p className={styles.time}>
                {dataHoraFormatter.format(new Date(alerta.geradoEm))} ·{' '}
                {tempoRelativo(alerta.geradoEm)}
              </p>

              {onChangeStatus && emAberto && (
                <div className={styles.actions}>
                  {alerta.status === 'pendente' && (
                    <Button
                      onClick={() => onChangeStatus(alerta.id, 'reconhecido')}
                    >
                      Reconhecer
                    </Button>
                  )}
                  {alerta.status === 'reconhecido' && (
                    <>
                      <Button
                        onClick={() => onChangeStatus(alerta.id, 'resolvido')}
                      >
                        Resolvido
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          onChangeStatus(alerta.id, 'falso_positivo')
                        }
                      >
                        Falso positivo
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
