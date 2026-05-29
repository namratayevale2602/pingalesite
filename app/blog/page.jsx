"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import blogData from "@/data/blog.json";

const BLOG_POSTS = blogData.posts;

const CATEGORIES = ["All", "Investing", "Insurance", "Tax", "Retirement", "Behaviour", "Estate"];

/* Subtle per-category tint used as fallback when image not yet added */
const CAT_BG = {
  Investing:  "#eef7fc",
  Insurance:  "#f0fdf4",
  Tax:        "#fefce8",
  Retirement: "#fdf4ff",
  Behaviour:  "#fff7ed",
  Estate:     "#fef2f2",
};

function BlogImage({ src, alt, aspect = "3/2", category }) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: aspect, background: CAT_BG[category] ?? "var(--paper-2)" }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}
    </div>
  );
}

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest     = BLOG_POSTS.slice(1);
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? rest : rest.filter((p) => p.c === cat);

  return (
    <main>
      <PageHero
        eyebrow="Insights · The Pingale journal"
        title={<>Long-form essays on <span className="italic-serif">money &amp; meaning.</span></>}
        intro="Updated monthly. No clickbait, no fear-mongering, no SEO-bait. Things we'd be willing to say across a dinner table."
      />

      <section className="section">
        <div className="container">

          {/* ── FEATURED ── */}
          <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-[1.4fr_1fr]">
            <BlogImage src={featured.img} alt={featured.t} aspect="16/10" category={featured.c} />
            <div className="flex flex-col justify-center">
              <span className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.14em] mb-4">
                FEATURED · {featured.c.toUpperCase()} · {featured.date}
              </span>
              <h2 className="mb-5">{featured.t}</h2>
              <p className="text-[var(--fg-muted)] text-[16px] leading-[1.6] mb-6 max-w-[480px]">
                Lumpsum may win on a spreadsheet over 20 years — but most people don't behave like spreadsheets. Here's the case for the patience tax that SIPs pay.
              </p>
              <div className="text-[var(--fg-muted)] text-sm mb-6">{featured.a} · {featured.d}</div>
              <Link href={`/blog/${featured.slug}`} className="btn btn-secondary self-start">Read essay →</Link>
            </div>
          </div>

          {/* ── CATEGORY FILTER ── */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className="px-4 py-2 rounded-full text-[13px] cursor-pointer transition-colors border"
                style={{
                  borderColor: cat === c ? "var(--brand)" : "var(--rule)",
                  background:  cat === c ? "var(--brand)" : "transparent",
                  color:       cat === c ? "var(--on-brand)" : "var(--fg-muted)",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* ── POST GRID ── */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <article key={i} className="flex flex-col gap-4 pb-6 border-b border-[var(--rule)]">
                <BlogImage src={p.img} alt={p.t} aspect="3/2" category={p.c} />
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.14em]">
                  {p.c.toUpperCase()} · {p.date}
                </span>
                <h4 className="text-[22px] flex-1">{p.t}</h4>
                <div className="text-[var(--fg-muted)] text-[13px]">{p.a} · {p.d}</div>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-[13px] font-medium text-[var(--brand-2)] hover:underline underline-offset-2 self-start"
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
