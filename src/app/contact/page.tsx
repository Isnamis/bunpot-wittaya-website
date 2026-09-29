import type { Metadata } from "next";
import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageBody } from "@/components/layout/InfoBlocks";
import { IconTile } from "@/components/ui/icon";
import { ImagePlaceholder, PendingValue } from "@/components/ui/pending";
import { getSchool } from "@/lib/data";

export const metadata: Metadata = { title: "ติดต่อโรงเรียน", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  const s = getSchool();
  const items = [
    { label: "ที่อยู่", v: s.address, icon: MapPin, tone: "lavender" as const },
    { label: "โทรศัพท์", v: s.phone, icon: Phone, tone: "blue" as const, href: s.phone ? `tel:${s.phone}` : null },
    { label: "อีเมล", v: s.email, icon: Mail, tone: "pink" as const, href: s.email ? `mailto:${s.email}` : null },
    { label: "Facebook", v: s.facebook, icon: Globe, tone: "green" as const, href: s.facebook },
    { label: "เวลาทำการ", v: s.officeHours, icon: Clock, tone: "yellow" as const },
  ];
  return (
    <>
      <PageHeader title="ติดต่อโรงเรียน" crumbs={[{ href: "/contact", label: "ติดต่อโรงเรียน" }]} />
      <PageBody>
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.label} className="flex items-start gap-4 rounded-[var(--radius-md)] border border-line bg-card p-5 shadow-soft">
                <IconTile icon={it.icon} tone={it.tone} className="size-11" />
                <div>
                  <p className="font-semibold">{it.label}</p>
                  <PendingValue value={it.v} render={(v) => (it.href ? <a className="text-purple-700 underline" href={it.href}>{v}</a> : <span>{v}</span>)} />
                </div>
              </li>
            ))}
          </ul>
          {s.mapEmbedUrl ? (
            <iframe src={s.mapEmbedUrl} title="แผนที่โรงเรียนบรรพตวิทยา" className="min-h-80 w-full rounded-[var(--radius-lg)] border border-line" loading="lazy" />
          ) : (
            <ImagePlaceholder label="แผนที่ Google Maps ของโรงเรียน" className="min-h-80 rounded-[var(--radius-lg)]" />
          )}
        </div>
      </PageBody>
    </>
  );
}
