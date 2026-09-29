"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { FileSearch, FolderKanban, LayoutDashboard, Search } from "lucide-react";
import { ClayBooks } from "@/components/illustrations/Clay";
import { cn } from "@/lib/utils";

const items = [
  { href: "/quality", label: "ภาพรวมคุณภาพ", icon: LayoutDashboard, exact: true },
  { href: "/quality/standard-1", label: "มาตรฐานที่ 1", sub: "ผลลัพธ์ของการเรียนรู้", dot: "bg-[#8d74bb]" },
  { href: "/quality/standard-2", label: "มาตรฐานที่ 2", sub: "การบริหารจัดการ", dot: "bg-[#7a9fdc]" },
  { href: "/quality/standard-3", label: "มาตรฐานที่ 3", sub: "การจัดการเรียนรู้", dot: "bg-[#5fb08c]" },
  { href: "/evidence", label: "ศูนย์หลักฐาน", icon: FileSearch },
  { href: "/quality#mapping", label: "โครงการ", icon: FolderKanban, match: "/projects" },
];

function active(rawPath: string, it: (typeof items)[number]) {
  const pathname = rawPath.replace(/\/+$/, "") || "/";
  if (it.match && pathname.startsWith(it.match)) return true;
  if (it.exact) return pathname === it.href;
  if (it.href.includes("#")) return false;
  if (it.href.startsWith("/quality/standard-")) {
    const n = it.href.slice(-1);
    return pathname === it.href || pathname.startsWith(`/quality/indicator/${n}.`);
  }
  return pathname.startsWith(it.href);
}

/** Dashboard-style shell for the quality & evidence portal (reference: sidebar navigation). */
export function PortalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-10 pt-4 md:px-6 md:pt-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[264px_1fr] lg:gap-8">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[32px] bg-[linear-gradient(180deg,#e9e3f6_0%,#e3dcf3_100%)] p-3 shadow-soft lg:p-4">
            <p className="hidden px-3 pb-3 pt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-purple-700 lg:block">Quality Portal</p>
            <nav aria-label="เมนูศูนย์คุณภาพ">
              <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
                {items.map((it) => {
                  const on = active(pathname, it);
                  const Icon = it.icon;
                  return (
                    <li key={it.label} className="shrink-0">
                      <Link
                        href={it.href}
                        aria-current={on ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center gap-3 rounded-2xl px-3 py-2 text-[15px] font-medium transition",
                          on ? "bg-white text-purple-700 shadow-soft" : "text-ink hover:bg-white/60",
                        )}
                      >
                        {Icon ? <Icon className="size-5 shrink-0" aria-hidden /> : <span className={cn("ml-1 mr-1 size-3 shrink-0 rounded-full", it.dot)} aria-hidden />}
                        <span className="whitespace-nowrap leading-tight">
                          {it.label}
                          {it.sub && <span className="hidden text-xs font-normal text-ink-muted lg:block">{it.sub}</span>}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="relative mt-4 hidden overflow-hidden rounded-[24px] bg-[linear-gradient(160deg,#fbe3ec_0%,#f7d3e1_100%)] p-4 lg:block">
              <ClayBooks className="mx-auto -mt-1 w-28" />
              <p className="mt-1 text-center font-semibold">หาเอกสารไม่เจอ?</p>
              <p className="text-center text-sm text-ink-muted">ค้นหาด้วยชื่อ รหัสตัวชี้วัด หรือโครงการ</p>
              <Link href="/evidence" className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full bg-white font-semibold text-pink-700 shadow-soft hover:bg-pink-100">
                <Search className="size-4" aria-hidden /> ค้นหาหลักฐาน
              </Link>
            </div>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
