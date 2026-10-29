import { useRef } from "react";
import { Code2, Database, Workflow } from "lucide-react";
import { techGroups } from "@/data/portfolio";
import { useLanguage, type Messages } from "@/i18n/LanguageProvider";
import { canRevealBelowFold, gsap, useGSAP } from "@/lib/gsap";
import { TechIcon } from "./TechIcon";

const icons = { code: Code2, database: Database, workflow: Workflow } as const;

const coreStack = new Set([
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Python",
  "Django",
  "PostgreSQL",
]);

function TechnologyGroup({
  group,
  translatedGroup,
}: {
  group: (typeof techGroups)[number];
  translatedGroup: Messages["technologies"]["groups"][number];
}) {
  const Icon = icons[group.icon as keyof typeof icons];

  return (
    <div className="tech-group flex h-full flex-col justify-between border border-border bg-surface p-4 sm:p-5">
      <div>
        <h3 className="flex items-center gap-2 border-b border-border pb-3 text-sm font-medium">
          <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          {translatedGroup.title}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {group.items.map((item, itemIndex) => (
            <li
              key={item}
              className={`technology-chip inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-xs ${
                coreStack.has(item)
                  ? "border-primary/40 bg-primary/5 text-foreground"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              <span className="technology-chip-icon text-primary/80">
                <TechIcon name={item} />
              </span>
              {translatedGroup.items[itemIndex]}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
        {translatedGroup.summary}
      </p>
    </div>
  );
}

export function Technologies() {
  const { messages } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (canRevealBelowFold(sectionRef.current, ".tech-header")) {
        gsap.from(".tech-header", {
          opacity: 0,
          y: 16,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tech-header",
            start: "top 88%",
            once: true,
          },
        });
      }

      if (canRevealBelowFold(sectionRef.current, ".tech-groups")) {
        gsap.from(".tech-group", {
          opacity: 0,
          y: 18,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tech-groups",
            start: "top 88%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="tecnologias" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="tech-header">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] text-primary uppercase">
            <span className="text-primary/70">02 //</span>{" "}
            {messages.technologies.eyebrow.replace(/^\/\s*/, "")}
          </p>
          <h2 className="mt-2.5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2rem]">
            {messages.technologies.title}
          </h2>
        </div>

        <div className="tech-groups mt-6 grid gap-2.5 sm:mt-8 sm:gap-3 md:grid-cols-3">
          {techGroups.map((group, index) => (
            <TechnologyGroup
              key={group.title}
              group={group}
              translatedGroup={messages.technologies.groups[index]!}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
