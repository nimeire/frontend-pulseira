/** Formata um instante ISO como "agora mesmo" / "há N minutos/horas/dias". */
export function tempoRelativo(iso: string): string {
  const minutos = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 60000),
  );
  if (minutos < 1) return 'agora mesmo';
  if (minutos === 1) return 'há 1 minuto';
  if (minutos < 60) return `há ${minutos} minutos`;

  const horas = Math.floor(minutos / 60);
  if (horas === 1) return 'há 1 hora';
  if (horas < 24) return `há ${horas} horas`;

  const dias = Math.floor(horas / 24);
  return dias === 1 ? 'há 1 dia' : `há ${dias} dias`;
}
