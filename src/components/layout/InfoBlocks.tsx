import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { IndicatorChip } from "@/components/ui/badge";
import { Pending } from "@/components/ui/pending";
import { Container } from "./Section";

/** A titled content block that shows its value or the pending marker. */
export function InfoBlock({ title, children, value, indicatorCodes }: { title: string; children?: ReactNode; value?: string | string[] | null; indicatorCodes?: string[] }) {
  const body =
    children ??
    (value === null || value === undefined ? (
      <Pending />
    ) : Array.isArray(value) ? (
      <ul className="list-disc space-y-1 pl-5">{value.map((v) => <li key={v}>{v}</li>)}</ul>
    ) : (
      <p>{value}</p>
    ));
  return (
    <section className="rounded-[var(--radius-md)] border border-line bg-card p-6 shadow-soft">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {indicatorCodes?.map((c) => <IndicatorChip key={c} code={c} />)}
      </div>
      <div className="text-[16px]">{body}</div>
    </section>
  );
}

export function SubNav({ links }: { links: { href: string; label: string; desc?: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="group flex h-full items-start justify-between gap-3 rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
            <span>
              <span className="block text-lg font-semibold">{l.label}</span>
              {l.desc && <span className="mt-1 block text-[15px] text-ink-muted">{l.desc}</span>}
            </span>
            <ArrowRight className="mt-1 size-5 shrink-0 text-purple-700 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return <Container className="space-y-6 py-10 md:py-14">{children}</Container>;
}
