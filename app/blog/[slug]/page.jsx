"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ARTICLE = {
  category: "Investing",
  date: "Apr 2026",
  readTime: "8 min read",
  title: "The boring case for SIPs over lumpsum, in three charts.",
  intro:
    "Lumpsum may win on a spreadsheet over 20 years — but most people don't behave like spreadsheets. Here's the case for the patience tax that SIPs pay.",
  toc: [
    { id: "the-spreadsheet-problem", label: "The spreadsheet problem" },
    { id: "chart-1-volatility-drag", label: "Chart 1 — Volatility drag" },
    { id: "chart-2-behavioural-alpha", label: "Chart 2 — Behavioural alpha" },
    { id: "chart-3-the-patience-curve", label: "Chart 3 — The patience curve" },
    { id: "why-sips-win-in-practice", label: "Why SIPs win in practice" },
    { id: "key-takeaways", label: "Key takeaways" },
  ],
};

const TOC_IDS = ARTICLE.toc.map((t) => t.id);

const RELATED = [
  { c: "Retirement", t: "The 4% rule, the 25× corpus, and why both are wrong for India.", d: "9 min", date: "Feb 2026", slug: "retirement-corpus" },
  { c: "Behaviour", t: "Why your portfolio's worst enemy is the news app on your phone.", d: "10 min", date: "Jan 2026", slug: "news-app-portfolio" },
  { c: "Investing", t: "On the surprising boredom of getting rich slowly.", d: "7 min", date: "Feb 2026", slug: "boredom-of-getting-rich" },
];

const STATS = [
  { label: "Lumpsum drawdown", value: "−28%", sub: "March 2020 trough" },
  { label: "SIP drawdown", value: "−19%", sub: "Same period" },
  { label: "Recovery gap", value: "4 months", sub: "SIP recovered faster" },
];

const TAKEAWAYS = [
  "Lumpsum outperforms SIPs mathematically — but only when timed perfectly and held without panic. Neither happens reliably.",
  "SIP's real advantage is behavioural: it removes the decision, eliminates timing risk, and automates the single most important investor behaviour (staying invested).",
  "Every rolling 10-year SIP period on the Nifty 500 has been positive since 1995. The floor has been above post-tax FD returns.",
  "The 1.7% annual gap between fund returns and investor returns is closed by SIPs — because SIPs don't let you time it wrong.",
  "Start. Automate. Don't look at the NAV every day. That is the entire playbook.",
];

export default function BlogDetailPage() {
  const [activeSection, setActiveSection] = useState(TOC_IDS[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    TOC_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* ── HERO ── */}
      <section className="pt-14 pb-0">
        <div className="container">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8">
            <Link
              href="/blog"
              className="text-[11px] tracking-[0.12em] uppercase transition-colors"
              style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
              onMouseEnter={e => e.target.style.color = "var(--brand-2)"}
              onMouseLeave={e => e.target.style.color = "var(--fg-muted)"}
            >
              Journal
            </Link>
            <span style={{ color: "var(--fg-soft)" }} className="text-[11px]">/</span>
            <span
              className="text-[11px] tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--brand-2)" }}
            >
              {ARTICLE.category}
            </span>
          </nav>

          {/* Meta pills */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span
              className="text-[11px] tracking-[0.16em] uppercase font-semibold"
              style={{ fontFamily: "var(--font-mono)", color: "var(--brand-2)" }}
            >
              {ARTICLE.category}
            </span>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--fg-soft)" }} />
            <span
              className="text-[11px] tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
            >
              {ARTICLE.date}
            </span>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--fg-soft)" }} />
            <span
              className="text-[11px] tracking-[0.12em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
            >
              {ARTICLE.readTime}
            </span>
          </div>

          {/* Title */}
          <h1
            className="pb-7 leading-[1.04]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.5vw, 66px)",
              fontWeight: 400,
              maxWidth: 860,
              color: "var(--fg)",
            }}
          >
            {ARTICLE.title}
          </h1>

          {/* Deck */}
          <p
            className="pb-10 leading-[1.65]"
            style={{
              fontSize: 18,
              color: "var(--fg-muted)",
              maxWidth: 620,
            }}
          >
            {ARTICLE.intro}
          </p>

         
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      <div className="container py-8 lg:py-10">
        <div
          className="w-full rounded-2xl flex items-end p-8"
          style={{ aspectRatio: "21/9", background: "linear-gradient(135deg, #eef7fc 0%, #e8f0f7 60%, #f0f4f8 100%)" }}
        >
          <span
            className="text-[11px] tracking-[0.14em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
          >
            {ARTICLE.category} · {ARTICLE.date}
          </span>
        </div>
      </div>

      {/* ── BODY: sidebar + article ── */}
      <section className="py-16 lg:pb-24">
        <div className="container">
          <div className="flex flex-col gap-0 lg:flex-row lg:gap-16 xl:gap-20 items-start">

            {/* ── SIDEBAR (desktop only) ── */}
            <aside className="hidden lg:block" style={{ width: 200, minWidth: 200 }}>
              <div className="sticky top-28 flex flex-col gap-10">

                {/* TOC */}
                <div>
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase mb-4"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                  >
                    In this essay
                  </p>
                  <nav className="flex flex-col">
                    {ARTICLE.toc.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block py-2 pl-3 text-[13px] leading-[1.45] no-underline transition-all duration-200"
                          style={{
                            borderLeft: `2px solid ${isActive ? "var(--brand-2)" : "var(--rule)"}`,
                            color: isActive ? "var(--fg)" : "var(--fg-muted)",
                            fontWeight: isActive ? 500 : 400,
                          }}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </nav>
                </div>

                {/* Share */}
                <div>
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase mb-4"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                  >
                    Share
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "LinkedIn", icon: "in" },
                      { label: "Twitter / X", icon: "𝕏" },
                      { label: "WhatsApp", icon: "W" },
                    ].map((s) => (
                      <button
                        key={s.label}
                        className="flex items-center gap-3 text-[13px] cursor-pointer bg-transparent border-0 p-0 transition-colors duration-200"
                        style={{ color: "var(--fg-muted)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
                      >
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                          style={{ border: "1px solid var(--rule)" }}
                        >
                          {s.icon}
                        </span>
                        {s.label}
                      </button>
                    ))}
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-3 text-[13px] cursor-pointer bg-transparent border-0 p-0 transition-colors duration-200"
                      style={{ color: "var(--fg-muted)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] shrink-0"
                        style={{ border: "1px solid var(--rule)" }}
                      >
                        {copied ? "✓" : "⎘"}
                      </span>
                      {copied ? "Copied!" : "Copy link"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── ARTICLE ── */}
            <article className="w-full min-w-0 max-w-[720px]">

              {/* Section 1 */}
              <h2
                id="the-spreadsheet-problem"
                className="pb-5 scroll-mt-32 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px,3vw,30px)",
                  fontWeight: 400,
                  color: "var(--fg)",
                }}
              >
                The spreadsheet problem
              </h2>
              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>If you have ₹12 lakh sitting in a savings account and the Sensex drops 20% next month, a lumpsum investor buys more units for the same money. Mathematics is unambiguous: buy at the dip, hold for 20 years, retire richer.</p>
                <p>The problem is that most of us don't have ₹12 lakh sitting idle. And even if we do, a 20% market drop doesn't feel like an opportunity — it feels like a catastrophe. The news is screaming. Your neighbour has stopped checking his demat account. Your spouse is asking if you should "do something."</p>
                <p>Spreadsheets don't have families. People do.</p>
              </div>

              {/* Pull quote — navy */}
              <blockquote
                className="my-10 py-1 pl-7"
                style={{ borderLeft: "3px solid var(--brand)", margin: "40px 0" }}
              >
                <p
                  className="italic leading-[1.35]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(19px,2.4vw,24px)",
                    color: "var(--fg)",
                  }}
                >
                  "Lumpsum wins on a spreadsheet over 20 years. SIPs win across the emotional bandwidth of actual human investors."
                </p>
              </blockquote>

              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>This is what we mean when we say lumpsum investing works in theory. It requires near-perfect behaviour: buying without hesitation at troughs, holding through multi-year drawdowns, ignoring every bear-market narrative, and keeping your job so the money stays invested. Most investors fail at least one of these.</p>
              </div>

              {/* Section 2 */}
              <h2
                id="chart-1-volatility-drag"
                className="mt-14 pb-5 scroll-mt-32 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px,3vw,30px)",
                  fontWeight: 400,
                  color: "var(--fg)",
                }}
              >
                Chart 1 — Volatility drag
              </h2>
              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>The first chart compares a ₹12 lakh lumpsum against a ₹1 lakh/month SIP over 12 months starting January 2020 — right before Covid.</p>
              </div>

              {/* Chart block */}
              <div
                className="my-8 p-6 rounded-xl"
                style={{ border: "1px solid var(--rule)", background: "var(--paper-2)" }}
              >
                <p
                  className="text-[11px] tracking-[0.12em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                >
                  Chart 1
                </p>
                <p
                  className="text-[20px] pb-5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                >
                  Lumpsum vs SIP · Jan 2020 entry
                </p>
                <div
                  className="w-full rounded-xl flex items-center justify-center"
                  style={{ aspectRatio: "16/7", background: "var(--paper)", border: "1px dashed var(--rule)" }}
                >
                  <span className="text-[11px] tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-soft)" }}>
                    Chart image
                  </span>
                </div>
                <p
                  className="text-[11px] tracking-[0.04em] mt-3"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                >
                  Source: BSE Sensex daily data. Illustrative — past performance does not indicate future returns.
                </p>
              </div>

              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>The lumpsum investor watched their ₹12 lakh shrink to ₹8.6 lakh by March 2020 — a 28% paper loss in 11 weeks. The SIP investor, meanwhile, had deployed only ₹3 lakh and saw a loss of roughly ₹75,000. Emotionally painful — behaviourally, survivable.</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-1 gap-3 my-8 sm:grid-cols-3">
                {STATS.map((m) => (
                  <div
                    key={m.label}
                    className="p-5 rounded-xl"
                    style={{ border: "1px solid var(--rule)", background: "var(--bg-elev)" }}
                  >
                    <p
                      className="text-[10px] tracking-[0.14em] uppercase mb-2"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                    >
                      {m.label}
                    </p>
                    <p
                      className="leading-none mb-1"
                      style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--brand)" }}
                    >
                      {m.value}
                    </p>
                    <p className="text-[12px]" style={{ color: "var(--fg-muted)" }}>{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Section 3 */}
              <h2
                id="chart-2-behavioural-alpha"
                className="mt-14 pb-5 scroll-mt-32 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px,3vw,30px)",
                  fontWeight: 400,
                  color: "var(--fg)",
                }}
              >
                Chart 2 — Behavioural alpha
              </h2>
              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>The term "behavioural alpha" was coined by Vanguard's research desk in 2019. It describes the return advantage that comes not from picking better stocks, but from avoiding panic-selling. Morningstar's mind-the-gap studies show Indian equity fund investors consistently earn 1.5–2% less per year than the funds they hold — because they buy after rallies and sell after drops.</p>
                <p>A SIP removes the decision. The money leaves your account on the 5th of every month. You can't time it wrong because you're not timing it at all.</p>
              </div>

              {/* Chart block */}
              <div
                className="my-8 p-6 rounded-xl"
                style={{ border: "1px solid var(--rule)", background: "var(--paper-2)" }}
              >
                <p
                  className="text-[11px] tracking-[0.12em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                >
                  Chart 2
                </p>
                <p
                  className="text-[20px] pb-5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                >
                  Actual investor returns vs fund NAV returns · 2014–2024
                </p>
                <div
                  className="w-full rounded-xl flex items-center justify-center"
                  style={{ aspectRatio: "16/7", background: "var(--paper)", border: "1px dashed var(--rule)" }}
                >
                  <span className="text-[11px] tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-soft)" }}>
                    Chart image
                  </span>
                </div>
                <p
                  className="text-[11px] tracking-[0.04em] mt-3"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                >
                  Source: AMFI India, Morningstar. Fund-weighted average, large-cap equity category.
                </p>
              </div>

              {/* Pull quote — sky */}
              <blockquote
                className="py-1 pl-7"
                style={{ borderLeft: "3px solid var(--brand-2)", margin: "40px 0" }}
              >
                <p
                  className="italic leading-[1.35]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(19px,2.4vw,24px)",
                    color: "var(--brand-2)",
                  }}
                >
                  "The 1.7% annual gap between what funds earned and what investors earned is not a market problem. It is a human problem."
                </p>
              </blockquote>

              {/* Section 4 */}
              <h2
                id="chart-3-the-patience-curve"
                className="mt-14 pb-5 scroll-mt-32 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px,3vw,30px)",
                  fontWeight: 400,
                  color: "var(--fg)",
                }}
              >
                Chart 3 — The patience curve
              </h2>
              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>The third chart is the one that tends to end arguments. It plots rolling 10-year SIP returns on the Nifty 500 since 1995. Every single 10-year SIP period has been positive. The worst outcome: 7.2% XIRR. The median: 14.1%.</p>
                <p>This isn't cherry-picked. This includes the dot-com crash, 2008, the Eurozone crisis, demonetisation, IL&FS, Covid. Every single one.</p>
              </div>

              {/* Chart block */}
              <div
                className="my-8 p-6 rounded-xl"
                style={{ border: "1px solid var(--rule)", background: "var(--paper-2)" }}
              >
                <p
                  className="text-[11px] tracking-[0.12em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                >
                  Chart 3
                </p>
                <p
                  className="text-[20px] pb-5"
                  style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                >
                  Rolling 10-year SIP XIRR · Nifty 500 · 1995–2024
                </p>
                <div
                  className="w-full rounded-xl flex items-center justify-center"
                  style={{ aspectRatio: "16/7", background: "var(--paper)", border: "1px dashed var(--rule)" }}
                >
                  <span className="text-[11px] tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-soft)" }}>
                    Chart image
                  </span>
                </div>
                <p
                  className="text-[11px] tracking-[0.04em] mt-3"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
                >
                  Source: NSE India, Nifty 500 TRI. SIP on the 1st of each month. XIRR = annualised internal rate of return.
                </p>
              </div>

              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>The floor keeps moving up as Indian corporate earnings compound. A 7.2% floor sounds modest until you compare it to a 6.5% FD that is taxable. Net of 30% tax, that FD yields roughly 4.5%. The SIP floor has been above that, even in the worst decade.</p>
              </div>

              {/* Section 5 */}
              <h2
                id="why-sips-win-in-practice"
                className="mt-14 pb-5 scroll-mt-32 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px,3vw,30px)",
                  fontWeight: 400,
                  color: "var(--fg)",
                }}
              >
                Why SIPs win in practice
              </h2>
              <div className="flex flex-col gap-5 mb-6" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--fg-muted)" }}>
                <p>Lumpsum investing requires three things: available capital, accurate timing, and behavioural discipline. Most retail investors have difficulty with at least two of these at any given moment.</p>
                <p>SIP investing requires only one: showing up. Set it up, forget about it, and let compounding do the heavy lifting. The monthly forced-saving also builds a habit that lumpsum investing, by definition, cannot.</p>
                <p>We've had clients ask us: "Should I stop my SIP and wait for the market to correct?" The answer is almost always no. Not because corrections don't happen — they do, reliably. But because people who pause their SIPs to wait for a correction rarely restart them at the correction. They restart them after the recovery, at higher NAVs, having missed the very opportunity they waited for.</p>
              </div>

              {/* Pull quote — gold */}
              <blockquote
                className="py-1 pl-7"
                style={{ borderLeft: "3px solid var(--gold)", margin: "40px 0" }}
              >
                <p
                  className="italic leading-[1.35]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(19px,2.4vw,24px)",
                    color: "var(--gold)",
                  }}
                >
                  "Doing nothing is the hardest investment strategy to sell, and the easiest to execute. A SIP is automated 'doing nothing.'"
                </p>
              </blockquote>

              {/* Section 6 */}
              <h2
                id="key-takeaways"
                className="mt-14 pb-5 scroll-mt-32 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px,3vw,30px)",
                  fontWeight: 400,
                  color: "var(--fg)",
                }}
              >
                Key takeaways
              </h2>

              {/* Takeaways box */}
              <div
                className="my-8 p-7 rounded-xl"
                style={{ border: "1px solid var(--brand)", background: "var(--bg-elev)" }}
              >
                <p
                  className="text-[10px] tracking-[0.18em] uppercase mb-6"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--brand-2)" }}
                >
                  Summary · Five points
                </p>
                <ol className="flex flex-col gap-5 list-none p-0 m-0">
                  {TAKEAWAYS.map((point, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span
                        className="italic shrink-0 leading-none mt-1"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 20,
                          color: "var(--brand-2)",
                          minWidth: 28,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[15px] leading-[1.65] m-0" style={{ color: "var(--fg-muted)" }}>
                        {point}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Inline CTA */}
              <div
                className="mt-12 p-7 rounded-2xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                style={{ border: "1px solid var(--rule)", background: "var(--paper-2)" }}
              >
                <div>
                  <p
                    className="text-[22px] mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                  >
                    Want to start a SIP?
                  </p>
                  <p className="text-[14px] m-0" style={{ color: "var(--fg-muted)" }}>
                    We can set one up in 20 minutes. First meeting is always free.
                  </p>
                </div>
                <a href="/contact" className="btn btn-primary shrink-0">Talk to us →</a>
              </div>

            </article>
          </div>
        </div>
      </section>

      {/* ── MOBILE SHARE (hidden on lg+) ── */}
      <div
        className="lg:hidden py-10"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <div className="container">
          <p
            className="text-[11px] tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}
          >
            Share this essay
          </p>
          <div className="flex gap-3 flex-wrap">
            {["LinkedIn", "Twitter / X", "WhatsApp"].map((s) => (
              <button key={s} className="btn btn-secondary" style={{ fontSize: 13, padding: "10px 18px" }}>
                {s}
              </button>
            ))}
            <button
              onClick={copyLink}
              className="btn btn-secondary"
              style={{ fontSize: 13, padding: "10px 18px" }}
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
      </div>

    

      {/* ── RELATED POSTS ── */}
      <section
        className="py-16 lg:py-24"
        style={{ borderTop: "1px solid var(--rule)", background: "var(--paper-2)" }}
      >
        <div className="container">
          <div className="eyebrow mb-10">More from the journal</div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED.map((p, i) => (
              <article key={i} className="flex flex-col gap-4">
                {/* Category accent bar */}
                <div className="h-1 rounded-full w-10" style={{ background: "var(--brand-2)" }} />
                <span
                  className="text-[11px] tracking-[0.14em] uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--brand-2)" }}
                >
                  {p.c} · {p.date}
                </span>
                <h4
                  className="flex-1 leading-[1.2]"
                  style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--fg)" }}
                >
                  {p.t}
                </h4>
                <p className="text-[13px] m-0" style={{ color: "var(--fg-muted)" }}>{p.a} · {p.d} read</p>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-[13px] font-medium self-start transition-colors"
                  style={{ color: "var(--brand-2)", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.textDecoration = "underline"}
                  onMouseLeave={e => e.target.style.textDecoration = "none"}
                >
                  Read essay →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

   

    </main>
  );
}
