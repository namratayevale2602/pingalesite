"use client";
import { useState } from "react";
import Image from "next/image";

const CTASection = () => {
  const [selectedType, setSelectedType] = useState("HOME");

  return (
    <section className="relative bg-[#f6f7f9] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT IMAGE SIDE */}
          <div className="relative flex justify-center items-end">
            {/* Background Shapes */}
            <div className="absolute w-[480px] h-[480px] bg-[#edf1f6] rounded-full top-10 left-10"></div>
            {/* <div className="absolute w-[220px] h-[220px] bg-white rounded-full top-24 right-16 shadow-sm"></div> */}

          

            {/* Agent Image */}
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
            <p className="uppercase tracking-[4px] text-sm text-[#074a6b] font-semibold pb-4">
              Get A Free Estimate
            </p>

            <h2 className="text-4xl lg:text-5xl text-[#0d2240] leading-tight pb-8">
              Get an insurance quote to <br /> get started!
            </h2>


            {/* FORM - same fields, updated UI */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select your life stage</option>
                <option>Just starting out (20-30)</option>
                <option>Building family/career (30-45)</option>
                <option>Peak earning (45-60)</option>
                <option>Planning retirement (60+)</option>
              </select>

              <select
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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