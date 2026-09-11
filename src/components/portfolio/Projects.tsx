import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, FolderGit2, Github } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage, type Messages } from "@/i18n/LanguageProvider";

function ProjectCard({
  project,
  index,
  labels,
}: {
  project: Project;
  index: number;
  labels: Pick<Messages["projects"], "screenshotAlt" | "viewProject" | "viewCode" | "opensNewTab">;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      data-delay={String(index * 70)}
      className="project-card reveal-target flex w-[min(86vw,340px)] min-w-0 shrink-0 snap-start flex-col overflow-hidden border border-border bg-surface transition-[transform,border-color,box-shadow] duration-300 md:w-auto"
    >
      {project.image && (
        <div className="aspect-video overflow-hidden border-b border-border bg-background">
          <img
            src={project.image}
            alt={`${labels.screenshotAlt} ${project.name}`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="project-image h-full w-full object-cover object-top transition-transform duration-500 ease-out"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col p-3.5 md:p-4">
        <p className="font-mono text-[11px] tracking-wider text-primary uppercase">
          {project.category}
        </p>
        <h3 className="mt-1 text-base font-medium">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <ul className="mt-3 flex flex-wrap gap-1 md:mt-4 md:gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-4 md:pt-5">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${labels.viewProject} ${project.name} (${labels.opensNewTab})`}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:flex-none sm:text-xs"
            >
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
              {labels.viewProject}
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${labels.viewCode}: ${project.name} (${labels.opensNewTab})`}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs font-medium transition-colors duration-200 hover:border-primary hover:text-primary sm:flex-none"
            >
              <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
              {labels.viewCode}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { messages } = useLanguage();
  const carousel = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const headingRef = useReveal<HTMLDivElement>();
  const updateEdges = useCallback(() => {
    const element = carousel.current;
    if (!element) return;
    setEdges({
      start: element.scrollLeft <= 1,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const element = carousel.current;
    if (!element) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(element);
    updateEdges();
    return () => observer.disconnect();
  }, [updateEdges]);

  const scrollProject = (direction: number) => {
    const element = carousel.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 12),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <section id="projetos" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div ref={headingRef} className="reveal-target">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
            <FolderGit2 className="h-3.5 w-3.5" aria-hidden /> {messages.projects.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.projects.title}
          </h2>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 md:hidden">
          <p className="font-mono text-xs text-muted-foreground">{messages.projects.dragHint}</p>
          <div className="flex shrink-0 gap-2">
            {[
              {
                label: messages.projects.previous,
                direction: -1,
                disabled: edges.start,
                Icon: ArrowLeft,
              },
              {
                label: messages.projects.next,
                direction: 1,
                disabled: edges.end,
                Icon: ArrowRight,
              },
            ].map(({ label, direction, disabled, Icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                aria-controls="project-list"
                disabled={disabled}
                onClick={() => scrollProject(direction)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-primary transition-colors hover:border-primary disabled:cursor-default disabled:opacity-40"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={carousel}
          id="project-list"
          role="region"
          aria-label={messages.projects.regionLabel}
          tabIndex={0}
          onScroll={updateEdges}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget || window.innerWidth >= 768) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              scrollProject(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
          className="scrollbar-none -mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:mx-0 md:mt-8 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={{ ...project, ...messages.projects.entries[index] }}
              index={index}
              labels={messages.projects}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
