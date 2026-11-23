import type { CSSProperties } from "react";
import { ArrowDown, FileDown } from "lucide-react";
import { buttonClasses } from "@/components/ui/button-styles";
import { links, profile, publishedProjectCount } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { scrollToSection } from "./internalNavigation";

const rise = (delay: number) => ({ "--rise-delay": `${delay}ms` }) as CSSProperties;

const factCellBorders = [
  "pr-4",
  "border-l pl-4 sm:pl-6",
  "border-t pr-4 lg:border-t-0 lg:border-l lg:pl-6",
  "border-t border-l pl-4 sm:pl-6 lg:border-t-0",
];

export function Hero() {
  const { messages } = useLanguage();
  const { hero } = messages;
  const nameParts = profile.name.split(" ");
  const lastName = nameParts.pop() ?? "";
  const firstName = nameParts.join(" ");

  const facts = [
    {
      key: "projects",
      label: hero.facts.projects.label,
      value: String(publishedProjectCount).padStart(2, "0"),
      detail: hero.facts.projects.detail,
    },
    { key: "focus", ...hero.facts.focus },
    { key: "education", ...hero.facts.education },
    { key: "location", ...hero.facts.location },
  ];

  return (
    <section id="inicio" aria-labelledby="hero-title" className="border-b border-border">
      <div className="shell grid gap-8 pt-6 pb-14 sm:pt-16 sm:pb-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="flex min-w-0 flex-col lg:col-span-7">
          <h1
            id="hero-title"
            className="rise display mt-6 text-[clamp(3.25rem,11.5vw,6.5rem)] sm:mt-10 lg:text-[clamp(4.5rem,7.2vw,6.75rem)]"
            style={rise(60)}
          >
            {firstName} <span className="text-primary">{lastName}</span>
          </h1>

          <p
            className="rise mt-6 font-mono text-lg leading-snug text-primary sm:text-xl"
            style={rise(120)}
          >
            <span className="sr-only">{hero.role}</span>
            <span
              aria-hidden
              className="typing-role"
              style={
                {
                  "--typing-width": `${hero.role.length}ch`,
                  "--typing-steps": hero.role.length,
                } as CSSProperties
              }
            >
              {hero.role}
            </span>
            <span className="mt-2 block font-sans text-base text-muted-foreground sm:text-lg">
              {hero.focus}
            </span>
          </p>

          <p
            className="rise mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
            style={rise(180)}
          >
            {hero.description}
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
            style={rise(240)}
          >
            <a
              href="#projetos"
              onClick={(event) => scrollToSection(event, "projetos")}
              className={buttonClasses("primary")}
            >
              {hero.viewProjects}
              <ArrowDown
                className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/button:translate-y-0.5"
                aria-hidden
              />
            </a>
            <a
              href={links.resume}
              download={links.resumeFileName}
              className={buttonClasses("secondary")}
            >
              <FileDown className="h-4 w-4 shrink-0" aria-hidden />
              {hero.downloadCv}
            </a>
          </div>
        </div>

        <figure className="order-first mb-3 lg:order-none lg:col-span-5 lg:mb-0">
          <div className="relative mx-auto w-full max-w-[22rem] lg:mr-0 lg:ml-auto lg:max-w-[420px]">
            <span aria-hidden className="frame-square" />
            <div className="portrait-frame portrait-in relative overflow-hidden rounded-md border border-border bg-surface">
              <img
                src={profile.avatar}
                alt={hero.profileAlt}
                width={800}
                height={1421}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="portrait-face"
              />
            </div>
          </div>
        </figure>
      </div>

      <div className="border-t border-border">
        <h2 className="sr-only">{hero.factsLabel}</h2>
        <dl className="shell grid grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <div key={fact.key} className={cn("min-w-0 py-6 sm:py-8", factCellBorders[index])}>
              <dt className="font-mono text-xs text-muted-foreground">{fact.label}</dt>
              <dd className="mt-3 font-display text-lg leading-tight font-semibold tracking-tight [font-stretch:108%] sm:text-xl">
                {fact.value}
              </dd>
              <dd className="mt-1.5 text-[13px] leading-snug text-muted-foreground sm:text-sm">
                {fact.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
