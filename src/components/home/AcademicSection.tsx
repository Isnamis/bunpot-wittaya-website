import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAcademicPillars } from "@/lib/data";
import { ClayTile } from "@/components/ui/icon";
import { IndicatorChip } from "@/components/ui/badge";
import { Pending } from "@/components/ui/pending";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { AcademicPillar } from "@/lib/types";

export function AcademicCard({ p }: { p: AcademicPillar }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-md)] border border-line bg-card p-6 shadow-soft transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <ClayTile name={p.icon} tone={p.tone} />
        <ArrowUpRight className="size-5 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </div>
      <h3 className="mt-4 text-lg font-semibold">
        <Link href={p.href} className="after:absolute after:inset-0 after:rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-purple-600">
          {p.title}
        </Link>
      </h3>
      <p className="text-sm text-ink-muted">{p.subtitle}</p>
      <p className="mt-3 flex-1 text-[15px]">{p.concept}</p>
      <div className="mt-3 text-[13px]">{p.schoolDetail ?? <Pending label="แนวทางของโรงเรียน" className="text-[13px]" />}</div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.indicatorCodes.map((c) => <IndicatorChip key={c} code={c} />)}
      </div>
    </article>
  );
}

export function AcademicSection() {
  const pillars = getAcademicPillars();
  return (
    <Section id="academic" eyebrow="Learning & Academic" title="การจัดการศึกษา" lead="โรงเรียนจัดการเรียนรู้อย่างไร — ตั้งแต่หลักสูตรจนถึงนวัตกรรม พร้อมตัวชี้วัดคุณภาพที่เกี่ยวข้อง" tinted>
      {/* Mobile: horizontal scroll-snap; ≥md: grid */}
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <li key={p.key} className="w-[80%] shrink-0 snap-start md:w-auto">
            <Reveal delay={(i % 4) * 0.06} className="h-full"><AcademicCard p={p} /></Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
