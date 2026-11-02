import React, { useState, useRef } from "react";
import { Link } from "../router";
import {
  ArrowRight,
  Plane,
  Boxes,
  Truck,
  Globe,
  MapPin,
  Anchor,
  Train,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Handshake,
  Layers,
  Play,
  Pause,
  Film,
  Image as ImageIcon,
  Compass,
} from "lucide-react";

interface HomeViewProps {
  onOpenInquiry: (context?: string) => void;
}

export function HomeView({ onOpenInquiry }: HomeViewProps) {
  // Motion mode: 'video' for cinematic aviation loop, 'photo' for official Boeing freighter sunset photo
  const [heroMode, setHeroMode] = useState<"video" | "photo">("photo");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (heroMode === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-20 lg:space-y-28 pb-20">
      
      {/* 1. Hero Section (7X-Inspired "World in Motion" Cinematic Hero) */}
      <section className="relative bg-[#1C1B1A] text-white overflow-hidden min-h-[88vh] flex items-center">
        
        {/* Dynamic Motion / Photography Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroMode === "video" ? (
            /* Cinematic Aviation Video Loop */
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/images/hero-homepage.jpg"
              className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
                isPlaying ? "opacity-45" : "opacity-30"
              }`}
            >
              {/* Fallback to high-res photo if video stream encounters network restrictions */}
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            /* Official AirRajasthan™ Boeing Freighter Photography with 7X-inspired Ken Burns Motion Drift */
            <img
              src="/images/hero-homepage.jpg"
              alt="AirRajasthan™ freighter aircraft loading operations on airport tarmac at sunset"
              className={`w-full h-full object-cover object-center ${
                isPlaying ? "animate-kenburns" : ""
              }`}
              loading="eager"
            />
          )}

          {/* Continuous smooth overlay without visible vertical division */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1B1A]/92 via-[#1C1B1A]/70 to-[#1C1B1A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-transparent to-[#1C1B1A]/50" />

          {/* Subtle 7X-Inspired Ambient Radar & Grid Graphic */}
          <div className="absolute top-12 right-12 hidden lg:block opacity-20 pointer-events-none">
            <div className="relative w-72 h-72 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-white/20" />
              <div className="w-24 h-24 rounded-full border border-white/20" />
              <div className="absolute w-full h-[1px] bg-white/20" />
              <div className="absolute h-full w-[1px] bg-white/20" />
              {/* Radar sweep */}
              <div
                className={`absolute inset-0 rounded-full border-t-2 border-r-2 border-[#0083C7] ${
                  isPlaying ? "animate-radar" : ""
                }`}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Top kicker with official tagline */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded bg-white/10 backdrop-blur-xs border border-white/15 text-xs tracking-wider uppercase text-[#D39257] font-semibold">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span className="text-white font-normal">AirRajasthan™</span>
              <span className="text-white/40">&middot;</span>
              <span>Born in Desert. Built for Skies.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white uppercase leading-[1.08] text-balance">
              Connecting India&apos;s Industrial Corridors to Global Gateways
            </h1>

            {/* Concise Introduction from approved company profile */}
            <p className="text-base sm:text-lg text-[#D8D8D6] leading-relaxed max-w-2xl font-normal">
              Born from the spirit of Rajasthan and strategically positioned
              through Fujairah, UAE, AirRajasthan™ is developing dependable,
              partner-led air cargo and charter solutions designed to move trade
              efficiently across India, the Middle East, Africa, and beyond.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Primary Blue CTA: REQUEST FOR CHARTER */}
              <button
                type="button"
                onClick={() => onOpenInquiry("Charter Request - Home Hero")}
                className="px-7 py-3.5 bg-[#0083C7] hover:bg-[#0072AD] active:bg-[#005A8A] text-white text-xs uppercase font-bold tracking-wider rounded transition-all shadow-md flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>REQUEST FOR CHARTER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Explore Our Services */}
              <Link
                to="/services"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase font-semibold tracking-wider rounded border border-white/20 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore Our Services</span>
              </Link>

              {/* Clear link to proposed Jaipur–Fujairah corridor */}
              <Link
                to="/route-schedule"
                className="text-xs text-[#D39257] hover:text-white font-semibold transition-colors inline-flex items-center gap-1.5 py-2"
              >
                <span>Proposed Jaipur–Fujairah Corridor &rarr;</span>
              </Link>
            </div>

          </div>

          {/* Strategic corridor overview banner with orange headings and requested copy */}
          <div className="mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row md:items-end justify-between gap-6 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
              <div>
                <span className="text-xs uppercase text-[#D39257] font-semibold block font-display tracking-wider">
                  Our Hub
                </span>
                <span className="text-sm sm:text-base font-bold font-display text-white mt-1 block leading-snug">
                  Fujairah’s strategic Air, Sea, Rail &amp; Land connectivity.
                </span>
              </div>
              <div>
                <span className="text-xs uppercase text-[#D39257] font-semibold block font-display tracking-wider">
                  The Routes
                </span>
                <span className="text-sm sm:text-base font-bold font-display text-white mt-1 block leading-snug">
                  Connecting India to Global Trade.
                </span>
              </div>
              <div>
                <span className="text-xs uppercase text-[#D39257] font-semibold block font-display tracking-wider">
                  Project Cargo
                </span>
                <span className="text-sm sm:text-base font-bold font-display text-white mt-1 block leading-snug">
                  Available IL-76 &amp; B747 Nose Door Opening.
                </span>
              </div>
            </div>

            {/* Interactive 7X-Inspired Motion Controller */}
            <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setHeroMode(heroMode === "video" ? "photo" : "video")}
                title={heroMode === "video" ? "Switch to Static Photography" : "Switch to Cinematic Motion Video"}
                className="px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[11px] text-[#D8D8D6] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {heroMode === "video" ? (
                  <>
                    <ImageIcon className="w-3.5 h-3.5 text-[#D39257]" />
                    <span>View Photo</span>
                  </>
                ) : (
                  <>
                    <Film className="w-3.5 h-3.5 text-[#0083C7]" />
                    <span>Motion Mode</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={togglePlay}
                title={isPlaying ? "Pause Background Motion" : "Resume Background Motion"}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-[#D8D8D6] hover:text-white transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause motion" : "Play motion"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Four Core Service Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
            Four Focused Service Areas
          </h2>
          <p className="text-sm sm:text-base text-[#686664] leading-relaxed">
            Matching customer demand with qualified operating partners, reliable
            air freight capacity, and end-to-end multimodal logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-lg border border-[#E5E5E3] p-6 flex flex-col justify-between hover:border-[#0083C7] transition-all group shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center group-hover:bg-[#0083C7] group-hover:text-white transition-colors">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Aviation &amp; Charter Services
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Ad hoc and dedicated cargo charters, aircraft sourcing through
                qualified operators, and flexible ACMI arrangements on the
                Jaipur–Fujairah corridor.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F2F2F0] flex items-center justify-between">
              <Link
                to="/services"
                className="text-xs font-semibold text-[#0083C7] hover:underline inline-flex items-center gap-1"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenInquiry("Aviation & Charter Services")}
                className="text-xs font-semibold text-[#D39257] hover:text-[#BE7F45] cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg border border-[#E5E5E3] p-6 flex flex-col justify-between hover:border-[#0083C7] transition-all group shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center group-hover:bg-[#0083C7] group-hover:text-white transition-colors">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Air Cargo Services
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Cargo space sales, block-space arrangements, and coordination for
                general and specialised freight connecting exporters, freight
                forwarders, and consolidators.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F2F2F0] flex items-center justify-between">
              <Link
                to="/services"
                className="text-xs font-semibold text-[#0083C7] hover:underline inline-flex items-center gap-1"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenInquiry("Air Cargo Services")}
                className="text-xs font-semibold text-[#D39257] hover:text-[#BE7F45] cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg border border-[#E5E5E3] p-6 flex flex-col justify-between hover:border-[#0083C7] transition-all group shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center group-hover:bg-[#0083C7] group-hover:text-white transition-colors">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Logistics &amp; Supply Chain
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Coordinated first- and last-mile pickup, road feeder links,
                warehousing, customs facilitation, and single commercial point of
                contact.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F2F2F0] flex items-center justify-between">
              <Link
                to="/services"
                className="text-xs font-semibold text-[#0083C7] hover:underline inline-flex items-center gap-1"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenInquiry("Logistics & Supply Chain Solutions")}
                className="text-xs font-semibold text-[#D39257] hover:text-[#BE7F45] cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg border border-[#E5E5E3] p-6 flex flex-col justify-between hover:border-[#0083C7] transition-all group shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded bg-[#EFF7FC] text-[#0083C7] flex items-center justify-center group-hover:bg-[#0083C7] group-hover:text-white transition-colors">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                India–UAE Trade Connectivity
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Bilateral trade facilitation linking Indian exporters and
                manufacturers directly with UAE buyers, distribution centers, and
                onward international markets.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#F2F2F0] flex items-center justify-between">
              <Link
                to="/services"
                className="text-xs font-semibold text-[#0083C7] hover:underline inline-flex items-center gap-1"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenInquiry("India–UAE Trade Connectivity")}
                className="text-xs font-semibold text-[#D39257] hover:text-[#BE7F45] cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Proposed Jaipur–Fujairah Corridor Highlight */}
      <section className="bg-white border-y border-[#E5E5E3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
                <span className="w-2 h-0.5 bg-[#0083C7]" />
                <span>Proposed Bilateral Route</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
                The Fujairah–Jaipur–Fujairah Corridor
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#686664] leading-relaxed">
                <p>
                  AirRajasthan™ plans to commence cargo operations on the
                  Fujairah–Jaipur–Fujairah route, initially targeting one flight per
                  week on an ad hoc charter basis.
                </p>
                <p>
                  Subject to market demand, cargo volumes, aircraft availability,
                  and necessary operational approvals, we aim to progressively
                  increase frequency to three to four flights per week.
                </p>
                <p>
                  This initial corridor provides Indian manufacturers and exporters
                  direct access to the UAE without long delays, connecting with
                  maritime, rail, and regional distribution channels.
                </p>
              </div>

              <div className="p-4 bg-[#F9F9F8] rounded border border-[#E5E5E3] text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#1C1B1A] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#0083C7]" />
                  <span>Commercial &amp; Operational Planning Note</span>
                </div>
                <p className="text-[#686664] text-[11px] leading-relaxed">
                  Detailed flight schedules, commencement dates, and terminal slots
                  will be announced as operations are finalised and confirmed with
                  civil aviation authorities.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/route-schedule"
                  className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Route &amp; Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenInquiry("Jaipur–Fujairah Corridor Space Allocation")}
                  className="px-5 py-3 border border-[#E5E5E3] hover:bg-[#F2F2F0] text-[#1C1B1A] text-xs uppercase font-semibold tracking-wider rounded transition-colors cursor-pointer"
                >
                  Inquire For Space
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-lg border border-[#E5E5E3] overflow-hidden bg-[#1C1B1A] shadow-md group">
                <img
                  src="/images/Route.jpg"
                  alt="AirRajasthan™ proposed route map showing Jaipur to Fujairah corridor"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-[#E5E5E3] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#1C1B1A] block font-display uppercase">
                      Jaipur &harr; Fujairah Corridor
                    </span>
                    <span className="text-[#8C8A88] text-[11px]">
                      Proposed ad hoc charter connection
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#EFF7FC] text-[#0083C7] font-semibold text-[11px]">
                    Bilateral Cargo Corridor
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. The Fujairah Multimodal Hub Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-xl border border-[#E5E5E3] overflow-hidden bg-slate-900 shadow-md">
              <img
                src="/images/Fujairah Grand Mosque.jpg"
                alt="Sheikh Zayed Grand Mosque in Fujairah UAE with majestic Hajar mountains"
                className="w-full h-80 sm:h-96 object-cover object-center"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-[#E5E5E3] text-xs">
                <span className="font-bold text-[#1C1B1A] block font-display uppercase">
                  Fujairah Strategic Multimodal Hub
                </span>
                <span className="text-[#8C8A88]">
                  Connecting Air, Sea, National Rail, and Road Networks across the UAE
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span>Multimodal Gateway</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              Fujairah Strategic Multimodal Hub
            </h2>
            <p className="text-xs sm:text-sm text-[#4B4947] leading-relaxed">
              Located on the UAE&apos;s eastern coastline along the Gulf of Oman, Fujairah serves as AirRajasthan&apos;s
              strategic multimodal hub. Seamlessly bridging international air cargo, deepwater maritime
              infrastructure developed in collaboration with AD Ports Group, national freight rail operations via
              Etihad Rail, and bonded road feeder networks connecting Abu Dhabi&apos;s ICAD industrial clusters and
              Dubai dry ports, Fujairah delivers rapid transshipment without urban congestion.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 bg-white rounded border border-[#E5E5E3]">
                <Plane className="w-4 h-4 text-[#0083C7] mb-1.5" />
                <strong className="block text-[#1C1B1A]">Air Freight Gateway</strong>
                <span className="text-[#686664] text-[11px]">Direct ad hoc cargo charters</span>
              </div>
              <div className="p-3 bg-white rounded border border-[#E5E5E3]">
                <Anchor className="w-4 h-4 text-[#0083C7] mb-1.5" />
                <strong className="block text-[#1C1B1A]">AD Ports Maritime Link</strong>
                <span className="text-[#686664] text-[11px]">Gulf of Oman deepwater access</span>
              </div>
              <div className="p-3 bg-white rounded border border-[#E5E5E3]">
                <Train className="w-4 h-4 text-[#0083C7] mb-1.5" />
                <strong className="block text-[#1C1B1A]">Etihad Rail Freight</strong>
                <span className="text-[#686664] text-[11px]">National industrial rail spine</span>
              </div>
              <div className="p-3 bg-white rounded border border-[#E5E5E3]">
                <Truck className="w-4 h-4 text-[#0083C7] mb-1.5" />
                <strong className="block text-[#1C1B1A]">ICAD &amp; GCC Road Feeder</strong>
                <span className="text-[#686664] text-[11px]">Bonded inter-emirate transit</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/the-hub"
                className="text-xs font-semibold text-[#0083C7] hover:underline inline-flex items-center gap-1.5"
              >
                <span>Read more about the Fujairah Gateway &rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4B. India–UAE Trade Connectivity Feature Section */}
      <section className="bg-white border-y border-[#E5E5E3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold font-display">
                <Globe className="w-4 h-4 text-[#D39257]" />
                <span>Bilateral Trade Corridor</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
                India–UAE Trade Connectivity: Creating Commercial Links Between Two Strategic Markets
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#4B4947] leading-relaxed">
                <p>
                  Bolstered by the landmark India–UAE Comprehensive Economic Partnership Agreement (CEPA),
                  bilateral commerce between the two nations is experiencing historic expansion. AirRajasthan™
                  is purpose-built to accelerate this economic momentum through the proposed Jaipur–Fujairah
                  air cargo corridor.
                </p>
                <p>
                  Connecting Rajasthan&apos;s rich manufacturing clusters—spanning textiles, gems and jewellery,
                  handicrafts, stone, automotive components, and agricultural commodities—directly to UAE buyers,
                  importers, and sovereign logistics infrastructure, we provide the dedicated commercial link that
                  modern supply chains require.
                </p>
                <p>
                  Our commercial focus centers on creating balanced, two-way cargo flows: providing dependable
                  export capacity from Indian production hubs while identifying return-leg commercial demand
                  from UAE distribution channels to ensure long-term route sustainability and competitive freight economics.
                </p>
              </div>

              <div className="p-4 bg-[#F9F9F8] rounded-lg border border-[#E5E5E3] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-[#1C1B1A] uppercase font-display block">
                    CEPA Trade Enablement
                  </span>
                  <p className="text-[#686664] leading-relaxed">
                    Zero-duty and preferential tariff access supported by streamlined air freight documentation.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-[#1C1B1A] uppercase font-display block">
                    Balanced Two-Way Cargo
                  </span>
                  <p className="text-[#686664] leading-relaxed">
                    Dedicated backhaul coordination maximizing aircraft utilization and route viability.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenInquiry("India–UAE Trade Connectivity")}
                  className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors cursor-pointer shadow-xs"
                >
                  Inquire For Bilateral Cargo
                </button>
                <Link
                  to="/services#india-uae-trade"
                  className="text-xs font-semibold text-[#0083C7] hover:underline"
                >
                  Explore Trade Capabilities &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-xl border border-[#E5E5E3] overflow-hidden bg-[#1C1B1A] shadow-md group">
                <img
                  src="/images/AirRajasthan.jpg"
                  alt="AirRajasthan logistics operations linking India and UAE gateways"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="p-4 bg-white border-t border-[#E5E5E3] text-xs">
                  <span className="font-bold text-[#1C1B1A] block font-display uppercase">
                    Commercial Trade Facilitation
                  </span>
                  <span className="text-[#8C8A88]">
                    Jaipur industrial base &harr; Fujairah multimodal redistribution hub
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Specialised Cargo & Charter Aircraft Options */}
      <section className="bg-white border-y border-[#E5E5E3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0083C7] font-semibold font-display">
              <span className="w-2 h-0.5 bg-[#0083C7]" />
              <span>Specialised Handling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1B1A] uppercase tracking-tight">
              Project Cargo &amp; Specialised Shipments
            </h2>
            <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
              Handling capabilities planned through qualified operating partners,
              subject to aircraft compatibility, payload limits, airport facilities,
              and necessary regulatory approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-3">
              <span className="text-xs uppercase font-bold text-[#0083C7] font-display">
                Category 01
              </span>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Oversized &amp; Project Cargo
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Coordination for heavy industrial equipment, infrastructure
                components, and outsized machinery using partner-sourced freighters
                such as Boeing 747F (nose-loading) and Antonov options.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-[#8C8A88] block">
                  *Subject to technical suitability and route feasibility
                </span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-3">
              <span className="text-xs uppercase font-bold text-[#0083C7] font-display">
                Category 02
              </span>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                Perishables &amp; Temperature-Sensitive
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Coordinated cold-chain handling for agricultural goods, fresh
                produce, and pharmaceutical shipments, managed in conjunction with
                approved airport cold-storage and partner facilities.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-[#8C8A88] block">
                  *Available subject to station facility approvals
                </span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#F9F9F8] border border-[#E5E5E3] space-y-3">
              <span className="text-xs uppercase font-bold text-[#0083C7] font-display">
                Category 03
              </span>
              <h3 className="text-lg font-bold font-display text-[#1C1B1A] uppercase">
                High-Value &amp; Time-Sensitive Freight
              </h3>
              <p className="text-xs text-[#686664] leading-relaxed">
                Fast-track coordination for manufactured textiles, precious
                materials, automotive components, and emergency ad hoc freight
                requiring dedicated supervision.
              </p>
              <div className="pt-2">
                <span className="text-[11px] text-[#8C8A88] block">
                  *Direct coordination with airline handling agents
                </span>
              </div>
            </div>

          </div>

          <div className="text-center pt-4">
            <Link
              to="/services"
              className="text-xs font-semibold text-[#0083C7] hover:underline"
            >
              View Charter Aircraft Options &amp; Specifications &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Partnership Opportunities Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#1C1B1A] text-white p-8 sm:p-12 lg:p-16 border border-[#383635] relative overflow-hidden">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
              <Handshake className="w-4 h-4 text-[#0083C7]" />
              <span>Commercial Collaboration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white uppercase tracking-tight">
              Grow With AirRajasthan™. Connect Beyond Boundaries.
            </h2>
            <p className="text-xs sm:text-sm text-[#D8D8D6] leading-relaxed">
              We invite established cargo agents, freight forwarders, and
              aviation professionals to explore General Sales Agent (GSA), Cargo
              Sales Agent (CSA), and dedicated aircraft charter collaborations as
              we build our international trade routes.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/partnership"
                className="px-6 py-3 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Partnership Models</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenInquiry("Partnership Discussion")}
                className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white text-xs uppercase font-semibold tracking-wider rounded transition-colors cursor-pointer"
              >
                Inquire Directly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Inquiry Invitation Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white rounded-lg border border-[#E5E5E3] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold font-display text-[#1C1B1A] uppercase">
              Ready to Discuss Your Air Freight or Charter Requirement?
            </h3>
            <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
              Submit your inquiry with cargo details or partnership interest.
              Our commercial coordination team will review your specifications.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenInquiry("General Cargo Inquiry")}
            className="px-8 py-3.5 bg-[#0083C7] hover:bg-[#0072AD] active:bg-[#005A8A] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors shadow-md cursor-pointer shrink-0"
          >
            Submit an Inquiry
          </button>
        </div>
      </section>

    </div>
  );
}
