import React from "react";
import { Link } from "../router";
import { ShieldCheck, Compass, Globe, Sparkles, Building2, ArrowRight } from "lucide-react";

interface OurVisionViewProps {
  onOpenInquiry: (context?: string) => void;
}

export function OurVisionView({ onOpenInquiry }: OurVisionViewProps) {
  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      
      {/* 1. Panoramic Hero Banner using Website Banner Page Ourvision.jpg */}
      <section className="relative bg-[#1C1B1A] text-white overflow-hidden border-b border-[#383635]">
        <div className="relative w-full h-72 sm:h-96 lg:h-[420px] overflow-hidden">
          <img
            src="/images/Website Banner Page Ourvision.jpg"
            alt="AirRajasthan™ — Born in Desert. Built for Skies."
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-[#1C1B1A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1B1A]/90 via-[#1C1B1A]/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 w-full space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
                <span className="w-2 h-0.5 bg-[#0083C7]" />
                <span>Corporate Profile &amp; Strategy</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
                Our Vision
              </h1>
              <p className="text-sm sm:text-base text-[#D8D8D6] max-w-2xl font-light">
                AirRajasthan: Born in Desert. Built for Skies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Consolidated Narrative Section (4 Supplied Paragraphs + Core Vision) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Consolidated Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span>Foundation &amp; Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              AirRajasthan: Born in Desert. Built for Skies.
            </h2>

            {/* The 4 Consolidated Paragraphs from Document */}
            <div className="space-y-4 text-xs sm:text-sm text-[#4B4947] leading-relaxed">
              <p>
                Born from the spirit of Rajasthan and strategically positioned through Fujairah, UAE,
                AirRajasthan is a new-generation air cargo carrier dedicated to connecting businesses,
                markets, and opportunities across the Middle East, India, Africa, and beyond. Combining
                regional heritage with global ambition, we are building reliable, efficient, and
                customer-focused air freight solutions designed to move trade faster, strengthen supply
                chains, and support economic growth across the regions we serve.
              </p>
              <p>
                With Jaipur, Rajasthan, and Fujairah, UAE, as our strategic hubs, we aim to develop an
                integrated aviation and logistics network that brings together air cargo, charter
                operations, freight management, ground transportation and end-to-end cargo solutions
                under one commercial platform.
              </p>
              <p>
                Our approach is built around understanding market demand, developing strategic partnerships
                and creating practical solutions for businesses that require dependable access to
                regional and international markets. From cargo capacity and charter coordination to
                logistics planning and specialised shipment handling, our focus is on connecting customers,
                markets and opportunities through a single, coordinated approach.
              </p>
              <p>
                As we progress from our initial route development into a broader network, AirRajasthan
                aims to build lasting relationships with airlines, aircraft operators, freight forwarders,
                exporters, importers and logistics partners. We believe sustainable aviation growth comes
                from combining operational reliability, commercial innovation, strong partnerships and a
                clear understanding of customer needs.
              </p>
            </div>

            {/* Our Vision Core Statement Block */}
            <div className="pt-4 border-t border-[#E5E5E3] space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold font-display">
                <span className="w-2 h-0.5 bg-[#D39257]" />
                <span>Our Vision</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1C1B1A] uppercase">
                A Trusted, Integrated Aviation &amp; Logistics Platform
              </h3>
              <p className="text-xs sm:text-sm text-[#4B4947] leading-relaxed">
                Our vision is to develop AirRajasthan into a trusted, integrated aviation and logistics
                platform connecting India, the UAE/GCC, Africa and international markets.
              </p>
              <p className="text-xs sm:text-sm text-[#4B4947] leading-relaxed">
                We aspire to create a business that goes beyond moving cargo from one destination to
                another—one that connects trade, enables new market opportunities and delivers flexible
                aviation solutions for a changing global economy.
              </p>
            </div>

            {/* Comprehensive Aviation Group Expansion */}
            <div className="pt-4 border-t border-[#E5E5E3] space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
                <Sparkles className="w-4 h-4 text-[#0083C7]" />
                <span>Looking Ahead</span>
              </div>
              <h3 className="text-xl font-bold font-display text-[#1C1B1A] uppercase">
                Comprehensive Aviation Group Expansion
              </h3>
              <p className="text-xs sm:text-sm text-[#4B4947] leading-relaxed">
                Looking ahead, our long-term vision is to expand AirRajasthan into a comprehensive
                aviation group, extending our operations into domestic and international passenger
                airline services alongside our established cargo and charter operations.
              </p>
              <p className="text-xs sm:text-sm text-[#4B4947] leading-relaxed">
                Through a phased, commercially sustainable growth strategy, we aspire to connect more
                cities, serve diverse markets and build an integrated aviation network that brings people,
                businesses and opportunities closer together.
              </p>
              <p className="text-xs font-semibold text-[#D39257] uppercase tracking-wider font-display pt-1">
                AirRajasthan: Born in Desert. Built for Skies.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry("Charter & Strategic Vision - Our Vision")}
                className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors cursor-pointer shadow-xs"
              >
                Request For Charter
              </button>
              <Link to="/services" className="text-xs font-semibold text-[#0083C7] hover:underline">
                Explore Services &rarr;
              </Link>
            </div>
          </div>

          {/* Visual Side Column (SKYTour & Operational Tarmac Assets) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-[#E5E5E3] overflow-hidden bg-slate-900 shadow-md">
              <img
                src="/images/SKYTour.jpg"
                alt="AirRajasthan SKYTour aviation fleet and passenger flight horizon"
                className="w-full h-80 sm:h-96 object-cover object-center"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-[#E5E5E3] text-xs">
                <span className="font-bold text-[#1C1B1A] block font-display uppercase">
                  Long-Term Horizon &middot; SKYTour Perspective
                </span>
                <span className="text-[#8C8A88]">
                  Envisioning comprehensive aviation services connecting cities and people
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E5E3] overflow-hidden bg-slate-900 shadow-xs">
              <img
                src="/images/Our Vision.jpg"
                alt="AirRajasthan vision of global aviation logistics at airport tarmac"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-3 bg-white border-t border-[#E5E5E3] text-xs">
                <span className="font-bold text-[#1C1B1A] block font-display uppercase">
                  Operational Grounding
                </span>
                <span className="text-[#8C8A88]">
                  Jaipur &amp; Fujairah Strategic Bilateral Anchor Points
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-lg border border-[#E7CFB2] text-xs space-y-1">
              <div className="flex items-center gap-2 text-[#704724] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#D39257]" />
                <span>Operational Timeline Note</span>
              </div>
              <p className="text-[#986333] text-[11px] leading-relaxed">
                Passenger aviation operations represent AirRajasthan&apos;s planned future expansion phase.
                Current commercial operations and launch focus remain dedicated to bilateral cargo
                corridors, ad hoc aircraft charters, and multimodal logistics solutions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The 3 Points Shifted to Bottom */}
      <section className="bg-white border-y border-[#E5E5E3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span>Strategic Pillars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              Three Pillars Guiding Our Growth
            </h2>
            <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
              Core strategic priorities driving AirRajasthan&apos;s cross-border connectivity and customer partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Point 1 */}
            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-3">
              <div className="w-10 h-10 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Connecting Trade &amp; Markets
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                We aspire to create a business that goes beyond moving cargo from one destination to
                another—one that connects trade, enables new market opportunities and delivers flexible
                aviation solutions for a changing global economy.
              </p>
            </div>

            {/* Point 2 */}
            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-3">
              <div className="w-10 h-10 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Jaipur &amp; Fujairah Strengths
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                By building on the strategic strengths of Jaipur and Fujairah, fostering long-term industry
                partnerships and progressively expanding our capabilities across air cargo, charter services
                and logistics, we aim to establish a sustainable aviation enterprise recognised for its
                connectivity, commercial agility and customer commitment.
              </p>
            </div>

            {/* Point 3 */}
            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-3">
              <div className="w-10 h-10 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Customer &amp; Partner Focus
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Combining operational reliability, commercial innovation, strong partnerships and a clear
                understanding of customer needs ensures dependable freight solutions for shippers, freight
                forwarders, and airlines across our network.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
