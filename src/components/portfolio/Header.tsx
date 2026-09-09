import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

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

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex min-h-11 items-center rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary md:hidden"
        >
          {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            tabIndex={-1}
            className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-3.5rem)] cursor-default bg-background/40 sm:h-[calc(100dvh-4rem)] md:hidden"
            onClick={() => {
              setOpen(false);
              menuButton.current?.focus();
            }}
          />
          <nav
            id="mobile-nav"
            aria-label="Navegação mobile"
            className="absolute inset-x-4 top-[calc(100%+6px)] z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-md border border-border bg-surface p-1.5 shadow-2xl sm:max-h-[calc(100dvh-5.5rem)] md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-surface-2 hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
