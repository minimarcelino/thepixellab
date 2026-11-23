import type { LucideIcon } from 'lucide-react';
import {
  Camera, CalendarDays, Clapperboard, Smartphone, Radio,
  Fingerprint, PenTool, Megaphone, FileText, LayoutGrid,
  MonitorSmartphone, Building2, FolderOpen, Code2,
} from 'lucide-react';

export type ServiceGroupId = 'audiovisual' | 'design' | 'tech';

export interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface ServiceGroup {
  id: ServiceGroupId;
  label: string;
  brand: 'pixels' | 'lab';
  services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'audiovisual',
    label: 'Fotografia e audiovisual',
    brand: 'pixels',
    services: [
      { icon: Camera, name: 'Fotografia esportiva', description: 'Futevôlei, beach tennis, vôlei e outras modalidades: ação, comemorações e momentos decisivos.' },
      { icon: CalendarDays, name: 'Cobertura de eventos', description: 'Torneios, inaugurações e eventos comerciais: ambientes, participantes e o que importa.' },
      { icon: Clapperboard, name: 'Produção de vídeos', description: 'Melhores lances, vídeos promocionais, institucionais e de aulas, com edição cuidadosa.' },
      { icon: Smartphone, name: 'Reels e conteúdo digital', description: 'Vídeos curtos pensados para o Instagram, no formato e ritmo de cada rede.' },
      { icon: Radio, name: 'Cobertura em tempo real', description: 'Registro, edição e publicação durante o evento, para ele ganhar visibilidade enquanto acontece.' },
    ],
  },
  {
    id: 'design',
    label: 'Design e marketing',
    brand: 'lab',
    services: [
      { icon: Fingerprint, name: 'Identidade visual', description: 'Logotipo e elementos visuais que traduzem a personalidade da sua marca.' },
      { icon: PenTool, name: 'Design gráfico', description: 'Peças para divulgar produtos, eventos e serviços, com consistência visual.' },
      { icon: LayoutGrid, name: 'Conteúdo para redes sociais', description: 'Posts, carrosséis e stories com artes e legendas alinhadas à sua comunicação.' },
      { icon: FileText, name: 'Materiais institucionais', description: 'Papel timbrado, documentos, e-books e apresentações com aparência profissional.' },
      { icon: Megaphone, name: 'Social media', description: 'Planejamento e calendário de publicações, conforme o pacote combinado.' },
    ],
  },
  {
    id: 'tech',
    label: 'Tecnologia',
    brand: 'lab',
    services: [
      { icon: MonitorSmartphone, name: 'Landing pages', description: 'Uma página objetiva para apresentar seu serviço e facilitar o contato.' },
      { icon: Building2, name: 'Sites institucionais', description: 'Presença online organizada, rápida e adaptada ao celular.' },
      { icon: FolderOpen, name: 'Portfólios digitais', description: 'Um espaço para mostrar seus trabalhos do jeito que eles merecem.' },
      { icon: Code2, name: 'Soluções web personalizadas', description: 'Formulários, interfaces e pequenas ferramentas, com escopo definido conforme a necessidade.' },
    ],
  },
];

/** Lista simples usada no formulário de orçamento. */
export const serviceOptions = serviceGroups.flatMap((g) => g.services.map((s) => s.name));
