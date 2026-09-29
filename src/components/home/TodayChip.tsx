"use client";
import { useEffect, useState } from "react";
import { CloudSun, Moon, Sun } from "lucide-react";

/** Friendly greeting + today's date (Thai, พ.ศ.) — adapts the references' "Good morning" header. */
export function TodayChip() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  if (!now) return <span className="inline-block h-8 w-56 rounded-full bg-white/50" aria-hidden />;
  const h = now.getHours();
  const [greet, Icon] = h < 12 ? ["สวัสดีตอนเช้า", Sun] : h < 17 ? ["สวัสดีตอนบ่าย", CloudSun] : ["สวัสดีตอนเย็น", Moon];
  const date = now.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded-full bg-white/70 px-3 text-[13px] text-ink">
      <Icon className="size-4 text-yellow-700" aria-hidden />
      <span className="font-semibold">{greet}</span>
      <span className="text-ink-muted">· {date}</span>
    </span>
  );
}
