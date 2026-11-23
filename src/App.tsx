import { useCallback, useRef, useState } from 'react';
import { Header, type NavItem } from './components/Header';
import { FloatingContact } from './components/FloatingContact';
import { PrivacyDialog } from './components/PrivacyDialog';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Areas } from './sections/Areas';
import { Services } from './sections/Services';
import { Portfolio, type Filter } from './sections/Portfolio';
import { Process } from './sections/Process';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { testimonials } from './data/testimonials';
import { useReveal } from './hooks/useReveal';

const nav: NavItem[] = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#areas', label: 'Áreas' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#processo', label: 'Processo' },
  ...(testimonials.length ? [{ href: '#depoimentos', label: 'Depoimentos' }] : []),
  { href: '#contato', label: 'Contato' },
];

export default function App() {
  const [filter, setFilter] = useState<Filter>('todos');
  const privacyRef = useRef<HTMLDialogElement>(null);

  useReveal();

  const showProjects = useCallback((f: Filter) => {
    setFilter(f);
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openPrivacy = () => privacyRef.current?.showModal();

  return (
    <>
      <Header nav={nav} />
      <main id="conteudo">
        <Hero />
        <About />
        <Areas onShowProjects={showProjects} />
        <Services />
        <Portfolio filter={filter} onFilter={setFilter} />
        <Process />
        <Testimonials />
        <Contact onOpenPrivacy={openPrivacy} />
      </main>
      <Footer nav={nav} onOpenPrivacy={openPrivacy} />
      <FloatingContact />
      <PrivacyDialog ref={privacyRef} />
    </>
  );
}
