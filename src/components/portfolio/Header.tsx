import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { languages, useLanguage } from "@/i18n/LanguageProvider";

type Theme = "dark" | "light";

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
  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? lightLabel : darkLabel;

  if (mobile) {
    return (
      <div className="inline-flex items-center gap-0.5 rounded-md border border-border bg-background p-0.5">
        <button
          type="button"
          onClick={() => theme === "dark" && onToggle()}
          aria-label={lightLabel}
          aria-pressed={theme === "light"}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors duration-150 ${
            theme === "light"
              ? "bg-surface-2 text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Sun className="h-3.5 w-3.5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => theme === "light" && onToggle()}
          aria-label={darkLabel}
          aria-pressed={theme === "dark"}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors duration-150 ${
            theme === "dark"
              ? "bg-surface-2 text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Moon className="h-3.5 w-3.5" aria-hidden />
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
      className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm px-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-surface hover:text-primary"
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
    </button>
  );
}

function LanguageSelector({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage, messages } = useLanguage();
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectorButton = useRef<HTMLButtonElement>(null);
  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0]!;

  useEffect(() => {
    if (!open) return;

    const updateMenuPosition = () => {
      if (!mobile || !selectorButton.current) return;
      const rect = selectorButton.current.getBoundingClientRect();
      const mobileNav = selectorButton.current.closest("nav");
      const navRect = mobileNav?.getBoundingClientRect();
      setMenuPosition({
        top: (navRect?.bottom ?? rect.bottom) + 6,
        right: Math.max(16, window.innerWidth - rect.right),
      });
    };

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
    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [mobile, open]);

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
        aria-label={`${currentLanguage.name} — ${messages.header.languageLabel}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex h-7 min-w-0 items-center justify-center gap-1 rounded-sm border border-transparent px-1.5 font-mono text-[10px] text-muted-foreground transition-colors duration-150 hover:border-border hover:bg-surface hover:text-primary ${mobile ? "" : "ml-0.5"}`}
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
          style={
            mobile
              ? { position: "fixed", top: menuPosition.top, right: menuPosition.right }
              : undefined
          }
          className={`${mobile ? "z-[70]" : "absolute right-0 top-[calc(100%+6px)] z-[60]"} min-w-[128px] rounded-md border border-border bg-surface p-1 shadow-2xl`}
        >
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="menuitemradio"
              aria-checked={language === item.code}
              lang={item.code}
              onClick={() => selectLanguage(item.code)}
              className={`flex min-h-9 w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-xs transition-colors duration-150 ${
                language === item.code
                  ? "bg-surface-2 text-primary"
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
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme: Theme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    document.documentElement.style.colorScheme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

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
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <a
          href="#inicio"
          className="inline-flex min-h-11 items-center font-mono text-sm tracking-tight text-foreground transition-colors duration-200 hover:text-primary"
        >
          {profile.brand}
        </a>

        <div className="flex items-center gap-1">
          <nav aria-label={messages.header.navLabel} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex min-h-11 items-center rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {messages.header.nav[index]}
                  </a>
                </li>
              ))}
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary md:hidden"
        >
          {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label={messages.header.closeMenu}
            tabIndex={-1}
            className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-3.5rem)] cursor-default bg-background/40 sm:h-[calc(100dvh-4rem)] md:hidden"
            onClick={() => {
              setOpen(false);
              menuButton.current?.focus();
            }}
          />
          <nav
            id="mobile-nav"
            aria-label={messages.header.mobileNavLabel}
            className="absolute top-[calc(100%+6px)] right-4 left-auto z-50 w-[min(16rem,calc(100vw-2rem))] max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-md border border-border bg-surface p-1.5 shadow-2xl sm:max-h-[calc(100dvh-5.5rem)] md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-surface-2 hover:text-primary"
                  >
                    {messages.header.nav[index]}
                  </a>
                </li>
              ))}
              <li className="mt-1 flex items-center justify-between border-t border-border px-3 pt-3 pb-2">
                <ThemeToggle
                  theme={theme}
                  onToggle={toggleTheme}
                  lightLabel={messages.header.lightMode}
                  darkLabel={messages.header.darkMode}
                  mobile
                />
                <LanguageSelector mobile />
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
