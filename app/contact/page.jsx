import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata = {
  title: "Contact — Pingale Financial Services",
};

const OFFICES = [
  { city: "Pune", addr: "4th Floor, Premier Plaza, Bund Garden Road", phone: "+91 20 2613 8000", email: "pune@pingale.in" },
  { city: "Mumbai", addr: "Express Towers, Nariman Point", phone: "+91 22 6602 4000", email: "mumbai@pingale.in" },
  { city: "Bengaluru", addr: "UB City, Vittal Mallya Road", phone: "+91 80 4044 5000", email: "bengaluru@pingale.in" },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact · The first conversation is free"
        title={<>Forty-five minutes. <span className="italic-serif">One honest plan.</span></>}
        intro="No upsell, no pressure. We'll listen first, sketch a plan, and tell you honestly whether we're the right firm for your situation."
      />

      <section>
        <div className="container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
            <LeadForm title="Book a consultation" subtitle="Tell us a bit about yourself. We'll come back within 24 hours." />
            <div>
              <h3 className="text-[32px] mb-6">Three offices, <span className="italic-serif">one phone tree.</span></h3>
              <div className="flex flex-col gap-0">
                {OFFICES.map((o, i) => (
                  <div key={i} className="py-6 border-b border-[var(--rule)]">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-[26px]">{o.city}</h4>
                      <span className="font-[var(--font-mono)] text-[11px] text-[var(--fg-muted)] tracking-[0.1em]">0{i + 1} / 03</span>
                    </div>
                    <div className="text-[var(--fg-muted)] text-sm leading-[1.6]">{o.addr}</div>
                    <div className="flex gap-6 mt-2 text-sm">
                      <a className="text-[var(--brand-2)]">{o.phone}</a>
                      <a className="text-[var(--brand-2)]">{o.email}</a>
                    </div>
                  </div>
                ))}
                <div className="mt-8 p-6 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
                  <div className="eyebrow mb-4">Or just message us</div>
                  <div className="flex gap-3 flex-wrap">
                    <button className="btn btn-secondary">WhatsApp →</button>
                    <button className="btn btn-secondary">Email a question →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 py-12 bg-[var(--paper-2)] border-t border-[var(--rule)]">
        <div className="container">
          <SectionHeader eyebrow="Office hours" title={<>When you'll <span className="italic-serif">actually</span> reach us.</>} align="split" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { l: "Mon – Fri", h: "09:30 – 18:30 IST", n: "Full team" },
              { l: "Saturday", h: "10:00 – 14:00 IST", n: "Advisor on call" },
              { l: "Sunday", h: "Emergency claims only", n: "+91 98765 43210" },
            ].map((h, i) => (
              <div key={i} className="p-6 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
                <div className="eyebrow mb-3">{h.l}</div>
                <div className="font-[var(--font-display)] text-[32px]">{h.h}</div>
                <div className="text-[13px] text-[var(--fg-muted)] mt-2">{h.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
