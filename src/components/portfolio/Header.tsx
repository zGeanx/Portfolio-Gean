import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { languages, useLanguage } from "@/i18n/LanguageProvider";
import { useTheme, type Theme } from "@/theme/ThemeProvider";
import { scrollToSection } from "./internalNavigation";

function ThemeToggle({
  theme,
  onToggle,
  lightLabel,
  darkLabel,
  mobile = false,
}: {
  theme: Theme;
  onToggle: () => void;
  lightLabel: string;
  darkLabel: string;
  mobile?: boolean;
}) {
  const label = theme === "dark" ? lightLabel : darkLabel;

  if (mobile) {
    return (
      <div className="inline-flex items-center gap-0.5 rounded-md border border-border bg-background p-0.5">
        <button
          type="button"
          onClick={() => theme === "dark" && onToggle()}
          aria-label={lightLabel}
          aria-pressed={theme === "light"}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-sm transition-[color,background-color,transform] duration-150 active:scale-[0.95] ${
            theme === "light"
              ? "bg-surface-2 text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Sun className="h-3.5 w-3.5 transition-transform duration-200" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => theme === "light" && onToggle()}
          aria-label={darkLabel}
          aria-pressed={theme === "dark"}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-sm transition-[color,background-color,transform] duration-150 active:scale-[0.95] ${
            theme === "dark"
              ? "bg-surface-2 text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Moon className="h-3.5 w-3.5 transition-transform duration-200" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className="ml-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-transparent text-muted-foreground transition-[color,background-color,border-color,transform] duration-150 hover:border-border hover:bg-surface hover:text-primary active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className="icon-swap h-4 w-4" aria-hidden>
        <Sun className="h-4 w-4" data-active={theme === "dark"} />
        <Moon className="h-4 w-4" data-active={theme === "light"} />
      </span>
    </button>
  );
}

function LanguageSelector({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage, messages } = useLanguage();
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectorButton = useRef<HTMLButtonElement>(null);
  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0]!;

  useEffect(() => {
    if (!open) return;

    const closeOnPointerDown = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        selectorButton.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const selectLanguage = (nextLanguage: (typeof languages)[number]["code"]) => {
    setLanguage(nextLanguage);
    setOpen(false);
    selectorButton.current?.focus();
  };

  return (
    <div
      ref={selectorRef}
      role="group"
      aria-label={messages.header.languageLabel}
      className={`relative ${mobile ? "" : "ml-1"}`}
    >
      <button
        ref={selectorButton}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`${currentLanguage.name} · ${messages.header.languageLabel}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex h-8 min-w-0 items-center justify-center gap-1 rounded-sm border border-transparent px-2 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:border-border hover:bg-surface hover:text-primary ${mobile ? "" : "ml-0.5"}`}
      >
        {currentLanguage.shortLabel}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={messages.header.languageLabel}
          className="menu-pop absolute top-[calc(100%+6px)] right-0 z-[60] min-w-[130px] origin-top-right rounded-md border border-border-strong/70 bg-surface p-1 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        >
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="menuitemradio"
              aria-checked={language === item.code}
              lang={item.code}
              onClick={() => selectLanguage(item.code)}
              className={`flex min-h-9 w-full items-center justify-between gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs transition-colors duration-150 ${
                language === item.code
                  ? "bg-surface-2 font-medium text-primary"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { messages } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(navItems[0]?.id ?? "inicio");
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <a
          href="#inicio"
          onClick={(event) => scrollToSection(event, "inicio")}
          translate="no"
          className="inline-flex min-h-11 items-center font-mono text-sm tracking-tight text-foreground transition-colors duration-200 hover:text-primary"
        >
          {profile.brand}
        </a>

        <div className="flex items-center gap-1">
          <nav aria-label={messages.header.navLabel} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => {
                        setActiveSection(item.id);
                        scrollToSection(event, item.id);
                      }}
                      className={`flex min-h-11 items-center rounded-sm px-3 py-2 text-sm transition-colors duration-200 hover:bg-surface hover:text-primary ${
                        isActive
                          ? "bg-surface/80 font-medium text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {messages.header.nav[index]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          <div className="hidden md:block">
            <ThemeToggle
              theme={theme}
              onToggle={toggleTheme}
              lightLabel={messages.header.lightMode}
              darkLabel={messages.header.darkMode}
            />
          </div>
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? messages.header.closeMenu : messages.header.openMenu}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-foreground transition-[color,transform] duration-150 hover:text-primary active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          <span className="icon-swap h-4 w-4" aria-hidden>
            <Menu className="h-4 w-4" data-active={!open} />
            <X className="h-4 w-4" data-active={open} />
          </span>
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label={messages.header.closeMenu}
            tabIndex={-1}
            className="fade-swap absolute inset-x-0 top-full z-40 h-[calc(100dvh-3.5rem)] cursor-default select-none bg-background/50 backdrop-blur-xs outline-none [-webkit-tap-highlight-color:transparent] focus:outline-none sm:h-[calc(100dvh-4rem)] md:hidden"
            onClick={() => {
              setOpen(false);
            }}
          />
          <nav
            id="mobile-nav"
            aria-label={messages.header.mobileNavLabel}
            className="menu-pop absolute top-[calc(100%+6px)] right-4 left-auto z-50 w-[min(16rem,calc(100vw-2rem))] origin-top-right rounded-md border border-border-strong/70 bg-surface p-1.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)] md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => {
                        setActiveSection(item.id);
                        setOpen(false);
                        scrollToSection(event, item.id);
                      }}
                      className={`flex min-h-11 items-center rounded-sm px-3 py-2 text-sm transition-colors duration-150 hover:bg-surface-2 hover:text-primary ${
                        isActive ? "bg-surface-2 font-medium text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {messages.header.nav[index]}
                    </a>
                  </li>
                );
              })}
              <li className="mt-1 flex items-center justify-between border-t border-border px-3 pt-3 pb-2">
                <ThemeToggle
                  theme={theme}
                  onToggle={toggleTheme}
                  lightLabel={messages.header.lightMode}
                  darkLabel={messages.header.darkMode}
                  mobile
                />
                <div className="flex items-center gap-1">
                  <LanguageSelector mobile />
                </div>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
