import type { AcademicPillar, GalleryItem, NewsCategory, NewsItem, OutcomeMetric } from "@/lib/types";

export const navItems = [
  { href: "/", label: "หน้าหลัก" },
  {
    href: "/about",
    label: "รู้จักโรงเรียน",
    children: [
      { href: "/about/history", label: "ประวัติโรงเรียน" },
      { href: "/about/vision", label: "วิสัยทัศน์และอัตลักษณ์" },
      { href: "/about/basic-information", label: "ข้อมูลพื้นฐาน" },
    ],
  },
  {
    href: "/academic",
    label: "การจัดการศึกษา",
    children: [
      { href: "/academic/curriculum", label: "หลักสูตรสถานศึกษา" },
      { href: "/academic/learning", label: "การจัดการเรียนรู้" },
      { href: "/academic/innovation", label: "นวัตกรรมการศึกษา" },
    ],
  },
  {
    href: "/students",
    label: "ผลลัพธ์ของผู้เรียน",
    children: [
      { href: "/students/outcomes", label: "ผลลัพธ์ของผู้เรียน" },
      { href: "/students/achievements", label: "ผลงานและรางวัล" },
    ],
  },
  {
    href: "/campus",
    label: "โรงเรียนของเรา",
    children: [
      { href: "/campus", label: "สถานที่และแหล่งเรียนรู้" },
      { href: "/community", label: "ชุมชนและวัฒนธรรม" },
    ],
  },
  {
    href: "/news",
    label: "ข่าวสารและกิจกรรม",
    children: [
      { href: "/news", label: "ข่าวสาร" },
      { href: "/activities", label: "กิจกรรม" },
    ],
  },
  {
    href: "/quality",
    label: "คุณภาพการศึกษา",
    children: [
      { href: "/quality", label: "แดชบอร์ดคุณภาพ" },
      { href: "/quality/standard-1", label: "มาตรฐานที่ 1" },
      { href: "/quality/standard-2", label: "มาตรฐานที่ 2" },
      { href: "/quality/standard-3", label: "มาตรฐานที่ 3" },
      { href: "/evidence", label: "ศูนย์หลักฐานดิจิทัล" },
    ],
  },
  { href: "/contact", label: "ติดต่อโรงเรียน" },
] as const;

export const newsCategories: { key: NewsCategory; label: string; tone: "lavender" | "blue" | "green" | "pink" | "yellow" }[] = [
  { key: "pr", label: "ข่าวประชาสัมพันธ์", tone: "lavender" },
  { key: "academic", label: "วิชาการ", tone: "blue" },
  { key: "students", label: "นักเรียน", tone: "pink" },
  { key: "staff", label: "ครูและบุคลากร", tone: "yellow" },
  { key: "community", label: "ชุมชน", tone: "green" },
  { key: "awards", label: "รางวัล", tone: "pink" },
  { key: "activities", label: "กิจกรรม", tone: "lavender" },
];

/** Layout templates — one per category. No real news has been provided yet. */
export const news: NewsItem[] = newsCategories.map((c) => ({
  id: `template-${c.key}`,
  category: c.key,
  title: null,
  excerpt: null,
  date: null,
  thumbnail: null,
  isSample: true,
}));

/** Concepts are general definitions; the school-specific detail is pending. */
export const academicPillars: AcademicPillar[] = [
  {
    key: "curriculum",
    title: "หลักสูตรสถานศึกษา",
    subtitle: "School Curriculum",
    concept: "หลักสูตรที่โรงเรียนพัฒนาจากหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ให้สอดคล้องกับบริบทของผู้เรียนและชุมชน",
    schoolDetail: null,
    icon: "BookOpen",
    tone: "lavender",
    href: "/academic/curriculum",
    indicatorCodes: ["3.1"],
  },
  {
    key: "learning",
    title: "การจัดการเรียนรู้",
    subtitle: "Learning Management",
    concept: "กระบวนการที่ครูออกแบบกิจกรรมให้ผู้เรียนพัฒนาความรู้ ทักษะ และสมรรถนะ",
    schoolDetail: null,
    icon: "Presentation",
    tone: "blue",
    href: "/academic/learning",
    indicatorCodes: ["3.2"],
  },
  {
    key: "active",
    title: "Active Learning",
    subtitle: "การเรียนรู้เชิงรุก",
    concept: "ผู้เรียนลงมือทำ คิด อภิปราย และสะท้อนการเรียนรู้ด้วยตนเอง",
    schoolDetail: null,
    icon: "Sparkles",
    tone: "pink",
    href: "/academic/learning",
    indicatorCodes: ["1.3", "3.2"],
  },
  {
    key: "pbl",
    title: "Project-based Learning",
    subtitle: "การเรียนรู้โดยใช้โครงงานเป็นฐาน",
    concept: "ผู้เรียนเรียนรู้ผ่านการทำโครงงานเพื่อตอบคำถามหรือแก้ปัญหาจริง",
    schoolDetail: null,
    icon: "FolderKanban",
    tone: "green",
    href: "/academic/learning",
    indicatorCodes: ["1.1", "3.2"],
  },
  {
    key: "development",
    title: "กิจกรรมพัฒนาผู้เรียน",
    subtitle: "Student Development",
    concept: "กิจกรรมแนะแนว กิจกรรมนักเรียน และกิจกรรมเพื่อสังคมและสาธารณประโยชน์",
    schoolDetail: null,
    icon: "Users",
    tone: "yellow",
    href: "/academic/learning",
    indicatorCodes: ["1.2"],
  },
  {
    key: "innovation",
    title: "นวัตกรรมการศึกษา",
    subtitle: "Educational Innovation",
    concept: "แนวคิด วิธีการ หรือสื่อใหม่ที่ช่วยยกระดับคุณภาพการเรียนรู้",
    schoolDetail: null,
    icon: "Lightbulb",
    tone: "lavender",
    href: "/academic/innovation",
    indicatorCodes: ["2.6", "3.2"],
  },
  {
    key: "best-practice",
    title: "Best Practices",
    subtitle: "วิธีปฏิบัติที่เป็นเลิศ",
    concept: "แนวปฏิบัติที่ได้ผลของโรงเรียน ซึ่งถอดบทเรียนและเผยแพร่ได้",
    schoolDetail: null,
    icon: "Award",
    tone: "blue",
    href: "/academic/innovation",
    indicatorCodes: ["2.3"],
  },
];

export const outcomeMetrics: OutcomeMetric[] = [
  { key: "achievement", label: "ผลสัมฤทธิ์ทางการเรียน", description: "ผลการเรียนเฉลี่ยตามกลุ่มสาระ", value: null, year: null, indicatorCode: "1.1", icon: "GraduationCap", tone: "lavender" },
  { key: "competency", label: "สมรรถนะผู้เรียน", description: "ผลการประเมินสมรรถนะสำคัญตามหลักสูตร", value: null, year: null, indicatorCode: "1.1", icon: "Brain", tone: "blue" },
  { key: "characteristics", label: "คุณลักษณะที่พึงประสงค์", description: "ผลการประเมินคุณลักษณะอันพึงประสงค์", value: null, year: null, indicatorCode: "1.2", icon: "Heart", tone: "pink" },
  { key: "awards", label: "รางวัลของนักเรียน", description: "จำนวนรางวัลที่ได้รับในปีการศึกษา", value: null, year: null, icon: "Trophy", tone: "yellow" },
  { key: "competitions", label: "การแข่งขัน", description: "การเข้าร่วมการแข่งขันทักษะทางวิชาการ", value: null, year: null, icon: "Medal", tone: "green" },
  { key: "admissions", label: "การศึกษาต่อ", description: "ผู้สำเร็จการศึกษาที่ศึกษาต่อในระดับสูงขึ้น", value: null, year: null, icon: "School", tone: "lavender" },
  { key: "projects", label: "โครงงานนักเรียน", description: "โครงงานและผลงานสร้างสรรค์ของผู้เรียน", value: null, year: null, indicatorCode: "1.3", icon: "FolderKanban", tone: "blue" },
  { key: "community", label: "กิจกรรมเพื่อชุมชน", description: "กิจกรรมจิตอาสาและความร่วมมือกับชุมชน", value: null, year: null, indicatorCode: "2.10", icon: "HandHeart", tone: "green" },
];

export const galleryGroups: Record<GalleryItem["group"], string> = {
  buildings: "อาคารเรียน",
  classrooms: "ห้องเรียน",
  labs: "ห้องปฏิบัติการ",
  library: "ห้องสมุด",
  "learning-spaces": "พื้นที่การเรียนรู้",
  nature: "ธรรมชาติและสิ่งแวดล้อม",
  community: "ชุมชน",
  culture: "วัฒนธรรมท้องถิ่น",
};

export const gallery: GalleryItem[] = (Object.keys(galleryGroups) as GalleryItem["group"][]).map((g) => ({
  id: `gallery-${g}`,
  group: g,
  label: galleryGroups[g],
  image: null, // real photographs only
}));
