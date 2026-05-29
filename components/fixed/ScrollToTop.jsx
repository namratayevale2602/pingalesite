// components/ScrollToTop.js
"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't scroll on first render (prevents page jump on initial load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Force scroll to top on route change
    // Use multiple methods to ensure it works
    const scrollToTop = () => {
      // Method 1: Instant scroll
      window.scrollTo(0, 0);
      
      // Method 2: Using document.documentElement
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // Method 3: Using document.body
      if (document.body) {
        document.body.scrollTop = 0;
      }
      
      // Method 4: Smooth scroll for better UX after instant scroll
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }, 50);
    };

    // Execute scroll
    scrollToTop();
    
    // Double-check after a tiny delay (handles any async rendering)
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}