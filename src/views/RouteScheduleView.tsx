import React from "react";
import { Link } from "../router";
import {
  MapPin,
  Calendar,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Plane,
  Compass,
} from "lucide-react";

interface RouteScheduleViewProps {
  onOpenInquiry: (context?: string) => void;
}

export function RouteScheduleView({ onOpenInquiry }: RouteScheduleViewProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-20 sm:py-24 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Network Development</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            Proposed Route &amp; Flight Corridors
          </h1>
          <p className="text-sm sm:text-base text-[#D8D8D6] max-w-3xl leading-relaxed font-light">
            Connecting Western India&apos;s industrial manufacturing centers with
            the strategic UAE gateway at Fujairah.
          </p>
        </div>
      </section>

      {/* Corridor Description & Schedule Intentions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span>Proposed Route Framework</span>
            </div>
            
            <h2 className="text-3xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              Fujairah–Jaipur–Fujairah Cargo Corridor
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#686664] leading-relaxed">
              <p>
                AirRajasthan™ plans to commence cargo operations on the
                Fujairah–Jaipur–Fujairah route, initially targeting one flight per
                week on an ad hoc charter basis.
              </p>
              <p>
                Subject to market demand, cargo volumes, aircraft availability,
                and necessary operational approvals, we aim to progressively
                increase the frequency to three to four flights per week.
              </p>
              <p>
                Building on this initial route, AirRajasthan™ envisions expanding
                its network to connect major commercial and logistics centres across
                India and the UAE, followed by selected destinations throughout
                Africa, Europe, and Central Asia. Our expansion strategy will focus
                on emerging trade corridors, underserved cargo markets, and
                commercially viable routes that support growing international trade.
              </p>
            </div>

            {/* Status Notice */}
            <div className="p-4 bg-[#F9F9F8] rounded border border-[#E5E5E3] text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#1C1B1A]">
                <Clock className="w-4 h-4 text-[#D39257]" />
                <span>Operating Timetable Status</span>
              </div>
              <p className="text-[#686664] text-[11px] leading-relaxed">
                Detailed flight schedules, additional destinations, and
                commencement dates will be announced as operations are finalised
                and confirmed with aviation authorities. No confirmed departures or
                instant booking currently operate.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry("Jaipur–Fujairah Corridor Charter")}
                className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors cursor-pointer"
              >
                Inquire For Proposed Corridor Space
              </button>
              <Link
                to="/the-hub"
                className="text-xs font-semibold text-[#0083C7] hover:underline"
              >
                Explore the Fujairah Multimodal Hub &rarr;
              </Link>
            </div>
          </div>

          {/* Quick Route Facts Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#E5E5E3] shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-display uppercase text-[#1C1B1A]">
              Corridor Specifications (Proposed)
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] flex justify-between items-center">
                <span className="text-[#686664]">Origin / Destination A:</span>
                <span className="font-bold text-[#1C1B1A]">Jaipur (JAI), India</span>
              </div>
              <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] flex justify-between items-center">
                <span className="text-[#686664]">Origin / Destination B:</span>
                <span className="font-bold text-[#1C1B1A]">Fujairah (FJR), UAE</span>
              </div>
              <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] flex justify-between items-center">
                <span className="text-[#686664]">Target Initial Frequency:</span>
                <span className="font-bold text-[#0083C7]">1 flight/week (Ad hoc)</span>
              </div>
              <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] flex justify-between items-center">
                <span className="text-[#686664]">Target Scaling Frequency:</span>
                <span className="font-bold text-[#D39257]">3 to 4 flights/week*</span>
              </div>
              <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] flex justify-between items-center">
                <span className="text-[#686664]">Operational Basis:</span>
                <span className="font-semibold text-[#1C1B1A]">Dedicated Cargo Charter</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C8A88] italic">
              *Scaling subject to commercial demand, cargo consolidation volumes,
              aircraft availability, and slot permissions.
            </p>
          </div>

        </div>
      </section>

      {/* Geographically Accurate World Map & Route Corridor Visualization */}
      <section className="bg-white border-y border-[#E5E5E3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#0083C7] font-display">
              Geographic Route Map
            </span>
            <h2 className="text-3xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              Bilateral Corridor &amp; Envisioned Connectivity
            </h2>
            <p className="text-xs sm:text-sm text-[#686664]">
              Accurately identifying the strategic corridor between Jaipur and
              Fujairah, with clear distinction between initial proposed operations
              and future network ambitions.
            </p>
          </div>

          {/* Interactive Route Map Container */}
          <div className="rounded-xl border border-[#E5E5E3] overflow-hidden bg-[#161514] relative shadow-lg">
            
            {/* Background Map Imagery from supplied assets */}
            <div className="relative aspect-[16/9] max-h-[580px] w-full overflow-hidden">
              <img
                src="/images/Route.jpg"
                alt="AirRajasthan proposed route map showing Jaipur to Fujairah corridor"
                className="w-full h-full object-cover object-center opacity-85"
                loading="lazy"
              />

              {/* Geographically accurate overlay SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1000 560"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  {/* Gradient for proposed flight corridor */}
                  <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0083C7" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#3EA6E1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#D39257" stopOpacity="0.9" />
                  </linearGradient>
                  
                  {/* Glow filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Proposed Corridor Arc: Fujairah (approx 440, 275) to Jaipur (approx 585, 260) */}
                <path
                  d="M 445 275 Q 515 235 585 260"
                  fill="none"
                  stroke="url(#corridorGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Animated pulsating flight path pulse */}
                <path
                  d="M 445 275 Q 515 235 585 260"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="6 12"
                  className="animate-pulse"
                />

                {/* Planned Future Expansion Arcs (Dashed lines to Africa, Europe, Central Asia) */}
                {/* To East Africa */}
                <path
                  d="M 445 275 Q 400 370 380 430"
                  fill="none"
                  stroke="#D39257"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                {/* To Central Asia */}
                <path
                  d="M 445 275 Q 470 190 490 140"
                  fill="none"
                  stroke="#D39257"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                {/* To Europe */}
                <path
                  d="M 445 275 Q 350 190 280 150"
                  fill="none"
                  stroke="#D39257"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />

                {/* Fujairah Hub Node */}
                <g transform="translate(445, 275)">
                  <circle r="9" fill="#0083C7" fillOpacity="0.3" className="animate-ping" />
                  <circle r="5" fill="#0083C7" stroke="#FFFFFF" strokeWidth="1.5" />
                  <rect x="-45" y="-28" width="90" height="20" rx="3" fill="#1C1B1A" fillOpacity="0.85" stroke="#0083C7" strokeWidth="1" />
                  <text x="0" y="-14" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="Rajdhani, sans-serif" textAnchor="middle">
                    FUJAIRAH (FJR)
                  </text>
                </g>

                {/* Jaipur Hub Node */}
                <g transform="translate(585, 260)">
                  <circle r="9" fill="#D39257" fillOpacity="0.3" className="animate-ping" />
                  <circle r="5" fill="#D39257" stroke="#FFFFFF" strokeWidth="1.5" />
                  <rect x="-35" y="-28" width="70" height="20" rx="3" fill="#1C1B1A" fillOpacity="0.85" stroke="#D39257" strokeWidth="1" />
                  <text x="0" y="-14" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="Rajdhani, sans-serif" textAnchor="middle">
                    JAIPUR (JAI)
                  </text>
                </g>
              </svg>
            </div>

            {/* Map Legend Overlay */}
            <div className="p-4 sm:p-6 bg-[#1C1B1A] border-t border-[#383635] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-1 bg-[#0083C7] rounded-full" />
                  <span className="text-white font-medium">
                    Proposed Bilateral Cargo Corridor (Jaipur &harr; Fujairah)
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-1 border-b-2 border-dashed border-[#D39257]" />
                  <span className="text-[#B7B6B4]">
                    Planned Future Expansion (Africa, Europe, Central Asia)
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-[#8C8A88]">
                Map visual reference &middot; Base asset: AirRajasthan Website Route Portfolio
              </div>
            </div>

          </div>

          {/* Network Planning Statement */}
          <div className="p-4 bg-[#EFF7FC] border border-[#B2DEF3] rounded-lg text-xs space-y-1">
            <span className="font-semibold text-[#005A8A] block">
              Notice on Expansion Corridors:
            </span>
            <p className="text-[#005A8A] text-[11px] leading-relaxed">
              Connectivity to secondary commercial centers across India, Africa,
              Europe, and Central Asia reflects long-term planning ambitions.
              AirRajasthan™ does not list speculative destinations as active or
              operating routes until all commercial, operational, and regulatory
              agreements are secured.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
