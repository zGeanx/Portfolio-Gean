import { useRef } from "react";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { facts } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { gsap, useGSAP } from "@/lib/gsap";

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
    <div className="fact-card flex flex-col justify-between border border-border bg-surface p-4.5">
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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".about-header", {
        opacity: 0,
        y: 18,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".fact-card", {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-facts",
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="sobre" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="about-header grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] text-primary uppercase">
              <span className="text-primary/70">01 //</span>{" "}
              {messages.about.eyebrow.replace(/^\/\s*/, "")}
            </p>
            <h2 className="mt-2.5 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2rem]">
              {messages.about.title}
            </h2>
          </div>
          <div>
            <p className="max-w-[70ch] text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
              {messages.about.body}
            </p>
          </div>
        </div>

        <dl className="about-facts mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
          {facts.map((fact, index) => (
            <FactCard key={fact.icon} fact={{ icon: fact.icon, ...messages.about.facts[index]! }} />
          ))}
        </dl>
      </div>
    </section>
  );
}
