"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

export default function MiniFAQ({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Frequently asked"
          title={<>Common questions, <span className="">honestly answered.</span></>}
          align="split"
        />
        <div className="max-w-[880px]">
          {items.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="toggle">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
