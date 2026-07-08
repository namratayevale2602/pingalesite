# PageSpeed Vitals — Fix Task List

> Target: All Core Web Vitals in Green
> Site: Pingale Wealth (pingalewealth.com)
> Framework: Next.js 16 + React 19 + Tailwind CSS 4

---

## Core Web Vitals Targets

| Metric | Green Threshold |
|--------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FCP (First Contentful Paint) | < 1.8s |
| TTFB (Time to First Byte) | < 800ms |
| TBT (Total Blocking Time) | < 200ms |

---

## CRITICAL

- [ ] **1. Hero is `"use client"` — hurts LCP**
  - File: `components/home/HeroEditorial.jsx:1`
  - Slide 1 content is not server-rendered, LCP image loads late
  - Fix: Make slide 1 static HTML (server component), lazy-load carousel JS after hydration

- [ ] **2. All 4 banner images have `priority` — only slide 1 should**
  - File: `components/home/HeroEditorial.jsx:89`
  - Fix: Change to `priority={idx === 0}` — slides 2–4 should not preload

- [ ] **3. Poppins loads all 9 font weights — huge payload**
  - File: `app/fonts.js:26-32`
  - Fix: Change to `weight: ["400", "600"]` only

- [ ] **4. Urbanist loads all 9 font weights**
  - File: `app/fonts.js:15-21`
  - Fix: Change to `weight: ["300", "400", "600", "700"]` only

- [ ] **5. Hero `<Image>` missing `sizes` prop — oversized images served**
  - File: `components/home/HeroEditorial.jsx:83`
  - Fix: Add `sizes="(max-width: 1024px) 100vw, 50vw"` to the Image component

- [ ] **6. Inline MutationObserver script in `<head>` blocks rendering**
  - File: `app/layout.js:162-226`
  - Fix: Remove the script entirely — browser extensions don't affect PageSpeed bot, this is unnecessary in production

- [ ] **7. Missing `preconnect` for fonts.gstatic.com**
  - File: `app/layout.js:157`
  - Fix: Add `<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />`

---

## HIGH PRIORITY

- [ ] **8. `next.config.mjs` missing compression, cache headers, and AVIF format**
  - File: `next.config.mjs`
  - Fix:
    ```js
    const nextConfig = {
      compress: true,
      poweredByHeader: false,
      images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
      },
      async headers() {
        return [{
          source: "/(.*)\\.(webp|png|jpg|ico|woff2)",
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        }];
      },
    };
    ```

- [ ] **9. Logo files are `.jpg` / `.png` — convert to `.webp`**
  - Files: `public/logo/pingalelogo.jpg`, `pinglelogo.jpeg`, `pingalelogorb.png`, `pingalelogowhite.png`, `pingalewhite.png`
  - Fix: Convert all to `.webp` using Squoosh (squoosh.app) or sharp CLI. Use `.svg` if logo is simple vector.

- [ ] **10. Hero image preload hint missing**
  - File: `app/layout.js` (inside `<head>`)
  - Fix: Add `<link rel="preload" as="image" href="/banner/img1.webp" type="image/webp" />`

- [ ] **11. `min-h-[88vh]` on hero causes CLS on mobile**
  - File: `components/home/HeroEditorial.jsx:138`
  - Fix: Change to `min-h-[calc(100svh-64px)]` to use small viewport height unit

- [ ] **12. Both `react-icons` and `lucide-react` installed — pick one**
  - File: `package.json`
  - Fix: Remove `react-icons`, keep `lucide-react` (better tree-shaking). Update all icon imports across components.

- [ ] **13. Below-fold `<Image>` components missing explicit `width`/`height` — causes CLS**
  - Fix: Audit all `<Image>` without `fill` prop and ensure `width` + `height` are always passed

---

## MEDIUM PRIORITY

- [ ] **14. Below-fold home sections load eagerly — no code splitting**
  - File: `app/page.js`
  - Fix: Wrap below-fold sections with `dynamic()`:
    ```js
    import dynamic from "next/dynamic";
    const TestimonialsCarousel = dynamic(() => import("@/components/home/TestimonialsCarousel"));
    const FAQ = dynamic(() => import("@/components/home/FAQ"));
    const BlogPreview = dynamic(() => import("@/components/home/BlogPreview"));
    const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));
    ```

- [ ] **15. Static `sitemap.xml` won't update when blog changes**
  - File: `public/sitemap.xml`
  - Fix: Delete static file, create `app/sitemap.js` using Next.js built-in sitemap generation

- [ ] **16. OG image — verify dimensions are exactly 1200×630px in `.webp`**
  - Check: Open `siteSEO.defaultImage` path and confirm size with image editor

- [ ] **17. `globals.css` is 2,034 lines loaded on every page**
  - File: `app/globals.css`
  - Fix: Move component-specific styles into their component files using CSS Modules or Tailwind utilities

- [ ] **18. `site.webmanifest` — verify required PWA fields**
  - File: `public/site.webmanifest`
  - Must have: `"display": "standalone"`, `"start_url": "/"`, icons at 192px and 512px
  - Fix: Open file and verify / add missing fields

- [ ] **19. Add `dir="ltr"` to `<html>` tag**
  - File: `app/layout.js:152`
  - Fix: `<html lang="en" dir="ltr" ...>`

- [ ] **20. Verify `<meta name="theme-color">` renders correctly in HTML output**
  - File: `app/layout.js:81`
  - Fix: Run `npm run build && npm run start`, inspect page source, confirm `<meta name="theme-color" content="#0F1A51">` is present

- [ ] **21. Contact page — verify explicit `tel:` links exist**
  - File: `components/contact/ContactPage.jsx`
  - Since `formatDetection: false` is set, phone numbers must be wrapped manually: `<a href="tel:+91XXXXXXXXXX">`

---

## Tools to Use While Testing

| Tool | Purpose |
|------|---------|
| pagespeed.web.dev | Official CWV scores (use after deploying) |
| Chrome DevTools → Lighthouse | Local audit before deploying |
| squoosh.app | Compress images to AVIF / WebP |
| `npx @next/bundle-analyzer` | Find large JS chunks |
| webpagetest.org | Waterfall timeline + real device |
| validator.schema.org | Verify JSON-LD structured data |
| search.google.com/rich-results | Test rich results eligibility |

---

## Recommended Fix Order

1. Font weights (Poppins + Urbanist) — 3 line change, biggest payload win
2. Add `sizes` to hero `<Image>` — fixes LCP score
3. Remove inline MutationObserver script — unblocks render
4. Add `preconnect` to `fonts.gstatic.com` — faster font load
5. Add `formats: ["image/avif", "image/webp"]` to `next.config.mjs`
6. Add `compress: true` + cache headers to `next.config.mjs`
7. Add hero image `<link rel="preload">` hint
8. Convert logo `.jpg`/`.png` files to `.webp`
9. Dynamic import for below-fold sections
10. Fix hero `priority` — only slide 1 should preload
11. Remove one icon library (`react-icons`)
12. Convert static sitemap to `app/sitemap.js`
13. Add `dir="ltr"` to `<html>`
14. Verify PWA manifest fields
15. Audit all `<Image>` for missing `width`/`height`
