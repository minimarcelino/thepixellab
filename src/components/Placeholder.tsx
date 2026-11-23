import type { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  icon?: LucideIcon;
  tone?: 'dark' | 'light' | 'lime';
  className?: string;
  /** Semente para variar o padrão de pixels */
  seed?: number;
}

/**
 * Placeholder visual identificado — aparece enquanto não houver imagem real.
 * Substitua informando `src` nos dados (config/site.ts ou data/projects.ts).
 */
export function Placeholder({ label, icon: Icon, tone = 'dark', className = '', seed = 1 }: Props) {
  const tones = {
    dark: 'bg-graphite text-paper/70',
    light: 'bg-paper-2 text-ink/60',
    lime: 'bg-lime text-ink/70',
  } as const;

  // Padrão determinístico de pixels
  const cells = Array.from({ length: 24 }, (_, i) => ((i * 7 + seed * 13) % 11) < 3);

  return (
    <div className={`relative isolate overflow-hidden ${tones[tone]} ${className}`} role="img" aria-label={`Espaço reservado${label ? `: ${label}` : ''}`}>
      <div className="absolute right-4 top-4 grid grid-cols-6 gap-1 opacity-60" aria-hidden="true">
        {cells.map((on, i) => (
          <span key={i} className={`h-2 w-2 ${on ? (tone === 'lime' ? 'bg-ink' : 'bg-lime') : 'bg-current opacity-10'}`} />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        {Icon && <Icon className="h-8 w-8 opacity-70" strokeWidth={1.5} aria-hidden="true" />}
        {label && <span className="eyebrow opacity-80">{label}</span>}
      </div>
    </div>
  );
}
