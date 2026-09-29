import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageBody } from "@/components/layout/InfoBlocks";

export const metadata: Metadata = { title: "ผลงานและรางวัล", alternates: { canonical: "/students/achievements" } };

export default function AchievementsPage() {
  return (
    <>
      <PageHeader title="ผลงานและรางวัล" lead="รางวัลและผลงานของนักเรียน ครู และโรงเรียน — แต่ละรายการเชื่อมโยงกับหลักฐาน" crumbs={[{ href: "/students", label: "ผลลัพธ์ของผู้เรียน" }, { href: "/students/achievements", label: "ผลงานและรางวัล" }]} />
      <PageBody>
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-line bg-card p-10 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-yellow-100 text-yellow-700"><Trophy className="size-7" aria-hidden /></span>
          <p className="text-lg font-semibold">ยังไม่มีรายการรางวัลที่ยืนยันแล้ว</p>
          <p className="max-w-[52ch] text-ink-muted">เมื่อโรงเรียนเพิ่มข้อมูล รายการจะแสดงชื่อรางวัล ระดับ วันที่ ผู้ได้รับ และลิงก์ไปยังหลักฐาน (เช่น เกียรติบัตร)</p>
        </div>
      </PageBody>
    </>
  );
}
