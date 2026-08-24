import { ExternalLink, FolderGit2, Github, ImageOff } from "lucide-react";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projetos" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-16 sm:px-6">
        <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
          <FolderGit2 className="h-3.5 w-3.5" aria-hidden /> / trabalhos
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Projetos</h2>

        <div className="mt-2 flex items-center justify-between sm:hidden">
          <span className="font-mono text-[10px] text-muted-foreground/70">
            Arraste para o lado →
          </span>
        </div>

        <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-4 pt-1 snap-x snap-mandatory scrollbar-none sm:mx-0 sm:mt-8 sm:grid sm:gap-3 md:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex w-[260px] shrink-0 snap-start flex-col overflow-hidden border border-border bg-surface transition-colors duration-200 hover:border-primary sm:w-auto"
            >
              <div className="aspect-[16/10] border-b border-border bg-background">
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
                    <span className="font-mono text-[10px] sm:text-[11px]">screenshot [a definir]</span>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                <p className="font-mono text-[10px] sm:text-[11px] tracking-wider text-primary uppercase">
                  {project.category}
                </p>
                <h3 className="mt-1 text-sm font-medium sm:text-base">{project.name}</h3>
                <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm sm:line-clamp-none">
                  {project.description}
                </p>

                <ul className="mt-2.5 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:text-[11px]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-3.5 sm:gap-2 sm:pt-5">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 rounded-sm bg-primary px-2 py-1 text-[11px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                      Demonstração
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                      demo [a definir]
                    </span>
                  )}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-[11px] font-medium transition-colors duration-200 hover:border-primary hover:text-primary sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                      Código
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
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
