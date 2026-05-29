"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const cards = [
  {
    id: 1,
    title: "Mutual Fund",
    image: "/services/mutualfunds.jpg",
    description:
      "We distribute top-performing mutual fund products for short, medium and long-term goals. SIP from ₹500/month — equity, debt, hybrid and ELSS tax-saving funds.",
    link: "/services/mutual-funds",
  },
  {
    id: 2,
    title: "Health Insurance",
    image: "/services/healthinsurance.jpg",
    description:
      "Secure your family's future with the right life insurance plan — term insurance, ULIP, endowment or child plans. Unbiased comparison across leading insurers.",
    link: "/health-insurance",
  },
  {
    id: 3,
    title: "General Insurance",
    image: "/services/genralinsurances.jpg",
    description:
      "Complete protection for what matters — health insurance, motor insurance, home insurance and more. We compare plans so you get the best cover at the right premium.",
    link: "/general-insurance",
  },
];

export default function InsuranceCards() {
  const router = useRouter();

  const handleCardClick = (link) => {
    router.push(link);
  };

  const handleLearnMore = (e, link) => {
    e.stopPropagation();
    router.push(link);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-[#074a6b]">
            Our Insurance Services
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We provide customized financial and insurance solutions for your
            future security and peace of mind.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.link)}
              className="group relative overflow-hidden rounded-xl shadow-lg bg-white cursor-pointer"
            >
              {/* Hover Background Overlay */}
              <div className="absolute inset-0 bg-cyan-500 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out z-0"></div>

              {/* Content */}
              <div className="relative z-10">
                
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Text */}
                <div className="p-6 transition-colors duration-500 group-hover:text-white">
                  <h3 className="md:text-2xl text-xl mb-3 text-[#074a6b] group-hover:text-white transition-colors duration-500">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500">
                    {card.description}
                  </p>

                  <button 
                    onClick={(e) => handleLearnMore(e, card.link)}
                    className="mt-5 text-cyan-500 group-hover:text-white transition-colors duration-500"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}