import type { Indicator, Standard } from "@/lib/types";

/**
 * External quality assessment framework — ONESQA (สมศ.) round 5, basic education:
 * 3 standards, 16 indicators. Titles copied verbatim as published by schools
 * implementing the framework. Verify against the official ONESQA handbook before launch.
 *
 * Indicator content fields (goal, approach, results, studentOutcomes, gallery)
 * are the school's own and stay null until provided.
 */
export const standards: Standard[] = [
  {
    id: 1,
    code: "01",
    slug: "standard-1",
    title: "ผลลัพธ์ของการเรียนรู้",
    description: "สมรรถนะของผู้เรียนตามหลักสูตร คุณลักษณะที่พึงประสงค์ และความสามารถในการนำตนเองในการเรียนรู้",
    tone: "lavender",
  },
  {
    id: 2,
    code: "02",
    slug: "standard-2",
    title: "การพัฒนาคุณภาพการบริหารจัดการสถานศึกษา",
    description: "วิสัยทัศน์ แผนงาน ภาวะผู้นำ การพัฒนาครู การนิเทศ เทคโนโลยี สภาพแวดล้อม การดูแลผู้เรียน และเครือข่ายความร่วมมือ",
    tone: "blue",
  },
  {
    id: 3,
    code: "03",
    slug: "standard-3",
    title: "การพัฒนาคุณภาพการจัดการเรียนรู้",
    description: "การออกแบบหลักสูตรและแผนการจัดการเรียนรู้ การจัดกิจกรรมการเรียนรู้ และการวัดและประเมินผลอย่างเป็นระบบ",
    tone: "green",
  },
];

const blank = { goal: null, approach: null, results: null, studentOutcomes: null, gallery: [] };

export const indicators: Indicator[] = [
  { code: "1.1", standardId: 1, title: "ผู้เรียนมีสมรรถนะตามหลักสูตรสถานศึกษา", ...blank },
  { code: "1.2", standardId: 1, title: "ผู้เรียนมีคุณลักษณะที่พึงประสงค์ตามหลักสูตรสถานศึกษา", ...blank },
  { code: "1.3", standardId: 1, title: "ผู้เรียนสามารถนำตนเองในการเรียนรู้", ...blank },
  { code: "2.1", standardId: 2, title: "วิสัยทัศน์ พันธกิจ และค่านิยมของสถานศึกษา", ...blank },
  { code: "2.2", standardId: 2, title: "นโยบาย ทิศทาง กลยุทธ์และแผนงานสอดคล้องกับวิสัยทัศน์และพันธกิจ", ...blank },
  { code: "2.3", standardId: 2, title: "ผู้บริหารสถานศึกษามีภาวะผู้นำทางวิชาการและบริหารจัดการด้วยหลักธรรมาภิบาล", ...blank },
  { code: "2.4", standardId: 2, title: "แผนงานและการดำเนินงานด้านการพัฒนาครูและบุคลากรทางการศึกษา", ...blank },
  { code: "2.5", standardId: 2, title: "กระบวนการนิเทศการปฏิบัติงานของครูและบุคลากรทางการศึกษาอย่างเป็นระบบ", ...blank },
  { code: "2.6", standardId: 2, title: "การใช้สื่อ อุปกรณ์ ระบบเทคโนโลยีเพื่อสนับสนุนการจัดการศึกษา", ...blank },
  { code: "2.7", standardId: 2, title: "การจัดสภาพแวดล้อม อาคารสถานที่ ปลอดภัยและถูกสุขลักษณะ", ...blank },
  { code: "2.8", standardId: 2, title: "สวัสดิการ สวัสดิภาพ แนวทางการป้องกันโรค อุบัติภัย ภัยพิบัติ", ...blank },
  { code: "2.9", standardId: 2, title: "ระบบและกระบวนการช่วยเหลือผู้เรียน", ...blank },
  {
    code: "2.10",
    standardId: 2,
    title: "การเสริมสร้างเครือข่ายผู้ปกครอง องค์กร และชุมชน เพื่อความร่วมมือในการสนับสนุนการจัดการเรียนรู้และพัฒนาผู้เรียน",
    ...blank,
  },
  {
    code: "3.1",
    standardId: 3,
    title: "การออกแบบหลักสูตรและแผนการจัดการเรียนรู้ที่เสริมสร้างสมรรถนะและคุณลักษณะที่พึงประสงค์",
    ...blank,
  },
  { code: "3.2", standardId: 3, title: "การจัดกิจกรรมการเรียนรู้ที่เสริมสร้างสมรรถนะและคุณลักษณะที่พึงประสงค์", ...blank },
  { code: "3.3", standardId: 3, title: "ครูวัดและประเมินผลการเรียนรู้ของผู้เรียนอย่างเป็นระบบและต่อเนื่อง", ...blank },
];
