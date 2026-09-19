import { ContentSection } from '../../../components/content-section/ContentSection';
import { Notice } from '../../../components/notice/Notice';

export function LimitationsSection() {
  return (
    <ContentSection
      titleId="limitations-title"
      title="Limitações e transparência"
      gap="md"
    >
      <Notice>
        Este é um sistema em fase de prova de conceito. A detecção de
        quedas pode gerar falsos positivos (alertas sem queda real) ou
        falsos negativos (uma queda não identificada). Estamos
        transparentes sobre essas limitações enquanto o projeto evolui.
      </Notice>
    </ContentSection>
  );
}
