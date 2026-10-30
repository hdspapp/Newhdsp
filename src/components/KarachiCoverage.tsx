import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Building,
  PhoneCall,
  CheckCircle2,
  Navigation,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_DETAILS, KARACHI_AREAS } from '../data/hdspData';

interface KarachiCoverageProps {
  onSelectAreaForBooking: (areaName: string) => void;
}

export const KarachiCoverage: React.FC<KarachiCoverageProps> = ({
  onSelectAreaForBooking,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const zones = ['All', 'District South', 'District East', 'District Central', 'Suburban & Gated', 'District Malir'];

  const filteredAreas =
    selectedZone === 'All'
      ? KARACHI_AREAS
      : KARACHI_AREAS.filter((a) => a.zone === selectedZone);

  return (
    <section id="areas" className="py-16 md:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Coverage Across All Karachi
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Karachi Neighborhoods & Fast Dispatch
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            We provide verified staff across all major residential sectors in Karachi with prompt candidate interviews and home trials.
          </p>
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                selectedZone === zone
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredAreas.map((area, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl p-4 hover:border-emerald-500 hover:bg-emerald-50/20 transition flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {area.zone}
                </span>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition">
                  {area.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Interview Setup: {area.dispatchTime}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectAreaForBooking(area.name)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline px-2 py-1"
              >
                Book Here
              </button>
            </div>
          ))}
        </div>

        {/* Karachi Physical Office Box */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
              <Building className="w-3.5 h-3.5" />
              Physical Office in DHA Phase 1
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Visit HDSP Head Office for In-Person Candidate Interviews
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Clients are welcome to conduct in-person interviews at our comfortable recruiting office located at{' '}
              <strong className="text-white">{BUSINESS_DETAILS.address}</strong>. Our staff can also arrange candidate video interviews or trial visits to your residence.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Air-conditioned interview rooms
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Original CNIC & guarantor dossiers inspection
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappIntl}?text=${encodeURIComponent(
                'Assalam o Alaikum, I would like to schedule an office visit or candidate interview at your Defence Mall office.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 0303 2632605</span>
            </a>

            <a
              href={`tel:${BUSINESS_DETAILS.phoneRaw}`}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Office Directly</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
