import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";

export default function CalcPreview() {
  return (
    <section className="section bg-[var(--paper-2)] border-t border-b border-[var(--rule)]">
      <div className="container">
        <SectionHeader
          eyebrow="Plan Your Corpus"
          title={<>Free calculators. <span className="">Real numbers.</span></>}
          intro="Five tools covering future wealth, retirement, SIP+SWP, home loan recovery, and goal planning. No sign-up. Adjust the sliders and see results instantly."
          align="split"
          actions={<Link href="/calculators" className="btn btn-primary">Open full suite <span>→</span></Link>}
        />
        <CalculatorSuite initial="future" />
      </div>
    </section>
  );
}
