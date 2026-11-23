import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LabLogo } from './Logo';
import { InstagramIcon } from './BrandIcons';
import { site, instagramUrl } from '../config/site';

export interface NavItem {
  href: string;
  label: string;
}

export function Header({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile: trava a rolagem, fecha com Esc e mantém o foco no painel
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = [toggleRef.current!, ...panelRef.current.querySelectorAll<HTMLElement>('a')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-paper/10 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink">
        Pular para o conteúdo
      </a>
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="text-paper" aria-label={`${site.brands.lab.name} — início`}>
          <LabLogo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-paper/75 transition-colors hover:bg-paper/5 hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contato" className="btn-primary hidden !min-h-10 !px-5 sm:inline-flex">
            Solicitar orçamento
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-ink lg:hidden"
      >
        <nav aria-label="Menu mobile" className="container-x flex h-full flex-col justify-between pb-10 pt-6">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="animate-rise" style={{ '--delay': `${i * 40}ms` } as React.CSSProperties}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-paper/10 py-4 text-3xl font-bold tracking-tight text-paper"
                >
                  {item.label}
                  <ArrowUpRight className="h-5 w-5 text-lime" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-4">
            <a href="#contato" onClick={() => setOpen(false)} className="btn-primary w-full">
              Solicitar orçamento
            </a>
            <div className="flex gap-3 text-sm text-muted">
              {[site.brands.lab.instagram, site.brands.pixels.instagram].map((h) => (
                <a key={h} href={instagramUrl(h)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-paper">
                  <InstagramIcon size={16} /> @{h}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
