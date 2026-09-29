import {
  Award, BookOpen, Brain, FolderKanban, GraduationCap, HandHeart, Heart, Lightbulb, Medal,
  Presentation, School, Sparkles, Trophy, Users, type LucideIcon, CircleDot,
} from "lucide-react";
import { cn, toneClasses } from "@/lib/utils";
import type { Tone } from "@/lib/types";

const map: Record<string, LucideIcon> = {
  Award, BookOpen, Brain, FolderKanban, GraduationCap, HandHeart, Heart, Lightbulb, Medal,
  Presentation, School, Sparkles, Trophy, Users,
};

/** Glossy "clay" tile — soft 3D look adapted from the reference boards. */
const clay: Record<Tone, { bg: string; fg: string; glow: string }> = {
  lavender: { bg: "linear-gradient(160deg,#b9a6e0 0%,#8d74bb 55%,#7a5fa8 100%)", fg: "#fff", glow: "rgba(122,95,168,.35)" },
  pink: { bg: "linear-gradient(160deg,#f5b8cf 0%,#e57fa6 55%,#d0668f 100%)", fg: "#fff", glow: "rgba(208,102,143,.32)" },
  blue: { bg: "linear-gradient(160deg,#b6caed 0%,#7a9fdc 55%,#5b82c6 100%)", fg: "#fff", glow: "rgba(91,130,198,.32)" },
  green: { bg: "linear-gradient(160deg,#a8dcc2 0%,#5fb08c 55%,#3f9570 100%)", fg: "#fff", glow: "rgba(63,149,112,.30)" },
  yellow: { bg: "linear-gradient(160deg,#fcefb4 0%,#f7d77e 50%,#f3c669 100%)", fg: "#5c3d00", glow: "rgba(214,160,52,.35)" },
};

export function ClayTile({ name, icon, tone = "lavender", className, size = 48 }: { name?: string; icon?: LucideIcon; tone?: Tone; className?: string; size?: number }) {
  const I = icon ?? (name ? map[name] : undefined) ?? CircleDot;
  const c = clay[tone];
  return (
    <span
      aria-hidden
      className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden rounded-[30%]", className)}
      style={{
        width: size,
        height: size,
        background: c.bg,
        color: c.fg,
        boxShadow: `inset 0 2px 1px rgba(255,255,255,.55), inset 0 -3px 6px rgba(0,0,0,.10), 0 8px 16px -4px ${c.glow}`,
      }}
    >
      <span className="absolute left-[18%] top-[8%] h-[22%] w-[45%] rounded-full bg-white/40 blur-[1px]" />
      <I className="relative" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={2.1} />
    </span>
  );
}

export function IconTile({ name, icon, tone = "lavender", className }: { name?: string; icon?: LucideIcon; tone?: Tone; className?: string }) {
  const I = icon ?? (name ? map[name] : undefined) ?? CircleDot;
  const t = toneClasses[tone];
  return (
    <span className={cn("inline-grid size-12 shrink-0 place-items-center rounded-[14px]", t.tint, t.text, className)} aria-hidden>
      <I className="size-6" strokeWidth={1.75} />
    </span>
  );
}
