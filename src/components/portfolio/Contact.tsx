import { Github, Linkedin, Mail } from "lucide-react";
import { contact, links, PLACEHOLDER } from "@/data/portfolio";

const items = [
  { label: "E-mail", value: links.email, icon: Mail, href: (v: string) => `mailto:${v}` },
  { label: "LinkedIn", value: links.linkedin, icon: Linkedin, href: (v: string) => v },
  { label: "GitHub", value: links.github, icon: Github, href: (v: string) => v },
];

export function Contact() {
  return (
    <section id="contato" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:py-16 sm:px-6">
        <div className="border border-border bg-surface p-5 sm:p-8 md:p-10">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
            <Mail className="h-3.5 w-3.5" aria-hidden /> / contato
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight font-semibold tracking-tight">
            {contact.title}
          </h2>
          <p className="mt-3 sm:mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            {contact.text}
          </p>

          <div className="mt-6 sm:mt-8 grid gap-3 grid-cols-1 sm:grid-cols-3">
            {items.map((item) => {
              const unset = item.value === PLACEHOLDER;
              const Icon = item.icon;
              const displayValue = unset
                ? "[a definir]"
                : item.value.replace(/^https?:\/\/(www\.)?/, "");

              const inner = (
                <>
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="min-w-0 flex-1 overflow-hidden">
                    <span className="block text-sm font-medium text-foreground truncate">
                      {item.label}
                    </span>
                    <span
                      className="block font-mono text-[11px] text-muted-foreground truncate"
                      title={item.value}
                    >
                      {displayValue}
                    </span>
                  </span>
                </>
              );
              return unset ? (
                <div
                  key={item.label}
                  className="flex min-w-0 items-center gap-3 border border-border bg-background p-3.5 sm:p-4 opacity-70"
                >
                  {inner}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href(item.value)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-w-0 items-center gap-3 border border-border bg-background p-3.5 sm:p-4 transition-colors duration-200 hover:border-primary"
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
