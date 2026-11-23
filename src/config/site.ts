import { asset } from '../lib/asset';

/**
 * ============================================================
 *  CONFIGURAÇÃO PRINCIPAL DO SITE
 *  Edite este arquivo para trocar contatos, links e textos-base.
 *  Campos marcados com  ⚠️ PREENCHER  ainda precisam de dados reais.
 * ============================================================
 */

export const site = {
  /** URL final do site (usada em SEO e compartilhamento). ⚠️ PREENCHER após publicar */
  url: 'https://seu-dominio.com.br',
  city: 'Presidente Epitácio – SP',

  /** Nome da profissional exibido na seção "Sobre". ⚠️ PREENCHER (opcional) */
  ownerName: 'Vivi',

  contact: {
    /**
     * WhatsApp com DDI + DDD + número, somente dígitos.
     * Exemplo: '5518999999999'  ⚠️ PREENCHER
     * Enquanto estiver vazio, os botões de orçamento abrem o Direct do Instagram.
     */
    whatsapp: '',
    /** E-mail profissional. Deixe vazio para ocultar. ⚠️ PREENCHER (opcional) */
    email: '',
  },

  brands: {
    lab: {
      name: 'The Pixel Lab',
      tagline: 'Design • Marketing • Systems',
      instagram: 'mv.thepixellab',
      message: 'Da ideia à criação. Do conceito à solução.',
      /** Caminho do logo em /public (ex.: asset('/images/logo-pixellab.svg')). Vazio = logo tipográfico. */
      logo: '',
    },
    pixels: {
      name: 'MV.Pixels',
      tagline: 'Photography • Video • Content',
      instagram: 'mv.pixels',
      message: 'Momentos que merecem ser registrados.',
      logo: '',
    },
  },

  /** Imagens opcionais. Coloque os arquivos em /public/images e informe o caminho. */
  images: {
    /** Foto da profissional na seção "Sobre". ⚠️ PREENCHER */
    portrait: asset('/images/about/portrait-800.webp'),
    /** Imagens das áreas (cards MV.Pixels e The Pixel Lab). Vazio = ilustração. */
    areaPixels: asset('/images/portfolio/retrato-rede-1600.webp'),
    areaLab: '',
    /**
     * Imagens do hero, na ordem: Photography, Design, Systems.
     * Vazio ('') = ilustração própria do serviço.
     */
    hero: [asset('/images/portfolio/bt-saque-900.webp'), '', ''] as string[],
  },
} as const;

export const instagramUrl = (handle: string) =>
  `https://www.instagram.com/${encodeURIComponent(handle)}/`;
