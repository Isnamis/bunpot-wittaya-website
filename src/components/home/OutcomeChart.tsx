"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Inbox } from "lucide-react";

/** Renders only real data. With no confirmed data it shows an honest empty state. */
export function OutcomeChart({ data }: { data: { name: string; value: number }[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full min-h-56 flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-line bg-page p-6 text-center">
        <Inbox className="size-8 text-ink-muted" aria-hidden />
        <p className="font-medium">ยังไม่มีข้อมูลที่ยืนยันแล้ว</p>
        <p className="max-w-[36ch] text-sm text-ink-muted">กราฟจะแสดงอัตโนมัติเมื่อโรงเรียนเพิ่มข้อมูลผลลัพธ์ผู้เรียนในระบบ</p>
      </div>
    );
  }
  return (
    <div className="h-64" role="img" aria-label={`กราฟผลลัพธ์ผู้เรียน: ${data.map((d) => `${d.name} ${d.value}`).join(", ")}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#ebe2d4" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b6577" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#6b6577" }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: "#eeeaf7" }} contentStyle={{ borderRadius: 12, border: "1px solid #ebe2d4" }} />
          <Bar dataKey="value" fill="#7a5fa8" radius={[10, 10, 4, 4]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
