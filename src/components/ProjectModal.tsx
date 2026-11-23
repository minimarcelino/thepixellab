import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, ImageOff } from 'lucide-react';
import type { Project } from '../data/projects';
import { categories } from '../data/projects';
import { contactHref } from '../lib/contact';

interface Props {
  project: Project | null;
  onClose: () => void;
}

/** Visualização ampliada com galeria e vídeo, usando <dialog> nativo (foco e Esc acessíveis). */
export function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const images = project ? [...(project.cover ? [project.cover] : []), ...(project.gallery ?? [])] : [];
  const total = images.length;

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (project && !dlg.open) {
      setIndex(0);
      dlg.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!project && dlg.open) {
      dlg.close();
    }
  }, [project]);

  useEffect(() => setLoaded(false), [index, project]);

  useEffect(() => {
    if (!project || total < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, total]);

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  const img = images[index];
  const label = project ? categories.find((c) => c.id === project.category)?.label : '';

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="modal-title"
      className="m-auto max-h-[92dvh] w-[min(64rem,calc(100%-1.5rem))] overflow-hidden rounded-3xl bg-ink p-0 text-paper"
    >
      {project && (
        <div className="flex max-h-[92dvh] flex-col md:grid md:grid-cols-[1.5fr_1fr]">
          <div className="relative flex min-h-[16rem] items-center justify-center bg-black md:min-h-[32rem]">
            {project.video ? (
              <video
                key={project.video.src}
                controls
                playsInline
                preload="metadata"
                poster={project.video.poster}
                className="max-h-[60dvh] w-full md:max-h-[92dvh]"
              >
                <source src={project.video.src} />
                Seu navegador não suporta vídeo.
              </video>
            ) : img ? (
              <>
                {!loaded && <div className="absolute inset-0 animate-pulse bg-graphite" aria-hidden="true" />}
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  decoding="async"
                  onLoad={() => setLoaded(true)}
                  className={`max-h-[60dvh] w-full object-contain transition-opacity duration-500 md:max-h-[92dvh] ${loaded ? 'opacity-100' : 'opacity-0'}`}
                />
                {total > 1 && (
                  <>
                    <button type="button" onClick={() => setIndex((i) => (i - 1 + total) % total)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 backdrop-blur hover:bg-ink" aria-label="Imagem anterior">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={() => setIndex((i) => (i + 1) % total)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 backdrop-blur hover:bg-ink" aria-label="Próxima imagem">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 font-mono text-xs" aria-live="polite">
                      {index + 1} / {total}
                    </span>
                  </>
                )}
              </>
            ) : (
              <div className="pixel-grid flex h-full w-full flex-col items-center justify-center gap-3 p-10 text-center text-paper/60">
                <ImageOff className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                <p className="text-sm">As imagens deste projeto serão publicadas em breve.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col overflow-y-auto p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow text-muted">{label}</p>
              <button type="button" onClick={() => ref.current?.close()} className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/15 hover:bg-paper hover:text-ink" aria-label="Fechar">
                <X className="h-5 w-5" />
              </button>
            </div>
            <h3 id="modal-title" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.brand === 'pixels' ? 'MV.Pixels' : 'The Pixel Lab'}</p>
            <p className="mt-5 leading-relaxed text-paper/75">{project.description}</p>

            {total > 1 && (
              <ul className="mt-6 grid grid-cols-4 gap-2" aria-label="Miniaturas">
                {images.map((im, i) => (
                  <li key={im.src}>
                    <button type="button" onClick={() => setIndex(i)} aria-label={`Ver imagem ${i + 1}`} aria-current={i === index} className={`block aspect-square w-full overflow-hidden rounded-lg ring-2 ${i === index ? 'ring-lime' : 'ring-transparent opacity-60 hover:opacity-100'}`}>
                      <img src={im.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <a href={contactHref(`Olá! Vi o projeto "${project.title}" no site e gostaria de algo parecido.`)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Quero algo assim
              </a>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Ver publicação <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
