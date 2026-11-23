import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { buttonClasses } from "@/components/ui/button-styles";
import { profile } from "@/data/portfolio";
import { themeColors, themeStorageKey } from "@/theme/theme-config";

const fontsHref =
  "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..700&family=Inter+Tight:wght@400..700&family=JetBrains+Mono:wght@400;500&display=swap";

const themeBootstrapScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(themeStorageKey)});var l=t?t==="light":window.matchMedia("(prefers-color-scheme: light)").matches;d.classList.toggle("light",l);d.style.colorScheme=l?"light":"dark";var m=document.querySelector('meta[name="theme-color"]');if(m){m.setAttribute("content",l?${JSON.stringify(themeColors.light)}:${JSON.stringify(themeColors.dark)})}}catch(e){}})();`;

function StatusPage({
  code,
  title,
  text,
  children,
}: {
  code: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-dvh items-center bg-background">
      <div className="shell max-w-2xl py-20">
        <p className="eyebrow text-primary">{code}</p>
        <h1 className="display mt-5 text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.02] text-balance">
          {title}
        </h1>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted-foreground">{text}</p>
        <div className="mt-9 flex flex-wrap gap-3">{children}</div>
      </div>
    </main>
  );
}

function NotFoundComponent() {
  return (
    <StatusPage
      code="404"
      title="Página não encontrada."
      text="Este endereço não existe ou foi alterado. Volte ao início para conhecer meus projetos."
    >
      <Link to="/" className={buttonClasses("primary")}>
        Voltar ao início
      </Link>
    </StatusPage>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <StatusPage
      code="Erro"
      title="Não foi possível carregar a página."
      text="Tente novamente ou volte ao início para continuar navegando."
    >
      <button
        type="button"
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className={buttonClasses("primary")}
      >
        Tentar novamente
      </button>
      <a href="/" className={buttonClasses("secondary")}>
        Voltar ao início
      </a>
    </StatusPage>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: themeColors.dark },
      { name: "color-scheme", content: "dark light" },
      { title: `${profile.name} | ${profile.role}` },
      { name: "author", content: profile.name },
      { property: "og:site_name", content: profile.brand },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: fontsHref },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    scripts: [{ children: themeBootstrapScript }],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
