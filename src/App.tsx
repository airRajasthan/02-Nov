import React, { useState, useEffect } from "react";
import { UserSession, Inquiry } from "./types";
import { RouterProvider, useRouter } from "./router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { InquiryModal } from "./components/InquiryModal";
import { LoginModal } from "./components/LoginModal";
import { DashboardView } from "./components/DashboardView";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

// Eight Final Public Pages + 404 Not Found
import { HomeView } from "./views/HomeView";
import { OurVisionView } from "./views/OurVisionView";
import { ServicesView } from "./views/ServicesView";
import { RouteScheduleView } from "./views/RouteScheduleView";
import { TheHubView } from "./views/TheHubView";
import { PartnershipView } from "./views/PartnershipView";
import { OurTeamView } from "./views/OurTeamView";
import { ContactView } from "./views/ContactView";
import { NotFoundView } from "./views/NotFoundView";
import { Lock, ShieldCheck } from "lucide-react";

function AppContent() {
  const { currentPath, navigate } = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);

  // Inquiry modal state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState<string>("");

  // Staff login modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Check existing session from server cookie on load
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setSession({
            userId: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            organization: "AirRajasthan Operations Desk",
          });
        }
      })
      .catch(() => {
        // Unauthenticated or server offline
      });
  }, []);

  const handleOpenInquiry = (context?: string) => {
    setInquiryContext(context || "");
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
    setInquiryContext("");
  };

  const handleAddInquirySuccess = (_newInquiry: Inquiry) => {
    // Persistent inquiry created in database
  };

  const handleLogout = () => {
    setSession(null);
    if (currentPath === "/dashboard") {
      navigate("/");
    }
  };

  // Route View Resolver
  const renderCurrentView = () => {
    // 1. Home
    if (currentPath === "/") {
      return <HomeView onOpenInquiry={handleOpenInquiry} />;
    }

    // 2. Our Vision (/our-vision and alias /about)
    if (currentPath === "/our-vision" || currentPath === "/about") {
      return <OurVisionView onOpenInquiry={handleOpenInquiry} />;
    }

    // 3. Services
    if (currentPath === "/services") {
      return <ServicesView onOpenInquiry={handleOpenInquiry} />;
    }

    // 4. Route & Schedule
    if (currentPath === "/route-schedule") {
      return <RouteScheduleView onOpenInquiry={handleOpenInquiry} />;
    }

    // 5. The Hub
    if (currentPath === "/the-hub") {
      return <TheHubView onOpenInquiry={handleOpenInquiry} />;
    }

    // 6. Partnership
    if (currentPath === "/partnership") {
      return <PartnershipView onOpenInquiry={handleOpenInquiry} />;
    }

    // 7. Our Team
    if (currentPath === "/our-team") {
      return <OurTeamView onOpenInquiry={handleOpenInquiry} />;
    }

    // 8. Contact Us
    if (currentPath === "/contact") {
      return <ContactView onSubmitInquiry={handleAddInquirySuccess} />;
    }

    // Authorized Staff Dashboard
    if (currentPath === "/dashboard") {
      if (!session) {
        return (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-12 h-12 rounded-full bg-[#EFF7FC] text-[#0083C7] mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-[#1C1B1A]">
              Staff Operations Portal
            </h2>
            <p className="text-xs text-[#686664] leading-relaxed">
              Authorized operations management for AirRajasthan™ staff. Please sign in with your corporate credentials.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="px-6 py-2.5 bg-[#0083C7] text-white text-xs uppercase font-bold tracking-wider rounded hover:bg-[#0072AD] transition-colors shadow-xs cursor-pointer"
              >
                Sign In to Console
              </button>
            </div>
          </div>
        );
      }

      return <DashboardView session={session} onLogout={handleLogout} />;
    }

    // 404 Not Found for any unknown route
    return <NotFoundView />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#2B2A29]">
      {/* Public Navigation */}
      <Navbar
        session={session}
        onOpenInquiry={handleOpenInquiry}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 focus:outline-none" id="main-content">
        {renderCurrentView()}
      </main>

      {/* Footer with Office details & Staff access */}
      <Footer
        onOpenInquiry={handleOpenInquiry}
        onOpenStaffLogin={() => setIsLoginOpen(true)}
      />

      {/* Floating Accessible WhatsApp Contact Button */}
      <FloatingWhatsApp />

      {/* Shared Inquiry Modal Dialog */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
        onSubmitInquiry={handleAddInquirySuccess}
        initialContext={inquiryContext}
      />

      {/* Staff Authentication Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(newSession) => {
          setSession(newSession);
          navigate("/dashboard");
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
