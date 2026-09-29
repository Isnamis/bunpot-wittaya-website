import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getSchool } from "@/lib/data";
import { PendingValue } from "@/components/ui/pending";
import { Logo } from "./Logo";

const quick = [
  { href: "/about", label: "รู้จักโรงเรียน" },
  { href: "/academic", label: "การจัดการศึกษา" },
  { href: "/students/outcomes", label: "ผลลัพธ์ของผู้เรียน" },
  { href: "/news", label: "ข่าวสารและกิจกรรม" },
];
const quality = [
  { href: "/quality", label: "แดชบอร์ดคุณภาพการศึกษา" },
  { href: "/quality/standard-1", label: "มาตรฐานที่ 1" },
  { href: "/quality/standard-2", label: "มาตรฐานที่ 2" },
  { href: "/quality/standard-3", label: "มาตรฐานที่ 3" },
  { href: "/evidence", label: "ศูนย์หลักฐานดิจิทัล" },
];

export function Footer() {
  const s = getSchool();
  return (
    <footer className="mt-12 bg-cream">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 md:grid-cols-12 md:px-6 md:py-16">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo size={52} />
            <div>
              <p className="text-lg font-bold">{s.nameTh}</p>
              <p className="text-sm text-ink-muted">{s.nameEn}</p>
            </div>
          </div>
          <address className="mt-6 space-y-3 not-italic text-[15px]">
            <p className="flex items-start gap-2"><MapPin className="mt-1 size-5 shrink-0 text-purple-700" aria-label="ที่อยู่" /><PendingValue value={s.address} label="ที่อยู่" /></p>
            <p className="flex items-start gap-2"><Phone className="mt-1 size-5 shrink-0 text-purple-700" aria-label="โทรศัพท์" /><PendingValue value={s.phone} label="เบอร์โทรศัพท์" /></p>
            <p className="flex items-start gap-2"><Mail className="mt-1 size-5 shrink-0 text-purple-700" aria-label="อีเมล" /><PendingValue value={s.email} label="อีเมล" /></p>
          </address>
          <p className="mt-4 text-sm text-ink-muted">สังกัด: <PendingValue value={s.affiliation} label="หน่วยงานต้นสังกัด" /></p>
        </div>
        <nav aria-label="ลิงก์ด่วน" className="md:col-span-3">
          <h2 className="mb-3 font-semibold">ลิงก์ด่วน</h2>
          <ul className="space-y-1">
            {quick.map((l) => (
              <li key={l.href}><Link className="inline-flex min-h-10 items-center hover:text-purple-700 hover:underline" href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="คุณภาพการศึกษา" className="md:col-span-4">
          <h2 className="mb-3 font-semibold">คุณภาพการศึกษา</h2>
          <ul className="space-y-1">
            {quality.map((l) => (
              <li key={l.href}><Link className="inline-flex min-h-10 items-center hover:text-purple-700 hover:underline" href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line/80">
        <p className="mx-auto max-w-[1200px] px-4 py-5 text-sm text-ink-muted md:px-6">
          © {s.nameTh} · ข้อมูลที่มีเครื่องหมาย [รอการยืนยัน] อยู่ระหว่างการตรวจสอบโดยโรงเรียน
        </p>
      </div>
    </footer>
  );
}
