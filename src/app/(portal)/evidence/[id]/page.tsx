import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { DocumentViewer } from "@/components/quality/DocumentViewer";
import { IndicatorChip, SampleChip } from "@/components/ui/badge";
import { evidenceCategoryLabels, evidenceTypeLabels } from "@/content/evidence";
import { getEvidence, getEvidenceById, getIndicator, getProject } from "@/lib/data";
import { formatThaiDate } from "@/lib/utils";

export function generateStaticParams() {
  return getEvidence().map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const d = getEvidenceById((await params).id);
  return d ? { title: d.title, description: d.description, robots: d.isSample ? { index: false } : undefined } : {};
}

export default async function EvidenceDetail({ params }: { params: Promise<{ id: string }> }) {
  const doc = getEvidenceById((await params).id);
  if (!doc) notFound();
  const project = doc.projectId ? getProject(doc.projectId) : undefined;
  const meta: [string, ReactNode][] = [
    ["ปีการศึกษา", doc.academicYear],
    ["ประเภทเอกสาร", evidenceTypeLabels[doc.type]],
    ["หมวดหลักฐาน", evidenceCategoryLabels[doc.category]],
    ["ชนิดไฟล์", doc.fileType.toUpperCase()],
    ["วันที่เผยแพร่", doc.publishedAt ? formatThaiDate(doc.publishedAt) : "—"],
    ["โครงการ", project ? <Link className="text-purple-700 underline" href={`/projects/${project.id}`}>{project.title}</Link> : "—"],
  ];
  return (
    <>
      <PortalHeader
        eyebrow={doc.isSample ? <SampleChip /> : undefined}
        title={doc.title}
        lead={doc.description}
        crumbs={[{ href: "/quality", label: "คุณภาพการศึกษา" }, { href: "/evidence", label: "ศูนย์หลักฐาน" }, { href: `/evidence/${doc.id}`, label: doc.title }]}
      />
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_300px]">
        <DocumentViewer doc={doc} />
        <aside className="space-y-4">
          <div className="rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft">
            <h2 className="mb-3 font-semibold">ตัวชี้วัดที่เกี่ยวข้อง</h2>
            <ul className="space-y-2">
              {doc.indicatorCodes.map((c) => (
                <li key={c}>
                  <Link href={`/quality/indicator/${c}`} className="flex items-start gap-2 rounded-xl p-1 hover:bg-lavender-100">
                    <IndicatorChip code={c} />
                    <span className="text-[15px] leading-snug">{getIndicator(c)?.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <dl className="rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft">
            {meta.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line py-2 text-[15px] last:border-0">
                <dt className="text-ink-muted">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </>
  );
}
