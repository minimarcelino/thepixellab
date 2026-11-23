import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Política de segurança de conteúdo (CSP) inserida só no build de produção.
 * Também está em public/_headers (Netlify/Cloudflare) e vercel.json, onde vale mais
 * (inclui frame-ancestors). Se for exibir vídeos/imagens de outro domínio, já são aceitos via https:.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: https:",
  "media-src 'self' https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const cspMeta = (): Plugin => ({
  name: 'csp-meta',
  apply: 'build',
  transformIndexHtml: (html) =>
    html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
});

export default defineConfig({
  plugins: [react(), tailwindcss(), cspMeta()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
