import Link from "next/link";
import { Download, Eye, FileImage, FileText } from "lucide-react";
import { evidenceTypeLabels } from "@/content/evidence";
import { Button } from "@/components/ui/button";
import { IndicatorChip, SampleChip } from "@/components/ui/badge";
import { cn, toneClasses, toneForIndicator } from "@/lib/utils";
import type { EvidenceDocument } from "@/lib/types";

export function EvidenceCard({ doc }: { doc: EvidenceDocument }) {
  const t = toneClasses[toneForIndicator(doc.indicatorCodes[0] ?? "2.1")];
  const Icon = doc.fileType === "image" ? FileImage : FileText;
  return (
    <article className="flex flex-col gap-4 rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft sm:flex-row sm:items-start">
      <span className={cn("grid size-12 shrink-0 place-items-center rounded-[14px]", t.tint, t.text)} aria-hidden>
        <Icon className="size-6" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/evidence/${doc.id}`} className="hover:text-purple-700 hover:underline">{doc.title}</Link>
        </h3>
        <p className="mt-1 text-[15px] text-ink-muted">{doc.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {doc.indicatorCodes.map((c) => <IndicatorChip key={c} code={c} />)}
          {doc.isSample && <SampleChip />}
          <span className="text-sm text-ink-muted">
            ปีการศึกษา {doc.academicYear} · {evidenceTypeLabels[doc.type]} · {doc.fileType.toUpperCase()}
            {doc.fileSizeKb ? ` · ${Math.round(doc.fileSizeKb / 1024 * 10) / 10} MB` : ""}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 gap-2 sm:flex-col lg:flex-row">
        <Button asChild variant="secondary" size="sm" className="flex-1">
          <Link href={`/evidence/${doc.id}`} aria-label={`ดู ${doc.title}`}><Eye aria-hidden /> ดู</Link>
        </Button>
        {doc.fileUrl ? (
          <Button asChild size="sm" className="flex-1">
            <a href={doc.fileUrl} download aria-label={`ดาวน์โหลด ${doc.title}`}><Download aria-hidden /> ดาวน์โหลด</a>
          </Button>
        ) : (
          <Button size="sm" className="flex-1" disabled title="ยังไม่มีไฟล์ — รอการยืนยันจากโรงเรียน" aria-label={`ดาวน์โหลด ${doc.title} (ยังไม่มีไฟล์)`}>
            <Download aria-hidden /> ดาวน์โหลด
          </Button>
        )}
      </div>
    </article>
  );
}
