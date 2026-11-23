import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Loader2,
  Mail,
  RotateCcw,
  Send,
} from "lucide-react";
import { buttonClasses, buttonIconNudge } from "@/components/ui/button-styles";
import { links } from "@/data/portfolio";
import { useCopyEmail } from "@/hooks/useCopyEmail";
import { useLanguage } from "@/i18n/LanguageProvider";
import { createContactSchema, sendContactMessage, type ContactFormData } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

type FormStatus = "idle" | "submitting" | "success" | "error";

const channelRow =
  "group flex min-h-[4.5rem] w-full min-w-0 items-center gap-4 border-b border-border py-4 text-left transition-colors duration-150";

function ChannelContent({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-border text-muted-foreground transition-colors duration-150 group-hover:border-primary group-hover:text-primary">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-xs text-muted-foreground">{label}</span>
        <span className="mt-1 block truncate text-[15px] font-medium text-foreground">{value}</span>
      </span>
    </>
  );
}

const fieldClasses = (hasError: boolean) =>
  cn(
    "w-full rounded-sm border bg-background px-3.5 text-base text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/70 focus:outline-none focus-visible:outline-none disabled:opacity-60 sm:text-[15px]",
    hasError
      ? "border-destructive focus:ring-2 focus:ring-destructive/40"
      : "border-border-strong hover:border-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30",
  );

export function Contact() {
  const { messages } = useLanguage();
  const { contact } = messages;
  const { copied, copyEmail } = useCopyEmail();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const successHeading = useRef<HTMLHeadingElement>(null);
  const schema = useMemo(() => createContactSchema(contact.validation), [contact.validation]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    if (formStatus === "success") successHeading.current?.focus();
  }, [formStatus]);

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("submitting");
    try {
      await sendContactMessage({ data });
      setFormStatus("success");
      reset();
    } catch (error) {
      console.error("[Contact] Erro ao enviar:", error);
      setFormStatus("error");
    }
  };

  const submitOnShortcut = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && formStatus !== "submitting") {
      event.preventDefault();
      void handleSubmit(onSubmit)();
    }
  };

  const isSubmitting = formStatus === "submitting";

  return (
    <section id="contato" aria-labelledby="contato-title">
      <div className="shell section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="contato-title" title={contact.title} intro={contact.text} />

          <h3 data-reveal="" className="mt-12 text-lg font-semibold tracking-tight">
            {contact.channelsLabel}
          </h3>
          <ul data-reveal="" className="mt-4 border-t border-border">
            <li>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={`${contact.email} ${links.email}, ${contact.copyAria}`}
                className={channelRow}
              >
                <ChannelContent icon={Mail} label={contact.email} value={links.email} />
                <span className="relative h-4 w-4 shrink-0 text-muted-foreground" aria-hidden>
                  <Copy
                    className={cn(
                      "absolute inset-0 h-4 w-4 transition-[transform,opacity] duration-200 ease-out group-hover:text-foreground",
                      copied ? "scale-75 opacity-0" : "scale-100 opacity-100",
                    )}
                  />
                  <Check
                    className={cn(
                      "absolute inset-0 h-4 w-4 text-success transition-[transform,opacity] duration-200 ease-out",
                      copied ? "scale-100 opacity-100" : "scale-75 opacity-0",
                    )}
                  />
                </span>
              </button>
            </li>
            {[
              { label: "LinkedIn", value: "Gean Luca", icon: Linkedin, href: links.linkedin },
              { label: "GitHub", value: links.githubHandle, icon: Github, href: links.github },
            ].map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={channelRow}
                >
                  <ChannelContent icon={channel.icon} label={channel.label} value={channel.value} />
                  <span className="sr-only">({messages.opensNewTab})</span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
            <li>
              <a href={links.resume} download={links.resumeFileName} className={channelRow}>
                <ChannelContent
                  icon={FileDown}
                  label={contact.resume}
                  value={contact.resumeDetail}
                />
                <ArrowDown
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-[color,transform] duration-200 group-hover:translate-y-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7 lg:pt-14">
          <div
            data-reveal=""
            className="rounded-md border border-border bg-surface p-5 sm:p-8 lg:p-10"
          >
            {formStatus === "success" ? (
              <div key="success" className="fade-swap flex flex-col items-start gap-5 py-6">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-success/40 text-success">
                  <CheckCircle2 className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3
                    ref={successHeading}
                    tabIndex={-1}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {contact.successTitle}
                  </h3>
                  <p className="mt-2 max-w-[48ch] leading-relaxed text-muted-foreground">
                    {contact.successText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormStatus("idle")}
                  className={buttonClasses("secondary", "sm")}
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  {contact.sendAnother}
                </button>
              </div>
            ) : (
              <form key="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 className="text-xl font-semibold tracking-tight">{contact.formTitle}</h3>

                {formStatus === "error" && (
                  <div
                    role="alert"
                    className="fade-swap mt-5 rounded-sm border border-destructive/40 bg-destructive/10 p-4 text-sm"
                  >
                    <p className="font-medium text-destructive">{contact.errorTitle}</p>
                    <p className="mt-1 text-muted-foreground">{contact.errorDescription}</p>
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="grid content-start gap-2">
                    <label htmlFor="contact-name" className="text-sm font-medium">
                      {contact.name}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      enterKeyHint="next"
                      disabled={isSubmitting}
                      placeholder={contact.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                      className={cn(fieldClasses(Boolean(errors.name)), "min-h-12")}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid content-start gap-2">
                    <label htmlFor="contact-email" className="text-sm font-medium">
                      {contact.email}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      autoCapitalize="none"
                      enterKeyHint="next"
                      spellCheck={false}
                      disabled={isSubmitting}
                      placeholder={contact.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email")}
                      className={cn(fieldClasses(Boolean(errors.email)), "min-h-12")}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2 sm:col-span-2">
                    <label htmlFor="contact-message" className="text-sm font-medium">
                      {contact.message}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      enterKeyHint="send"
                      onKeyDown={submitOnShortcut}
                      disabled={isSubmitting}
                      placeholder={contact.messagePlaceholder}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      {...register("message")}
                      className={cn(
                        fieldClasses(Boolean(errors.message)),
                        "resize-y py-3 leading-relaxed",
                      )}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className={buttonClasses("primary", "md", "w-full sm:w-auto")}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        {contact.sending}
                      </>
                    ) : (
                      <>
                        {contact.submit}
                        <Send className={buttonIconNudge} aria-hidden />
                      </>
                    )}
                  </button>
                  <span className="hidden font-mono text-xs text-muted-foreground md:inline">
                    {contact.shortcutHint}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {contact.formHint}{" "}
                  <a
                    href={`mailto:${links.email}`}
                    className="font-medium [overflow-wrap:anywhere] text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
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
    </section>
  );
}
