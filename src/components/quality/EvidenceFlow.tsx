import { ArrowDown, ArrowRight, FileCheck2, GraduationCap, Sparkles, Workflow } from "lucide-react";
import { Pending } from "@/components/ui/pending";
import { ClayTile } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

export function EvidenceFlow({ project, evidenceCount }: { project: Project; evidenceCount: number }) {
  const steps = [
    { n: "01", en: "Activity", th: "กิจกรรม", v: project.flow.activity, icon: Sparkles, bg: "bg-lavender-100", fg: "text-purple-700", tone: "lavender" as const },
    { n: "02", en: "Process", th: "กระบวนการ", v: project.flow.process, icon: Workflow, bg: "bg-blue-100", fg: "text-blue-700", tone: "blue" as const },
    { n: "03", en: "Student Outcome", th: "ผลลัพธ์ผู้เรียน", v: project.flow.outcome, icon: GraduationCap, bg: "bg-green-100", fg: "text-green-700", tone: "green" as const },
    { n: "04", en: "Evidence", th: "หลักฐาน", v: `${evidenceCount} รายการ (ดูด้านล่าง)`, icon: FileCheck2, bg: "bg-yellow-100", fg: "text-yellow-700", tone: "yellow" as const },
  ];
  return (
    <ol className="grid gap-3 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] xl:items-stretch">
      {steps.map((s, i) => (
        <li key={s.n} className="contents">
          <div className={cn("rounded-[24px] border border-white/70 p-5", s.bg)}>
            <div className="flex items-center gap-3">
              <ClayTile icon={s.icon} tone={s.tone} size={40} />
              <div className="leading-tight">
                <p className={cn("text-[12px] font-semibold uppercase tracking-[0.08em]", s.fg)}>{s.n} {s.en}</p>
                <p className="font-semibold">{s.th}</p>
              </div>
            </div>
            <div className="mt-3 text-[15px]">{s.v ?? <Pending className="text-[13px]" />}</div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center justify-center text-ink-muted" aria-hidden>
              <ArrowDown className="size-5 xl:hidden" />
              <ArrowRight className="hidden size-5 xl:block" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
