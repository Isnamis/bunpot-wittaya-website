import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClayShield, ClayStar } from "@/components/illustrations/Clay";

/** Closing banner (reference: "discover" promo strip), used for the quality CTA. */
export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" className="pb-4">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#6a4f98_0%,#7a5fa8_55%,#8a6bb8_100%)] px-6 py-8 text-white shadow-lift md:px-12 md:py-10">
          <div aria-hidden className="absolute -right-10 -top-16 size-64 rounded-full bg-white/10" />
          <div aria-hidden className="absolute bottom-[-60px] left-1/3 size-40 rounded-full bg-pink-300/20" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex shrink-0 items-end">
              <ClayShield className="w-20 md:w-24" />
              <ClayStar className="-ml-4 w-12 md:w-14" />
            </div>
            <div className="flex-1">
              <h2 id="cta-title" className="text-2xl font-bold md:text-[28px]">หลักฐานคุณภาพการศึกษา เปิดเผยและตรวจสอบได้</h2>
              <p className="mt-1 text-white/90">ดูข้อมูลตาม 3 มาตรฐาน 16 ตัวชี้วัด พร้อมเอกสารหลักฐานที่เกี่ยวข้อง</p>
            </div>
            <Link href="/quality" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-purple-700 shadow-soft transition hover:-translate-y-px hover:bg-lavender-100">
              ดูข้อมูลคุณภาพการศึกษา <ArrowRight className="size-5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
