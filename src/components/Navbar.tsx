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
import { hdspLogo } from '../assets/images/index';

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
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse-glow" />
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
              className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MessageCircle className="w-3.5 h-3.5 animate-icon-wiggle" />
              <span>{BUSINESS_DETAILS.phone}</span>
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
        <a href="#" className="flex items-center gap-3 group py-1">
          <div className="flex flex-col items-center">
            <img
              src={hdspLogo}
              alt="Home Domestic Service Provider"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full shadow-md border-2 border-emerald-600/30 bg-white p-0.5 group-hover:scale-105 transition shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-950 uppercase tracking-tight text-center leading-tight mt-1 max-w-[115px] sm:max-w-[130px] hidden xs:block">
              Home Domestic Service Provider
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">HDSP</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Karachi
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-bold leading-tight mt-1">
              Home Domestic Service Provider
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
              100% Verified Domestic Staff
            </p>
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
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-xl transition shadow-xs group"
          >
            <Bot className="w-4 h-4 text-emerald-600 animate-icon-float" />
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
            className="p-2 text-emerald-700 bg-emerald-50 rounded-lg sm:hidden hover:bg-emerald-100 transition"
            title="Chat with AI"
          >
            <Bot className="w-5 h-5 animate-icon-wiggle" />
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
              WhatsApp: {BUSINESS_DETAILS.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
