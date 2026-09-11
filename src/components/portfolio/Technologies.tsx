import { Code2, CodeXml, Layers, Wrench } from "lucide-react";
import { techGroups } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage, type Messages } from "@/i18n/LanguageProvider";

const icons = { code: Code2, wrench: Wrench, layers: Layers } as const;

const techIcons: Record<string, React.ReactNode> = {
  HTML5: (
    <path d="M5 3h14l-1.3 15L12 21l-5.7-3L5 3Zm3.2 4 .2 2h7.2l-.5 5.5-3.1.9-3.1-.9-.2-2.2h2l.1.8 1.2.3 1.2-.3.2-2H8.5L8 7h.2Z" />
  ),
  CSS3: (
    <path d="M5 3h14l-1.3 15L12 21l-5.7-3L5 3Zm3.1 4 .2 2h6.8l-.2 2H8.5l.4 3.5 3.1.9 3.1-.9.4-4.8h-2l-.2 3.4-1.3.3-1.3-.3-.1-1h-2L8 16l4 1.2 4-1.2.8-9H8.1Z" />
  ),
  JavaScript: (
    <path d="M3 3h18v18H3V3Zm10 14.3c.5.9 1.2 1.5 2.4 1.5 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.4 0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.2 1.8l-1.7 1.1c-.4-.7-.9-.9-1.5-.9-.7 0-1.1.4-1.1.9 0 .7.4.9 1.4 1.4l.6.3c2 .8 3.1 1.7 3.1 3.6 0 2-1.6 3.2-3.8 3.2-2.1 0-3.5-1-4.2-2.5l1.8-1Zm-6 .1c.4.7.7 1.3 1.5 1.3.7 0 1.2-.3 1.2-1.5V9.5h2.2v7.8c0 2.3-1.3 3.3-3.3 3.3-1.8 0-2.8-.9-3.3-2.1L7 17.4Z" />
  ),
  TypeScript: (
    <path d="M3 3h18v18H3V3Zm4 6.5v1.8h2.6v8.2h2.1v-8.2h2.6V9.5H7Zm8 8.3c.7 1.2 1.9 1.9 3.5 1.9 1.8 0 3.2-.9 3.2-2.7 0-1.6-.9-2.3-2.7-3l-.5-.2c-.9-.4-1.3-.6-1.3-1.1 0-.4.3-.7.9-.7.6 0 1 .3 1.4.9l1.6-1c-.7-1.1-1.7-1.6-3-1.6-1.9 0-3.1 1.2-3.1 2.7 0 1.7 1 2.4 2.5 3l.5.2c1 .4 1.5.7 1.5 1.2 0 .5-.5.8-1.2.8-.9 0-1.5-.5-1.9-1.2L15 17.8Z" />
  ),
  React: (
    <>
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(120 12 12)"
      />
      <circle cx="12" cy="12" r="1.8" />
    </>
  ),
  "Tailwind CSS": (
    <path d="M12 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7 1.2 1.2 2.6 2.5 5.4 2.5 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7C16.2 7.3 14.8 6 12 6ZM6 10.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7C7.8 16.7 9.2 18 12 18c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7-1.2-1.2-2.6-2.5-5.4-2.5Z" />
  ),
  Git: (
    <path d="m22.5 10.6-9.1-9.1a2 2 0 0 0-2.8 0L8.7 3.4l2.4 2.4a2.4 2.4 0 0 1 3 3l2.3 2.3a2.4 2.4 0 1 1-1.4 1.4l-2.2-2.2v5.8a2.4 2.4 0 1 1-2 0V10a2.4 2.4 0 0 1-1.3-3L7.3 4.8l-5.8 5.8a2 2 0 0 0 0 2.8l9.1 9.1a2 2 0 0 0 2.8 0l9.1-9.1a2 2 0 0 0 0-2.8Z" />
  ),
  GitHub: (
    <path
      fillRule="evenodd"
      d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.3-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 6.7 8c-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1.1a9.6 9.6 0 0 1 5.1 0c2-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.7c0 3.9-2.4 4.8-4.7 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
      clipRule="evenodd"
    />
  ),
  npm: <path d="M2 7h20v10h-10v2H8v-2H2V7Zm2 2v6h4V9h2v6h2V9H4Zm10 0v6h2v-4h2v4h2V9h-6Z" />,
  Docker: (
    <path d="M13 10h3V7h-3v3Zm-4 0h3V7H9v3Zm-4 0h3V7H5v3Zm4-4h3V3H9v3Zm4 0h3V3h-3v3Zm4 4h2.8c.5 0 1.4-.2 1.8-.5-.5 3.4-3 5.1-6.1 5.1H5.2C2.8 14.6 1 13.4.4 11h16.6v-1Zm-12 4.8c.4 0 .7-.3.7-.7s-.3-.7-.7-.7-.7.3-.7.7.3.7.7.7Z" />
  ),
  Figma: (
    <path d="M12 12a3 3 0 1 0 3-3h-3v3Zm-3 9a3 3 0 0 0 3-3v-3H9a3 3 0 1 0 0 6Zm0-6h3V9H9a3 3 0 1 0 0 6Zm0-6h3V3H9a3 3 0 1 0 0 6Zm3 0h3a3 3 0 1 0 0-6h-3v6Z" />
  ),
  "Visual Studio Code": (
    <path d="m17.6 2.6-8.4 7.7L4.7 6.9 2.5 8.2v7.6l2.2 1.3 4.5-3.4 8.4 7.7 3.9-1.9v-15l-3.9-1.9Zm-.1 5.2v8.4L12 12l5.5-4.2ZM5 10l2.2 2L5 14v-4Z" />
  ),
};

function TechIcon({ name }: { name: string }) {
  const icon = techIcons[name];
  if (!icon) return <CodeXml className="h-3.5 w-3.5" aria-hidden />;
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      {icon}
    </svg>
  );
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
            className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            <span className="text-primary/80">
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
          <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
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
