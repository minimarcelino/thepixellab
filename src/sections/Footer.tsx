import { ArrowUp } from 'lucide-react';
import { site, instagramUrl } from '../config/site';
import { contactHref, hasWhatsapp } from '../lib/contact';
import { LabLogo, PixelsLogo } from '../components/Logo';
import { InstagramIcon } from '../components/BrandIcons';
import type { NavItem } from '../components/Header';

export function Footer({ nav, onOpenPrivacy }: { nav: NavItem[]; onOpenPrivacy: () => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper/10 bg-ink pt-16 pb-28 md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <LabLogo className="text-paper" />
            <p className="eyebrow mt-3 text-muted">{site.brands.lab.tagline}</p>
            <div className="mt-6 flex items-center gap-3 text-paper/80">
              <span className="text-sm text-muted">+</span>
              <PixelsLogo className="text-lg" />
            </div>
            <p className="eyebrow mt-3 text-muted">{site.brands.pixels.tagline}</p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <p className="eyebrow mb-4 text-muted">Navegação</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="text-paper/75 hover:text-lime">{n.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4 text-muted">Contato</p>
            <ul className="space-y-2.5">
              {[site.brands.lab, site.brands.pixels].map((b) => (
                <li key={b.instagram}>
                  <a href={instagramUrl(b.instagram)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-paper/75 hover:text-lime">
                    <InstagramIcon size={16} /> @{b.instagram}
                  </a>
                </li>
              ))}
              {hasWhatsapp && (
                <li><a href={contactHref('Olá! Vim pelo site.')} target="_blank" rel="noopener noreferrer" className="text-paper/75 hover:text-lime">WhatsApp</a></li>
              )}
              {site.contact.email && (
                <li><a href={`mailto:${site.contact.email}`} className="text-paper/75 hover:text-lime">{site.contact.email}</a></li>
              )}
              <li className="text-paper/50">{site.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} The Pixel Lab & MV.Pixels. Todos os direitos reservados.</p>
          <div className="flex items-center gap-5">
            <button type="button" onClick={onOpenPrivacy} className="hover:text-paper">Política de privacidade</button>
            <a href="#inicio" className="inline-flex items-center gap-1.5 hover:text-paper">
              Topo <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
