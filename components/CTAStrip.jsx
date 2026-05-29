import Link from "next/link";

export default function CTAStrip({ title, sub, primary = "Get consultation", primaryHref = "/contact", secondary, secondaryHref }) {
  return (
    <section className="section">
      <div className="container">
        <div className="px-12 py-14 bg-[var(--navy-900)] rounded-[20px] grid grid-cols-1 gap-8 items-center lg:grid-cols-[2fr_1fr] text-[#dbf0f8]">
          <div>
            <h3 className="text-[clamp(28px,3.5vw,44px)] mb-3 text-[#dbf0f8]">{title}</h3>
            <p className="text-[16px] max-w-[520px] text-[#6aafc2]">{sub}</p>
          </div>
          <div className="flex gap-3 flex-wrap lg:justify-self-end">
            <Link href={primaryHref} className="btn btn-primary bg-[var(--sky-500)] text-[var(--navy-900)]">
              {primary} →
            </Link>
            {secondary && (
              <Link href={secondaryHref} className="btn bg-transparent text-[#dbf0f8] border border-[#0b3245]">
                {secondary}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
