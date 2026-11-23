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
  institution: "Senac RS",
  location: { city: "Pelotas", region: "RS", country: "BR" },
};

export const links = {
  github: "https://github.com/zGeanx",
  githubHandle: "@zGeanx",
  linkedin: "https://www.linkedin.com/in/gean-luca-a758b5215",
  email: "geanlucadias12@gmail.com",
  resume: "/gean-luca-cv.pdf",
  resumeFileName: "Gean-Luca-Curriculo.pdf",
};

export const sectionIds = ["inicio", "sobre", "tecnologias", "projetos", "contato"] as const;
export type SectionId = (typeof sectionIds)[number];

export const techGroups = [
  {
    id: "frontend",
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
    id: "backend",
    items: ["Python", "Django", "Django REST Framework", "Flask", "Java", "REST API", "JWT"],
  },
  {
    id: "delivery",
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
] as const;

export type TechGroupId = (typeof techGroups)[number]["id"];

export type ProjectId = "pulso-tv" | "sistema-de-folgas" | "api-pulso" | "books-library";

export type Project = {
  id: ProjectId;
  name: string;
  tech: string[];
  demo: string | null;
  repo: string | null;
  image: string | null;
};

export const projects: Project[] = [
  {
    id: "pulso-tv",
    name: "Pulso TV",
    tech: ["React", "Vinext", "Vite", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
    demo: "https://www.pulso-tv.online/",
    repo: "https://github.com/zGeanx/pulso-tv/tree/v2",
    image: pulsoTvShot,
  },
  {
    id: "sistema-de-folgas",
    name: "Sistema de Folgas",
    tech: ["React", "Vite", "Django", "Django REST Framework", "JWT", "PostgreSQL", "Supabase"],
    demo: "https://sistema-de-folgas.pages.dev",
    repo: "https://github.com/zGeanx/Sistema_De_Folgas",
    image: sistemaFolgasShot,
  },
  {
    id: "api-pulso",
    name: "API Pulso",
    tech: ["Hono", "Cloudflare Workers", "D1", "React", "TypeScript", "JWT", "Zod"],
    demo: "https://api.pulso-tv.online/",
    repo: "https://github.com/zGeanx/api",
    image: pulsoApiShot,
  },
  {
    id: "books-library",
    name: "Books Library",
    tech: ["Next.js", "TypeScript", "Flask", "SQLite", "Docker", "shadcn/ui"],
    demo: "https://books-library.geanlucadias12.workers.dev/",
    repo: "https://github.com/zGeanx/Books-Library",
    image: booksLibraryShot,
  },
];

export const pillars = [
  { id: "interfaces", projects: ["pulso-tv", "sistema-de-folgas", "books-library"] },
  { id: "apis", projects: ["sistema-de-folgas", "api-pulso", "books-library"] },
  { id: "delivery", projects: ["pulso-tv", "api-pulso", "sistema-de-folgas", "books-library"] },
] as const satisfies readonly { id: string; projects: readonly ProjectId[] }[];

export type PillarId = (typeof pillars)[number]["id"];

export const publishedProjectCount = projects.filter((project) => project.demo).length;
