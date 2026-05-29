// app/fonts.js
import { DM_Serif_Text, Urbanist, Poppins } from "next/font/google";

// DM Serif Text - for titles
export const dmSerif = DM_Serif_Text({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
  preload: true,
  fallback: ["Georgia", "serif"],
});

// Urbanist - primary font
export const urbanist = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

// Poppins - secondary font
export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
});
