"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import blogData from "@/data/blog.json";

const BLOG_POSTS = blogData.posts.slice(0, 4);

export default function BlogPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Insights"
          title={<>Read. <span className="italic-serif">Disagree.</span> Discuss.</>}
          intro="A small library of long-form essays — no headlines, no hot takes, no fear-mongering."
          align="split"
          actions={<Link href="/blog" className="btn btn-secondary">All essays <span>→</span></Link>}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <Reveal>
            <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="block h-full no-underline">
              <article className="h-full flex flex-col">
                <div
                  className="w-full rounded-xl overflow-hidden mb-6"
                  style={{ aspectRatio: "16/10", background: "var(--paper-2)" }}
                >
                  <img
                    src={BLOG_POSTS[0].img}
                    alt={BLOG_POSTS[0].t}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.14em] mb-3">
                  {BLOG_POSTS[0].c.toUpperCase()} · {BLOG_POSTS[0].date}
                </span>
                <h3 className="mb-4 text-[36px]">{BLOG_POSTS[0].t}</h3>
                <div className="text-[var(--fg-muted)] text-sm mt-auto">
                  {BLOG_POSTS[0].a} · {BLOG_POSTS[0].d}
                </div>
              </article>
            </Link>
          </Reveal>
          {BLOG_POSTS.slice(1).map((p, i) => (
            <Reveal key={i} delay={(i + 1) * 100}>
              <article className="flex flex-col h-full py-6 border-t border-[var(--rule)]">
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.14em] mb-3">
                  {p.c.toUpperCase()} · {p.date}
                </span>
                <h4 className="mb-4 flex-1 text-[22px]">{p.t}</h4>
                <div className="text-[var(--fg-muted)] text-[12px]">{p.a} · {p.d}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
