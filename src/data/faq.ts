export interface FaqItem {
  id: number;
  pergunta: string;
  resposta: string;
}

/** How many questions each page of the FAQ shows. */
export const PERGUNTAS_POR_PAGINA = 5;

// TODO: substituir o lorem ipsum da resposta 7 (duração da bateria) pela resposta real
export const faq: readonly FaqItem[] = [
  {
    id: 1,
    pergunta: 'O que é o Zelo?',
    resposta:
      'O Zelo é uma pulseira inteligente que identifica possíveis quedas e tem um botão de pânico. Quando algo acontece, um alerta é enviado para quem cuida da pessoa, sem ela precisar pegar o celular. Ele é um projeto acadêmico (prova de conceito) da FATEC Praia Grande.',
  },
  {
    id: 2,
    pergunta: 'Como a pulseira funciona?',
    resposta:
      'A pulseira tem um sensor de movimento (MPU6050) e um microcontrolador (ESP-12E) que lê os dados do sensor e do botão de pânico. Dois LEDs mostram o estado: um indica que ela está ligada e configurada, e o outro acende quando uma queda é detectada ou o botão é apertado. Nesses casos, o alerta é enviado ao sistema e aparece para o responsável no site.',
  },
  {
    id: 3,
    pergunta: 'Como a queda é detectada?',
    resposta:
      'O sensor de movimento mede aceleração e rotação várias vezes por segundo. Quando há uma mudança brusca e o padrão é compatível com uma queda, a pulseira acende o LED de alerta e envia o alerta ao responsável, sem a pessoa precisar fazer nada. Como o sistema ainda é um protótipo, ele pode errar: gerar alertas sem queda (falso positivo) ou não identificar uma queda.',
  },
  {
    id: 4,
    pergunta: 'A pulseira funciona sem celular?',
    resposta:
      'Sim. A pulseira detecta a queda e envia o alerta sozinha, sem depender do celular de quem a usa. Ela precisa estar ligada, configurada e conectada à internet. O responsável acompanha os alertas pelo site.',
  },
  {
    id: 5,
    pergunta: 'Como sou avisado em uma emergência?',
    resposta:
      'O alerta aparece no seu painel do responsável, no site, como "pendente", com o tipo (possível queda ou botão de pânico) e o horário. A partir daí você pode marcá-lo como reconhecido e, depois, como resolvido ou falso positivo.',
  },
  {
    id: 6,
    pergunta: 'Quem pode acompanhar o usuário?',
    resposta:
      'Os responsáveis (familiares, cuidadores ou profissionais de saúde) vinculados à pessoa. O vínculo começa pelo responsável: a pessoa monitorada compartilha o código de vínculo dela, o responsável digita esse código no painel e confirma. A pessoa pode desvincular o responsável quando quiser.',
  },
  {
    id: 7,
    pergunta: 'Quanto tempo dura a bateria?',
    resposta:
      'Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu, aliquam consequat, pharetra a, ornare vitae, neque.',
  },
  {
    id: 8,
    pergunta: 'Meus dados estão seguros?',
    resposta:
      'Tratamos os dados com cuidado: a senha é guardada de forma protegida (hash), e só responsáveis vinculados à pessoa veem os dados e as informações de saúde dela. O Zelo não coleta localização. Como o projeto ainda está em desenvolvimento, nenhum sistema é 100% seguro. Veja os detalhes na Política de privacidade.',
  },
  {
    id: 9,
    pergunta: 'A pulseira é um equipamento médico?',
    resposta:
      'Não. O Zelo é um protótipo acadêmico e não é um equipamento médico certificado. Ele não substitui supervisão profissional nem atendimento de emergência. Em caso de emergência, ligue para o SAMU: 192.',
  },
  {
    id: 10,
    pergunta: 'Como entro em contato com o suporte?',
    resposta:
      'Pela página de Contato, onde estão os desenvolvedores do projeto, com e-mail, LinkedIn e GitHub de cada um.',
  },
];
