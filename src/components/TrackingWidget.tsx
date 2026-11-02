import React, { useState } from "react";
import { DEMO_TRACKING_DATA } from "../data/mockData";
import { TrackingRecord, TrackingMilestone } from "../types";
import { 
  Search, 
  Plane, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ArrowRight,
  ThermometerSnowflake,
  Package,
  Layers
} from "lucide-react";

interface TrackingWidgetProps {
  initialAwb?: string;
  compact?: boolean;
}

export function TrackingWidget({ initialAwb = "AR-7842-DEL", compact = false }: TrackingWidgetProps) {
  const [inputAwb, setInputAwb] = useState(initialAwb);
  const [currentAwb, setCurrentAwb] = useState(initialAwb);
  const [searchedRecord, setSearchedRecord] = useState<TrackingRecord | null>(
    DEMO_TRACKING_DATA[initialAwb] || null
  );
  const [notFound, setNotFound] = useState(false);

  const handleTrack = (awbToTrack: string) => {
    const formatted = awbToTrack.trim().toUpperCase();
    setInputAwb(formatted);
    setCurrentAwb(formatted);
    if (DEMO_TRACKING_DATA[formatted]) {
      setSearchedRecord(DEMO_TRACKING_DATA[formatted]);
      setNotFound(false);
    } else {
      setSearchedRecord(null);
      setNotFound(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAwb) {
      handleTrack(inputAwb);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-[#E5E5E3] shadow-xs overflow-hidden ${compact ? "p-4" : "p-6 lg:p-8"}`}>
      {/* Header and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0083C7]" />
              <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-[#2B2A29]">
                Live Airway Bill (AWB) Tracking
              </h2>
            </div>
            <p className="text-xs text-[#686664] mt-0.5">
              Real-time consignment milestones across regional feeder flights and transshipment corridors.
            </p>
          </div>
          
          {/* Quick-Fill Test AWBs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#8C8A88] font-medium mr-1">Demo AWBs:</span>
            {Object.keys(DEMO_TRACKING_DATA).map((awb) => (
              <button
                key={awb}
                type="button"
                onClick={() => handleTrack(awb)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-colors cursor-pointer ${
                  currentAwb === awb
                    ? "bg-[#0083C7] text-white border-[#0083C7]"
                    : "bg-[#F9F9F8] text-[#2B2A29] border-[#E5E5E3] hover:border-[#0083C7]"
                }`}
              >
                {awb}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8A88]" />
            <input
              type="text"
              value={inputAwb}
              onChange={(e) => setInputAwb(e.target.value)}
              placeholder="Enter Airway Bill Number (e.g. AR-7842-DEL)"
              className="w-full pl-10 pr-4 py-2.5 bg-[#F9F9F8] border border-[#E5E5E3] rounded text-sm text-[#2B2A29] placeholder:text-[#8C8A88] focus:outline-none focus:border-[#0083C7] focus:bg-white transition-colors font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded transition-colors cursor-pointer whitespace-nowrap"
          >
            Track Cargo
          </button>
        </form>
      </div>

      {/* Result Display */}
      {searchedRecord && (
        <div className="mt-8 pt-6 border-t border-[#E5E5E3] space-y-6">
          
          {/* Status Badge & Key Meta */}
          <div className="bg-[#F9F9F8] border border-[#E5E5E3] rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#2B2A29]">
                  AWB {searchedRecord.awbNumber}
                </span>
                <span className="text-[#8C8A88]">·</span>
                <span className="text-xs font-medium text-[#0083C7]">
                  Flight {searchedRecord.flightNumber}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#2B2A29] mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D39257] animate-pulse" />
                <span>{searchedRecord.statusText}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#686664]">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0083C7]" />
                <span className="tabular-nums font-medium">{searchedRecord.pieces} Pieces</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#0083C7]" />
                <span className="tabular-nums font-medium">{searchedRecord.weightKg} kg Gross</span>
              </div>
              {searchedRecord.temperature && (
                <div className="flex items-center gap-1.5 text-[#0083C7] font-semibold bg-[#EFF7FC] px-2 py-0.5 rounded">
                  <ThermometerSnowflake className="w-3.5 h-3.5" />
                  <span>{searchedRecord.temperature}</span>
                </div>
              )}
            </div>
          </div>

          {/* Route Origin & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white border border-[#E5E5E3] rounded">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8A88] block">
                Origin Station
              </span>
              <span className="text-sm font-semibold text-[#2B2A29] mt-0.5 block">
                {searchedRecord.origin}
              </span>
            </div>
            <div className="p-3 bg-white border border-[#E5E5E3] rounded">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C8A88] block">
                Destination Station
              </span>
              <span className="text-sm font-semibold text-[#2B2A29] mt-0.5 block">
                {searchedRecord.destination}
              </span>
            </div>
          </div>

          {/* Milestone Stepper */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#686664] font-display">
              Air Freight Progression Milestones
            </h3>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E5E3]">
              {searchedRecord.milestones.map((m: TrackingMilestone, idx: number) => (
                <div key={idx} className="relative flex items-start gap-3">
                  <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                    m.completed 
                      ? "bg-[#0083C7] text-white" 
                      : "bg-[#E5E5E3] text-[#8C8A88]"
                  }`}>
                    {m.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <span className={`font-semibold ${m.completed ? "text-[#2B2A29]" : "text-[#8C8A88]"}`}>
                        [{m.code}] {m.description}
                      </span>
                      <span className="text-[11px] font-mono text-[#8C8A88] mt-0.5 sm:mt-0">
                        {m.timestamp}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#686664] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#D39257]" />
                      <span>{m.location}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Disclaimer Box */}
          <div className="p-3 bg-[#FAF5EE] border border-[#E7CFB2] rounded text-xs text-[#704724] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#D39257] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Simulated Tracking Environment:</strong> Active records represent demonstrative feeder flights. Production connectivity hooks into carrier SITA / EDI systems via the <code className="bg-white/80 px-1 py-0.5 rounded font-mono">ITrackingProvider</code> interface.
            </p>
          </div>

        </div>
      )}

      {notFound && (
        <div className="mt-6 p-4 bg-[#FAF5EE] border border-[#E7CFB2] rounded text-xs text-[#704724] text-center space-y-2">
          <p className="font-semibold text-sm">Airway Bill &quot;{inputAwb}&quot; Not Found</p>
          <p className="text-[#8C8A88]">
            Please verify the AWB format or test one of the active demo manifests: <button type="button" onClick={() => handleTrack("AR-7842-DEL")} className="underline font-mono text-[#0083C7]">AR-7842-DEL</button>, <button type="button" onClick={() => handleTrack("AR-9104-JAI")} className="underline font-mono text-[#0083C7]">AR-9104-JAI</button>, or <button type="button" onClick={() => handleTrack("AR-3321-BOM")} className="underline font-mono text-[#0083C7]">AR-3321-BOM</button>.
          </p>
        </div>
      )}
    </div>
  );
}
