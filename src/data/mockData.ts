import {
  ServiceItem,
  EventItem,
  GalleryItem,
  UserSession,
  Inquiry,
  TeamMember,
  TrackingRecord,
} from "../types";

export const DEMO_TRACKING_DATA: Record<string, TrackingRecord> = {
  "AR-7842-DEL": {
    awbNumber: "AR-7842-DEL",
    status: "IN_TRANSIT",
    statusText: "In Flight",
    origin: "Jaipur International Airport (JAI)",
    destination: "Fujairah International Airport (FJR)",
    flightNumber: "AR-702",
    aircraft: "Boeing 737-800F",
    pieces: 8,
    weightKg: 2450,
    estimatedArrival: "Proposed Corridor Schedule",
    milestones: [
      { code: "BOK", description: "Consignment Booked", location: "JAI Cargo Complex", timestamp: "2026-10-14 08:30 IST", completed: true },
      { code: "RCS", description: "Cargo Received at Airside Warehouse", location: "JAI Airside Terminal", timestamp: "2026-10-14 11:15 IST", completed: true },
      { code: "DEP", description: "Aircraft Departed", location: "En Route GCC Air Corridor", timestamp: "2026-10-14 15:40 IST", completed: true },
    ],
  },
};

export const DEMO_USERS: Record<string, UserSession> = {
  ADMIN: {
    userId: "usr_admin_01",
    name: "Operations Admin",
    email: "admin@airrajasthan.com",
    role: "ADMIN",
    organization: "AirRajasthan Central Operations",
  },
  TEAM: {
    userId: "usr_team_01",
    name: "Commercial Coordination Desk",
    email: "team@airrajasthan.com",
    role: "TEAM",
    organization: "AirRajasthan Partner Desk",
  },
  USER: {
    userId: "usr_client_01",
    name: "Trade Representative",
    email: "client@logistics-preview.com",
    role: "USER",
    organization: "Freight Partner Preview",
  },
};

export const INITIAL_ENQUIRIES: Inquiry[] = [
  {
    id: "inq_01",
    referenceNumber: "AR-INQ-2026-1042",
    name: "Rajesh Singhania",
    companyName: "Singhania Global Exports",
    countryCode: "+91",
    mobile: "98293 11223",
    category: "Shipper",
    message:
      "Seeking initial space allocation for weekly textile and handicraft shipments from Jaipur to Fujairah hub, with prospective transshipment onward to GCC regional markets. Interested in ad hoc trial charter capacity.",
    context: "India–UAE Trade Connectivity",
    status: "NEW",
    createdAt: "20-10-2026, 10:15:00 IST",
    updatedAt: "20-10-2026, 10:15:00 IST",
    replies: [],
    internalNotes: [],
    contactPerson: "Rajesh Singhania",
    phone: "+91 98293 11223",
    serviceType: "India–UAE Trade Connectivity",
  },
  {
    id: "inq_02",
    referenceNumber: "AR-INQ-2026-1043",
    name: "Tariq Al-Mansoor",
    companyName: "Gulf Freight Consolidators LLC",
    countryCode: "+971",
    mobile: "50 894 1234",
    category: "Freight Forwarder",
    message:
      "Requesting GSA partnership evaluation for UAE cargo sales. We manage extensive distribution from Fujairah and Dubai dry ports and seek reliable ad hoc air capacity connecting to Northern and Western India manufacturing centers.",
    context: "General Sales Agent (GSA) Partnerships",
    status: "ASSIGNED",
    createdAt: "19-10-2026, 14:30:00 IST",
    updatedAt: "20-10-2026, 09:20:00 IST",
    replies: [],
    internalNotes: [],
    contactPerson: "Tariq Al-Mansoor",
    phone: "+971 50 894 1234",
    serviceType: "General Sales Agent (GSA)",
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv_01",
    slug: "aviation-charter-services",
    title: "Aviation & Charter Services",
    shortDescription:
      "Flexible aircraft capacity and charter solutions matching customer demand with suitable aircraft and operating partners.",
    fullDescription:
      "AirRajasthan aims to facilitate cargo charter operations by matching customer demand with suitable aircraft and operating partners. We plan to begin with ad hoc cargo charters on the Jaipur–Fujairah corridor and progressively increase frequency as demand develops. Our focus is on flexible, demand-driven aviation solutions without requiring AirRajasthan to own every aircraft or operational asset.",
    features: [
      "Ad hoc and dedicated cargo aircraft charters",
      "Aircraft sourcing and charter coordination through qualified operators",
      "ACMI and other aircraft-capacity arrangements, subject to commercial and regulatory feasibility",
      "Flight planning coordination, ground-handling arrangements and operational liaison with service partners",
      "Future expansion into additional cargo routes and selected passenger charter services, subject to approvals",
    ],
    icon: "Plane",
    imageUrl: "/images/Services-1 Aviation & Charter Services.webp",
    order: 1,
    status: "PUBLISHED",
    aircraftCategory: "Charter Coordination & Capacity",
  },
  {
    id: "srv_02",
    slug: "air-cargo-services",
    title: "Air Cargo Services",
    shortDescription:
      "Connecting cargo capacity with market demand across exporters, importers, freight forwarders, and consolidators.",
    fullDescription:
      "We aim to develop air cargo services that connect exporters, importers, freight forwarders and consolidators with reliable air transportation options between India, the UAE and other markets. Our focus is on building sustainable cargo volumes in both directions, improving aircraft utilisation and creating dependable commercial relationships with cargo customers.",
    features: [
      "Cargo-space sales and block-space arrangements on available charter capacity",
      "General cargo and suitable specialised shipments, subject to aircraft capability and acceptance requirements",
      "Import and export cargo coordination for both inbound and outbound movements",
      "Cargo consolidation and coordination with freight forwarders, GSAs and cargo handling agents",
      "Documentation, shipment tracking coordination and cargo status communication",
      "Development of regular cargo services as shipment volumes and commercial viability grow",
    ],
    icon: "Boxes",
    imageUrl: "/images/Service-2 Aircargo Services.jpg",
    order: 2,
    status: "PUBLISHED",
    aircraftCategory: "General & Specialised Cargo",
  },
  {
    id: "srv_03",
    slug: "logistics-supply-chain-solutions",
    title: "Logistics & Supply Chain Solutions",
    shortDescription:
      "Coordinated, end-to-end cargo movement integrating air transportation with trusted logistics partners.",
    fullDescription:
      "AirRajasthan aims to provide integrated logistics solutions by coordinating air transportation with trusted third-party logistics providers, transport operators, warehouse partners and customs service providers. A single commercial point of coordination for customers who need their cargo managed from origin to destination, using a partner-led operating model.",
    features: [
      "First-mile pickup and last-mile delivery arrangements",
      "Road transportation and airport-to-airport or door-to-door logistics coordination",
      "Warehousing, cargo storage and consolidation through service partners",
      "Customs clearance facilitation and import-export documentation support",
      "Specialised handling coordination for perishables, pharmaceuticals, valuables, dangerous goods and live animals, where permitted and subject to appropriate facilities and approvals",
      "Project cargo, oversized shipment planning and charter logistics coordination",
    ],
    icon: "Truck",
    imageUrl: "/images/AirRajasthan.jpg",
    order: 3,
    status: "PUBLISHED",
    aircraftCategory: "Multimodal Logistics Network",
  },
  {
    id: "srv_04",
    slug: "india-uae-trade-connectivity",
    title: "India–UAE Trade Connectivity",
    shortDescription:
      "Creating commercial links between two strategic markets through the proposed Jaipur–Fujairah cargo corridor.",
    fullDescription:
      "Through our proposed Jaipur–Fujairah cargo corridor, AirRajasthan aims to facilitate trade between Indian businesses and UAE-based buyers, importers and distribution networks. Making air cargo and associated logistics more accessible to businesses while creating commercially sustainable links between India, the UAE and wider international markets.",
    features: [
      "Cargo solutions for exporters, manufacturers, traders and importers",
      "Connecting Indian suppliers with UAE customers and distribution partners",
      "Supporting UAE businesses sourcing goods from India and Indian businesses serving UAE markets",
      "Cargo planning for time-sensitive, high-value and specialised shipments, subject to acceptance requirements",
      "Coordination with freight forwarders, customs brokers, transport providers and commercial partners",
      "Identifying return-leg cargo opportunities to support balanced traffic flows and route sustainability",
    ],
    icon: "Globe",
    imageUrl: "/images/Route.jpg",
    order: 4,
    status: "PUBLISHED",
    aircraftCategory: "Jaipur–Fujairah Bilateral Corridor",
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "ev_01",
    slug: "india-uae-trade-corridor-symposium",
    title: "India–UAE Bilateral Logistics Coordination",
    summary:
      "Stakeholder sessions discussing air cargo synergies between Rajasthan industrial centers and Fujairah multimodal hub.",
    content:
      "Initial stakeholder consultation addressing commercial freight flows between North-Western India manufacturing corridors and the UAE.",
    location: "Jaipur & Fujairah",
    eventDate: "Q4 2026 (Planning Phase)",
    isPast: false,
    status: "PUBLISHED",
    imageUrl: "/images/Our Vision.jpg",
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal_01",
    title: "Freighter Aircraft Loading Operations",
    category: "AIRCRAFT",
    imageUrl: "/images/hero-homepage.jpg",
    thumbnailUrl: "/images/hero-homepage.jpg",
    altText: "AirRajasthan freighter cargo loading at sunset",
    description: "Cargo pallet handling and ramp logistics coordination.",
    order: 1,
    status: "PUBLISHED",
  },
  {
    id: "gal_02",
    title: "Aviation & Charter Fleet Options",
    category: "CHARTER",
    imageUrl: "/images/Services-1 Aviation & Charter Services.webp",
    thumbnailUrl: "/images/Services-1 Aviation & Charter Services.webp",
    altText: "Aviation and charter aircraft operations",
    description: "Freighter aircraft capacity options through operating partners.",
    order: 2,
    status: "PUBLISHED",
  },
  {
    id: "gal_03",
    title: "Cargo Handling and Palletization",
    category: "OPERATIONS",
    imageUrl: "/images/Service-2 Aircargo Services.jpg",
    thumbnailUrl: "/images/Service-2 Aircargo Services.jpg",
    altText: "Air cargo consolidation and warehouse handling",
    description: "Palletized cargo ready for freighter line-haul coordination.",
    order: 3,
    status: "PUBLISHED",
  },
  {
    id: "gal_04",
    title: "Regional Aviation Gateway",
    category: "OPERATIONS",
    imageUrl: "/images/AirRajasthan.jpg",
    thumbnailUrl: "/images/AirRajasthan.jpg",
    altText: "AirRajasthan gateway connectivity",
    description: "Strategic connectivity between Rajasthan and Fujairah.",
    order: 4,
    status: "PUBLISHED",
  },
];

export const SAMPLE_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team_01",
    name: "Sample Profile: Executive Cargo Airlines",
    designation: "Executive Cargo Airlines (Sample Role)",
    roleCategory: "Aviation & Operations Coordination",
    bio: "Sample profile provided for layout evaluation. Professional background spanning air cargo route planning, ad hoc freighter charter coordination, and bilateral slot management. Detailed executive profiles and management roster will be published upon regulatory certification and official commercial launch.",
    isSampleProfile: true,
  },
  {
    id: "team_02",
    name: "Sample Profile: Commercial & Cargo Sales",
    designation: "Commercial & Route Development (Sample Role)",
    roleCategory: "Commercial & Partnerships",
    bio: "Sample profile provided for layout evaluation. Experience encompassing General Sales Agent (GSA) networks, freight forwarder relationships, and India–UAE cross-border supply chain integration. Official leadership details will be formally released in the production deployment.",
    isSampleProfile: true,
  },
  {
    id: "team_03",
    name: "Sample Profile: Ground Handling & Logistics",
    designation: "Logistics & Multimodal Operations (Sample Role)",
    roleCategory: "Ground Operations & Multimodal",
    bio: "Sample profile provided for layout evaluation. Focus on airport-to-airport freight coordination, bonded road feeder connectivity, and multimodal terminal logistics connecting sea, rail, and air at the Fujairah gateway.",
    isSampleProfile: true,
  },
];
