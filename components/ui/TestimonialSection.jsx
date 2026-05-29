import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Pingale Wealth completely changed how I think about money. Before working with them, I had no idea where my savings were going. They helped me set clear financial goals, chose the right SIP funds for my risk appetite, and made sure my family was fully protected with the right insurance cover. Three years in and I feel genuinely in control of my finances. Highly recommended to anyone serious about their future.",
    name:     "Parkin Furia",
    title:    "Business Owner, Nashik",
    initials: "PF",
    stars:    5,
  },
  {
    quote:
      "I was always confused about which mutual fund to invest in. The team at Pingale Wealth made it simple — they listened first, asked the right questions, and built a plan that actually matched my goals. The entire onboarding was smooth and the after-sales service is excellent. They check in regularly and rebalance my portfolio proactively. Truly a client-first firm.",
    name:     "Meghna Joshi",
    title:    "IT Professional, Pune",
    initials: "MJ",
    stars:    5,
  },
  {
    quote:
      "Getting the right insurance plan was always on my to-do list but I kept delaying it. Pingale Wealth's insurance advisor walked me through every option without any sales pressure — they compared plans across providers and suggested the one that gave the best coverage at the right premium. I'm now fully covered and at peace.",
    name:     "Vikram Kulkarni",
    title:    "Doctor, Nashik",
    initials: "VK",
    stars:    5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-[#125178] relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2aa4eb]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#2aa4eb] uppercase tracking-[0.2em]">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Real stories from real investors who trusted us with their financial future.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col hover:bg-white/15 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-[#2aa4eb] mb-3 flex-shrink-0" />

              {/* Quote text */}
              <p className="text-white/80 text-sm leading-relaxed italic flex-grow">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#2aa4eb] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
