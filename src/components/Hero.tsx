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
  Building
} from 'lucide-react';
import { BUSINESS_DETAILS, KARACHI_AREAS, SERVICES_LIST } from '../data/hdspData';

interface HeroProps {
  onOpenBooking: (prefillStaff?: string) => void;
  onOpenChatWithPrompt: (prompt: string) => void;
  lang: 'en' | 'ur';
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenChatWithPrompt,
  lang,
}) => {
  const [selectedRole, setSelectedRole] = useState(SERVICES_LIST[0].title);
  const [selectedArea, setSelectedArea] = useState(KARACHI_AREAS[0].name);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedRole);
  };

  const handleAskAssistant = () => {
    onOpenChatWithPrompt(`Assalam o Alaikum! I am looking to hire a ${selectedRole} in ${selectedArea}, Karachi. Can you explain the rates and verification process?`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Top verified badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Karachi's Trusted Domestic Staffing & Care Agency</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">100% Verified</span> Domestic Staff in Karachi
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Experienced House Maids, Professional Cooks, Family Drivers, Babysitters, and Patient Attendants. Screened with <strong className="text-white">Police Clearance</strong>, <strong className="text-white">NADRA CNIC checks</strong>, and <strong className="text-white">3 Registered Guarantors</strong>.
          </p>

          {/* Office & Direct WhatsApp callout banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white/10 border border-white/15 px-4 py-2 rounded-2xl text-xs backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              Office UF-61, Defence Mall, DHA Phase 1
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-amber-300 font-bold hover:text-amber-200 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              WhatsApp/Call: 0303 2632605
            </a>
          </div>

          {/* Instant Requirement Finder Card */}
          <div className="mt-8 bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-100 max-w-2xl mx-auto text-left">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                Quick Staff Finder & Quote
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Dispatch within 24h
              </span>
            </div>

            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                  Staff Role
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
                  Karachi Area
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
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick trust pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 text-left max-w-4xl mx-auto">
            {[
              { title: 'Mandatory CNIC Verification', desc: 'Verified with NADRA database' },
              { title: 'Police & CPLC Clearance', desc: 'Zero criminal record guarantee' },
              { title: '3 Registered Guarantors', desc: 'Full legal accountability' },
              { title: 'Replacement Warranty', desc: 'Free swap if not a good fit' },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs flex items-start gap-2.5"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">{pillar.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
