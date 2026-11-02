import { useState } from 'react';
import { AlertHistory } from '../alert-history/AlertHistory';
import { Modal } from '../modal/Modal';
import { Pagination } from '../pagination/Pagination';
import { useRecurso } from '../../hooks/useRecurso';
import { listarAlertasPagina } from '../../services/zelo';
import type { StatusAlerta } from '../../types/alerta';
import styles from './AlertasPaginados.module.css';

const ALERTAS_POR_PAGINA = 10;
const INTERVALO_ATUALIZACAO_MS = 15_000;

interface AlertasModalProps {
  pessoaId: string;
  versao: number;
  onAtender?: (alertaId: string, status: Exclude<StatusAlerta, 'pendente'>) => void;
  onClose: () => void;
}

/** Todos os alertas da pessoa (sem o limite de 24 h), em páginas de 10. */
export function AlertasModal({
  pessoaId,
  versao,
  onAtender,
  onClose,
}: AlertasModalProps) {
  const [pagina, setPagina] = useState(1);
  const { dados, carregando, erro } = useRecurso(
    () =>
      listarAlertasPagina(pessoaId, {
        pagina,
        tamanho: ALERTAS_POR_PAGINA,
        ultimas24h: false,
      }),
    `modal:${pessoaId}:${pagina}:${versao}`,
    INTERVALO_ATUALIZACAO_MS,
  );

  return (
    <Modal titulo="Todos os alertas" onClose={onClose}>
      {!dados ? (
        <p className={styles.estado} role="status">
          {carregando ? 'Carregando alertas…' : erro}
        </p>
      ) : (
        <>
          <p className={styles.total}>
            {dados.totalItens === 1
              ? '1 alerta no total'
              : `${dados.totalItens} alertas no total`}
          </p>
          <AlertHistory
            alertas={dados.itens}
            onChangeStatus={onAtender}
            mensagemVazia="Nenhum alerta até agora."
          />
          <Pagination
            paginaAtual={pagina}
            totalPaginas={dados.totalPaginas}
            onChange={setPagina}
            ariaLabel="Paginação de todos os alertas"
          />
        </>
      )}
    </Modal>
  );
}
