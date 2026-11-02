import React from "react";
import { Link } from "../router";
import {
  Handshake,
  Briefcase,
  Plane,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
} from "lucide-react";

interface PartnershipViewProps {
  onOpenInquiry: (context?: string) => void;
}

export function PartnershipView({ onOpenInquiry }: PartnershipViewProps) {
  const tracks = [
    {
      id: "gsa",
      number: "01",
      title: "General Sales Agent (GSA) Partnerships",
      tagline: "Represent the Route. Develop the Market. Grow Together.",
      icon: Handshake,
      image: "/images/Our Vision.jpg",
      description:
        "We invite established cargo agents, freight forwarders, and aviation businesses to explore GSA partnerships for developing cargo business within agreed territories and markets.",
      points: [
        "Develop key customer relationships and promote available cargo capacity.",
        "Generate bookings and build a sustainable sales network for AirRajasthan's developing routes.",
        "Collaboration suited to partners with strong local market knowledge, established shipper and forwarder relationships, and the ability to build consistent cargo volumes.",
      ],
      contextKey: "General Sales Agent (GSA) Partnership",
    },
    {
      id: "csa",
      number: "02",
      title: "Cargo Sales Agent (CSA) Partnerships",
      tagline: "Your Market Reach. Our Cargo Opportunities.",
      icon: Briefcase,
      image: "/images/Service-2 Aircargo Services.jpg",
      description:
        "AirRajasthan™ welcomes cargo sales agents who can introduce customers, develop shipment bookings, and expand our commercial reach across regional and international markets.",
      points: [
        "Suited to independent sales professionals, cargo agents, freight forwarders, and regional logistics companies.",
        "Opportunity to work under mutually agreed, structured commercial terms.",
        "Appointment scope, territory, commission structure, and commercial responsibilities will be defined individually based on market potential.",
      ],
      contextKey: "Cargo Sales Agent (CSA) Partnership",
    },
    {
      id: "charter-project",
      number: "03",
      title: "Full Aircraft Charter & Project Cargo Solutions",
      tagline: "The Right Aircraft. The Right Destination. Built Around Your Project.",
      icon: Plane,
      image: "/images/Services-1 Aviation & Charter Services.webp",
      description:
        "AirRajasthan™ aims to coordinate dedicated cargo aircraft charter solutions for businesses and organisations requiring dedicated capacity for specific projects, urgent shipments, oversized cargo, or specialised transportation.",
      points: [
        "Working with suitable aircraft owners and qualified operating partners to source appropriate freighter capacity.",
        "Charter solutions evaluated based on cargo dimensions, payload, route feasibility, schedule, and airport compatibility.",
        "Potential applications: industrial machinery, infrastructure projects, heavy equipment, humanitarian logistics, and emergency manufacturing line-hauls.",
      ],
      contextKey: "Full Aircraft Charter & Project Cargo",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-20 sm:py-24 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Commercial Collaboration</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            Partnership Opportunities
          </h1>
          <p className="text-sm sm:text-base text-[#D8D8D6] max-w-3xl leading-relaxed font-light">
            Grow with AirRajasthan™. Connect beyond boundaries as we develop our
            air cargo network connecting India, the UAE, and international markets.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
            Building Strong Aviation &amp; Logistics Alliances
          </h2>
          <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
            At AirRajasthan™, we believe strong partnerships are the foundation
            of sustainable aviation and logistics growth. Whether you are looking
            to represent our cargo services in your market, develop cargo sales
            opportunities, or arrange dedicated aircraft capacity for a specific
            project, AirRajasthan™ welcomes collaboration built on trust,
            commercial value, and shared growth.
          </p>
        </div>
      </section>

      {/* Three Partnership Tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {tracks.map((track) => {
          const TrackIcon = track.icon;

          return (
            <div
              key={track.id}
              className="bg-white rounded-xl border border-[#E5E5E3] overflow-hidden shadow-xs hover:border-[#0083C7] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Content */}
                <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center shrink-0">
                        <TrackIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs uppercase font-bold tracking-wider text-[#D39257] font-display">
                          Partnership Track {track.number}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1C1B1A] uppercase">
                          {track.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#0083C7] italic">
                      {track.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
                      {track.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B1A] block font-display">
                        Partnership Scope &amp; Focus:
                      </span>
                      <ul className="space-y-2">
                        {track.points.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs text-[#4B4947] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7] mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Dedicated Inquiry CTA with Context */}
                  <div className="pt-6 border-t border-[#F2F2F0]">
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(track.contextKey)}
                      className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Inquire for {track.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:col-span-5 bg-[#1C1B1A] min-h-[260px] lg:min-h-full relative">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A]/70 to-transparent lg:hidden" />
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Commercial Qualification Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 bg-[#EFF7FC] border border-[#B2DEF3] rounded-lg text-xs space-y-1">
          <div className="flex items-center gap-2 font-semibold text-[#005A8A]">
            <ShieldCheck className="w-4 h-4 text-[#0083C7]" />
            <span>Commercial Governance Notice:</span>
          </div>
          <p className="text-[#005A8A] text-[11px] leading-relaxed">
            Partnership inquiries are reviewed on individual operational and
            commercial merit. Publication of partnership opportunities does not
            constitute an offer of representation, agreed commission structure, or
            binding commercial agency until formal agreements are executed.
          </p>
        </div>
      </section>

    </div>
  );
}
