import React, { useState } from "react";
import { UserSession } from "../types";
import { BrandLogo } from "./BrandLogo";
import { X, Lock, Mail, AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        const session: UserSession = {
          userId: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          organization: "AirRajasthan Operations Desk",
        };
        onLoginSuccess(session);
        onClose();
      } else {
        setError(data.error || "Authentication failed. Please verify your credentials.");
      }
    } catch (err: any) {
      setError("Unable to connect to authentication service. Check network or server status.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="bg-white rounded-xl border border-[#E5E5E3] max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#8C8A88] hover:text-[#2B2A29] rounded-full transition-colors cursor-pointer"
          aria-label="Close Login Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center mb-2">
            <BrandLogo size="md" />
          </div>
          <h3 id="login-modal-title" className="text-xl font-bold font-display uppercase tracking-tight text-[#2B2A29]">
            Staff Operations Portal
          </h3>
          <p className="text-xs text-[#686664]">
            Authorized access for AirRajasthan™ administrators and operations team personnel.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold uppercase tracking-wider text-[#1C1B1A] block mb-1">
              Corporate Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@airrajasthan.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7] text-sm"
              />
              <Mail className="w-4 h-4 text-[#8C8A88] absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="font-semibold uppercase tracking-wider text-[#1C1B1A] block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7] text-sm"
              />
              <Lock className="w-4 h-4 text-[#8C8A88] absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="p-3 bg-[#F9F9F8] border border-[#E5E5E3] rounded-lg text-[11px] text-[#686664] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0083C7] shrink-0" />
            <span>Secured via HttpOnly session tokens &amp; role-based access control.</span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#0083C7] hover:bg-[#0072AD] active:bg-[#005A8A] disabled:opacity-50 text-white text-xs uppercase font-bold tracking-wider rounded transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>{isSubmitting ? "Authenticating..." : "Sign In to Console"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
