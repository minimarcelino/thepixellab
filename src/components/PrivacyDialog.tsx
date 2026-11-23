import { forwardRef } from 'react';
import { X } from 'lucide-react';
import { site } from '../config/site';

/** Política de privacidade simples. Revise o texto conforme sua realidade (LGPD). */
export const PrivacyDialog = forwardRef<HTMLDialogElement>(function PrivacyDialog(_, ref) {
  const close = () => (ref as React.RefObject<HTMLDialogElement>)?.current?.close();
  return (
    <dialog
      ref={ref}
      aria-labelledby="privacy-title"
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[88dvh] w-[min(40rem,calc(100%-1.5rem))] rounded-3xl bg-paper p-0 text-ink"
    >
      <div className="on-light p-7 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <h2 id="privacy-title" className="text-2xl font-bold tracking-tight">Política de privacidade</h2>
          <button type="button" onClick={close} className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 hover:bg-ink hover:text-paper" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/75">
          <p>
            Este site não armazena, não vende e não compartilha dados pessoais. Não usamos cookies de rastreamento nem
            ferramentas de análise de terceiros.
          </p>
          <p>
            Ao preencher o formulário de orçamento, as informações (nome, WhatsApp, e-mail opcional, serviço, data e descrição)
            são usadas apenas para montar uma mensagem no seu próprio aparelho. O envio só acontece quando você confirma a
            mensagem no {site.contact.whatsapp ? 'WhatsApp' : 'Instagram'}, e a partir daí vale também a política de privacidade
            desse aplicativo.
          </p>
          <p>
            Os dados recebidos por mensagem são usados exclusivamente para responder ao seu pedido e elaborar o orçamento. Você
            pode pedir a exclusão das suas informações a qualquer momento pelos mesmos canais de contato.
          </p>
          <p className="text-sm text-ink/55">Última atualização: {new Date().getFullYear()}.</p>
        </div>
      </div>
    </dialog>
  );
});
