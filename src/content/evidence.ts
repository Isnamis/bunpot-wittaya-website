import type { EvidenceCategory, EvidenceDocument, EvidenceType, Project } from "@/lib/types";

/**
 * EVIDENCE SLOTS — not real documents.
 * Each record is a structural slot naming a *kind* of evidence commonly used for an
 * indicator, so the Evidence Center, filters and indicator pages work end-to-end.
 * They are flagged `isSample: true`, have no file, and are excluded from all counts.
 * Replace each slot with the school's real document (set fileUrl, publishedAt,
 * description and remove isSample) — or delete it.
 */
type Slot = [code: string[], title: string, type: EvidenceType, category: EvidenceCategory, projectId?: string];

const YEAR = 2569;

const slots: Slot[] = [
  [["1.1"], "รายงานผลการประเมินสมรรถนะผู้เรียน", "evaluation", "outcome"],
  [["1.1"], "รายงานผลสัมฤทธิ์ทางการเรียน", "report", "data"],
  [["1.2"], "ผลการประเมินคุณลักษณะอันพึงประสงค์", "evaluation", "outcome"],
  [["1.3"], "ผลงานการเรียนรู้ด้วยตนเองของผู้เรียน", "student-work", "outcome"],
  [["2.1"], "ประกาศวิสัยทัศน์ พันธกิจ และค่านิยมของสถานศึกษา", "announcement", "document"],
  [["2.1", "2.2"], "แผนพัฒนาคุณภาพการศึกษา", "plan", "document"],
  [["2.2"], "แผนปฏิบัติการประจำปี", "plan", "document"],
  [["2.3"], "รายงานการประชุมคณะกรรมการสถานศึกษาขั้นพื้นฐาน", "minutes", "document"],
  [["2.4"], "แผนพัฒนาครูและบุคลากรทางการศึกษา", "plan", "document"],
  [["2.5"], "บันทึกการนิเทศการจัดการเรียนการสอน", "report", "document"],
  [["2.6"], "ทะเบียนสื่อ อุปกรณ์ และระบบเทคโนโลยีเพื่อการเรียนรู้", "other", "data"],
  [["2.7"], "ภาพสภาพแวดล้อมและอาคารสถานที่", "photo", "media"],
  [["2.8"], "แผนป้องกันและรับมือภัยพิบัติของสถานศึกษา", "plan", "document"],
  [["2.9"], "รายงานระบบดูแลช่วยเหลือนักเรียน", "report", "document"],
  [["2.10"], "บันทึกความร่วมมือกับผู้ปกครองและชุมชน", "minutes", "document"],
  [["3.1"], "หลักสูตรสถานศึกษา", "plan", "document"],
  [["3.1"], "แผนการจัดการเรียนรู้", "plan", "document"],
  [["3.2"], "ภาพการจัดกิจกรรมการเรียนรู้", "photo", "media"],
  [["3.3"], "เครื่องมือวัดและประเมินผลการเรียนรู้", "evaluation", "document"],
  // Evidence for the sample project mapping (STEM Camp — structure from the brief)
  [["1.1", "1.3", "3.2"], "โครงการ STEM Camp", "project", "document", "sample-stem-camp"],
  [["3.2"], "แผนการจัดกิจกรรม STEM Camp", "plan", "document", "sample-stem-camp"],
  [["1.1", "1.3"], "ผลงานนักเรียน STEM Camp", "student-work", "outcome", "sample-stem-camp"],
  [["3.2"], "ภาพกิจกรรม STEM Camp", "photo", "media", "sample-stem-camp"],
  [["1.1", "3.2"], "ผลการประเมินกิจกรรม STEM Camp", "evaluation", "data", "sample-stem-camp"],
  [["1.1", "1.3", "3.2"], "รายงานผลโครงการ STEM Camp", "report", "document", "sample-stem-camp"],
];

export const evidenceDocuments: EvidenceDocument[] = slots.map(([codes, title, type, category, projectId], i) => ({
  id: `slot-${String(i + 1).padStart(3, "0")}`,
  title,
  description: "โครงร่างรายการหลักฐาน — ไฟล์และรายละเอียดรอการยืนยันจากโรงเรียน",
  indicatorCodes: codes,
  academicYear: YEAR,
  type,
  category,
  projectId,
  fileUrl: null,
  fileType: type === "photo" ? "image" : "pdf",
  publishedAt: null,
  isSample: true,
}));

export const projects: Project[] = [
  {
    id: "sample-stem-camp",
    title: "STEM Camp",
    academicYear: YEAR,
    summary: null,
    indicatorCodes: ["1.1", "1.3", "3.2"],
    flow: { activity: null, process: null, outcome: null },
    evidenceIds: evidenceDocuments.filter((d) => d.projectId === "sample-stem-camp").map((d) => d.id),
    isSample: true,
  },
];

export const evidenceTypeLabels: Record<EvidenceType, string> = {
  plan: "แผนงาน / หลักสูตร",
  report: "รายงาน",
  order: "คำสั่ง",
  project: "โครงการ",
  "student-work": "ผลงานนักเรียน",
  photo: "ภาพถ่าย",
  evaluation: "ผลการประเมิน",
  minutes: "บันทึก / รายงานการประชุม",
  announcement: "ประกาศ",
  other: "อื่น ๆ",
};

export const evidenceCategoryLabels: Record<EvidenceCategory, string> = {
  document: "เอกสาร",
  media: "ภาพและสื่อ",
  data: "ข้อมูลสถิติ",
  outcome: "ผลลัพธ์ผู้เรียน",
};
