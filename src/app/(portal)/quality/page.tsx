import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarRange, FileSearch, FileText, Image as ImageIcon, Layers3, ListChecks, Search } from "lucide-react";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { StandardCard } from "@/components/quality/StandardCard";
import { IndicatorDonut } from "@/components/quality/IndicatorDonut";
import { EvidenceFlow } from "@/components/quality/EvidenceFlow";
import { StatCard } from "@/components/home/SchoolStats";
import { ClayStar } from "@/components/illustrations/Clay";
import { Badge, IndicatorChip, SampleChip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { evidenceTypeLabels } from "@/content/evidence";
import { getEvidence, getIndicators, getProjects, getQualityOverview, getStandards } from "@/lib/data";
import { cn, toneClasses, toneForIndicator } from "@/lib/utils";

export const metadata: Metadata = {
  title: "คุณภาพการศึกษา",
  description: "ระบบประกันคุณภาพและหลักฐานการพัฒนาคุณภาพสถานศึกษา โรงเรียนบรรพตวิทยา — 3 มาตรฐาน 16 ตัวชี้วัด",
  alternates: { canonical: "/quality" },
};

const pill = "inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3.5 text-sm font-medium text-purple-700 hover:bg-lavender-100";

export default function QualityPage() {
  const q = getQualityOverview();
  const standards = getStandards();
  const docs = getEvidence().filter((d) => !d.projectId).slice(0, 5);
  const projects = getProjects();

  return (
    <>
      <PortalHeader
        title="คุณภาพการศึกษา"
        lead="ระบบประกันคุณภาพและหลักฐานการพัฒนาคุณภาพสถานศึกษา — กรอบการประเมินคุณภาพภายนอก สมศ. ระดับการศึกษาขั้นพื้นฐาน"
        crumbs={[{ href: "/quality", label: "คุณภาพการศึกษา" }]}
        aside={
          <form action={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/evidence`} role="search" className="w-full md:w-80">
            <label className="flex min-h-12 items-center gap-2 rounded-full border border-line bg-white px-4 shadow-inset">
              <Search className="size-5 text-ink-muted" aria-hidden />
              <span className="sr-only">ค้นหาหลักฐาน</span>
              <input name="q" placeholder="ค้นหาหลักฐาน…" className="w-full bg-transparent outline-none placeholder:text-ink-muted" />
            </label>
          </form>
        }
      />

      {/* KPI row */}
      <ul className="grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-4">
        {[
          { label: "มาตรฐาน", value: String(q.standardCount), icon: Layers3, tone: "lavender" as const, note: "ตามกรอบ สมศ." },
          { label: "ตัวชี้วัด", value: String(q.indicatorCount), icon: ListChecks, tone: "pink" as const, note: "3 · 10 · 3 ตัวชี้วัด" },
          { label: "หลักฐานที่เผยแพร่", value: q.evidenceCount ? String(q.evidenceCount) : "—", icon: FileSearch, tone: "yellow" as const, note: `โครงร่าง ${q.slotCount} รายการ รอไฟล์` },
          { label: "ปีการศึกษา", value: q.years.join(", ") || "—", icon: CalendarRange, tone: "blue" as const, note: "ปีที่มีรายการหลักฐาน" },
        ].map((s, i) => (
          <li key={s.label}><Reveal delay={i * 0.05} className="h-full"><StatCard {...s} /></Reveal></li>
        ))}
      </ul>

      {/* Evidence list + indicator distribution */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section aria-labelledby="recent-h" className="rounded-[28px] border border-line bg-card p-5 shadow-soft md:p-6 min-w-0 xl:col-span-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="recent-h" className="text-lg font-semibold">รายการหลักฐาน</h2>
            <Link href="/evidence" className={pill}>ดูทั้งหมด</Link>
          </div>
          <ul className="divide-y divide-line">
            {docs.map((d) => {
              const t = toneClasses[toneForIndicator(d.indicatorCodes[0])];
              const Icon = d.fileType === "image" ? ImageIcon : FileText;
              return (
                <li key={d.id} className="flex items-center gap-3 py-3">
                  <span className={cn("grid size-11 shrink-0 place-items-center rounded-[14px]", t.tint, t.text)} aria-hidden><Icon className="size-5" /></span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/evidence/${d.id}`} className="block truncate font-medium hover:text-purple-700 hover:underline">{d.title}</Link>
                    <p className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                      {d.indicatorCodes.map((c) => <IndicatorChip key={c} code={c} />)} · {evidenceTypeLabels[d.type]}
                    </p>
                  </div>
                  {d.fileUrl ? <Badge tone="green">เผยแพร่แล้ว</Badge> : <Badge tone="yellow">รอไฟล์</Badge>}
                </li>
              );
            })}
          </ul>
        </section>
        <section aria-labelledby="dist-h" className="rounded-[28px] border border-line bg-card p-5 shadow-soft md:p-6 xl:col-span-5">
          <h2 id="dist-h" className="mb-4 text-lg font-semibold">สัดส่วนตัวชี้วัดตามมาตรฐาน</h2>
          <IndicatorDonut total={q.indicatorCount} data={standards.map((s) => ({ name: `มาตรฐานที่ ${s.id}`, value: getIndicators(s.id).length }))} />
          <div className="mt-5 flex items-center gap-4 rounded-[22px] bg-yellow-100 p-4">
            <ClayStar className="w-14 shrink-0" />
            <p className="text-sm">
              <span className="font-semibold">ทุกหลักฐานคือเรื่องราวการเติบโตของผู้เรียน</span>
              <br />
              <span className="text-yellow-700">ความครบถ้วนจะคำนวณอัตโนมัติเมื่อมีเอกสารจริง</span>
            </p>
          </div>
        </section>
      </div>

      {/* Standards */}
      <section aria-labelledby="std-h" className="mt-10">
        <h2 id="std-h" className="mb-4 text-lg font-semibold">มาตรฐานการประเมิน</h2>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {standards.map((s, i) => (
            <li key={s.id}><Reveal delay={i * 0.06} className="h-full"><StandardCard standard={s} /></Reveal></li>
          ))}
        </ul>
      </section>

      {/* Evidence mapping */}
      <section id="mapping" aria-labelledby="map-h" className="mt-10 scroll-mt-24">
        <div className="mb-4">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-purple-700">Evidence Mapping</p>
          <h2 id="map-h" className="text-2xl font-bold">เส้นทางจากกิจกรรมสู่หลักฐาน</h2>
          <p className="mt-1 text-ink-muted">โครงการหนึ่งเชื่อมโยงได้หลายตัวชี้วัด: กิจกรรม → กระบวนการ → ผลลัพธ์ผู้เรียน → หลักฐาน</p>
        </div>
        {projects.map((p) => (
          <article key={p.id} className="rounded-[28px] border border-line bg-card p-5 shadow-soft md:p-7">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <h3 className="mr-2 text-xl font-bold">{p.title}</h3>
              {p.isSample && <SampleChip />}
              <span className="text-sm text-ink-muted">ตัวชี้วัด</span>
              {p.indicatorCodes.map((c) => <IndicatorChip key={c} code={c} />)}
            </div>
            <EvidenceFlow project={p} evidenceCount={p.evidenceIds.length} />
            <Button asChild variant="secondary" className="mt-6"><Link href={`/projects/${p.id}`}>ดูโครงการและหลักฐาน <ArrowRight aria-hidden /></Link></Button>
          </article>
        ))}
      </section>
    </>
  );
}
