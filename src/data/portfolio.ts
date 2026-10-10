import booksLibraryShot from "@/assets/books-library.webp";
import profileShot from "@/assets/profile.webp";
import pulsoApiShot from "@/assets/pulso-api.webp";
import pulsoTvShot from "@/assets/pulso-tv.webp";
import sistemaFolgasShot from "@/assets/sistema-de-folgas.webp";

export const siteUrl = "https://geanluca.dev/";

export const profile = {
  brand: "geanluca.dev",
  name: "Gean Luca",
  role: "Desenvolvedor Front-end",
  initials: "GL",
  avatar: profileShot,
  description:
    "Construo interfaces em React e TypeScript conectadas a APIs reais, unindo precisão visual, performance e código limpo do formulário ao banco de dados.",
  about:
    "Sou desenvolvedor formado em Análise e Desenvolvimento de Sistemas (Senac RS). Minha atuação principal é no front-end com React e TypeScript, complementada por experiência com back-end em Python e banco de dados, entregando soluções consistentes e de alta usabilidade.",
};

export const facts = [
  { label: "Localização", value: "Pelotas, RS · Brasil", detail: null, icon: "map-pin" },
  {
    label: "Atuação",
    value: "Desenvolvimento front-end",
    detail: "Interfaces · React · TypeScript",
    icon: "briefcase",
  },
  {
    label: "Formação",
    value: "Análise e Desenvolvimento de Sistemas",
    detail: "Senac RS · concluído em 2026",
    icon: "graduation-cap",
  },
] as const;

export const links = {
  github: "https://github.com/zGeanx",
  linkedin: "https://www.linkedin.com/in/gean-luca-a758b5215",
  email: "geanlucadias12@gmail.com",
  resume: "/gean-luca-cv.pdf",
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
    title: "Front-end",
    icon: "code",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "Vinext",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    title: "Back-end",
    icon: "database",
    items: ["Python", "Django", "Django REST Framework", "Flask", "Java", "REST API", "JWT"],
  },
  {
    title: "Dados e entrega",
    icon: "workflow",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Docker",
      "Supabase",
      "Cloudflare Workers",
      "Cloudflare Pages",
      "Render",
      "Git",
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
      "Plataforma full stack para solicitação e aprovação de folgas com portal público e painel com JWT. API em Django com PostgreSQL no Supabase.",
    tech: ["React", "Vite", "Django", "Django REST Framework", "JWT", "PostgreSQL", "Supabase"],
    demo: "https://sistema-de-folgas.pages.dev",
    repo: "https://github.com/zGeanx/Sistema_De_Folgas",
    image: sistemaFolgasShot,
  },
  {
    category: "Conteúdo & Transmissões",
    name: "Pulso TV",
    description:
      "Catálogo de canais e transmissões ao vivo com programação e player integrado, utilizando rotas seguras no servidor e deploys na Cloudflare.",
    tech: ["React", "Vinext", "Vite", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
    demo: "https://www.pulso-tv.online/",
    repo: "https://github.com/zGeanx/pulso-tv",
    image: pulsoTvShot,
  },
  {
    category: "API & Transmissões",
    name: "API Pulso",
    description:
      "API de canais e jogos com painel de administração, autenticação JWT e player público. Publicada em Cloudflare Workers com Hono e D1, sincronizando a grade do dia automaticamente.",
    tech: ["Hono", "Cloudflare Workers", "D1", "React", "TypeScript", "JWT", "Zod"],
    demo: "https://api.pulso-tv.online/",
    repo: "https://github.com/zGeanx/api",
    image: pulsoApiShot,
  },
  {
    category: "Catálogo & Gestão de acervo",
    name: "Books Library",
    description:
      "Sistema de gerenciamento e busca de acervo bibliográfico por título e autor. Interface em Next.js conectada a API Flask com SQLite e Docker.",
    tech: ["Next.js", "TypeScript", "Flask", "SQLite", "Docker", "shadcn/ui"],
    demo: "https://books-library.geanlucadias12.workers.dev/",
    repo: "https://github.com/zGeanx/Books-Library",
    image: booksLibraryShot,
  },
];
