import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { UserSession } from "../types";
import { useRouter, Link } from "../router";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";

interface NavbarProps {
  session: UserSession | null;
  onOpenInquiry: (context?: string) => void;
  onLogout: () => void;
}

export const PUBLIC_NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Our Vision", to: "/our-vision" },
  { label: "Services", to: "/services" },
  { label: "Route & Schedule", to: "/route-schedule" },
  { label: "The Hub", to: "/the-hub" },
  { label: "Partnership", to: "/partnership" },
  { label: "Our Team", to: "/our-team" },
  { label: "Contact Us", to: "/contact" },
];

export function Navbar({ session, onOpenInquiry, onLogout }: NavbarProps) {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Split links for compact desktop widths (e.g. 1024px) if needed
  const primaryLinks = PUBLIC_NAV_LINKS.slice(0, 5);
  const secondaryLinks = PUBLIC_NAV_LINKS.slice(5);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E3] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Wordmark / Official Logo */}
          <div className="shrink-0 flex items-center">
            <Link
              to="/"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[#0083C7] rounded"
              aria-label="AirRajasthan™ - Home"
            >
              <BrandLogo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation (Full 8 items on xl, or with More dropdown on lg) */}
          <nav
            className="hidden xl:flex items-center gap-5 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {PUBLIC_NAV_LINKS.map((link) => {
              const isActive =
                currentPath === link.to ||
                (link.to !== "/" && currentPath.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-1 whitespace-nowrap transition-colors cursor-pointer text-sm font-medium ${
                    isActive
                      ? "text-[#0083C7] font-semibold"
                      : "text-[#2B2A29]/80 hover:text-[#0083C7]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#0083C7] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Compact Tablet/Laptop navigation (lg: 1024px-1279px) */}
          <nav
            className="hidden lg:flex xl:hidden items-center gap-4 text-sm font-medium"
            aria-label="Main Navigation (Compact)"
          >
            {primaryLinks.map((link) => {
              const isActive =
                currentPath === link.to ||
                (link.to !== "/" && currentPath.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-1 whitespace-nowrap transition-colors cursor-pointer text-xs lg:text-sm font-medium ${
                    isActive
                      ? "text-[#0083C7] font-semibold"
                      : "text-[#2B2A29]/80 hover:text-[#0083C7]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#0083C7] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="inline-flex items-center gap-1 text-xs lg:text-sm text-[#2B2A29]/80 hover:text-[#0083C7] py-1 cursor-pointer"
                aria-expanded={moreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5E3] rounded shadow-lg py-1 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {secondaryLinks.map((link) => {
                    const isActive = currentPath === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`block px-4 py-2 text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[#EFF7FC] text-[#0083C7] font-semibold"
                            : "text-[#2B2A29] hover:bg-[#F9F9F8] hover:text-[#0083C7]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section: Separate Prominent "Inquiry" Button + Staff Dev Session Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            {session && (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border ${
                    currentPath === "/dashboard"
                      ? "bg-[#0083C7] text-white border-[#0083C7]"
                      : "bg-[#F9F9F8] text-[#2B2A29] border-[#E5E5E3]"
                  }`}
                >
                  <LayoutDashboard className="w-3 h-3 text-[#0083C7]" />
                  <span>Staff: {session.role}</span>
                </Link>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign Out of Operations Console"
                  className="p-1 text-[#686664] hover:text-[#1C1B1A] cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Separate prominent button labelled exactly “Inquiry” */}
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-[#0083C7] hover:bg-[#0072AD] active:bg-[#005A8A] transition-all rounded shadow-xs cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0083C7]"
            >
              Inquiry
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2B2A29] rounded hover:bg-[#F2F2F0] lg:hidden focus-visible:outline-2 focus-visible:outline-[#0083C7] cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5E3] bg-white px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-left px-3.5 py-2.5 text-sm font-medium rounded transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-[#EFF7FC] text-[#0083C7] font-semibold"
                    : "text-[#2B2A29] hover:bg-[#F9F9F8]"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0083C7]" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#E5E5E3] space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 text-xs font-bold tracking-wider uppercase text-white bg-[#0083C7] hover:bg-[#0072AD] rounded text-center block shadow-xs"
            >
              Inquiry
            </button>

            {session && (
              <div className="pt-2 flex items-center justify-between text-xs text-[#686664]">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#0083C7] font-semibold underline"
                >
                  Open Operations Dashboard ({session.role})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-red-600 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
