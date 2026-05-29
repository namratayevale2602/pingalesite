"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const DEFAULT_FAQS = [
  {
    question: "What financial services do you provide?",
    answer:
      "We offer a full suite of financial services: mutual fund distribution (SIP & lumpsum), life insurance advisory (term, ULIP, endowment), and general insurance (health, motor, home). We also provide goal-based financial planning, retirement planning, and tax-saving investment guidance.",
  },
  {
    question: "Is there a minimum investment amount?",
    answer:
      "No. You can start a SIP from as little as ₹500 per month. For lumpsum investments, most mutual funds have a minimum of ₹1,000–₹5,000. We work with every budget and scale your plan as your income grows.",
  },
  {
    question: "Do you serve clients outside Nashik?",
    answer:
      "Yes! While we are headquartered in Nashik, we serve clients across Maharashtra and pan-India. All consultations, onboarding, and reviews can be done online or over the phone — so geography is never a barrier.",
  },
  {
    question: "What is your fee structure?",
    answer:
      "For mutual fund distribution, we earn a trail commission from the fund house — there is no direct fee charged to you. For insurance, we earn a brokerage from the insurer. We are committed to full transparency and will always disclose how we earn so there is no conflict of interest.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply book a free 30-minute discovery call through our Contact page. We will understand your financial goals, risk appetite and current situation — then present a tailored plan with zero obligation.",
  },
];

/**
 * FAQAccordion
 * Props:
 *   faqs  — array of { question, answer }  (optional, falls back to DEFAULT_FAQS)
 */
export default function FAQAccordion({ faqs = DEFAULT_FAQS }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#2aa4eb] uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Everything you need to know before you start your financial journey with us.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-[#2aa4eb]/40 shadow-sm" : "border-gray-100"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-semibold leading-snug transition-colors ${
                      isOpen ? "text-[#125178]" : "text-gray-800 group-hover:text-[#125178]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isOpen ? "bg-[#125178] text-white rotate-180" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Answer — CSS grid trick for smooth open/close */}
                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
