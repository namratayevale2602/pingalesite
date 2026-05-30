"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import SectionHeader from "@/components/SectionHeader";

export const metadata = {
  title: "Contact — Pingale Financial Services",
};

// Single office address
const OFFICE = {
  city: "Pune",
  addr: "4th Floor, Premier Plaza, Bund Garden Road, Pune - 411001",
  phone: "+91 20 2613 8000",
  email: "pune@pingale.in",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.000!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0e8b5f0b1c3%3A0x8b4a7d9e2f1b5c6d!2sBund%20Garden%20Road%2C%20Pune!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

const SOCIAL_LINKS = [
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/pingale.financial" },
  { name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/company/pingale-financial" },
  { name: "Facebook", icon: FaFacebook, url: "https://facebook.com/pingale.financial" },
  { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/pingale_finserve" },
  { name: "Whatsapp", icon: FaWhatsapp, url: "https://wa.me/919876543210" },
  { name: "Email", icon: FaEnvelope, url: "mailto:hello@pingale.in" },
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
              
              {/* Single Office Card */}
              <div className="py-6 border-b border-[var(--rule)]">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-[26px]">{OFFICE.city}</h4>
                </div>
                <div className="flex items-start gap-3 text-[var(--fg-muted)] text-sm leading-[1.6] mb-3">
                  <FaMapMarkerAlt className="mt-0.5 flex-shrink-0" />
                  <span>{OFFICE.addr}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm">
                  <a href={`tel:${OFFICE.phone}`} className="flex items-center gap-2 text-[var(--brand-2)] hover:underline">
                    <FaPhoneAlt size={12} /> {OFFICE.phone}
                  </a>
                  <a href={`mailto:${OFFICE.email}`} className="flex items-center gap-2 text-[var(--brand-2)] hover:underline">
                    <FaEnvelope size={12} /> {OFFICE.email}
                  </a>
                </div>
              </div>

              {/* Google Map */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--rule)]">
                <iframe
                  src={OFFICE.mapEmbedUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pingale Financial Office Location"
                />
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-4">
                <div className="eyebrow mb-4">Connect with us</div>
                <div className="flex flex-wrap gap-6">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--brand-2)] transition-colors group"
                    >
                      <social.icon size={20} />
                      <span className="text-xs sm:hidden">{social.name}</span>
                    </a>
                  ))}
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
              { l: "Mon – Fri", h: "09:30 – 18:30 IST", n: "Full team available" },
              { l: "Saturday", h: "10:00 – 14:00 IST", n: "Advisor on call" },
              { l: "Sunday", h: "Emergency claims only", n: <a href="tel:+919876543210" className="text-[var(--brand-2)]">+91 98765 43210</a> },
            ].map((h, i) => (
              <div key={i} className="p-6 bg-[var(--bg-elev)] border border-[var(--rule)] rounded-2xl">
                <div className="eyebrow mb-3">{h.l}</div>
                <div className="font-[var(--font-display)] text-[28px] sm:text-[32px] leading-tight">{h.h}</div>
                <div className="text-[13px] text-[var(--fg-muted)] mt-2">{h.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}