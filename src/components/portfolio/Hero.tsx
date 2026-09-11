import { ArrowRight, Github, Linkedin, Mail, User } from "lucide-react";
import { links, profile } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/i18n/LanguageProvider";

function ActionLink({
  href,
  children,
  primary,
  icon: Icon,
}: {
  href: string;
  children: string;
  primary?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const base =
    "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-center text-sm font-medium transition-colors duration-200 sm:w-auto sm:px-4";
  const cls = primary
    ? `${base} bg-primary text-primary-foreground hover:bg-primary/85`
    : `${base} border border-border text-foreground hover:border-primary hover:text-primary`;

  return (
    <a
      href={href}
      className={cls}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noreferrer noopener"}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {children}
    </a>
  );
}

export function Hero() {
  const { language, messages } = useLanguage();
  const contentRef = useReveal<HTMLDivElement>();
  const portraitRef = useReveal<HTMLDivElement>();

  return (
    <section id="inicio" className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1160px] gap-6 px-4 py-8 sm:gap-12 sm:px-6 sm:py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div ref={contentRef} className="reveal-target order-2 min-w-0 lg:order-1">
          <h1 className="text-gradient text-[clamp(2.25rem,11vw,4.25rem)] leading-[1.05] font-semibold tracking-tight text-balance">
            {profile.name}
          </h1>
          <p
            className="mt-2.5 sm:mt-3 font-mono text-sm text-primary sm:text-base"
            aria-label={messages.hero.role}
          >
            <span
              aria-hidden
              key={language}
              className="typing-role"
              style={{ "--typing-width": `${messages.hero.role.length}ch` } as React.CSSProperties}
            >
              {messages.hero.role}
            </span>
          </p>
          <p className="mt-4 sm:mt-5 max-w-[54ch] text-base leading-relaxed text-muted-foreground">
            {messages.hero.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            <ActionLink href="#projetos" primary icon={ArrowRight}>
              {messages.hero.viewProjects}
            </ActionLink>
            <ActionLink href="#contato" icon={Mail}>
              {messages.hero.contact}
            </ActionLink>
            <ActionLink href={links.github} icon={Github}>
              GitHub
            </ActionLink>
            <ActionLink href={links.linkedin} icon={Linkedin}>
              LinkedIn
            </ActionLink>
          </div>
        </div>

        <div
          ref={portraitRef}
          data-delay="100"
          className="reveal-target order-1 mx-auto w-full max-w-[340px] sm:max-w-[300px] lg:order-2 lg:max-w-[340px]"
        >
          <span
            aria-hidden
            className="mb-2 flex items-center gap-1 pl-2 font-mono text-[10px] text-muted-foreground"
          >
            <User className="h-3 w-3 text-primary" aria-hidden /> {messages.hero.profile}
          </span>
          <div className="aspect-[4/5] rounded-[24px] border border-primary/30 bg-surface p-2">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] bg-background">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={messages.hero.profileAlt}
                  width={490}
                  height={1024}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[50%_18%]"
                />
              ) : (
                <span className="font-mono text-6xl font-semibold text-border-strong select-none">
                  {profile.initials}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
