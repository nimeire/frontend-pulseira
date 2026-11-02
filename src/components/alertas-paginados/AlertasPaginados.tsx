import { useState } from 'react';
import { AlertHistory } from '../alert-history/AlertHistory';
import { Pagination } from '../pagination/Pagination';
import { Button } from '../ui/Button';
import { useRecurso } from '../../hooks/useRecurso';
import { listarAlertasPagina } from '../../services/zelo';
import type { StatusAlerta } from '../../types/alerta';
import { AlertasModal } from './AlertasModal';
import styles from './AlertasPaginados.module.css';

const ALERTAS_POR_PAGINA = 5;
const INTERVALO_ATUALIZACAO_MS = 15_000;

interface AlertasPaginadosProps {
  pessoaId: string;
  /** Muda depois de uma ação sobre um alerta, para a lista recarregar na hora. */
  versao: number;
  /** Quando informado, alertas em aberto mostram os botões de atendimento. */
  onAtender?: (alertaId: string, status: Exclude<StatusAlerta, 'pendente'>) => void;
}

/** Alertas das últimas 24 horas, em páginas, com "Mostrar todos" abrindo a lista completa. */
export function AlertasPaginados({
  pessoaId,
  versao,
  onAtender,
}: AlertasPaginadosProps) {
  const [pagina, setPagina] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const { dados, carregando, erro } = useRecurso(
    () =>
      listarAlertasPagina(pessoaId, {
        pagina,
        tamanho: ALERTAS_POR_PAGINA,
        ultimas24h: true,
      }),
    `${pessoaId}:${pagina}:${versao}`,
    INTERVALO_ATUALIZACAO_MS,
  );

  // Se os alertas do dia diminuírem (ex.: passaram de 24 h), volta para a última página que existe.
  if (dados && dados.totalPaginas > 0 && pagina > dados.totalPaginas) {
    setPagina(dados.totalPaginas);
  }

  if (!dados) {
    return (
      <p className={styles.estado} role="status">
        {carregando ? 'Carregando alertas…' : erro}
      </p>
    );
  }

  return (
    <div className={styles.lista}>
      <AlertHistory
        alertas={dados.itens}
        onChangeStatus={onAtender}
        mensagemVazia="Nenhum alerta nas últimas 24 horas."
      />

      <Pagination
        paginaAtual={pagina}
        totalPaginas={dados.totalPaginas}
        onChange={setPagina}
        ariaLabel="Paginação dos alertas"
      />

      <div className={styles.rodape}>
        <Button
          variant="secondary"
          aria-haspopup="dialog"
          onClick={() => setModalAberto(true)}
        >
          Mostrar todos
        </Button>
      </div>

      {modalAberto && (
        <AlertasModal
          pessoaId={pessoaId}
          versao={versao}
          onAtender={onAtender}
          onClose={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
