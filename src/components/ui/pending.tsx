import type { ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn, PENDING_TEXT } from "@/lib/utils";

/** The single visual for unconfirmed data. Renders children when value is present. */
export function Pending({ label, className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-dashed border-[#e3cf95] bg-yellow-100 px-2.5 py-0.5 text-sm font-medium leading-6 text-yellow-700",
        className,
      )}
    >
      {label ? `[${label} — รอการยืนยันจากโรงเรียน]` : PENDING_TEXT}
    </span>
  );
}

export function PendingValue<T>({
  value,
  render,
  label,
  className,
}: {
  value: T | null;
  render?: (v: T) => ReactNode;
  label?: string;
  className?: string;
}) {
  if (value === null || value === undefined) return <Pending label={label} className={className} />;
  return <>{render ? render(value) : String(value)}</>;
}

export function ImagePlaceholder({ label = "ภาพถ่ายจริงของโรงเรียน", className }: { label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} — รอการยืนยันจากโรงเรียน`}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-[14px] bg-cream p-4 text-center text-[13px] leading-snug text-ink-muted",
        className,
      )}
    >
      <ImageIcon className="size-7 opacity-70" aria-hidden />
      <span>[{label} — รอการยืนยัน]</span>
    </div>
  );
}
