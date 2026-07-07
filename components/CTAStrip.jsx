import Link from "next/link";

export default function CTAStrip({ title, sub, primary = "Get consultation", primaryHref = "/contact", secondary, secondaryHref }) {
  return (
    <section className="section">
      <div className="container">
        <div className="px-12 py-14 bg-[var(--navy-900)] rounded-[20px] grid grid-cols-1 gap-8 items-center lg:grid-cols-[2fr_1fr] text-[#EDE6DA]">
          <div>
            <h3 className="text-[clamp(28px,3.5vw,44px)] mb-3 text-[#EDE6DA]">{title}</h3>
            <p className="text-[16px] max-w-[520px] text-[#c9ad82]">{sub}</p>
          </div>
          <div className="flex gap-3 flex-wrap lg:justify-self-end">
            <Link href={primaryHref} className="btn btn-primary bg-[var(--sky-500)] text-[var(--navy-900)]">
              {primary} →
            </Link>
            {secondary && (
              <Link href={secondaryHref} className="btn bg-transparent text-[#EDE6DA] border border-[#26325a]">
                {secondary}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
