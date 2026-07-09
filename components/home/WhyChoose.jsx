import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import { FaTrophy, FaRegCalendarAlt, FaUsers, FaCoins, FaBuilding, FaHandshake } from "react-icons/fa";

const ACHIEVEMENTS = [
  {
    icon: FaTrophy,
    stat: "Zero",
    label: "Claims ever rejected",
    sub: "Every LIC & insurer claim we've filed has been settled — not one refund turned down.",
  },
  {
    icon: FaRegCalendarAlt,
    stat: "33 Years",
    label: "In continuous service",
    sub: "Since 1993 — three decades of the same family-first practice, now in its third generation.",
  },
  {
    icon: FaUsers,
    stat: "8,400+",
    label: "Families served",
    sub: "Across Pune, Mumbai and Bengaluru, with NRI clients in Dubai and Singapore.",
  },
  {
    icon: FaCoins,
    stat: "₹4,200 Cr+",
    label: "Wealth advised",
    sub: "Assets under advisory across SIPs, portfolios and insurance corpora.",
  },
  {
    icon: FaBuilding,
    stat: "4 Offices",
    label: "On-ground presence",
    sub: "Real desks, real people — not a call centre. Meet your advisor in person, every year.",
  },
  {
    icon: FaHandshake,
    stat: "₹120 Cr+",
    label: "Claims settled since 2015",
    sub: "Handled end-to-end by our in-house claims desk — paperwork, follow-ups, escalations.",
  },
];

const DIFFERENCES = [
  {
    num: "01",
    title: "We write the plan first",
    body: "Every client gets a written financial plan before we recommend a single product. If you don't have a plan, you're just buying things.",
  },
  {
    num: "02",
    title: "We compare, not just sell",
    body: "AMFI-registered distributor + IRDAI-licensed broker. We access 14+ insurers and 38 AMCs — and show you all the options, not just the profitable ones.",
  },
  {
    num: "03",
    title: "We're with you at claim time",
    body: "Our claims desk handles documentation, follow-ups, and escalations. Last 5 years: 96.4% of assisted claims settled at first submission.",
  },
  {
    num: "04",
    title: "One advisor, your whole life",
    body: "You're not passed between departments. One advisor knows your entire financial picture — from your SIP to your term plan to your retirement corpus.",
  },
  {
    num: "05",
    title: "No pressure, ever",
    body: "The first meeting is free. If we're not the right firm for your situation, we'll tell you — and refer you to someone who is.",
  },
  {
    num: "06",
    title: "Transparent commissions",
    body: "We earn commissions from fund houses and insurers. We disclose every single one in writing before you sign anything. No surprises.",
  },
];

export default function WhyChoose() {
  return (
    <section className="section border-t border-b border-[var(--rule)]">
      <div className="container">
        <SectionHeader
          eyebrow="Why Pingale"
          title={<>Different isn't a word we use. <span className="italic-serif">Results are.</span></>}
          intro="We've been doing this since 1993. Here's what three decades of client-first practice looks like in practice."
          align="split"
        />

        {/* Achievements */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-14">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card h-full">
                <a.icon className="text-[26px] mb-4 text-[var(--brand)]" />
                <div className="font-[var(--font-display)] text-[clamp(24px,3vw,32px)] leading-none mb-2 text-[var(--fg)]">
                  {a.stat}
                </div>
                <div className="text-[13px] font-semibold text-[var(--brand-2)] uppercase tracking-[0.06em] mb-2">
                  {a.label}
                </div>
                <p className="text-[13px] text-[var(--fg-muted)] leading-[1.6]">{a.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Differentiators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--rule)]">
          {DIFFERENCES.map((d, i) => (
            <div key={i} className="p-7 border-b border-r border-[var(--rule)]">
              <div className="font-[var(--font-mono)] text-[11px] text-[var(--brand-2)] tracking-[0.16em] mb-3">{d.num}</div>
              <h4 className="text-[20px] pb-3">{d.title}</h4>
              <p className="text-sm text-[var(--fg-muted)] leading-[1.65]">{d.body}</p>
            </div>
          ))}
        </div>

        {/* Subtle proof line */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--rule)]">
         
          <Link href="/contact" className="btn btn-primary shrink-0">
            Book 
            a free call <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
