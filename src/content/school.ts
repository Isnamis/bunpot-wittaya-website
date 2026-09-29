import type { School } from "@/lib/types";

/**
 * School profile. ONLY the school name was provided in the brief.
 * Every other value is null until the school confirms it.
 * To publish a value: replace `null` with the confirmed data (and keep a source note).
 */
export const school: School = {
  nameTh: "โรงเรียนบรรพตวิทยา",
  nameEn: "Bunpot Wittaya School",
  shortName: "บว",
  logo: null, // e.g. { url: "/images/logo.png", alt: "ตราสัญลักษณ์โรงเรียนบรรพตวิทยา" }
  positioning: null,
  description: null,
  heroImage: null, // real school photo only
  founded: null,
  students: null,
  staff: null,
  levels: null,
  areaRai: null,
  serviceArea: null,
  affiliation: null,
  history: null,
  address: null,
  province: null,
  phone: null,
  email: null,
  facebook: null,
  mapEmbedUrl: null,
  officeHours: null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  identity: {
    vision: null,
    mission: null,
    identity: null,
    uniqueness: null,
    values: null,
    philosophy: null,
    focus: null,
    motto: null,
  },
};
