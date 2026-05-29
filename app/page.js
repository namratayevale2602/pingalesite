import { buildMetadata, getBreadcrumbSchema } from "@/utils/seoConfig";
import SeoWrapper      from "@/components/seowrapper/SeoWrapper";
import HeroEditorial from "@/components/home/HeroEditorial";
import ClientMarquee from "@/components/home/ClientMarquee";
import ServicesOverview from "@/components/home/ServicesOverview";
import FiveCSection from "@/components/home/FiveCSection";
import WhyChoose from "@/components/home/WhyChoose";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CalcPreview from "@/components/home/CalcPreview";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FAQ from "@/components/home/FAQ";
import BlogPreview from "@/components/home/BlogPreview";
import FinalCTA from "@/components/home/FinalCTA";

/* ── SEO ── */
export const metadata = buildMetadata("home");
export const dynamic  = "force-static";

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", href: "/" },
]);

export default function HomePage() {
  return (
    <SeoWrapper pageUrl="/" schemas={[breadcrumb]}>
      <main>
        <HeroEditorial />
        {/* <ClientMarquee /> */}
        <ServicesOverview />
        <FiveCSection />
        <WhyChoose />
        <ProcessTimeline />
        <CalcPreview />
        <TestimonialsCarousel />
        <FAQ />
        <BlogPreview />
        <FinalCTA />
      </main>

    </SeoWrapper>
  );
}
