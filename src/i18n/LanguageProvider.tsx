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
    title: "geanluca.dev │ Desenvolvedor Front-end",
    description:
      "Interfaces modernas e aplicações web responsivas. Conheça os projetos de Gean Luca, desenvolvedor front-end com experiência em React, TypeScript e integração de APIs.",
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
    role: "Desenvolvedor Front-end",
    description:
      "Desenvolvedor front-end com foco em aplicações web modernas, interfaces responsivas, integração de APIs e experiências acessíveis.",
    viewProjects: "Ver projetos",
    contact: "Fale comigo",
    downloadCv: "Baixar CV",
    profile: "/ perfil",
    profileAlt: "Foto de perfil de Gean Luca",
  },
  about: {
    eyebrow: "/ sobre",
    title: "Sobre mim",
    body: "Sou desenvolvedor front-end formado em Análise e Desenvolvimento de Sistemas. Crio interfaces modernas, responsivas e acessíveis, transformando requisitos em experiências claras e integrando aplicações a APIs e serviços. Minha experiência com back-end e bancos de dados complementa o trabalho de interface e facilita a construção de produtos web completos.",
    facts: [
      { label: "Localização", value: "Pelotas, RS · Brasil", detail: "" },
      {
        label: "Atuação",
        value: "Desenvolvimento front-end",
        detail: "Interfaces · React · TypeScript",
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
          "Aplicação para navegação por canais e eventos ao vivo, com catálogo, agenda e páginas de reprodução. Construída com Vinext sobre Vite, usa rotas no servidor para integrar uma API externa e aplica políticas de origem aos players incorporados.",
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
    messagePlaceholder: "Conte sobre a oportunidade ou projeto…",
    submit: "Preparar e-mail",
    formHint: "Ao enviar, seu aplicativo de e-mail será aberto com a mensagem preenchida.",
    formFallback: "Se nada acontecer, envie diretamente para",
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
    title: "geanluca.dev │ Front-end Developer",
    description:
      "Modern interfaces and responsive web applications. Explore Gean Luca's front-end work with React, TypeScript, and API integration.",
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
    role: "Front-end Developer",
    description:
      "Front-end developer focused on modern web applications, responsive interfaces, API integration, and accessible experiences.",
    viewProjects: "View projects",
    contact: "Contact me",
    downloadCv: "Download CV",
    profile: "/ profile",
    profileAlt: "Profile photo of Gean Luca",
  },
  about: {
    eyebrow: "/ about",
    title: "About me",
    body: "I am a front-end developer with a degree in Systems Analysis and Development. I create modern, responsive, and accessible interfaces, turning requirements into clear experiences and integrating applications with APIs and services. My back-end and database experience complements my interface work and helps me build complete web products.",
    facts: [
      { label: "Location", value: "Pelotas, RS · Brazil", detail: "" },
      {
        label: "Role",
        value: "Front-end development",
        detail: "Interfaces · React · TypeScript",
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
          "Application for browsing live channels and events, with a catalog, schedule, and playback pages. Built with Vinext on Vite, it uses server routes to integrate an external API and applies origin policies to embedded players.",
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
    messagePlaceholder: "Tell me about the opportunity or project…",
    submit: "Prepare email",
    formHint: "Submitting opens your email app with the message ready to send.",
    formFallback: "If nothing happens, email me directly at",
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
