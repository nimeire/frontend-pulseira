const LADO_DA_FOTO = 256;
const TAMANHO_MAXIMO_ARQUIVO = 10 * 1024 * 1024;

export class FotoInvalidaError extends Error {}

/**
 * Recorta a imagem em quadrado a partir do centro e reduz para 256x256 JPEG,
 * devolvendo um data URL pequeno (algumas dezenas de KB) que a API aceita.
 */
export async function prepararFoto(arquivo: File): Promise<string> {
  if (!arquivo.type.startsWith('image/')) {
    throw new FotoInvalidaError('Escolha um arquivo de imagem.');
  }
  if (arquivo.size > TAMANHO_MAXIMO_ARQUIVO) {
    throw new FotoInvalidaError('A imagem é grande demais. Use uma de até 10 MB.');
  }

  let imagem: ImageBitmap;
  try {
    imagem = await createImageBitmap(arquivo);
  } catch {
    throw new FotoInvalidaError('Não consegui abrir essa imagem. Tente outra.');
  }

  const lado = Math.min(imagem.width, imagem.height);
  const canvas = document.createElement('canvas');
  canvas.width = LADO_DA_FOTO;
  canvas.height = LADO_DA_FOTO;

  const contexto = canvas.getContext('2d');
  if (!contexto) {
    throw new FotoInvalidaError('Seu navegador não conseguiu preparar a imagem.');
  }
  contexto.drawImage(
    imagem,
    (imagem.width - lado) / 2,
    (imagem.height - lado) / 2,
    lado,
    lado,
    0,
    0,
    LADO_DA_FOTO,
    LADO_DA_FOTO,
  );
  imagem.close();

  return canvas.toDataURL('image/jpeg', 0.85);
}
