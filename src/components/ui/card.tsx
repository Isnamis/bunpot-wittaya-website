import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, interactive, ...props }: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-line bg-card p-6 shadow-soft",
        interactive && "relative transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-within:shadow-lift",
        className,
      )}
      {...props}
    />
  );
}
