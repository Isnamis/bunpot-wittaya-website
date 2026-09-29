import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InfoBlock, PageBody } from "@/components/layout/InfoBlocks";
import { getSchool } from "@/lib/data";

export const metadata: Metadata = { title: "ประวัติโรงเรียน", alternates: { canonical: "/about/history" } };

export default function HistoryPage() {
  const s = getSchool();
  return (
    <>
      <PageHeader title="ประวัติโรงเรียน" crumbs={[{ href: "/about", label: "รู้จักโรงเรียน" }, { href: "/about/history", label: "ประวัติโรงเรียน" }]} />
      <PageBody>
        <InfoBlock title="ปีที่ก่อตั้ง" value={s.founded === null ? null : `พ.ศ. ${s.founded}`} />
        <InfoBlock title="ความเป็นมา" value={s.history} />
        <InfoBlock title="คำขวัญโรงเรียน" value={s.identity.motto} />
      </PageBody>
    </>
  );
}
