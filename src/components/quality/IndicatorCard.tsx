import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { getEvidenceForIndicator, getProjectsForIndicator } from "@/lib/data";
import { cn, toneClasses, standardTone } from "@/lib/utils";
import type { Indicator } from "@/lib/types";

export function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const t = toneClasses[standardTone(indicator.standardId)];
  const docs = getEvidenceForIndicator(indicator.code);
  const real = docs.filter((d) => !d.isSample && d.fileUrl);
  const projects = getProjectsForIndicator(indicator.code);
  return (
    <article className="group relative flex h-full gap-4 rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lift">
      <span className={cn("grid size-14 shrink-0 place-items-center rounded-2xl text-lg font-bold", t.tint, t.text)} aria-hidden>
        {indicator.code}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-ink-muted">ตัวชี้วัดที่ {indicator.code}</p>
        <h3 className="font-semibold leading-snug">
          <Link href={`/quality/indicator/${indicator.code}`} className="after:absolute after:inset-0 after:rounded-[var(--radius-md)]">
            {indicator.title}
          </Link>
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <span className="inline-flex items-center gap-1"><FileText className="size-4" aria-hidden /> หลักฐาน {real.length || "—"} · โครงร่าง {docs.length}</span>
          {projects.length > 0 && <span>โครงการ {projects.length}</span>}
        </p>
      </div>
      <ArrowRight className="mt-1 size-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
    </article>
  );
}
