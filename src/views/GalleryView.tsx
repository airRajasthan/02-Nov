import React, { useState } from "react";
import { GalleryItem } from "../types";
import { Lightbox } from "../components/Lightbox";
import { Camera, ZoomIn } from "lucide-react";

interface GalleryViewProps {
  gallery: GalleryItem[];
}

export function GalleryView({ gallery }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ["ALL", "AIRCRAFT", "OPERATIONS", "WAREHOUSE", "COLD_CHAIN", "CHARTER"];

  const filteredItems = selectedCategory === "ALL"
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-14 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Operational Imagery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase tracking-tight">
            Fleet &amp; Airside Operations Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#D8D8D6] max-w-2xl">
            Visual inspection of dedicated freighter concepts, airside cargo loading, high-bay bonded warehousing, and temperature-controlled unit load devices (ULDs).
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F9F9F8] border border-[#E5E5E3] rounded text-xs font-medium w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0083C7] text-white shadow-xs font-semibold"
                  : "text-[#2B2A29] hover:text-[#0083C7]"
              }`}
            >
              {cat === "ALL" ? "All Media" : cat.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-lg border border-[#E5E5E3] overflow-hidden group cursor-pointer hover:border-[#0083C7] transition-all shadow-xs"
            >
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 bg-white/90 text-[#2B2A29] rounded-full shadow-lg">
                    <ZoomIn className="w-5 h-5 text-[#0083C7]" />
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                  {item.category.replace("_", " ")}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-sm font-bold font-display text-[#2B2A29] group-hover:text-[#0083C7] transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-[#686664] line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-xs text-[#8C8A88]">
            No visual assets in this category.
          </div>
        )}
      </section>

      {/* Lightbox Component */}
      <Lightbox
        item={lightboxItem}
        items={filteredItems}
        onClose={() => setLightboxItem(null)}
        onSelect={(item) => setLightboxItem(item)}
      />

    </div>
  );
}
