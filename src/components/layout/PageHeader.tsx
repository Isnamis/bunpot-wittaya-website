import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "./Section";

export function PageHeader({
  title, lead, crumbs = [], eyebrow, children,
}: { title: string; lead?: ReactNode; crumbs?: { href: string; label: string }[]; eyebrow?: ReactNode; children?: ReactNode }) {
  const all = [{ href: "/", label: "หน้าหลัก" }, ...crumbs];
  return (
    <div className="relative overflow-hidden border-b border-line bg-card">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-lavender-100" />
      <div aria-hidden className="pointer-events-none absolute right-40 top-20 size-24 rounded-full bg-pink-100" />
      <Container className="relative py-10 md:py-14">
        <nav aria-label="เส้นทางนำทาง" className="mb-4 text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-1">
            {all.map((c, i) => (
              <li key={c.href + i} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden>/</span>}
                <Link href={c.href} className="rounded underline-offset-4 hover:text-purple-700 hover:underline">{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <div className="mb-3">{eyebrow}</div>}
        <h1 className="max-w-[24ch] text-[30px] font-bold md:text-[44px]">{title}</h1>
        {lead && <div className="mt-3 max-w-[68ch] text-base text-ink-muted md:text-lg">{lead}</div>}
        {children}
      </Container>
    </div>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-purple-700 hover:underline">
      <ChevronLeft className="size-4" aria-hidden /> {label}
    </Link>
  );
}
