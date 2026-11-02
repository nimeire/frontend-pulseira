import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useConfirmar } from '../../../hooks/useConfirmar';
import { useNotificar } from '../../../hooks/useNotificar';
import { mensagemDeErro } from '../../../services/api';
import { trocarTipoConta } from '../../../services/zelo';
import { rotaInicial } from '../../../utils/perfil';
import { PerfilCard } from '../PerfilCard';
import styles from '../PerfilCard.module.css';

export function TipoContaSection() {
  const { conta, atualizarConta } = useAuth();
  const navigate = useNavigate();
  const confirmar = useConfirmar();
  const notificar = useNotificar();
  const [ocupado, setOcupado] = useState(false);

  if (!conta || conta.perfil === 'ADMIN') return null;

  const ehPaciente = conta.perfil === 'PACIENTE';
  const destino = ehPaciente ? 'RESPONSAVEL' : 'PACIENTE';
  const rotuloDestino = ehPaciente ? 'responsável' : 'paciente';

  async function handleTrocar() {
    const confirmou = await confirmar({
      titulo: `Mudar para ${rotuloDestino}?`,
      mensagem: `Sua conta passa a ser de ${rotuloDestino} e você usa o painel de ${rotuloDestino}. Você pode voltar depois, se quiser.`,
      confirmar: `Mudar para ${rotuloDestino}`,
    });
    if (!confirmou) return;

    setOcupado(true);
    try {
      const atualizada = await trocarTipoConta(destino);
      atualizarConta(atualizada);
      notificar.sucesso(`Sua conta agora é de ${rotuloDestino}.`);
      navigate(rotaInicial(atualizada.perfil));
    } catch (falha) {
      notificar.erro(mensagemDeErro(falha));
      setOcupado(false);
    }
  }

  return (
    <PerfilCard
      titulo="Tipo de conta"
      descricao={`Hoje você é ${ehPaciente ? 'paciente' : 'responsável'}.`}
    >
      <p className={styles.descricao}>
        {ehPaciente
          ? 'Para virar responsável, antes desconecte a sua pulseira e desvincule quem acompanha você. Seus dados de paciente ficam guardados.'
          : 'Para virar paciente, antes desconecte os pacientes que você acompanha.'}
      </p>
      <div className={styles.acoes}>
        <Button variant="secondary" disabled={ocupado} onClick={handleTrocar}>
          {ocupado ? 'Mudando…' : `Mudar para ${rotuloDestino}`}
        </Button>
      </div>
    </PerfilCard>
  );
}
