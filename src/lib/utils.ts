import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StandardId, Tone } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PENDING_TEXT = "[ข้อมูลรอการยืนยันจากโรงเรียน]";

/** Tone → Tailwind classes. Text always uses the 700 step on the 100 tint (≥4.5:1). */
export const toneClasses: Record<Tone, { tint: string; text: string; solid: string; ring: string; bar: string }> = {
  lavender: { tint: "bg-lavender-100", text: "text-purple-700", solid: "bg-lavender-300", ring: "ring-lavender-300", bar: "bg-purple-600" },
  blue: { tint: "bg-blue-100", text: "text-blue-700", solid: "bg-blue-300", ring: "ring-blue-300", bar: "bg-blue-700" },
  green: { tint: "bg-green-100", text: "text-green-700", solid: "bg-green-200", ring: "ring-green-200", bar: "bg-green-700" },
  pink: { tint: "bg-pink-100", text: "text-pink-700", solid: "bg-pink-300", ring: "ring-pink-300", bar: "bg-pink-700" },
  yellow: { tint: "bg-yellow-100", text: "text-yellow-700", solid: "bg-yellow-200", ring: "ring-yellow-200", bar: "bg-yellow-700" },
};

export const standardTone = (id: StandardId | number): Tone => (id === 1 ? "lavender" : id === 2 ? "blue" : "green");
export const toneForIndicator = (code: string): Tone => standardTone(Number(code.split(".")[0]));

export const formatThaiDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });

export const formatNumber = (n: number) => n.toLocaleString("th-TH");
