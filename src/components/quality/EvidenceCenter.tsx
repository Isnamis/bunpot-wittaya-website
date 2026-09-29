"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Filter, Search, X } from "lucide-react";
import { evidenceCategoryLabels, evidenceTypeLabels } from "@/content/evidence";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EvidenceDocument, Indicator, Project, Standard } from "@/lib/types";
import { EvidenceCard } from "./EvidenceCard";

type Props = { docs: EvidenceDocument[]; standards: Standard[]; indicators: Indicator[]; projects: Project[] };

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

function Select({ label, value, onChange, children, id }: { label: string; value: string; onChange: (v: string) => void; children: ReactNode; id: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full rounded-xl border border-line bg-card px-3 text-[15px] text-ink focus-visible:outline-3 focus-visible:outline-purple-600"
      >
        {children}
      </select>
    </div>
  );
}

export function EvidenceCenter({ docs, standards, indicators, projects }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  // Filter state mirrors the URL query (?q=&s=&i=&y=&t=&p=&c=) so filtered views can be shared.
  // Read on mount (not useSearchParams) so the full list is pre-rendered as static HTML.
  const [params, setParams] = useState<URLSearchParams>(() => new URLSearchParams());
  const [q, setQ] = useState("");
  useEffect(() => {
    const read = () => setParams(new URLSearchParams(window.location.search));
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  useEffect(() => setQ(params.get("q") ?? ""), [params]);

  const get = (k: string) => params.get(k) ?? "";
  const s = get("s"), i = get("i"), y = get("y"), t = get("t"), p = get("p"), c = get("c");

  const commit = (next: URLSearchParams) => {
    setParams(next);
    const qs = next.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  };
  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    if ("s" in patch && patch.s && i && !i.startsWith(`${patch.s}.`)) next.delete("i");
    commit(next);
  };
  const clearAll = () => { setQ(""); commit(new URLSearchParams()); };

  const years = useMemo(() => Array.from(new Set(docs.map((d) => d.academicYear))).sort((a, b) => b - a), [docs]);
  const indicatorOptions = s ? indicators.filter((x) => String(x.standardId) === s) : indicators;

  const results = useMemo(() => {
    const nq = norm(get("q"));
    return docs.filter((d) => {
      if (nq) {
        const proj = projects.find((x) => x.id === d.projectId)?.title ?? "";
        const hay = norm([d.title, d.description, proj, ...d.indicatorCodes, evidenceTypeLabels[d.type]].join(" "));
        if (!hay.includes(nq)) return false;
      }
      if (s && !d.indicatorCodes.some((code) => code.startsWith(`${s}.`))) return false;
      if (i && !d.indicatorCodes.includes(i)) return false;
      if (y && String(d.academicYear) !== y) return false;
      if (t && d.type !== t) return false;
      if (p && d.projectId !== p) return false;
      if (c && d.category !== c) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docs, projects, params]);

  const active = [s, i, y, t, p, c].filter(Boolean).length + (get("q") ? 1 : 0);

  const filters = (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
      <Select id="f-s" label="มาตรฐาน" value={s} onChange={(v) => update({ s: v })}>
        <option value="">ทุกมาตรฐาน</option>
        {standards.map((x) => <option key={x.id} value={x.id}>มาตรฐานที่ {x.id} {x.title}</option>)}
      </Select>
      <Select id="f-i" label="ตัวชี้วัด" value={i} onChange={(v) => update({ i: v })}>
        <option value="">ทุกตัวชี้วัด</option>
        {indicatorOptions.map((x) => <option key={x.code} value={x.code}>{x.code} {x.title}</option>)}
      </Select>
      <Select id="f-y" label="ปีการศึกษา" value={y} onChange={(v) => update({ y: v })}>
        <option value="">ทุกปีการศึกษา</option>
        {years.map((x) => <option key={x} value={x}>{x}</option>)}
      </Select>
      <Select id="f-t" label="ประเภทเอกสาร" value={t} onChange={(v) => update({ t: v })}>
        <option value="">ทุกประเภท</option>
        {Object.entries(evidenceTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </Select>
      <Select id="f-p" label="โครงการ" value={p} onChange={(v) => update({ p: v })}>
        <option value="">ทุกโครงการ</option>
        {projects.map((x) => <option key={x.id} value={x.id}>{x.title}{x.isSample ? " (ตัวอย่าง)" : ""}</option>)}
      </Select>
      <Select id="f-c" label="หมวดหลักฐาน" value={c} onChange={(v) => update({ c: v })}>
        <option value="">ทุกหมวด</option>
        {Object.entries(evidenceCategoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </Select>
      {active > 0 && (
        <Button variant="ghost" onClick={clearAll}>
          <X aria-hidden /> ล้างตัวกรองทั้งหมด
        </Button>
      )}
    </div>
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[272px_1fr] xl:gap-8">
      <aside aria-label="ตัวกรองหลักฐาน" className="xl:sticky xl:top-24 xl:self-start">
        <Button variant="secondary" className="w-full xl:hidden" aria-expanded={showFilters} aria-controls="evidence-filters" onClick={() => setShowFilters((v) => !v)}>
          <Filter aria-hidden /> ตัวกรอง {active > 0 && <span className="rounded-full bg-purple-600 px-2 text-xs text-white">{active}</span>}
        </Button>
        <div id="evidence-filters" className={cn("mt-4 rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft xl:mt-0 xl:block", !showFilters && "hidden")}>
          <p className="mb-4 font-semibold">กรองหลักฐาน</p>
          {filters}
        </div>
      </aside>

      <div>
        <form
          role="search"
          onSubmit={(e) => { e.preventDefault(); update({ q: q.trim() }); }}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <label className="flex min-h-12 flex-1 items-center gap-2 rounded-full border border-line bg-card px-5 shadow-inset">
            <Search className="size-5 text-ink-muted" aria-hidden />
            <span className="sr-only">ค้นหาหลักฐาน</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหา เช่น แผนพัฒนาคุณภาพการศึกษา"
              className="w-full bg-transparent text-base outline-none placeholder:text-ink-muted"
            />
          </label>
          <Button type="submit" size="lg">ค้นหา</Button>
        </form>

        <p className="mt-5 text-[15px]" aria-live="polite">
          พบ <strong>{results.length}</strong> รายการ
          {get("q") && <> สำหรับ “{get("q")}”</>}
        </p>

        {results.length === 0 ? (
          <div className="mt-4 rounded-[var(--radius-md)] border border-dashed border-line bg-card p-10 text-center">
            <p className="font-semibold">ไม่พบหลักฐานที่ตรงกับเงื่อนไข</p>
            <p className="mt-1 text-ink-muted">ลองใช้คำค้นอื่น หรือล้างตัวกรอง</p>
            <Button className="mt-4" variant="secondary" onClick={clearAll}>ล้างตัวกรอง</Button>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {results.map((d) => (
              <li
                key={d.id}
                data-ev=""
                data-s={Array.from(new Set(d.indicatorCodes.map((c) => c.split(".")[0]))).join(" ")}
                data-i={d.indicatorCodes.join(" ")}
                data-y={d.academicYear}
                data-t={d.type}
                data-p={d.projectId ?? ""}
                data-c={d.category}
                data-q={[d.title, d.description, projects.find((x) => x.id === d.projectId)?.title ?? "", ...d.indicatorCodes, evidenceTypeLabels[d.type]].join(" ")}
              >
                <EvidenceCard doc={d} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
