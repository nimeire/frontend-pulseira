/**
 * Footer content, centralized so the provisional copy/links can be swapped
 * out later without touching the Footer component.
 *
 * `creators` is also the single source of truth for the team's contact
 * details. The Footer and the Contact page (/contato) consume it through
 * `backendCreators` / `otherCreators`; the GitHub link only lives here.
 */

import caioPhoto from '../assets/images/team/caio.avif';
import geovannyPhoto from '../assets/images/team/geovanny.avif';
import joaoPhoto from '../assets/images/team/joao.avif';
import milenaPhoto from '../assets/images/team/milena.avif';
import nicollyPhoto from '../assets/images/team/nicolly.avif';

interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface Creator {
  name: string;
  role: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  /** Photo path, once available. Falls back to an initials avatar. */
  photoUrl?: string;
}

const creators: Creator[] = [
  {
    name: 'Caio Edimar Santos Silva',
    role: 'Backend',
    githubUrl: 'https://github.com/CaioEdimarSantosSilva',
    linkedinUrl:
      'https://www.linkedin.com/in/caio-edimar-santos-silva-93a27027a/',
    email: 'caio.silva45@aluno.cps.sp.gov.br',
    photoUrl: caioPhoto,
  },
  {
    name: 'Geovanny Ferreira Elias',
    role: 'Backend',
    githubUrl: 'https://github.com/GeovannyElias',
    linkedinUrl:
      'https://www.linkedin.com/in/geovanny-ferreira-elias-278137370/',
    email: 'geovanny.elias@aluno.cps.sp.gov.br',
    photoUrl: geovannyPhoto,
  },
  {
    name: 'João Pedro da Silva de Oliveira',
    role: 'Frontend Web e App',
    githubUrl: 'https://github.com/JoaoPedrinho013',
    linkedinUrl: 'https://www.linkedin.com/in/joao-pedro-428b43271/',
    email: 'joao.oliveira58@aluno.cps.sp.gov.br',
    photoUrl: joaoPhoto,
  },
  {
    name: 'Milena Takahashi Rodrigues',
    role: 'Design e Documentação',
    githubUrl: 'https://github.com/MilenaTakrod',
    linkedinUrl: 'https://www.linkedin.com/in/milena-takahashi-rodrigues/',
    email: 'milena.rodrigues@aluno.cps.sp.gov.br',
    photoUrl: milenaPhoto,
  },
  {
    name: 'Nicolly Vitória Meireles da Silva',
    role: 'Backend',
    githubUrl: 'https://github.com/nimeire',
    linkedinUrl: 'https://www.linkedin.com/in/nicolly-meireles-67943a346/',
    email: 'nicolly.silva14@aluno.cps.sp.gov.br',
    photoUrl: nicollyPhoto,
  },
];

const BACKEND_ROLE = 'Backend';

/** Backend developers, in their original order. */
export const backendCreators: readonly Creator[] = creators.filter(
  (creator) => creator.role === BACKEND_ROLE,
);

/** Everyone else (frontend and design), in their original order. */
export const otherCreators: readonly Creator[] = creators.filter(
  (creator) => creator.role !== BACKEND_ROLE,
);

export const footerColumns: FooterColumn[] = [
  {
    title: 'Produto',
    links: [
      { label: 'Como funciona', href: '/sobre#como-funciona' },
      { label: 'Sensores', href: '/sensores' },
      { label: 'Benefícios', href: '/sobre#beneficios' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre o projeto', href: '/sobre' },
      { label: 'Contato', href: '/contato' },
      { label: 'Política de privacidade', href: '/privacidade' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de ajuda', href: '#' },
      { label: 'Perguntas frequentes', href: '/faq' },
    ],
  },
];

export const copyrightHolder = 'Zelo';
