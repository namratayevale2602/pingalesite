import PageHero from "@/components/PageHero";
import BenefitsGrid from "@/components/BenefitsGrid";
import CTASection from "@/components/home/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import aboutData from "@/data/about.json";

export const metadata = {
  title: "About — Pingale Financial Services",
};

const { team: TEAM, convictions: CONVICTIONS, stats: STATS } = aboutData;

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Pingale · Est. 1993"
        title={<>A small practice, <span className="italic-serif">deliberately.</span></>}
        intro="Three generations of Pingales have advised on roughly ₹4,200 Cr of household wealth. We've stayed small on purpose — so that every family knows their advisor by name."
      />

      {/* ── OUR STORY ── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-14 items-start about-grid lg:grid-cols-2">

            {/* Founder image */}
            <div className="relative">
              <img
                src="/team/founder.jpg"
                alt="Vasant Pingale — founder, 1993"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/5", maxHeight: 580, background: "var(--paper-2)" }}
              />
              <div
                className="absolute bottom-5 left-5 px-4 py-3 rounded-xl text-left"
                style={{ background: "var(--bg-elev)", border: "1px solid var(--rule)", boxShadow: "var(--shadow-md)" }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--fg)" }}>Vasant Pingale</p>
                <p className="text-[12px] mt-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)", letterSpacing: "0.08em" }}>
                  FOUNDER · 1993
                </p>
              </div>
            </div>

            {/* Story text */}
            <div className="lg:pt-4">
              <div className="eyebrow mb-5">Our story</div>
              <h2 className="mb-6">From <span className="italic-serif">two ledgers</span> to four offices.</h2>
              <div className="flex flex-col gap-5 text-[16px] leading-[1.72]" style={{ color: "var(--fg-muted)" }}>
                <p>Pingale Financial Services began in 1993 in a small office above a chemist in Pune. Vasant Pingale, then a recently-retired bank manager, decided his neighbours deserved better financial advice than the city offered.</p>
                <p>Over three decades it has grown — slowly, deliberately — into a 42-person practice serving 8,400 families across Pune, Mumbai and Bengaluru, with sister advisors in Dubai and Singapore for NRI clients.</p>
                <p>The first principle hasn't changed: <em>advise the family, not the product</em>. We still won't take on a family we cannot meet in person at least once a year.</p>
              </div>

              {/* Stat row */}
              <div
                className="grid grid-cols-3 gap-6 mt-10 pt-8"
                style={{ borderTop: "1px solid var(--rule)" }}
              >
                {STATS.map((s, i) => (
                  <div key={i}>
                    <p className="leading-none mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,36px)", color: "var(--brand)" }}>
                      {s.v}
                    </p>
                    <p className="text-[12px]" style={{ color: "var(--fg-muted)" }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="container">
          <SectionHeader
            eyebrow="Our people"
            title={<>The desks <span className="italic-serif">behind the plan.</span></>}
            align="split"
          />
          <div className="grid grid-cols-1 gap-8 team-grid sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <div key={i}>
                <img
                  src={m.img}
                  alt={m.n}
                  className="w-full rounded-2xl object-cover object-top mb-4"
                  style={{ aspectRatio: "4/5", background: "var(--paper)" }}
                />
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--fg)", marginBottom: 4 }}>
                  {m.n}
                </div>
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: "var(--brand-2)", marginBottom: 10, textTransform: "uppercase" }}>
                  {m.r}
                </div>
                <div style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.6 }}>{m.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BenefitsGrid
        eyebrow="What we believe"
        title={<>Six convictions, <span className="italic-serif">held loosely.</span></>}
        items={CONVICTIONS}
      />

      <CTASection />
    </main>
  );
}
