import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { SectionHeading } from '../components/SectionHeading';

/** Só é renderizada quando houver depoimentos reais cadastrados. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="border-t border-paper/10 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Depoimentos" id="depoimentos-title" title="Quem já trabalhou comigo" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={`${t.name}-${i}`} className="reveal" style={{ '--delay': `${(i % 3) * 80}ms` } as React.CSSProperties}>
              <figure className="card-dark flex h-full flex-col p-7">
                <Quote className="h-7 w-7 text-lime" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-paper/85">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {t.photo ? (
                    <img src={t.photo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 font-bold" aria-hidden="true">{t.name.charAt(0)}</span>
                  )}
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-muted">{t.service}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
