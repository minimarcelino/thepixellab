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
  /** Ponto de foco no recorte do card (CSS object-position), ex.: '50% 30%'. */
  position?: string;
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
    id: 'cobertura-atleta',
    title: 'Cobertura de Atleta',
    category: 'esportiva',
    brand: 'pixels',
    description: 'Registro individual da atleta em quadra: concentração, preparação e os detalhes que contam a história de cada jogo.',
    cover: { src: asset('/images/portfolio/atleta-futevolei-900.webp'), alt: 'Atleta de uniforme branco e rosa segurando uma bola de futevôlei amarela e preta', width: 675, height: 900 },
    gallery: [
      { src: asset('/images/portfolio/atleta-futevolei-1600.webp'), alt: 'Atleta de uniforme branco e rosa segurando uma bola de futevôlei amarela e preta', width: 1200, height: 1600 },
    ],
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
    id: 'cobertura-eventos',
    title: 'Cobertura de Eventos',
    category: 'eventos',
    brand: 'pixels',
    description: 'Eventos esportivos, aulas coletivas, inaugurações e ações comerciais: o ambiente, os participantes e a energia de cada momento.',
    cover: { src: asset('/images/portfolio/evento-academia-900.webp'), alt: 'Aula coletiva na areia, com a instrutora de costas e alunas dançando e sorrindo', width: 600, height: 900 },
    gallery: [
      { src: asset('/images/portfolio/evento-academia-1600.webp'), alt: 'Aula coletiva na areia, com a instrutora de costas e alunas dançando e sorrindo', width: 1066, height: 1600 },
    ],
  },
  {
    id: 'melhores-lances-futevolei',
    title: 'Melhores Lances de Futevôlei',
    category: 'videos',
    brand: 'pixels',
    description: 'Seleção e edição das melhores jogadas em vídeo vertical, no formato ideal para Reels e stories.',
    cover: { src: asset('/images/portfolio/lances-poster-900.webp'), alt: 'Dois atletas de futevôlei disputando a bola na areia', width: 506, height: 900, position: '50% 58%' },
    video: { src: asset('/videos/melhores-lances-futevolei.mp4'), poster: asset('/images/portfolio/lances-poster-900.webp') },
  },
  {
    id: 'logo-manoel-ribeiro',
    title: 'Logotipo — Manoel Ribeiro Advogado',
    category: 'identidade',
    brand: 'lab',
    description: 'Monograma que une as letras M e R a uma coluna clássica, símbolo de solidez e justiça. Dourado e prata sobre preto, para uma presença sóbria e elegante.',
    cover: { src: asset('/images/portfolio/logo-manoel-ribeiro-800.webp'), alt: 'Logotipo Manoel Ribeiro Advogado: monograma MR dourado e prateado com uma coluna clássica, sobre fundo preto', width: 800, height: 800 },
    gallery: [
      { src: asset('/images/portfolio/logo-manoel-ribeiro-1200.webp'), alt: 'Logotipo Manoel Ribeiro Advogado em alta resolução', width: 1200, height: 1200 },
    ],
  },
  {
    id: 'landing-giovana',
    title: 'Landing Page — Giovana Oliveira Massoterapia',
    category: 'digitais',
    brand: 'lab',
    description: 'Site de uma página para massoterapeuta, com serviços, agendamento direto pelo WhatsApp, localização e dúvidas frequentes. Leve, adaptado ao celular e pensado para converter visitas em agendamentos.',
    cover: { src: asset('/images/portfolio/landing-giovana-900.webp'), alt: 'Landing page da massoterapeuta Giovana Oliveira exibida em um computador e em um celular', width: 900, height: 562 },
    gallery: [
      { src: asset('/images/portfolio/landing-giovana-1600.webp'), alt: 'Landing page em computador e celular', width: 1600, height: 1000 },
      { src: asset('/images/portfolio/landing-giovana-desktop-1600.webp'), alt: 'Página completa no computador', width: 720, height: 1600 },
      { src: asset('/images/portfolio/landing-giovana-mobile-390.webp'), alt: 'Página no celular', width: 390, height: 844 },
    ],
    link: 'https://massoterapeutagiovana.com.br/',
  },
  {
    id: 'financia-ia',
    title: 'FinançaIA — App de Finanças Pessoais',
    category: 'digitais',
    brand: 'lab',
    description: 'Aplicativo web instalável no celular para controlar gastos conversando: você escreve "gastei 45 no mercado" e a inteligência artificial registra e organiza por categoria. Tem resumo do mês, orçamento, contas a vencer e funciona como app (PWA).',
    cover: { src: asset('/images/portfolio/financia-900.webp'), alt: 'Aplicativo FinançaIA em dois celulares: tela de conversa e resumo do mês', width: 900, height: 562, position: '50% 20%' },
    gallery: [
      { src: asset('/images/portfolio/financia-1600.webp'), alt: 'Aplicativo FinançaIA em dois celulares', width: 1600, height: 1000 },
      { src: asset('/images/portfolio/financia-chat-780.webp'), alt: 'Tela de conversa do FinançaIA, onde os gastos são registrados por mensagem', width: 780, height: 1688 },
      { src: asset('/images/portfolio/financia-resumo-780.webp'), alt: 'Tela de resumo do mês do FinançaIA, com gastos por categoria (valores de exemplo)', width: 780, height: 1688 },
    ],
  },
  {
    id: 'papel-timbrado-manoel-ribeiro',
    title: 'Papel Timbrado — Manoel Ribeiro Advogado',
    category: 'design',
    brand: 'lab',
    description: 'Papel timbrado em A4 que aplica a identidade visual do escritório: monograma no cabeçalho, marca d’água discreta e rodapé com os contatos, em dourado sobre fundo claro.',
    cover: { src: asset('/images/portfolio/papel-timbrado-mockup-900.webp'), alt: 'Duas folhas do papel timbrado Manoel Ribeiro Advogado sobre fundo escuro', width: 900, height: 675, position: '50% 25%' },
    gallery: [
      { src: asset('/images/portfolio/papel-timbrado-mockup-1600.webp'), alt: 'Duas folhas do papel timbrado sobre fundo escuro', width: 1600, height: 1200 },
      { src: asset('/images/portfolio/papel-timbrado-1600.webp'), alt: 'Papel timbrado Manoel Ribeiro Advogado em página A4 inteira', width: 1132, height: 1600 },
    ],
  },
];
