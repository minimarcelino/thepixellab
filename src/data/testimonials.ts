/**
 * DEPOIMENTOS — somente avaliações reais, com autorização do cliente.
 * Enquanto a lista estiver vazia, a seção e o item do menu ficam ocultos.
 *
 * Modelo:
 * {
 *   name: 'Nome do cliente',
 *   service: 'Fotografia esportiva',
 *   quote: 'Comentário do cliente...',
 *   photo: '/images/depoimentos/nome.webp',   // opcional
 * }
 */
export interface Testimonial {
  name: string;
  service: string;
  quote: string;
  photo?: string;
}

export const testimonials: Testimonial[] = [];
