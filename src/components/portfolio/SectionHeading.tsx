import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  title,
  intro,
  className,
}: {
  id: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      className={cn("max-w-2xl border-l-2 border-primary pl-4 sm:pl-5", className)}
    >
      <h2
        id={id}
        className="display text-[clamp(2.125rem,5.2vw,3.5rem)] leading-[1.02] text-balance"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}
