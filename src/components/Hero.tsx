import React, { useState } from 'react';
import {
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  MapPin,
  Bot,
  Search,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Building,
  Check,
  FileCheck2
} from 'lucide-react';
import { BUSINESS_DETAILS, KARACHI_AREAS, SERVICES_LIST } from '../data/hdspData';
import { hdspLogo, teamUniformImg } from '../assets/images/index';

interface HeroProps {
  onOpenBooking: (prefillStaff?: string) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
  lang?: 'en' | 'ur';
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenChatWithPrompt,
}) => {
  const [selectedRole, setSelectedRole] = useState(SERVICES_LIST[0].title);
  const [selectedArea, setSelectedArea] = useState(KARACHI_AREAS[0].name);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedRole);
  };

  const handleAskAssistant = () => {
    onOpenChatWithPrompt(
      `Assalam o Alaikum! I am looking to hire a ${selectedRole} in ${selectedArea}, Karachi. Can you explain the rates, work options, and verification process?`
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white pt-8 pb-14 md:pt-14 md:pb-20 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Badges & Quick Quote Finder */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Top verified badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs shadow-inner">
              <img
                src={hdspLogo}
                alt="HDSP Logo"
                className="w-5 h-5 object-contain rounded-full bg-white p-0.5 animate-pulse-glow"
                referrerPolicy="no-referrer"
              />
              <span>Karachi's Trusted Domestic Staffing & Care Agency</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.12]">
              Hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">100% Verified</span> Domestic Staff in Karachi
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
              House Maids (Masi), Experienced Cooks, Family Drivers, Babysitters, and Patient Attendants. Screened with <strong className="text-white">Sindh Police Clearance</strong>, <strong className="text-white">NADRA CNIC checks</strong>, and <strong className="text-white">3 Registered Guarantors</strong>.
            </p>

            {/* Office & Direct WhatsApp callout banner */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-xl text-slate-200 backdrop-blur-md">
                <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Office UF-61, Defence Mall, DHA Phase 1</span>
              </div>
              <a
                href={`https://wa.me/${BUSINESS_DETAILS.whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition shadow-sm group"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-icon-wiggle text-amber-300" />
                <span>WhatsApp: {BUSINESS_DETAILS.phone}</span>
              </a>
            </div>

            {/* Instant Requirement Finder Card */}
            <div className="bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-100 max-w-xl text-left">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-emerald-600 animate-icon-float" />
                  Quick Staff Finder & Quote
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Clock className="w-3.5 h-3.5" />
                  Dispatch within 24h
                </span>
              </div>

              <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Staff Needed
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Your Karachi Area
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    {KARACHI_AREAS.map((a, idx) => (
                      <option key={idx} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-12 flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                  >
                    <span>Book This Staff</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleAskAssistant}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer group"
                  >
                    <Bot className="w-4 h-4 text-emerald-600 animate-icon-wiggle" />
                    <span>Ask AI Assistant</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Visual Uniform Staff Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-2 sm:p-3 rounded-3xl backdrop-blur-md shadow-2xl">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-900 group">
                <img
                  src={teamUniformImg}
                  alt="HDSP Verified Domestic Staff Team in Official Uniform"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-between p-4 sm:p-5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      <img
                        src={hdspLogo}
                        alt="HDSP Logo"
                        className="w-4 h-4 object-contain rounded-full bg-white p-0.5 animate-pulse-glow"
                        referrerPolicy="no-referrer"
                      />
                      <span>HDSP Uniform Staff</span>
                    </div>

                    <span className="bg-slate-900/80 backdrop-blur-xs text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Live Placements
                    </span>
                  </div>

                  {/* Bottom Text Card */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="text-white font-extrabold text-base sm:text-lg leading-snug">
                      Verified & Uniformed Staff for Karachi Residences
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Every candidate is interviewed in-person at Defence Mall with CNIC verification, police clearance, and 3 signed local guarantors.
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-emerald-300 font-medium">
                        DHA • Clifton • PECHS • Gulshan • Bahria
                      </span>
                      <button
                        onClick={() => onOpenBooking()}
                        className="bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer group"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating micro-trust strip below card */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-left">
                <div className="bg-white/10 rounded-xl p-2.5 border border-white/10 flex items-center gap-2 group hover:bg-white/15 transition">
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 animate-icon-float" />
                  <div>
                    <p className="text-[11px] font-bold text-white">3 Guarantors</p>
                    <p className="text-[10px] text-slate-300">Mandatory per candidate</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5 border border-white/10 flex items-center gap-2 group hover:bg-white/15 transition">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse-glow" />
                  <div>
                    <p className="text-[11px] font-bold text-white">Police Cleared</p>
                    <p className="text-[10px] text-slate-300">Clean criminal records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Trust Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-10 text-left">
          {[
            { title: 'Mandatory CNIC Verification', desc: 'Verified with NADRA database' },
            { title: 'Police & CPLC Clearance', desc: 'Zero criminal record guarantee' },
            { title: '3 Registered Guarantors', desc: 'Full legal accountability' },
            { title: 'Replacement Warranty', desc: 'Free swap if not a good fit' },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 hover:border-emerald-500/40 rounded-xl p-3.5 backdrop-blur-xs flex items-start gap-2.5 transition group hover:bg-white/10"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-300 animate-pulse-glow" />
              <div>
                <h4 className="text-xs font-bold text-white">{pillar.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
