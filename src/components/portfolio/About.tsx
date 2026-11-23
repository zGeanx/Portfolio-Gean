import type { CSSProperties } from "react";
import { pillars, projects } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "./internalNavigation";
import { SectionHeading } from "./SectionHeading";

const projectNames = new Map(projects.map((project) => [project.id, project.name]));

export function About() {
  const { messages } = useLanguage();
  const { about } = messages;

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="border-b border-border">
      <div className="shell section-y grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="sobre-title" title={about.title} className="lg:sticky lg:top-28" />
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:pt-14">
          <div
            data-reveal=""
            className="space-y-5 text-[17px] leading-[1.7] text-pretty sm:text-lg"
          >
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-foreground" : "text-muted-foreground"}>
                {paragraph}
              </p>
            ))}
          </div>

          <h3 data-reveal="" className="mt-14 text-lg font-semibold tracking-tight">
            {about.pillarsLabel}
          </h3>
          <ol className="mt-5 border-t border-border">
            {pillars.map((pillar, index) => {
              const copy = about.pillars[pillar.id];
              return (
                <li
                  key={pillar.id}
                  data-reveal=""
                  style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                  className="grid gap-x-6 gap-y-2 border-b border-border py-6 sm:grid-cols-[2.5rem_1fr]"
                >
                  <span aria-hidden className="pt-1 font-mono text-xs text-primary">
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold tracking-tight">{copy.title}</h4>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{copy.text}</p>
                    <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                      {about.evidenceLabel}:{" "}
                      {pillar.projects.map((projectId, projectIndex) => (
                        <span key={projectId}>
                          <a
                            href={`#projeto-${projectId}`}
                            onClick={(event) => scrollToSection(event, `projeto-${projectId}`)}
                            className="text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                          >
                            {projectNames.get(projectId)}
                          </a>
                          {projectIndex < pillar.projects.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
