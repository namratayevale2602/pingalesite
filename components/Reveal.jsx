"use client";

import { useRef, useState, useEffect } from "react";

export default function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}
