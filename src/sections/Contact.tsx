import { useId, useState, type FormEvent } from 'react';
import { Send, Mail, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';
import { site, instagramUrl } from '../config/site';
import { serviceOptions } from '../data/services';
import { contactHref, hasWhatsapp, sanitize, contactChannelLabel } from '../lib/contact';
import { InstagramIcon, WhatsAppIcon } from '../components/BrandIcons';

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  details: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = { name: '', phone: '', email: '', service: '', date: '', details: '' };

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Informe seu nome.';
  const digits = f.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) e.phone = 'Informe um WhatsApp válido com DDD.';
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'E-mail inválido.';
  if (!f.service) e.service = 'Escolha um serviço.';
  if (f.details.trim().length < 10) e.details = 'Conte um pouco mais sobre o projeto (mín. 10 caracteres).';
  return e;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}/${m}/${y}` : '';
}

function buildMessage(f: FormState) {
  const lines = [
    'Olá! Vim pelo site e gostaria de um orçamento.',
    '',
    `*Nome:* ${sanitize(f.name, 80)}`,
    `*WhatsApp:* ${sanitize(f.phone, 20)}`,
    f.email && `*E-mail:* ${sanitize(f.email, 120)}`,
    `*Serviço:* ${sanitize(f.service, 80)}`,
    f.date && `*Data do evento:* ${formatDate(f.date)}`,
    '',
    `*Sobre o projeto:*`,
    sanitize(f.details, 1000),
  ];
  return lines.filter((l): l is string => typeof l === 'string').join('\n');
}

export function Contact({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const uid = useId();
  const today = new Date().toISOString().split('T')[0];

  const set = (k: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [k]: k === 'phone' ? maskPhone(value) : value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    const firstError = Object.keys(errs)[0];
    if (firstError) {
      document.getElementById(`${uid}-${firstError}`)?.focus();
      return;
    }
    setStatus('sending');
    const message = buildMessage(form);
    // Abre a janela no mesmo gesto do usuário para não ser bloqueada
    const url = contactHref(message);
    const win = window.open(url, '_blank');
    if (win) win.opener = null; // evita acesso à página de origem (reverse tabnabbing)
    else window.location.href = url; // pop-up bloqueado: abre na mesma aba
    if (!hasWhatsapp) {
      try { await navigator.clipboard.writeText(message); } catch { /* sem permissão: segue */ }
    }
    setStatus('done');
  }

  const field = (k: keyof FormState) => ({
    id: `${uid}-${k}`,
    name: k,
    value: form[k],
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined,
  });

  const Err = ({ k }: { k: keyof FormState }) =>
    errors[k] ? <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm text-red-300">{errors[k]}</p> : null;

  return (
    <section id="contato" aria-labelledby="contato-title" className="relative overflow-hidden border-t border-paper/10 py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_0%_100%,rgb(183_255_69/0.06),transparent_70%)]" aria-hidden="true" />
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow mb-4 flex items-center gap-2 text-muted">
            <span className="h-1.5 w-1.5 bg-lime" aria-hidden="true" /> Contato
          </p>
          <h2 id="contato-title" className="text-balance text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            Vamos transformar sua ideia em <span className="text-lime">realidade?</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">
            Tem um projeto em mente? Vamos conversar e encontrar a melhor forma de tirá-lo do papel.
          </p>

          <div className="mt-10 space-y-3">
            <a href={contactHref('Olá! Vim pelo site e gostaria de conversar sobre um projeto.')} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              {hasWhatsapp ? <WhatsAppIcon size={18} /> : <InstagramIcon size={18} />}
              Conversar pelo {contactChannelLabel}
            </a>
            <ul className="flex flex-col gap-1 pt-4">
              {[site.brands.lab, site.brands.pixels].map((b) => (
                <li key={b.instagram}>
                  <a href={instagramUrl(b.instagram)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-paper/10 py-4 transition-colors hover:text-lime">
                    <span className="flex items-center gap-3"><InstagramIcon size={18} /> @{b.instagram}</span>
                    <span className="text-sm text-muted group-hover:text-lime">{b.name}</span>
                  </a>
                </li>
              ))}
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 border-b border-paper/10 py-4 hover:text-lime">
                    <Mail className="h-[18px] w-[18px]" aria-hidden="true" /> {site.contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="reveal lg:col-span-7" style={{ '--delay': '120ms' } as React.CSSProperties}>
          <form noValidate onSubmit={onSubmit} className="card-dark space-y-5 bg-graphite/60 p-6 backdrop-blur sm:p-8" aria-describedby={`${uid}-form-note`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Solicitar orçamento</h3>
              <span className="eyebrow whitespace-nowrap text-[0.65rem] text-muted">* obrigatório</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium">Nome *</label>
                <input {...field('name')} onChange={(e) => set('name')(e.target.value)} className="field" autoComplete="name" maxLength={80} required />
                <Err k="name" />
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="mb-2 block text-sm font-medium">WhatsApp *</label>
                <input {...field('phone')} onChange={(e) => set('phone')(e.target.value)} className="field" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(18) 90000-0000" required />
                <Err k="phone" />
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-medium">E-mail <span className="text-muted">(opcional)</span></label>
                <input {...field('email')} onChange={(e) => set('email')(e.target.value)} className="field" type="email" autoComplete="email" maxLength={120} />
                <Err k="email" />
              </div>
              <div>
                <label htmlFor={`${uid}-service`} className="mb-2 block text-sm font-medium">Serviço desejado *</label>
                <div className="relative">
                <select {...field('service')} onChange={(e) => set('service')(e.target.value)} className="field appearance-none pr-11" required>
                  <option value="">Selecione…</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  <option value="Outro / ainda não sei">Outro / ainda não sei</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                </div>
                <Err k="service" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-date`} className="mb-2 block text-sm font-medium">Data do evento <span className="text-muted">(se aplicável)</span></label>
                <input {...field('date')} onChange={(e) => set('date')(e.target.value)} className="field [color-scheme:dark] sm:max-w-xs" type="date" min={today} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-details`} className="mb-2 block text-sm font-medium">Descrição do projeto *</label>
                <textarea {...field('details')} onChange={(e) => set('details')(e.target.value)} className="field min-h-32 resize-y" rows={5} maxLength={1000} placeholder="Conte o que você precisa, local, prazo, referências…" required />
                <div className="flex justify-between">
                  <Err k="details" />
                  <span className="ml-auto mt-1.5 font-mono text-xs text-muted">{form.details.length}/1000</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Abrindo {contactChannelLabel}…</>
              ) : (
                <><Send className="h-4 w-4" aria-hidden="true" /> Enviar pelo {contactChannelLabel}</>
              )}
            </button>

            <div aria-live="polite">
              {status === 'done' && (
                <p className="flex items-start gap-2 rounded-xl bg-lime/10 p-3 text-sm text-paper">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                  {hasWhatsapp
                    ? 'Sua mensagem foi preparada no WhatsApp. É só confirmar o envio por lá.'
                    : 'Mensagem copiada! Cole no Direct do Instagram que acabou de abrir.'}
                </p>
              )}
            </div>

            <p id={`${uid}-form-note`} className="text-xs leading-relaxed text-muted">
              Seus dados não são armazenados neste site: eles apenas montam uma mensagem que você envia pelo {contactChannelLabel}.{' '}
              <button type="button" onClick={onOpenPrivacy} className="underline underline-offset-2 hover:text-paper">Política de privacidade</button>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
