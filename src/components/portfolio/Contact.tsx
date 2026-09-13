import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
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

  const prepareEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
    const body = encodeURIComponent(`${message}\n\nNome: ${name}\nE-mail: ${email}`);

    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  };

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
        <div ref={panelRef} className="reveal-target border border-border bg-surface">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="p-5 sm:p-8 md:p-10 lg:border-r lg:border-border">
              <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
                <Mail className="h-3.5 w-3.5" aria-hidden /> {messages.contact.eyebrow}
              </p>
              <h2 className="mt-3 text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight font-semibold tracking-tight text-balance">
                {messages.contact.title}
              </h2>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                {messages.contact.text}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-2.5">
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

            <form
              onSubmit={prepareEmail}
              className="border-t border-border p-5 sm:p-8 md:p-10 lg:border-t-0"
            >
              <h3 className="text-lg font-medium text-foreground">{messages.contact.formTitle}</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-foreground">
                  {messages.contact.name}
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    placeholder={messages.contact.namePlaceholder}
                    className="min-h-12 w-full border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-border-strong focus:border-primary focus:outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-foreground">
                  {messages.contact.email}
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={messages.contact.emailPlaceholder}
                    className="min-h-12 w-full border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-border-strong focus:border-primary focus:outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-foreground sm:col-span-2">
                  {messages.contact.message}
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder={messages.contact.messagePlaceholder}
                    className="w-full resize-y border border-border bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-border-strong focus:border-primary focus:outline-none"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 sm:w-auto"
              >
                {messages.contact.submit}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
              <p className="mt-3 max-w-[54ch] text-xs leading-relaxed text-muted-foreground">
                {messages.contact.formHint}
              </p>
            </form>
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
