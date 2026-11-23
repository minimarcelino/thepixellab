import { ArrowRight, Aperture } from 'lucide-react';
import { DesignBoard, SystemsWindow } from '../components/Illustrations';
import { site, instagramUrl } from '../config/site';
import { SectionHeading } from '../components/SectionHeading';
import { Placeholder } from '../components/Placeholder';
import { InstagramIcon } from '../components/BrandIcons';
import { PixelsLogo, LabLogo } from '../components/Logo';
import type { ProjectCategory } from '../data/projects';

interface Props {
  onShowProjects: (cat: ProjectCategory) => void;
}

export function Areas({ onShowProjects }: Props) {
  const { pixels, lab } = site.brands;

  return (
    <section id="areas" aria-labelledby="areas-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Nossas áreas"
          id="areas-title"
          title="Duas marcas. Uma mesma forma de criar."
          intro="Cada marca tem sua especialidade. Juntas, cobrem do registro do momento à presença digital completa."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* MV.Pixels — editorial, claro */}
          <article className="reveal on-light group flex flex-col overflow-hidden rounded-3xl bg-paper text-ink" aria-labelledby="area-pixels">
            <div className="relative aspect-[16/10] overflow-hidden">
              {site.images.areaPixels ? (
                <img src={site.images.areaPixels} alt="Retrato de atleta em frente à rede, na luz do fim de tarde" width={1066} height={1600} loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_12%] transition-transform duration-700 ease-out-soft group-hover:scale-105" />
              ) : (
                <Placeholder label="Foto & Vídeo" icon={Aperture} tone="light" seed={3} className="h-full w-full" />
              )}
              <span className="absolute left-5 top-5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper">Foto & Vídeo</span>
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <PixelsLogo className="text-2xl" />
              <p className="eyebrow mt-2 text-muted-dark">{pixels.tagline}</p>
              <h3 id="area-pixels" className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">{pixels.message}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">
                Fotografia esportiva, eventos, produção audiovisual e conteúdo para marcas — com olhar atento para o que é autêntico.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {['Futevôlei', 'Beach tennis', 'Vôlei', 'Eventos', 'Reels', 'Tempo real'].map((t) => (
                  <li key={t} className="rounded-full border border-ink/15 px-3 py-1 text-sm">{t}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                <button type="button" onClick={() => onShowProjects('esportiva')} className="btn-dark group/btn">
                  Ver projetos <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </button>
                <a href={instagramUrl(pixels.instagram)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-ink/70 hover:text-ink">
                  <InstagramIcon size={18} /> @{pixels.instagram}
                </a>
              </div>
            </div>
          </article>

          {/* The Pixel Lab — tecnológico, escuro */}
          <article className="reveal group flex flex-col overflow-hidden rounded-3xl border border-paper/10 bg-graphite/50" aria-labelledby="area-lab" style={{ '--delay': '120ms' } as React.CSSProperties}>
            <div className="relative aspect-[16/10] overflow-hidden">
              {site.images.areaLab ? (
                <img src={site.images.areaLab} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
              ) : (
                <div className="grid h-full w-full grid-cols-2 transition-transform duration-700 ease-out-soft group-hover:scale-105">
                  <DesignBoard className="h-full w-full" />
                  <SystemsWindow className="h-full w-full" />
                </div>
              )}
              <span className="absolute left-5 top-5 rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-ink">Design, Marketing & Systems</span>
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <LabLogo className="text-paper" />
              <p className="eyebrow mt-2 text-muted">{lab.tagline}</p>
              <h3 id="area-lab" className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">{lab.message}</h3>
              <p className="mt-3 leading-relaxed text-paper/70">
                Identidade visual, materiais gráficos, comunicação digital e soluções web para quem quer uma presença profissional.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {['Logotipos', 'Social media', 'Carrosséis', 'E-books', 'Landing pages', 'Sites'].map((t) => (
                  <li key={t} className="rounded-full border border-paper/15 px-3 py-1 text-sm text-paper/85">{t}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                <button type="button" onClick={() => onShowProjects('identidade')} className="btn-primary group/btn">
                  Ver projetos <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </button>
                <a href={instagramUrl(lab.instagram)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-paper/70 hover:text-paper">
                  <InstagramIcon size={18} /> @{lab.instagram}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
