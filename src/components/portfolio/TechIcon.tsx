import { CodeXml, Database, Layers, ServerCog } from "lucide-react";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiCloudflare,
  SiCloudflarepages,
  SiCloudflareworkers,
  SiDjango,
  SiDocker,
  SiFlask,
  SiGit,
  SiHono,
  SiJsonwebtokens,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiShadcnui,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiZod,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

type IconComponent = IconType | typeof Layers;

const techIcons: Record<string, IconComponent> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  Vinext: Layers,
  TypeScript: SiTypescript,
  Vite: SiVite,
  "Tailwind CSS": SiTailwindcss,
  "shadcn/ui": SiShadcnui,
  Python: SiPython,
  Django: SiDjango,
  "Django REST Framework": ServerCog,
  Flask: SiFlask,
  Java: FaJava,
  "REST API": TbApi,
  JWT: SiJsonwebtokens,
  PostgreSQL: SiPostgresql,
  MySQL: Database,
  SQLite: SiSqlite,
  Docker: SiDocker,
  Supabase: SiSupabase,
  "Cloudflare Workers": SiCloudflareworkers,
  "Cloudflare Pages": SiCloudflarepages,
  Render: SiRender,
  Git: SiGit,
  Hono: SiHono,
  D1: SiCloudflare,
  Zod: SiZod,
};

export function TechIcon({
  name,
  className = "h-3.5 w-3.5",
}: {
  name: string;
  className?: string;
}) {
  const Icon: IconComponent = techIcons[name] ?? CodeXml;
  return <Icon className={className} aria-hidden />;
}
