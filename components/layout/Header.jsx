"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, TrendingUp, Shield, Car, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Mutual Funds",      href: "/services/mutual-funds",      icon: TrendingUp, desc: "SIP, lumpsum & goal-based investing" },
      { label: "Life Insurance",    href: "/services/life-insurance",    icon: Shield,     desc: "Term, ULIP & endowment plans" },
      { label: "General Insurance", href: "/services/general-insurance", icon: Car,        desc: "Health, motor & home insurance" },
    ],
  },
  { label: "Calculators", href: "/calculators" },
  { label: "Contact",     href: "/contact" },
];

export default function Header() {
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [dropdownOpen,   setDropdownOpen]   = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-white shadow-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0F1A51] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-[#0F1A51] tracking-tight">Pingale</span>
              <span className="text-[10px] font-semibold text-[#a68256] tracking-[0.18em] uppercase">Wealth</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#0F1A51] rounded-md transition-colors">
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#0F1A51]/5 group transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#a68256]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#a68256]/20 transition-colors">
                            <child.icon className="w-5 h-5 text-[#a68256]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-[#0F1A51]">{child.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{child.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#0F1A51] rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+91XXXXXXXXXX"
              className="flex items-center gap-1.5 text-sm font-medium text-[#0F1A51] hover:text-[#a68256] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <Link
              href="/contact"
              className="bg-[#a68256] hover:bg-[#8a6a41] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#a68256]/30"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-white z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
                    onClick={() => setMobileServices((v) => !v)}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServices && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-[#0F1A51] hover:bg-[#0F1A51]/5 rounded-xl"
                          onClick={() => setMobileOpen(false)}
                        >
                          <child.icon className="w-4 h-4 text-[#a68256]" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#0F1A51] hover:bg-gray-50 rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                className="block w-full text-center bg-[#a68256] hover:bg-[#8a6a41] text-white font-semibold px-6 py-3 rounded-full transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
