import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#inicio"
          className="font-mono text-sm tracking-tight text-foreground transition-colors duration-200 hover:text-primary"
        >
          {profile.brand}
        </a>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-foreground transition-colors duration-200 hover:border-primary hover:text-primary md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-nav"
            aria-label="Navegação mobile"
            className="absolute top-[calc(100%+6px)] right-4 z-50 w-52 overflow-hidden rounded-md border border-border bg-surface p-1.5 shadow-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-surface-2 hover:text-primary"
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
