import { useRef } from "react";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { facts } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { canRevealBelowFold, gsap, useGSAP } from "@/lib/gsap";

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

function FactCard({ fact }: { fact: FactCardData }) {
  const Icon = factIcons[fact.icon];

  return (
    <div className="fact-card flex flex-col justify-between rounded-sm border border-border bg-surface p-4.5 transition-colors duration-200 hover:border-border-strong">
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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (canRevealBelowFold(sectionRef.current, ".about-header")) {
        gsap.from(".about-header", {
          opacity: 0,
          y: 16,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 88%",
            once: true,
          },
        });
      }

      if (canRevealBelowFold(sectionRef.current, ".about-facts")) {
        gsap.from(".fact-card", {
          opacity: 0,
          y: 16,
          duration: 0.38,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-facts",
            start: "top 90%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="sobre" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="about-header max-w-[68ch]">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] text-primary uppercase">
            <span className="text-primary/70">01 //</span>{" "}
            {messages.about.eyebrow.replace(/^\/\s*/, "")}
          </p>
          <h2 className="mt-2.5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2rem]">
            {messages.about.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base text-pretty">
            {messages.about.body}
          </p>
        </div>

        <dl className="about-facts mt-8 grid gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-3.5">
          {facts.map((fact, index) => (
            <FactCard key={fact.icon} fact={{ icon: fact.icon, ...messages.about.facts[index]! }} />
          ))}
        </dl>
      </div>
    </section>
  );
}
