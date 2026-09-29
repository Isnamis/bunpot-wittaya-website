import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AcademicCard } from "@/components/home/AcademicSection";
import { InfoBlock, PageBody } from "@/components/layout/InfoBlocks";
import { getAcademicPillars } from "@/lib/data";

export const metadata: Metadata = { title: "นวัตกรรมการศึกษา", alternates: { canonical: "/academic/innovation" } };
const KEYS = "innovation,best-practice".split(",");

export default function Page() {
  const pillars = getAcademicPillars().filter((p) => KEYS.includes(p.key));
  return (
    <>
      <PageHeader title="นวัตกรรมการศึกษา" crumbs={[{ href: "/academic", label: "การจัดการศึกษา" }, { href: "/academic/innovation", label: "นวัตกรรมการศึกษา" }]} />
      <PageBody>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => <li key={p.key}><AcademicCard p={p} /></li>)}
        </ul>
        <InfoBlock title="รายละเอียดของโรงเรียน" value={null} indicatorCodes={["2.6"]} />
        <InfoBlock title="เอกสารที่เกี่ยวข้อง" value={null} />
      </PageBody>
    </>
  );
}
