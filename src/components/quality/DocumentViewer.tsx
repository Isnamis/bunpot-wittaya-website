import Image from "next/image";
import { Download, ExternalLink, FileX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EvidenceDocument } from "@/lib/types";

export function DocumentViewer({ doc }: { doc: EvidenceDocument }) {
  if (!doc.fileUrl) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-line bg-card p-8 text-center">
        <FileX2 className="size-10 text-ink-muted" aria-hidden />
        <p className="text-lg font-semibold">ยังไม่มีไฟล์หลักฐาน</p>
        <p className="max-w-[48ch] text-ink-muted">รายการนี้เป็นโครงร่าง — เมื่อโรงเรียนอัปโหลดไฟล์จริง ตัวอย่างเอกสาร (PDF preview) จะแสดงที่นี่ พร้อมปุ่มเปิดดูและดาวน์โหลด</p>
        <div className="mt-2 flex gap-2">
          <Button variant="secondary" disabled><ExternalLink aria-hidden /> เปิดดู</Button>
          <Button disabled><Download aria-hidden /> ดาวน์โหลด</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-card shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line p-3">
        <p className="px-2 font-medium">ตัวอย่างเอกสาร</p>
        <div className="flex gap-2">
          <Button asChild variant="secondary" size="sm"><a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden /> เปิดดู</a></Button>
          <Button asChild size="sm"><a href={doc.fileUrl} download><Download aria-hidden /> ดาวน์โหลด</a></Button>
        </div>
      </div>
      {doc.fileType === "pdf" ? (
        <iframe src={`${doc.fileUrl}#view=FitH`} title={`ตัวอย่างเอกสาร: ${doc.title}`} className="h-[70vh] w-full bg-page" />
      ) : doc.fileType === "image" ? (
        <div className="relative aspect-[4/3]"><Image src={doc.fileUrl} alt={doc.title} fill className="object-contain" /></div>
      ) : (
        <p className="p-6"><a className="text-purple-700 underline" href={doc.fileUrl}>{doc.fileUrl}</a></p>
      )}
    </div>
  );
}
