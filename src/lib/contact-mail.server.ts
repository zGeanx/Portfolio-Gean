import { links } from "@/data/portfolio";
import type { ContactFormData } from "@/lib/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

function readEnv(name: string): string | undefined {
  const runtimeEnv = (globalThis as { __env__?: Record<string, unknown> }).__env__;
  const value = runtimeEnv?.[name] ?? process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function deliverContactMessage(data: ContactFormData) {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("[CONTATO] RESEND_API_KEY ausente. Mensagem não enviada.");
    throw new Error("Serviço de e-mail não configurado.");
  }

  const to = readEnv("CONTACT_TO_EMAIL") ?? links.email;
  const from = readEnv("CONTACT_FROM_EMAIL") ?? DEFAULT_FROM;
  const subject = singleLine(`Contato pelo portfólio — ${data.name}`).slice(0, 180);
  const text = [data.message, "", `Nome: ${data.name}`, `E-mail: ${data.email}`].join("\n");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject,
      text,
      html: `<p>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p><p>Nome: ${escapeHtml(data.name)}<br>E-mail: ${escapeHtml(data.email)}</p>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error(`[CONTATO] Resend respondeu ${response.status}: ${detail.slice(0, 300)}`);
    throw new Error("Não foi possível entregar a mensagem.");
  }

  console.info(`[CONTATO] Mensagem enviada para ${to}.`);
  return { success: true as const, timestamp: new Date().toISOString() };
}
