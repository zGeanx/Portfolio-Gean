import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(100, "O nome é muito longo."),
  email: z
    .string()
    .trim()
    .email("Digite um endereço de e-mail válido.")
    .max(150, "O e-mail é muito longo."),
  message: z
    .string()
    .trim()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(3000, "A mensagem é muito longa."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { deliverContactMessage } = await import("./contact-mail.server");
    return deliverContactMessage(data);
  });
