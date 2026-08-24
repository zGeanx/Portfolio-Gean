import booksLibraryShot from "@/assets/books-library.jpg";
import profileShot from "@/assets/profile.jpg";
import pulsoTvShot from "@/assets/pulso-tv.png";
import sistemaFolgasShot from "@/assets/sistema-de-folgas.png";

export const PLACEHOLDER = "[a definir]";

export const profile = {
  brand: "geanluca.dev",
  name: "Gean Luca",
  role: "Desenvolvedor Frontend Júnior",
  status: "Disponível para oportunidades",
  initials: "GL",
  avatar: profileShot,
  description:
    "Desenvolvo interfaces web modernas, responsivas e acessíveis, transformando ideias em experiências digitais claras, rápidas e intuitivas.",
  about:
    "Sou estudante de Análise e Desenvolvimento de Sistemas no Senac RS e Desenvolvedor Frontend Júnior, com foco em React, TypeScript e criação de interfaces responsivas. Gosto de transformar problemas em soluções simples, funcionais e visualmente bem construídas.",
};

export const facts = [
  { label: "Localização", value: "Pelotas, RS" },
  { label: "Formação", value: "Análise e Desenvolvimento de Sistemas" },
  { label: "Conclusão prevista", value: "2026" },
];

export const links = {
  github: "https://github.com/zGeanx",
  linkedin: "https://www.linkedin.com/in/gean-luca-a758b5215",
  email: "geanlucadias12@gmail.com",
  resume: PLACEHOLDER,
};

export const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

export const techGroups = [
  {
    title: "Frontend",
    icon: "code",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    title: "Ferramentas",
    icon: "wrench",
    items: ["Git", "GitHub", "npm", "Docker", "Figma", "Visual Studio Code"],
  },
  {
    title: "Conhecimentos",
    icon: "layers",
    items: [
      "Design responsivo",
      "Acessibilidade",
      "HTML semântico",
      "SEO técnico",
      "Core Web Vitals",
      "Otimização de performance",
    ],
  },
];

export type Project = {
  category: string;
  name: string;
  description: string;
  tech: string[];
  demo: string | null;
  repo: string | null;
  image: string | null;
};

export const projects: Project[] = [
  {
    category: "Gestão & Produtividade",
    name: "Sistema de Folgas",
    description:
      "Plataforma intuitiva para agendamento e controle de escalas de folgas e horários, com validação de regras de limite, visão geral e exportação de dados.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
    demo: "https://sistema-de-folgas.pages.dev",
    repo: null,
    image: sistemaFolgasShot,
  },
  {
    category: "Streaming & Guia TV",
    name: "Pulso TV",
    description:
      "Plataforma interativa para canais e eventos ao vivo, grade esportiva em tempo real, busca instantânea e reprodução individual de transmissões.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Workers", "REST API"],
    demo: "https://pulso-tv.pulsotv.workers.dev/",
    repo: null,
    image: pulsoTvShot,
  },
  {
    category: "Aplicação web",
    name: "Books Library",
    description:
      "Aplicação para consulta e gerenciamento de livros, autores e categorias, desenvolvida com uma interface moderna, responsiva e integrada a uma API própria.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Flask", "SQLite"],
    demo: "https://books-library.geanlucadias12.workers.dev",
    repo: null,
    image: booksLibraryShot,
  },
];

export const contact = {
  title: "Vamos construir algo juntos?",
  text: "Estou disponível para oportunidades como Desenvolvedor Frontend Júnior, projetos e novas conexões profissionais.",
};

export const footerText = "© 2026 Gean Luca. Desenvolvido com React e TypeScript.";
