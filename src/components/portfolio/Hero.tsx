import { ArrowRight, Download, Github, Linkedin, User } from "lucide-react";
import { links, profile, PLACEHOLDER } from "@/data/portfolio";

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
  const unset = href === PLACEHOLDER;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium transition-colors duration-200";
  const cls = primary
    ? `${base} bg-primary text-primary-foreground hover:bg-primary/85`
    : `${base} border border-border text-foreground hover:border-primary hover:text-primary`;

  if (unset) {
    return (
      <span
        className={`${cls} cursor-not-allowed opacity-50`}
        title="Link a definir"
        aria-disabled="true"
      >
        <Icon className="h-4 w-4" />
        {children} <span className="font-mono text-xs">[a definir]</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={cls}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noreferrer noopener"}
    >
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1160px] gap-8 px-4 py-12 sm:gap-12 sm:px-6 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="reveal min-w-0 order-2 lg:order-1">
          <h1 className="text-[clamp(2.25rem,7.5vw,4.25rem)] leading-[1.08] font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-2.5 sm:mt-3 font-mono text-sm text-primary sm:text-base">{profile.role}</p>
          <p className="mt-4 sm:mt-5 max-w-[54ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.description}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            <ActionLink href="#projetos" primary icon={ArrowRight}>
              Ver projetos
            </ActionLink>
            <ActionLink href={links.github} icon={Github}>
              GitHub
            </ActionLink>
            <ActionLink href={links.linkedin} icon={Linkedin}>
              LinkedIn
            </ActionLink>
            <ActionLink href={links.resume} icon={Download}>
              Baixar currículo
            </ActionLink>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] order-1 lg:order-2">
          <span
            aria-hidden
            className="relative mb-1.5 inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground sm:absolute sm:-top-3 sm:-left-3 sm:mb-0"
          >
            <User className="h-3 w-3 text-primary" aria-hidden /> / perfil
          </span>
          <div className="border border-border bg-surface p-2 sm:p-2.5">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-border bg-background">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`Foto de perfil de ${profile.name}`}
                  width={600}
                  height={600}
                  loading="eager"
                  className="h-full w-full object-cover object-[50%_18%]"
                />
              ) : (
                <span className="font-mono text-6xl font-semibold text-border-strong select-none">
                  {profile.initials}
                </span>
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t border-l border-primary"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r border-b border-primary"
              />
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-mono text-[10px] text-muted-foreground">
              <span>{profile.name}</span>
              <span>foto</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
