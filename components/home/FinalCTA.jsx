"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const CTASection = () => {
  const [selectedType, setSelectedType] = useState("HOME");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pingale-theme") || "light";
      setTheme(saved);
    } catch {}

    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const dark = theme === "dark";

  return (
    <section className={`relative py-20 overflow-hidden transition-colors duration-300 ${
      dark ? "bg-[gray-950]" : "bg-[#f6f7f9]"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE SIDE */}
          <div className="relative flex justify-center items-end">
            <div className={`absolute w-[480px] h-[480px] rounded-full top-10 left-10 ${
              dark ? "bg-gray-800" : "bg-[#edf1f6]"
            }`}></div>

            <div className="relative z-10">
              <Image
                src="/images/get-insurance.png"
                alt="Insurance Agent"
                width={500}
                height={650}
                className="object-contain"
              />
            </div>
          </div>

          {/* RIGHT FORM SIDE */}
          <div>
            <p className={`uppercase tracking-[4px] text-sm font-semibold pb-4 ${
              dark ? "text-blue-400" : "text-[#074a6b]"
            }`}>
              Get A Free Estimate
            </p>

            <h2 className={`text-4xl lg:text-5xl leading-tight pb-8 ${
              dark ? "text-gray-100" : "text-[#0d2240]"
            }`}>
              Get an insurance quote to <br /> get started!
            </h2>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-5 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  dark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />

              <input
                type="email"
                placeholder="Email Address"
                className={`w-full px-5 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  dark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className={`w-full px-5 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  dark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />

              <select
                className={`w-full px-5 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  dark
                    ? "bg-gray-800 border-gray-700 text-gray-200"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <option>Select your life stage</option>
                <option>Just starting out (20-30)</option>
                <option>Building family/career (30-45)</option>
                <option>Peak earning (45-60)</option>
                <option>Planning retirement (60+)</option>
              </select>

              <select
                className={`w-full px-5 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  dark
                    ? "bg-gray-800 border-gray-700 text-gray-200"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 7 PM)</option>
                <option value="anytime">Anytime</option>
              </select>

              <textarea
                placeholder="Tell us about your insurance needs..."
                rows="4"
                className={`w-full px-5 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  dark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              ></textarea>

              <button
                type="submit"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-xl shadow-md transition"
              >
                Schedule My Free Call
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
