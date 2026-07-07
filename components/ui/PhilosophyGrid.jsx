import { Users, BookOpen, Lock, Target } from "lucide-react";

const PILLARS = [
  {
    icon: Users,
    title: "Client-First Always",
    description:
      "Your interests come before ours — always. Every recommendation we make is driven purely by what's best for your financial future.",
  },
  {
    icon: BookOpen,
    title: "Educate & Empower",
    description:
      "We simplify finance so you understand every decision. An informed investor is a confident investor.",
  },
  {
    icon: Lock,
    title: "Data Confidentiality",
    description:
      "Your personal and financial information stays strictly secure with us.",
  },
  {
    icon: Target,
    title: "Financial Freedom for Life",
    description:
      "True independence isn't just about wealth — it's about reaching every milestone with confidence and peace of mind.",
  },
];

export default function PhilosophyGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#a68256] uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl text-[#0F1A51] mt-3">
            Our Philosophy
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className="text-center group cursor-pointer p-5 rounded-xl border border-2 border-[#0F1A51]"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto bg-[#0F1A51]/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#0F1A51] transition-all duration-300 group-hover:scale-110 group-hover:rounded-full">
                <pillar.icon className="w-7 h-7 text-[#0F1A51] group-hover:text-white transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#0F1A51] mb-2">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {pillar.description}
              </p>

             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}