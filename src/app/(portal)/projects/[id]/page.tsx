import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { InfoBlock } from "@/components/layout/InfoBlocks";
import { EvidenceFlow } from "@/components/quality/EvidenceFlow";
import { EvidenceCard } from "@/components/quality/EvidenceCard";
import { IndicatorChip, SampleChip } from "@/components/ui/badge";
import { getEvidenceById, getProject, getProjects } from "@/lib/data";

export function generateStaticParams() {
  return getProjects().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = getProject((await params).id);
  return p ? { title: `โครงการ ${p.title}`, robots: p.isSample ? { index: false } : undefined } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const p = getProject((await params).id);
  if (!p) notFound();
  const docs = p.evidenceIds.map(getEvidenceById).filter((d) => d !== undefined);
  return (
    <>
      <PortalHeader
        eyebrow={<div className="flex flex-wrap items-center gap-2">{p.isSample && <SampleChip />}<span className="text-sm text-ink-muted">ปีการศึกษา {p.academicYear}</span></div>}
        title={p.title}
        lead={<span className="flex flex-wrap items-center gap-2"><span>ตัวชี้วัดที่เกี่ยวข้อง</span>{p.indicatorCodes.map((c) => <IndicatorChip key={c} code={c} />)}</span>}
        crumbs={[{ href: "/quality", label: "คุณภาพการศึกษา" }, { href: `/projects/${p.id}`, label: p.title }]}
      />
      <div className="space-y-6">
        {p.isSample && (
          <p className="rounded-2xl bg-yellow-100 px-4 py-3 text-[15px] text-yellow-700">โครงการนี้เป็นตัวอย่างโครงสร้างการเชื่อมโยงหลักฐานตามโจทย์ ไม่ใช่ข้อมูลโครงการจริงของโรงเรียน</p>
        )}
        <InfoBlock title="สรุปโครงการ" value={p.summary} />
        <section aria-labelledby="flow-h">
          <h2 id="flow-h" className="mb-4 text-xl font-semibold">เส้นทางหลักฐาน</h2>
          <EvidenceFlow project={p} evidenceCount={docs.length} />
        </section>
        <section aria-labelledby="docs-h">
          <h2 id="docs-h" className="mb-4 text-xl font-semibold">หลักฐานของโครงการ ({docs.length})</h2>
          <ul className="space-y-3">{docs.map((d) => <li key={d.id}><EvidenceCard doc={d} /></li>)}</ul>
        </section>
      </div>
    </>
  );
}
