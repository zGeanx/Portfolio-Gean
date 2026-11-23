import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";

export function useRevealOnScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const element of targets) {
      element.setAttribute("data-reveal", "pending");
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of targets) element.setAttribute("data-reveal", "visible");
    };
  }, []);
}
