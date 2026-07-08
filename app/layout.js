// app/layout.js
import { siteSEO } from "@/utils/seoConfig";
import { dmSerif, urbanist, poppins } from "./fonts";
import "./globals.css";
import ScrollToTop from "@/components/fixed/ScrollToTop";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export const metadata = {
  metadataBase: new URL(siteSEO.baseUrl),
  title: {
    template: `%s | ${siteSEO.siteName}`,
    default: siteSEO.defaultTitle,
  },
  description: siteSEO.defaultDescription,
  keywords: [
    "mutual fund advisor Nashik",
    "SIP investment Maharashtra",
    "life insurance advisor Nashik",
    "general insurance Nashik",
    "financial planner Maharashtra",
    "AMFI registered distributor",
    "goal based investment",
    "health insurance advisor Nashik",
    "motor insurance Maharashtra",
    "term insurance advisor",
    "ULIP plan India",
    "retirement planning Maharashtra",
    "tax saving mutual fund ELSS",
    "best SIP plan 2025",
    "insurance planning Nashik",
  ],
  authors: [{ name: siteSEO.founder, url: siteSEO.baseUrl }],
  creator: siteSEO.founder,
  publisher: siteSEO.siteName,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: siteSEO.defaultTitle,
    description: siteSEO.defaultDescription,
    url: siteSEO.baseUrl,
    siteName: siteSEO.siteName,
    images: [
      {
        url: `${siteSEO.baseUrl}${siteSEO.defaultImage}`,
        width: 1200,
        height: 630,
        alt: siteSEO.siteName,
      },
    ],
    locale: siteSEO.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteSEO.defaultTitle,
    description: siteSEO.defaultDescription,
    images: [`${siteSEO.baseUrl}${siteSEO.defaultImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#0F1A51",
    "apple-mobile-web-app-title": siteSEO.siteName,
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "application-name": siteSEO.siteName,
  },
  category: "Financial Services",
  classification: "Mutual Fund Distribution & Insurance Advisory",
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["FinancialService", "LocalBusiness"],
      name: siteSEO.siteName,
      "@id": siteSEO.baseUrl,
      url: siteSEO.baseUrl,
      telephone: siteSEO.phone,
      email: siteSEO.email,
      description: siteSEO.defaultDescription,
      image: `${siteSEO.baseUrl}${siteSEO.defaultImage}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nashik",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      foundingDate: siteSEO.foundingYear,
      founder: { "@type": "Person", name: siteSEO.founder },
      slogan: "Your Goals, Our Plan. Infinite Possibilities.",
      priceRange: "₹₹",
      knowsAbout: [
        "Mutual Fund Distribution",
        "SIP Planning",
        "Life Insurance",
        "General Insurance",
        "Health Insurance",
        "Goal-Based Financial Planning",
        "Tax Planning",
        "Retirement Planning",
      ],
      areaServed: [
        { "@type": "City", name: "Nashik" },
        { "@type": "City", name: "Pune" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "State", name: "Maharashtra" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Financial Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "FinancialService", name: "Mutual Fund Investment" } },
          { "@type": "Offer", itemOffered: { "@type": "FinancialService", name: "SIP Planning" } },
          { "@type": "Offer", itemOffered: { "@type": "FinancialService", name: "Life Insurance" } },
          { "@type": "Offer", itemOffered: { "@type": "FinancialService", name: "General Insurance" } },
          { "@type": "Offer", itemOffered: { "@type": "FinancialService", name: "Health Insurance" } },
          { "@type": "Offer", itemOffered: { "@type": "FinancialService", name: "Retirement Planning" } },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteSEO.siteName,
      url: siteSEO.baseUrl,
    },
  ];

  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${urbanist.variable} ${poppins.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Nashik" />

        {/* Script to handle browser extension attributes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove fdprocessedid and other extension-added attributes to prevent hydration mismatches
              (function() {
                // Run immediately to catch attributes added before React hydrates
                const cleanup = function() {
                  try {
                    document.querySelectorAll('[fdprocessedid]').forEach(function(el) {
                      el.removeAttribute('fdprocessedid');
                    });
                    // Also handle other common extension attributes
                    document.querySelectorAll('[data-gramm]').forEach(function(el) {
                      el.removeAttribute('data-gramm');
                    });
                    document.querySelectorAll('[data-gramm-id]').forEach(function(el) {
                      el.removeAttribute('data-gramm-id');
                    });
                  } catch(e) {
                    // Silently fail
                  }
                };
                
                // Run immediately
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', cleanup);
                } else {
                  cleanup();
                }
                
                // Also run after a small delay to catch any late additions
                setTimeout(cleanup, 100);
                setTimeout(cleanup, 500);
                
                // Watch for dynamically added elements
                if (window.MutationObserver) {
                  const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(function(node) {
                          if (node.nodeType === 1) {
                            // Check if the node itself has the attribute
                            if (node.hasAttribute && node.hasAttribute('fdprocessedid')) {
                              node.removeAttribute('fdprocessedid');
                            }
                            // Check children
                            if (node.querySelectorAll) {
                              node.querySelectorAll('[fdprocessedid]').forEach(function(el) {
                                el.removeAttribute('fdprocessedid');
                              });
                            }
                          }
                        });
                      }
                    });
                  });
                  observer.observe(document.body, {
                    childList: true,
                    subtree: true
                  });
                }
              })();
            `
          }}
        />

        {/* JSON-LD structured data */}
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className="bg-white font-sans antialiased min-h-screen"
        suppressHydrationWarning
      >
        <ScrollToTop />
        <TopNav />
        {children}
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}