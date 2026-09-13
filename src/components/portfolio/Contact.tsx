import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { links } from "@/data/portfolio";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/i18n/LanguageProvider";

const items = [
  { label: "LinkedIn", display: "Gean Luca", icon: Linkedin, href: links.linkedin },
  { label: "GitHub", display: "@zGeanx", icon: Github, href: links.github },
];

export function Contact() {
  const { messages } = useLanguage();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const panelRef = useReveal<HTMLDivElement>();

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
    <section id="contato" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div
          ref={panelRef}
          className="reveal-target border border-border bg-surface p-4 sm:p-8 md:p-10"
        >
          <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
            <Mail className="h-3.5 w-3.5" aria-hidden /> {messages.contact.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight font-semibold tracking-tight text-balance">
            {messages.contact.title}
          </h2>
          <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            {messages.contact.text}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`${messages.contact.copyAria}: ${links.email}`}
              title={messages.contact.copyTitle}
              className="flex min-h-14 min-w-0 cursor-pointer items-center gap-3 border border-border bg-background p-3.5 text-left transition-[border-color,background-color] duration-200 hover:border-primary hover:bg-surface sm:p-4"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">
                  {messages.contact.email}
                </span>
                <span className="mt-1 block select-text break-words font-mono text-xs text-muted-foreground [overflow-wrap:anywhere]">
                  {links.email}
                </span>
              </span>
              <span className="relative h-4 w-4 shrink-0" aria-hidden>
                <Copy
                  className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${copied ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
                />
                <Check
                  className={`absolute inset-0 h-4 w-4 text-primary transition-all duration-200 ${copied ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
                />
              </span>
            </button>
            {items.map(({ label, display, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex min-h-14 min-w-0 items-center gap-3 border border-border bg-background p-3.5 transition-colors duration-200 hover:border-primary sm:p-4"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">{label}</span>
                  <span className="mt-1 block break-words font-mono text-xs text-muted-foreground [overflow-wrap:anywhere]">
                    {display}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Toaster
        theme="dark"
        position={isMobile ? "top-center" : "bottom-center"}
        duration={4000}
        mobileOffset={{
          top: "max(16px, calc(env(safe-area-inset-top) + 8px))",
          bottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      />
    </section>
  );
}
