"use client";

import { useState }                          from "react";
import Link                                  from "next/link";
import { ArrowRight, Calculator, TrendingUp, Shield, Car } from "lucide-react";

// Resolve icon by string name — avoids serialising functions across server→client boundary
const ICON_MAP = { TrendingUp, Shield, Car };

/**
 * ServiceCard — reusable card for each financial service.
 *
 * Props:
 *   iconName        string  (key in ICON_MAP)
 *   title           string
 *   description     string
 *   link            string
 *   miniCalculator  boolean  (shows inline SIP calculator — Mutual Fund card only)
 */
export default function ServiceCard({ iconName, title, description, link, miniCalculator = false }) {
  const Icon = ICON_MAP[iconName] ?? TrendingUp;

  const [sip,    setSip]    = useState(5000);
  const [result, setResult] = useState(null);

  function estimateSIP() {
    const r  = 0.12 / 12;           // 1% monthly rate
    const n  = 10 * 12;             // 120 months
    const fv = sip * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    setResult(Math.round(fv));
  }

  return (
    <article className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* Top accent line (reveals on hover) */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-[#2aa4eb] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#2aa4eb]/10 flex items-center justify-center mb-5 group-hover:bg-[#2aa4eb]/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#2aa4eb]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed flex-grow">{description}</p>

      {/* Mini SIP Calculator (Mutual Funds only) */}
      {miniCalculator && (
        <div className="mt-5 p-4 bg-[#125178]/4 rounded-xl border border-[#125178]/10">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-[#125178]" />
            <span className="text-xs font-semibold text-[#125178] uppercase tracking-wide">
              Quick SIP Estimate
            </span>
          </div>

          <div className="flex gap-2 mb-2">
            <div className="relative flex-grow">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">₹</span>
              <input
                type="number"
                min={500}
                max={100000}
                step={500}
                value={sip}
                onChange={(e) => { setSip(Number(e.target.value)); setResult(null); }}
                className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2aa4eb] focus:ring-1 focus:ring-[#2aa4eb]"
                placeholder="Monthly SIP"
              />
            </div>
            <button
              onClick={estimateSIP}
              className="bg-[#125178] hover:bg-[#0d3a57] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Estimate →
            </button>
          </div>

          {result !== null && (
            <p className="text-xs text-gray-600 mt-2">
              Est. value in 10 yrs:{" "}
              <span className="font-bold text-[#125178]">
                ₹{result.toLocaleString("en-IN")}
              </span>
              <span className="text-gray-400"> (at 12% p.a.)</span>
            </p>
          )}
        </div>
      )}

      {/* Learn More */}
      <Link
        href={link}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2aa4eb] hover:text-[#125178] mt-5 transition-colors group/link"
      >
        Learn More
        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
      </Link>
    </article>
  );
}
