import React from "react";

interface BrandLogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

/**
 * BrandLogo - Displays the approved AirRajasthan™ logo asset.
 * The approved asset (/logo-air-rajasthan.png) includes "air//rajasthan™" and
 * the tagline "Born in Desert, Built for Skies" with ™ already embedded in the artwork.
 * Proportions (591:119) and colors are strictly preserved.
 */
export function BrandLogo({
  variant = "dark",
  className = "",
  size = "md",
  onClick,
}: BrandLogoProps) {
  const isLight = variant === "light";

  // Responsive height scale preserving intrinsic aspect ratio (591 / 119)
  const heightClass = {
    sm: "h-8 md:h-9",
    md: "h-9 md:h-11 lg:h-12",
    lg: "h-12 md:h-14",
  }[size];

  const logoImage = (
    <img
      src="/logo-air-rajasthan.png"
      alt="AirRajasthan™ - Born in Desert, Built for Skies"
      className={`${heightClass} w-auto object-contain max-w-full`}
      style={{ aspectRatio: "591 / 119" }}
      loading="eager"
    />
  );

  const content = isLight ? (
    // On dark backgrounds, provide a clean white protective container with subtle rounded corners
    // to preserve 100% color fidelity and contrast without recoloring or altering the artwork.
    <div className="bg-white px-3 py-1.5 rounded shadow-xs inline-flex items-center">
      {logoImage}
    </div>
  ) : (
    logoImage
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="AirRajasthan™ Home"
        className={`inline-flex items-center text-left focus-visible:outline-2 focus-visible:outline-[#0083C7] rounded cursor-pointer transition-opacity hover:opacity-95 ${className}`}
      >
        {content}
      </button>
    );
  }

  return <div className={`inline-flex items-center ${className}`}>{content}</div>;
}
