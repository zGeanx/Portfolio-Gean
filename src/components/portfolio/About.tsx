import { Briefcase, GraduationCap, MapPin, User } from "lucide-react";
import { facts } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/i18n/LanguageProvider";

const factIcons = {
  "map-pin": MapPin,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
} as const;

type FactCardData = {
  icon: keyof typeof factIcons;
  label: string;
  value: string;
  detail: string;
};

function FactCard({ fact, index }: { fact: FactCardData; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  const Icon = factIcons[fact.icon];

  return (
    <div
      ref={ref}
      data-delay={String(index * 70)}
      className="fact-card reveal-target flex flex-col justify-between border border-border bg-surface p-4.5 transition-[border-color,box-shadow] duration-300"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <dt className="font-mono text-xs tracking-[0.06em] text-muted-foreground">
            {fact.label}
          </dt>
          <Icon className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
        </div>
        <dd className="mt-2.5 text-sm font-medium text-foreground">{fact.value}</dd>
      </div>
      {fact.detail && (
        <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{fact.detail}</dd>
      )}
    </div>
  );
}

export function About() {
  const { messages } = useLanguage();
  const headingRef = useReveal<HTMLDivElement>();
  const introRef = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
          <div ref={headingRef} className="reveal-target">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] text-primary uppercase">
              <span className="text-primary/70">01 //</span>{" "}
              {messages.about.eyebrow.replace(/^\/\s*/, "")}
            </p>
            <h2 className="mt-2.5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2rem]">
              {messages.about.title}
            </h2>
          </div>
          <div ref={introRef} data-delay="80" className="reveal-target">
            <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
              {messages.about.body}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
          {facts.map((fact, index) => (
            <FactCard
              key={fact.icon}
              fact={{ icon: fact.icon, ...messages.about.facts[index]! }}
              index={index}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
