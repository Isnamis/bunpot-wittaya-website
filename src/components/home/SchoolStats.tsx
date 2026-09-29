import type { LucideIcon } from "lucide-react";
import { CalendarDays, GraduationCap, Layers, MapPinned, Ruler, Users } from "lucide-react";
import { getSchool } from "@/lib/data";
import { cn, formatNumber, toneClasses } from "@/lib/utils";
import { ClayTile } from "@/components/ui/icon";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { Tone } from "@/lib/types";

/** Pastel-tinted dashboard tile with a clay icon (reference: stat rows). */
export function StatCard({ label, value, icon, tone, unit, note }: { label: string; value: string | null; icon: LucideIcon; tone: Tone; unit?: string; note?: string }) {
  return (
    <div className={cn("relative h-full overflow-hidden rounded-[24px] border border-white/70 p-4 shadow-soft md:p-6", toneClasses[tone].tint)}>
      <div aria-hidden className="absolute -right-8 -top-8 size-24 rounded-full bg-white/35" />
      <ClayTile icon={icon} tone={tone} size={44} />
      <p className="relative mt-4 text-sm font-medium md:text-[15px]">{label}</p>
      {value === null ? (
        <p className="relative mt-1.5"><Pending className="bg-white/70 text-[13px]" /></p>
      ) : (
        <p className="relative mt-1 text-[28px] font-bold leading-tight md:text-[36px]">
          {value} {unit && <span className="text-base font-medium text-ink-muted">{unit}</span>}
        </p>
      )}
      {note && <p className="relative mt-1 text-[13px] text-ink-muted">{note}</p>}
    </div>
  );
}

export function SchoolStats() {
  const s = getSchool();
  const n = (v: number | null) => (v === null ? null : formatNumber(v));
  const items = [
    { label: "ปีที่ก่อตั้ง", value: s.founded === null ? null : `พ.ศ. ${s.founded}`, icon: CalendarDays, tone: "lavender" as const },
    { label: "จำนวนนักเรียน", value: n(s.students), unit: "คน", icon: Users, tone: "pink" as const },
    { label: "ครูและบุคลากร", value: n(s.staff), unit: "คน", icon: GraduationCap, tone: "blue" as const },
    { label: "ระดับชั้นที่เปิดสอน", value: s.levels, icon: Layers, tone: "green" as const },
    { label: "ขนาดพื้นที่", value: n(s.areaRai), unit: "ไร่", icon: Ruler, tone: "yellow" as const },
    { label: "ชุมชน / เขตบริการ", value: s.serviceArea, icon: MapPinned, tone: "lavender" as const },
  ];
  return (
    <Section id="glance" eyebrow="School at a Glance" title="โรงเรียนในภาพรวม" lead="ข้อมูลพื้นฐานสำคัญของโรงเรียน (แสดงเฉพาะข้อมูลที่โรงเรียนยืนยันแล้ว)">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-6">
        {items.map((it, i) => (
          <li key={it.label}>
            <Reveal delay={i * 0.05} className="h-full"><StatCard {...it} /></Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
