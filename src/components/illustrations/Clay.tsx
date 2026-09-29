import type { ReactNode } from "react";
/**
 * Original "soft 3D / clay" illustrations drawn as SVG — generic school objects only
 * (books, cap, plant, cloud, star, shield). Decorative: always aria-hidden.
 * Inspired by the visual language of the reference boards (soft gradients,
 * glossy highlights, grounded shadows) without copying any of their artwork.
 */
import { useId } from "react";
import { cn } from "@/lib/utils";

type P = { className?: string };

function Svg({ className, children, vb = "0 0 200 200" }: P & { children: ReactNode; vb?: string }) {
  return (
    <svg viewBox={vb} className={cn("pointer-events-none select-none", className)} aria-hidden focusable="false">
      {children}
    </svg>
  );
}

const Shadow = ({ cx = 100, cy = 186, rx = 62, ry = 9 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#5e4589" opacity="0.12" />
);

export function ClayPlant({ className }: P) {
  const id = useId();
  return (
    <Svg className={className}>
      <defs>
        <linearGradient id={`${id}pot`} x1="0" x2="1">
          <stop offset="0" stopColor="#f6d2bd" />
          <stop offset=".55" stopColor="#efb99a" />
          <stop offset="1" stopColor="#dba396" />
        </linearGradient>
        <linearGradient id={`${id}leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9d8a0" />
          <stop offset="1" stopColor="#8fae78" />
        </linearGradient>
      </defs>
      <Shadow rx={46} cy={188} />
      {[
        [-38, 98, 58],
        [-14, 96, 44],
        [12, 104, 42],
        [36, 102, 56],
        [0, 100, 36],
      ].map(([rot, x, y], i) => (
        <g key={i} transform={`rotate(${rot} ${x} 118)`}>
          <ellipse cx={x} cy={y + 18} rx="17" ry="40" fill={`url(#${id}leaf)`} />
          <path d={`M${x} ${y - 16} Q ${x + 3} ${y + 20} ${x} ${y + 56}`} stroke="#eef3d9" strokeWidth="2.5" fill="none" opacity=".7" strokeLinecap="round" />
        </g>
      ))}
      <path d="M58 118 h84 l-9 58 a12 12 0 0 1 -12 10 h-42 a12 12 0 0 1 -12 -10 z" fill={`url(#${id}pot)`} />
      <rect x="52" y="108" width="96" height="20" rx="10" fill="#f5c7a5" />
      <rect x="60" y="111" width="46" height="6" rx="3" fill="#fff" opacity=".45" />
      <path d="M70 136 q4 30 10 40" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".35" fill="none" />
    </Svg>
  );
}

export function ClayBooks({ className }: P) {
  const id = useId();
  const book = (y: number, x: number, w: number, top: string, side: string, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height="30" rx="9" fill={side} />
      <rect x={x + 6} y={y + 6} width={w - 18} height="12" rx="5" fill="#fffaf2" />
      <rect x={x} y={y} width={w} height="14" rx="7" fill={top} />
      <rect x={x + 10} y={y + 3} width={w * 0.4} height="4" rx="2" fill="#fff" opacity=".5" />
    </g>
  );
  return (
    <Svg className={className}>
      <defs>
        <linearGradient id={`${id}cap`} x1="0" x2="1">
          <stop offset="0" stopColor="#8d74bb" />
          <stop offset="1" stopColor="#5e4589" />
        </linearGradient>
        <radialGradient id={`${id}tas`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#faf19f" />
          <stop offset="1" stopColor="#f3c669" />
        </radialGradient>
      </defs>
      <Shadow rx={70} cy={184} />
      {book(146, 30, 140, "#b6caed", "#7a9fdc", "b1")}
      {book(114, 40, 124, "#f5a9c7", "#e08bab", "b2")}
      {book(82, 34, 132, "#dac4e8", "#ba98e1", "b3")}
      {/* graduation cap */}
      <path d="M72 70 q0 -14 28 -14 q28 0 28 14 v8 q-28 10 -56 0 z" fill="#4c3872" />
      <path d="M100 26 l58 22 l-58 22 l-58 -22 z" fill={`url(#${id}cap)`} />
      <path d="M100 30 l40 15 l-40 3 l-40 -3 z" fill="#fff" opacity=".18" />
      <path d="M100 48 q34 2 44 14 v20" stroke="#f3c669" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="144" cy="86" r="7" fill={`url(#${id}tas)`} />
      <circle cx="100" cy="48" r="5" fill={`url(#${id}tas)`} />
    </Svg>
  );
}

export function ClayCloud({ className }: P) {
  const id = useId();
  return (
    <Svg className={className} vb="0 0 200 130">
      <defs>
        <radialGradient id={`${id}c`} cx=".4" cy=".25" r=".9">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#f6f2fb" />
          <stop offset="1" stopColor="#e4dcf1" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="118" rx="70" ry="7" fill="#5e4589" opacity=".08" />
      <path
        d="M40 104 a26 26 0 0 1 6 -51 a34 34 0 0 1 60 -18 a30 30 0 0 1 50 22 a25 25 0 0 1 4 47 z"
        fill={`url(#${id}c)`}
      />
      <ellipse cx="78" cy="46" rx="18" ry="7" fill="#fff" opacity=".8" />
    </Svg>
  );
}

export function ClayStar({ className }: P) {
  const id = useId();
  return (
    <Svg className={className}>
      <defs>
        <radialGradient id={`${id}s`} cx=".4" cy=".3" r=".8">
          <stop offset="0" stopColor="#fcf6c4" />
          <stop offset=".5" stopColor="#f7dd83" />
          <stop offset="1" stopColor="#efbe55" />
        </radialGradient>
      </defs>
      <Shadow rx={48} cy={184} />
      <path
        d="M100 28 l20 42 l46 6 l-34 31 l9 46 l-41 -23 l-41 23 l9 -46 l-34 -31 l46 -6 z"
        fill={`url(#${id}s)`}
        stroke={`url(#${id}s)`}
        strokeWidth="18"
        strokeLinejoin="round"
      />
      <ellipse cx="84" cy="70" rx="14" ry="7" fill="#fff" opacity=".6" transform="rotate(-30 84 70)" />
    </Svg>
  );
}

export function ClayShield({ className }: P) {
  const id = useId();
  return (
    <Svg className={className}>
      <defs>
        <linearGradient id={`${id}sh`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c5bfe3" />
          <stop offset=".5" stopColor="#a58fd0" />
          <stop offset="1" stopColor="#7a5fa8" />
        </linearGradient>
      </defs>
      <Shadow rx={52} cy={186} />
      <path d="M100 22 l62 22 v44 c0 44 -28 76 -62 90 c-34 -14 -62 -46 -62 -90 v-44 z" fill={`url(#${id}sh)`} />
      <path d="M100 34 l50 18 v36 c0 36 -22 62 -50 74 z" fill="#fff" opacity=".12" />
      <path d="M72 100 l20 20 l38 -40" stroke="#fff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="74" cy="52" rx="16" ry="6" fill="#fff" opacity=".5" transform="rotate(-18 74 52)" />
    </Svg>
  );
}
