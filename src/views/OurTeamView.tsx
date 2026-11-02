import React from "react";
import { Link } from "../router";
import { User, Shield, ArrowRight, Building, Award, Briefcase } from "lucide-react";

interface OurTeamViewProps {
  onOpenInquiry: (context?: string) => void;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  roleCategory: string;
  bio: string;
  photoUrl: string;
  isProfileComingSoon?: boolean;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "mohammed-imran",
    name: "Mohammed Imran",
    designation: "Co-Founder / Head of Commercial & Operation",
    roleCategory: "Commercial & Operations Leadership",
    photoUrl: "/images/Team_Imran.png",
    bio: "Mohammed Imran brings over 25 years of professional experience spanning advertising, brand management, business development and operations, with more than a decade of exposure to the UAE aviation and air cargo industry. His career includes serving as Head of Business Development at Air Cargo Update, where he leveraged industry relationships, strategic marketing and commercial expertise to strengthen business opportunities across the aviation and logistics sectors. He also served as Head of Commercial at 7D Cargo, contributing to business development, trade management and cargo operations. With an extensive network across the UAE and India, Mohammed combines commercial insight, brand-building expertise and cross-market relationships with strong liaisoning capabilities, building and nurturing relationships with airport authorities, ground handling agencies, airlines, cargo operators and logistics companies. His expertise in stakeholder coordination, strategic partnerships and market development enables him to identify growth opportunities, streamline commercial coordination and develop sustainable business models. This combination of industry knowledge, operational understanding and relationship management positions him to drive AirRajasthan’s growth ambitions across aviation, air cargo, charter services and logistics.",
  },
  {
    id: "aman-jain",
    name: "Aman Jain",
    designation: "Co-Founder & Managing Partner",
    roleCategory: "Executive Management & Logistics",
    photoUrl: "/images/Team Aman.jpeg",
    bio: "At approximately 35 years of age, Aman Jain brings a decade of professional experience in commercial management, business operations and logistics, combining a practical understanding of the industry with a forward-looking approach to business growth. Through his association with MCPL Logistics, he has developed expertise in commercial planning, client relationship management, operational coordination and business development within the logistics and export-import sector. His professional approach emphasises building long-term customer relationships, identifying new business opportunities, strengthening industry partnerships and delivering commercially effective logistics solutions. As Co-Founder & Managing Partner of AirRajasthan, Aman brings entrepreneurial vision, commercial acumen and management experience to the company’s development, supporting its ambition to establish a sustainable presence across aviation, air cargo, charter services and integrated logistics. Aman Jain maintains strong professional relationships within Jaipur’s aviation ecosystem, including airport stakeholders, civil aviation authorities and ground handling providers. His liaisoning and coordination capabilities support AirRajasthan’s operational planning, commercial development and long-term aviation partnerships.",
  },
  {
    id: "shourya-wadhwa",
    name: "Shourya Wadhwa",
    designation: "Co-Founder / Finance & Administration Head",
    roleCategory: "Finance & Administration",
    photoUrl: "/images/Team Shourya.jpg",
    bio: "Shourya Wadhwa serves as Co-Founder and Finance & Administration Head at AirRajasthan, overseeing financial planning, corporate administration, fiscal governance, and cross-border commercial compliance across India and the UAE. With a focused background in commercial finance, treasury management, and organizational administration, Shourya guides capital allocation, budgeting, financial modeling for charter and scheduled cargo operations, and administrative frameworks. His strategic oversight ensures operational efficiency, robust internal controls, and seamless fiscal coordination between AirRajasthan’s administrative hubs in Jaipur and the UAE.",
  },
];

export function OurTeamView({ onOpenInquiry }: OurTeamViewProps) {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-[#1C1B1A] text-white py-20 sm:py-24 border-b border-[#383635]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D39257] font-semibold">
            <span className="w-2 h-0.5 bg-[#0083C7]" />
            <span>Organization &amp; Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            Our Team
          </h1>
          <p className="text-sm sm:text-base text-[#D8D8D6] max-w-3xl leading-relaxed font-light">
            Founded by seasoned commercial and aviation professionals with deep industry networks across
            the UAE, India, and regional air cargo hubs.
          </p>
        </div>
      </section>

      {/* Team Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-[#E5E5E3] overflow-hidden shadow-xs flex flex-col justify-between hover:border-[#0083C7] transition-all"
            >
              <div>
                {/* Executive Photo Header */}
                <div className="py-8 px-6 bg-gradient-to-b from-[#F2F2F0] to-white border-b border-[#E5E5E3] flex flex-col items-center justify-center text-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#0083C7]/40 shadow-md bg-[#E5E5E3]">
                    <img
                      src={member.photoUrl}
                      alt={`${member.name} — ${member.designation}`}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-bold font-display uppercase tracking-wider mt-4 text-[#0083C7]">
                    {member.roleCategory}
                  </span>
                  <h3 className="text-xl font-bold font-display uppercase text-[#1C1B1A] mt-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D39257] mt-0.5">
                    {member.designation}
                  </p>
                </div>

                {/* Biography Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  {member.isProfileComingSoon ? (
                    <div className="py-8 text-center space-y-2">
                      <p className="text-sm font-semibold text-[#8C8A88] italic">
                        Profile coming soon
                      </p>
                      <p className="text-xs text-[#B7B6B4]">
                        Executive bio and credentials will be published upon confirmation.
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-[#4A4846] leading-relaxed text-pretty">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] text-[11px] text-[#686664] flex items-center justify-between">
                  <span className="font-medium text-[#1C1B1A]">Co-Founder</span>
                  <span className="text-[#0083C7] font-semibold">AirRajasthan™</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Consultation & Inquiry CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white rounded-xl border border-[#E5E5E3] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold font-display uppercase text-[#1C1B1A]">
              Connect With AirRajasthan&apos;s Leadership
            </h3>
            <p className="text-xs sm:text-sm text-[#686664] leading-relaxed">
              For commercial alliances, aircraft charter coordination, or airline GSA partnerships,
              our management team welcomes your direct inquiry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenInquiry("Leadership & Management Inquiry")}
            className="px-8 py-3.5 bg-[#0083C7] hover:bg-[#0072AD] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors shadow-xs cursor-pointer shrink-0"
          >
            Submit an Inquiry
          </button>
        </div>
      </section>
    </div>
  );
}
