import * as React from "react";
import { cn, toneClasses, toneForIndicator } from "@/lib/utils";
import type { Tone } from "@/lib/types";

export function Badge({ tone = "lavender", className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  const t = toneClasses[tone];
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-semibold leading-6", t.tint, t.text, className)}
      {...props}
    />
  );
}

export function IndicatorChip({ code, className }: { code: string; className?: string }) {
  return (
    <Badge tone={toneForIndicator(code)} className={className} title={`ตัวชี้วัดที่ ${code}`}>
      <span className="sr-only">ตัวชี้วัดที่ </span>
      {code}
    </Badge>
  );
}

export function SampleChip() {
  return (
    <Badge tone="yellow" title="โครงร่างตัวอย่าง ไม่ใช่ข้อมูลจริงของโรงเรียน">
      ตัวอย่างโครงร่าง
    </Badge>
  );
}
