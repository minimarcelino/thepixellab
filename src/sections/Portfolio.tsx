import { useMemo, useState } from 'react';
import { Plus, Play, Camera, CalendarDays, Clapperboard, Fingerprint, PenTool, Code2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { categories, projects, type Project, type ProjectCategory } from '../data/projects';
import { SectionHeading } from '../components/SectionHeading';
import { Placeholder } from '../components/Placeholder';
import { ProjectModal } from '../components/ProjectModal';
import { DesignBoard, SystemsWindow } from '../components/Illustrations';
import { useReveal } from '../hooks/useReveal';

export type Filter = 'todos' | ProjectCategory;

const categoryIcon: Record<ProjectCategory, LucideIcon> = {
  esportiva: Camera,
  eventos: CalendarDays,
  videos: Clapperboard,
  identidade: Fingerprint,
  design: PenTool,
  digitais: Code2,
};

export const categoryLabel = (c: ProjectCategory) => categories.find((x) => x.id === c)?.label ?? c;

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
}

export function Portfolio({ filter, onFilter }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const visible = useMemo(
    () =>
      (filter === 'todos' ? projects : projects.filter((p) => p.category === filter))
        // trabalhos reais primeiro, exemplos "Em breve" depois
        .slice()
        .sort((a, b) => Number(!!a.placeholder) - Number(!!b.placeholder)),
    [filter],
  );
  const current = projects.find((p) => p.id === openId) ?? null;

  useReveal([filter]);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="on-light bg-paper py-24 text-ink md:py-32">
      <div className="container-x">
        <SectionHeading
          light
          eyebrow="Portfólio"
          id="portfolio-title"
          title="Trabalhos que contam histórias"
          intro="Fotografia, vídeo, design e projetos digitais. Toque em um projeto para ver mais."
        />

        <div className="reveal -mx-5 mt-10 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
          <ul className="flex gap-2 sm:flex-wrap" aria-label="Filtrar portfólio por categoria">
            {categories.map((c) => {
              const active = filter === c.id;
              const count = c.id === 'todos' ? projects.length : projects.filter((p) => p.category === c.id).length;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => onFilter(c.id)}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${
                      active ? 'bg-ink text-paper' : 'border border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    {c.label}
                    <span className={`font-mono text-[0.7rem] ${active ? 'text-lime' : 'text-ink/40'}`}>{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="sr-only" aria-live="polite">{visible.length} projetos exibidos</p>

        {visible.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/60">
            Novos projetos desta categoria em breve.
          </p>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {visible.map((p, i) => (
              <li key={p.id} className="reveal" style={{ '--delay': `${(i % 3) * 80}ms` } as React.CSSProperties}>
                <ProjectCard project={p} index={i} onOpen={() => setOpenId(p.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ProjectModal project={current} onClose={() => setOpenId(null)} />
    </section>
  );
}

function ProjectCard({ project: p, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const isVideo = Boolean(p.video) || p.category === 'videos';
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full overflow-hidden rounded-2xl bg-paper-2/60 text-left ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
      aria-label={`Abrir projeto: ${p.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
        {p.cover ? (
          <img
            src={p.cover.src}
            alt={p.cover.alt}
            width={p.cover.width}
            height={p.cover.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[50%_30%] transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
        ) : p.art ? (
          (() => {
            const Art = p.art === 'design' ? DesignBoard : SystemsWindow;
            return <Art className="h-full w-full transition-transform duration-700 ease-out-soft group-hover:scale-105" />;
          })()
        ) : (
          <Placeholder
            label={categoryLabel(p.category)}
            icon={categoryIcon[p.category]}
            tone={p.brand === 'pixels' ? (index % 2 ? 'light' : 'dark') : index % 2 ? 'lime' : 'dark'}
            seed={index + 1}
            className="h-full w-full transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {p.placeholder && <span className="rounded-full bg-paper/90 px-2.5 py-1 text-[0.7rem] font-semibold text-ink backdrop-blur">Em breve</span>}
        </div>
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-lime ring-1 ring-paper/20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100" aria-hidden="true">
          {isVideo ? <Play className="h-4 w-4 fill-current" /> : <Plus className="h-5 w-5" />}
        </span>
      </div>
      <div className="p-5">
        <p className="eyebrow text-muted-dark">
          {categoryLabel(p.category)} · {p.brand === 'pixels' ? 'MV.Pixels' : 'The Pixel Lab'}
        </p>
        <h3 className="mt-2 text-lg font-bold tracking-tight">{p.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/65">{p.description}</p>
      </div>
    </button>
  );
}
