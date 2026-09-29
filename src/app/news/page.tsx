import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageBody } from "@/components/layout/InfoBlocks";
import { NewsBoard } from "@/components/news/NewsBoard";
import { getNews } from "@/lib/data";

export const metadata: Metadata = { title: "ข่าวสาร", alternates: { canonical: "/news" } };

export default function Page() {
  return (
    <>
      <PageHeader title="ข่าวสาร" lead="ข่าวประชาสัมพันธ์ วิชาการ นักเรียน ครูและบุคลากร ชุมชน รางวัล และกิจกรรม" crumbs={[{ href: "/news", label: "ข่าวสาร" }]} />
      <PageBody>
        <p className="rounded-2xl bg-yellow-100 px-4 py-3 text-[15px] text-yellow-700">การ์ดในหน้านี้เป็นโครงร่างรูปแบบ ยังไม่มีข่าวหรือกิจกรรมที่โรงเรียนเผยแพร่</p>
        <NewsBoard items={getNews()} />
      </PageBody>
    </>
  );
}
