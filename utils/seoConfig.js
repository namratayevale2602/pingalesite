// utils/seoConfig.js
// ── Financial Services Website — Pingale Wealth ──────────────────────────────
// To edit SEO for a page → find it in pageSEO and update title / description / keywords
// To add a new page      → add a new key in pageSEO
// ─────────────────────────────────────────────────────────────────────────────

// ── SECTION 1 ── SITE-WIDE SETTINGS ─────────────────────────────────────────
export const siteSEO = {
  siteName:           "Pingale Wealth",
  defaultTitle:       "Pingale Wealth | Mutual Funds, Life & General Insurance",
  defaultDescription:
    "Pingale Wealth — your trusted financial partner for goal-based mutual fund investments, life insurance, and general insurance. Unbiased advice, transparent process, client-first always.",
  baseUrl:     "https://pingalewealth.com",          // ← update when domain is live
  defaultImage: "/og-pingale.jpg",
  locale:      "en_IN",
  email:       "info@pingalewealth.com",             // ← update
  phone:       "+91 XXXXX XXXXX",                    // ← update
  address:     "Nashik, Maharashtra, India",         // ← update
  foundingYear: "2016",
  founder:     "Pingale",
};

// ── SECTION 2 ── PAGE-SPECIFIC SEO ──────────────────────────────────────────
export const pageSEO = {
  // ─── HOME ────────────────────────────────────────────────────────────────
  home: {
    title:
      "Pingale Wealth | Mutual Funds, Life Insurance & General Insurance",
    description:
      "Goal-based mutual fund investments, life insurance and general insurance planning — with unbiased, client-first financial advice. Serving investors across Maharashtra.",
    keywords:
      "mutual fund advisor Nashik, SIP investment Nashik, life insurance advisor Maharashtra, general insurance Nashik, financial planner Nashik, AMFI registered distributor, goal based investment, best mutual funds 2025, insurance planning Maharashtra",
    canonical: "/",
    ogImage:   "/og-home.jpg",
    h1: "Your Goals, Our Plan. Infinite Possibilities.",
  },

  // ─── ABOUT ────────────────────────────────────────────────────────────────
  about: {
    title:       "About Pingale Wealth | Our Story & Philosophy",
    description:
      "Learn about Pingale Wealth — our founding philosophy, the team behind your financial plan, and why 5,500+ investors trust us for mutual funds and insurance.",
    keywords:
      "about Pingale Wealth, financial advisor Maharashtra, wealth management firm Nashik, AMFI registered advisor, IRDA insurance agent Nashik",
    canonical: "/about",
    ogImage:   "/og-about.jpg",
    h1: "About Pingale Wealth — Client-First, Always",
  },

  // ─── SERVICES ────────────────────────────────────────────────────────────
  services: {
    title:       "Our Financial Services | Pingale Wealth",
    description:
      "Explore Pingale Wealth's complete financial services: mutual fund distribution, SIP planning, life insurance, health insurance, motor insurance and more.",
    keywords:
      "financial services Nashik, mutual fund services, life insurance planning, general insurance, health insurance advisor, motor insurance Nashik",
    canonical: "/services",
    ogImage:   "/og-services.jpg",
    h1: "Complete Financial Services — Simplified for You",
  },

  // ─── MUTUAL FUNDS ────────────────────────────────────────────────────────
  mutualFunds: {
    title:       "Mutual Fund Investment | SIP Planning | Pingale Wealth",
    description:
      "Invest in top-performing mutual funds with goal-based SIP planning. Expert guidance for equity, debt, hybrid and ELSS funds. Start with ₹500/month.",
    keywords:
      "mutual fund investment Nashik, SIP plan Maharashtra, ELSS tax saving fund, equity mutual fund, debt fund, best SIP 2025, mutual fund advisor Nashik",
    canonical: "/services/mutual-funds",
    ogImage:   "/og-mutual-funds.jpg",
    h1: "Mutual Fund Investment — Grow Your Wealth Systematically",
  },

  // ─── LIFE INSURANCE ──────────────────────────────────────────────────────
  lifeInsurance: {
    title:       "Life Insurance Planning | Term & ULIP | Pingale Wealth",
    description:
      "Protect your family's future with the right life insurance plan. Term insurance, ULIP, endowment and child plans — unbiased comparison and expert advice.",
    keywords:
      "life insurance Nashik, term insurance advisor Maharashtra, ULIP plan, best term plan India, family protection plan, LIC agent Nashik, private insurance advisor",
    canonical: "/services/life-insurance",
    ogImage:   "/og-life-insurance.jpg",
    h1: "Life Insurance Planning — Protect What Matters Most",
  },

  // ─── GENERAL INSURANCE ───────────────────────────────────────────────────
  generalInsurance: {
    title:       "General Insurance | Health & Motor Insurance | Pingale Wealth",
    description:
      "Comprehensive general insurance solutions — health insurance, motor insurance, home insurance and more. Compare plans and get the best cover at the right premium.",
    keywords:
      "general insurance Nashik, health insurance advisor Maharashtra, motor insurance Nashik, car insurance, home insurance, mediclaim policy, Nashik insurance agent",
    canonical: "/services/general-insurance",
    ogImage:   "/og-general-insurance.jpg",
    h1: "General Insurance — Complete Protection for Every Need",
  },

  // ─── CALCULATORS ─────────────────────────────────────────────────────────
  calculators: {
    title:       "Financial Calculators | SIP, Lumpsum & Insurance | Pingale Wealth",
    description:
      "Use our free financial calculators to plan your investments. SIP calculator, lumpsum calculator, retirement corpus calculator and insurance premium estimator.",
    keywords:
      "SIP calculator, lumpsum calculator, retirement calculator, insurance premium calculator, mutual fund return calculator, investment planning tool",
    canonical: "/calculators",
    ogImage:   "/og-calculators.jpg",
    h1: "Free Financial Calculators — Plan Your Future",
  },

  // ─── LIFE INSURANCE PAGE ─────────────────────────────────────────────────
  life: {
    title:       "Life Insurance Planning | Term & ULIP | Pingale Wealth",
    description:
      "Protect your family's future with the right life insurance plan. Term insurance, ULIP, endowment and child plans — unbiased comparison and expert advice.",
    keywords:
      "life insurance Nashik, term insurance advisor Maharashtra, ULIP plan, best term plan India, family protection plan, LIC agent Nashik, private insurance advisor",
    canonical: "/life-insurance",
    ogImage:   "/og-life-insurance.jpg",
    h1: "Life Insurance Planning — Protect What Matters Most",
  },

  // ─── GENERAL INSURANCE PAGE ──────────────────────────────────────────────
  general: {
    title:       "General Insurance | Health & Motor Insurance | Pingale Wealth",
    description:
      "Comprehensive general insurance solutions — health insurance, motor insurance, home insurance and more. Compare plans and get the best cover at the right premium.",
    keywords:
      "general insurance Nashik, health insurance advisor Maharashtra, motor insurance Nashik, car insurance, home insurance, mediclaim policy, Nashik insurance agent",
    canonical: "/general-insurance",
    ogImage:   "/og-general-insurance.jpg",
    h1: "General Insurance — Complete Protection for Every Need",
  },

  // ─── SIP & MUTUAL FUNDS ──────────────────────────────────────────────────
  sip: {
    title:       "SIP & Mutual Fund Investment | Pingale Wealth",
    description:
      "Goal-based SIP planning across 38 AMCs. Expert guidance for equity, debt, hybrid and ELSS funds. Start building wealth systematically from ₹500/month.",
    keywords:
      "SIP investment Nashik, mutual fund advisor Maharashtra, ELSS tax saving fund, best SIP 2025, AMFI registered distributor, goal based investment, mutual fund advisor Nashik",
    canonical: "/sip",
    ogImage:   "/og-sip.jpg",
    h1: "SIP & Mutual Fund Investment — Grow Your Wealth Systematically",
  },

  // ─── BLOG ────────────────────────────────────────────────────────────────
  blog: {
    title:       "Financial Insights & Blog | Pingale Wealth",
    description:
      "Long-form articles on mutual funds, insurance, tax planning, retirement and personal finance. Unbiased advice, no clickbait — straight from the Pingale desk.",
    keywords:
      "financial planning blog, mutual fund insights, insurance advice, SIP tips, retirement planning India, tax saving tips, Pingale Wealth blog",
    canonical: "/blog",
    ogImage:   "/og-blog.jpg",
    h1: "The Pingale Journal — Long-form on Money & Meaning",
  },

  // ─── CONTACT ─────────────────────────────────────────────────────────────
  contact: {
    title:       "Contact Us | Book Free Advisory | Pingale Wealth",
    description:
      "Get in touch with Pingale Wealth for a free financial advisory session. We help you choose the right mutual funds, life insurance and general insurance products.",
    keywords:
      "contact Pingale Wealth, book financial advisor Nashik, free advisory session, mutual fund help Maharashtra, insurance advisor contact",
    canonical: "/contact",
    ogImage:   "/og-contact.jpg",
    h1: "Contact Pingale Wealth — Start Your Financial Journey",
  },
};

// ── SECTION 3 ── HELPER FUNCTIONS (generic — no need to edit) ───────────────

// Use in Server Component pages:  export const metadata = buildMetadata("home")
export function buildMetadata(pageKey) {
  const seo = pageSEO[pageKey] || pageSEO.home;
  return {
    title:       seo.title,
    description: seo.description,
    keywords:    seo.keywords,
    alternates:  { canonical: `${siteSEO.baseUrl}${seo.canonical}` },
    openGraph: {
      title:       seo.title,
      description: seo.description,
      url:         `${siteSEO.baseUrl}${seo.canonical}`,
      siteName:    siteSEO.siteName,
      locale:      siteSEO.locale,
      type:        "website",
      images: [
        {
          url:    `${siteSEO.baseUrl}${seo.ogImage || siteSEO.defaultImage}`,
          width:  1200,
          height: 630,
          alt:    seo.title,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title:       seo.title,
      description: seo.description,
      images:      [`${siteSEO.baseUrl}${seo.ogImage || siteSEO.defaultImage}`],
    },
    robots: {
      index:  true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

// Generate BreadcrumbList JSON-LD
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       item.name,
      item:       `${siteSEO.baseUrl}${item.href}`,
    })),
  };
}

// Generate FAQPage JSON-LD
export function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name:    faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

// Generate Service JSON-LD
export function getServiceSchema(seoData, slug) {
  return {
    "@context": "https://schema.org",
    "@type":    "FinancialService",
    name:        seoData.h1,
    description: seoData.description,
    url:         `${siteSEO.baseUrl}${seoData.canonical}`,
    provider: {
      "@type":    "FinancialService",
      name:       siteSEO.siteName,
      telephone:  siteSEO.phone,
    },
    areaServed: [
      { "@type": "State", name: "Maharashtra" },
      { "@type": "Country", name: "India" },
    ],
  };
}
