import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGallery } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/pending";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

const spans = ["md:col-span-2 md:row-span-2", "", "", "", "", "md:col-span-2", "", ""];

export function CampusGallery({ withHeader = true }: { withHeader?: boolean }) {
  const items = getGallery();
  const grid = (
    <ul className="grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4 md:gap-4">
      {items.map((g, i) => (
        <li key={g.id} className={cn("relative overflow-hidden rounded-[var(--radius-md)]", spans[i])}>
          {g.image ? (
            <Image src={g.image.url} alt={g.image.alt} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
          ) : (
            <ImagePlaceholder label={`ภาพจริง: ${g.label}`} className="h-full w-full rounded-none" />
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[13px] font-semibold shadow-soft">{g.label}</span>
        </li>
      ))}
    </ul>
  );
  if (!withHeader) return grid;
  return (
    <Section
      id="campus"
      eyebrow="Campus & Community"
      title="โรงเรียนและชุมชนของเรา"
      lead="อาคาร ห้องเรียน แหล่งเรียนรู้ ธรรมชาติ ชุมชน และวัฒนธรรมท้องถิ่น — ใช้ภาพถ่ายจริงของโรงเรียนเท่านั้น"
      action={<Button asChild variant="secondary"><Link href="/campus">ดูทั้งหมด <ArrowRight aria-hidden /></Link></Button>}
    >
      {grid}
    </Section>
  );
}
