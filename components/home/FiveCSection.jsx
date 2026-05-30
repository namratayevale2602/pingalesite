"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

const FIVE_C = [
{
key      : "consumption",
label    : "Consumption",
num      : "01",
title    : "Every rupee has a direction.",
body     : "Most people don't lose money in one big mistake — they lose it silently, every single month. We help you understand where your money goes, what truly matters, and how mindful spending creates room for bigger dreams.",
pills    : ["Cashflow clarity", "Smart budgeting", "Lifestyle planning"],
image    : "/images/cimg1.webp",
imageAlt : "Family reviewing monthly budget and spending",
},

{
key      : "creation",
label    : "Creation",
num      : "02",
title    : "Small investments. Life-changing outcomes.",
body     : "Wealth rarely arrives overnight. It grows quietly through discipline, consistency, and time. A simple SIP started today can become the freedom your future self thanks you for.",
pills    : ["Goal-based SIPs", "Wealth creation", "Long-term investing"],
image    : "/images/cimg2.webp",
imageAlt : "Young investor building wealth through systematic investment",
},

{
key      : "conservation",
label    : "Conservation",
num      : "03",
title    : "Protect the people behind the plan.",
body     : "One unexpected moment shouldn't destroy years of hard work. Insurance isn't about fear — it's about making sure your family stays financially strong no matter what life brings.",
pills    : ["Life protection", "Health security", "Claim support"],
image    : "/images/cimg3.webp",
imageAlt : "Protected family secure at home with right insurance coverage",
},

{
key      : "continuation",
label    : "Continuation",
num      : "04",
title    : "Plan for the life still waiting ahead.",
body     : "The future isn't just retirement. It's peaceful mornings, your child's education, family vacations, and living without financial stress. We help you prepare for the years you've not yet lived.",
pills    : ["Retirement goals", "Child future planning", "Pension strategies"],
image    : "/images/cimg4.webp",
imageAlt : "Couple planning for retirement and future financial goals",
},

{
key      : "contribution",
label    : "Contribution",
num      : "05",
title    : "True wealth lives beyond your lifetime.",
body     : "The final purpose of wealth is impact — supporting family, creating opportunities, and leaving behind values that last for generations. Because legacy is more than money.",
pills    : ["Legacy planning", "Estate protection", "Family wealth transfer"],
image    : "/images/cimg5.webp",
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
