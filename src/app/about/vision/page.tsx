import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InfoBlock, PageBody } from "@/components/layout/InfoBlocks";
import { getSchool } from "@/lib/data";

export const metadata: Metadata = { title: "วิสัยทัศน์และอัตลักษณ์", alternates: { canonical: "/about/vision" } };

export default function VisionPage() {
  const id = getSchool().identity;
  return (
    <>
      <PageHeader title="วิสัยทัศน์และอัตลักษณ์" lead="ทิศทางและคุณค่าที่โรงเรียนยึดถือ — เชื่อมโยงกับตัวชี้วัดที่ 2.1" crumbs={[{ href: "/about", label: "รู้จักโรงเรียน" }, { href: "/about/vision", label: "วิสัยทัศน์และอัตลักษณ์" }]} />
      <PageBody>
        <InfoBlock title="วิสัยทัศน์" value={id.vision} indicatorCodes={["2.1"]} />
        <InfoBlock title="พันธกิจ" value={id.mission} indicatorCodes={["2.1"]} />
        <div className="grid gap-6 md:grid-cols-2">
          <InfoBlock title="อัตลักษณ์" value={id.identity} />
          <InfoBlock title="เอกลักษณ์" value={id.uniqueness} />
          <InfoBlock title="ค่านิยม" value={id.values} indicatorCodes={["2.1"]} />
          <InfoBlock title="ปรัชญา" value={id.philosophy} />
        </div>
        <InfoBlock title="จุดเน้นของโรงเรียน" value={id.focus} indicatorCodes={["2.2"]} />
      </PageBody>
    </>
  );
}
