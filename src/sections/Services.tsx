import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { serviceGroups, type ServiceGroupId } from '../data/services';
import { contactHref, serviceMessage } from '../lib/contact';
import { SectionHeading } from '../components/SectionHeading';

export function Services() {
  const [active, setActive] = useState<ServiceGroupId>('audiovisual');
  const group = serviceGroups.find((g) => g.id === active)!;

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="border-t border-paper/10 bg-ink py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Serviços"
            id="servicos-title"
            title="O que posso fazer pelo seu projeto"
            intro="Cada orçamento é personalizado. Escolha um serviço e fale direto comigo."
          />

          <div role="tablist" aria-label="Categorias de serviço" className="reveal -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
            {serviceGroups.map((g) => {
              const selected = g.id === active;
              return (
                <button
                  key={g.id}
                  role="tab"
                  type="button"
                  id={`tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(g.id)}
                  onKeyDown={(e) => {
                    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                    const idx = serviceGroups.findIndex((x) => x.id === active);
                    const next = serviceGroups[(idx + (e.key === 'ArrowRight' ? 1 : -1) + serviceGroups.length) % serviceGroups.length];
                    setActive(next.id);
                    document.getElementById(`tab-${next.id}`)?.focus();
                  }}
                  className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    selected ? 'bg-paper text-ink' : 'border border-paper/15 text-paper/70 hover:border-paper/40 hover:text-paper'
                  }`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        <div id={`panel-${group.id}`} role="tabpanel" aria-labelledby={`tab-${group.id}`} className="mt-12">
          <p className="eyebrow mb-5 text-muted">
            {group.brand === 'pixels' ? 'por MV.Pixels' : 'por The Pixel Lab'}
          </p>
          <ul key={group.id} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.services.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.name} className="animate-rise" style={{ '--delay': `${i * 60}ms` } as React.CSSProperties}>
                  <article className="card-dark group flex h-full flex-col p-6 transition-colors duration-300 hover:border-lime/40 hover:bg-graphite/70">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper/5 text-lime transition-colors group-hover:bg-lime group-hover:text-ink">
                        <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold tracking-tight">{s.name}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-paper/65">{s.description}</p>
                    <a
                      href={contactHref(serviceMessage(s.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-paper underline decoration-paper/20 underline-offset-4 transition-colors hover:text-lime hover:decoration-lime"
                      aria-label={`Solicitar orçamento de ${s.name}`}
                    >
                      Solicitar orçamento <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
