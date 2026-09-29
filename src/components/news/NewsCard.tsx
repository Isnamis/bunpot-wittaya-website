import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { newsCategories } from "@/content/site";
import { Badge, SampleChip } from "@/components/ui/badge";
import { ImagePlaceholder, Pending } from "@/components/ui/pending";
import { formatThaiDate } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ item, href = "/news" }: { item: NewsItem; href?: string }) {
  const cat = newsCategories.find((c) => c.key === item.category)!;
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-md)] border border-line bg-card p-3 shadow-soft transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px]">
        {item.thumbnail ? (
          <Image src={item.thumbnail.url} alt={item.thumbnail.alt} fill sizes="(min-width:1024px) 380px, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        ) : (
          <ImagePlaceholder label="ภาพข่าว" className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={cat.tone}>{cat.label}</Badge>
          <span className="inline-flex items-center gap-1 text-sm text-ink-muted">
            <CalendarDays className="size-4" aria-hidden />
            {item.date ? <time dateTime={item.date}>{formatThaiDate(item.date)}</time> : "[วันที่]"}
          </span>
          {item.isSample && <SampleChip />}
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-semibold">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-[var(--radius-md)]">
            {item.title ?? <Pending label="หัวข้อข่าว" />}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] text-ink-muted">{item.excerpt ?? "[สรุปข่าวสั้น — รอข้อมูลจากโรงเรียน]"}</p>
      </div>
    </article>
  );
}

/** Activities use the same card; kept as a named export for the CMS mapping. */
export const ActivityCard = NewsCard;
