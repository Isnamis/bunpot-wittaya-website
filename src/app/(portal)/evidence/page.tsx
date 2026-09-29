import type { Metadata } from "next";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { EvidenceCenter } from "@/components/quality/EvidenceCenter";
import { getEvidence, getIndicators, getProjects, getStandards } from "@/lib/data";

export const metadata: Metadata = {
  title: "ศูนย์หลักฐานดิจิทัล",
  description: "ค้นหาหลักฐานคุณภาพการศึกษาของโรงเรียนบรรพตวิทยา ตามมาตรฐาน ตัวชี้วัด ปีการศึกษา ประเภทเอกสาร และโครงการ",
  alternates: { canonical: "/evidence" },
};

export default function EvidencePage() {
  return (
    <>
      <PortalHeader
        title="ศูนย์หลักฐานดิจิทัล"
        lead="Digital Evidence Center — ค้นหาและกรองหลักฐานตามมาตรฐาน ตัวชี้วัด ปีการศึกษา ประเภทเอกสาร โครงการ และหมวดหลักฐาน"
        crumbs={[{ href: "/quality", label: "คุณภาพการศึกษา" }, { href: "/evidence", label: "ศูนย์หลักฐานดิจิทัล" }]}
      >
        <p className="mt-4 max-w-[68ch] rounded-2xl bg-yellow-100 px-4 py-3 text-[15px] text-yellow-700">
          รายการปัจจุบันเป็น <strong>โครงร่างรายการหลักฐาน</strong> (ยังไม่มีไฟล์จริง) เพื่อแสดงโครงสร้างระบบ — โรงเรียนจะแทนที่ด้วยเอกสารจริง
        </p>
      </PortalHeader>
      <div className="">
                  <EvidenceCenter docs={getEvidence()} standards={getStandards()} indicators={getIndicators()} projects={getProjects()} />
      </div>
    </>
  );
}
