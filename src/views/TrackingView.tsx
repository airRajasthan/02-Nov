import React from "react";
import { TrackingWidget } from "../components/TrackingWidget";
import { PageRoute } from "../types";
import { ShieldCheck, Plane, FileCheck, Layers } from "lucide-react";

interface TrackingViewProps {
  onOpenQuote: () => void;
}

export function TrackingView({ onOpenQuote }: TrackingViewProps) {
  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-14 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Cargo Visibility Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight">
            Airway Bill (AWB) Tracking &amp; Milestones
          </h1>
          <p className="text-xs sm:text-sm text-[#D8D8D6] max-w-2xl">
            Track line-haul progression, tarmac loading timestamps, temperature telemetry, and customs clearance status across all regional flight manifests.
          </p>
        </div>
      </section>

      {/* Main Tracking Widget */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrackingWidget compact={false} />
      </section>

      {/* Test AWB Manifest Quick Reference */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-[#E5E5E3] p-6 space-y-4">
          <h3 className="text-sm font-bold font-display uppercase text-[#2B2A29]">
            Active Pre-Configured Test Manifests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] space-y-1">
              <span className="font-mono font-bold text-[#0083C7] block">AR-7842-DEL</span>
              <span className="font-semibold text-[#2B2A29] block">In Flight (FL340)</span>
              <span className="text-[#686664] block">Jaipur (JAI) &rarr; Dubai (DWC)</span>
              <span className="text-[11px] text-[#8C8A88] block">Boeing 737-800BCF · 2,450 kg</span>
            </div>
            <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] space-y-1">
              <span className="font-mono font-bold text-[#0083C7] block">AR-9104-JAI</span>
              <span className="font-semibold text-emerald-700 block">Consignment Delivered</span>
              <span className="text-[#686664] block">Mumbai (BOM) &rarr; Jaipur (JAI)</span>
              <span className="text-[11px] text-[#8C8A88] block">Inland Depot Transfer · 4,800 kg</span>
            </div>
            <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] space-y-1">
              <span className="font-mono font-bold text-[#0083C7] block">AR-3321-BOM</span>
              <span className="font-semibold text-[#D39257] block">Customs Cleared</span>
              <span className="text-[#686664] block">Udaipur (UDR) &rarr; Mumbai (BOM)</span>
              <span className="text-[11px] text-[#8C8A88] block">Active Cool +4.2°C · 850 kg</span>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Notes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-[#FAF5EE] border border-[#E7CFB2] rounded-lg text-xs space-y-2 text-[#704724]">
          <div className="flex items-center gap-2 font-bold font-display uppercase">
            <ShieldCheck className="w-4 h-4 text-[#D39257]" />
            <span>Decoupled Carrier API Architecture (`ITrackingProvider`)</span>
          </div>
          <p className="leading-relaxed">
            The tracking simulator implements the production <code className="bg-white/80 px-1 py-0.5 rounded font-mono">ITrackingProvider</code> interface. When transitioning from demonstration to live production carrier flight operations, carrier APIs (such as SITA, Champ Cargosystems, or Descartes) are connected via <code className="bg-white/80 px-1 py-0.5 rounded font-mono">TrackingService.setProvider(realProvider)</code> without altering frontend client consumers.
          </p>
        </div>
      </section>

    </div>
  );
}
