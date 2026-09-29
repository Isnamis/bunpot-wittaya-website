import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStandardStats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ClayTile } from "@/components/ui/icon";
import { BookHeart, Building2, GraduationCap } from "lucide-react";
import { cn, toneClasses } from "@/lib/utils";
import type { Standard } from "@/lib/types";

export function StandardCard({ standard, compact }: { standard: Standard; compact?: boolean }) {
  const st = getStandardStats(standard.id);
  const t = toneClasses[standard.tone];
  return (
    <article className={cn("relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 p-6 shadow-soft md:p-7", t.tint)}>
      <div aria-hidden className={cn("absolute -right-10 -top-10 size-36 rounded-full opacity-70", t.solid)} />
      <ClayTile icon={[GraduationCap, Building2, BookHeart][standard.id - 1]} tone={standard.tone} size={48} className="relative mb-4" />
      <p className={cn("relative text-[13px] font-semibold uppercase tracking-[0.08em]", t.text)}>Standard {standard.code}</p>
      <h3 className="relative mt-1 text-xl font-bold md:text-[22px]">
        <span className="sr-only">มาตรฐานที่ {standard.id} </span>
        {standard.title}
      </h3>
      {!compact && <p className="relative mt-2 text-[15px]">{standard.description}</p>}
      <dl className="relative mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-card/80 p-3">
          <dt className="text-sm text-ink-muted">ตัวชี้วัด</dt>
          <dd className="text-[28px] font-bold leading-tight">{st.indicatorCount}</dd>
        </div>
        <div className="rounded-2xl bg-card/80 p-3">
          <dt className="text-sm text-ink-muted">หลักฐาน</dt>
          <dd className="text-[28px] font-bold leading-tight">{st.evidenceCount || "—"}</dd>
        </div>
      </dl>
      <div className="relative mt-4">
        <div className="flex justify-between text-sm">
          <span>ความครบถ้วนของหลักฐาน</span>
          <span className="font-semibold">{st.completeness === null ? "ยังไม่มีข้อมูล" : `${st.completeness}%`}</span>
        </div>
        <div
          className="mt-1.5 h-2 overflow-hidden rounded-full bg-card"
          role="progressbar"
          aria-label={`ความครบถ้วนของหลักฐาน มาตรฐานที่ ${standard.id}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={st.completeness ?? undefined}
          aria-valuetext={st.completeness === null ? "ยังไม่มีข้อมูล" : `${st.completeness}%`}
        >
          <span className={cn("block h-full rounded-full", t.bar)} style={{ width: `${st.completeness ?? 0}%` }} />
        </div>
        <p className="mt-1.5 text-[13px] text-ink-muted">โครงร่างรายการหลักฐาน {st.slotCount} รายการ</p>
      </div>
      <div className="relative mt-auto pt-6">
        <Button asChild className="w-full sm:w-auto">
          <Link href={`/quality/${standard.slug}`}>ดูรายละเอียด <ArrowRight aria-hidden /></Link>
        </Button>
      </div>
    </article>
  );
}
