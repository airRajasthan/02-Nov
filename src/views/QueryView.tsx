import React, { useState } from "react";
import { Enquiry } from "../types";
import { Plane, CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";

interface QueryViewProps {
  onSubmitEnquiry: (enquiry: Enquiry) => void;
}

export function QueryView({ onSubmitEnquiry }: QueryViewProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Scheduled Air Freight");
  const [origin, setOrigin] = useState("Jaipur (JAI)");
  const [destination, setDestination] = useState("Dubai (DWC)");
  const [estimatedWeightKg, setEstimatedWeightKg] = useState("1200");
  const [dimensionsCm, setDimensionsCm] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !email || !phone) return;

    const newRef = `AR-REQ-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newEnquiry: Enquiry = {
      id: `enq_${Date.now()}`,
      referenceNumber: newRef,
      name: contactPerson,
      companyName,
      countryCode: "+91",
      mobile: phone,
      category: "Shipper",
      message: specialRequirements || `Query submission for ${serviceType} from ${origin} to ${destination}`,
      contactPerson,
      email,
      phone,
      serviceType,
      origin,
      destination,
      estimatedWeightKg: Number(estimatedWeightKg) || 100,
      dimensionsCm: dimensionsCm || "Standard pallet specification",
      specialRequirements,
      status: "NEW",
      createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      updatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
      replies: [],
      internalNotes: [],
    };

    onSubmitEnquiry(newEnquiry);
    setSubmittedRef(newRef);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-14 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Air Cargo Quotation &amp; Slot Intake</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight">
            Request an Air Freight Line-Haul Quote
          </h1>
          <p className="text-xs sm:text-sm text-[#D8D8D6] max-w-2xl">
            Submit your consignment dimensions, commodity type, and preferred sector to receive a binding volumetric rate card and aircraft allocation assessment.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-[#E5E5E3] p-6 sm:p-10 shadow-xs">
          {submittedRef ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#EFF7FC] text-[#0083C7] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold font-display text-[#2B2A29]">
                Freight Quotation Inquiry Registered
              </h2>
              <p className="text-xs sm:text-sm text-[#686664] max-w-md mx-auto">
                Your request has been routed to the AirRajasthan flight coordination and space control desk.
              </p>
              <div className="p-4 bg-[#F9F9F8] border border-[#E5E5E3] rounded inline-block">
                <span className="text-xs uppercase text-[#8C8A88] font-semibold block">
                  Consignment Reference Number
                </span>
                <span className="text-2xl font-bold font-mono text-[#0083C7] mt-1 block">
                  {submittedRef}
                </span>
              </div>
              <p className="text-xs text-[#8C8A88]">
                You can track this request in the Client Portal using demo login credentials.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmittedRef(null)}
                  className="px-6 py-2.5 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded"
                >
                  Submit Another Quote
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Entity Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold font-display uppercase text-[#2B2A29] border-b border-[#E5E5E3] pb-2">
                  1. Shipper / Organization Particulars
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Company / Shipper Legal Entity *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Marwar Precision Castings Pvt Ltd"
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Logistics / Dispatch Manager *</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Narendra Shekhawat"
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="narendra@marwarprecision.com"
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Direct Telephone / Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 94140 XXXXX"
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    />
                  </div>
                </div>
              </div>

              {/* Route & Offering */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold font-display uppercase text-[#2B2A29] border-b border-[#E5E5E3] pb-2">
                  2. Aviation Corridor &amp; Cargo Offering
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Service Type</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    >
                      <option value="Scheduled Air Freight">Scheduled Air Freight</option>
                      <option value="Dedicated Cargo Charter">Dedicated Cargo Charter</option>
                      <option value="Cargo Consolidation & Cross-Dock">Cargo Consolidation & Cross-Dock</option>
                      <option value="GDP Pharma Cold-Chain">GDP Pharma Cold-Chain</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Origin Air Hub</label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    >
                      <option value="Jaipur (JAI)">Jaipur Airport (JAI)</option>
                      <option value="Jodhpur (JDH)">Jodhpur Airport (JDH)</option>
                      <option value="Udaipur (UDR)">Udaipur Airport (UDR)</option>
                      <option value="Bhiwadi Inland Depot">Bhiwadi Inland Depot</option>
                      <option value="Mumbai (BOM)">Mumbai (BOM)</option>
                      <option value="Delhi (DEL)">Delhi (DEL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Destination Gateway</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    >
                      <option value="Dubai (DWC)">Dubai World Central (DWC)</option>
                      <option value="Mumbai (BOM)">Mumbai Intl (BOM)</option>
                      <option value="Delhi (DEL)">Delhi Intl (DEL)</option>
                      <option value="Frankfurt (FRA)">Frankfurt (FRA)</option>
                      <option value="Singapore (SIN)">Singapore (SIN)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payload Metrics */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold font-display uppercase text-[#2B2A29] border-b border-[#E5E5E3] pb-2">
                  3. Payload Dimensions &amp; Special Handling
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Estimated Gross Weight (kg) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={estimatedWeightKg}
                      onChange={(e) => setEstimatedWeightKg(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#2B2A29] block mb-1">Dimensions / ULD Configuration</label>
                    <input
                      type="text"
                      value={dimensionsCm}
                      onChange={(e) => setDimensionsCm(e.target.value)}
                      placeholder="e.g. 4 pallets (120x100x160 cm each)"
                      className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="font-semibold text-[#2B2A29] block mb-1">
                    Commodity Classification &amp; Environmental Conditions
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder="Specify special handling: e.g. Active pharma cooling (+2°C to +8°C), lithium batteries, heavy machinery, high-value armed security, or customs pre-clearance documents."
                    className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E3] flex items-center justify-between">
                <span className="text-xs text-[#8C8A88]">
                  * All bookings are processed through the central AirRajasthan operations desk.
                </span>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded transition-colors cursor-pointer"
                >
                  Generate Quotation Request
                </button>
              </div>

            </form>
          )}
        </div>
      </section>

    </div>
  );
}
