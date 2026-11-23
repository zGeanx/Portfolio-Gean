import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { Technologies } from "@/components/portfolio/Technologies";
import { scrollToSection } from "@/components/portfolio/internalNavigation";
import { Toaster } from "@/components/ui/sonner";
import { links, profile, siteUrl, techGroups } from "@/data/portfolio";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";

const title = "Gean Luca - Desenvolvedor Front-end | React e TypeScript";
const description =
  "Portfólio de Gean Luca, desenvolvedor front-end em Pelotas, RS. Interfaces em React e TypeScript conectadas a APIs reais, com projetos publicados e código aberto.";
const socialImage = new URL("/og-image.png", siteUrl).href;
const socialImageAlt = `${profile.name}, ${profile.role}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: siteUrl },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: socialImage },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: socialImageAlt },
      { property: "profile:first_name", content: "Gean" },
      { property: "profile:last_name", content: "Luca" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:alt", content: socialImageAlt },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          url: siteUrl,
          image: new URL(profile.avatar, siteUrl).href,
          sameAs: [links.github, links.linkedin],
          alumniOf: { "@type": "EducationalOrganization", name: profile.institution },
          knowsAbout: techGroups.flatMap((group) => group.items),
          address: {
            "@type": "PostalAddress",
            addressLocality: profile.location.city,
            addressRegion: profile.location.region,
            addressCountry: profile.location.country,
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioPage />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function PortfolioToaster() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <Toaster
      theme={theme}
      position={isMobile ? "top-center" : "bottom-center"}
      duration={4000}
      mobileOffset={{
        top: "max(16px, calc(env(safe-area-inset-top) + 8px))",
        bottom: "max(16px, env(safe-area-inset-bottom))",
      }}
    />
  );
}

function PortfolioPage() {
  const { messages } = useLanguage();
  useRevealOnScroll();

  return (
    <div className="min-h-dvh w-full bg-background">
      <a
        href="#conteudo"
        onClick={(event) => scrollToSection(event, "conteudo")}
        className="fixed top-3 left-3 z-[100] inline-flex min-h-11 -translate-y-24 items-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
      >
        {messages.skipLink}
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <PortfolioToaster />
    </div>
  );
}
