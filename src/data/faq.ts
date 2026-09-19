export interface FaqItem {
  id: number;
  pergunta: string;
  resposta: string;
}

/** How many questions each page of the FAQ shows. */
export const PERGUNTAS_POR_PAGINA = 5;

// TODO: substituir pelas respostas reais
export const faq: readonly FaqItem[] = [
  {
    id: 1,
    pergunta: 'O que é o Zelo?',
    resposta:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    pergunta: 'Como a pulseira funciona?',
    resposta:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    id: 3,
    pergunta: 'Como a queda é detectada?',
    resposta:
      'Sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
  },
  {
    id: 4,
    pergunta: 'A pulseira funciona sem celular?',
    resposta:
      'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit.',
  },
  {
    id: 5,
    pergunta: 'Como acompanho a localização?',
    resposta:
      'Etiam tempor orci eu lectus. Aenean pharetra magna ac placerat vestibulum, lectus ante fringilla nisi, vitae dignissim mauris ligula sit amet lorem. Praesent blandit laoreet nibh, fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue.',
  },
  {
    id: 6,
    pergunta: 'Quem pode acompanhar o usuário?',
    resposta:
      'Maecenas fermentum consequat mi. Donec fermentum, pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.',
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
      'Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero.',
  },
  {
    id: 9,
    pergunta: 'A pulseira é um equipamento médico?',
    resposta:
      'Vestibulum enim nisi, suscipit id, tincidunt ut, faucibus ac, nisi. Fusce vulputate eleifend sapien, vestibulum purus quam scelerisque ut, mollis sed nisl.',
  },
  {
    id: 10,
    pergunta: 'Como entro em contato com o suporte?',
    resposta:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci, aenean nec lorem in porta velit, ultricies nec. Suspendisse potenti, morbi quis tellus.',
  },
];
