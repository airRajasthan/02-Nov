import React, { useState } from "react";
import { EventItem } from "../types";
import { Calendar, MapPin, ArrowRight, X, Clock } from "lucide-react";

interface EventsViewProps {
  events: EventItem[];
  onOpenQuote: () => void;
}

export function EventsView({ events, onOpenQuote }: EventsViewProps) {
  const [filter, setFilter] = useState<"ALL" | "UPCOMING" | "PAST">("ALL");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filteredEvents = events.filter((ev) => {
    if (filter === "UPCOMING") return !ev.isPast;
    if (filter === "PAST") return ev.isPast;
    return true;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-14 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Industry Engagement &amp; Trade Summits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight">
            Aviation Logistics Events &amp; Conclaves
          </h1>
          <p className="text-xs sm:text-sm text-[#D8D8D6] max-w-2xl">
            AirRajasthan active participation in regional trade corridor delegations, IATA air cargo symposiums, and industrial exporter summits.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Interactive Filter Control */}
        <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-4">
          <div className="flex items-center gap-1 p-1 bg-[#F9F9F8] border border-[#E5E5E3] rounded text-xs font-medium">
            <button
              type="button"
              onClick={() => setFilter("ALL")}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                filter === "ALL"
                  ? "bg-[#0083C7] text-white shadow-xs font-semibold"
                  : "text-[#2B2A29] hover:text-[#0083C7]"
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("UPCOMING")}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                filter === "UPCOMING"
                  ? "bg-[#0083C7] text-white shadow-xs font-semibold"
                  : "text-[#2B2A29] hover:text-[#0083C7]"
              }`}
            >
              Upcoming ({events.filter((e) => !e.isPast).length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("PAST")}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                filter === "PAST"
                  ? "bg-[#0083C7] text-white shadow-xs font-semibold"
                  : "text-[#2B2A29] hover:text-[#0083C7]"
              }`}
            >
              Concluded ({events.filter((e) => e.isPast).length})
            </button>
          </div>

          <span className="text-xs text-[#8C8A88]">
            Showing {filteredEvents.length} events
          </span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-lg border border-[#E5E5E3] overflow-hidden flex flex-col justify-between hover:border-[#0083C7] transition-all group"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-900 relative">
                  <img
                    src={ev.imageUrl}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {ev.eventDate}
                  </div>
                  <div className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                    ev.isPast 
                      ? "bg-slate-200 text-slate-800" 
                      : "bg-[#0083C7] text-white"
                  }`}>
                    {ev.isPast ? "CONCLUDED" : "UPCOMING"}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold font-display text-[#2B2A29]">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-[#686664] line-clamp-3 leading-relaxed">
                    {ev.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="text-xs text-[#8C8A88] flex items-center gap-1.5 border-t border-[#E5E5E3] pt-3">
                  <MapPin className="w-3.5 h-3.5 text-[#0083C7] shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
                  className="w-full py-2 bg-[#F9F9F8] hover:bg-[#0083C7] hover:text-white text-[#2B2A29] text-xs font-semibold rounded border border-[#E5E5E3] transition-colors"
                >
                  Read Event Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-lg border border-[#E5E5E3] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 p-1.5 text-[#8C8A88] hover:text-[#2B2A29] rounded"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#8C8A88]">
              <Calendar className="w-3.5 h-3.5 text-[#0083C7]" />
              <span className="font-mono">{selectedEvent.eventDate}</span>
              <span>·</span>
              <span className="text-[#D39257] font-semibold">
                {selectedEvent.isPast ? "Concluded Summit" : "Upcoming Forum"}
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-[#2B2A29]">
              {selectedEvent.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-[#686664] bg-[#F9F9F8] p-3 rounded border border-[#E5E5E3]">
              <MapPin className="w-4 h-4 text-[#0083C7] shrink-0" />
              <span>{selectedEvent.location}</span>
            </div>

            <div className="h-56 rounded overflow-hidden bg-slate-900">
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs text-[#686664] leading-relaxed whitespace-pre-line space-y-2">
              {selectedEvent.content}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5E5E3]">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs text-[#686664] hover:text-[#2B2A29]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedEvent(null);
                  onOpenQuote();
                }}
                className="px-5 py-2.5 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded"
              >
                Inquire About Air Corridors
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
