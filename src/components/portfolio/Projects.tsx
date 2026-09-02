import { ExternalLink, FolderGit2, Github, ImageOff } from "lucide-react";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projetos" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
          <FolderGit2 className="h-3.5 w-3.5" aria-hidden /> / trabalhos
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Projetos</h2>

        <p className="mt-2 font-mono text-[10px] text-muted-foreground/70 md:hidden">
          Arraste para o lado →
        </p>

        <div
          role="region"
          aria-label="Projetos em carrossel"
          tabIndex={0}
          className="scrollbar-none -mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:mx-0 md:mt-8 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex w-[78vw] min-w-[250px] max-w-[290px] shrink-0 snap-start flex-col overflow-hidden border border-border bg-surface transition-colors duration-200 hover:border-primary md:w-auto md:min-w-0 md:max-w-none"
            >
              <div className="aspect-video border-b border-border bg-background">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Captura de tela do projeto ${project.name}`}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 py-5 text-muted-foreground">
                    <ImageOff className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    <span className="font-mono text-[10px] sm:text-[11px]">
                      screenshot [a definir]
                    </span>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col p-3.5 md:p-4">
                <p className="font-mono text-[10px] sm:text-[11px] tracking-wider text-primary uppercase">
                  {project.category}
                </p>
                <h3 className="mt-1 text-sm font-medium sm:text-base">{project.name}</h3>
                <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground md:line-clamp-none md:text-sm">
                  {project.description}
                </p>

                <ul className="mt-3 flex flex-wrap gap-1 md:mt-4 md:gap-1.5">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:text-[11px]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex gap-2 pt-4 md:pt-5">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:flex-none"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                      Demonstração
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 font-mono text-[10px] text-muted-foreground sm:flex-none sm:text-xs">
                      demo [a definir]
                    </span>
                  )}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs font-medium transition-colors duration-200 hover:border-primary hover:text-primary sm:flex-none"
                    >
                      <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                      Código
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 font-mono text-[10px] text-muted-foreground sm:flex-none sm:text-xs">
                      código [a definir]
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
