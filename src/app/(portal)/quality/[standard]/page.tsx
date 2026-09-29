import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { IndicatorCard } from "@/components/quality/IndicatorCard";
import { Badge } from "@/components/ui/badge";
import { getIndicators, getStandardBySlug, getStandards, getStandardStats } from "@/lib/data";

export function generateStaticParams() {
  return getStandards().map((s) => ({ standard: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ standard: string }> }): Promise<Metadata> {
  const s = getStandardBySlug((await params).standard);
  return s ? { title: `มาตรฐานที่ ${s.id} ${s.title}`, description: s.description, alternates: { canonical: `/quality/${s.slug}` } } : {};
}

export default async function StandardPage({ params }: { params: Promise<{ standard: string }> }) {
  const s = getStandardBySlug((await params).standard);
  if (!s) notFound();
  const inds = getIndicators(s.id);
  const st = getStandardStats(s.id);
  return (
    <>
      <PortalHeader
        eyebrow={<Badge tone={s.tone}>STANDARD {s.code}</Badge>}
        title={`มาตรฐานที่ ${s.id} ${s.title}`}
        lead={s.description}
        crumbs={[{ href: "/quality", label: "คุณภาพการศึกษา" }, { href: `/quality/${s.slug}`, label: `มาตรฐานที่ ${s.id}` }]}
      >
        <dl className="mt-6 flex flex-wrap gap-3">
          {[["ตัวชี้วัด", st.indicatorCount], ["หลักฐานที่เผยแพร่", st.evidenceCount || "—"], ["ความครบถ้วน", st.completeness === null ? "ยังไม่มีข้อมูล" : `${st.completeness}%`]].map(([k, v]) => (
            <div key={k as string} className="rounded-2xl border border-line bg-page px-4 py-2">
              <dt className="text-sm text-ink-muted">{k}</dt>
              <dd className="text-xl font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </PortalHeader>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">ตัวชี้วัด ({inds.length})</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {inds.map((i) => <li key={i.code}><IndicatorCard indicator={i} /></li>)}
        </ul>
      </div>
    </>
  );
}
