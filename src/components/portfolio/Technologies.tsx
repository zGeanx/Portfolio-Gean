import type { CSSProperties } from "react";
import { techGroups } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";
import { TechIcon } from "./TechIcon";

export function Technologies() {
  const { messages } = useLanguage();
  const { technologies } = messages;

  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-title"
      className="border-b border-border"
    >
      <div className="shell section-y">
        <SectionHeading
          id="tecnologias-title"
          title={technologies.title}
          intro={technologies.intro}
        />

        <div className="mt-14 border-t border-border sm:mt-16">
          {techGroups.map((group, index) => {
            const copy = technologies.groups[group.id];
            return (
              <div
                key={group.id}
                data-reveal=""
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                className="grid gap-5 border-b border-border py-8 sm:py-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  <h3 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    <span aria-hidden className="font-mono text-xs font-normal text-primary">
                      0{index + 1}
                    </span>
                    {copy.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:pl-7 lg:max-w-[30ch]">
                    {copy.summary}
                  </p>
                </div>
                <ul className="flex flex-wrap content-start gap-2 lg:col-span-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="tech-chip inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-sm text-muted-foreground"
                    >
                      <TechIcon name={item} className="h-4 w-4 shrink-0 transition-colors" />
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
