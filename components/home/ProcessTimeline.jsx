import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const STEPS = [
  {
    n: "01",
    t: "We listen",
    d: "A 45-minute call — no products, no pressure. We learn about your family, your income, your goals, and what keeps you up at night.",
    tag: "Free · No obligation",
  },
  {
    n: "02",
    t: "We audit",
    d: "We review what you already have — existing insurance, investments, loans, tax structure. Most clients find gaps or overpayments in this step.",
    tag: "Eye-opening",
  },
  {
    n: "03",
    t: "We plan",
    d: "A written financial plan covering your goals, timelines, suggested vehicles, and projected outcomes. You leave with a document, not a brochure.",
    tag: "Written. Yours.",
  },
  {
    n: "04",
    t: "We execute",
    d: "Forms, KYC, fund selection, policy issuance — all handled. You review and approve. We do the paperwork.",
    tag: "Handled end-to-end",
  },
  {
    n: "05",
    t: "We stay",
    d: "Quarterly reviews. Annual rebalancing. A phone call when markets crash or life changes. We're not done after the first sale.",
    tag: "Lifetime relationship",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="How we work"
          title={<>Five steps to <span className="italic-serif">clarity.</span></>}
          intro="We've refined this process across 33 years and 5,500 families. Each step has a clear deliverable — you always know what comes next."
          align="split"
        />

        {/* Steps */}
        <div className="relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-9 left-[calc(10%+22px)] right-[calc(10%+22px)] h-px bg-[var(--rule)]" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-0">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-row gap-5 items-start lg:flex-col lg:items-center lg:px-4 lg:gap-0">
                {/* Step circle */}
                <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--bg-elev)] border border-[var(--rule)] flex items-center justify-center font-[var(--font-mono)] text-[13px] text-[var(--fg-muted)] lg:mb-6 relative z-[2]">
                  {s.n}
                </div>

                <div className="flex-1 lg:text-center">
                  <div className="font-[var(--font-mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--brand-2)] pb-2 lg:pb-1">
                    {s.tag}
                  </div>
                  <h4 className="text-[20px] pb-2 lg:pb-3">{s.t}</h4>
                  <p className="text-[13px] text-[var(--fg-muted)] leading-[1.6]">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/contact" className="btn btn-primary">
            Start with step 1 — it&apos;s free <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
