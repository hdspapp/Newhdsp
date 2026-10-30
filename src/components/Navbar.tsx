import React, { useState } from 'react';
import {
  PhoneCall,
  ShieldCheck,
  Menu,
  X,
  MessageCircle,
  MapPin,
  Bot,
  Sparkles,
  Users
} from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/hdspData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
  lang: 'en' | 'ur';
  setLang: (lang: 'en' | 'ur') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenChat,
  lang,
  setLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar for Karachi Contact & Verification */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% CNIC & Police Cleared Staff
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Office UF-61, Defence Mall, DHA Phase 1, Karachi
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              Mon–Sat: 9am–9pm (WhatsApp 24/7)
            </span>
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>0303 2632605</span>
            </a>

            {/* Language switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-700 transition"
            >
              {lang === 'en' ? 'اردو (Urdu)' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-800 flex items-center justify-center text-white shadow-md font-extrabold tracking-wider text-base">
            HDSP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">HDSP</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                Karachi
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Home Domestic Service Provider</p>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#services" className="hover:text-emerald-700 transition">
            Staff Services
          </a>
          <a href="#verification" className="hover:text-emerald-700 transition flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verification Standards
          </a>
          <a href="#salary-calculator" className="hover:text-emerald-700 transition">
            Salary Guide
          </a>
          <a href="#roster" className="hover:text-emerald-700 transition flex items-center gap-1">
            <Users className="w-4 h-4 text-slate-400" />
            Verified Roster
          </a>
          <a href="#areas" className="hover:text-emerald-700 transition">
            Karachi Areas
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>Ask HDSP Assistant</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-xl shadow-sm hover:shadow transition"
          >
            <span>Book Verified Staff</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenChat}
            className="p-2 text-emerald-700 bg-emerald-50 rounded-lg sm:hidden"
            title="Chat with AI"
          >
            <Bot className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Staff Services
            </a>
            <a
              href="#verification"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Verification Standards</span>
              <span className="text-xs text-emerald-700 font-semibold">3 Guarantors</span>
            </a>
            <a
              href="#salary-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Karachi Salary Estimator
            </a>
            <a
              href="#roster"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Verified Candidates
            </a>
            <a
              href="#areas"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50"
            >
              Karachi Locations & Dispatch
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-center text-sm"
            >
              Book Domestic Staff Now
            </button>
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-50 text-emerald-800 font-bold py-2.5 rounded-xl text-center text-sm flex items-center justify-center gap-2 border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp: 0303 2632605
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
