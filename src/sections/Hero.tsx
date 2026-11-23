import { ArrowDown, ArrowRight } from 'lucide-react';
import { site } from '../config/site';
import { DesignBoard, SystemsWindow } from '../components/Illustrations';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

const tiles = [
  { label: 'Photography', sub: 'MV.Pixels', tone: 'dark' as const, Art: null, alt: 'Atleta de beach tennis no saque, fotografado ao pôr do sol', pos: '50% 25%' },
  { label: 'Design', sub: 'The Pixel Lab', tone: 'light' as const, Art: DesignBoard, alt: 'Logotipo Manoel Ribeiro Advogado criado pela The Pixel Lab', pos: '50% 40%' },
  { label: 'Systems', sub: 'The Pixel Lab', tone: 'lime' as const, Art: SystemsWindow, alt: 'Aplicativo de finanças FinançaIA aberto em um celular', pos: '50% 20%' },
];

export function Hero() {
  const heroImages = site.images.hero;

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 md:pt-36">
      <div className="pixel-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />

      <div className="container-x grid items-end gap-12 pb-16 md:pb-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted animate-rise">
            <span className="flex items-center gap-2 text-paper">
              <span className="h-2 w-2 bg-lime animate-blink" aria-hidden="true" />
              Estúdio criativo
            </span>
            <span aria-hidden="true">/</span>
            <span>{site.city}</span>
          </p>

          <h1 id="hero-title" className="text-balance text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl xl:text-[5.5rem] animate-rise" style={delay(80)}>
            Criatividade que transforma ideias em <span className="relative whitespace-nowrap text-lime">resultados<span className="text-paper">.</span></span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-paper/75 md:text-xl animate-rise" style={delay(160)}>
            Fotografia, vídeos, design e soluções digitais para dar vida à sua marca.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-rise" style={delay(240)}>
            <a href="#portfolio" className="btn-primary group">
              Conheça meus trabalhos
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#contato" className="btn-ghost">Solicitar orçamento</a>
          </div>
        </div>

        {/* Composição visual */}
        <div className="lg:col-span-5 animate-rise" style={delay(320)}>
          <div className="grid h-[20rem] grid-cols-2 grid-rows-2 gap-3 sm:h-[28rem]">
            {tiles.map((t, i) => {
              const img = heroImages[i];
              const span = i === 0 ? 'row-span-2' : '';
              return (
                <figure key={t.label} className={`group relative overflow-hidden rounded-2xl ring-1 ring-paper/10 ${span}`}>
                  {img ? (
                    <img src={img} alt={t.alt} style={{ objectPosition: t.pos }} className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" fetchPriority={i === 0 ? 'high' : 'auto'} />
                  ) : t.Art ? (
                    <t.Art className="h-full w-full transition-transform duration-700 ease-out-soft group-hover:scale-105" />
                  ) : null}
                  <figcaption className={`absolute bottom-0 left-0 right-0 flex flex-col-reverse items-start gap-1 p-4 pt-10 ${
                    t.tone === 'lime'
                      ? 'bg-gradient-to-t from-lime via-lime/85 to-transparent text-ink'
                      : img
                        ? 'bg-gradient-to-t from-ink/90 via-ink/40 to-transparent text-paper'
                        : t.tone === 'dark'
                          ? 'text-paper'
                          : 'bg-gradient-to-t from-paper-2 via-paper-2/90 to-transparent text-ink'
                  }`}>
                    <span className="text-lg font-bold leading-none">{t.label}</span>
                    <span className="eyebrow text-[0.62rem] opacity-70">{t.sub}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      {/* Faixa das marcas */}
      <div className="border-y border-paper/10">
        <div className="container-x grid gap-px sm:grid-cols-2">
          <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pr-8">
            <span className="font-bold tracking-tight">THE PIXEL LAB</span>
            <span className="eyebrow text-muted">{site.brands.lab.tagline}</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-paper/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:border-l sm:border-t-0 sm:pl-8">
            <span className="font-bold tracking-tight">MV.PIXELS</span>
            <span className="eyebrow text-muted">{site.brands.pixels.tagline}</span>
          </div>
        </div>
      </div>

      <a href="#sobre" className="absolute bottom-24 right-8 hidden h-12 w-12 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-colors hover:text-lime xl:flex" aria-label="Rolar para a próxima seção">
        <ArrowDown className="h-5 w-5 animate-float" aria-hidden="true" />
      </a>
    </section>
  );
}
