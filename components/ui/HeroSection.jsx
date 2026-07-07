"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, TrendingUp, Shield, Users, Heart } from "lucide-react";
import PopupForm from '../popup/PopupForm';

const slides = [
  {
    id: 1,
    image: "/banner/hero1.webp",
    mobileImage: "/banner/heromob1.webp",
    alt: "Family managing expenses",
    subtitle: "Earn not just to spend today, but to create memories, protect dreams, support generations, and leave kindness behind.",
    icon: ShoppingBag,
    tag: "Consumption",
  },
  {
    id: 2,
    image: "/banner/hero2.webp",
    mobileImage: "/banner/heromob2.webp",
    alt: "Wealth creation graph",
    subtitle: "The true value of wealth is not counted in numbers, but in the smiles, security, and futures it creates for the people you love.",
    icon: TrendingUp,
    tag: "Creation",
  },
  {
    id: 3,
    image: "/banner/hero3.webp",
    mobileImage: "/banner/heromob3.webp",
    alt: "Family protection insurance",
    subtitle: "Build wealth that gives comfort to your parents, confidence to your children, peace to your future, and hope to society.",
    icon: Shield,
    tag: "Conservation",
  },
  {
    id: 4,
    image: "/banner/hero4.webp",
    mobileImage: "/banner/heromob3.webp",
    alt: "Legacy planning",
    subtitle: "A meaningful life is built when your money cares for your family today, strengthens their tomorrow, and touches lives beyond your own.",
    icon: Users,
    tag: "Continuation",
  },
  {
    id: 5,
    image: "/banner/hero5.webp",
    mobileImage: "/banner/heromob3.webp",
    alt: "Giving back to community",
    subtitle: "Money becomes truly powerful when it creates happiness at home, security for tomorrow, and meaningful change for others.",
    icon: Heart,
    tag: "Contribution",
  },
];

export default function HeroSlider() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className="relative w-full min-h-screen md:h-[90vh] overflow-hidden mt-18">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image - Different for mobile and desktop */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${isMobile ? slide.mobileImage : slide.image})`,
            }}
          >
            {/* Dark Gradient Overlay - Lighter for mobile since text at bottom */}
            <div className={`absolute inset-0 ${
              isMobile 
                ? "bg-gradient-to-t from-black/90 via-black/50 to-black/20" 
                : "bg-gradient-to-r from-black/80 via-black/50 to-transparent"
            }`}></div>

            {/* Content - Different layout for mobile and desktop */}
            <div className={`relative z-20 h-full flex ${
              isMobile ? "items-end pb-24" : "items-center"
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
                <div className={`${
                  isMobile ? "max-w-full text-center" : "max-w-2xl"
                } text-white`}>
                  
                  {/* Tag Badge with Icon */}
                  <div className={`inline-flex items-center gap-2 bg-[#a68256]/20 backdrop-blur-sm border border-[#a68256]/30 rounded-full px-4 py-2 mb-4 ${
                    isMobile ? "mx-auto" : ""
                  }`}>
                    <slide.icon className="w-4 h-4 text-[#a68256]" />
                    <span className="text-sm font-medium text-white">{slide.tag}</span>
                  </div>

                  {/* Title/Subtitle */}
                  <h1 className={`leading-tight mb-6 capitalize ${
                    isMobile 
                      ? "text-2xl sm:text-3xl" 
                      : "text-3xl md:text-5xl lg:text-6xl"
                  }`}>
                    {slide.subtitle}
                  </h1>

                  {/* CTA Button */}
                  <button 
                    onClick={openPopup} 
                    className={`group bg-[#a68256] hover:bg-[#8a6a41] transition-all duration-300 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center gap-2 hover:shadow-2xl hover:shadow-[#a68256]/25 hover:-translate-y-0.5 ${
                      isMobile ? "mx-auto" : ""
                    }`}
                  >
                    Talk To An Adviser
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hide on mobile */}
      {!isMobile && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-6 -translate-y-1/2 z-30 bg-black/50 hover:bg-[#a68256] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-6 -translate-y-1/2 z-30 bg-black/50 hover:bg-[#a68256] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Mobile Swipe Hint */}
      {isMobile && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
          <p className="text-[10px] text-white/40">Swipe to explore</p>
        </div>
      )}

      {/* Dots */}
      <div className={`absolute ${
        isMobile ? "bottom-6" : "bottom-8"
      } left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index 
                ? "w-6 sm:w-8 bg-[#a68256] h-1.5 sm:h-2" 
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
    {/* Popup Form */}
      <PopupForm isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
}