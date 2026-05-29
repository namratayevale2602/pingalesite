"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CalculatorCard = ({
  icon,
  title,
  description,
  isHovered,
  onHover,
  link,
}) => {
  return (
    <Link href={`/calculators/${link}`} className="block h-full">
      <motion.div
        className={`p-6 rounded-lg bg-[#3b7fa1] cursor-pointer transition-all duration-300 h-full flex flex-col`}
        whileHover={{ y: -5 }}
        onHoverStart={onHover}
        onHoverEnd={onHover}
      >
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 mr-4 flex-shrink-0">
            <Image
              src={icon}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-xl text-white/90">{title}</h3>
        </div>
        <p className="text-white/90 flex-grow">{description}</p>
      </motion.div>
    </Link>
  );
};

const Calculators = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const calculators = [
    {
      id: "future-wealth",
      title: "Future Wealth",
      description: "Calculate your potential future wealth based on current investments and regular contributions.",
      icon: "/calculator/ppf.png",
      link: "future-wealth",
    },
    {
      id: "sip",
      title: "SIP",
      description: "Plan your SIP amount based on your investment horizon.",
      icon: "/calculator/sip.png",
      link: "sip",
    },
    {
      id: "swp",
      title: "SWP",
      description: "Determine monthly income from the Systematic Withdrawal Plan.",
      icon: "/calculator/swp.png",
      link: "swp",
    },
    {
      id: "goal",
      title: "Goal",
      description: "Calculate the amount needed to achieve your financial goals.",
      icon: "/calculator/fd.png",
      link: "goal",
    },
    {
      id: "home-loan-recovery",
      title: "Home Loan Recovery",
      description: "Plan your home loan recovery strategy.",
      icon: "/calculator/inflation.png",
      link: "home-loan-recovery",
    },
    {
      id: "retirement-corpus",
      title: "Retirement Corpus",
      description: "Calculate the corpus needed for your retirement.",
      icon: "/calculator/cagr.png",
      link: "retirement-corpus",
    },
  ];

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 font-dm-serif">
            Calculators<br/>
            <span className="text-[#0A4D6B]">Calculate Your Profit</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
        >
          {calculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              icon={calc.icon}
              title={calc.title}
              link={calc.link}
              description={calc.description}
              isHovered={hoveredCard === calc.id}
              onHover={() =>
                setHoveredCard(hoveredCard === calc.id ? null : calc.id)
              }
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Calculators;