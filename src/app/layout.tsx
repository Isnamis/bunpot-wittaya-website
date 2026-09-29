import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "@fontsource/noto-sans-thai/400.css";
import "@fontsource/noto-sans-thai/500.css";
import "@fontsource/noto-sans-thai/600.css";
import "@fontsource/noto-sans-thai/700.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSchool } from "@/lib/data";

// Noto Sans Thai is self-hosted via @fontsource (no runtime dependency on Google Fonts).

const school = getSchool();
const description =
  "เว็บไซต์ทางการของโรงเรียนบรรพตวิทยา (Bunpot Wittaya School) — ข้อมูลโรงเรียน การจัดการศึกษา ผลลัพธ์ของผู้เรียน ข่าวสาร และศูนย์หลักฐานคุณภาพการศึกษาตาม 3 มาตรฐาน 16 ตัวชี้วัด";

export const metadata: Metadata = {
  metadataBase: new URL(school.siteUrl),
  title: { default: `${school.nameTh} | ${school.nameEn}`, template: `%s | ${school.nameTh}` },
  description,
  keywords: ["โรงเรียนบรรพตวิทยา", "Bunpot Wittaya School", "บรรพตวิทยา", "ประกันคุณภาพการศึกษา", "สมศ.", "หลักฐานคุณภาพ"],
  applicationName: school.nameTh,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: school.nameTh,
    title: `${school.nameTh} | ${school.nameEn}`,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: school.nameTh, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#faf4ea", width: "device-width", initialScale: 1 };

/** schema.org EducationalOrganization — only confirmed fields are emitted. */
function jsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "HighSchool"],
    name: school.nameTh,
    alternateName: school.nameEn,
    url: school.siteUrl,
  };
  if (school.logo) data.logo = new URL(school.logo.url, school.siteUrl).toString();
  if (school.phone) data.telephone = school.phone;
  if (school.email) data.email = school.email;
  if (school.address) data.address = { "@type": "PostalAddress", streetAddress: school.address, addressRegion: school.province ?? undefined, addressCountry: "TH" };
  if (school.founded) data.foundingDate = String(school.founded - 543);
  if (school.facebook) data.sameAs = [school.facebook];
  return JSON.stringify(data);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-purple-600 focus:px-5 focus:py-3 focus:text-white"
        >
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
        <Navbar />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
