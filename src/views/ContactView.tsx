import React from "react";
import { InquiryForm } from "../components/InquiryForm";
import { Inquiry } from "../types";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";

interface ContactViewProps {
  onSubmitInquiry: (inquiry: Inquiry) => void;
}

export function ContactView({ onSubmitInquiry }: ContactViewProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-20 sm:py-24 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Commercial Coordination &amp; Operational Desks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-[#D8D8D6] max-w-3xl leading-relaxed font-light">
            Connect directly with AirRajasthan™ Aviation &amp; Logistics Solutions across our
            UAE and India coordination offices. Our operations team is available to assist
            shippers, freight forwarders, and airline operators.
          </p>
        </div>
      </section>

      {/* Main Contact Grid: Official Offices + Embedded Shared Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Offices Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#0083C7] font-display">
                Regional Commercial Desks
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#1C1B1A] uppercase">
                AirRajasthan™ Offices
              </h2>
              <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
                Direct commercial coordination across our strategic UAE presence and registered Indian head office.
              </p>
            </div>

            {/* UAE Office Card */}
            <div className="bg-white rounded-xl border border-[#E5E5E3] p-6 space-y-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-[#D39257] uppercase tracking-wider font-display block text-sm">
                    UAE Office
                  </span>
                  <address className="not-italic text-[#686664] leading-relaxed">
                    28, Y-1 Building, Sharjah International Airport Freezone (SAIF),<br />
                    Sharjah, P.O. 9604, UAE
                  </address>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2F2F0] space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-[#686664]">
                  <Phone className="w-4 h-4 text-[#0083C7] shrink-0" />
                  <span>
                    Tel:{" "}
                    <a
                      href={`tel:${SITE_CONFIG.offices.uae.telClean}`}
                      className="font-semibold text-[#0083C7] hover:underline tabular-nums"
                    >
                      {SITE_CONFIG.offices.uae.tel}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#686664]">
                  <Phone className="w-4 h-4 text-[#D39257] shrink-0" />
                  <span>
                    Mobile:{" "}
                    <a
                      href={`tel:${SITE_CONFIG.offices.uae.mobileClean}`}
                      className="font-semibold text-[#0083C7] hover:underline tabular-nums"
                    >
                      {SITE_CONFIG.offices.uae.mobile}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* India Head Office Card */}
            <div className="bg-white rounded-xl border border-[#E5E5E3] p-6 space-y-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-[#0083C7] uppercase tracking-wider font-display block text-sm">
                    India Office (Registered Head Office)
                  </span>
                  <address className="not-italic text-[#686664] leading-relaxed">
                    2/594, Block-2, Ground Floor, Sector-2,<br />
                    Jawahar Nagar, Jaipur,<br />
                    Rajasthan-302004, INDIA.
                  </address>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2F2F0] space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-[#686664]">
                  <Phone className="w-4 h-4 text-[#0083C7] shrink-0" />
                  <span>
                    Tel:{" "}
                    <a
                      href={`tel:${SITE_CONFIG.offices.india.telClean}`}
                      className="font-semibold text-[#0083C7] hover:underline tabular-nums"
                    >
                      {SITE_CONFIG.offices.india.tel}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#686664]">
                  <Mail className="w-4 h-4 text-[#0083C7] shrink-0" />
                  <span>
                    Email:{" "}
                    <a
                      href={`mailto:${SITE_CONFIG.offices.india.email}`}
                      className="font-semibold text-[#0083C7] hover:underline"
                    >
                      {SITE_CONFIG.offices.india.email}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Chat Action Card */}
            <div className="p-4 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0] text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-[#166534]">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                <div>
                  <strong className="block text-sm">WhatsApp Direct Chat</strong>
                  <span className="text-[11px] text-[#15803D]">
                    {SITE_CONFIG.whatsApp.displayNumber} &bull; Direct team link (not a chatbot)
                  </span>
                </div>
              </div>
              <a
                href={SITE_CONFIG.whatsApp.getUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Shared Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E5E3] p-6 sm:p-10 shadow-xs">
            <div className="mb-6 space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#0083C7] font-display">
                Online Inquiry Portal
              </span>
              <h3 className="text-2xl font-bold font-display uppercase text-[#1C1B1A]">
                Submit Your Requirements
              </h3>
              <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
                Shippers, Customs House Agents (CHAs), Freight Forwarders, and Airline Operators
                are invited to outline their cargo or charter requirements below.
              </p>
            </div>

            <InquiryForm
              onSuccess={(inquiry) => {
                onSubmitInquiry(inquiry);
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
