import Link from "next/link";
import type { ReactNode } from "react";
import { ClayCloud } from "@/components/illustrations/Clay";

/** Page header inside the quality portal — a rounded banner card instead of a full-bleed band. */
export function PortalHeader({
  title, lead, crumbs = [], eyebrow, children, aside,
}: { title: string; lead?: ReactNode; crumbs?: { href: string; label: string }[]; eyebrow?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  const all = [{ href: "/", label: "หน้าหลัก" }, ...crumbs];
  return (
    <div className="relative mb-6 overflow-hidden rounded-[32px] border border-white bg-[linear-gradient(135deg,#fffdf9_0%,#f4f0fa_100%)] p-6 shadow-soft md:p-8">
      <ClayCloud className="absolute -right-4 -top-2 hidden w-36 opacity-80 md:block" />
      <nav aria-label="เส้นทางนำทาง" className="relative mb-3 text-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => (
            <li key={c.href + i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden>/</span>}
              <Link href={c.href} className="rounded underline-offset-4 hover:text-purple-700 hover:underline">{c.label}</Link>
            </li>
          ))}
        </ol>
      </nav>
      <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[68ch]">
          {eyebrow && <div className="mb-2">{eyebrow}</div>}
          <h1 className="text-[28px] font-bold md:text-[38px]">{title}</h1>
          {lead && <div className="mt-2 text-base text-ink-muted md:text-lg">{lead}</div>}
        </div>
        {aside}
      </div>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}
