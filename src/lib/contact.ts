import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type ContactValidationMessages = {
  nameMin: string;
  nameMax: string;
  emailInvalid: string;
  emailMax: string;
  messageMin: string;
  messageMax: string;
};

const defaultValidationMessages: ContactValidationMessages = {
  nameMin: "O nome deve ter pelo menos 2 caracteres.",
  nameMax: "O nome é muito longo.",
  emailInvalid: "Digite um endereço de e-mail válido.",
  emailMax: "O e-mail é muito longo.",
  messageMin: "A mensagem deve ter pelo menos 10 caracteres.",
  messageMax: "A mensagem é muito longa.",
};

export function createContactSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMin).max(100, messages.nameMax),
    email: z.string().trim().email(messages.emailInvalid).max(150, messages.emailMax),
    message: z.string().trim().min(10, messages.messageMin).max(3000, messages.messageMax),
  });
}

export const contactSchema = createContactSchema(defaultValidationMessages);

export type ContactFormData = z.infer<typeof contactSchema>;

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { deliverContactMessage } = await import("./contact-mail.server");
    return deliverContactMessage(data);
  });
