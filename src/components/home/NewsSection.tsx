import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNews } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { NewsBoard } from "@/components/news/NewsBoard";
import { CalendarWidget } from "@/components/news/CalendarWidget";

export function NewsSection() {
  return (
    <Section
      id="news"
      eyebrow="News & Activities"
      title="ข่าวสารและกิจกรรม"
      lead="การ์ดด้านล่างเป็นโครงร่างรูปแบบ — จะแทนที่ด้วยข่าวจริงเมื่อโรงเรียนเผยแพร่"
      action={<Button asChild variant="secondary"><Link href="/news">ดูข่าวทั้งหมด <ArrowRight aria-hidden /></Link></Button>}
      tinted
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8"><NewsBoard items={getNews()} limit={2} columns={2} /></div>
        <aside aria-label="ปฏิทินโรงเรียน" className="lg:col-span-4 lg:pt-[68px]"><CalendarWidget /></aside>
      </div>
    </Section>
  );
}
