import { MessageCircle, ClipboardList, Sparkles, PackageCheck } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

const steps = [
  { icon: MessageCircle, title: 'Primeiro contato', text: 'Você apresenta sua ideia, necessidade ou evento.' },
  { icon: ClipboardList, title: 'Planejamento', text: 'Entendemos as necessidades e definimos o escopo juntos.' },
  { icon: Sparkles, title: 'Criação', text: 'Desenvolvemos o material ou projeto contratado.' },
  { icon: PackageCheck, title: 'Entrega', text: 'Você recebe o resultado conforme o combinado.' },
];

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Como funciona" id="processo-title" title="Simples do começo ao fim" align="center" />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Linha conectando as etapas */}
          <span className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-lime via-paper/20 to-transparent md:left-[12.5%] md:right-[12.5%] md:h-px md:w-auto md:bg-gradient-to-r" aria-hidden="true" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="reveal relative flex gap-5 md:flex-col md:items-center md:text-center" style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}>
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-paper/15 bg-ink text-lime">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-xs text-muted">Etapa {i + 1}</span>
                  <h3 className="mt-1 text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 max-w-xs leading-relaxed text-paper/65 md:mx-auto">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
