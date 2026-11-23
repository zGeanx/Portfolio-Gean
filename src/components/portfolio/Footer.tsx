import { ArrowUp, ArrowUpRight, Check, Copy, FileDown } from "lucide-react";
import { links, profile } from "@/data/portfolio";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "./internalNavigation";

const footerLink =
  "link-underline inline-flex min-h-11 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground";

export function Footer() {
  const { messages } = useLanguage();
  const { copied, copyEmail } = useCopyEmail();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="shell grid gap-8 py-12 sm:py-14 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="display text-3xl leading-none sm:text-4xl" translate="no">
            {profile.name}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{messages.footer.tagline}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {[
            { label: "GitHub", href: links.github },
            { label: "LinkedIn", href: links.linkedin },
          ].map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer noopener" className={footerLink}>
                {label}
                <span className="sr-only">({messages.opensNewTab})</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </li>
          ))}
          <li>
            <button type="button" onClick={copyEmail} className={footerLink}>
              {copied ? messages.contact.copiedTitle : messages.footer.copyEmail}
              {copied ? (
                <Check className="h-3.5 w-3.5 text-success" aria-hidden />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden />
              )}
            </button>
          </li>
          <li>
            <a href={links.resume} download={links.resumeFileName} className={footerLink}>
              {messages.contact.resume}
              <FileDown className="h-3.5 w-3.5" aria-hidden />
            </a>
          </li>
        </ul>
      </div>

      <div className="shell">
        <div className="flex flex-col gap-2 border-t border-border py-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. {messages.footer.rightsReserved}
          </p>
          <a
            href="#inicio"
            onClick={(event) => scrollToSection(event, "inicio")}
            className="group inline-flex min-h-11 items-center gap-2 self-start transition-colors hover:text-foreground sm:self-auto"
          >
            {messages.footer.backToTop}
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
