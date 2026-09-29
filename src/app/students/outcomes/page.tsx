import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AchievementSection } from "@/components/home/AchievementSection";

export const metadata: Metadata = { title: "ผลลัพธ์ของผู้เรียน", alternates: { canonical: "/students/outcomes" } };

export default function OutcomesPage() {
  return (
    <>
      <PageHeader title="ผลลัพธ์ของผู้เรียน" lead="ทุกตัวเลขในหน้านี้ต้องมาจากข้อมูลที่โรงเรียนยืนยัน พร้อมหลักฐานในศูนย์หลักฐานดิจิทัล" crumbs={[{ href: "/students", label: "ผลลัพธ์ของผู้เรียน" }, { href: "/students/outcomes", label: "ผลลัพธ์" }]} />
      <AchievementSection />
    </>
  );
}
