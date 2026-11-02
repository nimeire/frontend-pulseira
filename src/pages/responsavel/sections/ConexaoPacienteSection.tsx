import { useState, type FormEvent } from 'react';
import { Avatar } from '../../../components/avatar/Avatar';
import { FormField } from '../../../components/form-field/FormField';
import { StatusBadge } from '../../../components/status-badge/StatusBadge';
import { Button } from '../../../components/ui/Button';
import { IdCardIcon } from '../../../components/icons';
import { useNotificar } from '../../../hooks/useNotificar';
import { mensagemDeErro } from '../../../services/api';
import {
  buscarPacientePorCodigo,
  vincularPorCodigo,
} from '../../../services/zelo';
import { classNames } from '../../../utils/classNames';
import { calcularIdade } from '../../../utils/idade';
import type { PacienteResumo } from '../../../types/paciente';
import connectionStyles from '../../../components/connection-card/ConnectionCard.module.css';
import styles from './ConexaoPacienteSection.module.css';

interface ConexaoPacienteSectionProps {
  pacientes: PacienteResumo[];
  selecionadoId: string | null;
  onSelecionar: (pacienteId: string) => void;
  /** Chamado depois que a API confirmou o vínculo; recebe o paciente recém-conectado. */
  onVinculado: (paciente: PacienteResumo) => void;
  onDesconectar: (pacienteId: string) => void;
}

type Etapa = 'buscar' | 'confirmar';

function localDe(paciente: PacienteResumo): string {
  return [
    paciente.bairro,
    [paciente.cidade, paciente.estado].filter(Boolean).join(' - '),
  ]
    .filter(Boolean)
    .join(', ');
}

export function ConexaoPacienteSection({
  pacientes,
  selecionadoId,
  onSelecionar,
  onVinculado,
  onDesconectar,
}: ConexaoPacienteSectionProps) {
  const [etapa, setEtapa] = useState<Etapa>('buscar');
  const [codigo, setCodigo] = useState('');
  const notificar = useNotificar();
  const [encontrado, setEncontrado] = useState<PacienteResumo | null>(null);
  const [ocupado, setOcupado] = useState(false);

  const total = pacientes.length;
  const local = encontrado ? localDe(encontrado) : '';

  async function handleBuscar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOcupado(true);
    try {
      setEncontrado(await buscarPacientePorCodigo(codigo));
      setEtapa('confirmar');
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
    } finally {
      setOcupado(false);
    }
  }

  async function handleConfirmar() {
    setOcupado(true);
    try {
      const vinculado = await vincularPorCodigo(codigo);
      setEtapa('buscar');
      setCodigo('');
      setEncontrado(null);
      onVinculado(vinculado);
      notificar.sucesso('Paciente conectado!');
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
    } finally {
      setOcupado(false);
    }
  }

  function handleCancelar() {
    setEtapa('buscar');
    setEncontrado(null);
  }

  return (
    <section className={styles.section} aria-label="Pacientes">
      <div className={connectionStyles.card}>
        <div className={connectionStyles.header}>
          <span className={connectionStyles.iconWrapper}>
            <IdCardIcon />
          </span>
          <div className={connectionStyles.headerText}>
            <h3 className={connectionStyles.title}>Pacientes</h3>
            <p className={connectionStyles.description}>
              {total === 0
                ? 'Digite o código do paciente para conectar.'
                : 'Escolha quem acompanhar ou conecte outro paciente.'}
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
            {pacientes.map((paciente) => {
              const aberto = paciente.id === selecionadoId;
              return (
                <li
                  key={paciente.id}
                  className={classNames(styles.linha, aberto && styles.linhaAberta)}
                >
                  <Avatar
                    name={paciente.nome}
                    photoUrl={paciente.fotoUrl ?? undefined}
                    alt=""
                    size={44}
                  />
                  <div className={styles.linhaInfo}>
                    <p className={styles.linhaNome} title={paciente.nome}>
                      {paciente.nome}
                    </p>
                    <StatusBadge ativo={paciente.ativo} />
                  </div>
                  <div className={styles.linhaAcoes}>
                    <Button
                      variant={aberto ? 'primary' : 'secondary'}
                      aria-pressed={aberto}
                      onClick={() => onSelecionar(paciente.id)}
                    >
                      {aberto ? 'Acompanhando' : 'Ver painel'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => onDesconectar(paciente.id)}
                      aria-label={`Desconectar ${paciente.nome}`}
                    >
                      Desconectar
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {etapa === 'buscar' ? (
          <form className={connectionStyles.form} onSubmit={handleBuscar}>
            <FormField
              id="codigo-paciente"
              label={total > 0 ? 'Conectar outro paciente' : 'Código do paciente'}
              icon={IdCardIcon}
              type="text"
              placeholder="Ex.: ZELO-AB12"
              required
              value={codigo}
              onChange={(event) => setCodigo(event.target.value)}
            />
            <Button type="submit" disabled={ocupado}>
              {ocupado ? 'Buscando…' : 'Buscar'}
            </Button>
          </form>
        ) : (
          encontrado && (
            <div className={styles.confirmacao}>
              <p className={styles.confirmacaoAviso}>É esta a pessoa certa?</p>

              <div className={styles.preview}>
                <Avatar
                  name={encontrado.nome}
                  photoUrl={encontrado.fotoUrl ?? undefined}
                  alt=""
                  size={48}
                />
                <div className={styles.previewTexto}>
                  <p className={styles.previewNome} title={encontrado.nome}>
                    {encontrado.nome}
                  </p>
                  <p className={styles.previewMeta}>
                    {[
                      `${calcularIdade(encontrado.dataNascimento)} anos`,
                      encontrado.telefone,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  {local && <p className={styles.previewMeta}>{local}</p>}
                </div>
              </div>

              <div className={styles.confirmacaoActions}>
                <Button onClick={handleConfirmar} disabled={ocupado}>
                  {ocupado ? 'Confirmando…' : 'Confirmar'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancelar}
                  disabled={ocupado}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
