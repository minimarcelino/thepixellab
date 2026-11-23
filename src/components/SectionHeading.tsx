import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  light?: boolean;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, intro, id, light, align = 'left' }: Props) {
  const center = align === 'center';
  return (
    <div className={`reveal max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow mb-4 flex items-center gap-2 ${center ? 'justify-center' : ''} ${light ? 'text-muted-dark' : 'text-muted'}`}>
        <span className={`inline-block h-1.5 w-1.5 ${light ? 'bg-ink' : 'bg-lime'}`} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-pretty text-lg leading-relaxed ${light ? 'text-muted-dark' : 'text-muted'}`}>{intro}</p>
      )}
    </div>
  );
}
