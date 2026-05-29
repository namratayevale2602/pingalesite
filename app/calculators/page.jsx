import PageHero from "@/components/PageHero";
import CTAStrip from "@/components/CTAStrip";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import CTASection from "@/components/home/FinalCTA";

export const metadata = {
  title: "Calculators — Pingale Financial Services",
};

export default function CalculatorsPage() {
  return (
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
      
      <CTASection/>
    </main>
  );
}
