import React, { useState } from "react";
import { Enquiry } from "../types";
import { X, CheckCircle2, Plane, AlertCircle } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEnquiry: (enquiry: Enquiry) => void;
}

export function QuoteModal({ isOpen, onClose, onSubmitEnquiry }: QuoteModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Scheduled Air Freight");
  const [origin, setOrigin] = useState("Jaipur (JAI)");
  const [destination, setDestination] = useState("Dubai (DWC)");
  const [estimatedWeightKg, setEstimatedWeightKg] = useState("500");
  const [dimensionsCm, setDimensionsCm] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

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
      message: specialRequirements || `Quotation request for ${serviceType} from ${origin} to ${destination} (${estimatedWeightKg}kg)`,
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

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-lg border border-[#E5E5E3] max-w-xl w-full p-6 sm:p-8 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 p-1.5 text-[#8C8A88] hover:text-[#2B2A29] rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#EFF7FC] text-[#0083C7] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-[#2B2A29]">
              Freight Enquiry Received
            </h3>
            <p className="text-sm text-[#686664] max-w-md mx-auto">
              Your flight line-haul request has been submitted to the AirRajasthan operations coordination desk.
            </p>
            <div className="p-4 bg-[#F9F9F8] border border-[#E5E5E3] rounded inline-block">
              <span className="text-xs uppercase text-[#8C8A88] font-semibold block">
                Official Reference Number
              </span>
              <span className="text-xl font-bold font-mono text-[#0083C7] mt-1 block">
                {submittedRef}
              </span>
            </div>
            <p className="text-xs text-[#8C8A88]">
              An operations officer will review payload specs and coordinate slot allocation within 2 hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#E5E5E3] pb-3">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#0083C7]" />
                <h3 className="text-xl font-bold font-display text-[#2B2A29]">
                  Request an Air Cargo Quotation
                </h3>
              </div>
              <p className="text-xs text-[#686664] mt-1">
                Provide payload dimensions, origin, and cargo profile for instant slot assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-[#2B2A29] block mb-1">Company / Entity *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Jaipur Crafts & Gems Ltd"
                  className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#2B2A29] block mb-1">Contact Officer *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#2B2A29] block mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#2B2A29] block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98290 XXXXX"
                  className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-semibold text-[#2B2A29] block mb-1">Service Offering</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                >
                  <option value="Scheduled Air Freight">Scheduled Air Freight</option>
                  <option value="Dedicated Cargo Charter">Dedicated Cargo Charter</option>
                  <option value="Cargo Consolidation & Cross-Dock">Cargo Consolidation</option>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-[#2B2A29] block mb-1">Estimated Gross Weight (kg) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={estimatedWeightKg}
                  onChange={(e) => setEstimatedWeightKg(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#2B2A29] block mb-1">Dimensions / ULD Count</label>
                <input
                  type="text"
                  value={dimensionsCm}
                  onChange={(e) => setDimensionsCm(e.target.value)}
                  placeholder="e.g. 2 pallets, 120x80x150 cm"
                  className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="font-semibold text-[#2B2A29] block mb-1">
                Special Handling Requirements / Cargo Classification
              </label>
              <textarea
                rows={2}
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="e.g. Temperature-sensitive pharmaceuticals (+2°C to +8°C), outsized turbine components, or armed security escort for bullion."
                className="w-full px-3 py-2 bg-[#F9F9F8] border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-medium text-[#686664] hover:text-[#2B2A29] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded transition-colors"
              >
                Submit Freight Enquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
