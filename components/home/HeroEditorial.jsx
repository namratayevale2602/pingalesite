"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    image: "/banner/img1.webp",
    imageAlt: "Family reviewing financial plan with Pingale Wealth advisor",
    imageFallbackLabel: "Family · Financial Planning",
    tag: "Goal-Based Financial Planning",
    headline: "Financial planning",
    accent: "that supports,",
    subline: "the life you love.",
    body: "Your financial life is connected — investments, insurance, taxes, retirement, and future goals. We bring everything together into one clear strategy designed around your family's lifestyle and long-term security.",
    primaryCta: { label: "Get my free plan", href: "/contact" },
    secondaryCta: { label: "How we work", href: "/about" },
  },
  {
    id: 2,
    image: "/banner/img2.webp",
    imageAlt: "Young investor watching SIP portfolio grow on mobile app",
    imageFallbackLabel: "SIP · Wealth Growth",
    tag: "Retirement & Wealth Planning",
    headline: "Build your future",
    accent: "step by step",
    subline: "with confidence.",
    body: "Whether it's retiring comfortably, buying your dream home, or supporting your family with confidence, we help you create a financial roadmap that turns future goals into achievable milestones.",
    primaryCta: { label: "Start my SIP", href: "/sip" },
    secondaryCta: { label: "Try the calculator", href: "/calculators" },
  },
  {
    id: 3,
    image: "/banner/img4.webp",
    imageAlt: "Protected Indian family at home, secure and stress-free",
    imageFallbackLabel: "Family · Life Insurance",
    tag: "Investment & Wealth Growth",
    headline: "Build financial freedom",
    accent: "beneath the surface",
    subline: "of opportunity.",
    body: "True wealth is built with discipline, patience, and the right strategy. We help you identify meaningful investment opportunities while creating a strong foundation for long-term financial growth.",
    primaryCta: { label: "Check my cover", href: "/life" },
    secondaryCta: { label: "General insurance", href: "/general" },
  },
  {
    id: 4,
    image: "/banner/img3.webp",
    imageAlt: "Retired couple enjoying financial freedom in their 60s",
    imageFallbackLabel: "Retirement · Freedom",
    tag: "Build your future",
    headline: "Smart financial",
    accent: "planning for the",
    subline: "life you truly want.",
    body: "Long-term wealth doesn't happen overnight. With disciplined SIP investing, smart fund selection, and consistent guidance, we help you grow your money steadily toward your future goals.",
    primaryCta: { label: "Plan my retirement", href: "/sip" },
    secondaryCta: { label: "Retirement calculator", href: "/calculators" },
  },
];

/* ── Image with fallback placeholder (no inline style) ── */
function SlideImage({ src, alt, fallbackLabel, visible }) {
  const [failed, setFailed] = useState(false);

  /* Reset error state when slide changes */
  useEffect(() => { setFailed(false); }, [src]);

  return (
    <div className={`absolute inset-0 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        /* Fallback shown when image file doesn't exist yet */
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[var(--paper-2)]">
          <div className="w-16 h-16 rounded-full bg-[var(--rule)] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <span className="font-[var(--font-mono)] text-[11px] tracking-[0.14em] uppercase text-[var(--fg-soft)]">
            {fallbackLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default function HeroEditorial() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((next) => {
    setFading(true);
    setTimeout(() => {
      setIdx(next);
      setFading(false);
    }, 280);
  }, []);

  const next = useCallback(() => goTo((idx + 1) % SLIDES.length), [idx, goTo]);
  const prev = useCallback(() => goTo((idx - 1 + SLIDES.length) % SLIDES.length), [idx, goTo]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const s = SLIDES[idx];

  return (
    <section className="bg-[var(--bg)] border-b border-[var(--rule)]">

      {/* ── Main hero grid ── */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] lg:min-h-[80vh]">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">

            {/* Tag */}
            <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-300 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              <span className="w-5 h-px bg-[var(--brand-2)]" />
              <span className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--brand-2)]">
                {s.tag}
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-[1.1] tracking-[-0.02em] pb-5 transition-all duration-300 ${fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
            >
              {s.headline}{" "}
              <span className="italic text-[var(--brand-2)]">{s.accent}</span>
              <br />
              <span className="text-[var(--fg-muted)]">{s.subline}</span>
            </h1>

            {/* Body */}
            <p className={`text-[17px] text-[var(--fg-muted)] leading-[1.7] pb-5 max-w-[500px] transition-all duration-300 delay-75 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              {s.body}
            </p>

      

            {/* CTAs */}
            <div className={`flex gap-3 flex-wrap mb-10 transition-all duration-300 delay-100 ${fading ? "opacity-0" : "opacity-100"}`}>
              <Link href={s.primaryCta.href} className="btn btn-primary">
                {s.primaryCta.label} <span>→</span>
              </Link>
              <Link href={s.secondaryCta.href} className="btn btn-secondary">
                {s.secondaryCta.label}
              </Link>
            </div>

         
          </div>

          {/* ── RIGHT: Image + controls ── */}
          <div className="relative hidden lg:flex flex-col justify-center py-12 lg:pl-8">

            {/* Image frame */}
            <div className="relative overflow-hidden rounded-2xl bg-[var(--paper-2)] aspect-[4/3]">
              <SlideImage
                src={s.image}
                alt={s.imageAlt}
                fallbackLabel={s.imageFallbackLabel}
                visible={!fading}
              />

              {/* Slide counter */}
              <div className="absolute bottom-4 right-4 font-[var(--font-mono)] text-[11px] tracking-[0.1em] bg-black/40 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
                {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </div>
            </div>

            {/* Dots + arrows */}
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1 rounded-full border-0 cursor-pointer transition-all duration-300 ${i === idx ? "w-8 bg-[var(--brand)]" : "w-4 bg-[var(--rule)] hover:bg-[var(--fg-muted)]"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-full border border-[var(--rule)] bg-[var(--bg-elev)] flex items-center justify-center cursor-pointer hover:border-[var(--fg)] transition-colors text-[var(--fg)] text-sm"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full border border-[var(--rule)] bg-[var(--bg-elev)] flex items-center justify-center cursor-pointer hover:border-[var(--fg)] transition-colors text-[var(--fg)] text-sm"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile dot nav ── */}
      <div className="flex justify-center gap-2 py-4 lg:hidden">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1 rounded-full border-0 cursor-pointer transition-all duration-300 ${i === idx ? "w-8 bg-[var(--brand)]" : "w-4 bg-[var(--rule)]"}`}
          />
        ))}
      </div>


    </section>
  );
}
