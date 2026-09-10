import { Copy, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { contact, links } from "@/data/portfolio";

const items = [
  { label: "LinkedIn", display: "Gean Luca", icon: Linkedin, href: links.linkedin },
  { label: "GitHub", display: "@zGeanx", icon: Github, href: links.github },
];

export function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      toast.success("E-mail copiado!", {
        id: "copy-email",
        description: "Agora é só colar onde preferir.",
      });
    } catch {
      toast.error("Não foi possível copiar o e-mail.", {
        id: "copy-email",
        description: "Selecione o endereço e copie manualmente.",
      });
    }
  };

  return (
    <section id="contato" className="border-b border-border">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="border border-border bg-surface p-4 sm:p-8 md:p-10">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-primary uppercase">
            <Mail className="h-3.5 w-3.5" aria-hidden /> / contato
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight font-semibold tracking-tight text-balance">
            {contact.title}
          </h2>
          <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            {contact.text}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copiar e-mail: ${links.email}`}
              title="Clique para copiar o e-mail"
              className="flex min-h-14 min-w-0 cursor-pointer items-center gap-3 border border-border bg-background p-3.5 text-left transition-colors duration-200 hover:border-primary sm:p-4"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">E-mail</span>
                <span className="mt-1 block select-text break-words font-mono text-xs text-muted-foreground [overflow-wrap:anywhere]">
                  {links.email}
                </span>
              </span>
              <Copy className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </button>
            {items.map(({ label, display, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex min-h-14 min-w-0 items-center gap-3 border border-border bg-background p-3.5 transition-colors duration-200 hover:border-primary sm:p-4"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">{label}</span>
                  <span className="mt-1 block break-words font-mono text-xs text-muted-foreground [overflow-wrap:anywhere]">
                    {display}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Toaster
        theme="dark"
        position="bottom-center"
        duration={4000}
        mobileOffset={{ bottom: "max(16px, env(safe-area-inset-bottom))" }}
      />
    </section>
  );
}
