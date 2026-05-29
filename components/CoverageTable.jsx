import SectionHeader from "@/components/SectionHeader";

export default function CoverageTable({ rows, title, cols }) {
  return (
    <section className="section bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
      <div className="container">
        <SectionHeader eyebrow="Compare plans" title={title} align="split" />
        <div className="bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl overflow-hidden">
          {/* Header */}
          <div
            className="grid gap-0 bg-[var(--paper)] border-b border-[var(--rule)] px-6 py-5 font-[var(--font-mono)] text-[11px] tracking-[0.12em] uppercase text-[var(--fg-muted)]"
            style={{ gridTemplateColumns: `2fr repeat(${cols.length}, 1fr)` }}
          >
            <span>Feature</span>
            {cols.map((c, i) => <span key={i}>{c}</span>)}
          </div>
          {/* Rows */}
          {rows.map((r, i) => (
            <div
              key={i}
              className={`grid gap-0 px-6 py-[18px] items-center ${i < rows.length - 1 ? "border-b border-[var(--rule)]" : ""}`}
              style={{ gridTemplateColumns: `2fr repeat(${cols.length}, 1fr)` }}
            >
              <span className="text-sm text-[var(--fg)] font-medium">{r.label}</span>
              {r.values.map((v, j) => (
                <span key={j} className={`text-sm ${v === true ? "text-[var(--brand-2)]" : v === false ? "text-[var(--fg-soft)]" : "text-[var(--fg)]"}`}>
                  {v === true ? "✓" : v === false ? "—" : v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
