import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageBody } from "@/components/layout/InfoBlocks";
import { PendingValue } from "@/components/ui/pending";
import { getSchool } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "ข้อมูลพื้นฐาน", alternates: { canonical: "/about/basic-information" } };

export default function BasicInfoPage() {
  const s = getSchool();
  const n = (v: number | null, unit: string) => (v === null ? null : `${formatNumber(v)} ${unit}`);
  const rows: [string, string | null][] = [
    ["ชื่อโรงเรียน (ภาษาไทย)", s.nameTh],
    ["ชื่อโรงเรียน (ภาษาอังกฤษ)", s.nameEn],
    ["สังกัด", s.affiliation],
    ["ปีที่ก่อตั้ง", s.founded === null ? null : `พ.ศ. ${s.founded}`],
    ["ระดับชั้นที่เปิดสอน", s.levels],
    ["จำนวนนักเรียน", n(s.students, "คน")],
    ["จำนวนครูและบุคลากร", n(s.staff, "คน")],
    ["ขนาดพื้นที่", n(s.areaRai, "ไร่")],
    ["ชุมชน / เขตบริการ", s.serviceArea],
    ["ที่อยู่", s.address],
    ["จังหวัด", s.province],
  ];
  return (
    <>
      <PageHeader title="ข้อมูลพื้นฐาน" lead="ข้อมูลสารสนเทศพื้นฐานของโรงเรียน" crumbs={[{ href: "/about", label: "รู้จักโรงเรียน" }, { href: "/about/basic-information", label: "ข้อมูลพื้นฐาน" }]} />
      <PageBody>
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-line bg-card shadow-soft">
          <table className="w-full text-left">
            <caption className="sr-only">ข้อมูลพื้นฐานของโรงเรียน</caption>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} className="border-b border-line last:border-0">
                  <th scope="row" className="w-2/5 bg-page/60 px-5 py-4 align-top font-medium">{k}</th>
                  <td className="px-5 py-4"><PendingValue value={v} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageBody>
    </>
  );
}
