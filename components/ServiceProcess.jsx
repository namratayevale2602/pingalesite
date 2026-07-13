import SectionHeader from "@/components/SectionHeader";

export default function ServiceProcess({ steps }) {
  return (
    <section className="section bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
      <div className="container">
        <SectionHeader
          eyebrow="How it works"
          title={<>From conversation to <span className="">cover</span> in days, not weeks.</>}
          align="split"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="p-6 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
              <div className="font-[var(--font-display)] text-[48px] text-[var(--brand-2)] mb-4 leading-none">{s.n}</div>
              <h4 className="mb-2 text-[22px]">{s.t}</h4>
              <p className="text-[var(--fg-muted)] text-[13px] leading-[1.55]">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
