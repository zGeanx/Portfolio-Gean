import { ArrowUp, Check, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { links } from "@/data/portfolio";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "./internalNavigation";

export function Footer() {
  const { messages } = useLanguage();
  const { copied, copyEmail } = useCopyEmail();

  return (
    <TooltipProvider delayDuration={250}>
      <footer className="w-full border-t border-border bg-background">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-6 px-4 py-8 sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-x-6 sm:gap-y-3 sm:px-6 sm:py-10">
          <div className="flex flex-col gap-1 sm:col-start-1">
            <a
              href="#inicio"
              onClick={(event) => scrollToSection(event, "inicio")}
              translate="no"
              className="inline-flex w-fit min-h-11 items-center font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              geanluca.dev
            </a>
            <p className="text-xs text-muted-foreground">{messages.footer}</p>
          </div>

          <div className="flex items-center gap-2 sm:col-start-2 sm:justify-self-end">
            {[
              {
                label: "GitHub",
                href: links.github,
                Icon: Github,
                download: undefined,
                tooltip: "github.com/zGeanx",
              },
              {
                label: "LinkedIn",
                href: links.linkedin,
                Icon: Linkedin,
                download: undefined,
                tooltip: "linkedin.com/in/geanluca",
              },
              {
                label: messages.hero.downloadCv,
                href: links.resume,
                Icon: FileDown,
                download: "Gean-Luca-Curriculo.pdf",
                tooltip: messages.hero.downloadCv,
              },
            ].map(({ label, href, Icon, download, tooltip }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <a
                    href={href}
                    aria-label={label}
                    download={download}
                    target={download ? undefined : "_blank"}
                    rel={download ? undefined : "noreferrer noopener"}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted-foreground transition-[transform,border-color,background-color,color] duration-150 ease-out hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">{tooltip}</TooltipContent>
              </Tooltip>
            ))}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={`${messages.contact.copyAria}: ${links.email}`}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-border text-muted-foreground transition-[transform,border-color,background-color,color] duration-150 ease-out hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span className="relative h-4 w-4" aria-hidden>
                    <Mail
                      className={`absolute inset-0 h-4 w-4 transition-[transform,opacity] duration-200 ease-out ${copied ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
                    />
                    <Check
                      className={`absolute inset-0 h-4 w-4 text-primary transition-[transform,opacity] duration-200 ease-out ${copied ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
                    />
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {copied ? messages.contact.copiedTitle : messages.contact.copyAria}
              </TooltipContent>
            </Tooltip>

            <div className="mx-1 h-5 w-px bg-border" aria-hidden />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(event) => scrollToSection(event, "inicio")}
                  aria-label={messages.backToTop}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-border text-muted-foreground transition-[transform,border-color,background-color,color] duration-150 ease-out hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">{messages.backToTop}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
}
