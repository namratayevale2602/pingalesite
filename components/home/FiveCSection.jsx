"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

const FIVE_C = [
  {
    key      : "consumption",
    label    : "Consumption",
    num      : "01",
    title    : "Spending tells the truth.",
    body     : "Before wealth can grow, money has to be seen. Track what leaves you each month and turn invisible drift into deliberate flow.",
    pills    : ["Cashflow audit", "Budget framework", "Lifestyle review"],
    /* Photo: Indian family sitting together reviewing monthly household budget on laptop */
    image    : "/images/fivec-consumption.jpg",
    imageAlt : "Family reviewing monthly budget and spending",
  },
  {
    key      : "creation",
    label    : "Creation",
    num      : "02",
    title    : "Wealth is patience, compounded.",
    body     : "Once consumption is tamed, the surplus has somewhere to go. Systematic investing turns monthly savings into a generational asset base.",
    pills    : ["Goal-mapped SIPs", "Mutual funds", "Tax-efficient portfolios"],
    /* Photo: Young professional checking investment app on phone, upward trending chart visible */
    image    : "/images/fivec-creation.jpg",
    imageAlt : "Young investor building wealth through systematic investment",
  },
  {
    key      : "conservation",
    label    : "Conservation",
    num      : "03",
    title    : "Protect the upside before chasing more.",
    body     : "Term life, health and general insurance are the load-bearing walls beneath the wealth you build. We size cover to your actual life.",
    pills    : ["Term + health audit", "Loan & liability cover", "Claim assistance"],
    /* Photo: Secure Indian family at home — parents with children, warm protective feeling */
    image    : "/images/fivec-conservation.jpg",
    imageAlt : "Protected family secure at home with right insurance coverage",
  },
  {
    key      : "continuation",
    label    : "Continuation",
    num      : "04",
    title    : "Future you, met halfway.",
    body     : "Retirement, child education, pension corpus. Continuation is designing for a self you haven't met yet — and making sure that self is comfortable.",
    pills    : ["Retirement planning", "Child education", "Pension design"],
    /* Photo: Middle-aged couple planning retirement with advisor, reviewing documents */
    image    : "/images/fivec-continuation.jpg",
    imageAlt : "Couple planning for retirement and future financial goals",
  },
  {
    key      : "contribution",
    label    : "Contribution",
    num      : "05",
    title    : "What you leave behind, you give.",
    body     : "Legacy planning, wills, trusts and charitable giving. The final chapter of wealth is its transfer — to the people and causes that matter most.",
    pills    : ["Estate & succession", "Wills & trusts", "Philanthropic giving"],
    /* Photo: Three generations of family together — grandparents, parents, grandchildren */
    image    : "/images/fivec-contribution.jpg",
    imageAlt : "Three generations of family representing legacy and wealth transfer",
  },
];

/* Image with graceful fallback when file doesn't exist yet */
function CImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[var(--paper-2)] rounded-2xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--fg-soft)" strokeWidth="1.5">
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
      className="object-cover rounded-2xl"
      onError={() => setFailed(true)}
    />
  );
}

export default function FiveCSection() {
  const [active, setActive] = useState("consumption");
  const refs = useRef({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4)
            setActive(e.target.dataset.key);
        });
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    Object.values(refs.current).forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="The Pingale framework"
          title={<>The five C&apos;s of a <span className="italic-serif">complete</span> financial life.</>}
          intro="A simple, sequential way to think about money — from what leaves your pocket each month to what you leave behind."
          align="split"
        />

        <div className="fivec-rail">
          {/* ── Sticky rail ── */}
          <div className="rail">
            {FIVE_C.map((c) => (
              <button
                key={c.key}
                className={`rail-item border-0 bg-transparent text-left w-full ${active === c.key ? "active" : ""}`}
                onClick={() => refs.current[c.key]?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                <div className="num">{c.num}</div>
                <div className="label">{c.label}</div>
              </button>
            ))}
          </div>

          {/* ── Content blocks ── */}
          <div>
            {FIVE_C.map((c) => (
              <div
                key={c.key}
                ref={(r) => { refs.current[c.key] = r; }}
                data-key={c.key}
                className="fivec-content-block"
              >
                <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-[5fr_3fr]">

                  {/* Text */}
                  <div>
                    <div className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.18em] uppercase mb-4">
                      {c.num} · {c.label}
                    </div>
                    <h3 className="text-[clamp(26px,3vw,42px)] pb-4">{c.title}</h3>
                    <p className="text-[var(--fg-muted)] text-[16px] leading-[1.65] pb-4 max-w-[440px]">
                      {c.body}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {c.pills.map((p) => (
                        <span key={p} className="pill">{p}</span>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--paper-2)] border border-[var(--rule)]">
                    <CImage src={c.image} alt={c.imageAlt} />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
