import { useRef, useState, type ChangeEvent } from 'react';
import { Avatar } from '../../../components/avatar/Avatar';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useNotificar } from '../../../hooks/useNotificar';
import { mensagemDeErro } from '../../../services/api';
import { trocarFotoPerfil } from '../../../services/zelo';
import { FotoInvalidaError, prepararFoto } from '../../../utils/imagem';
import { PerfilCard } from '../PerfilCard';
import styles from '../PerfilCard.module.css';
import fotoStyles from './FotoSection.module.css';

function textoDoErro(falha: unknown): string {
  return falha instanceof FotoInvalidaError ? falha.message : mensagemDeErro(falha);
}

export function FotoSection() {
  const { conta, atualizarConta } = useAuth();
  const notificar = useNotificar();
  const seletorRef = useRef<HTMLInputElement>(null);
  const [ocupado, setOcupado] = useState(false);

  if (!conta) return null;

  async function salvar(foto: string | null, mensagem: string) {
    setOcupado(true);
    try {
      atualizarConta(await trocarFotoPerfil(foto));
      notificar.sucesso(mensagem);
    } catch (falha) {
      notificar.erro(textoDoErro(falha));
    } finally {
      setOcupado(false);
    }
  }

  async function handleArquivo(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];
    event.target.value = '';
    if (!arquivo) return;

    let foto: string;
    try {
      foto = await prepararFoto(arquivo);
    } catch (falha) {
      notificar.erro(textoDoErro(falha));
      return;
    }
    await salvar(foto, 'Foto atualizada!');
  }

  return (
    <PerfilCard
      titulo="Foto de perfil"
      descricao="Aparece para quem está conectado com você."
    >
      <div className={fotoStyles.linha}>
        <Avatar
          name={conta.nome}
          photoUrl={conta.fotoUrl ?? undefined}
          alt={`Foto de perfil de ${conta.nome}`}
          size={96}
        />
        <div className={styles.acoes}>
          <input
            ref={seletorRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleArquivo}
          />
          <Button disabled={ocupado} onClick={() => seletorRef.current?.click()}>
            {ocupado ? 'Salvando…' : conta.fotoUrl ? 'Trocar foto' : 'Escolher foto'}
          </Button>
          {conta.fotoUrl && (
            <Button
              variant="secondary"
              disabled={ocupado}
              onClick={() => salvar(null, 'Foto removida.')}
            >
              Remover foto
            </Button>
          )}
        </div>
      </div>
    </PerfilCard>
  );
}
