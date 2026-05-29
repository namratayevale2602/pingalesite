import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

export default function BenefitsGrid({ items, columns = 3, eyebrow, title, intro }) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-2 lg:grid-cols-5",
  }[columns] ?? "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} align="split" />
        <div className={`grid grid-cols-1 gap-4 ${colClass}`}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card h-full">
                <div className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.18em] mb-4">0{i + 1}</div>
                <h4 className="mb-3 text-[24px]">{it.t}</h4>
                <p className="text-[var(--fg-muted)] text-sm leading-[1.6]">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
