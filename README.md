# เว็บไซต์โรงเรียนบรรพตวิทยา (Bunpot Wittaya School)

เว็บไซต์ข้อมูลสาธารณะ + ศูนย์หลักฐานคุณภาพการศึกษาดิจิทัล
Next.js 15 · TypeScript · Tailwind CSS 4 · shadcn/ui-style components · Lucide · Framer Motion · Recharts · Noto Sans Thai (self-hosted)

## เริ่มใช้งาน

```bash
npm install
npm run dev        # เปิด http://localhost:3000
npm run build && npm start   # production
```

### ไฟล์เดียวเปิดได้ทันที (Bunpotwittaya.html)

```bash
STATIC_EXPORT=1 npm run build          # สร้างเว็บแบบ static ใน out/
python3 scripts/build-single-file.py   # รวมทุกหน้า + CSS + ฟอนต์ เป็น Bunpotwittaya.html
```
ดับเบิลคลิกเปิดได้โดยไม่ต้องติดตั้งอะไร (ใช้ลิงก์แบบ #/about ภายในไฟล์) — เหมาะสำหรับพรีวิว/นำเสนอ สำหรับเผยแพร่จริงแนะนำให้ deploy โปรเจกต์ Next.js

ตั้งค่าโดเมนจริงสำหรับ SEO: สร้างไฟล์ `.env.local` แล้วใส่ `NEXT_PUBLIC_SITE_URL=https://<โดเมนของโรงเรียน>`

## GitHub และ GitHub Pages

โปรเจกต์นี้เป็น git repository อยู่แล้ว และมี workflow `.github/workflows/deploy.yml` ที่ build เว็บแบบ static แล้วเผยแพร่บน GitHub Pages อัตโนมัติทุกครั้งที่ push ไปที่ branch `main`

1. สร้าง repository ว่างบน GitHub (ไม่ต้องเพิ่ม README) เช่น `bunpot-wittaya-website`
2. push โค้ด: ใช้ GitHub Desktop (File → Add local repository → เลือกโฟลเดอร์นี้ → Publish) หรือคำสั่ง
   ```bash
   git remote add origin https://github.com/<บัญชี>/bunpot-wittaya-website.git
   git push -u origin main
   ```
3. บน GitHub: Settings → Pages → Build and deployment → Source เลือก **GitHub Actions**
4. รอ workflow "Deploy to GitHub Pages" เสร็จ (แท็บ Actions) เว็บจะอยู่ที่ `https://<บัญชี>.github.io/bunpot-wittaya-website/` และไฟล์เดียวที่ `…/Bunpotwittaya.html`

## หลักการสำคัญ: ไม่สร้างข้อมูลขึ้นเอง

ข้อมูลที่โรงเรียนยังไม่ยืนยันมีค่าเป็น `null` และแสดงบนเว็บเป็น **[ข้อมูลรอการยืนยันจากโรงเรียน]** โดยอัตโนมัติ
ข้อมูลที่ใส่แล้วมีเพียง: ชื่อโรงเรียน (ไทย/อังกฤษ) และกรอบ สมศ. 3 มาตรฐาน 16 ตัวชี้วัด (ตรวจชื่อตัวชี้วัดกับคู่มือ สมศ. ฉบับทางการอีกครั้งก่อนเผยแพร่)

## วิธีเติมข้อมูล (ไม่ต้องแก้คอมโพเนนต์)

| ต้องการแก้ | ไฟล์ |
|---|---|
| ข้อมูลโรงเรียน, วิสัยทัศน์ พันธกิจ อัตลักษณ์ ฯลฯ, ติดต่อ, ภาพ hero, โลโก้ | `src/content/school.ts` |
| เนื้อหาหน้าตัวชี้วัด (เป้าหมาย แนวทาง ผลการดำเนินงาน ผลลัพธ์ ภาพ) | `src/content/quality.ts` |
| เอกสารหลักฐาน, โครงการ (Evidence mapping) | `src/content/evidence.ts` |
| เมนู, ข่าว, การจัดการศึกษา, ผลลัพธ์ผู้เรียน, แกลเลอรี | `src/content/site.ts` |

- รูปภาพ/เอกสาร: วางใน `public/images/…` และ `public/evidence/…` แล้วอ้างอิงเป็น `/images/xxx.jpg`, `/evidence/xxx.pdf`
- หลักฐานปัจจุบันเป็น **โครงร่าง** (`isSample: true`, ไม่มีไฟล์) — เมื่อมีเอกสารจริง ให้ใส่ `fileUrl`, `publishedAt`, `description` และลบ `isSample` ตัวเลขบนแดชบอร์ด (จำนวนหลักฐาน, ความครบถ้วน) จะคำนวณเองจากหลักฐานจริงเท่านั้น
- โครงการ STEM Camp เป็นตัวอย่างโครงสร้างตามบรีฟ มีป้าย "ตัวอย่างโครงร่าง" — แทนที่หรือลบได้

## โครงสร้าง

```
src/
  app/                 เส้นทางทั้งหมด (/, /about/*, /academic/*, /students/*, /campus, /community,
                       /news, /activities, /quality, /quality/standard-N, /quality/indicator/[code],
                       /evidence, /evidence/[id], /projects/[id], /contact, sitemap, robots)
  content/             ข้อมูล (แหล่งเดียว — แทนด้วย CMS ภายหลัง)
  lib/types.ts         โมเดลข้อมูล (School, Standard, Indicator, EvidenceDocument, Project, NewsItem …)
  lib/data.ts          repository layer — เชื่อม CMS/ฐานข้อมูลโดยเขียนฟังก์ชันเหล่านี้ใหม่
  components/
    ui/                Button, Card, Badge/IndicatorChip, Pending, IconTile
    layout/            Navbar, Footer, PageHeader, Section, Logo
    home/              Hero, SchoolStats, SchoolIdentity, AcademicSection, AchievementSection,
                       NewsSection, CampusGallery
    news/              NewsCard, ActivityCard, NewsBoard
    quality/           QualityDashboard, StandardCard, IndicatorCard, EvidenceCard, EvidenceCenter,
                       EvidenceFlow, DocumentViewer, IndicatorDonut
    motion/Reveal      แอนิเมชันเข้าจอ (เคารพ prefers-reduced-motion)
```

## ภาษาภาพ (ดัดแปลงจากภาพอ้างอิง)

- **ClayTile** (`components/ui/icon.tsx`) — ไอคอน soft 3D ด้วย CSS ล้วน 5 โทน
- **Clay illustrations** (`components/illustrations/Clay.tsx`) — ภาพประกอบ SVG ต้นฉบับ: หนังสือ+หมวกบัณฑิต, กระถางต้นไม้, เมฆ, ดาว, โล่ (ตกแต่งเท่านั้น ไม่มีตัวการ์ตูน)
- **PortalShell** (`components/layout/PortalShell.tsx`) — แถบเมนูด้านข้างแบบแดชบอร์ดของศูนย์คุณภาพ (`app/(portal)/`) บนมือถือเป็นแถบ pill
- Hero แบนเนอร์ไล่เฉด + ชิปคำทักทาย/วันที่ไทย, การ์ดสถิติพื้นพาสเทล, ปฏิทินโรงเรียน, แบนเนอร์ CTA ท้ายหน้า

## เชื่อมต่อ CMS ภายหลัง

คอมโพเนนต์เรียกข้อมูลผ่าน `src/lib/data.ts` เท่านั้น เปลี่ยนการทำงานของฟังก์ชันใน `data.ts` ให้ดึงจาก Strapi / Directus / Supabase / Google Sheets โดยคืนค่าตามชนิดใน `types.ts` (เปลี่ยนเป็น `async` ได้ เพราะหน้าเป็น Server Components)

## คุณภาพที่ตรวจแล้ว

- `next build` ผ่าน (lint + type check), 70 หน้า prerender แบบ static
- axe-core WCAG 2 A/AA: ไม่พบปัญหาในหน้าหลัก (เดสก์ท็อป+มือถือ), คุณภาพ, มาตรฐาน, ตัวชี้วัด, ศูนย์หลักฐาน, เอกสาร, โครงการ, ข่าว
- ไม่มี horizontal scroll ใน 21 เส้นทางหลักที่ 390 / 768 / 1024 / 1440px

ระบบออกแบบ (tokens, คอมโพเนนต์, IA, wireframe, data model) อยู่ในอาร์ติแฟกต์ Design System "Bunpot Wittaya"
