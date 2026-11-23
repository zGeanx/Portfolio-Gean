import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

const base =
  "group/button inline-flex items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/88",
  secondary:
    "border border-border-strong bg-transparent text-foreground hover:border-foreground hover:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-[15px]",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

export const buttonIconNudge =
  "h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/button:translate-x-0.5";
