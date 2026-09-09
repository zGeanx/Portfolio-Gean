import { Github, Linkedin } from "lucide-react";
import { footerText, links } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1160px] flex-col gap-5 border-t border-border/70 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-6 sm:py-10">
      <div className="space-y-2">
        <a
          href="#inicio"
          className="inline-flex min-h-11 items-center font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          geanluca.dev
        </a>
        <p className="text-xs text-muted-foreground">{footerText}</p>
      </div>
      <div className="flex items-center gap-2">
        {[
          { label: "GitHub", href: links.github, Icon: Github },
          { label: "LinkedIn", href: links.linkedin, Icon: Linkedin },
        ].map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        ))}
      </div>
    </footer>
  );
}
