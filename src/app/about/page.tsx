import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageBody, SubNav } from "@/components/layout/InfoBlocks";
import { SchoolStats } from "@/components/home/SchoolStats";
import { SchoolIdentity } from "@/components/home/SchoolIdentity";

export const metadata: Metadata = { title: "รู้จักโรงเรียน", description: "ประวัติ วิสัยทัศน์ อัตลักษณ์ และข้อมูลพื้นฐานของโรงเรียนบรรพตวิทยา", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="รู้จักโรงเรียน" lead="โรงเรียนบรรพตวิทยาคือใคร เชื่ออะไร และมุ่งพัฒนาผู้เรียนไปในทิศทางใด" crumbs={[{ href: "/about", label: "รู้จักโรงเรียน" }]} />
      <PageBody>
        <SubNav links={[
          { href: "/about/history", label: "ประวัติโรงเรียน", desc: "ความเป็นมาและพัฒนาการของโรงเรียน" },
          { href: "/about/vision", label: "วิสัยทัศน์และอัตลักษณ์", desc: "วิสัยทัศน์ พันธกิจ อัตลักษณ์ เอกลักษณ์ ค่านิยม ปรัชญา" },
          { href: "/about/basic-information", label: "ข้อมูลพื้นฐาน", desc: "ข้อมูลนักเรียน ครู พื้นที่ และเขตบริการ" },
        ]} />
      </PageBody>
      <SchoolStats />
      <SchoolIdentity />
    </>
  );
}
