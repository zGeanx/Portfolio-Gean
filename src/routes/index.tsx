import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Technologies } from "@/components/portfolio/Technologies";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const title = "Gean Luca — Desenvolvedor Frontend Júnior";
const description =
  "Portfólio de Gean Luca, Desenvolvedor Frontend Júnior focado em React, TypeScript e interfaces responsivas e acessíveis.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Gean Luca",
          jobTitle: "Desenvolvedor Frontend Júnior",
          address: { "@type": "PostalAddress", addressLocality: "Pelotas", addressRegion: "RS" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[100] inline-flex min-h-11 -translate-y-24 items-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="w-full max-w-full overflow-x-hidden">
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
