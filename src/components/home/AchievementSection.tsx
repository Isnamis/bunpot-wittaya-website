import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { getOutcomeMetrics } from "@/lib/data";
import { ClayTile, IconTile } from "@/components/ui/icon";
import { IndicatorChip } from "@/components/ui/badge";
import { Pending } from "@/components/ui/pending";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { OutcomeChart } from "./OutcomeChart";
import { formatNumber } from "@/lib/utils";

export function AchievementSection() {
  const metrics = getOutcomeMetrics();
  const withData = metrics.filter((m) => m.value !== null);
  return (
    <Section
      id="outcomes"
      eyebrow="Student Outcomes"
      title="ผลลัพธ์ของผู้เรียน"
      lead="ผลลัพธ์ที่เกิดขึ้นจริงกับผู้เรียน — ทุกตัวเลขมาจากข้อมูลที่โรงเรียนยืนยันและเชื่อมโยงกับหลักฐาน"
      action={<Button asChild variant="secondary"><Link href="/students/outcomes">ดูผลลัพธ์ทั้งหมด <ArrowRight aria-hidden /></Link></Button>}
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 lg:gap-4">
          {metrics.map((m, i) => (
            <li key={m.key}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <div className="flex h-full gap-4 rounded-[var(--radius-md)] border border-line bg-card p-4 shadow-soft">
                  <ClayTile name={m.icon} tone={m.tone} size={44} />
                  <div className="min-w-0">
                    <p className="font-semibold">{m.label}</p>
                    <p className="text-sm text-ink-muted">{m.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {m.value === null ? <Pending className="text-[13px]" /> : <span className="text-2xl font-bold">{formatNumber(m.value)}{m.unit}</span>}
                      {m.indicatorCode && <IndicatorChip code={m.indicatorCode} />}
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <IconTile icon={BarChart3} tone="lavender" className="size-10" />
              <div>
                <h3 className="font-semibold">แนวโน้มผลลัพธ์ผู้เรียน</h3>
                <p className="text-sm text-ink-muted">เปรียบเทียบรายปีการศึกษา</p>
              </div>
            </div>
            <div className="mt-4 flex-1">
              <OutcomeChart data={withData.map((m) => ({ name: m.label, value: m.value as number }))} />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
