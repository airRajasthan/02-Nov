import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto print:hidden"
      role="complementary"
      aria-label="Direct WhatsApp Contact"
    >
      {/* Optional dismissible informative hover/tap badge */}
      {showTooltip && (
        <div className="mb-2 max-w-xs p-3 bg-white text-[#1C1B1A] rounded-xl shadow-xl border border-[#E5E5E3] text-xs space-y-1 animate-fade-in relative">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-[#8C8A88] hover:text-[#1C1B1A] p-1 cursor-pointer"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-bold text-[#25D366] flex items-center gap-1.5 font-display uppercase tracking-wider text-[11px]">
            <span>Direct WhatsApp Chat</span>
          </div>
          <p className="text-[#4A4846] text-[11px] leading-relaxed pr-3">
            Click to start a conversation with AirRajasthan™ operations at{" "}
            <strong className="text-[#1C1B1A]">{SITE_CONFIG.whatsApp.displayNumber}</strong>.
          </p>
          <span className="text-[10px] text-[#8C8A88] block">
            Direct team link &bull; Not a chatbot
          </span>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={SITE_CONFIG.whatsApp.getUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        aria-label={`Chat directly with AirRajasthan on WhatsApp at ${SITE_CONFIG.whatsApp.displayNumber}`}
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366] group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold font-display uppercase tracking-wider hidden sm:inline-block">
          WhatsApp Chat
        </span>
      </a>
    </div>
  );
}
