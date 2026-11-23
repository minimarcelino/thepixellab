import { site } from '../config/site';

/** Marca do pixel: 3x3 com um pixel de destaque. */
export function PixelMark({ className = '' }: { className?: string }) {
  const on = [0, 1, 3, 4, 5, 7];
  return (
    <svg viewBox="0 0 15 15" className={className} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => {
        const x = (i % 3) * 5;
        const y = Math.floor(i / 3) * 5;
        if (i === 8) return <rect key={i} x={x} y={y} width="4" height="4" className="fill-lime" />;
        return <rect key={i} x={x} y={y} width="4" height="4" className={on.includes(i) ? 'fill-current' : 'fill-current opacity-25'} />;
      })}
    </svg>
  );
}

export function LabLogo({ className = '' }: { className?: string }) {
  const { logo, name } = site.brands.lab;
  if (logo) return <img src={logo} alt={name} className={`h-8 w-auto ${className}`} width={140} height={32} />;
  return (
    <span className={`inline-flex items-center gap-2.5 font-bold tracking-tight ${className}`}>
      <PixelMark className="h-6 w-6" />
      <span className="text-[1.05rem] leading-none">
        THE PIXEL <span className="text-lime">LAB</span>
      </span>
    </span>
  );
}

export function PixelsLogo({ className = '' }: { className?: string }) {
  const { logo, name } = site.brands.pixels;
  if (logo) return <img src={logo} alt={name} className={`h-8 w-auto ${className}`} width={140} height={32} />;
  return (
    <span className={`inline-flex items-center gap-1 font-extrabold tracking-tight ${className}`}>
      MV<span className="inline-block h-2 w-2 translate-y-1 bg-current" aria-hidden="true" />PIXELS
    </span>
  );
}
