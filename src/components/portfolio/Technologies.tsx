import { Code2, CodeXml, Database, Workflow } from "lucide-react";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiCloudflarepages,
  SiCloudflareworkers,
  SiDjango,
  SiDocker,
  SiFlask,
  SiGit,
  SiJsonwebtokens,
  SiMysql,
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
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { techGroups } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage, type Messages } from "@/i18n/LanguageProvider";

const icons = { code: Code2, database: Database, workflow: Workflow } as const;

const techIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  Vinext: SiVite,
  TypeScript: SiTypescript,
  Vite: SiVite,
  "Tailwind CSS": SiTailwindcss,
  "shadcn/ui": SiShadcnui,
  Python: SiPython,
  Django: SiDjango,
  "Django REST Framework": SiDjango,
  Flask: SiFlask,
  Java: FaJava,
  "REST API": TbApi,
  JWT: SiJsonwebtokens,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Docker: SiDocker,
  Supabase: SiSupabase,
  "Cloudflare Workers": SiCloudflareworkers,
  "Cloudflare Pages": SiCloudflarepages,
  Render: SiRender,
  Git: SiGit,
};

function TechIcon({ name }: { name: string }) {
  const Icon = techIcons[name] ?? CodeXml;
  return <Icon className="h-3.5 w-3.5" aria-hidden />;
}

function TechnologyGroup({
  group,
  translatedGroup,
  index,
}: {
  group: (typeof techGroups)[number];
  translatedGroup: Messages["technologies"]["groups"][number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const Icon = icons[group.icon as keyof typeof icons];

  return (
    <div
      ref={ref}
      data-delay={String(index * 80)}
      className="reveal-target border border-border bg-surface p-4 sm:p-5"
    >
      <h3 className="flex items-center gap-2 border-b border-border pb-3 text-sm font-medium">
        <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        {translatedGroup.title}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item, itemIndex) => (
          <li
            key={item}
            className="technology-chip inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            <span className="technology-chip-icon text-primary/80">
              <TechIcon name={item} />
            </span>
            {translatedGroup.items[itemIndex]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Technologies() {
  const { messages } = useLanguage();
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="tecnologias" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div ref={headingRef} className="reveal-target">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.08em] text-primary">
            <Code2 className="h-3.5 w-3.5" aria-hidden /> {messages.technologies.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.technologies.title}
          </h2>
        </div>

        <div className="mt-6 grid gap-2.5 sm:mt-8 sm:gap-3 md:grid-cols-3">
          {techGroups.map((group, index) => (
            <TechnologyGroup
              key={group.title}
              group={group}
              translatedGroup={messages.technologies.groups[index]!}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
