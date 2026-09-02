import { Code2, Layers, Wrench } from "lucide-react";
import { techGroups } from "@/data/portfolio";

const icons = { code: Code2, wrench: Wrench, layers: Layers } as const;

export function Technologies() {
  return (
    <section id="tecnologias" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
          <Code2 className="h-3.5 w-3.5" aria-hidden /> / stack
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Tecnologias</h2>

        <div className="mt-6 grid gap-2.5 sm:mt-8 sm:gap-3 md:grid-cols-3">
          {techGroups.map((group) => {
            const Icon = icons[group.icon as keyof typeof icons];
            return (
              <div
                key={group.title}
                className="border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong sm:p-5"
              >
                <h3 className="flex items-center gap-2 border-b border-border pb-3 text-sm font-medium">
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
