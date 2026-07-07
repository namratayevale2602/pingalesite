import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl p-10 md:p-16 border border-gray-100 shadow-sm overflow-hidden text-center">

          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#0F1A51]/4 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#a68256]/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative">
            {/* Icon */}
            <div className="w-14 h-14 bg-[#a68256]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CalendarCheck className="w-7 h-7 text-[#a68256]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to start your financial journey?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg">
              Book a free 30-minute discovery call. No pressure, no obligations — just a conversation about your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#a68256] hover:bg-[#8a6a41] text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#a68256]/30 hover:-translate-y-0.5"
              >
                <CalendarCheck className="w-5 h-5" />
                Book a Free Discovery Call
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0F1A51] text-[#0F1A51] hover:bg-[#0F1A51] hover:text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
