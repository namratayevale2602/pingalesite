import { buildMetadata, getBreadcrumbSchema } from "@/utils/seoConfig";
import SeoWrapper from "@/components/seowrapper/SeoWrapper";
import PageHero from "@/components/PageHero";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import CTASection from "@/components/home/FinalCTA";

export const metadata = buildMetadata("calculators");
export const dynamic = "force-static";

const breadcrumb = getBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/calculators" },
]);

export default function CalculatorsPage() {
  return (
    <SeoWrapper pageUrl="/calculators" schemas={[breadcrumb]}>
      <main>
        <PageHero
          eyebrow="Calculators · Free, no signup"
          title={<>Five tools. <span className="italic-serif">Real math.</span></>}
          intro="Slide the inputs. Watch the chart change. Numbers don't lie, but a good chart shows you what they're saying."
        />
        <section>
          <div className="container">
            <CalculatorSuite />
          </div>
        </section>

        <CTASection />
      </main>
    </SeoWrapper>
  );
}
