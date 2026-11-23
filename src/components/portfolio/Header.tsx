import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/button-styles";
import { profile, sectionIds, type SectionId } from "@/data/portfolio";
import { languages, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/ThemeProvider";
import { scrollToSection } from "./internalNavigation";

const desktopNav: SectionId[] = ["sobre", "tecnologias", "projetos"];
const mobileNav: SectionId[] = ["sobre", "tecnologias", "projetos", "contato"];

function LanguageToggle({ large = false }: { large?: boolean }) {
  const { language, setLanguage, messages } = useLanguage();

  return (
    <div
      role="group"
      aria-label={messages.header.languageLabel}
      className={cn(
        "inline-flex items-center rounded-sm border border-border p-0.5 font-mono text-[11px] font-medium",
        large ? "h-11" : "h-9",
      )}
    >
      {languages.map((item) => {
        const active = item.code === language;
        return (
          <button
            key={item.code}
            type="button"
            lang={item.code}
            title={item.name}
            aria-pressed={active}
            onClick={() => setLanguage(item.code)}
            className={cn(
              "inline-flex h-full items-center justify-center rounded-[2px] tracking-[0.12em] transition-colors duration-150",
              large ? "min-w-12 px-3" : "min-w-9 px-2",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

function ThemeToggle({ large = false }: { large?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const { messages } = useLanguage();
  const label = theme === "dark" ? messages.header.lightMode : messages.header.darkMode;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-sm border border-border text-muted-foreground transition-[color,border-color,transform] duration-150 hover:border-border-strong hover:text-foreground active:scale-95",
        large ? "h-11 w-11" : "h-9 w-9",
      )}
    >
      <span className="icon-swap" aria-hidden>
        <Sun className="h-4 w-4" data-active={theme === "dark"} />
        <Moon className="h-4 w-4" data-active={theme === "light"} />
      </span>
    </button>
  );
}

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("inicio");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return [active, setActive] as const;
}

export function Header() {
  const { messages } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useActiveSection();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstMobileLink.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const navigate = (event: React.MouseEvent<HTMLElement>, id: SectionId) => {
    setActiveSection(id);
    setOpen(false);
    scrollToSection(event, id);
  };

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#inicio"
          onClick={(event) => navigate(event, "inicio")}
          translate="no"
          className="group inline-flex min-h-11 items-center gap-2.5"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-sm bg-foreground font-mono text-[11px] font-medium tracking-wider text-background transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            {profile.initials}
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{profile.brand}</span>
        </a>

        <nav aria-label={messages.header.navLabel} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {desktopNav.map((id) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) => navigate(event, id)}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-3 text-sm transition-colors duration-150",
                      "after:absolute after:inset-x-3 after:bottom-2.5 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300 after:ease-out",
                      isActive
                        ? "text-foreground after:scale-x-100"
                        : "text-muted-foreground after:scale-x-0 hover:text-foreground",
                    )}
                  >
                    {messages.header.nav[id]}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="#contato"
            aria-current={activeSection === "contato" ? "location" : undefined}
            onClick={(event) => navigate(event, "contato")}
            className={buttonClasses("primary", "sm", "ml-2 min-h-9 px-3.5")}
          >
            {messages.header.cta}
          </a>
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? messages.header.closeMenu : messages.header.openMenu}
          className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center text-foreground transition-transform duration-150 active:scale-95 md:hidden"
        >
          <span className="icon-swap" aria-hidden>
            <Menu className="h-5 w-5" data-active={!open} />
            <X className="h-5 w-5" data-active={open} />
          </span>
        </button>
      </div>

      {open && (
        <>
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fade-in absolute inset-x-0 top-full z-40 h-[calc(100dvh-var(--header-height))] bg-background/70 backdrop-blur-sm md:hidden"
          />
          <div
            id="mobile-nav"
            className="menu-pop absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-[0_24px_48px_-24px_rgb(0_0_0/0.35)] md:hidden"
          >
            <nav aria-label={messages.header.navLabel}>
              <ul className="shell flex flex-col py-2">
                {mobileNav.map((id, index) => {
                  const isActive = activeSection === id;
                  return (
                    <li key={id} className="border-b border-border last:border-b-0">
                      <a
                        ref={index === 0 ? firstMobileLink : undefined}
                        href={`#${id}`}
                        aria-current={isActive ? "location" : undefined}
                        onClick={(event) => navigate(event, id)}
                        className={cn(
                          "flex min-h-14 items-center justify-between text-xl font-semibold tracking-tight transition-colors",
                          isActive ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {messages.header.nav[id]}
                        <span
                          aria-hidden
                          className={cn(
                            "font-mono text-xs font-normal",
                            isActive ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          0{index + 1}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="shell flex items-center justify-between gap-4 border-t border-border py-4">
              <LanguageToggle large />
              <ThemeToggle large />
            </div>
          </div>
        </>
      )}
    </header>
  );
}
