import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getQualityOverview, getSchool } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder, PendingValue } from "@/components/ui/pending";
import { ClayTile } from "@/components/ui/icon";
import { Logo } from "@/components/layout/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { ClayBooks, ClayCloud, ClayPlant } from "@/components/illustrations/Clay";
import { TodayChip } from "./TodayChip";

export function Hero() {
  const s = getSchool();
  const q = getQualityOverview();
  return (
    <section aria-labelledby="hero-title" className="pt-4 md:pt-8">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#efeaf8_0%,#e6def4_45%,#f6e4ee_100%)] px-5 pb-8 pt-6 shadow-lift md:rounded-[40px] md:px-12 md:py-14">
          {/* soft background shapes */}
          <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-white/40" />
          <div aria-hidden className="absolute -bottom-32 left-1/3 size-96 rounded-full bg-lavender-300/25" />
          <ClayCloud className="absolute left-[46%] top-6 hidden w-28 opacity-90 lg:block" />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1 pl-1 pr-3 text-[13px] font-semibold text-purple-700 shadow-soft">
                    <Logo size={28} /> เว็บไซต์ทางการ
                  </span>
                  <TodayChip />
                </div>
                <h1 id="hero-title" className="mt-6 text-[32px] font-bold leading-[1.25] tracking-[-0.01em] sm:text-[44px] md:text-[60px]">
                  {s.nameTh}
                </h1>
                <p className="mt-1 text-lg font-medium text-purple-700 md:text-xl">{s.nameEn}</p>
                <div className="mt-6 space-y-2">
                  <p className="text-lg font-semibold">
                    <PendingValue value={s.positioning} label="ข้อความวางตำแหน่งโรงเรียน" />
                  </p>
                  <p className="max-w-[54ch] text-base text-ink-muted md:text-lg">
                    <PendingValue value={s.description} label="คำอธิบายโรงเรียนโดยย่อ" />
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="shadow-[0_10px_24px_-8px_rgba(122,95,168,.6)]">
                    <Link href="/about">รู้จักโรงเรียน <ArrowRight aria-hidden /></Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="border-white bg-white/80">
                    <Link href="/quality"><ShieldCheck aria-hidden /> คุณภาพการศึกษา</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal className="relative lg:col-span-6" delay={0.1}>
              <div className="relative mx-auto max-w-[560px] pb-10 pl-6 pr-4 md:pb-14 md:pl-16">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border-[6px] border-white bg-white shadow-lift">
                  {s.heroImage ? (
                    <Image src={s.heroImage.url} alt={s.heroImage.alt} fill priority sizes="(min-width:1024px) 520px, 100vw" className="object-cover" />
                  ) : (
                    <ImagePlaceholder label="ภาพถ่ายจริงของโรงเรียน" className="h-full w-full rounded-[22px]" />
                  )}
                </div>
                <ClayBooks className="absolute -bottom-2 -left-4 w-28 drop-shadow-sm md:-left-2 md:w-40" />
                <ClayPlant className="absolute -right-4 bottom-4 w-20 md:-right-8 md:w-28" />
                <div className="absolute -top-4 right-2 flex gap-2 md:right-6">
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 py-2 pl-2 pr-4 shadow-soft">
                    <ClayTile icon={ShieldCheck} size={36} />
                    <span className="leading-tight"><span className="block text-lg font-bold">{q.standardCount}</span><span className="text-xs text-ink-muted">มาตรฐาน</span></span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/95 py-2 pl-2 pr-4 shadow-soft">
                    <ClayTile name="Sparkles" tone="green" size={36} />
                    <span className="leading-tight"><span className="block text-lg font-bold">{q.indicatorCount}</span><span className="text-xs text-ink-muted">ตัวชี้วัด</span></span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
