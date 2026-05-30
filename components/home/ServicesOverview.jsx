import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const SERVICES = [
  { id: "/life-insurance", title: "Life Insurance", desc: "Term, child, retirement, ULIP and family protection plans sized to your life.", items: ["Term plans", "Child plans", "Retirement", "ULIPs"] },
  { id: "/general-insurance", title: "General Insurance", desc: "Health, motor, travel, home and business cover with end-to-end claim support.", items: ["Health", "Motor", "Travel", "Home"] },
  { id: "/sip", title: "SIP & Investments", desc: "Goal-mapped SIPs, mutual funds, tax-saving plans and wealth management.", items: ["SIP planning", "Mutual funds", "Tax saving", "Wealth mgmt"] },
  { id: "/calculators", title: "Planning Tools", desc: "SIP, EMI, retirement, education and term-cover calculators — free, no signup.", items: ["SIP", "EMI", "Retirement", "Education"] },
];

export default function ServicesOverview() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="What we do"
          title={<>Four desks. <span className="italic-serif">One conversation.</span></>}
          intro="We are advisors first, distributors second. Everything we recommend ladders up to a single, written financial plan."
          align="split"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="srv-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <Link href={s.id} style={{ textDecoration: "none", height: "100%", display: "block" }}>
                <div className="card" style={{ cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", minHeight: 320 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--brand-2)", letterSpacing: "0.18em", marginBottom: 16 }}>0{i + 1} / 04</div>
                  <h4 style={{ marginBottom: 12, fontSize: 28 }}>{s.title}</h4>
                  <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.55, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                    {s.items.map((it, j) => (
                      <span key={j} style={{
                        fontSize: 11, padding: "4px 10px",
                        background: "var(--bg)", border: "1px solid var(--rule)",
                        borderRadius: 999, color: "var(--fg-muted)",
                      }}>{it}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--brand-2)", fontWeight: 500 }}>
                    Explore <span>→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .srv-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .srv-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
