import Link from "next/link";
import { ArrowRight, Quote, BookHeart, Compass, Eye, Fingerprint, Gem, Star, Target } from "lucide-react";
import { getSchool } from "@/lib/data";
import { ClayTile } from "@/components/ui/icon";
import { ClayCloud, ClayStar } from "@/components/illustrations/Clay";
import { Pending } from "@/components/ui/pending";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

function Value({ v }: { v: string | string[] | null }) {
  if (v === null) return <Pending />;
  if (Array.isArray(v)) return <ul className="list-disc space-y-1 pl-5">{v.map((x) => <li key={x}>{x}</li>)}</ul>;
  return <p>{v}</p>;
}

export function SchoolIdentity() {
  const id = getSchool().identity;
  const cards: { key: string; title: string; en: string; v: string | string[] | null; icon: typeof Eye; tone: Tone; span: string }[] = [
    { key: "mission", title: "พันธกิจ", en: "Mission", v: id.mission, icon: Target, tone: "blue", span: "md:col-span-3" },
    { key: "philosophy", title: "ปรัชญา", en: "Philosophy", v: id.philosophy, icon: BookHeart, tone: "pink", span: "md:col-span-3" },
    { key: "identity", title: "อัตลักษณ์", en: "Identity", v: id.identity, icon: Fingerprint, tone: "green", span: "md:col-span-3" },
    { key: "uniqueness", title: "เอกลักษณ์", en: "Uniqueness", v: id.uniqueness, icon: Gem, tone: "yellow", span: "md:col-span-3" },
    { key: "values", title: "ค่านิยม", en: "Values", v: id.values, icon: Star, tone: "lavender", span: "md:col-span-3" },
    { key: "motto", title: "คำขวัญ", en: "Motto", v: id.motto, icon: Quote, tone: "blue", span: "md:col-span-3" },
  ];
  return (
    <Section
      id="identity"
      eyebrow="School Identity"
      title="หัวใจของโรงเรียน"
      lead="สิ่งที่โรงเรียนเชื่อ และทิศทางที่ใช้พัฒนาผู้เรียน"
      action={<Button asChild variant="secondary"><Link href="/about/vision">อ่านเพิ่มเติม <ArrowRight aria-hidden /></Link></Button>}
    >
      <div className="grid gap-4 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-6 md:row-span-2">
          <article className="relative h-full overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#e6def4_0%,#d9d0ef_60%,#f3dde9_100%)] p-6 md:p-8">
            <div aria-hidden className="absolute -bottom-16 -right-16 size-56 rounded-full bg-white/35" />
            <ClayCloud className="absolute right-6 top-6 w-24 md:w-32" />
            <ClayStar className="absolute bottom-4 right-6 hidden w-20 md:block" />
            <ClayTile icon={Eye} tone="lavender" size={52} />
            <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-purple-700">Vision</p>
            <h3 className="text-2xl font-bold md:text-[28px]">วิสัยทัศน์</h3>
            <div className="relative mt-4 text-lg"><Value v={id.vision} /></div>
            <div className="relative mt-8 max-w-[80%] rounded-2xl bg-white/80 p-4 shadow-soft">
              <p className="flex items-center gap-2 font-semibold"><Compass className="size-5 text-purple-700" aria-hidden /> จุดเน้นของโรงเรียน</p>
              <div className="mt-2 text-[15px]"><Value v={id.focus} /></div>
            </div>
          </article>
        </Reveal>
        <div className="grid gap-4 md:col-span-6 md:grid-cols-6 md:gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.05} className={cn(c.span)}>
              <article className="h-full rounded-[24px] border border-line bg-card p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <ClayTile icon={c.icon} tone={c.tone} size={40} />
                  <div className="leading-tight">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <p className="text-xs text-ink-muted">{c.en}</p>
                  </div>
                </div>
                <div className="mt-3 text-[15px]"><Value v={c.v} /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
