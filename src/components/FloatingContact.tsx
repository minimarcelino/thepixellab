import { useEffect, useState } from 'react';
import { contactHref, hasWhatsapp, contactChannelLabel } from '../lib/contact';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';

/** Botão flutuante de contato. Aparece após o hero e some na seção de contato. */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById('contato');
    let pastHero = false;
    let inContact = false;
    const update = () => setVisible(pastHero && !inContact);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    const io = contact
      ? new IntersectionObserver(([e]) => { inContact = e.isIntersecting; update(); }, { threshold: 0.15 })
      : null;
    if (contact && io) io.observe(contact);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <a
      href={contactHref('Olá! Vim pelo site e gostaria de um orçamento.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar pelo ${contactChannelLabel}`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-lime pl-4 pr-5 font-semibold text-ink shadow-lg shadow-black/40 transition-all duration-500 ease-out-soft hover:bg-paper sm:bottom-7 sm:right-7 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {hasWhatsapp ? <WhatsAppIcon size={22} /> : <InstagramIcon size={22} />}
      <span className="text-sm">Orçamento</span>
    </a>
  );
}
