import PageHero from "@/components/PageHero";
import BenefitsGrid from "@/components/BenefitsGrid";
import ServiceProcess from "@/components/ServiceProcess";
import StickyLead from "@/components/StickyLead";
import MiniFAQ from "@/components/MiniFAQ";
import SectionHeader from "@/components/SectionHeader";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import Reveal from "@/components/Reveal";
import lifeData from "@/data/life.json";

export const metadata = {
  title: "Life Insurance — Pingale Financial Services",
};

const { keyBenefits: KEY_BENEFITS, planTypes: PLAN_TYPES, coverEstimates: COVER_ESTIMATES, stats: STATS, processSteps: PROCESS, faqs: FAQS } = lifeData;

export default function LifePage() {
  return (
    <main>
      {/* <PageHero
        eyebrow="Life Insurance · IRDAI-licensed broker · Over 14 insurers"
        title={<>The cover beneath <span className="italic-serif">everything else.</span></>}
        intro="Term, child, retirement, ULIP and critical illness — brokered across 14 insurers, not pushed from one insurer's catalogue. We compare first. We recommend second."
        
      /> */}

    

      {/* ── WHAT IS LIFE INSURANCE ── */}
      <section className="section border-b border-[var(--rule)]">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">

            {/* Text */}
            <div>
              <div className="eyebrow mb-5">What is life insurance?</div>
              <h2 className="pb-6">
                A promise that your <span className="italic-serif">family won't struggle.</span>
              </h2>
              <p className="text-[17px] leading-[1.72] text-[var(--fg-muted)] mb-8">
                Life insurance is a legal contract between you and an insurer: in exchange for regular premiums, the insurer pays a defined sum to your nominees if you pass away during the policy term.
                For families that depend on your income, it is the single most important financial product — not because of returns, but because of what it replaces.
              </p>

              <div className="eyebrow mb-5">Why you need it</div>
              <ul className="flex flex-col gap-4">
                {[
                  { t: "Income replacement", d: "If you earn ₹12L/year, your family needs ₹1.8–2.4 Cr invested at 6–7% to replicate that income. Term insurance provides that corpus on day one." },
                  { t: "Loan protection", d: "Your home loan doesn't disappear when you do. Without cover, the EMI burden falls on your spouse or parents." },
                  { t: "Children's future", d: "Child plans with waiver of premium ensure your child's education milestones are funded even if you're not around to fund them." },
                  { t: "Tax savings", d: "Premiums up to ₹1.5L/year qualify for Section 80C deduction. Death proceeds are tax-free under Section 10(10D)." },
                ].map((pt, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "var(--brand-2)", marginTop: 9 }}
                    />
                    <div>
                      <span className="font-medium text-[15px]" style={{ color: "var(--fg)" }}>{pt.t} — </span>
                      <span className="text-[15px] leading-[1.65]" style={{ color: "var(--fg-muted)" }}>{pt.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/services/healthinsurance.jpg"
                alt="Life insurance protection"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/3", maxHeight: 480 }}
              />
              <div
                className="absolute bottom-6 left-6 px-5 py-4 rounded-xl"
                style={{
                  background: "var(--bg-elev)",
                  border: "1px solid var(--rule)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <p className="text-[11px] tracking-[0.14em] uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}>
                  Claim settlement
                </p>
                <p className="leading-none" style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--brand)" }}>
                  96.4%
                </p>
                <p className="text-[12px] mt-1" style={{ color: "var(--fg-muted)" }}>assisted claims settled</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── KEY BENEFITS ── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Why life insurance"
            title={<>Four things cover <span className="italic-serif">actually does.</span></>}
            intro="Most people buy life insurance for the wrong reasons — returns, tax saving, investment. Here's what it's actually for."
            align="split"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="p-7 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl h-full">
                  <div className="text-[36px] mb-4">{b.icon}</div>
                  <h4 className="text-[22px] mb-3">{b.t}</h4>
                  <p className="text-[13px] leading-[1.65] text-[var(--fg-muted)]">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN TYPES ── */}
      <BenefitsGrid
        eyebrow="Six plan categories"
        title={<>Every life stage has <span className="italic-serif">its plan.</span></>}
        intro="We don't sell the same plan to everyone. The right product depends on your age, income, dependants and existing liabilities."
        items={PLAN_TYPES}
        columns={3}
      />

     

      {/* ── CALCULATOR ── */}
      <section className="section bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
        <div className="container">
          <SectionHeader
            eyebrow="How much cover do you need?"
            title={<>Calculate your <span className="italic-serif">ideal term cover.</span></>}
            intro="A working rule: 15–20× annual income + outstanding loans. Use our goal calculator to model the exact corpus your family would need."
            align="split"
          />

          

          <div className="p-6 lg:p-10 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
            <CalculatorSuite initial="goal" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <ServiceProcess steps={PROCESS} />

      {/* ── CONTENT + LEAD FORM ── */}
      <section className="section">
        <div className="container">
          <StickyLead title="Get a callback from our life desk">
            <div className="eyebrow mb-6">Three things to know before you buy</div>
            <h2 className="pb-8">
              Buy <span className="italic-serif">early.</span> Buy <span className="italic-serif">enough.</span> Tell the truth.
            </h2>
            <div className="flex flex-col gap-6 text-[16px] leading-[1.7] text-[var(--fg-muted)]">
              <div>
                <strong className="text-[var(--fg)]">1. Buy young — the cost difference is enormous.</strong>{" "}
                A 28-year-old pays roughly half what a 38-year-old pays for identical ₹1 Cr term cover. The premium you pay at 28 is locked for the full term. The single biggest factor in lifetime insurance cost is when you start.
              </div>
              <div>
                <strong className="text-[var(--fg)]">2. Cover, not return.</strong>{" "}
                If you're evaluating term insurance by its maturity value, you've misunderstood it. The 99% chance you don't claim is not a flaw — it's the entire point. Separate your insurance from your investment. Always.
              </div>
              <div>
                <strong className="text-[var(--fg)]">3. Tell the truth on the proposal form.</strong>{" "}
                Medical history non-disclosure is the single most common reason for claim repudiation in India. If you smoke, declare it. If you have diabetes, declare it. The premium difference is far smaller than the risk of a rejected claim.
              </div>
              <div>
                <strong className="text-[var(--fg)]">4. Check the claim settlement ratio — not just the premium.</strong>{" "}
                A plan that's ₹2,000 cheaper per year but has a claim settlement ratio of 91% vs 98% is a false economy. We only recommend insurers with CSR above 96% for the last 3 consecutive years.
              </div>
            </div>

            {/* Disclaimer */}
            <div
              className="mt-10 p-5 rounded-xl text-[12px] leading-[1.7]"
              style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--fg-muted)" }}
            >
              <strong className="text-[var(--fg)] block mb-1">IRDAI Disclaimer</strong>
              Insurance is the subject matter of solicitation. Please read the policy wordings carefully before purchasing.
              Tax benefits are subject to changes in applicable tax laws. The company reserves the right to accept or reject any proposal at its sole discretion.
              Claim settlement is subject to policy terms and conditions. Pingale Financial Services · IRDAI Corporate Broker License No. CB-XXXXXXX/XX/2024.
            </div>
          </StickyLead>
        </div>
      </section>

      {/* ── INSURER STATS BAR ── */}
      <section className="section-sm bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {STATS.map((s, i) => (
              <div key={i}>
                <div
                  className="leading-none mb-2"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,48px)", color: "var(--brand)" }}
                >
                  {s.v}
                </div>
                <div className="text-[13px] text-[var(--fg-muted)]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MiniFAQ items={FAQS} />

     
    </main>
  );
}
