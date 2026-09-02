import { User } from "lucide-react";
import { facts, profile } from "@/data/portfolio";

export function About() {
  return (
    <section id="sobre" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
          <User className="h-3.5 w-3.5" aria-hidden /> / sobre
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Sobre mim</h2>
        <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
          {profile.about}
        </p>

        <dl className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong"
            >
              <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
