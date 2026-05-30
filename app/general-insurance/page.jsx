import { buildMetadata, getBreadcrumbSchema, getServiceSchema, pageSEO } from "@/utils/seoConfig";
import SeoWrapper from "@/components/seowrapper/SeoWrapper";
import ServiceProcess from "@/components/ServiceProcess";
import StickyLead from "@/components/StickyLead";
import MiniFAQ from "@/components/MiniFAQ";
import SectionHeader from "@/components/SectionHeader";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import Reveal from "@/components/Reveal";
import generalData from "@/data/general.json";

export const metadata = buildMetadata("general");
export const dynamic = "force-static";

const { insuranceTypes: INSURANCE_TYPES, motorTypes: MOTOR_TYPES, stats: STATS, processSteps: PROCESS, faqs: FAQS } = generalData;

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "General Insurance", href: "/general-insurance" },
]);

const serviceSchema = getServiceSchema(pageSEO.general, "general");

export default function GeneralPage() {
  return (
    <SeoWrapper pageUrl="/general-insurance" schemas={[breadcrumb, serviceSchema]}>
      <main>
        {/* ── WHAT IS GENERAL INSURANCE ── */}
        <section className="section border-b border-[var(--rule)]">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">

              {/* Text */}
              <div>
                <div className="eyebrow mb-5">What is general insurance?</div>
                <h2 className="pb-6">
                  Cover for what you <span className="italic-serif">can't predict.</span>
                </h2>
                <p className="text-[17px] leading-[1.72] text-[var(--fg-muted)] mb-8">
                  General insurance (also called non-life insurance) protects your assets, health and liabilities against unexpected events — accidents, illness, theft, fire, floods and travel emergencies.
                  Unlike life insurance, it covers things rather than people, and most policies renew annually. IRDAI regulates all general insurers in India.
                </p>

                <div className="eyebrow mb-5">Why you need it</div>
                <ul className="flex flex-col gap-4">
                  {[
                    { t: "Health emergencies", d: "A single hospitalisation without health cover can wipe out years of savings. Cashless cover at 10,000+ hospitals prevents that." },
                    { t: "Motor liability", d: "Third-party motor insurance is mandatory by law. Comprehensive cover protects your own vehicle from accident, theft and natural disasters." },
                    { t: "Property protection", d: "Your home is your biggest asset. Fire, flood, earthquake and burglary cover protects its structure and contents." },
                    { t: "Travel & business risk", d: "Trip cancellations, lost baggage, professional liability and cyber risk are routine today. The right policy covers them before they cost you." },
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
                  src="/services/genralinsurances.webp"
                  alt="General insurance coverage"
                  className="w-full rounded-2xl object-cover"
                  style={{ aspectRatio: "4/3", maxHeight: 480 }}
                />
                <div
                  className="absolute bottom-6 left-6 px-5 py-4 rounded-xl"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--rule)", boxShadow: "var(--shadow-md)" }}
                >
                  <p className="text-[11px] tracking-[0.14em] uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}>
                    Insurers on panel
                  </p>
                  <p className="leading-none" style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--brand)" }}>
                    20+
                  </p>
                  <p className="text-[12px] mt-1" style={{ color: "var(--fg-muted)" }}>health, motor, travel & more</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── INSURANCE CATEGORIES ── */}
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Six insurance categories"
              title={<>Complete cover, <span className="italic-serif">category by category.</span></>}
              intro="Every type of non-life risk your family or business faces — under one broker relationship. One call, six categories."
              align="split"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INSURANCE_TYPES.map((ins, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="p-7 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl h-full flex flex-col gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-[var(--font-display)] text-[40px] italic text-[var(--brand-2)] leading-none">
                          {ins.n}
                        </span>
                        <span
                          className="text-[10px] tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                          style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
                        >
                          {ins.tag}
                        </span>
                      </div>
                      <h4 className="text-[24px] mb-3">{ins.t}</h4>
                      <p className="text-[13px] leading-[1.65] text-[var(--fg-muted)]">{ins.d}</p>
                    </div>
                    <ul className="flex flex-col gap-2 mt-auto">
                      {ins.highlights.map((h, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-[13px]" style={{ color: "var(--fg-muted)" }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--brand-2)" }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── MOTOR INSURANCE QUICK INFO ── */}
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Motor insurance"
              title={<>Third-party vs comprehensive — <span className="italic-serif">know the difference.</span></>}
              align="split"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {MOTOR_TYPES.map((m, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="card h-full">
                    <h4 className="text-[20px] mb-3">{m.t}</h4>
                    <p className="text-[13px] leading-[1.6] text-[var(--fg-muted)]">{m.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALCULATOR ── */}
        <section className="section bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
          <div className="container">
            <SectionHeader
              eyebrow="Financial planning behind your insurance"
              title={<>Know how much <span className="italic-serif">cover you need.</span></>}
              intro="Use our goal and retirement calculators to understand the financial gap your insurance needs to fill — then size your cover accordingly."
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
            <StickyLead title="Get a same-day quote">
              <div className="eyebrow mb-6">Why broker vs buying direct</div>
              <h2 className="pb-8">
                You pay the same premium. <span className="italic-serif">We add the advice.</span>
              </h2>
              <div className="flex flex-col gap-6 text-[16px] leading-[1.7] text-[var(--fg-muted)]">
                <div>
                  <strong className="text-[var(--fg)]">1. Brokers don't cost extra.</strong>{" "}
                  Insurance premiums are the same whether you buy directly from the insurer or through us. IRDAI mandates that broker commissions are paid by the insurer from the premium — not added on top. You get professional advice at no extra cost.
                </div>
                <div>
                  <strong className="text-[var(--fg)]">2. We compare; insurers don't.</strong>{" "}
                  An insurer's website will never show you a competitor's plan. We pull quotes from 20+ insurers simultaneously and show you a ranked comparison — premium, claim ratio, exclusions and waiting periods side by side.
                </div>
                <div>
                  <strong className="text-[var(--fg)]">3. Read the exclusions before you need them.</strong>{" "}
                  Most claim disputes stem from exclusions the policyholder didn't know about. We walk through every key exclusion before purchase — maternity waiting periods, pre-existing disease clauses, room rent caps, consumables.
                </div>
                <div>
                  <strong className="text-[var(--fg)]">4. Claims support when it matters most.</strong>{" "}
                  Filing a health or motor claim while managing an emergency is stressful. Our claims team handles all paperwork, TPA coordination, cashless authorisation follow-ups and escalations. You deal with the situation; we deal with the insurer.
                </div>
              </div>

              <div
                className="mt-10 p-5 rounded-xl text-[12px] leading-[1.7]"
                style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--fg-muted)" }}
              >
                <strong className="text-[var(--fg)] block mb-1">IRDAI Disclaimer</strong>
                Insurance is the subject matter of solicitation. Please read the policy wordings carefully before purchasing. Premiums and benefits are subject to change and may vary by insurer.
                All claims are subject to policy terms and conditions. Pingale Financial Services · IRDAI Corporate Broker License No. CB-XXXXXXX/XX/2024 ·
                Grievance Officer: grievance@pingale.in · IRDAI IGMS: igms.irda.gov.in.
              </div>
            </StickyLead>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="section-sm bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
          <div className="container">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
              {STATS.map((s, i) => (
                <div key={i}>
                  <div
                    className="leading-none mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,44px)", color: "var(--brand)" }}
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
    </SeoWrapper>
  );
}
