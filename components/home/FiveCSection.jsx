"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import {
  FaGraduationCap, FaShieldAlt, FaPiggyBank, FaBriefcaseMedical,
  FaChartLine, FaTags, FaPills,
  FaHeartbeat, FaHome, FaBalanceScale, FaCarSide,
  FaUniversity, FaFileExport, FaChartBar,
  FaScroll, FaLandmark, FaHandshake, FaHandHoldingHeart,
  FaRegCalendarAlt, FaLightbulb,
} from "react-icons/fa";

const FIVE_C = [
  {
    key: "consumption",
    label: "Consumption",
    num: "01",
    age: "Age 0 – 25",
    tagline: "The years of growing, before you earn.",
    desc: "From birth through education, every human being purely consumes — food, school, healthcare, clothing. None of it is self-funded. This stage demands parents plan ahead so a child's future stays secure no matter what happens.",
    insight: { label: "Compound magic", val: "₹1.2 Cr", desc: "SIP of ₹2,000/month started at birth, by age 25 at 12% return" },
    products: [
      { icon: FaGraduationCap, name: "Child Education Plan", desc: "Grow a corpus for college & higher education" },
      { icon: FaShieldAlt, name: "Term Insurance (Parents)", desc: "Protect the child if the breadwinner is lost" },
      { icon: FaPiggyBank, name: "Child SIP / ELSS", desc: "Time is the biggest advantage — start early" },
      { icon: FaBriefcaseMedical, name: "Family Health Cover", desc: "Full family medical protection in one policy" },
    ],
    cta: "Talk to an advisor",
    cta2: "Child plan calculator",
    image: "/images/cimg1.webp",
    imageAlt: "Family reviewing monthly budget and spending",
  },
  {
    key: "creation",
    label: "Creation",
    num: "02",
    age: "Age 25 – 50",
    tagline: "Build the wealth that defines your future.",
    desc: "Your prime earning years. Every rupee invested now has maximum time to compound into life-changing wealth. SIPs, mutual funds, and tax-saving instruments form the core of your strategy in this phase.",
    insight: { label: "SIP power", val: "₹1.89 Cr", desc: "₹10,000/month SIP for 25 years at 12% annual return" },
    products: [
      { icon: FaChartLine, name: "SIP / Mutual Funds", desc: "Systematic wealth creation from ₹500/month" },
      { icon: FaShieldAlt, name: "Term Insurance", desc: "Maximum cover at the lowest possible cost" },
      { icon: FaTags, name: "ELSS Tax Saver", desc: "Save tax annually while growing wealth" },
      { icon: FaPills, name: "Health Insurance", desc: "Family floater plan for complete medical cover" },
    ],
    cta: "Start my SIP",
    cta2: "SIP calculator",
    image: "/images/cimg2.webp",
    imageAlt: "Young investor building wealth through systematic investment",
  },
  {
    key: "conservation",
    label: "Conservation",
    num: "03",
    age: "Age 25 – 60",
    tagline: "Protect everything you've worked hard to build.",
    desc: "Conservation runs parallel to Creation. One critical illness, one accident, or one lawsuit can destroy years of accumulated wealth overnight. The right insurance and portfolio protection ensures what you've built can never be taken from you.",
    insight: { label: "Risk reality", val: "1 in 4", desc: "Indians face a critical illness before 65 — cover costs a fraction of the risk" },
    products: [
      { icon: FaHeartbeat, name: "Critical Illness Cover", desc: "Lump sum on major illnesses — cancer, heart attack, stroke" },
      { icon: FaHome, name: "Home Insurance", desc: "Protect your biggest asset from fire, flood, theft" },
      { icon: FaBalanceScale, name: "Portfolio Rebalancing", desc: "Shift from equity to debt as goals approach" },
      { icon: FaCarSide, name: "Motor Insurance", desc: "Full comprehensive cover for your vehicle" },
    ],
    cta: "Review my coverage",
    cta2: "General insurance",
    image: "/images/cimg3.webp",
    imageAlt: "Protected family secure at home with the right insurance coverage",
  },
  {
    key: "continuation",
    label: "Continuation",
    num: "04",
    age: "Age 60+",
    tagline: "Live your retirement completely on your own terms.",
    desc: "Retirement should mean freedom — not dependency on children or running out of savings. Through pension plans, SWPs, and senior health cover, this stage ensures your monthly income never stops and you stay financially independent.",
    insight: { label: "Retirement target", val: "₹3–5 Cr", desc: "Needed at 60 to sustain ₹50,000/month across 25 retirement years" },
    products: [
      { icon: FaUniversity, name: "Pension / Annuity Plan", desc: "Guaranteed monthly income for life after retirement" },
      { icon: FaFileExport, name: "SWP Withdrawal Plan", desc: "Fixed monthly payout from your mutual fund corpus" },
      { icon: FaBriefcaseMedical, name: "Senior Citizen Health Plan", desc: "Comprehensive cover designed for 60+ needs" },
      { icon: FaChartBar, name: "Debt / Fixed Income Funds", desc: "Stable, low-risk returns that protect your corpus" },
    ],
    cta: "Plan my retirement",
    cta2: "Retirement calculator",
    image: "/images/cimg4.webp",
    imageAlt: "Couple planning for retirement and future financial goals",
  },
  {
    key: "contribution",
    label: "Contribution",
    num: "05",
    age: "Legacy",
    tagline: "The wealth you leave is the life you lived.",
    desc: "True wealth outlives the person who created it. The final chapter of your financial journey is the legacy you leave — for family, community, and the causes you believed in. Estate planning ensures it all reaches the right hands.",
    insight: { label: "Legacy gap", val: "22%", desc: "Only 22% of Indians have a written Will — assets can be stuck in courts for years" },
    products: [
      { icon: FaScroll, name: "Will & Nomination", desc: "Legally ensure assets go to who you choose" },
      { icon: FaLandmark, name: "Whole Life Insurance", desc: "Lifelong cover with a guaranteed payout to nominees" },
      { icon: FaHandshake, name: "Wealth Transfer Plan", desc: "Structured, tax-efficient family wealth transfer" },
      { icon: FaHandHoldingHeart, name: "Charitable Giving", desc: "Support causes you care about as part of your plan" },
    ],
    cta: "Plan my legacy",
    cta2: "Talk to advisor",
    image: "/images/cimg5.webp",
    imageAlt: "Three generations of family representing legacy and wealth transfer",
  },
];

/* Equal 72° wedges around a 400x400 wheel, center (200,200), radius 180 */
const SEGMENTS = [
  { d: "M200,200 L200,20 A180,180 0 0,1 371.3,144.4 Z", color: "#0F1A51" },
  { d: "M200,200 L371.3,144.4 A180,180 0 0,1 305.9,345.6 Z", color: "#1a2a72" },
  { d: "M200,200 L305.9,345.6 A180,180 0 0,1 94.1,345.6 Z", color: "#a68256" },
  { d: "M200,200 L94.1,345.6 A180,180 0 0,1 28.7,144.4 Z", color: "#c9a96e" },
  { d: "M200,200 L28.7,144.4 A180,180 0 0,1 200,20 Z", color: "#354280" },
];

const DIVIDERS = [
  [200, 200, 200, 20],
  [200, 200, 371.3, 144.4],
  [200, 200, 305.9, 345.6],
  [200, 200, 94.1, 345.6],
  [200, 200, 28.7, 144.4],
];

/* Label anchor points at the midpoint of each wedge's arc */
const LABEL_POS = [
  { x: 273, numY: 90, nameY: 103, ageY: 116 },
  { x: 325, numY: 228, nameY: 241, ageY: 254 },
  { x: 200, numY: 316, nameY: 329, ageY: 342 },
  { x: 72, numY: 228, nameY: 241, ageY: 254 },
  { x: 124, numY: 90, nameY: 103, ageY: 116 },
];

/* Image with graceful fallback when file doesn't exist yet */
function CImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[var(--paper-2)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--fg-soft)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function FiveCSection() {
  const [active, setActive] = useState(0);
  const s = FIVE_C[active];
  const triggerRefs = useRef([]);
  const timelineRefs = useRef([]);

  /* Desktop: wheel + panel stay pinned in place, invisible triggers (one per
     screen height) drive which stage is active as the user scrolls.
     Mobile: no pinning — the timeline items themselves are the triggers,
     since all stages are visible at once and just get highlighted in turn. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    [...triggerRefs.current, ...timelineRefs.current].forEach(
      (el) => el && observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  const goToStage = (i) => {
    setActive(i);
    triggerRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="The Pingale framework"
          title={<>The five C&apos;s of a <span className="">complete</span> financial life.</>}
          intro="Scroll to move through each stage of life — the wheel highlights where you are — or click any wedge to jump straight there."
          align="split"
        />

        <div className="fivec-track" style={{ "--fc-stages": FIVE_C.length }}>
          {FIVE_C.map((stage, i) => (
            <div
              key={stage.key}
              ref={(el) => (triggerRefs.current[i] = el)}
              data-index={i}
              className="fivec-trigger"
              style={{ top: `${i * 100}vh` }}
            />
          ))}

          <div className="fivec-sticky">
            <div className="fivec-wheel">
              {/* ── Wheel ── */}
              <div className="wheel-col">
                <div className="wheel-svg-wrap">
                  <svg viewBox="0 0 400 400" className="wheel-svg">
                    {SEGMENTS.map((seg, i) => (
                      <path
                        key={i}
                        d={seg.d}
                        fill={seg.color}
                        className={`seg ${active === i ? "active" : ""}`}
                        onClick={() => goToStage(i)}
                      />
                    ))}
                    {DIVIDERS.map(([x1, y1, x2, y2], i) => (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: "var(--bg)" }} strokeWidth="2" />
                    ))}
                    {FIVE_C.map((c, i) => (
                      <g key={c.key} className="seg-label" onClick={() => goToStage(i)}>
                        <text x={LABEL_POS[i].x} y={LABEL_POS[i].numY} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontWeight="700" fontSize="10">{c.num}</text>
                        <text x={LABEL_POS[i].x} y={LABEL_POS[i].nameY} textAnchor="middle" fill="#fff" fontWeight="700" fontSize="11">{c.label}</text>
                        <text x={LABEL_POS[i].x} y={LABEL_POS[i].ageY} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">{c.age}</text>
                      </g>
                    ))}
                    <circle cx="200" cy="200" r="65" style={{ fill: "var(--bg-elev)", filter: "drop-shadow(0 2px 10px rgba(15,26,81,0.18))" }} />
                  </svg>

                  <div className="wheel-center">
                    <div className="wc-label">Stage</div>
                    <div className="wc-name">{s.label}</div>
                    <div className="wc-age">{s.age}</div>
                  </div>
                </div>

                <div className="wheel-legend">
                  {FIVE_C.map((c, i) => (
                    <div
                      key={c.key}
                      className={`wleg ${active === i ? "active" : ""}`}
                      onClick={() => goToStage(i)}
                    >
                      <span className="wleg-dot" style={{ background: SEGMENTS[i].color }} />
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Detail panel: only the active stage ── */}
              <div className="wheel-panel" key={s.key}>
                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[var(--rule)]">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[var(--paper-2)]">
                    <CImage src={s.image} alt={s.imageAlt} />
                  </div>
                  <div>
                    <div className="age-badge"><FaRegCalendarAlt className="inline-block mr-1.5 -mt-0.5" /> {s.age}</div>
                    <div className="wp-stage">{s.num} · {s.label}</div>
                  </div>
                </div>

                <h3 className="text-[clamp(24px,2.8vw,34px)] mb-4">{s.tagline}</h3>
                <p className="text-[var(--fg-muted)] text-[16px] leading-[1.65] mb-6 max-w-[520px]">{s.desc}</p>

                <div className="insight-box mb-6">
                  <div className="insight-label"><FaLightbulb className="inline-block mr-1.5 -mt-0.5" /> {s.insight.label}</div>
                  <div className="insight-val">{s.insight.val}</div>
                  <div className="insight-desc">{s.insight.desc}</div>
                </div>

                <div className="prod-label mb-3">What you need at this stage</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {s.products.map((p) => (
                    <div key={p.name} className="wp-card">
                      <p.icon className="text-[22px] mb-2 text-[var(--brand)]" />
                      <div className="text-[13px] font-semibold text-[var(--fg)] mb-1 leading-tight">{p.name}</div>
                      <div className="text-[12px] text-[var(--fg-soft)] leading-snug">{p.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 flex-wrap mt-6">
                  <button className="btn btn-primary">{s.cta} →</button>
                  <button className="btn btn-secondary">{s.cta2}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: vertical timeline (desktop wheel hidden via CSS) ── */}
        <div className="fivec-timeline">
          {FIVE_C.map((stage, i) => (
            <div
              key={stage.key}
              ref={(el) => (timelineRefs.current[i] = el)}
              data-index={i}
              className={`timeline-item ${i === active ? "active" : ""} ${i < active ? "done" : ""}`}
            >
              <div className="timeline-rail">
                <span
                  className="timeline-dot"
                  style={{ background: SEGMENTS[i].color }}
                  onClick={() => goToStage(i)}
                >
                  {stage.num}
                </span>
                {i < FIVE_C.length - 1 && <span className="timeline-line" />}
              </div>

              <div className="timeline-content">
                <div className="timeline-head" onClick={() => goToStage(i)}>
                  <span className="age-badge"><FaRegCalendarAlt className="inline-block mr-1.5 -mt-0.5" /> {stage.age}</span>
                  <h3 className="timeline-tagline">{stage.tagline}</h3>
                </div>

                <div className="timeline-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-[var(--paper-2)]">
                      <CImage src={stage.image} alt={stage.imageAlt} />
                    </div>
                    <div className="wp-stage">{stage.num} · {stage.label}</div>
                  </div>

                  <p className="text-[var(--fg-muted)] text-[14px] leading-[1.6] mb-4">{stage.desc}</p>

                  <div className="insight-box mb-4">
                    <div className="insight-label"><FaLightbulb className="inline-block mr-1.5 -mt-0.5" /> {stage.insight.label}</div>
                    <div className="insight-val">{stage.insight.val}</div>
                    <div className="insight-desc">{stage.insight.desc}</div>
                  </div>

                  <div className="prod-label mb-3">What you need at this stage</div>
                  <div className="grid grid-cols-2 gap-2">
                    {stage.products.map((p) => (
                      <div key={p.name} className="wp-card wp-card-sm">
                        <p.icon className="text-[18px] mb-1 text-[var(--brand)]" />
                        <div className="text-[12px] font-semibold text-[var(--fg)] mb-1 leading-tight">{p.name}</div>
                        <div className="text-[11px] text-[var(--fg-soft)] leading-snug">{p.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 flex-wrap mt-5">
                    <button className="btn btn-primary">{stage.cta} →</button>
                    <button className="btn btn-secondary">{stage.cta2}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
