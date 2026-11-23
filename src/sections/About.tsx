import { User } from 'lucide-react';
import { site } from '../config/site';
import { SectionHeading } from '../components/SectionHeading';
import { Placeholder } from '../components/Placeholder';

const pillars = [
  { title: 'Fotografia & vídeo', text: 'Prática em fotografia esportiva, cobertura de eventos e produção de vídeos curtos.' },
  { title: 'Design & comunicação', text: 'Materiais gráficos e conteúdos para marcas que querem se comunicar melhor.' },
  { title: 'Tecnologia', text: 'Estudante de Ciência da Computação, com base em programação e desenvolvimento web.' },
];

export function About() {
  const { portrait } = site.images;
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="on-light bg-paper py-24 text-ink md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <div className="relative">
            {portrait ? (
              <img src={portrait} alt={site.ownerName ? `Foto de ${site.ownerName}` : 'Foto da profissional responsável pelas marcas'} className="aspect-[4/5] w-full rounded-3xl object-cover" loading="lazy" decoding="async" width={800} height={1000} />
            ) : (
              <Placeholder label="Sua foto aqui" icon={User} tone="light" className="aspect-[4/5] w-full rounded-3xl" seed={5} />
            )}
            <div className="absolute -bottom-5 left-6 right-6 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-paper shadow-2xl shadow-ink/30 sm:left-auto sm:right-6 sm:w-72">
              <span className="text-sm font-semibold">{site.ownerName || 'MV.Pixels + The Pixel Lab'}</span>
              <span className="h-2.5 w-2.5 bg-lime" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeading light eyebrow="Sobre mim" id="sobre-title" title={<>Entre a criatividade e a tecnologia.</>} />
          <div className="reveal mt-8 space-y-5 text-lg leading-relaxed text-ink/75" style={{ '--delay': '100ms' } as React.CSSProperties}>
            <p>
              Entre a criatividade e a tecnologia, encontrei diferentes formas de transformar ideias em projetos reais.
            </p>
            <p>
              Por meio da <strong className="font-semibold text-ink">MV.Pixels</strong> e da{' '}
              <strong className="font-semibold text-ink">The Pixel Lab</strong>, reúno fotografia, produção audiovisual, design e
              soluções digitais para criar materiais que comunicam, conectam e valorizam cada projeto.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.title} className="reveal rounded-2xl border border-ink/10 bg-paper-2/60 p-5" style={{ '--delay': `${150 + i * 80}ms` } as React.CSSProperties}>
                <span className="font-mono text-xs text-muted-dark">0{i + 1}</span>
                <h3 className="mt-3 font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
