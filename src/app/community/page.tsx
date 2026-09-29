import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InfoBlock, PageBody } from "@/components/layout/InfoBlocks";

export const metadata: Metadata = { title: "ชุมชนและวัฒนธรรม", alternates: { canonical: "/community" } };

export default function CommunityPage() {
  return (
    <>
      <PageHeader title="ชุมชนและวัฒนธรรม" lead="บริบทชุมชน วัฒนธรรมท้องถิ่น และเครือข่ายความร่วมมือของโรงเรียน" crumbs={[{ href: "/campus", label: "โรงเรียนของเรา" }, { href: "/community", label: "ชุมชนและวัฒนธรรม" }]} />
      <PageBody>
        <InfoBlock title="บริบทชุมชน" value={null} />
        <InfoBlock title="วัฒนธรรมและภูมิปัญญาท้องถิ่น" value={null} />
        <InfoBlock title="เครือข่ายผู้ปกครอง องค์กร และชุมชน" value={null} indicatorCodes={["2.10"]} />
      </PageBody>
    </>
  );
}
