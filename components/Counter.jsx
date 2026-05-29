"use client";

import { useRef, useState, useEffect } from "react";

export default function Counter({ to, suffix = "", duration = 1400, prefix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(eased * to);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);

  const display =
    to >= 1000
      ? Math.round(val).toLocaleString("en-IN")
      : Number.isInteger(to)
      ? Math.round(val)
      : val.toFixed(1);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
