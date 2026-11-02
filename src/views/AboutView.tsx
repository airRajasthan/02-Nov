import React from "react";
import { PageRoute } from "../types";
import { 
  Plane, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Boxes,
  FileCheck,
  Building
} from "lucide-react";

interface AboutViewProps {
  onRouteChange: (route: PageRoute) => void;
  onOpenQuote: () => void;
}

export function AboutView({ onRouteChange, onOpenQuote }: AboutViewProps) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-16 sm:py-20 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>AirRajasthan Corporate Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight">
            Pioneering Regional Air Cargo Infrastructure
          </h1>
          <p className="text-sm sm:text-base text-[#D8D8D6] max-w-3xl leading-relaxed">
            AirRajasthan was conceived to bridge Western India&apos;s manufacturing and export hubs directly with national transshipment centers and international commercial corridors.
          </p>
        </div>
      </section>

      {/* Mission & Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-[#0083C7] font-display">
              Strategic Rationale
            </span>
            <h2 className="text-3xl font-bold font-display text-[#2B2A29] uppercase">
              Western India Industrial Corridor Integration
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#686664] leading-relaxed">
              <p>
                Rajasthan represents one of India&apos;s most vital manufacturing corridors, generating world-class automotive components in Bhiwadi and Alwar, renowned gemstones and handcrafted luxury goods in Jaipur, and active pharmaceutical ingredients (APIs) in Mewar and Udaipur.
              </p>
              <p>
                Historically, regional exporters relied on long-distance bonded trucking to distant maritime ports or congested metropolitan airports. AirRajasthan introduces scheduled regional air freight feeder flights that reduce transit times from days to hours, ensuring immediate access to domestic line-hauls and international flights.
              </p>
              <p>
                Through direct airport-to-airport line-hauls and bonded inland container cross-docking, we offer manufacturing enterprises predictable payload guarantees and specialized cold-chain and high-value security protocols.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuote}
                className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded transition-colors"
              >
                Request Route Assessment
              </button>
              <button
                type="button"
                onClick={() => onRouteChange("/services")}
                className="text-xs font-semibold text-[#0083C7] hover:underline"
              >
                View Cargo Solutions &rarr;
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-lg border border-[#E5E5E3] overflow-hidden bg-slate-900 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80"
                alt="AirRajasthan conceptual freighter line-haul"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-white border-t border-[#E5E5E3] text-xs space-y-1">
                <span className="font-bold text-[#2B2A29] block">Boeing 737-800BCF Freighter Concept</span>
                <span className="text-[#8C8A88]">Payload Capacity: 23,900 kg · 12 Main Deck Pallets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Concept Specifications */}
      <section className="bg-white border-y border-[#E5E5E3] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-xl space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#0083C7] font-display">
              Technical Specifications (Concept)
            </span>
            <h2 className="text-3xl font-bold font-display text-[#2B2A29] uppercase">
              Freighter Fleet Architecture
            </h2>
            <p className="text-xs text-[#8C8A88]">
              *Specifications represent the operational parameters designed for regional runway lengths and turnaround efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spec Box 1 */}
            <div className="p-6 rounded-lg border border-[#E5E5E3] bg-[#F9F9F8] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display text-[#2B2A29]">
                  Boeing 737-800BCF (Boeing Converted Freighter)
                </h3>
                <span className="text-xs font-mono font-bold text-[#0083C7]">MAINLINE</span>
              </div>
              <p className="text-xs text-[#686664] leading-relaxed">
                Primary regional narrow-body freighter engineered for high-density line-hauls between Jaipur (JAI) and international hub gateways (BOM, DEL, DWC).
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-[#E5E5E3]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Max Structural Payload</span>
                  <span className="font-semibold text-[#2B2A29] tabular-nums">23,900 kg (52,700 lbs)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Cargo Volume</span>
                  <span className="font-semibold text-[#2B2A29] tabular-nums">141.5 m³ (5,000 cu ft)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Main Deck Pallets</span>
                  <span className="font-semibold text-[#2B2A29]">11 Standard + 1 Half Pallet</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Max Range at Full Payload</span>
                  <span className="font-semibold text-[#2B2A29] tabular-nums">3,750 km (2,025 nm)</span>
                </div>
              </div>
            </div>

            {/* Spec Box 2 */}
            <div className="p-6 rounded-lg border border-[#E5E5E3] bg-[#F9F9F8] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display text-[#2B2A29]">
                  ATR-72-500F Regional Turboprop Feeder
                </h3>
                <span className="text-xs font-mono font-bold text-[#D39257]">REGIONAL FEEDER</span>
              </div>
              <p className="text-xs text-[#686664] leading-relaxed">
                Short-field turboprop freighter optimized for short-haul sectors between Tier-2 and Tier-3 airports (Jodhpur, Udaipur, Bikaner) requiring quick turnaround.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-[#E5E5E3]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Max Structural Payload</span>
                  <span className="font-semibold text-[#2B2A29] tabular-nums">8,400 kg (18,500 lbs)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Cargo Volume</span>
                  <span className="font-semibold text-[#2B2A29] tabular-nums">75.5 m³ (2,666 cu ft)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Bulk &amp; ULD Config</span>
                  <span className="font-semibold text-[#2B2A29]">Containerized (LD3-45W)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C8A88] block">Field Performance</span>
                  <span className="font-semibold text-[#2B2A29]">Short Runway Capable (&lt;1400m)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-white border border-[#E5E5E3] rounded-lg space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#0083C7]" />
            <h3 className="text-2xl font-bold font-display text-[#2B2A29] uppercase">
              Operational Standards &amp; Safety Governance
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#686664] leading-relaxed">
            <div className="space-y-2 p-4 bg-[#F9F9F8] rounded border border-[#E5E5E3]">
              <span className="font-bold text-[#2B2A29] block">IATA Live Animals &amp; Perishables</span>
              <p>Strict adherence to IATA Perishable Cargo Regulations (PCR) and Temperature Control Regulations (TCR) for high-value organic consignments.</p>
            </div>
            <div className="space-y-2 p-4 bg-[#F9F9F8] rounded border border-[#E5E5E3]">
              <span className="font-bold text-[#2B2A29] block">GDP Healthcare Certification</span>
              <p>WHO Good Distribution Practices (GDP) compliance with unbroken temperature audit trails, validated thermal blankets, and active Envirotainer handling.</p>
            </div>
            <div className="space-y-2 p-4 bg-[#F9F9F8] rounded border border-[#E5E5E3]">
              <span className="font-bold text-[#2B2A29] block">EDI Customs Pre-Clearance</span>
              <p>Direct electronic integration with Indian Customs ICEGATE and international air cargo manifests (FWB/FHL message protocols).</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
