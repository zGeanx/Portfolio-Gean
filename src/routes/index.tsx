import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Technologies } from "@/components/portfolio/Technologies";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { links, profile, siteUrl } from "@/data/portfolio";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/components/portfolio/internalNavigation";

const title = `geanluca.dev | ${profile.role}`;
const description =
  "Aplicações web full stack. Conheça os projetos de Gean Luca, desenvolvedor com experiência em APIs, dados, segurança e interfaces responsivas.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: new URL(profile.avatar, siteUrl).href },
      { property: "og:image:alt", content: `Foto de ${profile.name}, ${profile.role}` },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: new URL(profile.avatar, siteUrl).href },
      { name: "twitter:image:alt", content: `Foto de ${profile.name}, ${profile.role}` },
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
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pelotas",
            addressRegion: "RS",
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <PortfolioPage />
    </LanguageProvider>
  );
}

function PortfolioPage() {
  const { messages } = useLanguage();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-background">
      <a
        href="#conteudo"
        onClick={(event) => scrollToSection(event, "conteudo")}
        className="fixed left-4 top-4 z-[100] inline-flex min-h-11 -translate-y-24 items-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
      >
        {messages.skipLink}
      </a>
      <Header />
      <main id="conteudo" className="w-full max-w-full overflow-x-clip">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
