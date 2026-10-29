import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "pt-BR" | "en";

export const languages: { code: Language; shortLabel: string; name: string }[] = [
  { code: "pt-BR", shortLabel: "PT-BR", name: "Português" },
  { code: "en", shortLabel: "ENG", name: "English" },
];

const ptBR = {
  meta: {
    title: "geanluca.dev │ Desenvolvedor Front-end",
    description:
      "Construo interfaces em React e TypeScript conectadas a APIs reais. Conheça os projetos de Gean Luca, desenvolvedor front-end com foco em performance e usabilidade.",
  },
  skipLink: "Ir para o conteúdo",
  header: {
    navLabel: "Navegação principal",
    mobileNavLabel: "Navegação mobile",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    menuTitle: "Navegação",
    menuDescription: "Navegue pelas seções e preferências do portfólio",
    languageLabel: "Selecionar idioma",
    lightMode: "Ativar light mode",
    darkMode: "Ativar dark mode",
    nav: ["Início", "Sobre", "Tecnologias", "Projetos", "Contato"],
  },
  hero: {
    role: "Desenvolvedor Front-end",
    description:
      "Construo interfaces em React e TypeScript conectadas a APIs reais, unindo precisão visual, performance e código limpo do formulário ao banco de dados.",
    viewProjects: "Ver projetos",
    contact: "Fale comigo",
    downloadCv: "Baixar CV",
    profile: "/ perfil",
    profileAlt: "Foto de perfil de Gean Luca",
  },
  about: {
    eyebrow: "/ sobre",
    title: "Sobre mim",
    body: "Sou desenvolvedor formado em Análise e Desenvolvimento de Sistemas (Senac RS). Minha atuação principal é no front-end com React e TypeScript, mas meu domínio de back-end (Python, APIs REST) e bancos de dados me dá uma visão completa da aplicação: entendo o ciclo de ponta a ponta, antecipo gargalos de integração e entrego produtos rápidos, consistentes e fáceis de usar.",
    facts: [
      {
        label: "Localização",
        value: "Pelotas, RS · Brasil",
        detail: "Disponível para trabalho remoto",
      },
      {
        label: "Foco técnico",
        value: "React · TypeScript · Next.js",
        detail: "Interfaces, integrações & APIs",
      },
      {
        label: "Formação",
        value: "Análise e Desenv. de Sistemas",
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
        summary: "Interfaces rápidas, acessíveis e responsivas.",
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
        summary: "APIs REST, autenticação e regras de negócio.",
        items: ["Python", "Django", "Django REST Framework", "Flask", "Java", "REST API", "JWT"],
      },
      {
        title: "Dados e entrega",
        summary: "Bancos relacionais, containers e deploy na borda.",
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
    featuredTag: "Destaque // Full Stack",
    opensNewTab: "abre em nova aba",
    indicatorsLabel: "Indicadores de projetos",
    goToProject: "Ir para projeto",
    entries: [
      {
        category: "Conteúdo & Transmissões",
        highlight: "SSR na borda · Streaming ao vivo",
        description:
          "Catálogo de canais e transmissões ao vivo com programação e player integrado, utilizando rotas seguras no servidor e deploys na Cloudflare.",
      },
      {
        category: "Gestão & Produtividade",
        highlight: "Full stack · Auth JWT",
        description:
          "Plataforma full stack para solicitação e aprovação de folgas com portal público e painel com JWT. API em Django com PostgreSQL no Supabase.",
      },
      {
        category: "API & Transmissões",
        highlight: "Serverless · Sync diário com D1",
        description:
          "API de canais e jogos com painel de administração, autenticação JWT e player público. Publicada em Cloudflare Workers com Hono e D1, sincronizando a grade do dia automaticamente.",
      },
      {
        category: "Catálogo & Gestão de acervo",
        highlight: "Containers · Next.js + Flask",
        description:
          "Sistema de gerenciamento e busca de acervo bibliográfico por título e autor. Interface em Next.js conectada a API Flask com SQLite e Docker.",
      },
    ],
  },
  contact: {
    eyebrow: "/ contato",
    title: "Vamos conversar sobre seu próximo projeto?",
    text: "Estou aberto a oportunidades profissionais, projetos freelance e colaborações técnicas. Preencha o formulário ou entre em contato diretamente.",
    formTitle: "Envie uma mensagem",
    name: "Nome",
    namePlaceholder: "Como você se chama?",
    emailPlaceholder: "voce@empresa.com",
    message: "Mensagem",
    messagePlaceholder: "Conte sobre a oportunidade ou projeto…",
    submit: "Enviar mensagem",
    sending: "Enviando...",
    formHint: "Sua mensagem será entregue diretamente na minha caixa de entrada.",
    formFallback: "Se preferir, envie diretamente para",
    successTitle: "Mensagem enviada com sucesso!",
    successText: "Obrigado pelo contato. Recebi sua mensagem e retornarei o mais breve possível.",
    sendAnother: "Enviar outra mensagem",
    email: "E-mail",
    copyAria: "Copiar e-mail",
    copyTitle: "Clique para copiar o e-mail",
    copiedTitle: "E-mail copiado!",
    copiedDescription: "Agora é só colar onde preferir.",
    errorTitle: "Não foi possível enviar a mensagem.",
    errorDescription: "Tente novamente ou envie diretamente por e-mail.",
    shortcutHint: "Ctrl + Enter para enviar",
    validation: {
      nameMin: "O nome deve ter pelo menos 2 caracteres.",
      nameMax: "O nome é muito longo.",
      emailInvalid: "Digite um endereço de e-mail válido.",
      emailMax: "O e-mail é muito longo.",
      messageMin: "A mensagem deve ter pelo menos 10 caracteres.",
      messageMax: "A mensagem é muito longa.",
    },
  },
  backToTop: "Voltar ao topo",
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
      "Building interfaces in React and TypeScript integrated with real APIs. Explore projects by Gean Luca, front-end developer focused on performance and usability.",
  },
  skipLink: "Skip to content",
  header: {
    navLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Navigation",
    menuDescription: "Navigate through portfolio sections and preferences",
    languageLabel: "Select language",
    lightMode: "Enable light mode",
    darkMode: "Enable dark mode",
    nav: ["Home", "About", "Technologies", "Projects", "Contact"],
  },
  hero: {
    role: "Front-end Developer",
    description:
      "Building interfaces in React and TypeScript integrated with real APIs, bringing visual polish, performance, and clean code from form to database.",
    viewProjects: "View projects",
    contact: "Contact me",
    downloadCv: "Download CV",
    profile: "/ profile",
    profileAlt: "Profile photo of Gean Luca",
  },
  about: {
    eyebrow: "/ about",
    title: "About me",
    body: "I am a developer with a degree in Systems Analysis and Development (Senac RS). My core focus is front-end with React and TypeScript, but hands-on experience in back-end (Python, REST APIs) and databases gives me end-to-end perspective: I understand the full application lifecycle, prevent integration bottlenecks, and ship fast, accessible web products.",
    facts: [
      { label: "Location", value: "Pelotas, RS · Brazil", detail: "Available for remote work" },
      {
        label: "Core stack",
        value: "React · TypeScript · Next.js",
        detail: "Interfaces, integrations & APIs",
      },
      {
        label: "Education",
        value: "Systems Analysis & Dev.",
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
        summary: "Fast, accessible and responsive interfaces.",
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
        summary: "REST APIs, authentication and business rules.",
        items: ["Python", "Django", "Django REST Framework", "Flask", "Java", "REST API", "JWT"],
      },
      {
        title: "Data & delivery",
        summary: "Relational databases, containers and edge deployment.",
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
    featuredTag: "Featured // Full Stack",
    opensNewTab: "opens in a new tab",
    indicatorsLabel: "Project indicators",
    goToProject: "Go to project",
    entries: [
      {
        category: "Content & Streaming",
        highlight: "Edge SSR · Live streaming",
        description:
          "Live streaming catalog and broadcast schedule with an embedded player, server routes, and Cloudflare deployment.",
      },
      {
        category: "Management & Productivity",
        highlight: "Full stack · JWT auth",
        description:
          "Full-stack leave request and approval portal with JWT authentication. Powered by a Django API and Supabase PostgreSQL.",
      },
      {
        category: "API & Broadcasts",
        highlight: "Serverless · Daily sync with D1",
        description:
          "API for channels and matches, with an admin panel, JWT authentication, and a public player. Deployed on Cloudflare Workers with Hono and D1, syncing the daily schedule automatically.",
      },
      {
        category: "Catalog & Library Management",
        highlight: "Containers · Next.js + Flask",
        description:
          "Library management system featuring dynamic book and author search. Next.js interface connected to a Flask API with SQLite and Docker.",
      },
    ],
  },
  contact: {
    eyebrow: "/ contact",
    title: "Shall we talk about your next project?",
    text: "I am open to new career opportunities, freelance projects, and technical collaborations. Send a message below or reach out directly.",
    formTitle: "Send a message",
    name: "Name",
    namePlaceholder: "What is your name?",
    emailPlaceholder: "you@company.com",
    message: "Message",
    messagePlaceholder: "Tell me about the opportunity or project…",
    submit: "Send message",
    sending: "Sending...",
    formHint: "Your message will be delivered directly to my inbox.",
    formFallback: "Or email me directly at",
    successTitle: "Message sent successfully!",
    successText:
      "Thank you for reaching out. I have received your message and will get back to you shortly.",
    sendAnother: "Send another message",
    email: "Email",
    copyAria: "Copy email",
    copyTitle: "Click to copy the email",
    copiedTitle: "Email copied!",
    copiedDescription: "You can paste it wherever you prefer.",
    errorTitle: "The message could not be sent.",
    errorDescription: "Please try again or email me directly.",
    shortcutHint: "Ctrl + Enter to send",
    validation: {
      nameMin: "Name must be at least 2 characters.",
      nameMax: "Name is too long.",
      emailInvalid: "Enter a valid email address.",
      emailMax: "Email is too long.",
      messageMin: "Message must be at least 10 characters.",
      messageMax: "Message is too long.",
    },
  },
  backToTop: "Back to top",
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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
