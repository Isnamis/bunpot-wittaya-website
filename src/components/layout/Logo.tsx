import Image from "next/image";
import { getSchool } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Real logo when provided; otherwise a temporary monogram (clearly not the official emblem). */
export function Logo({ size = 44, className }: { size?: number; className?: string }) {
  const school = getSchool();
  if (school.logo) {
    return <Image src={school.logo.url} alt={school.logo.alt} width={size} height={size} className={cn("rounded-full", className)} />;
  }
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center rounded-full bg-purple-600 font-bold text-white shadow-soft", className)}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      title="ตราสัญลักษณ์ชั่วคราว — รอตราโรงเรียนจริง"
      aria-hidden
    >
      {school.shortName}
    </span>
  );
}
