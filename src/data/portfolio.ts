import booksLibraryShot from "@/assets/books-library.jpg";
import profileShot from "@/assets/profile.jpg";
import pulsoTvShot from "@/assets/pulso-tv.png";
import sistemaFolgasShot from "@/assets/sistema-de-folgas.png";

export const siteUrl = "https://geanluca.dev/";

export const profile = {
  brand: "geanluca.dev",
  name: "Gean Luca",
  role: "Desenvolvedor Frontend",
  status: "Disponível para oportunidades",
  initials: "GL",
  avatar: profileShot,
  description:
    "Crio interfaces web com React e TypeScript, unindo desempenho, consistência visual e atenção aos detalhes.",
  about:
    "Meu foco é transformar necessidades em interfaces claras e funcionais. Trabalho com React e TypeScript na construção de aplicações responsivas, integração com APIs e organização de componentes. Meus projetos incluem ferramentas de gestão, consulta de conteúdo e organização de acervos, sempre com atenção à navegação e aos detalhes de uso.",
};

export const facts = [
  { label: "Localização", value: "Pelotas, RS · Brasil", detail: null },
  { label: "Atuação", value: "Desenvolvimento de interfaces web", detail: "React · TypeScript" },
  {
    label: "Formação",
    value: "Análise e Desenvolvimento de Sistemas",
    detail: "Senac RS · em andamento · conclusão prevista em 2026",
  },
];

export const links = {
  github: "https://github.com/zGeanx",
  linkedin: "https://www.linkedin.com/in/gean-luca-a758b5215",
  email: "geanlucadias12@gmail.com",
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
    title: "Práticas de desenvolvimento",
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
      "Organiza escalas, horários e solicitações de folga em um só lugar. Valida limites de agendamento e permite acompanhar a programação e exportar os dados para apoiar o planejamento da equipe.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
    demo: "https://sistema-de-folgas.pages.dev",
    repo: "https://github.com/zGeanx/Sistema_De_Folgas",
    image: sistemaFolgasShot,
  },
  {
    category: "Conteúdo & Transmissões",
    name: "Pulso TV",
    description:
      "Reúne canais ao vivo e programação esportiva em uma interface de consulta rápida. Integra busca de conteúdo, grade de eventos atualizada e reprodução de transmissões em um único fluxo.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Workers", "REST API"],
    demo: "https://pulso-tv.pulsotv.workers.dev/",
    repo: "https://github.com/zGeanx/pulso-tv",
    image: pulsoTvShot,
  },
  {
    category: "Catálogo & Gestão de acervo",
    name: "Books Library",
    description:
      "Centraliza a consulta e o gerenciamento de livros, autores e categorias. Conecta uma interface em Next.js a uma API própria em Flask, com armazenamento em SQLite e navegação adaptada ao celular.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Flask", "SQLite"],
    demo: "https://books-library.pulsotv.workers.dev/",
    repo: "https://github.com/zGeanx/Books-Library",
    image: booksLibraryShot,
  },
];

export const contact = {
  title: "Vamos conversar sobre seu próximo projeto?",
  text: "Tem uma ideia, precisa de uma interface para seu negócio ou quer conversar sobre uma oportunidade? Entre em contato por e-mail ou LinkedIn e me conte o que você precisa.",
};

export const footerText = "© 2026 Gean Luca. Todos os direitos reservados.";
