import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  RotateCcw,
  Send,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { links } from "@/data/portfolio";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { createContactSchema, sendContactMessage, type ContactFormData } from "@/lib/contact";
import { useTheme } from "@/theme/ThemeProvider";
import { canRevealBelowFold, gsap, useGSAP } from "@/lib/gsap";

const items = [
  { label: "LinkedIn", display: "Gean Luca", icon: Linkedin, href: links.linkedin },
  { label: "GitHub", display: "@zGeanx", icon: Github, href: links.github },
];

export function Contact() {
  const { messages } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { copied, copyEmail } = useCopyEmail();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (canRevealBelowFold(sectionRef.current, ".contact-panel")) {
        gsap.from(".contact-panel", {
          opacity: 0,
          y: 18,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-panel",
            start: "top 88%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const schema = useMemo(
    () => createContactSchema(messages.contact.validation),
    [messages.contact.validation],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("submitting");
    try {
      await sendContactMessage({ data });
      setFormStatus("success");
      reset();
    } catch (err) {
      console.error("[Contact] Erro ao enviar:", err);
      setFormStatus("error");
    }
  };

  const submitOnShortcut = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && formStatus !== "submitting") {
      event.preventDefault();
      void handleSubmit(onSubmit)();
    }
  };

  return (
    <section ref={sectionRef} id="contato" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="contact-panel border border-border bg-surface">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="p-5 sm:p-8 md:p-10 lg:border-r lg:border-border">
              <p className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.12em] text-primary uppercase">
                <span className="text-primary/70">04 //</span>{" "}
                {messages.contact.eyebrow.replace(/^\/\s*/, "")}
              </p>
              <h2 className="mt-2.5 text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight font-semibold tracking-tight text-balance">
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
                  className="flex min-h-14 min-w-0 cursor-pointer items-center gap-3 border border-border bg-background p-3.5 text-left transition-[border-color,background-color] duration-200 hover:border-primary hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-4"
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
                      className={`absolute inset-0 h-4 w-4 transition-[transform,opacity] duration-200 ease-out ${copied ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
                    />
                    <Check
                      className={`absolute inset-0 h-4 w-4 text-primary transition-[transform,opacity] duration-200 ease-out ${copied ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
                    />
                  </span>
                </button>
                {items.map(({ label, display, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex min-h-14 min-w-0 items-center gap-3 border border-border bg-background p-3.5 transition-colors duration-200 hover:border-primary hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-4"
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

            <div className="border-t border-border p-5 sm:p-8 md:p-10 lg:border-t-0 flex flex-col justify-center">
              {formStatus === "success" ? (
                <div
                  key="success"
                  className="fade-swap flex flex-col items-start gap-4 rounded-md border border-primary/30 bg-primary/5 p-6 sm:p-8"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {messages.contact.successTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {messages.contact.successText}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm border border-border bg-background px-4 py-2.5 text-xs font-mono font-medium text-foreground transition-[transform,border-color,background-color] duration-150 hover:border-primary hover:bg-surface active:scale-[0.98]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    {messages.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form key="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <h3 className="text-lg font-medium text-foreground">
                    {messages.contact.formTitle}
                  </h3>

                  {formStatus === "error" && (
                    <div
                      role="alert"
                      className="mt-4 flex flex-col gap-2 rounded-sm border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive fade-swap"
                    >
                      <p className="font-medium">{messages.contact.errorTitle}</p>
                      <p className="text-muted-foreground">{messages.contact.errorDescription}</p>
                    </div>
                  )}

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                        {messages.contact.name}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        enterKeyHint="next"
                        disabled={formStatus === "submitting"}
                        placeholder={messages.contact.namePlaceholder}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register("name")}
                        className={`min-h-12 w-full rounded-sm border bg-background px-3.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          errors.name
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-border hover:border-border-strong focus:border-primary focus-visible:ring-primary/55"
                        }`}
                      />
                      {errors.name && (
                        <span id="name-error" className="text-xs font-medium text-destructive">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="grid gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-sm font-medium text-foreground"
                      >
                        {messages.contact.email}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        enterKeyHint="next"
                        spellCheck={false}
                        disabled={formStatus === "submitting"}
                        placeholder={messages.contact.emailPlaceholder}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                        className={`min-h-12 w-full rounded-sm border bg-background px-3.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          errors.email
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-border hover:border-border-strong focus:border-primary focus-visible:ring-primary/55"
                        }`}
                      />
                      {errors.email && (
                        <span id="email-error" className="text-xs font-medium text-destructive">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="grid gap-1.5 sm:col-span-2">
                      <label
                        htmlFor="contact-message"
                        className="text-sm font-medium text-foreground"
                      >
                        {messages.contact.message}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        enterKeyHint="send"
                        onKeyDown={submitOnShortcut}
                        disabled={formStatus === "submitting"}
                        placeholder={messages.contact.messagePlaceholder}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        {...register("message")}
                        className={`w-full resize-y rounded-sm border bg-background px-3.5 py-3 text-base sm:text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          errors.message
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-border hover:border-border-strong focus:border-primary focus-visible:ring-primary/55"
                        }`}
                      />
                      {errors.message && (
                        <span id="message-error" className="text-xs font-medium text-destructive">
                          {errors.message.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-[transform,background-color,opacity] duration-150 hover:bg-primary/85 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto"
                    >
                      <span
                        key={formStatus === "submitting" ? "sending" : "idle"}
                        className={
                          formStatus === "submitting"
                            ? "fade-swap inline-flex items-center gap-2"
                            : "inline-flex items-center gap-2"
                        }
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            <span>{messages.contact.sending}</span>
                          </>
                        ) : (
                          <>
                            <span>{messages.contact.submit}</span>
                            <Send className="h-4 w-4" aria-hidden />
                          </>
                        )}
                      </span>
                    </button>
                    <span className="hidden font-mono text-xs text-muted-foreground md:inline">
                      {messages.contact.shortcutHint}
                    </span>
                  </div>

                  <p className="mt-3 max-w-[54ch] text-xs leading-relaxed text-muted-foreground">
                    {messages.contact.formHint} {messages.contact.formFallback}{" "}
                    <a
                      href={`mailto:${links.email}`}
                      className="font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary"
                    >
                      {links.email}
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster
        theme={theme}
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
