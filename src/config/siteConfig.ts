/**
 * AirRajasthan™ Centralized Site & Contact Configuration
 *
 * All office numbers, WhatsApp chat configuration, and social media handles are maintained
 * in this single source of truth for maintainability and future updates.
 */

export const SITE_CONFIG = {
  brandName: "AirRajasthan™",
  tagline: "Born in Desert. Built for Skies.",
  legalName: "AirRajasthan Aviation & Logistics Solutions",

  // Centralized WhatsApp Contact Link
  // NOTE: This links directly to WhatsApp Web/App; this is NOT an automated chatbot.
  whatsApp: {
    phoneNumber: "971509085541",
    displayNumber: "+971 50 908 5541",
    defaultMessage: "Hello AirRajasthan team, I would like to inquire regarding air cargo & charter operations.",
    getUrl: () =>
      `https://wa.me/971509085541?text=${encodeURIComponent(
        "Hello AirRajasthan team, I would like to inquire regarding air cargo & charter operations."
      )}`,
    isChatbot: false,
  },

  // Official Offices
  offices: {
    uae: {
      title: "UAE Office",
      location: "Sharjah International Airport Freezone (SAIF)",
      addressLine1: "28, Y-1 Building, Sharjah International Airport Freezone (SAIF), Sharjah",
      poBox: "P.O. 9604, UAE",
      tel: "+971 6 557 9569",
      telClean: "+97165579569",
      mobile: "+971 50 908 5541",
      mobileClean: "+971509085541",
      email: "support@AirRajasthan.com",
    },
    india: {
      title: "India Office (Head Office)",
      location: "Jaipur, Rajasthan, India",
      addressLine1: "2/594, Block-2, Ground Floor, Sector-2, Jawahar Nagar",
      addressLine2: "Jaipur, Rajasthan-302004, INDIA",
      tel: "+91 98293 02643",
      telClean: "+919829302643",
      email: "support@AirRajasthan.com",
    },
  },

  // Social Media Links (empty strings are intentionally hidden per requirements until official URLs are supplied)
  socialLinks: {
    linkedIn: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
};
