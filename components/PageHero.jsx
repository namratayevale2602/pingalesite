export default function PageHero({ eyebrow, title, intro, kicker, children }) {
  return (
    <section className="py-8">
      <div className="container">
        <div className="eyebrow mb-7">{eyebrow}</div>
        <h1 className="text-[clamp(56px,8vw,60px)] mb-7 max-w-[1100px]">{title}</h1>
        {intro && (
          <p className="text-[19px] text-[var(--fg-muted)] max-w-[680px] leading-[1.6] mb-8">{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}
