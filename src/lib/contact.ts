import { site } from '../config/site';

const MAX_MESSAGE = 1500;

/** Remove caracteres de controle e limita o tamanho do texto enviado. */
export function sanitize(value: string, max = 500): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
}

export const whatsappNumber = site.contact.whatsapp.replace(/\D/g, '');
export const hasWhatsapp = whatsappNumber.length >= 12;

/** Link para iniciar conversa. Sem WhatsApp configurado, abre o Direct do Instagram. */
export function contactHref(message: string): string {
  const text = sanitize(message, MAX_MESSAGE);
  if (hasWhatsapp) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
  return `https://ig.me/m/${encodeURIComponent(site.brands.lab.instagram)}`;
}

export function serviceMessage(serviceName: string): string {
  return `Olá! Vi o site e gostaria de um orçamento para: ${serviceName}.`;
}

export const contactChannelLabel = hasWhatsapp ? 'WhatsApp' : 'Instagram';
