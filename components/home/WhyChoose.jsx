import Counter from "@/components/Counter";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const STATS = [
  { v: 5500, suffix: "+", l: "Families served", sub: "Nashik & beyond" },
  { v: 420, suffix: " Cr+", l: "AUM managed", sub: "₹ as of FY25", prefix: "₹" },
  { v: 33, suffix: "+", l: "Years of experience", sub: "Since 1993" },
  { v: 96.4, suffix: "%", l: "Claim success rate", sub: "5-year rolling avg." },
];

const DIFFERENCES = [
  {
    num: "01",
    title: "We write the plan first",
    body: "Every client gets a written financial plan before we recommend a single product. If you don't have a plan, you're just buying things.",
  },
  {
    num: "02",
    title: "We compare, not just sell",
    body: "AMFI-registered distributor + IRDAI-licensed broker. We access 14+ insurers and 38 AMCs — and show you all the options, not just the profitable ones.",
  },
  {
    num: "03",
    title: "We're with you at claim time",
    body: "Our claims desk handles documentation, follow-ups, and escalations. Last 5 years: 96.4% of assisted claims settled at first submission.",
  },
  {
    num: "04",
    title: "One advisor, your whole life",
    body: "You're not passed between departments. One advisor knows your entire financial picture — from your SIP to your term plan to your retirement corpus.",
  },
  {
    num: "05",
    title: "No pressure, ever",
    body: "The first meeting is free. If we're not the right firm for your situation, we'll tell you — and refer you to someone who is.",
  },
  {
    num: "06",
    title: "Transparent commissions",
    body: "We earn commissions from fund houses and insurers. We disclose every single one in writing before you sign anything. No surprises.",
  },
];

export default function WhyChoose() {
  return (
    <section className="section border-t border-b border-[var(--rule)]">
      <div className="container">
        <SectionHeader
          eyebrow="Why Pingale"
          title={<>Different isn't a word we use. <span className="italic-serif">Results are.</span></>}
          intro="We've been doing this since 1993. Here's what three decades of client-first practice looks like in practice."
          align="split"
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-[var(--paper-2)] border border-[var(--rule)] rounded-2xl overflow-hidden bg-[var(--bg-elev)] mb-14">
          {STATS.map((s, i) => (
            <div key={i} className={`p-7 ${i < STATS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-[var(--rule)]" : ""}`}>
              <div className="font-[var(--font-display)] text-[clamp(40px,4.5vw,64px)] leading-none mb-3">
                <Counter to={s.v} suffix={s.suffix} prefix={s.prefix || ""} />
              </div>
              <div className="text-[15px] text-[var(--fg)] font-medium mb-1">{s.l}</div>
              <div className="text-[12px] text-[var(--fg-muted)] font-[var(--font-mono)] tracking-[0.06em]">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Differentiators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
          {DIFFERENCES.map((d, i) => (
            <div key={i} className="p-7 border-b border-r border-[var(--rule)]">
              <div className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.16em] mb-3">{d.num}</div>
              <h4 className="text-[20px] pb-3">{d.title}</h4>
              <p className="text-sm text-[var(--fg-muted)] leading-[1.65]">{d.body}</p>
            </div>
          ))}
        </div>

        {/* Subtle proof line */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--rule)]">
         
          <Link href="/contact" className="btn btn-primary shrink-0">
            Book 
            a free call <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
