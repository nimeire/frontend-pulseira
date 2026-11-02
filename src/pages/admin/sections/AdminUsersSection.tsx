import { Avatar } from '../../../components/avatar/Avatar';
import { IconButton } from '../../../components/ui/IconButton';
import { PowerIcon, TrashIcon } from '../../../components/icons';
import { useConfirmar } from '../../../hooks/useConfirmar';
import { classNames } from '../../../utils/classNames';
import type { Usuario } from '../../../types/usuario';
import styles from './AdminUsersSection.module.css';

interface AdminUsersSectionProps {
  usuarios: Usuario[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const tipoLabel: Record<Usuario['tipo'], string> = {
  paciente: 'Paciente',
  responsavel: 'Responsável',
};

export function AdminUsersSection({
  usuarios,
  onToggleStatus,
  onDelete,
}: AdminUsersSectionProps) {
  const confirmar = useConfirmar();

  async function handleDelete(usuario: Usuario) {
    const confirmou = await confirmar({
      titulo: 'Excluir usuário?',
      mensagem: `Excluir ${usuario.nome}? Não dá pra desfazer.`,
      confirmar: 'Excluir',
    });
    if (confirmou) {
      onDelete(usuario.id);
    }
  }

  return (
    <section className={styles.section} aria-label="Usuários cadastrados">
      <h2 className={styles.title}>Usuários</h2>

      {usuarios.length === 0 ? (
        <p className={styles.empty}>Nenhum usuário.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Usuário</th>
                <th scope="col">Tipo</th>
                <th scope="col">CPF</th>
                <th scope="col">E-mail</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className={styles.srOnly}>Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    <div className={styles.userCell}>
                      <Avatar
                        name={usuario.nome}
                        photoUrl={usuario.fotoUrl}
                        size={40}
                      />
                      <span className={styles.userName} title={usuario.nome}>
                        {usuario.nome}
                      </span>
                    </div>
                  </td>
                  <td>{tipoLabel[usuario.tipo]}</td>
                  <td>{usuario.cpf}</td>
                  <td className={styles.emailCell} title={usuario.email}>
                    {usuario.email}
                  </td>
                  <td>
                    <span
                      className={classNames(
                        styles.statusBadge,
                        usuario.status === 'ativo'
                          ? styles.statusAtivo
                          : styles.statusInativo,
                      )}
                    >
                      {usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <IconButton
                        aria-label={
                          usuario.status === 'ativo'
                            ? `Desativar conta de ${usuario.nome}`
                            : `Ativar conta de ${usuario.nome}`
                        }
                        onClick={() => onToggleStatus(usuario.id)}
                      >
                        <PowerIcon />
                      </IconButton>
                      <IconButton
                        aria-label={`Excluir conta de ${usuario.nome}`}
                        onClick={() => handleDelete(usuario)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
