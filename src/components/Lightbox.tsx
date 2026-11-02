import React, { useEffect } from "react";
import { GalleryItem } from "../types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export function Lightbox({ item, items, onClose, onSelect }: LightboxProps) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const handlePrev = () => {
    if (currentIndex > 0) onSelect(items[currentIndex - 1]);
    else onSelect(items[items.length - 1]);
  };
  const handleNext = () => {
    if (currentIndex < items.length - 1) onSelect(items[currentIndex + 1]);
    else onSelect(items[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white bg-black/40 rounded-full transition-colors cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation buttons */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 text-white/70 hover:text-white bg-black/40 rounded-full transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 text-white/70 hover:text-white bg-black/40 rounded-full transition-colors cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-lg bg-black/50">
          <img
            src={item.imageUrl}
            alt={item.altText || item.title}
            className="max-h-[70vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Caption & Metadata (Zero-pill text) */}
        <div className="w-full mt-4 text-white text-center space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs text-[#D39257]">
            <span className="font-semibold tracking-wider uppercase font-display">
              {item.category.replace("_", " ")}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#B7B6B4]">
              {currentIndex + 1} of {items.length}
            </span>
          </div>
          <h4 className="text-lg font-bold font-display text-white">{item.title}</h4>
          {item.description && (
            <p className="text-xs text-[#B7B6B4] max-w-xl mx-auto">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
