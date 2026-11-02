import React, { useState } from "react";
import { Link } from "../router";
import {
  Plane,
  Boxes,
  Truck,
  Globe,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  FileCheck,
  ChevronDown,
} from "lucide-react";

interface ServicesViewProps {
  onOpenInquiry: (context?: string) => void;
}

export function ServicesView({ onOpenInquiry }: ServicesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    {
      id: "aviation-charter",
      title: "Aviation & Charter Services",
      tagline: "Flexible aircraft capacity and charter solutions",
      icon: Plane,
      image: "/images/Services-1 Aviation & Charter Services.webp",
      description:
        "AirRajasthan™ aims to facilitate cargo charter operations by matching customer demand with suitable aircraft and operating partners. We plan to begin with ad hoc cargo charters on the Jaipur–Fujairah corridor and progressively increase frequency as demand develops.",
      bullets: [
        "Ad hoc and dedicated cargo aircraft charters.",
        "Aircraft sourcing and charter coordination through qualified operators.",
        "ACMI and other aircraft-capacity arrangements, subject to commercial and regulatory feasibility.",
        "Flight planning coordination, ground-handling arrangements, and operational liaison with service partners.",
        "Future expansion into additional cargo routes and selected passenger charter services, subject to the required approvals and partnerships.",
      ],
      focus:
        "Flexible, demand-driven aviation solutions without requiring AirRajasthan™ to own every aircraft or operational asset.",
    },
    {
      id: "air-cargo",
      title: "Air Cargo Services",
      tagline: "Connecting cargo capacity with market demand",
      icon: Boxes,
      image: "/images/Service-2 Aircargo Services.jpg",
      description:
        "We aim to develop air cargo services that connect exporters, importers, freight forwarders, and consolidators with reliable air transportation options between India, the UAE, and other markets.",
      bullets: [
        "Cargo-space sales and block-space arrangements on available charter capacity.",
        "General cargo and suitable specialised shipments, subject to aircraft capability and acceptance requirements.",
        "Import and export cargo coordination for both inbound and outbound movements.",
        "Cargo consolidation and coordination with freight forwarders, GSAs, and cargo handling agents.",
        "Documentation, shipment tracking coordination, and cargo status communication.",
        "Development of regular cargo services as shipment volumes and commercial viability grow.",
      ],
      focus:
        "Building sustainable cargo volumes in both directions, improving aircraft utilisation, and creating dependable commercial relationships with cargo customers.",
    },
    {
      id: "logistics-supply-chain",
      title: "Logistics & Supply Chain Solutions",
      tagline: "Coordinated, end-to-end cargo movement",
      icon: Truck,
      image: "/images/AirRajasthan.jpg",
      description:
        "AirRajasthan™ aims to provide integrated logistics solutions by coordinating air transportation with trusted third-party logistics providers, transport operators, warehouse partners, and customs service providers.",
      bullets: [
        "First-mile pickup and last-mile delivery arrangements.",
        "Road transportation and airport-to-airport or door-to-door logistics coordination.",
        "Warehousing, cargo storage, and consolidation through service partners.",
        "Customs clearance facilitation and import-export documentation support.",
        "Specialised handling coordination for perishables, pharmaceuticals, valuables, dangerous goods, and live animals, where permitted and subject to appropriate facilities and approvals.",
        "Project cargo, oversized shipment planning, and charter logistics coordination.",
        "Shipment planning across multiple transport modes where commercially appropriate.",
      ],
      focus:
        "A single commercial point of coordination for customers who need their cargo managed from origin to destination, using a partner-led operating model rather than relying exclusively on owned infrastructure.",
    },
    {
      id: "india-uae-trade",
      title: "India–UAE Trade Connectivity",
      tagline: "Creating commercial links between two strategic markets",
      icon: Globe,
      image: "/images/Route.jpg",
      description:
        "Through our proposed Jaipur–Fujairah cargo corridor, AirRajasthan™ aims to facilitate trade between Indian businesses and UAE-based buyers, importers, and distribution networks.",
      bullets: [
        "Cargo solutions for exporters, manufacturers, traders, and importers.",
        "Connecting Indian suppliers with UAE customers and distribution partners.",
        "Supporting UAE businesses sourcing goods from India and Indian businesses serving UAE markets.",
        "Cargo planning for time-sensitive, high-value, and specialised shipments, subject to acceptance requirements.",
        "Coordination with freight forwarders, customs brokers, transport providers, and commercial partners.",
        "Identifying return-leg cargo opportunities to support balanced traffic flows and route sustainability.",
        "Progressive development of new trade corridors as demand and partnerships mature.",
      ],
      focus:
        "Making air cargo and associated logistics more accessible to businesses while creating commercially sustainable links between India, the UAE, and wider international markets.",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-20 sm:py-24 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Commercial Offerings</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            CONNECTING YOUR TRADE WITH THE RIGHT SOLUTIONS
          </h1>
          <p className="text-sm sm:text-base text-[#D8D8D6] max-w-3xl leading-relaxed font-light">
            Comprehensive air cargo, charter operations, supply chain coordination,
            and bilateral India–UAE trade connectivity built around customer needs
            and trusted operational partners.
          </p>
        </div>
      </section>

      {/* Four Core Categories in Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={cat.id}
              id={cat.id}
              className="bg-white rounded-xl border border-[#E5E5E3] overflow-hidden shadow-xs scroll-mt-24"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                
                {/* Content Column */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold tracking-wider text-[#0083C7] font-display">
                        Service Area 0{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1C1B1A] uppercase">
                        {cat.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#D39257] italic">
                    {cat.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B1A] block font-display">
                      Key Capabilities &amp; Arrangements:
                    </span>
                    <ul className="space-y-2">
                      {cat.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs text-[#4B4947] leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7] mt-1.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategic Focus Box */}
                  <div className="p-4 bg-[#F9F9F8] border border-[#E5E5E3] rounded text-xs space-y-1">
                    <span className="font-bold text-[#1C1B1A] uppercase font-display block">
                      Our Focus:
                    </span>
                    <p className="text-[#686664] leading-relaxed">{cat.focus}</p>
                  </div>

                  {/* Inquiry CTA */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(cat.title)}
                      className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Inquire About {cat.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Image Column */}
                <div
                  className={`lg:col-span-5 relative bg-[#1C1B1A] min-h-[300px] lg:min-h-full ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A]/80 via-transparent to-transparent lg:hidden" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-xs rounded text-[11px] text-[#1C1B1A] font-medium hidden sm:block border border-white/20">
                    <span>{cat.title} &middot; Operational Coordination</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Charter Aircraft Options Section (formerly Fleet Options) */}
      <section className="bg-white border-y border-[#E5E5E3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span>Fleet Coordination</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              Charter Aircraft Options
            </h2>
            <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
              AirRajasthan™ aims to source a versatile range of freighter
              aircraft to meet diverse cargo transportation requirements,
              depending on route, payload, cargo dimensions, aircraft availability,
              and operational economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Regular Mid-Range Operations */}
            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E3]">
                <h3 className="text-sm font-bold font-display uppercase text-[#1C1B1A]">
                  Regular Adhoc / Mid-Range
                </h3>
                <span className="text-[11px] text-[#0083C7] font-semibold uppercase">
                  Regional
                </span>
              </div>
              <p className="text-xs text-[#686664]">
                Proposed for regional line-hauls, general cargo, textiles,
                e-commerce, and consolidated freight:
              </p>
              <ul className="space-y-2 text-xs font-mono text-[#1C1B1A]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7]" />
                  <span>Boeing 737-800F</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7]" />
                  <span>Boeing 737-200F</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7]" />
                  <span>Boeing 757-200F</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7]" />
                  <span>Airbus A320F</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7]" />
                  <span>Airbus A321F</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Bulk, Oversized & Special Cargo */}
            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E3]">
                <h3 className="text-sm font-bold font-display uppercase text-[#1C1B1A]">
                  Bulk, Oversized &amp; Special
                </h3>
                <span className="text-[11px] text-[#D39257] font-semibold uppercase">
                  Heavy-Lift
                </span>
              </div>
              <p className="text-xs text-[#686664]">
                Explored for project cargo, industrial machinery, and heavy equipment
                with special loading requirements:
              </p>
              <ul className="space-y-2 text-xs font-mono text-[#1C1B1A]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D39257]" />
                  <span>Boeing 747F (Nose Loading)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D39257]" />
                  <span>Ilyushin IL-76 (Rear Door)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D39257]" />
                  <span>Antonov An-124</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D39257]" />
                  <span>Antonov An-12</span>
                </li>
              </ul>
            </div>

            {/* Column 3: On-Demand Passenger Charter */}
            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E3]">
                <h3 className="text-sm font-bold font-display uppercase text-[#1C1B1A]">
                  On-Demand Passenger Charter
                </h3>
                <span className="text-[11px] text-[#686664] font-semibold uppercase">
                  Future Scope
                </span>
              </div>
              <p className="text-xs text-[#686664]">
                Future expansion into selected on-demand passenger charters and
                corporate delegation flights, subject to required approvals and
                qualified aviation partnerships.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onOpenInquiry("Charter Aircraft Assessment")}
                  className="w-full py-2.5 px-4 bg-white border border-[#0083C7] text-[#0083C7] hover:bg-[#0083C7] hover:text-white text-xs uppercase font-bold tracking-wider rounded transition-colors text-center"
                >
                  Request Aircraft Assessment
                </button>
              </div>
            </div>

          </div>

          {/* Strict Operating Qualification Banner */}
          <div className="p-4 bg-[#EFF7FC] border border-[#B2DEF3] rounded-lg text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#005A8A]">
              <FileCheck className="w-4 h-4 text-[#0083C7]" />
              <span>Partner-Sourced Operational Specifications Disclosure</span>
            </div>
            <p className="text-[#005A8A] text-[11px] leading-relaxed">
              By working with qualified aircraft owners, charter operators, and
              logistics partners, AirRajasthan™ aims to match the most suitable
              aircraft to each shipment. All aircraft deployments will be subject to
              technical suitability, payload and dimensional limits, route
              feasibility, airport compatibility, regulatory approvals, and
              commercial viability.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
