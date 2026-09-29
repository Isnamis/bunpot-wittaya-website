import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id, eyebrow, title, lead, action, children, className, tinted,
}: {
  id?: string; eyebrow?: string; title: string; lead?: ReactNode; action?: ReactNode;
  children: ReactNode; className?: string; tinted?: boolean;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-12 md:py-20", tinted && "bg-cream/50", className)}>
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[68ch]">
            {eyebrow && <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-purple-700">{eyebrow}</p>}
            <h2 id={headingId} className="text-[28px] font-bold md:text-[40px]">{title}</h2>
            {lead && <div className="mt-3 text-base text-ink-muted md:text-lg">{lead}</div>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-[1200px] px-4 md:px-6", className)}>{children}</div>;
}
