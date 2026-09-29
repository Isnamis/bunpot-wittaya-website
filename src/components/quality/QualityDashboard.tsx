import Link from "next/link";
import { FileSearch, Layers3, ListChecks, CalendarRange, Search } from "lucide-react";
import { getIndicators, getQualityOverview, getStandards } from "@/lib/data";
import { ClayTile } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/Reveal";
import { StandardCard } from "./StandardCard";
import { cn, toneClasses } from "@/lib/utils";
import { IndicatorDonut } from "./IndicatorDonut";

export function QualitySearchBox() {
  return (
    <form action={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/evidence`} role="search" className="flex flex-col gap-2 sm:flex-row">
      <label className="flex min-h-12 flex-1 items-center gap-2 rounded-full border border-line bg-card px-5 shadow-inset">
        <Search className="size-5 text-ink-muted" aria-hidden />
        <span className="sr-only">ค้นหาหลักฐานคุณภาพการศึกษา</span>
        <input name="q" placeholder="ค้นหาหลักฐาน เช่น แผนพัฒนาคุณภาพการศึกษา" className="w-full bg-transparent text-base outline-none placeholder:text-ink-muted" />
      </label>
      <button type="submit" className="min-h-12 rounded-full bg-purple-600 px-6 font-medium text-white hover:bg-purple-700">ค้นหา</button>
    </form>
  );
}

export function QualityDashboard({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const q = getQualityOverview();
  const standards = getStandards();
  const H = headingLevel === 1 ? "h1" : "h2";
  const stats = [
    { label: "มาตรฐาน", value: q.standardCount, icon: Layers3, tone: "lavender" as const },
    { label: "ตัวชี้วัด", value: q.indicatorCount, icon: ListChecks, tone: "blue" as const },
    { label: "หลักฐานที่เผยแพร่", value: q.evidenceCount || "—", icon: FileSearch, tone: "green" as const },
    { label: "ปีการศึกษา", value: q.years.join(", ") || "—", icon: CalendarRange, tone: "yellow" as const },
  ];
  return (
    <section id="quality" aria-labelledby="quality-title" className="py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="rounded-[36px] bg-cream p-5 md:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-purple-700">Quality Education Dashboard</p>
              <H id="quality-title" className="text-[28px] font-bold md:text-[40px]">คุณภาพการศึกษา</H>
              <p className="mt-2 text-base md:text-lg">ระบบประกันคุณภาพและหลักฐานการพัฒนาคุณภาพสถานศึกษา</p>
              <p className="mt-2 text-sm text-ink-muted">กรอบการประเมินคุณภาพภายนอก สมศ. ระดับการศึกษาขั้นพื้นฐาน · 3 มาตรฐาน 16 ตัวชี้วัด</p>
              <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {stats.map((s) => (
                  <li key={s.label} className={cn("rounded-[22px] border border-white/70 p-4 shadow-soft", toneClasses[s.tone].tint)}>
                    <ClayTile icon={s.icon} tone={s.tone} size={40} />
                    <p className="mt-2 text-2xl font-bold leading-tight">{s.value}</p>
                    <p className="text-sm text-ink-muted">{s.label}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-line bg-card p-6 shadow-soft lg:col-span-5">
              <p className="mb-4 font-semibold">สัดส่วนตัวชี้วัดตามมาตรฐาน</p>
              <IndicatorDonut
                total={q.indicatorCount}
                data={standards.map((s) => ({ name: `มาตรฐานที่ ${s.id}`, value: getIndicators(s.id).length }))}
              />
            </div>
          </div>

          <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
            {standards.map((s, i) => (
              <li key={s.id}><Reveal delay={i * 0.08} className="h-full"><StandardCard standard={s} /></Reveal></li>
            ))}
          </ul>

          <div className="mt-8 rounded-[var(--radius-lg)] bg-card p-5 shadow-soft md:p-6">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">ศูนย์หลักฐานดิจิทัล (Digital Evidence Center)</p>
              <Link href="/evidence" className="text-sm font-medium text-purple-700 hover:underline">เปิดศูนย์หลักฐาน →</Link>
            </div>
            <QualitySearchBox />
          </div>
        </div>
      </div>
    </section>
  );
}
