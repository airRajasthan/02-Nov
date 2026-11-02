import React, { useEffect, useRef } from "react";
import { Inquiry } from "../types";
import { InquiryForm } from "./InquiryForm";
import { X } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiry: Inquiry) => void;
  initialContext?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  onSubmitInquiry,
  initialContext = "",
}: InquiryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Focus restoration & body scroll lock
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus first focusable element inside modal
      const focusTimer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }

        // Focus trap
        if (e.key === "Tab" && modalRef.current) {
          const focusable = Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute("disabled"));

          if (focusable.length === 0) return;

          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(focusTimer);
        if (previousActiveElementRef.current) {
          previousActiveElementRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg border border-[#E5E5E3] max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[92vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Inquiry Dialog"
          className="absolute right-4 top-4 p-2 text-[#686664] hover:text-[#1C1B1A] hover:bg-[#F2F2F0] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0083C7]">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>AirRajasthan™ Commercial Portal</span>
          </div>
          <h2
            id="inquiry-modal-title"
            className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-[#1C1B1A] mt-1"
          >
            Submit an Inquiry
          </h2>
          <p className="text-xs sm:text-sm text-[#686664] mt-1 leading-relaxed">
            Connect with our aviation, cargo sales, and charter coordination team.
            Please submit your details below.
          </p>
        </div>

        <InquiryForm
          initialContext={initialContext}
          onSuccess={(inquiry) => {
            onSubmitInquiry(inquiry);
          }}
          onCancel={onClose}
          isModal={true}
        />
      </div>
    </div>
  );
}
