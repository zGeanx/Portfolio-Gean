import { useEffect, useRef, useState } from "react";
import { Check, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { links } from "@/data/portfolio";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "./internalNavigation";

export function Footer() {
  const { messages } = useLanguage();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copyEmail = async () => {
    const toastPosition = isMobile ? "top-center" : "bottom-center";
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
      toast.success(messages.contact.copiedTitle, {
        id: "copy-email",
        position: toastPosition,
        description: messages.contact.copiedDescription,
      });
    } catch {
      toast.error(messages.contact.errorTitle, {
        id: "copy-email",
        position: toastPosition,
        description: messages.contact.errorDescription,
      });
    }
  };

  return (
    <footer className="mx-auto flex max-w-[1160px] flex-col gap-5 border-t border-border/70 px-4 py-8 sm:grid sm:grid-cols-[1fr_auto] sm:items-end sm:gap-x-6 sm:gap-y-2 sm:px-6 sm:py-10">
      <a
        href="#inicio"
        onClick={(event) => scrollToSection(event, "inicio")}
        translate="no"
        className="inline-flex min-h-11 items-center font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:col-start-1 sm:row-start-1"
      >
        geanluca.dev
      </a>

      <div className="flex items-center gap-2 sm:col-start-2 sm:row-span-2 sm:justify-self-end">
        {[
          { label: "GitHub", href: links.github, Icon: Github, download: undefined },
          { label: "LinkedIn", href: links.linkedin, Icon: Linkedin, download: undefined },
          {
            label: messages.hero.downloadCv,
            href: links.resume,
            Icon: FileDown,
            download: "Gean-Luca-Curriculo.pdf",
          },
        ].map(({ label, href, Icon, download }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            download={download}
            target={download ? undefined : "_blank"}
            rel={download ? undefined : "noreferrer noopener"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        ))}

        <button
          type="button"
          onClick={copyEmail}
          aria-label={`${messages.contact.copyAria}: ${links.email}`}
          title={messages.contact.copyTitle}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="relative h-4 w-4" aria-hidden>
            <Mail
              className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${copied ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
            />
            <Check
              className={`absolute inset-0 h-4 w-4 text-primary transition-all duration-200 ${copied ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
            />
          </span>
        </button>
      </div>

      <hr className="border-t border-border/70 sm:hidden" />

      <p className="text-xs text-muted-foreground sm:col-start-1 sm:row-start-2">
        {messages.footer}
      </p>
    </footer>
  );
}
