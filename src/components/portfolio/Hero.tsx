import { ArrowRight, Github, Linkedin, Mail, User } from "lucide-react";
import { links, profile } from "@/data/portfolio";

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
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1160px] gap-6 px-4 py-8 sm:gap-12 sm:px-6 sm:py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="reveal order-2 min-w-0 lg:order-1">
          <h1 className="text-[clamp(2.25rem,11vw,4.25rem)] leading-[1.05] font-semibold tracking-tight text-balance">
            {profile.name}
          </h1>
          <p className="mt-2.5 sm:mt-3 font-mono text-sm text-primary sm:text-base">
            {profile.role}
          </p>
          <p className="mt-4 sm:mt-5 max-w-[54ch] text-base leading-relaxed text-muted-foreground">
            {profile.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            <ActionLink href="#projetos" primary icon={ArrowRight}>
              Ver projetos
            </ActionLink>
            <ActionLink href="#contato" icon={Mail}>
              Fale comigo
            </ActionLink>
            <ActionLink href={links.github} icon={Github}>
              GitHub
            </ActionLink>
            <ActionLink href={links.linkedin} icon={Linkedin}>
              LinkedIn
            </ActionLink>
          </div>
        </div>

        <div className="reveal relative order-1 mx-auto w-full max-w-[min(208px,24svh)] sm:max-w-[360px] lg:order-2 lg:max-w-[420px]">
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
                  fetchPriority="high"
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
              <span>Pelotas, RS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
