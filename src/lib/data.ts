/**
 * Repository layer. UI components read data ONLY through these functions.
 * Today they read local content files; to connect a CMS/database later,
 * re-implement these functions (keep the signatures) — no component changes needed.
 */
import { school } from "@/content/school";
import { indicators, standards } from "@/content/quality";
import { evidenceDocuments, projects } from "@/content/evidence";
import { academicPillars, gallery, news, outcomeMetrics } from "@/content/site";
import type { IndicatorCode, StandardId } from "./types";

export const getSchool = () => school;
export const getStandards = () => standards;
export const getStandard = (id: StandardId) => standards.find((s) => s.id === id);
export const getStandardBySlug = (slug: string) => standards.find((s) => s.slug === slug);
export const getIndicators = (standardId?: StandardId) =>
  standardId ? indicators.filter((i) => i.standardId === standardId) : indicators;
export const getIndicator = (code: IndicatorCode) => indicators.find((i) => i.code === code);

export const getEvidence = () => evidenceDocuments;
export const getEvidenceById = (id: string) => evidenceDocuments.find((d) => d.id === id);
export const getEvidenceForIndicator = (code: IndicatorCode) =>
  evidenceDocuments.filter((d) => d.indicatorCodes.includes(code));
export const getEvidenceForStandard = (id: StandardId) =>
  evidenceDocuments.filter((d) => d.indicatorCodes.some((c) => c.startsWith(`${id}.`)));

export const getProjects = () => projects;
export const getProject = (id: string) => projects.find((p) => p.id === id);
export const getProjectsForIndicator = (code: IndicatorCode) =>
  projects.filter((p) => p.indicatorCodes.includes(code));

export const getNews = () => news;
export const getAcademicPillars = () => academicPillars;
export const getOutcomeMetrics = () => outcomeMetrics;
export const getGallery = () => gallery;

/** Real (non-sample, published) evidence only — used for every count and progress figure. */
const isReal = (d: { isSample?: boolean; fileUrl: string | null }) => !d.isSample && d.fileUrl !== null;

export function getStandardStats(id: StandardId) {
  const inds = getIndicators(id);
  const docs = getEvidenceForStandard(id);
  const real = docs.filter(isReal);
  const covered = inds.filter((i) => real.some((d) => d.indicatorCodes.includes(i.code))).length;
  return {
    indicatorCount: inds.length,
    evidenceCount: real.length, // 0 real docs → UI shows "—"
    slotCount: docs.length,
    completeness: real.length === 0 ? null : Math.round((covered / inds.length) * 100),
  };
}

export function getQualityOverview() {
  const real = evidenceDocuments.filter(isReal);
  return {
    standardCount: standards.length,
    indicatorCount: indicators.length,
    evidenceCount: real.length,
    slotCount: evidenceDocuments.length,
    years: Array.from(new Set(evidenceDocuments.map((d) => d.academicYear))).sort((a, b) => b - a),
  };
}
