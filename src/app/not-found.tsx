import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-6xl font-bold text-lavender-300">404</p>
      <h1 className="text-2xl font-bold">ไม่พบหน้าที่ต้องการ</h1>
      <p className="text-ink-muted">หน้านี้อาจถูกย้ายหรือยังไม่เผยแพร่</p>
      <Button asChild><Link href="/">กลับหน้าหลัก</Link></Button>
    </div>
  );
}
