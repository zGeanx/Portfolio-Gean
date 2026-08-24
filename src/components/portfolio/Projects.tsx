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

        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex flex-col overflow-hidden border border-border bg-surface transition-colors duration-200 hover:border-primary"
            >
              <div className="aspect-[16/9] sm:aspect-[16/10] border-b border-border bg-background">
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
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 py-6 text-muted-foreground">
                    <ImageOff className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    <span className="font-mono text-[10px] sm:text-[11px]">screenshot [a definir]</span>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
                <p className="font-mono text-[10px] sm:text-[11px] tracking-wider text-primary uppercase">
                  {project.category}
                </p>
                <h3 className="mt-1.5 text-sm sm:text-base font-medium">{project.name}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-1.5">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-4 sm:pt-5">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-2.5 py-1.5 sm:px-3 text-xs font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      Demonstração
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 sm:px-3 font-mono text-[11px] sm:text-xs text-muted-foreground">
                      demo [a definir]
                    </span>
                  )}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 sm:px-3 text-xs font-medium transition-colors duration-200 hover:border-primary hover:text-primary"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden />
                      Código
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 sm:px-3 font-mono text-[11px] sm:text-xs text-muted-foreground">
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
