const ITEMS = [
  "Trusted since 1993", "AMFI registered", "IRDAI compliant",
  "8,400 families", "₹4,200 Cr advised", "CFP® · CFA · CA team", "Three generations served",
];

export default function ClientMarquee() {
  const repeated = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {repeated.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}<span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
