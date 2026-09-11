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
      className="fact-card reveal-target border border-border bg-surface p-4 transition-[border-color,box-shadow] duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          {fact.label}
        </dt>
        <Icon className="h-4 w-4 shrink-0 text-primary/75" aria-hidden />
      </div>
      <dd className="mt-2 text-sm text-foreground">{fact.value}</dd>
      {fact.detail && (
        <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{fact.detail}</dd>
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
            <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
              <User className="h-3.5 w-3.5" aria-hidden /> {messages.about.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {messages.about.title}
            </h2>
          </div>
          <div ref={introRef} data-delay="80" className="reveal-target">
            <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
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
