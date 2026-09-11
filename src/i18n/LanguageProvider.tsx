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
    title: "geanluca.dev | Desenvolvedor Frontend",
    description:
      "Sites e aplicações web com React e TypeScript. Conheça os projetos de Gean Luca, desenvolvedor frontend com foco em usabilidade, desempenho e interfaces responsivas.",
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
    role: "Desenvolvedor Frontend",
    description:
      "Crio interfaces web com React e TypeScript, unindo desempenho, consistência visual e atenção aos detalhes.",
    viewProjects: "Ver projetos",
    contact: "Fale comigo",
    profile: "/ perfil",
    profileAlt: "Foto de perfil de Gean Luca",
  },
  about: {
    eyebrow: "/ sobre",
    title: "Sobre mim",
    body: "Meu foco é transformar necessidades em interfaces claras e funcionais. Trabalho com React e TypeScript na construção de aplicações responsivas, integração com APIs e organização de componentes. Meus projetos incluem ferramentas de gestão, consulta de conteúdo e organização de acervos, sempre com atenção à navegação e aos detalhes de uso.",
    facts: [
      { label: "Localização", value: "Pelotas, RS · Brasil", detail: "" },
      {
        label: "Atuação",
        value: "Desenvolvimento de interfaces web",
        detail: "React · TypeScript",
      },
      {
        label: "Formação",
        value: "Análise e Desenvolvimento de Sistemas",
        detail: "Senac RS · em andamento · conclusão prevista em 2026",
      },
    ],
  },
  technologies: {
    eyebrow: "/ stack",
    title: "Tecnologias",
    groups: [
      {
        title: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
      },
      {
        title: "Ferramentas",
        items: ["Git", "GitHub", "npm", "Docker", "Figma", "Visual Studio Code"],
      },
      {
        title: "Práticas de desenvolvimento",
        items: [
          "Design responsivo",
          "Acessibilidade",
          "HTML semântico",
          "SEO técnico",
          "Core Web Vitals",
          "Otimização de performance",
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
          "Organiza escalas, horários e solicitações de folga em um só lugar. Valida limites de agendamento e permite acompanhar a programação e exportar os dados para apoiar o planejamento da equipe.",
      },
      {
        category: "Conteúdo & Transmissões",
        description:
          "Reúne canais ao vivo e programação esportiva em uma interface de consulta rápida. Integra busca de conteúdo, grade de eventos atualizada e reprodução de transmissões em um único fluxo.",
      },
      {
        category: "Catálogo & Gestão de acervo",
        description:
          "Centraliza a consulta e o gerenciamento de livros, autores e categorias. Conecta uma interface em Next.js a uma API própria em Flask, com armazenamento em SQLite e navegação adaptada ao celular.",
      },
    ],
  },
  contact: {
    eyebrow: "/ contato",
    title: "Vamos conversar sobre seu próximo projeto?",
    text: "Tem uma ideia, precisa de uma interface para seu negócio ou quer conversar sobre uma oportunidade? Entre em contato por e-mail ou LinkedIn e me conte o que você precisa.",
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
    title: "geanluca.dev | Frontend Developer",
    description:
      "Websites and web applications built with React and TypeScript. Explore Gean Luca's work in usability, performance, and responsive interfaces.",
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
    role: "Frontend Developer",
    description:
      "I build web interfaces with React and TypeScript, combining performance, visual consistency, and attention to detail.",
    viewProjects: "View projects",
    contact: "Contact me",
    profile: "/ profile",
    profileAlt: "Profile photo of Gean Luca",
  },
  about: {
    eyebrow: "/ about",
    title: "About me",
    body: "I focus on turning requirements into clear, functional interfaces. I work with React and TypeScript to build responsive applications, integrate APIs, and organize reusable components. My projects include management tools, content discovery, and library organization, always with careful attention to navigation and usability.",
    facts: [
      { label: "Location", value: "Pelotas, RS · Brazil", detail: "" },
      { label: "Role", value: "Web interface development", detail: "React · TypeScript" },
      {
        label: "Education",
        value: "Systems Analysis and Development",
        detail: "Senac RS · in progress · expected graduation in 2026",
      },
    ],
  },
  technologies: {
    eyebrow: "/ stack",
    title: "Technologies",
    groups: [
      {
        title: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
      },
      {
        title: "Tools",
        items: ["Git", "GitHub", "npm", "Docker", "Figma", "Visual Studio Code"],
      },
      {
        title: "Development practices",
        items: [
          "Responsive design",
          "Accessibility",
          "Semantic HTML",
          "Technical SEO",
          "Core Web Vitals",
          "Performance optimization",
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
          "Organizes schedules, working hours, and time-off requests in one place. It validates scheduling limits, tracks team plans, and exports data to support workforce planning.",
      },
      {
        category: "Content & Streaming",
        description:
          "Brings live channels and sports schedules into a fast discovery interface. It combines content search, an updated events guide, and stream playback in a single flow.",
      },
      {
        category: "Catalog & Library Management",
        description:
          "Centralizes the search and management of books, authors, and categories. It connects a Next.js interface to a custom Flask API with SQLite storage and mobile-friendly navigation.",
      },
    ],
  },
  contact: {
    eyebrow: "/ contact",
    title: "Shall we talk about your next project?",
    text: "Have an idea, need an interface for your business, or want to discuss an opportunity? Send me an email or connect on LinkedIn and tell me what you need.",
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
