import { Hero } from "@/components/home/Hero";
import { SchoolStats } from "@/components/home/SchoolStats";
import { SchoolIdentity } from "@/components/home/SchoolIdentity";
import { AcademicSection } from "@/components/home/AcademicSection";
import { AchievementSection } from "@/components/home/AchievementSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CampusGallery } from "@/components/home/CampusGallery";
import { QualityDashboard } from "@/components/quality/QualityDashboard";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SchoolStats />
      <SchoolIdentity />
      <AcademicSection />
      <AchievementSection />
      <NewsSection />
      <CampusGallery />
      <QualityDashboard />
      <CtaBanner />
    </>
  );
}
