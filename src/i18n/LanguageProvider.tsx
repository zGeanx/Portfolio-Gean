import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "pt-BR" | "en";

export const languages: { code: Language; shortLabel: string; name: string }[] = [
  { code: "pt-BR", shortLabel: "PT", name: "Português" },
  { code: "en", shortLabel: "EN", name: "English" },
];

const ptBR = {
  meta: {
    title: "Gean Luca - Desenvolvedor Front-end | React e TypeScript",
    description:
      "Portfólio de Gean Luca, desenvolvedor front-end em Pelotas, RS. Interfaces em React e TypeScript conectadas a APIs reais, com projetos publicados e código aberto.",
  },
  skipLink: "Pular para o conteúdo",
  opensNewTab: "abre em nova aba",
  header: {
    navLabel: "Navegação principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageLabel: "Idioma",
    lightMode: "Ativar tema claro",
    darkMode: "Ativar tema escuro",
    nav: {
      inicio: "Início",
      sobre: "Sobre",
      tecnologias: "Stack",
      projetos: "Projetos",
      contato: "Contato",
    },
    cta: "Fale comigo",
  },
  hero: {
    role: "Desenvolvedor Front-end",
    focus: "React, TypeScript e Next.js",
    description:
      "Construo interfaces em React e TypeScript conectadas a APIs reais, com atenção a responsividade, acessibilidade e código bem organizado.",
    viewProjects: "Ver projetos",
    downloadCv: "Baixar currículo",
    profileAlt: "Retrato de Gean Luca",
    factsLabel: "Resumo profissional",
    facts: {
      projects: { label: "Projetos publicados", detail: "Com demo e código aberto" },
      focus: { label: "Foco", value: "React + TypeScript", detail: "Next.js, Vite e Tailwind CSS" },
      education: { label: "Formação", value: "ADS · Senac RS", detail: "Concluída em 2026" },
      location: { label: "Base", value: "Pelotas, RS", detail: "Aberto a trabalho remoto" },
    },
  },
  about: {
    title: "Front-end com visão de ponta a ponta.",
    paragraphs: [
      "Sou desenvolvedor formado em Análise e Desenvolvimento de Sistemas pelo Senac RS. Meu foco é o front-end: transformar requisitos em interfaces claras, responsivas e fáceis de usar, com React, TypeScript e Tailwind CSS.",
      "Também tenho experiência com back-end em Python (Django e Flask), APIs REST e bancos de dados relacionais. Isso me ajuda a integrar a interface com a API com menos atrito e a entender a aplicação como um todo, do formulário ao banco de dados.",
    ],
    pillarsLabel: "O que eu faço",
    evidenceLabel: "Aplicado em",
    pillars: {
      interfaces: {
        title: "Interfaces em React",
        text: "Componentes tipados com TypeScript, layouts responsivos e cuidado com acessibilidade.",
      },
      apis: {
        title: "Integração com APIs",
        text: "Consumo e construção de APIs REST, com autenticação JWT e validação de dados.",
      },
      delivery: {
        title: "Deploy e entrega",
        text: "Aplicações publicadas em Cloudflare Workers e Pages, com Docker no ambiente quando necessário.",
      },
    },
  },
  technologies: {
    title: "Tecnologias com que trabalho.",
    intro:
      "O foco principal está no ecossistema React e TypeScript. No back-end e na infraestrutura, uso o que cada projeto pede.",
    groups: {
      frontend: { title: "Front-end", summary: "Interfaces rápidas, acessíveis e responsivas." },
      backend: { title: "Back-end", summary: "APIs REST, autenticação e regras de negócio." },
      delivery: {
        title: "Dados e entrega",
        summary: "Bancos relacionais, containers e deploy na borda.",
      },
    },
  },
  projects: {
    title: "Trabalhos selecionados.",
    intro: "Todos com demo publicada e código aberto no GitHub.",
    moreOnGithub: "Ver todos no GitHub",
    screenshotAlt: "Captura de tela do projeto",
    viewProject: "Ver projeto",
    viewCode: "Código",
    stackLabel: "Tecnologias utilizadas",
    entries: {
      "pulso-tv": {
        category: "Conteúdo e transmissões",
        highlight: "SSR na borda · Streaming ao vivo",
        description:
          "Catálogo de canais e transmissões ao vivo com grade de programação e player integrado. As rotas sensíveis rodam no servidor, e o deploy é feito na borda com Cloudflare Workers.",
      },
      "sistema-de-folgas": {
        category: "Gestão e produtividade",
        highlight: "Full stack · Autenticação JWT",
        description:
          "Plataforma full stack para solicitar e aprovar folgas, com portal público e painel protegido por JWT. A API foi feita em Django REST Framework, com PostgreSQL hospedado no Supabase.",
      },
      "api-pulso": {
        category: "API e transmissões",
        highlight: "Serverless · Sincronização diária com D1",
        description:
          "API de canais e jogos com painel de administração, autenticação JWT e player público. Roda em Cloudflare Workers com Hono e banco D1, e sincroniza a grade do dia automaticamente.",
      },
      "books-library": {
        category: "Catálogo e gestão de acervo",
        highlight: "Next.js + Flask · Docker",
        description:
          "Sistema para gerenciar e buscar um acervo de livros por título e autor. Interface em Next.js e TypeScript consumindo uma API em Flask com SQLite, em ambiente com Docker.",
      },
    },
  },
  contact: {
    title: "Vamos conversar?",
    text: "Estou em busca de oportunidades de estágio e vagas júnior em front-end, inclusive remotas, e aberto a projetos e colaborações. Escreva pelo formulário ou pelo canal que preferir.",
    channelsLabel: "Canais diretos",
    formTitle: "Envie uma mensagem",
    name: "Nome",
    namePlaceholder: "Seu nome",
    emailPlaceholder: "voce@empresa.com",
    message: "Mensagem",
    messagePlaceholder: "Conte sobre a vaga, o projeto ou a ideia…",
    submit: "Enviar mensagem",
    sending: "Enviando…",
    formHint: "A mensagem chega direto na minha caixa de entrada. Se preferir, escreva para",
    successTitle: "Mensagem enviada.",
    successText: "Obrigado pelo contato! Recebi sua mensagem e retorno assim que possível.",
    sendAnother: "Enviar outra mensagem",
    email: "E-mail",
    copyAria: "Copiar e-mail",
    copiedTitle: "E-mail copiado!",
    copiedDescription: "Agora é só colar onde preferir.",
    resume: "Currículo",
    resumeDetail: "PDF para download",
    errorTitle: "Não foi possível enviar a mensagem.",
    errorDescription: "Tente novamente ou escreva diretamente por e-mail.",
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
  footer: {
    tagline: "Desenvolvedor Front-end · Pelotas, RS",
    rightsReserved: "Todos os direitos reservados.",
    builtWith: "Feito com TanStack Start, React e Tailwind CSS.",
    copyEmail: "Copiar e-mail",
    backToTop: "Voltar ao topo",
  },
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
    title: "Gean Luca - Front-end Developer | React and TypeScript",
    description:
      "Portfolio of Gean Luca, a front-end developer based in Pelotas, Brazil. React and TypeScript interfaces connected to real APIs, with live projects and open-source code.",
  },
  skipLink: "Skip to content",
  opensNewTab: "opens in a new tab",
  header: {
    navLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    lightMode: "Switch to light theme",
    darkMode: "Switch to dark theme",
    nav: {
      inicio: "Home",
      sobre: "About",
      tecnologias: "Stack",
      projetos: "Projects",
      contato: "Contact",
    },
    cta: "Get in touch",
  },
  hero: {
    role: "Front-end Developer",
    focus: "React, TypeScript and Next.js",
    description:
      "I build React and TypeScript interfaces connected to real APIs, with care for responsiveness, accessibility and well-organized code.",
    viewProjects: "View projects",
    downloadCv: "Download résumé",
    profileAlt: "Portrait of Gean Luca",
    factsLabel: "Professional summary",
    facts: {
      projects: { label: "Live projects", detail: "With demo and open-source code" },
      focus: {
        label: "Focus",
        value: "React + TypeScript",
        detail: "Next.js, Vite and Tailwind CSS",
      },
      education: {
        label: "Education",
        value: "Systems Dev. · Senac RS",
        detail: "Completed in 2026",
      },
      location: { label: "Based in", value: "Pelotas, Brazil", detail: "Open to remote work" },
    },
  },
  about: {
    title: "Front-end with an end-to-end view.",
    paragraphs: [
      "I'm a developer with a degree in Systems Analysis and Development from Senac RS. My focus is front-end: turning requirements into clear, responsive and easy-to-use interfaces with React, TypeScript and Tailwind CSS.",
      "I also have experience with back-end in Python (Django and Flask), REST APIs and relational databases. That helps me connect the interface to the API with less friction and understand the application as a whole, from the form to the database.",
    ],
    pillarsLabel: "What I do",
    evidenceLabel: "Applied in",
    pillars: {
      interfaces: {
        title: "React interfaces",
        text: "Components typed with TypeScript, responsive layouts and attention to accessibility.",
      },
      apis: {
        title: "API integration",
        text: "Consuming and building REST APIs, with JWT authentication and data validation.",
      },
      delivery: {
        title: "Deployment and delivery",
        text: "Applications deployed to Cloudflare Workers and Pages, using Docker for the environment when needed.",
      },
    },
  },
  technologies: {
    title: "Technologies I work with.",
    intro:
      "My main focus is the React and TypeScript ecosystem. On the back-end and infrastructure side, I use what each project needs.",
    groups: {
      frontend: { title: "Front-end", summary: "Fast, accessible and responsive interfaces." },
      backend: { title: "Back-end", summary: "REST APIs, authentication and business rules." },
      delivery: {
        title: "Data and delivery",
        summary: "Relational databases, containers and edge deployment.",
      },
    },
  },
  projects: {
    title: "Selected work.",
    intro: "Every project has a live demo and open-source code on GitHub.",
    moreOnGithub: "See everything on GitHub",
    screenshotAlt: "Screenshot of the project",
    viewProject: "View project",
    viewCode: "Code",
    stackLabel: "Technologies used",
    entries: {
      "pulso-tv": {
        category: "Content and streaming",
        highlight: "Edge SSR · Live streaming",
        description:
          "Catalog of channels and live broadcasts with a programming schedule and an embedded player. Sensitive routes run on the server, and it is deployed at the edge with Cloudflare Workers.",
      },
      "sistema-de-folgas": {
        category: "Management and productivity",
        highlight: "Full stack · JWT authentication",
        description:
          "Full-stack platform to request and approve days off, with a public portal and a JWT-protected dashboard. The API is built with Django REST Framework and PostgreSQL hosted on Supabase.",
      },
      "api-pulso": {
        category: "API and broadcasts",
        highlight: "Serverless · Daily sync with D1",
        description:
          "API for channels and matches with an admin panel, JWT authentication and a public player. Runs on Cloudflare Workers with Hono and a D1 database, and syncs the daily schedule automatically.",
      },
      "books-library": {
        category: "Catalog and library management",
        highlight: "Next.js + Flask · Docker",
        description:
          "System to manage and search a book collection by title and author. Next.js and TypeScript interface consuming a Flask API with SQLite, in a Docker environment.",
      },
    },
  },
  contact: {
    title: "Let's talk?",
    text: "I'm looking for front-end internships and junior roles, including remote positions, and I'm open to projects and collaborations. Use the form or the channel you prefer.",
    channelsLabel: "Direct channels",
    formTitle: "Send a message",
    name: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    message: "Message",
    messagePlaceholder: "Tell me about the role, the project or the idea…",
    submit: "Send message",
    sending: "Sending…",
    formHint: "Your message goes straight to my inbox. If you prefer, email me at",
    successTitle: "Message sent.",
    successText:
      "Thanks for reaching out! I received your message and will reply as soon as I can.",
    sendAnother: "Send another message",
    email: "Email",
    copyAria: "Copy email",
    copiedTitle: "Email copied!",
    copiedDescription: "You can paste it wherever you prefer.",
    resume: "Résumé",
    resumeDetail: "PDF download",
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
  footer: {
    tagline: "Front-end Developer · Pelotas, Brazil",
    rightsReserved: "All rights reserved.",
    builtWith: "Built with TanStack Start, React and Tailwind CSS.",
    copyEmail: "Copy email",
    backToTop: "Back to top",
  },
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
