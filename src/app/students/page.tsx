import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageBody, SubNav } from "@/components/layout/InfoBlocks";
import { AchievementSection } from "@/components/home/AchievementSection";

export const metadata: Metadata = { title: "ผลลัพธ์ของผู้เรียน", alternates: { canonical: "/students" } };

export default function StudentsPage() {
  return (
    <>
      <PageHeader title="ผลลัพธ์ของผู้เรียน" lead="สมรรถนะ คุณลักษณะ ผลงาน และความสำเร็จของผู้เรียน" crumbs={[{ href: "/students", label: "ผลลัพธ์ของผู้เรียน" }]} />
      <PageBody>
        <SubNav links={[
          { href: "/students/outcomes", label: "ผลลัพธ์ของผู้เรียน", desc: "ข้อมูลผลลัพธ์รายด้าน เชื่อมโยงตัวชี้วัดมาตรฐานที่ 1" },
          { href: "/students/achievements", label: "ผลงานและรางวัล", desc: "รางวัล การแข่งขัน และผลงานของนักเรียน" },
        ]} />
      </PageBody>
      <AchievementSection />
    </>
  );
}
