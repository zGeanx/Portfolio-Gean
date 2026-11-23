import { prefersReducedMotion } from "@/lib/utils";

export function scrollToSection(event: React.MouseEvent<HTMLElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });

  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}
