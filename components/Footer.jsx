"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const SOCIAL_LINKS = [
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/pingale.financial" },
  { name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/company/pingale-financial" },
  { name: "Facebook", icon: FaFacebook, url: "https://facebook.com/pingale.financial" },
  { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/pingale_finserve" },
  { name: "Whatsapp", icon: FaWhatsapp, url: "https://wa.me/919876543210" },
  { name: "Email", icon: FaEnvelope, url: "mailto:hello@pingale.in" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 mb-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo/pingalelogowhite.png"
                alt="Pingale Financial Services"
                className="object-contain"
                style={{ width: 150, height: 150, borderRadius: 8 }}
              />
            </div>
            <p className="max-w-[340px] text-sm leading-[1.7] pb-6 text-[#c9ad82]">
              Three decades of helping Indian families consume thoughtfully, create wealth deliberately, and conserve what matters.
            </p>
            <div className="flex gap-3 flex-wrap">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full inline-flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#26325a] text-[#c9ad82] hover:text-white hover:border-[#c9ad82] hover:bg-[#26325a]"
                  aria-label={social.name}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <social.icon size={16} style={{ display: "block" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4>Services</h4>
            <Link href="/life-insurance">Life Insurance</Link>
            <Link href="/general-insurance">General Insurance</Link>
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
            <a href="tel:+919876543210">+91 98765 43210</a>
            <a href="mailto:hello@pingale.in">hello@pingale.in</a>
            <a className="mt-2 block">Pune · Mumbai · Bengaluru</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex justify-between items-center flex-wrap gap-4 text-[12px] border-[#26325a] text-[#a08a68]">
          <div>© 2026 Pingale Financial Services Pvt. Ltd. · IRDAI Reg. No. PG/1993/IN · AMFI ARN-XXXXXX</div>
          <div className="flex gap-6">
            <a>Privacy</a><a>Terms</a><a>Disclosures</a>
          </div>
        </div>

      
      </div>
    </footer>
  );
}