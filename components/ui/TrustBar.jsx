"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 1655, prefix: "₹", suffix: "Cr+", label: "Assets Under Management" },
  { value: 5500, prefix: "", suffix: "+", label: "Happy Investors" },
  { value: 8, prefix: "", suffix: "+ Years", label: "Experience" },
  { value: 13, prefix: "", suffix: "+", label: "Locations" },
];

function useCountUp(end, duration, active) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime = null;
    let frame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, duration, active]);

  return count;
}

function StatCard({ stat, active }) {
  const count = useCountUp(stat.value, 1500, active);

  return (
    <div className="text-center py-6 px-4 transition-all duration-300 hover:scale-105">
      <div className="flex items-baseline justify-center gap-1">
        {stat.prefix && (
          <span className="text-2xl font-bold text-[#165178]">{stat.prefix}</span>
        )}
        <span className="text-4xl md:text-5xl font-bold text-[#165178] tabular-nums">
          {count.toLocaleString("en-IN")}
        </span>
        <span className="text-xl font-semibold text-[#165178]">{stat.suffix}</span>
      </div>
      <p className="text-sm text-[#165178] mt-2 font-medium">{stat.label}</p>
    </div>
  );
}

export default function TrustBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-[#125178] relative overflow-hidden py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg/bg.png')",
      }}
      >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2aa4eb]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="relative">
              <StatCard stat={stat} active={visible} />
              {/* Subtle divider - optional, makes text white */}
              {index < STATS.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}