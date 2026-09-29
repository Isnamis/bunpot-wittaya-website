import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { InfoBlock } from "@/components/layout/InfoBlocks";
import { EvidenceCard } from "@/components/quality/EvidenceCard";
import { Badge, IndicatorChip, SampleChip } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/ui/pending";
import { getEvidenceForIndicator, getIndicator, getIndicators, getProjectsForIndicator, getStandard } from "@/lib/data";

export function generateStaticParams() {
  return getIndicators().map((i) => ({ code: i.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const i = getIndicator(decodeURIComponent((await params).code));
  return i ? { title: `ตัวชี้วัดที่ ${i.code} ${i.title}`, alternates: { canonical: `/quality/indicator/${i.code}` } } : {};
}

const toc = [
  ["goal", "1. เป้าหมาย"],
  ["approach", "2. แนวทางการดำเนินงาน"],
  ["results", "3. ผลการดำเนินงาน"],
  ["outcomes", "4. ผลลัพธ์ที่เกิดกับผู้เรียน"],
  ["gallery", "5. ภาพกิจกรรม"],
  ["evidence", "6. หลักฐาน"],
  ["projects", "7. โครงการที่เกี่ยวข้อง"],
  ["documents", "8. เอกสารที่เกี่ยวข้อง"],
] as const;

export default async function IndicatorPage({ params }: { params: Promise<{ code: string }> }) {
  const ind = getIndicator(decodeURIComponent((await params).code));
  if (!ind) notFound();
  const std = getStandard(ind.standardId)!;
  const docs = getEvidenceForIndicator(ind.code);
  const evidence = docs.filter((d) => d.category !== "document");
  const documents = docs.filter((d) => d.category === "document");
  const projects = getProjectsForIndicator(ind.code);
  const siblings = getIndicators(ind.standardId);
  const idx = siblings.findIndex((s) => s.code === ind.code);

  return (
    <>
      <PortalHeader
        eyebrow={<div className="flex flex-wrap gap-2"><Badge tone={std.tone}>มาตรฐานที่ {std.id} · {std.title}</Badge></div>}
        title={`ตัวชี้วัดที่ ${ind.code}`}
        lead={<span className="text-lg font-medium text-ink md:text-xl">{ind.title}</span>}
        crumbs={[{ href: "/quality", label: "คุณภาพการศึกษา" }, { href: `/quality/${std.slug}`, label: `มาตรฐานที่ ${std.id}` }, { href: `/quality/indicator/${ind.code}`, label: `ตัวชี้วัด ${ind.code}` }]}
      />
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[220px_1fr]">
        <nav aria-label="สารบัญตัวชี้วัด" className="min-w-0 xl:sticky xl:top-24 xl:self-start">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto xl:flex-col xl:gap-1">
            {toc.map(([id, label]) => (
              <li key={id} className="shrink-0">
                <a href={`#${id}`} className="flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-[15px] hover:bg-lavender-100 xl:rounded-xl xl:border-0 xl:bg-transparent">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 space-y-6 [&>*]:scroll-mt-24">
          <div id="goal"><InfoBlock title="1. เป้าหมาย" value={ind.goal} /></div>
          <div id="approach"><InfoBlock title="2. แนวทางการดำเนินงาน" value={ind.approach} /></div>
          <div id="results"><InfoBlock title="3. ผลการดำเนินงาน" value={ind.results} /></div>
          <div id="outcomes"><InfoBlock title="4. ผลลัพธ์ที่เกิดกับผู้เรียน" value={ind.studentOutcomes} /></div>
          <div id="gallery">
            <InfoBlock title="5. ภาพกิจกรรม">
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {ind.gallery.length > 0
                  ? ind.gallery.map((g) => <li key={g.url} className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={g.url} alt={g.alt} fill className="object-cover" /></li>)
                  : [1, 2, 3].map((n) => <li key={n}><ImagePlaceholder label="ภาพกิจกรรมจริง" className="aspect-[4/3]" /></li>)}
              </ul>
            </InfoBlock>
          </div>
          <section id="evidence" aria-labelledby="ev-h">
            <h2 id="ev-h" className="mb-3 text-xl font-semibold">6. หลักฐาน <span className="text-base font-normal text-ink-muted">({evidence.length})</span></h2>
            {evidence.length ? <ul className="space-y-3">{evidence.map((d) => <li key={d.id}><EvidenceCard doc={d} /></li>)}</ul> : <p className="rounded-2xl border border-dashed border-line bg-card p-6 text-ink-muted">ยังไม่มีหลักฐานประเภทภาพ/ผลงาน/ข้อมูล</p>}
          </section>
          <section id="projects" aria-labelledby="pr-h">
            <h2 id="pr-h" className="mb-3 text-xl font-semibold">7. โครงการที่เกี่ยวข้อง</h2>
            {projects.length ? (
              <ul className="grid gap-3 md:grid-cols-2">
                {projects.map((p) => (
                  <li key={p.id}>
                    <Link href={`/projects/${p.id}`} className="block rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft hover:shadow-lift">
                      <span className="flex flex-wrap items-center gap-2 font-semibold">{p.title} {p.isSample && <SampleChip />}</span>
                      <span className="mt-2 flex flex-wrap gap-1.5">{p.indicatorCodes.map((c) => <IndicatorChip key={c} code={c} />)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p className="rounded-2xl border border-dashed border-line bg-card p-6 text-ink-muted">ยังไม่มีโครงการที่เชื่อมโยง</p>}
          </section>
          <section id="documents" aria-labelledby="doc-h">
            <h2 id="doc-h" className="mb-3 text-xl font-semibold">8. เอกสารที่เกี่ยวข้อง <span className="text-base font-normal text-ink-muted">({documents.length})</span></h2>
            {documents.length ? <ul className="space-y-3">{documents.map((d) => <li key={d.id}><EvidenceCard doc={d} /></li>)}</ul> : <p className="rounded-2xl border border-dashed border-line bg-card p-6 text-ink-muted">ยังไม่มีเอกสาร</p>}
          </section>
          <nav aria-label="ตัวชี้วัดก่อนหน้าและถัดไป" className="flex justify-between gap-3 border-t border-line pt-6">
            {idx > 0 ? <Link className="min-h-11 font-medium text-purple-700 hover:underline" href={`/quality/indicator/${siblings[idx - 1].code}`}>← ตัวชี้วัด {siblings[idx - 1].code}</Link> : <span />}
            {idx < siblings.length - 1 ? <Link className="min-h-11 font-medium text-purple-700 hover:underline" href={`/quality/indicator/${siblings[idx + 1].code}`}>ตัวชี้วัด {siblings[idx + 1].code} →</Link> : <span />}
          </nav>
        </div>
      </div>
    </>
  );
}
