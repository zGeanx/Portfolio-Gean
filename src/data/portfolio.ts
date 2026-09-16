import booksLibraryShot from "@/assets/books-library.jpg";
import profileShot from "@/assets/profile.jpg";
import pulsoTvShot from "@/assets/pulso-tv.png";
import sistemaFolgasShot from "@/assets/sistema-de-folgas.png";

export const siteUrl = "https://geanluca.dev/";

export const profile = {
  brand: "geanluca.dev",
  name: "Gean Luca",
  role: "Desenvolvedor Front-end",
  initials: "GL",
  avatar: profileShot,
  description:
    "Desenvolvedor front-end com foco em aplicações web modernas, interfaces responsivas, integração de APIs e experiências acessíveis.",
  about:
    "Sou desenvolvedor front-end formado em Análise e Desenvolvimento de Sistemas. Crio interfaces modernas, responsivas e acessíveis, transformando requisitos em experiências claras e integrando aplicações a APIs e serviços. Minha experiência com back-end e bancos de dados complementa o trabalho de interface e facilita a construção de produtos web completos.",
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
      "Aplicação full stack para solicitações de folga, com portal público, painel administrativo protegido por JWT e fluxo de aprovação. A API em Django centraliza regras de negócio e persiste dados no PostgreSQL do Supabase.",
    tech: ["React", "Vite", "Django", "Django REST Framework", "JWT", "PostgreSQL", "Supabase"],
    demo: "https://sistema-de-folgas.pages.dev",
    repo: "https://github.com/zGeanx/Sistema_De_Folgas",
    image: sistemaFolgasShot,
  },
  {
    category: "Conteúdo & Transmissões",
    name: "Pulso TV",
    description:
      "Aplicação para navegação por canais e eventos ao vivo, com catálogo, agenda e páginas de reprodução. Construída com Vinext sobre Vite, usa rotas no servidor para integrar uma API externa e aplica políticas de origem aos players incorporados.",
    tech: ["React", "Vinext", "Vite", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
    demo: "https://www.pulso-tv.online/",
    repo: "https://github.com/zGeanx/pulso-tv",
    image: pulsoTvShot,
  },
  {
    category: "Catálogo & Gestão de acervo",
    name: "Books Library",
    description:
      "Sistema full stack para consulta e gerenciamento de livros. Conecta uma interface em Next.js a uma API Flask, com busca por título e autor, armazenamento em SQLite e ambiente local padronizado com Docker.",
    tech: ["Next.js", "TypeScript", "Flask", "SQLite", "Docker", "shadcn/ui"],
    demo: "https://books-library.geanlucadias12.workers.dev/",
    repo: "https://github.com/zGeanx/Books-Library",
    image: booksLibraryShot,
  },
];

export const contact = {
  title: "Vamos conversar sobre seu próximo projeto?",
  text: "Tem uma ideia, precisa de uma interface para seu negócio ou quer conversar sobre uma oportunidade? Entre em contato por e-mail ou LinkedIn e me conte o que você precisa.",
};

export const footerText = "© 2026 Gean Luca. Todos os direitos reservados.";
