import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function canRevealBelowFold(scope: HTMLElement | null, triggerSelector?: string): boolean {
  if (typeof window === "undefined" || !scope) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const target = triggerSelector ? scope.querySelector(triggerSelector) : scope;
  if (!target) return false;

  const rect = target.getBoundingClientRect();
  return rect.top > window.innerHeight + 16;
}

export { gsap, ScrollTrigger, useGSAP };
