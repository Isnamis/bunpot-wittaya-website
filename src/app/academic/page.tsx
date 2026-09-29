import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AcademicCard } from "@/components/home/AcademicSection";
import { PageBody } from "@/components/layout/InfoBlocks";
import { getAcademicPillars } from "@/lib/data";

export const metadata: Metadata = { title: "การจัดการศึกษา", description: "หลักสูตรสถานศึกษา การจัดการเรียนรู้ Active Learning โครงงาน กิจกรรมพัฒนาผู้เรียน และนวัตกรรมของโรงเรียนบรรพตวิทยา", alternates: { canonical: "/academic" } };

export default function AcademicPage() {
  return (
    <>
      <PageHeader title="การจัดการศึกษา" lead="โรงเรียนสอนอย่างไร — จากหลักสูตรสู่ห้องเรียน และจากห้องเรียนสู่ผลลัพธ์ของผู้เรียน" crumbs={[{ href: "/academic", label: "การจัดการศึกษา" }]} />
      <PageBody>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getAcademicPillars().map((p) => <li key={p.key}><AcademicCard p={p} /></li>)}
        </ul>
      </PageBody>
    </>
  );
}
