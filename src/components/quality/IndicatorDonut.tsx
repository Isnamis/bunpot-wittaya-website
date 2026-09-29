const COLORS = ["#8d74bb", "#7a9fdc", "#5fb08c"]; // clay mid-tones; values are also printed in the legend

/** Real framework data: indicators per standard (3 / 10 / 3). Pure SVG — renders on the server. */
export function IndicatorDonut({ data, total }: { data: { name: string; value: number }[]; total: number }) {
  const r = 38, c = 2 * Math.PI * r, gap = 7;
  const sum = data.reduce((a, d) => a + d.value, 0) || 1;
  let offset = 0;
  return (
    <figure className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative size-44 shrink-0" role="img" aria-label={`สัดส่วนตัวชี้วัด: ${data.map((d) => `${d.name} ${d.value} ตัวชี้วัด`).join(", ")}`}>
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
          {data.map((d, i) => {
            const len = (d.value / sum) * c;
            const seg = (
              <circle key={d.name} cx="50" cy="50" r={r} fill="none" stroke={COLORS[i % COLORS.length]} strokeWidth="14"
                strokeLinecap="round" strokeDasharray={`${Math.max(len - gap, 0.1)} ${c}`} strokeDashoffset={-offset - gap / 2} />
            );
            offset += len;
            return seg;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center leading-tight">
          <div><span className="block text-3xl font-bold">{total}</span><span className="text-xs text-ink-muted">ตัวชี้วัด</span></div>
        </div>
      </div>
      <figcaption>
        <ul className="space-y-2">
          {data.map((d, i) => (
            <li key={d.name} className="flex items-center gap-2 text-[15px]">
              <span className="size-3 rounded-full" style={{ background: COLORS[i] }} aria-hidden />
              <span className="flex-1">{d.name}</span>
              <span className="font-semibold">{d.value}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
