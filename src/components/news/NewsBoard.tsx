"use client";
import { useMemo, useState } from "react";
import { newsCategories } from "@/content/site";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";
import { NewsCard } from "./NewsCard";

export function NewsBoard({ items, limit, columns = 3 }: { items: NewsItem[]; limit?: number; columns?: 2 | 3 }) {
  const [cat, setCat] = useState<string>("all");
  // All items are rendered (non-matching ones hidden) so every category exists in the static HTML.
  const visibleIds = useMemo(() => {
    const list = cat === "all" ? items : items.filter((i) => i.category === cat);
    return new Set((limit ? list.slice(0, limit) : list).map((i) => i.id));
  }, [cat, items, limit]);
  const filtered = items.filter((i) => visibleIds.has(i.id));
  const tabs = [{ key: "all", label: "ทั้งหมด" }, ...newsCategories];
  return (
    <div data-newsboard={limit ?? ""}>
      <div role="group" aria-label="กรองตามหมวดข่าว" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            data-newstab={t.key}
            aria-pressed={cat === t.key}
            onClick={() => setCat(t.key)}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-4 text-[15px] font-medium transition-colors",
              cat === t.key ? "border-purple-600 bg-purple-600 text-white" : "border-line bg-card hover:bg-lavender-100",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">พบ {filtered.length} รายการ</p>
      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-card p-8 text-center text-ink-muted">ยังไม่มีข่าวในหมวดนี้</p>
      ) : (
        <ul className={cn("grid gap-4 sm:grid-cols-2 md:gap-6", columns === 3 && "lg:grid-cols-3")}>
          {items.map((n) => <li key={n.id} data-news={n.category} className={visibleIds.has(n.id) ? undefined : "hidden"}><NewsCard item={n} /></li>)}
        </ul>
      )}
    </div>
  );
}
