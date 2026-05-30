import { buildMetadata, getBreadcrumbSchema, getServiceSchema, pageSEO } from "@/utils/seoConfig";
import SeoWrapper from "@/components/seowrapper/SeoWrapper";
import SectionHeader from "@/components/SectionHeader";
import ServiceProcess from "@/components/ServiceProcess";
import MiniFAQ from "@/components/MiniFAQ";
import StickyLead from "@/components/StickyLead";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import Reveal from "@/components/Reveal";
import sipData from "@/data/sip.json";

export const metadata = buildMetadata("sip");
export const dynamic = "force-static";

const { fundTypes: FUND_TYPES, riskProfiles: RISK_PROFILES, guidelines: GUIDELINES, faqs: FAQS, processSteps: PROCESS } = sipData;

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "SIP & Investments", href: "/sip" },
]);

const serviceSchema = getServiceSchema(pageSEO.sip, "sip");

export default function SIPPage() {
  return (
    <SeoWrapper pageUrl="/sip" schemas={[breadcrumb, serviceSchema]}>
      <main>
        {/* ── WHAT IS A MUTUAL FUND ── */}
        <section className="section border-b border-[var(--rule)]">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">

              {/* Text */}
              <div>
                <div className="eyebrow mb-5">What is a mutual fund?</div>
                <h2 className="pb-6">
                  A pool of money, <span className="italic-serif">professionally managed.</span>
                </h2>
                <p className="text-[17px] leading-[1.72] text-[var(--fg-muted)] mb-8">
                  A mutual fund collects money from thousands of investors and deploys it into a diversified portfolio of stocks, bonds or both — managed by a SEBI-registered fund manager.
                  Instead of picking individual stocks yourself, you buy units of the fund and benefit from professional management, instant diversification, and SEBI-mandated transparency.
                </p>

                <div className="eyebrow mb-5">Why you need it</div>
                <ul className="flex flex-col gap-4">
                  {[
                    { t: "Beat inflation", d: "Savings accounts yield 3–4%. Inflation runs at 6–7%. Only equity investments close that gap over 10+ years." },
                    { t: "Goal-based saving", d: "Each life goal — a house, a child's college, retirement — has a corpus target. SIPs make the path to that corpus systematic and automatic." },
                    { t: "Tax efficiency", d: "ELSS funds give you ₹1.5L in 80C deductions. Long-term equity gains up to ₹1.25L/year are completely tax-free." },
                    { t: "Liquidity", d: "Unlike FDs or PPF, most mutual funds can be redeemed any business day. Your money is not locked away." },
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
                  src="/services/mutualfunds.webp"
                  alt="Mutual fund investments"
                  className="w-full rounded-2xl object-cover"
                  style={{ aspectRatio: "4/3", maxHeight: 480 }}
                />
                <div
                  className="absolute bottom-6 left-6 px-5 py-4 rounded-xl"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--rule)", boxShadow: "var(--shadow-md)" }}
                >
                  <p className="text-[11px] tracking-[0.14em] uppercase mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}>
                    Nifty 500 · 10-yr SIP
                  </p>
                  <p className="leading-none" style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--brand)" }}>
                    14.1%
                  </p>
                  <p className="text-[12px] mt-1" style={{ color: "var(--fg-muted)" }}>median XIRR since 1995</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FUND CATEGORIES ── */}
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Eight fund categories"
              title={<>Funds for every <span className="italic-serif">goal and horizon.</span></>}
              intro="We map each goal to the right fund category — not the other way around. Here's what each category does."
              align="split"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FUND_TYPES.map((ft, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="card h-full">
                    <div className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.18em] mb-4">
                      0{i + 1}
                    </div>
                    <h4 className="mb-3 text-[22px]">{ft.t}</h4>
                    <p className="text-[var(--fg-muted)] text-sm leading-[1.6]">{ft.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── RISK PROFILES ── */}
        <section className="section bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
          <div className="container">
            <SectionHeader
              eyebrow="Risk profiling"
              title={<>Right fund for <span className="italic-serif">your risk appetite.</span></>}
              intro="Before recommending any fund, we assess your risk tolerance, investment horizon and liquidity needs. Here's how we categorise investors."
              align="split"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {RISK_PROFILES.map((r, i) => (
                <div key={i} className="p-7 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: r.color }} />
                    <span className="font-[var(--font-mono)] text-[11px] tracking-[0.14em] uppercase text-[var(--fg-muted)]">
                      Risk Profile
                    </span>
                  </div>
                  <h3 className="text-[28px] mb-3">{r.level}</h3>
                  <p className="text-[var(--fg-muted)] text-[14px] leading-[1.6]">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALCULATORS ── */}
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Calculators"
              title={<>See what your <span className="italic-serif">money can become.</span></>}
              intro="Interactive calculators for SIP, SWP, retirement corpus, goal planning and more. Adjust inputs — results update instantly."
              align="split"
            />
            <div className="p-6 lg:p-10 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
              <CalculatorSuite initial="sipswp" />
            </div>
          </div>
        </section>

        {/* ── AMFI GUIDELINES DETAIL ── */}
        <section className="section bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
          <div className="container">
            <SectionHeader
              eyebrow="AMFI guidelines · What you should know"
              title={<>Regulations that <span className="italic-serif">protect you.</span></>}
              align="split"
            />
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDELINES.map((g, i) => (
                <div
                  key={i}
                  className="flex gap-5 py-7 px-6"
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <span
                    className="shrink-0 mt-0.5"
                    style={{ width: 6, minWidth: 6, height: 6, borderRadius: "50%", background: "var(--brand-2)", marginTop: 7 }}
                  />
                  <div>
                    <p className="text-[15px] font-medium mb-1.5" style={{ color: "var(--fg)" }}>{g.t}</p>
                    <p className="text-[13px] leading-[1.65]" style={{ color: "var(--fg-muted)" }}>{g.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-8 flex items-start gap-4 p-5 rounded-xl"
              style={{ background: "#fffbeb", border: "1.5px solid #fbbf24" }}
            >
              <span className="text-[20px] shrink-0 leading-none mt-0.5">⚠️</span>
              <p className="text-[13px] leading-[1.75]" style={{ color: "#78350f" }}>
                <strong className="font-semibold" style={{ color: "#92400e" }}>
                  Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
                </strong>{" "}
                Past performance is not an indicator of future returns. Investors should consult their financial adviser if in doubt about whether a product is suitable for them.
                Pingale Financial Services is an AMFI-registered mutual fund distributor (ARN-XXXXXX). We may earn trail commissions on regular plan investments;
                direct plan investments do not attract any commission. Exit loads and expense ratios vary by scheme — please refer to the scheme information document.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <ServiceProcess steps={PROCESS} />

        {/* ── CONTENT + LEAD FORM ── */}
        <section className="section">
          <div className="container">
            <StickyLead title="Start your SIP today">
              <div className="eyebrow mb-6">Why invest through us</div>
              <h2 className="pb-8">
                We plan the <span className="italic-serif">portfolio.</span> You plan the life.
              </h2>
              <div className="flex flex-col gap-6 text-[16px] leading-[1.7] text-[var(--fg-muted)]">
                <div>
                  <strong className="text-[var(--fg)]">1. Written plan first.</strong> Before any fund is selected, we write a financial plan mapping your income, liabilities, goals and timelines. No product before the plan.
                </div>
                <div>
                  <strong className="text-[var(--fg)]">2. AMFI-registered, not product-driven.</strong> As AMFI-registered distributors, we are regulated by SEBI. We do not sell products from a single AMC. You see quotes from all 38 AMCs before deciding.
                </div>
                <div>
                  <strong className="text-[var(--fg)]">3. Direct plans on request.</strong> We offer direct-plan advisory for clients on a flat fee. You keep the commission savings; we get paid transparently.
                </div>
                <div>
                  <strong className="text-[var(--fg)]">4. Step-up mandates by default.</strong> Every SIP we set up includes an annual step-up mandate — typically 10%. Your investments grow with your income automatically.
                </div>
                <div>
                  <strong className="text-[var(--fg)]">5. Tax-loss harvesting.</strong> In every December review, we identify loss-making positions eligible for tax-loss booking under LTCG/STCG. Saves clients an average ₹18,000/year in tax.
                </div>
              </div>

              <div
                className="mt-10 p-5 rounded-xl text-[12px] leading-[1.7]"
                style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--fg-muted)" }}
              >
                <strong className="text-[var(--fg)] block mb-1">AMFI Statutory Disclaimer</strong>
                Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.
                Past performance is not an indicator of future returns. Investors in the schemes are not being offered any guaranteed or assured returns.
                Pingale Financial Services · AMFI Reg. No. ARN-XXXXXX · Valid through 31-Oct-2027 ·
                SEBI registered Investment Adviser — Registration No. INA000000000.
              </div>
            </StickyLead>
          </div>
        </section>

        <MiniFAQ items={FAQS} />
      </main>
    </SeoWrapper>
  );
}
