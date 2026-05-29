export default function SectionHeader({ eyebrow, title, intro, align = "left", actions }) {
  const isSplit = align === "split";
  const isCenter = align === "center";

  return (
    <div className={`grid gap-12 items-end mb-14 section-header ${isSplit ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} ${isCenter ? "text-center" : "text-left"}`}>
      <div>
        {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
        <h2 className="text-wrap-balance">{title}</h2>
      </div>
      {(intro || actions) && (
        <div className={`flex flex-col gap-6 max-w-[520px] ${isSplit ? "lg:justify-self-end" : ""}`}>
          {intro && <p className="text-[var(--fg-muted)] text-[17px] leading-[1.6]">{intro}</p>}
          {actions}
        </div>
      )}
    </div>
  );
}
