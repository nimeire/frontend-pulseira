import type { SecaoPolitica } from '../types/politica';

/**
 * Privacy policy content.
 *
 * Facts about collected data come from the back-end data model
 * (backend-pulseira: Cuidador, PessoaMonitorada, Pulseira, Telemetria,
 * Alerta, VinculoCuidador) and from the front-end code. Anything that could
 * not be confirmed is written as a `[PLACEHOLDER EM MAIÚSCULAS]`, which the
 * page highlights so it is easy to find and fill in.
 */

/** ISO date (YYYY-MM-DD) of the last content review. */
export const ULTIMA_ATUALIZACAO = '2026-09-19';

export const TITULO_POLITICA = 'Política de privacidade';

export const SUBTITULO_POLITICA =
  'Como o Zelo cuida dos seus dados e dos dados de quem você ama';

export const RESUMO_POLITICA: readonly string[] = [
  'Coletamos apenas o que o sistema precisa para localizar a pessoa e identificar possíveis quedas.',
  'Localização, movimento e informações de saúde são sensíveis: só responsáveis autorizados podem vê-los.',
  'Não vendemos dados pessoais nem os usamos para publicidade.',
  'Trabalhamos para proteger os dados, mas nenhum sistema é 100% seguro e o projeto ainda está em desenvolvimento.',
  'Você pode pedir acesso, correção ou eliminação dos seus dados e revogar seu consentimento, conforme a LGPD.',
];

export const AVISO_REVISAO_JURIDICA =
  'Este documento é parte de um projeto acadêmico e deve passar por revisão jurídica antes de qualquer uso comercial.';

export const secoesPolitica: readonly SecaoPolitica[] = [
  {
    id: 'introducao',
    titulo: 'Introdução e quem somos',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'O Zelo é uma pulseira inteligente que acompanha a localização de uma pessoa e identifica possíveis quedas, avisando quem cuida dela. O sistema reúne a pulseira, um servidor, um banco de dados e este site.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'O Zelo é uma prova de conceito, desenvolvida como projeto interdisciplinar do curso de Desenvolvimento de Software Multiplataforma da FATEC Praia Grande. Não é um produto comercial nem um equipamento médico certificado.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Esta política explica, de forma simples, quais dados o sistema trata, para quê, com quem são compartilhados e quais são os seus direitos, com base na Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).',
      },
      { tipo: 'subtitulo', texto: 'Quem é o controlador dos dados' },
      {
        tipo: 'paragrafo',
        texto:
          'O controlador é quem decide como e por que os dados são tratados. No Zelo, o controlador é: [NOME E CONTATO DO CONTROLADOR A DEFINIR].',
      },
      { tipo: 'subtitulo', texto: 'Palavras que usamos' },
      {
        tipo: 'glossario',
        itens: [
          {
            termo: 'Titular',
            definicao: 'você, a pessoa a quem os dados se referem.',
          },
          {
            termo: 'Pessoa monitorada',
            definicao: 'quem usa a pulseira.',
          },
          {
            termo: 'Responsável',
            definicao:
              'familiar, cuidador ou profissional de saúde que acompanha a pessoa monitorada pelo site.',
          },
          {
            termo: 'Dado pessoal',
            definicao:
              'qualquer informação que identifica ou pode identificar uma pessoa, como nome, e-mail ou localização.',
          },
          {
            termo: 'Tratamento',
            definicao:
              'qualquer uso dos dados: coletar, guardar, consultar, compartilhar ou apagar.',
          },
        ],
      },
      {
        tipo: 'destaque',
        texto:
          'Estado atual do projeto: o sistema está em desenvolvimento. Esta política descreve os dados que ele foi projetado para tratar, conforme o modelo de dados atual. Se algo mudar, esta página será atualizada.',
      },
    ],
  },
  {
    id: 'dados-coletados',
    titulo: 'Quais dados coletamos',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Coletamos os dados necessários para localizar a pessoa, identificar possíveis quedas e permitir que os responsáveis acompanhem tudo pelo site.',
      },
      { tipo: 'subtitulo', texto: 'Localização (GPS)' },
      {
        tipo: 'lista',
        itens: [
          'Latitude e longitude da pulseira.',
          'Altitude (em metros) e precisão estimada da posição (em metros).',
          'Data e hora de cada registro.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Movimento e possíveis quedas' },
      {
        tipo: 'lista',
        itens: [
          'Aceleração e rotação nos três eixos (x, y e z), medidas pelo sensor de movimento.',
          'A indicação de que uma possível queda foi detectada.',
          'Alertas de possível queda, com a situação (pendente, reconhecido, resolvido ou falso positivo), os horários de geração, reconhecimento e resolução, e qual responsável reconheceu o alerta.',
          'Uma observação em texto sobre o alerta.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Histórico' },
      {
        tipo: 'paragrafo',
        texto:
          'Cada leitura da pulseira e cada alerta ficam registrados com data e hora. Eles formam o histórico de localização e de eventos que os responsáveis podem consultar.',
      },
      { tipo: 'subtitulo', texto: 'Dados do responsável (conta de acesso)' },
      {
        tipo: 'lista',
        itens: [
          'Nome, e-mail e telefone.',
          'Endereço: logradouro, número, complemento, bairro, cidade, estado e CEP.',
          'Senha: guardamos apenas uma versão protegida dela (um hash), nunca a senha em si.',
          'Se a conta está ativa e a data em que foi criada.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Dados da pessoa monitorada' },
      {
        tipo: 'lista',
        itens: [
          'Nome, data de nascimento e telefone.',
          'Endereço residencial.',
          'Informações médicas: tipo sanguíneo, alergias, condições de saúde, medicamentos de uso contínuo e observações.',
          'Se o cadastro está ativo e a data em que foi criado.',
        ],
      },
      {
        tipo: 'paragrafo',
        texto: 'A pessoa monitorada não precisa ter conta de acesso ao site.',
      },
      { tipo: 'subtitulo', texto: 'Pulseira e vínculos' },
      {
        tipo: 'lista',
        itens: [
          'Identificador do dispositivo, situação da pulseira (ativa, inativa ou em manutenção) e quando ela foi vinculada a uma pessoa.',
          'O vínculo entre cada responsável e cada pessoa monitorada, com o nível de acesso (administrador ou leitura), se está ativo e quando foi criado.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Dados de uso do site' },
      {
        tipo: 'paragrafo',
        texto:
          'O site não coleta dados de navegação: não usamos ferramentas de análise de audiência, de rastreamento ou de publicidade. O único dado guardado no seu navegador é a preferência de tema, explicada na seção 9.',
      },
    ],
  },
  {
    id: 'finalidades',
    titulo: 'Por que coletamos (finalidades)',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto: 'Usamos os dados apenas para as finalidades abaixo:',
      },
      {
        tipo: 'lista',
        itens: [
          'Mostrar a localização atual da pessoa monitorada no mapa.',
          'Identificar movimentos compatíveis com uma possível queda.',
          'Gerar e enviar alertas aos responsáveis e acompanhar o atendimento de cada alerta.',
          'Manter o histórico de localização e de eventos.',
          'Controlar quem pode acessar os dados de quem (contas, vínculos e níveis de acesso).',
          'Disponibilizar o endereço e informações médicas mínimas aos responsáveis autorizados, para ajudar em uma emergência.',
          'Avaliar e melhorar o funcionamento do sistema, como a precisão da detecção de quedas.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Base legal (por que a lei permite)' },
      {
        tipo: 'paragrafo',
        texto:
          'Tratamos os dados principalmente com base no consentimento da pessoa monitorada ou, quando ela não puder consentir sozinha, de seu responsável legal. Em situações de risco, como uma possível queda, o tratamento também pode se apoiar na proteção da vida ou da incolumidade física (LGPD, arts. 7º e 11).',
      },
      {
        tipo: 'paragrafo',
        texto:
          'A base legal exata de cada tratamento ainda precisa ser confirmada: [BASE LEGAL A CONFIRMAR EM REVISÃO JURÍDICA].',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Não usamos os dados para finalidades diferentes destas sem avisar e, quando necessário, sem pedir um novo consentimento.',
      },
    ],
  },
  {
    id: 'dados-sensiveis',
    titulo: 'Dados sensíveis e cuidado especial',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto: 'Algumas informações merecem um cuidado reforçado:',
      },
      {
        tipo: 'lista',
        itens: [
          'As informações médicas (tipo sanguíneo, alergias, condições de saúde e medicamentos) são dados pessoais sensíveis pela LGPD, porque se referem à saúde.',
          'Localização e alertas de queda nem sempre são classificados como sensíveis pela lei, mas podem revelar a rotina, os hábitos e a condição de saúde de uma pessoa. Por isso, recebem o mesmo cuidado.',
        ],
      },
      { tipo: 'paragrafo', texto: 'Na prática, isso significa que:' },
      {
        tipo: 'lista',
        itens: [
          'Só responsáveis vinculados à pessoa monitorada podem ver os dados dela.',
          'Cada vínculo tem um nível de acesso: administrador ou leitura.',
          'As informações médicas devem ser exibidas somente a responsáveis autorizados.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Pessoas idosas e pessoas que não podem consentir sozinhas',
      },
      {
        tipo: 'paragrafo',
        texto:
          'O uso da pulseira deve ter o consentimento da pessoa monitorada. Se ela não puder consentir sozinha, o consentimento deve ser dado por seu responsável legal. Quem faz o cadastro deve ter essa autorização.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'A pessoa monitorada deve saber que usa um dispositivo que registra sua localização e seus movimentos, e que os responsáveis cadastrados podem acompanhá-los. O monitoramento deve respeitar a dignidade e a autonomia dela.',
      },
    ],
  },
  {
    id: 'compartilhamento',
    titulo: 'Como os dados são compartilhados',
    conteudo: [
      {
        tipo: 'lista',
        itens: [
          'Com os responsáveis vinculados: apenas os responsáveis cadastrados e vinculados à pessoa monitorada acessam os dados dela, de acordo com o nível de acesso.',
          'Não vendemos dados pessoais.',
          'Não compartilhamos dados com terceiros para publicidade. O código atual do sistema não usa ferramentas de publicidade nem de análise de audiência.',
          'Por obrigação legal: podemos compartilhar dados se a lei ou uma ordem judicial exigir.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Onde os dados ficam guardados' },
      {
        tipo: 'paragrafo',
        texto:
          'Os dados são guardados em um banco de dados MongoDB. Dependendo da configuração, o banco pode ficar em um serviço de nuvem (como o MongoDB Atlas), que atua apenas como infraestrutura de armazenamento. Provedor e localização dos servidores: [PROVEDOR DE HOSPEDAGEM E PAÍS DOS SERVIDORES A CONFIRMAR].',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Se os servidores ficarem fora do Brasil, seguiremos as regras da LGPD para transferência internacional de dados.',
      },
    ],
  },
  {
    id: 'seguranca',
    titulo: 'Como protegemos os dados',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Adotamos, ou nos comprometemos a adotar, as medidas abaixo. Como o sistema ainda está em desenvolvimento, algumas fazem parte do nosso objetivo e devem ser confirmadas antes de qualquer uso real.',
      },
      {
        tipo: 'lista',
        itens: [
          'Senhas: o modelo de dados guarda apenas uma versão protegida (hash) da senha, nunca a senha em si.',
          'Controle de acesso: cada responsável só vê os dados das pessoas às quais está vinculado, com nível de administrador ou de leitura.',
          'Informações médicas: exibidas somente a responsáveis autorizados.',
          'Credenciais do banco de dados: ficam em configuração fora do código-fonte.',
          'Conexão segura (objetivo): a transmissão de dados entre a pulseira, o servidor e o site deve usar HTTPS.',
          'Criptografia em repouso (objetivo): os dados guardados no banco MongoDB devem ser criptografados.',
        ],
      },
      {
        tipo: 'paragrafo',
        texto:
          'Nenhum sistema é totalmente seguro. Se ocorrer um incidente de segurança que possa causar risco ou dano relevante, comunicaremos as pessoas afetadas e a Autoridade Nacional de Proteção de Dados (ANPD), como a LGPD determina (art. 48).',
      },
    ],
  },
  {
    id: 'retencao',
    titulo: 'Por quanto tempo guardamos os dados',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Guardamos os dados pelo tempo necessário para cumprir as finalidades desta política ou obrigações legais. O sistema ainda não tem prazos definidos nem eliminação automática de dados.',
      },
      {
        tipo: 'lista',
        itens: [
          'Histórico de localização e movimento: [PRAZO DE RETENÇÃO DO HISTÓRICO A DEFINIR].',
          'Alertas de possível queda: [PRAZO DE RETENÇÃO DOS ALERTAS A DEFINIR].',
          'Conta do responsável e cadastro da pessoa monitorada: enquanto estiverem ativos e, depois disso, [PRAZO APÓS A DESATIVAÇÃO A DEFINIR].',
        ],
      },
      { tipo: 'subtitulo', texto: 'Depois que uma conta é excluída' },
      {
        tipo: 'paragrafo',
        texto:
          'No modelo de dados atual, contas e cadastros podem ser marcados como inativos. O que acontece depois, eliminação definitiva ou anonimização, ainda precisa ser definido: [PROCEDIMENTO APÓS A EXCLUSÃO DA CONTA A DEFINIR].',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Alguns dados podem ser mantidos após a exclusão se a lei exigir.',
      },
    ],
  },
  {
    id: 'direitos',
    titulo: 'Seus direitos (art. 18 da LGPD)',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto: 'Você, como titular dos dados, pode pedir a qualquer momento:',
      },
      {
        tipo: 'lista',
        itens: [
          'A confirmação de que tratamos seus dados.',
          'O acesso aos seus dados.',
          'A correção de dados incompletos, inexatos ou desatualizados.',
          'A anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desacordo com a lei.',
          'A portabilidade dos dados para outro serviço.',
          'A eliminação dos dados tratados com o seu consentimento.',
          'A informação sobre com quem compartilhamos seus dados.',
          'A informação sobre a possibilidade de não dar consentimento e sobre as consequências disso.',
          'A revogação do consentimento.',
          'A oposição a um tratamento feito sem consentimento, quando a lei estiver sendo descumprida.',
        ],
      },
      {
        tipo: 'paragrafo',
        texto:
          'Se a pessoa monitorada não puder fazer o pedido sozinha, o responsável legal pode fazê-lo por ela.',
      },
      { tipo: 'subtitulo', texto: 'Como exercer seus direitos' },
      {
        tipo: 'paragrafo',
        texto:
          'Envie sua solicitação para [E-MAIL DE CONTATO A DEFINIR], dizendo quem você é e o que deseja. Podemos pedir informações para confirmar sua identidade, para proteger seus dados. Responderemos em até [PRAZO DE RESPOSTA ÀS SOLICITAÇÕES A DEFINIR].',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
      },
      {
        tipo: 'destaque',
        texto:
          'Atenção: revogar o consentimento ou pedir a eliminação de dados pode impedir o funcionamento da pulseira e o envio de alertas.',
      },
    ],
  },
  {
    id: 'cookies',
    titulo: 'Cookies e armazenamento local',
    conteudo: [
      {
        tipo: 'lista',
        itens: [
          'Cookies: o código atual do site não define cookies, e não usamos cookies de rastreamento, de análise ou de publicidade.',
          'Armazenamento local (localStorage): guardamos no seu navegador apenas a sua preferência de tema, claro ou escuro (chave zelo:theme). Ela não identifica você e não sai do seu dispositivo.',
        ],
      },
      {
        tipo: 'paragrafo',
        texto:
          'Para apagar essa preferência, limpe os dados do site nas configurações do seu navegador.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'O site ainda não tem login. Quando tiver, o método usado para manter você conectado será descrito aqui: [MECANISMO DE SESSÃO A DEFINIR: COOKIE OU ARMAZENAMENTO LOCAL].',
      },
    ],
  },
  {
    id: 'limitacoes',
    titulo: 'Limitações do projeto',
    conteudo: [
      {
        tipo: 'lista',
        itens: [
          'O Zelo é uma prova de conceito e não é um equipamento médico certificado.',
          'A detecção de quedas pode ter falsos positivos (alerta sem queda) e falsos negativos (queda não identificada). Por isso o sistema tem a situação "falso positivo" para os alertas.',
          'A precisão do GPS varia e pode ser menor em ambientes fechados ou com sinal fraco.',
          'O Zelo não substitui atendimento de emergência nem supervisão profissional.',
        ],
      },
      {
        tipo: 'destaque',
        texto: 'Em caso de emergência, ligue para o SAMU: 192.',
      },
    ],
  },
  {
    id: 'alteracoes',
    titulo: 'Alterações nesta política',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Podemos atualizar esta política, por exemplo quando o sistema mudar ou quando definirmos os pontos que ainda estão em aberto.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'A versão em vigor é sempre a desta página, com a data de "Última atualização" no topo.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Se a mudança for relevante, avisaremos os responsáveis cadastrados: [FORMA DE AVISO DE ALTERAÇÕES A DEFINIR: E-MAIL OU AVISO NO SITE].',
      },
    ],
  },
  {
    id: 'contato',
    titulo: 'Contato',
    conteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Dúvidas, solicitações ou reclamações sobre os seus dados podem ser enviadas para:',
      },
      {
        tipo: 'lista',
        itens: [
          'Encarregado pelo tratamento de dados (DPO): [NOME DO ENCARREGADO (DPO) A DEFINIR].',
          'E-mail: [E-MAIL DE CONTATO A DEFINIR].',
          'Controlador: [NOME E CONTATO DO CONTROLADOR A DEFINIR].',
        ],
      },
      {
        tipo: 'link',
        texto:
          'Você também pode falar com a equipe de desenvolvimento pela página de Contato.',
        para: '/contato',
      },
    ],
  },
];
