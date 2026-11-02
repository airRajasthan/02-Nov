import React from "react";
import { Link } from "../router";
import { ArrowLeft, Compass } from "lucide-react";

export function NotFoundView() {
  return (
    <div className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#EFF7FC] text-[#0083C7] mx-auto flex items-center justify-center">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#D39257] font-display">
          Error 404 &middot; Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight text-[#1C1B1A]">
          Destination Not In Flight Plan
        </h1>
        <p className="text-xs sm:text-sm text-[#686664] max-w-md mx-auto leading-relaxed">
          The requested page could not be located. It may have moved or the route
          entered is not part of the active AirRajasthan™ network.
        </p>
      </div>

      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors inline-flex items-center gap-2 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/services"
          className="px-6 py-3 border border-[#E5E5E3] hover:bg-[#F2F2F0] text-[#1C1B1A] text-xs uppercase font-semibold tracking-wider rounded transition-colors"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}
