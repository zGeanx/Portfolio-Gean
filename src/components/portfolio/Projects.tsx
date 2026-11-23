import { ArrowUpRight, Github } from "lucide-react";
import { buttonClasses, buttonIconNudge } from "@/components/ui/button-styles";
import { links, projects, type Project } from "@/data/portfolio";
import { useLanguage, type Messages } from "@/i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";
import { TechIcon } from "./TechIcon";

type ProjectLabels = Messages["projects"];
type ProjectCopy = ProjectLabels["entries"][Project["id"]];

function hostname(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

function ProjectCase({
  project,
  copy,
  labels,
  opensNewTab,
}: {
  project: Project;
  copy: ProjectCopy;
  labels: ProjectLabels;
  opensNewTab: string;
}) {
  const titleId = `projeto-${project.id}-title`;

  return (
    <li id={`projeto-${project.id}`} className="border-b border-border">
      <article
        aria-labelledby={titleId}
        className="grid gap-8 py-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16"
      >
        <div data-reveal="" className="flex min-w-0 flex-col lg:col-span-5">
          <p className="font-mono text-xs text-muted-foreground">{copy.category}</p>
          <h3
            id={titleId}
            className="display mt-5 text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.02]"
            translate="no"
          >
            {project.name}
          </h3>
          <p className="mt-3 text-sm font-medium text-primary">{copy.highlight}</p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
            {copy.description}
          </p>

          <h4 className="sr-only">{labels.stackLabel}</h4>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-1 font-mono text-xs text-muted-foreground"
              >
                <TechIcon name={tech} className="h-3 w-3 shrink-0" />
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${labels.viewProject}: ${project.name} (${opensNewTab})`}
                className={buttonClasses("primary", "sm")}
              >
                {labels.viewProject}
                <ArrowUpRight className={buttonIconNudge} aria-hidden />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${labels.viewCode}: ${project.name} (${opensNewTab})`}
                className={buttonClasses("secondary", "sm")}
              >
                <Github className="h-4 w-4 shrink-0" aria-hidden />
                {labels.viewCode}
              </a>
            )}
          </div>
        </div>

        {project.image && (
          <div data-reveal="" className="order-first min-w-0 lg:order-none lg:col-span-7">
            <a
              href={project.demo ?? project.repo ?? undefined}
              target="_blank"
              rel="noreferrer noopener"
              tabIndex={-1}
              aria-hidden="true"
              className="project-shot block overflow-hidden rounded-md border border-border bg-surface transition-colors duration-200"
            >
              {project.demo && (
                <span className="flex items-center gap-2 border-b border-border px-3.5 py-2.5 font-mono text-[11px] text-muted-foreground">
                  {hostname(project.demo)}
                </span>
              )}
              <span className="block aspect-[2/1] overflow-hidden bg-background">
                <img
                  src={project.image}
                  alt={`${labels.screenshotAlt} ${project.name}`}
                  width={1200}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </span>
            </a>
          </div>
        )}
      </article>
    </li>
  );
}

export function Projects() {
  const { messages } = useLanguage();
  const labels = messages.projects;

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="border-b border-border">
      <div className="shell section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="projetos-title" title={labels.title} intro={labels.intro} />
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start text-sm font-medium text-foreground hover:text-primary lg:self-auto"
          >
            <Github className="h-4 w-4" aria-hidden />
            {labels.moreOnGithub}
            <span className="sr-only">({messages.opensNewTab})</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <ol className="mt-12 border-t border-border sm:mt-16">
          {projects.map((project) => (
            <ProjectCase
              key={project.id}
              project={project}
              copy={labels.entries[project.id]}
              labels={labels}
              opensNewTab={messages.opensNewTab}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
