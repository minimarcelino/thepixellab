import { asset } from '../lib/asset';

/**
 * ============================================================
 *  PORTFÓLIO
 *  Para cadastrar um trabalho real:
 *   1. Coloque as imagens em /public/images/portfolio/<pasta-do-projeto>/
 *      (prefira .webp ou .avif, até ~1600px no lado maior).
 *   2. Copie o modelo abaixo, preencha e remova `placeholder: true`.
 *
 *  {
 *    id: 'torneio-futevolei-2026',            // único, sem espaços
 *    title: 'Torneio de Futevôlei',
 *    category: 'esportiva',
 *    brand: 'pixels',
 *    description: 'Cobertura completa do torneio...',
 *    cover: { src: asset('/images/portfolio/futevolei/capa.webp'), alt: 'Atleta cabeceando a bola na areia', width: 1200, height: 1500 },
 *    gallery: [ { src: '...', alt: '...', width: 1600, height: 1067 } ],
 *    video: { src: asset('/videos/lances.mp4'), poster: asset('/images/...webp') },   // opcional
 *    link: 'https://www.instagram.com/p/...',                            // opcional
 *  }
 *
 *  Os itens com `placeholder: true` são apenas EXEMPLOS DE CATEGORIA,
 *  não projetos reais — aparecem com o selo "Em breve".
 * ============================================================
 */

export type ProjectCategory =
  | 'esportiva'
  | 'eventos'
  | 'videos'
  | 'identidade'
  | 'design'
  | 'digitais';

export const categories: { id: 'todos' | ProjectCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'esportiva', label: 'Fotografia esportiva' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'videos', label: 'Vídeos' },
  { id: 'identidade', label: 'Identidade visual' },
  { id: 'design', label: 'Design gráfico' },
  { id: 'digitais', label: 'Projetos digitais' },
];

export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  brand: 'pixels' | 'lab';
  description: string;
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  video?: { src: string; poster?: string };
  link?: string;
  placeholder?: boolean;
  /** Ilustração de serviço usada enquanto não houver imagem real. */
  art?: 'design' | 'systems';
}

export const projects: Project[] = [
  {
    id: 'exemplo-futevolei',
    title: 'Cobertura de Futevôlei',
    category: 'esportiva',
    brand: 'pixels',
    description: 'Fotografias de partidas, atletas, melhores lances e registros de eventos esportivos.',
    placeholder: true,
  },
  {
    id: 'beach-tennis',
    title: 'Beach Tennis',
    category: 'esportiva',
    brand: 'pixels',
    description: 'Atletas em movimento durante treinos na areia: o saque, a concentração e a luz do fim de tarde.',
    cover: { src: asset('/images/portfolio/bt-treino-900.webp'), alt: 'Atleta de beach tennis treinando na areia, ao lado de um cesto de bolinhas', width: 600, height: 900 },
    gallery: [
      { src: asset('/images/portfolio/bt-saque-1600.webp'), alt: 'Atleta de camisa laranja no momento do saque, com a raquete atrás da cabeça', width: 1066, height: 1600 },
    ],
  },
  {
    id: 'retratos-atletas',
    title: 'Retratos de Atletas',
    category: 'esportiva',
    brand: 'pixels',
    description: 'Retratos com a luz dourada do fim de tarde, valorizando a personalidade de cada atleta dentro e fora da quadra.',
    cover: { src: asset('/images/portfolio/retrato-rede-900.webp'), alt: 'Atleta de braços cruzados em frente à rede, olhando para o lado', width: 600, height: 900 },
    gallery: [
      { src: asset('/images/portfolio/retrato-sol-1600.webp'), alt: 'Retrato de atleta de cabelo platinado iluminado pelo sol, com olhar intenso', width: 1066, height: 1600 },
    ],
  },
  {
    id: 'exemplo-eventos',
    title: 'Cobertura de Eventos',
    category: 'eventos',
    brand: 'pixels',
    description: 'Registros de ambientes, participantes, atividades e momentos importantes.',
    placeholder: true,
  },
  {
    id: 'exemplo-melhores-lances',
    title: 'Vídeos de Melhores Lances',
    category: 'videos',
    brand: 'pixels',
    description: 'Seleção e edição de jogadas esportivas para publicação nas redes sociais.',
    placeholder: true,
  },
  {
    id: 'exemplo-conteudo-marcas',
    title: 'Conteúdo para Marcas',
    category: 'design',
    brand: 'lab',
    description: 'Fotografias, vídeos e peças visuais desenvolvidas para comunicação e divulgação.',
    placeholder: true,
  },
  {
    id: 'exemplo-identidade',
    title: 'Identidade Visual',
    category: 'identidade',
    brand: 'lab',
    description: 'Desenvolvimento de logotipos e elementos gráficos para diferentes necessidades.',
    placeholder: true,
    art: 'design',
  },
  {
    id: 'exemplo-materiais',
    title: 'Materiais Profissionais',
    category: 'design',
    brand: 'lab',
    description: 'Criação de papel timbrado, e-books e documentos personalizados.',
    placeholder: true,
  },
  {
    id: 'exemplo-landing-page',
    title: 'Landing Pages e Sites',
    category: 'digitais',
    brand: 'lab',
    description: 'Páginas rápidas, responsivas e pensadas para facilitar o contato com clientes.',
    placeholder: true,
    art: 'systems',
  },
];
