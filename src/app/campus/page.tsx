import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageBody } from "@/components/layout/InfoBlocks";
import { CampusGallery } from "@/components/home/CampusGallery";

export const metadata: Metadata = { title: "โรงเรียนของเรา", alternates: { canonical: "/campus" } };

export default function CampusPage() {
  return (
    <>
      <PageHeader title="โรงเรียนของเรา" lead="อาคาร ห้องเรียน ห้องปฏิบัติการ ห้องสมุด และพื้นที่การเรียนรู้ — ตัวชี้วัดที่ 2.6 และ 2.7" crumbs={[{ href: "/campus", label: "โรงเรียนของเรา" }]} />
      <PageBody><CampusGallery withHeader={false} /></PageBody>
    </>
  );
}
