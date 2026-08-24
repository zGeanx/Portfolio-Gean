import { Github, Linkedin } from "lucide-react";
import { footerText, links, PLACEHOLDER } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1160px] flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="font-mono text-xs text-muted-foreground">{footerText}</p>
      <div className="flex items-center gap-2">
        {[
          { label: "GitHub", href: links.github, Icon: Github },
          { label: "LinkedIn", href: links.linkedin, Icon: Linkedin },
        ].map(({ label, href, Icon }) =>
          href === PLACEHOLDER ? (
            <span
              key={label}
              aria-label={`${label} a definir`}
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground opacity-60"
            >
              <Icon className="h-4 w-4" aria-hidden />
            </span>
          ) : (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" aria-hidden />
            </a>
          ),
        )}
      </div>
    </footer>
  );
}
