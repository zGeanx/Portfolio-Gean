import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage, type Messages } from "@/i18n/LanguageProvider";

type ProjectLabels = Pick<
  Messages["projects"],
  "screenshotAlt" | "viewProject" | "viewCode" | "opensNewTab"
>;

function ProjectCard({
  project,
  index,
  labels,
}: {
  project: Project;
  index: number;
  labels: ProjectLabels;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      data-delay={String(index * 70)}
      className="project-card reveal-target group flex w-[min(86vw,340px)] min-w-0 shrink-0 snap-start flex-col overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-primary/50 hover:shadow-lg md:w-auto"
    >
      {project.image && (
        <div className="relative aspect-video overflow-hidden border-b border-border bg-background">
          <img
            src={project.image}
            alt={`${labels.screenshotAlt} ${project.name}`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="project-image h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-xs tracking-[0.06em] text-primary">{project.category}</p>
          <span className="font-mono text-xs text-muted-foreground/60">0{index + 1} //</span>
        </div>
        <h3 className="mt-1.5 text-lg font-medium text-foreground">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          {project.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1 md:mt-4 md:gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground"
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
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/85 active:scale-[0.98]"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              {labels.viewProject}
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${labels.viewCode}: ${project.name} (${labels.opensNewTab})`}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary hover:text-primary active:scale-[0.98]"
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const headingRef = useReveal<HTMLDivElement>();

  const updateEdges = useCallback(() => {
    const element = carousel.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.getBoundingClientRect().width + 12 : 300;
    const idx = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(element.scrollLeft / cardWidth)),
    );
    setCurrentIndex(idx);
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

  const scrollToIndex = (index: number) => {
    const element = carousel.current;
    const card = element?.firstElementChild as HTMLElement | null;
    if (!element || !card) return;
    const cardWidth = card.getBoundingClientRect().width + 12;
    element.scrollTo({
      left: index * cardWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const projectList = projects.map((project, index) => ({
    ...project,
    ...messages.projects.entries[index],
  }));

  return (
    <section id="projetos" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div ref={headingRef} className="reveal-target">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] text-primary uppercase">
            <span className="text-primary/70">03 //</span>{" "}
            {messages.projects.eyebrow.replace(/^\/\s*/, "")}
          </p>
          <h2 className="mt-2.5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2rem]">
            {messages.projects.title}
          </h2>
        </div>

        {/* Controles de navegação para Mobile */}
        <div className="mt-4 flex items-center justify-between gap-3 md:hidden">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-semibold text-primary">
              0{currentIndex + 1}
              <span className="font-normal text-muted-foreground/60"> / 0{projects.length}</span>
            </span>
            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Indicadores de projetos"
            >
              {projects.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === idx}
                  aria-label={`Ir para projeto ${idx + 1}: ${p.name}`}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-6 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
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

        {/* Visão Mobile: Carrossel Snap Fluido */}
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
          className="scrollbar-none -mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          {projectList.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              labels={messages.projects}
            />
          ))}
        </div>

        {/* Visão Desktop / Tablet: Grade Regular de Projetos */}
        <div className="hidden md:mt-8 md:grid md:grid-cols-2 gap-5">
          {projectList.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              labels={messages.projects}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
