"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const FAQ_DATA = [
  {
    q: "Do I need a lot of money to start?",
    a: "No. We work with clients who start SIPs at ₹1,000/month and clients who invest ₹10 Cr lumpsum. The starting point matters less than starting. Our first meeting is free regardless of how much you have.",
  },
  {
    q: "How are you different from a bank's relationship manager?",
    a: "A bank RM is paid to sell products from that bank's shelf. We are registered with AMFI (mutual funds) and IRDAI (insurance) — which means we can access and compare products across 38 AMCs and 14+ insurers. We show you all the options, not just ours.",
  },
  {
    q: "How does Pingale make money?",
    a: "We earn trail commissions from fund houses and insurers when you invest through us. These are disclosed in full — in writing — before you invest anything. Some clients prefer a fee-only model instead. We offer both. Either way, there are no hidden charges.",
  },
  {
    q: "What happens if my advisor leaves Pingale?",
    a: "Every relationship is co-owned by two advisors and a portfolio analyst. Your plan, your portfolio, and your history stay with the firm — not the individual. You are never left without someone who knows your situation.",
  },
  {
    q: "Is my money safe with you?",
    a: "Your money never sits with us. SIP investments go directly to AMCs (like HDFC, SBI, Axis funds). Insurance premiums go directly to the insurer. We never touch your principal. We are advisors and distributors, not custodians.",
  },
  {
    q: "Can you help with tax planning too?",
    a: "Yes — to a point. We help with tax-efficient investment choices (ELSS, NPS, tax-free bonds) and insurance premium deductions under 80C/80D. For complex tax returns, we partner with CAs and refer you to the right professional.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section bg-[var(--paper-2)] border-t border-[var(--rule)]">
      <div className="container">
        <SectionHeader
          eyebrow="Common questions"
          title={<>The questions <span className="italic-serif">worth asking.</span></>}
          intro="If you're thinking it, someone else already asked it. Plain answers below."
          align="split"
        />

        <div className="max-w-[860px]">
          {FAQ_DATA.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="toggle">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-[var(--fg-muted)]">
          <span>Still have a question?</span>
          <Link href="/contact" className="text-[var(--brand-2)] font-medium hover:underline">
            Ask us directly →
          </Link>
        </div>
      </div>
    </section>
  );
}
