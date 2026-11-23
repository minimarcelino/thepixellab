# The Pixel Lab + MV.Pixels — Landing page

Landing page das marcas **The Pixel Lab** (Design • Marketing • Systems) e **MV.Pixels** (Photography • Video • Content).

React 19 + TypeScript + Tailwind CSS 4 + Vite. Ícones: Lucide. Fonte Manrope hospedada no próprio site (sem Google Fonts).

---

## ⚠️ O que você precisa preencher

| O quê | Onde |
|---|---|
| Número do WhatsApp (ex.: `5518999999999`) | `src/config/site.ts` → `contact.whatsapp` |
| E-mail profissional (opcional) | `src/config/site.ts` → `contact.email` |
| Seu nome (opcional) | `src/config/site.ts` → `ownerName` |
| Sua foto | `public/images/about/` + `src/config/site.ts` → `images.portrait` |
| Logos reais (opcional) | `public/images/` + `brands.lab.logo` / `brands.pixels.logo` |
| Imagens do hero e das áreas | `src/config/site.ts` → `images.hero`, `images.areaPixels`, `images.areaLab` |
| Projetos reais do portfólio | `src/data/projects.ts` |
| Depoimentos reais | `src/data/testimonials.ts` |
| Domínio final | `index.html` (canonical e og), `public/robots.txt`, `public/sitemap.xml`, `src/config/site.ts` → `url` |

**Sem WhatsApp configurado**, todos os botões de orçamento abrem o Direct do Instagram (@mv.thepixellab) e o formulário copia a mensagem para a área de transferência. Assim o site já funciona antes do número ser definido.

---

## Rodar no computador

Requisito: Node.js 20 ou mais recente.

```bash
npm install
npm run dev        # abre em http://localhost:5173
```

## Gerar a versão de publicação

```bash
npm run build      # verifica tipos e gera a pasta dist/
npm run preview    # testa a versão final localmente
```

## Publicar

A pasta `dist/` é um site estático: pode ir para Vercel, Netlify, Cloudflare Pages ou GitHub Pages.

- **Vercel**: importe o repositório → framework "Vite" → pronto. Os cabeçalhos de segurança estão em `vercel.json`.
- **Netlify / Cloudflare Pages**: build `npm run build`, pasta `dist`. Os cabeçalhos estão em `public/_headers`.
- **GitHub Pages**: já configurado em `.github/workflows/deploy.yml`. No repositório, vá em *Settings → Pages → Source* e escolha **GitHub Actions**. A cada `git push` na branch `main`, o site é publicado em `https://minimarcelino.github.io/<nome-do-repositorio>/`. O GitHub Pages não aceita cabeçalhos personalizados, mas a política de segurança básica já vai embutida no HTML durante o build.

---

## Como atualizar o conteúdo

### Adicionar um projeto ao portfólio
1. Exporte as fotos em **.webp** (ou .avif), com até ~1600 px no lado maior. Use o [Squoosh](https://squoosh.app) se quiser.
2. Coloque em `public/images/portfolio/nome-do-projeto/` e use o caminho com `asset('/images/...')`, para funcionar também no GitHub Pages.
3. Em `src/data/projects.ts`, copie o modelo comentado no topo do arquivo e preencha.
4. Remova os exemplos com `placeholder: true` quando tiver trabalhos reais da mesma categoria.

Cada projeto aceita capa, galeria com várias imagens, vídeo (`video.src`) e link para a publicação no Instagram.

> Vídeos: prefira MP4 (H.264) curto e leve (até ~10 MB) em `public/videos/`. Para vídeos maiores, hospede fora e use a URL https.

### Depoimentos
Adicione objetos em `src/data/testimonials.ts`. A seção e o item no menu aparecem sozinhos quando a lista deixa de estar vazia. Use só avaliações reais e autorizadas.

### Serviços
Edite `src/data/services.ts`. O formulário de orçamento usa essa mesma lista.

### Cores e fontes
`src/index.css`, bloco `@theme`.

---

## Estrutura

```
src/
  config/site.ts         ← contatos, Instagram, nomes, imagens (comece por aqui)
  data/                  ← serviços, projetos, depoimentos
  lib/contact.ts         ← links do WhatsApp/Instagram e limpeza de texto
  hooks/useReveal.ts     ← animação ao rolar
  components/            ← Header, logos, modal do projeto, botão flutuante, etc.
  sections/              ← cada seção da página
public/                  ← favicon, og-image, robots, sitemap, imagens, _headers
```

## Segurança, desempenho e acessibilidade

- Sem backend e sem coleta de dados: o formulário só monta uma mensagem que a pessoa envia pelo WhatsApp/Instagram.
- Content Security Policy rígida (sem scripts inline, sem terceiros), `X-Frame-Options`, `nosniff`, `Referrer-Policy`, HSTS.
- Links externos com `rel="noopener noreferrer"`; textos do formulário sanitizados e com limite de tamanho.
- Animações feitas em CSS + IntersectionObserver (sem biblioteca de animação), respeitando "reduzir movimento".
- Imagens com `loading="lazy"`, fontes locais com subset por idioma.
- Navegação por teclado, link "pular para o conteúdo", foco visível, modais com `<dialog>` nativo, labels e mensagens de erro ligadas aos campos.
