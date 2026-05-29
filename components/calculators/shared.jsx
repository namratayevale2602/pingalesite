import { INR } from "@/lib/format";

export function SliderInput({ label, value, onChange, min, max, step = 1, format = (v) => v, suffix }) {
  return (
    <div className="field mb-5">
      <div className="flex justify-between items-baseline">
        <label>{label}</label>
        <span className="font-[var(--font-display)] text-[24px] text-[var(--fg)]">
          {format(value)}
          {suffix && <span className="text-sm text-[var(--fg-muted)] font-[var(--font-sans)] ml-1">{suffix}</span>}
        </span>
      </div>
      <input type="range" className="slider" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} />
      <div className="flex justify-between text-[var(--fg-soft)] text-[11px] font-[var(--font-mono)] mt-1">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}

export function BigStat({ label, value }) {
  return (
    <div className="p-5 border border-[var(--rule)] rounded-xl bg-[var(--bg-elev)]">
      <div className="text-[11px] text-[var(--fg-muted)] tracking-[0.12em] uppercase mb-1.5">{label}</div>
      <div className="font-[var(--font-display)] text-[30px] leading-[1.1]">{value}</div>
    </div>
  );
}

export function StatRow({ label, value, big }) {
  return (
    <div className="flex justify-between items-baseline py-1.5">
      <span className="text-[13px] text-[var(--fg-muted)] tracking-[0.04em]">{label}</span>
      <span className={`font-[var(--font-display)] ${big ? "text-[32px]" : "text-[22px]"}`}>{value}</span>
    </div>
  );
}

export function Legend({ color, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
      <div className="flex flex-col">
        <span className="text-[11px] text-[var(--fg-muted)] uppercase tracking-[0.1em]">{label}</span>
        <span className="font-[var(--font-display)] text-[20px]">{value}</span>
      </div>
    </div>
  );
}

const r4 = (v) => Math.round(v * 1e4) / 1e4;

export function GrowthChart({ data, height = 260, currencyFmt = INR }) {
  const w = 600, h = height, pad = { l: 50, r: 16, t: 16, b: 28 };
  const maxV = Math.max(...data.map((d) => d.value)) * 1.05 || 1;
  const x = (i) => r4(pad.l + (i / Math.max(data.length - 1, 1)) * (w - pad.l - pad.r));
  const y = (v) => r4(h - pad.b - (v / maxV) * (h - pad.t - pad.b));

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.value)}`).join(" ");
  const fillPath = `${linePath} L ${x(data.length - 1)} ${h - pad.b} L ${x(0)} ${h - pad.b} Z`;
  const investedPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.invested)}`).join(" ");

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((p) => ({
    yPos: y(maxV * p),
    label: currencyFmt(maxV * p),
  }));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="growFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-2)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--brand-2)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={pad.l} x2={w - pad.r} y1={g.yPos} y2={g.yPos} className="chart-grid" />
          <text x={pad.l - 8} y={r4(g.yPos + 4)} textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" fill="var(--fg-soft)">{g.label}</text>
        </g>
      ))}
      <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} className="chart-axis" />
      <path d={fillPath} fill="url(#growFill)" />
      <path d={investedPath} fill="none" stroke="var(--fg-muted)" strokeWidth="1.5" strokeDasharray="3 4" />
      <path d={linePath} fill="none" stroke="var(--brand-2)" strokeWidth="2.5" />
      {data.length > 0 && (
        <>
          <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].value)} r="5" fill="var(--brand)" />
          <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].value)} r="9" fill="var(--brand)" opacity="0.18" />
        </>
      )}
      {data.map((d, i) =>
        (i === 0 || i === data.length - 1 || (data.length > 10 && i % Math.floor(data.length / 6) === 0)) ? (
          <text key={i} x={x(i)} y={h - 10} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--fg-soft)">Y{d.year}</text>
        ) : null
      )}
    </svg>
  );
}

export function Donut({ invested, gains, size = 180 }) {
  const total = invested + gains;
  const investedPct = total > 0 ? invested / total : 0.5;
  const r = size / 2 - 14;
  const c = size / 2;
  const circumference = r4(2 * Math.PI * r);
  const investedLen = r4(investedPct * circumference);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--brand-2)" strokeWidth="20" />
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--brand)" strokeWidth="20"
        strokeDasharray={`${investedLen} ${circumference}`} transform={`rotate(-90 ${c} ${c})`} />
      <text x={c} y={c - 4} textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fill="var(--fg)">{INR(total)}</text>
      <text x={c} y={c + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.15em" fill="var(--fg-muted)">TOTAL CORPUS</text>
    </svg>
  );
}
