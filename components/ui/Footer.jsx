import Link from "next/link";
import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";

/* Inline SVG brand icons — lucide-react v1 removed social brand icons */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LINKS = {
  quickLinks: [
    { label: "Home",           href: "/" },
    { label: "About Us",       href: "/about" },
    { label: "Contact",        href: "/contact" },
    { label: "FAQ",            href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  services: [
    { label: "Mutual Funds",      href: "/services/mutual-funds" },
    { label: "Life Insurance",    href: "/services/life-insurance" },
    { label: "General Insurance", href: "/services/general-insurance" },
    { label: "SIP Planning",      href: "/services/mutual-funds#sip" },
    { label: "Retirement Plan",   href: "/services/mutual-funds#retirement" },
  ],
  learning: [
    { label: "Blog",              href: "/blog" },
    { label: "SIP Calculator",    href: "/calculators#sip" },
    { label: "Lumpsum Calculator",href: "/calculators#lumpsum" },
    { label: "Insurance Estimator",href: "/calculators#insurance" },
    { label: "Glossary",          href: "/glossary" },
  ],
};

const SOCIAL = [
  { icon: FacebookIcon,  href: "#", label: "Facebook" },
  { icon: XIcon,         href: "#", label: "X (Twitter)" },
  { icon: LinkedInIcon,  href: "#", label: "LinkedIn" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d3a57] text-white">

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#2aa4eb] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white tracking-tight">Pingale</span>
                <span className="text-[10px] font-semibold text-[#2aa4eb] tracking-[0.18em] uppercase">Wealth</span>
              </div>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Your trusted partner for goal-based mutual fund investments, life insurance & general insurance. Transparent, unbiased, client-first.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2aa4eb] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {LINKS.quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {LINKS.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2aa4eb] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">Nashik, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#2aa4eb] flex-shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="text-sm text-white/60 hover:text-white transition-colors">
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2aa4eb] flex-shrink-0" />
                <a href="mailto:info@pingalewealth.com" className="text-sm text-white/60 hover:text-white transition-colors">
                  info@pingalewealth.com
                </a>
              </li>
            </ul>

            {/* Learning links */}
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mt-8 mb-4">
              Learning
            </h4>
            <ul className="space-y-2.5">
              {LINKS.learning.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>© {year} Pingale Wealth. All rights reserved.</p>
            <p className="text-center md:text-right max-w-2xl">
              <span className="text-white/30">Disclaimer:</span> Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Insurance is a subject matter of solicitation. AMFI Registered Mutual Fund Distributor.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
