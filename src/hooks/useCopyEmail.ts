import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { links } from "@/data/portfolio";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/LanguageProvider";

export function useCopyEmail() {
  const { messages } = useLanguage();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const copyEmail = async () => {
    const toastPosition = isMobile ? "top-center" : "bottom-center";
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
      toast.success(messages.contact.copiedTitle, {
        id: "copy-email",
        position: toastPosition,
        description: messages.contact.copiedDescription,
      });
    } catch {
      toast.error(messages.contact.errorTitle, {
        id: "copy-email",
        position: toastPosition,
        description: messages.contact.errorDescription,
      });
    }
  };

  return { copied, copyEmail, email: links.email };
}
