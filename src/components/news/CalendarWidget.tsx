"use client";
import { useEffect, useMemo, useState } from "react";
import { CalendarHeart, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DOW = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];

/** School calendar (reference: calendar widget). Events come from data; none are published yet. */
export function CalendarWidget({ eventDates = [] }: { eventDates?: string[] }) {
  const [today, setToday] = useState<Date | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => setToday(new Date()), []);

  const view = useMemo(() => {
    if (!today) return null;
    const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // Monday first
    return { first, days, lead };
  }, [today, offset]);

  return (
    <div className="rounded-[28px] border border-line bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={() => setOffset((o) => o - 1)} className="grid size-11 place-items-center rounded-full hover:bg-lavender-100" aria-label="เดือนก่อนหน้า">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <p className="font-semibold" aria-live="polite">
          {view ? view.first.toLocaleDateString("th-TH", { month: "long", year: "numeric" }) : "ปฏิทินโรงเรียน"}
        </p>
        <button type="button" onClick={() => setOffset((o) => o + 1)} className="grid size-11 place-items-center rounded-full hover:bg-lavender-100" aria-label="เดือนถัดไป">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-7 text-center text-[13px]" aria-hidden={false}>
        {DOW.map((d, i) => (
          <span key={d} className={cn("py-1 font-medium text-ink-muted", i >= 5 && "text-pink-700")}>{d}</span>
        ))}
        {view &&
          Array.from({ length: view.lead + view.days }).map((_, i) => {
            const day = i - view.lead + 1;
            if (day < 1) return <span key={i} />;
            const date = new Date(view.first.getFullYear(), view.first.getMonth(), day);
            const isToday = today && date.toDateString() === today.toDateString();
            const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const hasEvent = eventDates.includes(iso);
            const weekend = (i % 7) >= 5;
            return (
              <span key={i} className="grid place-items-center py-0.5">
                <span
                  className={cn(
                    "relative grid size-9 place-items-center rounded-full text-sm",
                    isToday && "bg-purple-600 font-semibold text-white shadow-[0_6px_14px_-4px_rgba(122,95,168,.6)]",
                    !isToday && weekend && "text-pink-700",
                  )}
                  aria-current={isToday ? "date" : undefined}
                >
                  {day}
                  {hasEvent && <span className="absolute bottom-1 size-1 rounded-full bg-yellow-700" />}
                </span>
              </span>
            );
          })}
      </div>
      <div className="mt-3 flex items-start gap-3 rounded-2xl bg-pink-100 p-3">
        <CalendarHeart className="mt-0.5 size-5 shrink-0 text-pink-700" aria-hidden />
        <p className="text-sm">
          <span className="font-semibold">กิจกรรมเดือนนี้</span>
          <br />
          <span className="text-ink-muted">{eventDates.length ? `${eventDates.length} กิจกรรม` : "ยังไม่มีกิจกรรมที่โรงเรียนประกาศ"}</span>
        </p>
      </div>
    </div>
  );
}
