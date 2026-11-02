import React, { useState, useEffect, useId } from "react";
import { Inquiry, InquiryCategory } from "../types";
import {
  countWords,
  submitInquiry,
  InquirySubmissionPayload,
  generateIdempotencyKey,
} from "../services/inquiryService";
import { AlertCircle, CheckCircle2, RefreshCw, XCircle } from "lucide-react";

interface InquiryFormProps {
  initialContext?: string;
  onSuccess?: (inquiry: Inquiry) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

const COMMON_COUNTRY_CODES = [
  { code: "+91", country: "India (+91)" },
  { code: "+971", country: "UAE (+971)" },
  { code: "+1", country: "USA / Canada (+1)" },
  { code: "+44", country: "UK (+44)" },
  { code: "+65", country: "Singapore (+65)" },
  { code: "+49", country: "Germany (+49)" },
  { code: "+966", country: "Saudi Arabia (+966)" },
  { code: "+968", country: "Oman (+968)" },
  { code: "+974", country: "Qatar (+974)" },
  { code: "+254", country: "Kenya (+254)" },
];

export function InquiryForm({
  initialContext = "",
  onSuccess,
  onCancel,
  isModal = false,
}: InquiryFormProps) {
  const formIdPrefix = useId();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState<InquiryCategory | "">("");
  const [message, setMessage] = useState("");
  const [context, setContext] = useState(initialContext);
  const [idempotencyKey, setIdempotencyKey] = useState<string>(generateIdempotencyKey());

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    if (initialContext) {
      setContext(initialContext);
    }
  }, [initialContext]);

  const wordCount = countWords(message);
  const isOverLimit = wordCount > 300;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setServerError(null);

    const payload: InquirySubmissionPayload = {
      name,
      companyName,
      countryCode,
      mobile,
      category: category as InquiryCategory,
      message,
      context: context || undefined,
      idempotencyKey,
    };

    const result = await submitInquiry(payload);

    if (result.success && result.inquiry) {
      setSubmittedInquiry(result.inquiry);
      setServerError(null);
      if (onSuccess) {
        onSuccess(result.inquiry);
      }
    } else {
      if (result.validationErrors) {
        setErrors(result.validationErrors);
      }
      setServerError(result.message || "Failed to submit inquiry. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setName("");
    setCompanyName("");
    setMobile("");
    setCategory("");
    setMessage("");
    setSubmittedInquiry(null);
    setErrors({});
    setServerError(null);
    setIdempotencyKey(generateIdempotencyKey());
  };

  if (submittedInquiry) {
    return (
      <div className="p-6 sm:p-8 bg-white rounded-xl border border-[#E5E5E3] text-center space-y-5 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-[#EFF7FC] text-[#0083C7] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#0083C7]" />
        </div>
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#0083C7]">
            Inquiry Registered Successfully
          </span>
          <h3 className="text-2xl font-bold font-display text-[#1C1B1A] mt-1">
            Thank You, {submittedInquiry.name}
          </h3>
          <p className="text-xs text-[#686664] mt-1">
            Your inquiry has been recorded in the AirRajasthan™ operations registry.
          </p>
        </div>

        <div className="p-4 bg-[#F9F9F8] rounded-lg border border-[#E5E5E3] text-left text-xs space-y-2.5 max-w-md mx-auto">
          <div className="flex justify-between items-center pb-2 border-b border-[#E5E5E3]">
            <span className="text-[#686664] font-medium">Official Reference Number:</span>
            <span className="font-mono font-bold text-[#0083C7] text-sm select-all">
              {submittedInquiry.referenceNumber}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#686664]">Company:</span>
            <span className="font-semibold text-[#1C1B1A]">
              {submittedInquiry.companyName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#686664]">Category:</span>
            <span className="text-[#1C1B1A]">{submittedInquiry.category}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#686664]">Contact Mobile:</span>
            <span className="text-[#1C1B1A] tabular-nums">
              {submittedInquiry.countryCode} {submittedInquiry.mobile}
            </span>
          </div>
          {submittedInquiry.context && (
            <div className="flex justify-between items-center">
              <span className="text-[#686664]">Originating Context:</span>
              <span className="text-[#0083C7] font-medium">
                {submittedInquiry.context}
              </span>
            </div>
          )}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-semibold tracking-wider rounded transition-colors cursor-pointer"
          >
            Submit Another Inquiry
          </button>
          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 border border-[#E5E5E3] hover:bg-[#F2F2F0] text-[#1C1B1A] text-xs uppercase font-semibold tracking-wider rounded transition-colors cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Server Error Banner with explicit retry path preserving input */}
      {serverError && (
        <div
          className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs flex items-start gap-3 text-red-800"
          role="alert"
        >
          <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <strong className="block font-semibold">Submission Notice</strong>
            <p className="text-red-700 leading-relaxed">{serverError}</p>
            <p className="text-[11px] text-red-600">
              Your inputs have been preserved. You can click retry or adjust your details.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-medium text-[11px] flex items-center gap-1 shrink-0 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isSubmitting ? "animate-spin" : ""}`} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Context Badge if arriving from a specific CTA */}
      {context && (
        <div className="p-2.5 bg-[#EFF7FC] border border-[#B2DEF3] rounded-lg flex items-center justify-between text-xs">
          <span className="text-[#005A8A]">
            Inquiry Focus: <strong className="text-[#0083C7]">{context}</strong>
          </span>
          <button
            type="button"
            onClick={() => setContext("")}
            className="text-[11px] text-[#686664] hover:text-[#1C1B1A] underline ml-2 cursor-pointer"
          >
            Clear Focus
          </button>
        </div>
      )}

      {/* Field 1: Name */}
      <div>
        <label
          htmlFor={`${formIdPrefix}-name`}
          className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1A] mb-1.5"
        >
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id={`${formIdPrefix}-name`}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          placeholder="e.g. Ramesh Kumar"
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded focus:outline-none transition-colors ${
            errors.name
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
              : "border-[#E5E5E3] focus:border-[#0083C7] focus:ring-1 focus:ring-[#0083C7]"
          }`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Field 2: Company Name */}
      <div>
        <label
          htmlFor={`${formIdPrefix}-company`}
          className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1A] mb-1.5"
        >
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id={`${formIdPrefix}-company`}
          type="text"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            if (errors.companyName)
              setErrors((prev) => ({ ...prev, companyName: "" }));
          }}
          placeholder="e.g. Rajasthan Industrial Goods Pvt Ltd"
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded focus:outline-none transition-colors ${
            errors.companyName
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
              : "border-[#E5E5E3] focus:border-[#0083C7] focus:ring-1 focus:ring-[#0083C7]"
          }`}
          required
        />
        {errors.companyName && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.companyName}</span>
          </p>
        )}
      </div>

      {/* Field 3: Country Code & Mobile Number */}
      <div>
        <label
          htmlFor={`${formIdPrefix}-mobile`}
          className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1A] mb-1.5"
        >
          Country Code &amp; Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <select
            id={`${formIdPrefix}-country-code`}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            aria-label="Country Code"
            className="w-36 sm:w-44 px-2.5 py-2.5 text-sm bg-white border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7] shrink-0"
          >
            {COMMON_COUNTRY_CODES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.country}
              </option>
            ))}
          </select>
          <input
            id={`${formIdPrefix}-mobile`}
            type="tel"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
            }}
            placeholder="98293 02643"
            className={`flex-1 px-3.5 py-2.5 text-sm bg-white border rounded focus:outline-none transition-colors ${
              errors.mobile
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                : "border-[#E5E5E3] focus:border-[#0083C7] focus:ring-1 focus:ring-[#0083C7]"
            }`}
            required
          />
        </div>
        {errors.mobile && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.mobile}</span>
          </p>
        )}
      </div>

      {/* Field 4: "What you are" category selector */}
      <div>
        <label
          htmlFor={`${formIdPrefix}-category`}
          className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1A] mb-1.5"
        >
          What You Are <span className="text-red-500">*</span>
        </label>
        <select
          id={`${formIdPrefix}-category`}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as InquiryCategory);
            if (errors.category) setErrors((prev) => ({ ...prev, category: "" }));
          }}
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded focus:outline-none transition-colors ${
            errors.category
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
              : "border-[#E5E5E3] focus:border-[#0083C7] focus:ring-1 focus:ring-[#0083C7]"
          }`}
          required
        >
          <option value="" disabled>
            Select your organization type...
          </option>
          <option value="Shipper">Shipper</option>
          <option value="CHA">CHA (Customs House Agent)</option>
          <option value="Freight Forwarder">Freight Forwarder</option>
          <option value="Airline Operator">Airline Operator</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.category}</span>
          </p>
        )}
      </div>

      {/* Field 5: Inquiry Message with 300-word limit counter */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={`${formIdPrefix}-message`}
            className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1A]"
          >
            Inquiry Message <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-xs font-medium tabular-nums ${
              isOverLimit ? "text-red-600 font-bold" : "text-[#686664]"
            }`}
          >
            {wordCount} / 300 words
          </span>
        </div>
        <textarea
          id={`${formIdPrefix}-message`}
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
          }}
          placeholder="Please describe your cargo specifications, charter requirements, or route interest in up to 300 words..."
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded focus:outline-none transition-colors resize-y ${
            errors.message || isOverLimit
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
              : "border-[#E5E5E3] focus:border-[#0083C7] focus:ring-1 focus:ring-[#0083C7]"
          }`}
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
        {isOverLimit && !errors.message && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>
              Message exceeds the 300-word limit by {wordCount - 300} words. Please shorten your message.
            </span>
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="pt-2 flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-xs uppercase font-semibold text-[#686664] hover:text-[#1C1B1A] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || isOverLimit}
          className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] active:bg-[#005A8A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs uppercase font-bold tracking-wider rounded transition-colors shadow-xs cursor-pointer flex items-center gap-2"
        >
          {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
          <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
        </button>
      </div>
    </form>
  );
}
