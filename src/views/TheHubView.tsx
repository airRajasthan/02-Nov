import React from "react";
import { Link } from "../router";
import {
  Plane,
  Anchor,
  Train,
  Truck,
  ArrowRight,
  Radio,
  MapPin,
  Building,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface TheHubViewProps {
  onOpenInquiry: (context?: string) => void;
}

export function TheHubView({ onOpenInquiry }: TheHubViewProps) {
  const multimodalPillars = [
    {
      title: "Air Cargo Gateway",
      tagline: "Dedicated freighter operations & ad hoc charter slots",
      icon: Plane,
      description:
        "Fujairah International Airport provides streamlined ramp turnaround times, direct apron transshipment access, and capacity for regional and wide-body freighter operations without the heavy air traffic congestion experienced at larger metropolitan hubs.",
      image: "/images/FIA.jpg",
      imageAlt: "Fujairah International Airport passenger and cargo terminal facility",
    },
    {
      title: "Aviation Infrastructure & Air Traffic Control",
      tagline: "Modern ATC operations and unconstrained slot availability",
      icon: Radio,
      description:
        "Equipped with modern air traffic control facilities, category-certified runway infrastructure, and dedicated apron space, Fujairah accommodates heavy cargo freighters, nose-loading aircraft, and rapid turnarounds for time-critical logistics.",
      image: "/images/FIA ATC towrer.jpg",
      imageAlt: "Fujairah International Airport modern Air Traffic Control tower",
    },
    {
      title: "Deepwater Maritime Port",
      tagline: "Direct access to the Gulf of Oman and Indian Ocean routes",
      icon: Anchor,
      description:
        "Located on the UAE's eastern coastline outside the Strait of Hormuz, Fujairah's port facilities enable rapid sea-to-air transshipment, connecting major shipping lanes from the Indian subcontinent, East Africa, and the Red Sea directly with air feeder routes.",
      image: "/images/Fujairah Google Image-1.jpg",
      imageAlt: "Fujairah coastal geography along the Gulf of Oman",
    },
    {
      title: "National Freight Rail & Highway Integration",
      tagline: "Etihad Rail and regional highway network connecting the GCC",
      icon: Train,
      description:
        "Fujairah is integrated into the UAE's national rail freight network (Etihad Rail) and modern multi-lane highway corridors, connecting coastal port terminals with inland freight dry ports, Abu Dhabi industrial zones, and cross-border GCC road feeder routes within hours.",
      image: "/images/Route.jpg",
      imageAlt: "Multimodal route connectivity linking Fujairah gateway to Indian and regional corridors",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-20 sm:py-24 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Multimodal Hub &amp; Gateway</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            Fujairah — AirRajasthan&apos;s Strategic Hub
          </h1>
          <p className="text-sm sm:text-base text-[#D8D8D6] max-w-3xl leading-relaxed font-light">
            Connecting Air, Sea, Rail &amp; Road on the UAE&apos;s eastern coastline, creating a
            dependable commercial bridge between India and global trade routes.
          </p>
        </div>
      </section>

      {/* Picture-Led Intro Section with Fujairah Coastal Satellite / Aerial Imagery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span>Geographic Advantage</span>
            </div>

            <h2 className="text-3xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              A Strategic Gateway for Regional &amp; International Trade
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#686664] leading-relaxed">
              <p>
                AirRajasthan™ envisions Fujairah as a strategic gateway for its aviation, air cargo,
                and logistics operations, connecting India with the UAE and progressively extending
                its reach towards Africa, Europe, and Central Asia.
              </p>
              <p>
                Located on the UAE&apos;s eastern coast along the Gulf of Oman, Fujairah offers an
                important geographical advantage for international trade, with direct access to
                maritime shipping routes serving the Indian subcontinent, the wider Gulf, the Red Sea,
                and East Africa. Its established airport, port infrastructure, and growing logistics
                ecosystem provide a strong foundation for developing an integrated, multimodal cargo
                network.
              </p>
              <p>
                Our proposed Fujairah–Jaipur–Fujairah cargo corridor forms the starting point of this
                vision. By coordinating air cargo with sea freight, road transportation, warehousing,
                and customs services through qualified partners, AirRajasthan™ aims to offer customers
                flexible transport options based on urgency, shipment size, cost, and destination
                requirements.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry("Fujairah Hub Transshipment")}
                className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors cursor-pointer"
              >
                Inquire For Hub Solutions
              </button>
              <Link to="/route-schedule" className="text-xs font-semibold text-[#0083C7] hover:underline">
                View Route &amp; Schedule &rarr;
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-xl border border-[#E5E5E3] overflow-hidden bg-[#1C1B1A] shadow-md group">
              <img
                src="/images/Fujairah Google Image-1.jpg"
                alt="Fujairah coastline and strategic geographic position on Gulf of Oman"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                loading="eager"
              />
              <div className="p-4 bg-white border-t border-[#E5E5E3] text-xs">
                <span className="font-bold text-[#1C1B1A] block font-display uppercase">
                  Fujairah Strategic Coastal Hub
                </span>
                <span className="text-[#8C8A88]">
                  Direct maritime access along the Gulf of Oman linking air, sea, rail, and land transport
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Picture-Led Four Connectivity Pillars with FIA, ATC Tower & Infrastructure Photos */}
      <section className="bg-white border-y border-[#E5E5E3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#0083C7] font-display">
              Four Pillars of Connectivity
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              Multimodal Transport Integration
            </h2>
            <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
              Air freight serves time-sensitive consignments, while maritime, rail, and road
              transportation support volume-dense and cost-sensitive cargo movements across global supply
              chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {multimodalPillars.map((pillar, pIdx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="bg-[#F9F9F8] rounded-xl border border-[#E5E5E3] overflow-hidden shadow-xs hover:border-[#0083C7] transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#1C1B1A] relative">
                    <img
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 p-2.5 bg-white/95 rounded shadow-sm text-[#0083C7]">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#D39257] font-display">
                        Pillar 0{pIdx + 1}
                      </span>
                      <h3 className="text-xl font-bold font-display uppercase text-[#1C1B1A]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#0083C7] italic">
                        {pillar.tagline}
                      </p>
                      <p className="text-xs text-[#686664] leading-relaxed pt-1">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E5E5E3]/80">
                      <button
                        type="button"
                        onClick={() => onOpenInquiry(`The Hub - ${pillar.title}`)}
                        className="text-xs font-semibold text-[#0083C7] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire About {pillar.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Clarification Disclosure */}
          <div className="p-4 bg-[#EFF7FC] border border-[#B2DEF3] rounded-lg text-xs space-y-1">
            <div className="flex items-center gap-2 font-semibold text-[#005A8A]">
              <ShieldCheck className="w-4 h-4 text-[#0083C7]" />
              <span>Multimodal Partner Coordination:</span>
            </div>
            <p className="text-[#005A8A] text-[11px] leading-relaxed">
              AirRajasthan™ provides commercial coordination across air, sea, rail, and road modes
              using established, qualified logistics partners rather than exclusively owned
              infrastructure. Services are subject to carrier availability, station customs approvals,
              and operational agreements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
