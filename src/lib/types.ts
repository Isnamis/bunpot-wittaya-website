/**
 * Data model for the Bunpot Wittaya School website.
 * Every field the school has not yet confirmed is `null` (Pending<T>) and is
 * rendered as the placeholder "[ข้อมูลรอการยืนยันจากโรงเรียน]" by <Pending />.
 * Never replace a null with an invented value.
 */
export type Pending<T> = T | null;

export type StandardId = 1 | 2 | 3;
export type IndicatorCode = string; // "1.1" … "2.10"
export type AcademicYear = number; // Buddhist Era, e.g. 2569
export type Tone = "lavender" | "blue" | "green" | "pink" | "yellow";

export interface MediaAsset {
  url: string;
  alt: string;
  credit?: string;
}

export interface SchoolIdentity {
  vision: Pending<string>;
  mission: Pending<string[]>;
  identity: Pending<string>; // อัตลักษณ์
  uniqueness: Pending<string>; // เอกลักษณ์
  values: Pending<string>; // ค่านิยม
  philosophy: Pending<string>; // ปรัชญา
  focus: Pending<string[]>; // จุดเน้น
  motto: Pending<string>;
}

export interface School {
  nameTh: string;
  nameEn: string;
  shortName: string;
  logo: Pending<MediaAsset>;
  positioning: Pending<string>;
  description: Pending<string>;
  heroImage: Pending<MediaAsset>;
  founded: Pending<AcademicYear>;
  students: Pending<number>;
  staff: Pending<number>;
  levels: Pending<string>;
  areaRai: Pending<number>;
  serviceArea: Pending<string>;
  affiliation: Pending<string>;
  history: Pending<string[]>;
  address: Pending<string>;
  province: Pending<string>;
  phone: Pending<string>;
  email: Pending<string>;
  facebook: Pending<string>;
  mapEmbedUrl: Pending<string>;
  officeHours: Pending<string>;
  siteUrl: string;
  identity: SchoolIdentity;
}

export interface Standard {
  id: StandardId;
  code: "01" | "02" | "03";
  slug: `standard-${StandardId}`;
  title: string;
  description: string;
  tone: Tone;
}

export interface Indicator {
  code: IndicatorCode;
  standardId: StandardId;
  title: string;
  goal: Pending<string>;
  approach: Pending<string[]>;
  results: Pending<string>;
  studentOutcomes: Pending<string>;
  gallery: MediaAsset[];
}

export type EvidenceType =
  | "plan"
  | "report"
  | "order"
  | "project"
  | "student-work"
  | "photo"
  | "evaluation"
  | "minutes"
  | "announcement"
  | "other";

export type EvidenceCategory = "document" | "media" | "data" | "outcome";

export interface EvidenceDocument {
  id: string;
  title: string;
  description: string;
  indicatorCodes: IndicatorCode[];
  academicYear: AcademicYear;
  type: EvidenceType;
  category: EvidenceCategory;
  projectId?: string;
  fileUrl: Pending<string>;
  fileType: "pdf" | "image" | "video" | "link";
  fileSizeKb?: number;
  publishedAt: Pending<string>;
  /** true = structural slot / example, NOT a real school document */
  isSample?: boolean;
}

export interface Project {
  id: string;
  title: string;
  academicYear: AcademicYear;
  summary: Pending<string>;
  indicatorCodes: IndicatorCode[];
  flow: {
    activity: Pending<string>;
    process: Pending<string>;
    outcome: Pending<string>;
  };
  evidenceIds: string[];
  isSample?: boolean;
}

export type NewsCategory = "pr" | "academic" | "students" | "staff" | "community" | "awards" | "activities";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  title: Pending<string>;
  excerpt: Pending<string>;
  date: Pending<string>;
  thumbnail: Pending<MediaAsset>;
  indicatorCodes?: IndicatorCode[];
  isSample?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  level: "school" | "district" | "province" | "region" | "national" | "international";
  date: string;
  recipients: string;
  evidenceId?: string;
  indicatorCodes: IndicatorCode[];
}

export interface OutcomeMetric {
  key: string;
  label: string;
  description: string;
  unit?: string;
  value: Pending<number>;
  year: Pending<AcademicYear>;
  indicatorCode?: IndicatorCode;
  icon: string;
  tone: Tone;
}

export type GalleryGroup =
  | "buildings"
  | "classrooms"
  | "labs"
  | "library"
  | "learning-spaces"
  | "nature"
  | "community"
  | "culture";

export interface GalleryItem {
  id: string;
  group: GalleryGroup;
  label: string;
  image: Pending<MediaAsset>;
}

export interface AcademicPillar {
  key: string;
  title: string;
  subtitle: string;
  concept: string;
  schoolDetail: Pending<string>;
  icon: string;
  tone: Tone;
  href: string;
  indicatorCodes: IndicatorCode[];
}
