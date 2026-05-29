import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 mb-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo/pingalewhite.png"
                alt="Pingale Financial Services"
                className="object-contain"
                style={{ width: 150, height: 150, borderRadius: 8 }}
              />
              
            </div>
            <p className="max-w-[340px] text-sm leading-[1.7] mb-6 text-[#7abcce]">
              Three decades of helping Indian families consume thoughtfully, create wealth deliberately, and conserve what matters.
            </p>
            <div className="flex gap-2">
              {["in", "tw", "yt", "ig"].map((s) => (
                <a key={s} className="w-9 h-9 rounded-full inline-flex items-center justify-center font-[var(--font-mono)] text-[11px] cursor-pointer border border-[#0b3245] text-[#7abcce]">{s}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4>Services</h4>
            <Link href="/life">Life Insurance</Link>
            <Link href="/general">General Insurance</Link>
            <Link href="/sip">SIP &amp; Investments</Link>
            <Link href="/calculators">Calculators</Link>
          </div>

          {/* Company */}
          <div>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/blog">Insights</Link>
            <a>Careers</a>
            <a>Compliance</a>
          </div>

          {/* Resources */}
          <div>
            <h4>Resources</h4>
            <a>Brochure (PDF)</a>
            <a>Claim Assistance</a>
            <a>Help Centre</a>
            <a>FAQs</a>
          </div>

          {/* Contact */}
          <div>
            <h4>Reach Us</h4>
            <a>+91 98765 43210</a>
            <a>hello@pingale.in</a>
            <a className="mt-2">Pune · Mumbai · Bengaluru</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex justify-between items-center flex-wrap gap-4 text-[12px] border-[#0b3245] text-[#4a8aaa]">
          <div>© 2026 Pingale Financial Services Pvt. Ltd. · IRDAI Reg. No. PG/1993/IN · AMFI ARN-XXXXXX</div>
          <div className="flex gap-6">
            <a>Privacy</a><a>Terms</a><a>Disclosures</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t text-[11px] leading-[1.6] italic border-[#0b3245] text-[#2a5a6e]">
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Insurance is the subject matter of solicitation.
        </div>
      </div>
    </footer>
  );
}
