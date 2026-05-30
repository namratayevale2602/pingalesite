"use client";

import { useState, useEffect } from "react";

/* Each testimonial has a RESULT + the emotional context — not just nice words */
const TESTIMONIALS = [
  {
    result: "Claim settled in 9 days.",
    story: "When my husband passed, I didn't know where to start. Pingale's team handled every document, every call, every follow-up. I didn't have to fight the insurer. They fought for me. The claim was settled in nine days. Nine days. I have never forgotten that.",
    name: "Priya M.",
    role: "Homemaker · Nashik",
    since: "Client since 2016",
    service: "Life Insurance",
  },
  {
    result: "Retired at 58. Zero financial stress.",
    story: "Pingale wrote a plan for me in 2008 when I was 36. It covered retirement, my daughter's education, and a contingency fund. I thought it was too detailed. But we followed it — through two market crashes and a job change. I retired at 58 with exactly the corpus they projected.",
    name: "Anil V.",
    role: "Retired engineer · Nashik",
    since: "Client since 2008",
    service: "Retirement Planning",
  },
  {
    result: "₹5k/month → Daughter at Oxford.",
    story: "I started a ₹5,000/month SIP in 2012 when my daughter was four. Pingale's advice was simple: pick a good fund, step it up 10% every year, don't touch it. Fourteen years later, that fund is paying her first year at Oxford — from the returns alone. I didn't touch the principal.",
    name: "Suresh N.",
    role: "Business owner · Nashik",
    since: "Client since 2012",
    service: "SIP & Mutual Funds",
  },
  {
    result: "Found ₹40L I didn't know I was losing.",
    story: "My audit with Pingale revealed I had four overlapping insurance policies and three underperforming funds from three different advisors. In one meeting, they showed me I was paying ₹40L more over 20 years than I needed to. Consolidating everything took six weeks. The savings were immediate.",
    name: "Rakesh T.",
    role: "Doctor · Nashik",
    since: "Client since 2019",
    service: "Financial Planning",
  },
];

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (next) => {
    setFading(true);
    setTimeout(() => { setIdx(next); setFading(false); }, 250);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((idx + 1) % TESTIMONIALS.length), 8000);
    return () => clearInterval(t);
  }, [idx]);

  const cur = TESTIMONIALS[idx];

  return (
    <section className="section" style={{ background: "var(--navy-900)" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left: Label + nav */}
          <div className="lg:pt-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-[var(--sky-400)]" />
              <span className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--sky-400)]">
                Client stories
              </span>
            </div>

            <h2 className="text-[clamp(32px,4vw,52px)] leading-[1.1] pb-6 font-[var(--font-display)]" style={{ color: "#dbf0f8" }}>
              Results matter.<br />
              <span className="italic text-[var(--sky-400)]">People remember results.</span>
            </h2>

            <p className="text-sm leading-[1.7] mb-8 max-w-[320px]" style={{ color: "#4a8aaa" }}>
              Every story below is a real outcome from a real client. No composite examples. No hypothetical returns.
            </p>

          </div>

          {/* Right: Story card */}
          <div className={`transition-all duration-250 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
            {/* Result headline */}
            <div className="inline-block font-[var(--font-mono)] text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full mb-6 border text-[var(--sky-400)] border-[var(--sky-400)] bg-[var(--sky-400)]/40">
              {cur.service}
            </div>

            <div className="font-[var(--font-display)] text-[clamp(24px,3.5vw,40px)] leading-[1.15] italic mb-6 text-[var(--sky-400)]">
              &ldquo;{cur.result}&rdquo;
            </div>

            <p className="text-[16px] leading-[1.8] pb-8" style={{ color: "#a8cce0" }}>
              {cur.story}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: "#0b3245" }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-[var(--font-display)] text-[20px] bg-[var(--sky-400)] text-[var(--navy-900)]">
                {cur.name[0]}
              </div>
              <div>
                <div className="text-[15px] font-medium" style={{ color: "#dbf0f8" }}>{cur.name}</div>
                <div className="text-[12px] font-[var(--font-mono)] tracking-[0.06em]" style={{ color: "#4a8aaa" }}>
                  {cur.role} · {cur.since}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1.5 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    i === idx ? "bg-[var(--sky-400)]" : "bg-[#0b3245]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
