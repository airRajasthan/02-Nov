import React from "react";
import { BrandLogo } from "./BrandLogo";
import { Link } from "../router";
import { PUBLIC_NAV_LINKS } from "./Navbar";
import { MapPin, Phone, Mail, Shield, ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";

interface FooterProps {
  onOpenInquiry: (context?: string) => void;
  onOpenStaffLogin?: () => void;
}

export function Footer({ onOpenInquiry, onOpenStaffLogin }: FooterProps) {
  // Check if any real social media link has been configured
  const socialEntries = [
    { name: "LinkedIn", url: SITE_CONFIG.socialLinks.linkedIn },
    { name: "Facebook", url: SITE_CONFIG.socialLinks.facebook },
    { name: "Instagram", url: SITE_CONFIG.socialLinks.instagram },
    { name: "YouTube", url: SITE_CONFIG.socialLinks.youtube },
  ].filter((item) => item.url && item.url.trim().length > 0);

  return (
    <footer className="bg-[#1C1B1A] text-[#D8D8D6] border-t border-[#383635] mt-auto">
      {/* Upper Corridor Strip: Proposed Jaipur–Fujairah Corridor */}
      <div className="border-b border-[#2B2A29] py-5 bg-[#161514]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#0083C7] shrink-0" />
            <span className="font-semibold tracking-wider uppercase text-white font-display">
              Proposed Air Cargo Corridor:
            </span>
            <span className="text-[#B7B6B4]">
              Jaipur, India (JAI) &harr; Fujairah, UAE (FJR) &middot; Ad hoc &amp; Dedicated Charter Operations
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenInquiry("Jaipur–Fujairah Corridor")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D39257] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <span>Inquire About Route Capacity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <Link to="/" aria-label="AirRajasthan™ Home">
              <BrandLogo variant="light" size="md" />
            </Link>
            <p className="text-xs text-[#B7B6B4] leading-relaxed">
              AirRajasthan™ Aviation &amp; Logistics Solutions is a developing
              partner-led aviation platform connecting India&apos;s industrial
              corridors with UAE and global gateways.
            </p>
            <p className="text-[11px] text-[#D39257] font-semibold italic">
              &ldquo;{SITE_CONFIG.tagline}&rdquo;
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2B2A29] border border-[#383635] text-[11px] text-[#D39257]">
                <Shield className="w-3.5 h-3.5 text-[#0083C7]" />
                <span>Partner-Led Commercial Model</span>
              </span>
            </div>

            {/* Social media links (only rendered when real URLs are configured) */}
            {socialEntries.length > 0 && (
              <div className="pt-3 flex items-center gap-3">
                <span className="text-[11px] text-[#8C8A88] uppercase font-bold tracking-wider">Follow Us:</span>
                {socialEntries.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#B7B6B4] hover:text-white transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-white mb-4 font-display">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-[#B7B6B4]">
              {PUBLIC_NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Commercial Solutions */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-white mb-4 font-display">
              Commercial Solutions
            </h3>
            <ul className="space-y-2.5 text-xs text-[#B7B6B4]">
              <li>
                <Link to="/services" className="hover:text-white transition-colors block">
                  Aviation &amp; Charter Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors block">
                  Air Cargo Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors block">
                  Logistics &amp; Supply Chain Solutions
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors block">
                  India–UAE Trade Connectivity
                </Link>
              </li>
              <li>
                <Link to="/partnership" className="hover:text-white transition-colors block text-[#D39257]">
                  GSA &amp; CSA Partnerships &rarr;
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#2B2A29]">
              <button
                type="button"
                onClick={() => onOpenInquiry("Charter & Cargo Inquiry - Footer")}
                className="w-full py-2.5 px-4 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors text-center cursor-pointer"
              >
                Request For Charter
              </button>
            </div>
          </div>

          {/* Column 4: Offices & Contact */}
          <div className="space-y-4 text-xs">
            <h3 className="text-xs uppercase font-bold tracking-wider text-white mb-4 font-display">
              Offices &amp; Contact
            </h3>

            {/* UAE Office */}
            <div className="space-y-1 text-[#B7B6B4]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D39257] shrink-0 mt-0.5" />
                <strong className="text-white block font-medium">UAE Office</strong>
              </div>
              <p className="text-[11px] leading-relaxed pl-5">
                {SITE_CONFIG.offices.uae.addressLine1}
                <br />
                {SITE_CONFIG.offices.uae.poBox}
              </p>
              <div className="pl-5 space-y-0.5 pt-0.5 text-[11px]">
                <div>
                  Tel:{" "}
                  <a
                    href={`tel:${SITE_CONFIG.offices.uae.telClean}`}
                    className="text-[#0083C7] hover:underline tabular-nums"
                  >
                    {SITE_CONFIG.offices.uae.tel}
                  </a>
                </div>
                <div>
                  Mobile:{" "}
                  <a
                    href={`tel:${SITE_CONFIG.offices.uae.mobileClean}`}
                    className="text-[#0083C7] hover:underline tabular-nums"
                  >
                    {SITE_CONFIG.offices.uae.mobile}
                  </a>
                </div>
              </div>
            </div>

            {/* India Head Office */}
            <div className="space-y-1 text-[#B7B6B4] pt-2 border-t border-[#2B2A29]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0083C7] shrink-0 mt-0.5" />
                <strong className="text-white block font-medium">India Office (Head Office)</strong>
              </div>
              <p className="text-[11px] leading-relaxed pl-5">
                {SITE_CONFIG.offices.india.addressLine1}, {SITE_CONFIG.offices.india.addressLine2}
              </p>
              <div className="pl-5 space-y-0.5 pt-0.5 text-[11px]">
                <div>
                  Tel:{" "}
                  <a
                    href={`tel:${SITE_CONFIG.offices.india.telClean}`}
                    className="text-[#0083C7] hover:underline tabular-nums"
                  >
                    {SITE_CONFIG.offices.india.tel}
                  </a>
                </div>
                <div>
                  Email:{" "}
                  <a
                    href={`mailto:${SITE_CONFIG.offices.india.email}`}
                    className="text-[#0083C7] hover:underline"
                  >
                    {SITE_CONFIG.offices.india.email}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Link Card */}
            <div className="p-2.5 rounded bg-[#2B2A29] border border-[#383635] text-[11px] text-[#B7B6B4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {SITE_CONFIG.whatsApp.displayNumber}</span>
              </div>
              <a
                href={SITE_CONFIG.whatsApp.getUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-semibold"
              >
                Chat &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Staff Portal */}
      <div className="border-t border-[#2B2A29] py-6 text-xs text-[#8C8A88] bg-[#161514]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AirRajasthan™ Aviation &amp; Logistics Solutions. All rights reserved.</span>
            <span>&middot;</span>
            <span className="text-[11px]">Proposed corridor operations and fleet charters are subject to regulatory approvals and partner availability.</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {onOpenStaffLogin && (
              <button
                type="button"
                onClick={onOpenStaffLogin}
                className="text-[11px] text-[#686664] hover:text-[#B7B6B4] transition-colors cursor-pointer"
              >
                Staff Portal
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
