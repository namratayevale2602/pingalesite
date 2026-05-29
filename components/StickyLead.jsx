import LeadForm from "@/components/LeadForm";

export default function StickyLead({ children, title }) {
  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">
      <div>{children}</div>
      <div className="sticky top-24 self-start">
        <LeadForm title={title} />
      </div>
    </div>
  );
}
