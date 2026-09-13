import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "pt-BR" | "en";

// Shared with the header's compact selector.
// eslint-disable-next-line react-refresh/only-export-components
export const languages: { code: Language; shortLabel: string; name: string }[] = [
  { code: "pt-BR", shortLabel: "PT-BR", name: "Português" },
  { code: "en", shortLabel: "ENG", name: "English" },
];

const ptBR = {
  meta: {
    title: "geanluca.dev | Desenvolvedor Full Stack",
    description:
      "Aplicações web full stack. Conheça os projetos de Gean Luca, desenvolvedor com experiência em APIs, dados, segurança e interfaces responsivas.",
  },
  skipLink: "Ir para o conteúdo",
  header: {
    navLabel: "Navegação principal",
    mobileNavLabel: "Navegação mobile",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageLabel: "Selecionar idioma",
    lightMode: "Ativar light mode",
    darkMode: "Ativar dark mode",
    nav: ["Início", "Sobre", "Tecnologias", "Projetos", "Contato"],
  },
  hero: {
    role: "Desenvolvedor Full Stack",
    description:
      "Desenvolvedor full stack com experiência em aplicações web, APIs, bancos de dados e interfaces responsivas.",
    viewProjects: "Ver projetos",
    contact: "Fale comigo",
    profile: "/ perfil",
    profileAlt: "Foto de perfil de Gean Luca",
  },
  about: {
    eyebrow: "/ sobre",
    title: "Sobre mim",
    body: "Sou desenvolvedor full stack formado em Análise e Desenvolvimento de Sistemas. Construo aplicações web da interface ao back-end, integrando APIs, regras de negócio, autenticação e bancos de dados. Minha experiência inclui projetos de gestão, catálogos, conteúdo ao vivo e processamento de dados, com atenção à organização, segurança e publicação.",
    facts: [
      { label: "Localização", value: "Pelotas, RS · Brasil", detail: "" },
      {
        label: "Atuação",
        value: "Desenvolvimento full stack",
        detail: "Interfaces · APIs · Dados",
      },
      {
        label: "Formação",
        value: "Análise e Desenvolvimento de Sistemas",
        detail: "Senac RS · concluído em 2026",
      },
    ],
  },
  technologies: {
    eyebrow: "/ stack",
    title: "Tecnologias",
    groups: [
      {
        title: "Front-end",
        items: ["React", "Next.js", "Vue.js", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
      },
      {
        title: "Back-end",
        items: ["Python", "Django", "Django REST Framework", "Flask", "Java", "REST API", "JWT"],
      },
      {
        title: "Dados e entrega",
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
    ],
  },
  projects: {
    eyebrow: "/ trabalhos",
    title: "Projetos",
    dragHint: "Arraste ou use as setas",
    previous: "Projeto anterior",
    next: "Próximo projeto",
    regionLabel: "Projetos desenvolvidos",
    screenshotAlt: "Captura de tela do projeto",
    viewProject: "Ver projeto",
    viewCode: "Código",
    opensNewTab: "abre em nova aba",
    entries: [
      {
        category: "Gestão & Produtividade",
        description:
          "Aplicação full stack para solicitações de folga, com portal público, painel administrativo protegido por JWT e fluxo de aprovação. A API em Django centraliza regras de negócio e persiste dados no PostgreSQL do Supabase.",
      },
      {
        category: "Conteúdo & Transmissões",
        description:
          "Aplicação para navegação por canais e eventos ao vivo, com catálogo, agenda e páginas de reprodução. Usa rotas no servidor para integrar uma API externa e aplica políticas de origem para os players incorporados.",
      },
      {
        category: "Catálogo & Gestão de acervo",
        description:
          "Sistema full stack para consulta e gerenciamento de livros. Conecta uma interface em Next.js a uma API Flask, com busca por título e autor, armazenamento em SQLite e ambiente local padronizado com Docker.",
      },
    ],
  },
  contact: {
    eyebrow: "/ contato",
    title: "Vamos conversar sobre seu próximo projeto?",
    text: "Estou aberto a oportunidades, colaborações e novos projetos. Preencha o formulário e me conte brevemente como posso contribuir.",
    formTitle: "Envie uma mensagem",
    name: "Nome",
    namePlaceholder: "Como você se chama?",
    emailPlaceholder: "voce@empresa.com",
    message: "Mensagem",
    messagePlaceholder: "Conte sobre a oportunidade ou projeto...",
    submit: "Preparar e-mail",
    formHint: "Ao enviar, seu aplicativo de e-mail será aberto com a mensagem preenchida.",
    email: "E-mail",
    copyAria: "Copiar e-mail",
    copyTitle: "Clique para copiar o e-mail",
    copiedTitle: "E-mail copiado!",
    copiedDescription: "Agora é só colar onde preferir.",
    errorTitle: "Não foi possível copiar o e-mail.",
    errorDescription: "Selecione o endereço e copie manualmente.",
  },
  footer: "© 2026 Gean Luca. Todos os direitos reservados.",
};

type DeepString<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { [K in keyof T]: DeepString<T[K]> }
    : T extends object
      ? { [K in keyof T]: DeepString<T[K]> }
      : T;

export type Messages = DeepString<typeof ptBR>;

const en: Messages = {
  meta: {
    title: "geanluca.dev | Full Stack Developer",
    description:
      "Full stack web applications. Explore Gean Luca's work with APIs, data, security, and responsive interfaces.",
  },
  skipLink: "Skip to content",
  header: {
    navLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Select language",
    lightMode: "Enable light mode",
    darkMode: "Enable dark mode",
    nav: ["Home", "About", "Technologies", "Projects", "Contact"],
  },
  hero: {
    role: "Full Stack Developer",
    description:
      "Full stack developer with experience in web applications, APIs, databases, and responsive interfaces.",
    viewProjects: "View projects",
    contact: "Contact me",
    profile: "/ profile",
    profileAlt: "Profile photo of Gean Luca",
  },
  about: {
    eyebrow: "/ about",
    title: "About me",
    body: "I am a full stack developer with a degree in Systems Analysis and Development. I build web applications from the interface to the back end, integrating APIs, business rules, authentication, and databases. My experience includes management, catalog, live content, and data-processing projects, with attention to organization, security, and deployment.",
    facts: [
      { label: "Location", value: "Pelotas, RS · Brazil", detail: "" },
      {
        label: "Role",
        value: "Full stack development",
        detail: "Interfaces · APIs · Data",
      },
      {
        label: "Education",
        value: "Systems Analysis and Development",
        detail: "Senac RS · completed in 2026",
      },
    ],
  },
  technologies: {
    eyebrow: "/ stack",
    title: "Technologies",
    groups: [
      {
        title: "Front-end",
        items: ["React", "Next.js", "Vue.js", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
      },
      {
        title: "Back-end",
        items: ["Python", "Django", "Django REST Framework", "Flask", "Java", "REST API", "JWT"],
      },
      {
        title: "Data & delivery",
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
    ],
  },
  projects: {
    eyebrow: "/ work",
    title: "Projects",
    dragHint: "Swipe or use the arrows",
    previous: "Previous project",
    next: "Next project",
    regionLabel: "Developed projects",
    screenshotAlt: "Screenshot of the project",
    viewProject: "View project",
    viewCode: "Code",
    opensNewTab: "opens in a new tab",
    entries: [
      {
        category: "Management & Productivity",
        description:
          "Full stack leave-request application with a public portal, JWT-protected admin panel, and approval flow. Its Django API centralizes business rules and persists data in Supabase PostgreSQL.",
      },
      {
        category: "Content & Streaming",
        description:
          "Application for browsing live channels and events, with a catalog, schedule, and playback pages. It uses server routes to integrate an external API and applies origin policies to embedded players.",
      },
      {
        category: "Catalog & Library Management",
        description:
          "Full stack system for searching and managing books. It connects a Next.js interface to a Flask API, supports title and author search, stores data in SQLite, and provides a Docker-standardized local environment.",
      },
    ],
  },
  contact: {
    eyebrow: "/ contact",
    title: "Shall we talk about your next project?",
    text: "I am open to opportunities, collaborations, and new projects. Fill out the form and briefly tell me how I can contribute.",
    formTitle: "Send a message",
    name: "Name",
    namePlaceholder: "What is your name?",
    emailPlaceholder: "you@company.com",
    message: "Message",
    messagePlaceholder: "Tell me about the opportunity or project...",
    submit: "Prepare email",
    formHint: "Submitting opens your email app with the message ready to send.",
    email: "Email",
    copyAria: "Copy email",
    copyTitle: "Click to copy the email",
    copiedTitle: "Email copied!",
    copiedDescription: "You can paste it wherever you prefer.",
    errorTitle: "The email could not be copied.",
    errorDescription: "Select the address and copy it manually.",
  },
  footer: "© 2026 Gean Luca. All rights reserved.",
};

const messages: Record<Language, Messages> = { "pt-BR": ptBR, en };

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  messages: Messages;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "pt-BR" || value === "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (isLanguage(savedLanguage)) setLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    const currentMessages = messages[language];
    document.documentElement.lang = language;
    document.title = currentMessages.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", currentMessages.meta.description);
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, messages: messages[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Components consume the provider through this colocated hook.
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
