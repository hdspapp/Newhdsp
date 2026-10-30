import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  CheckCircle,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { VERIFIED_CANDIDATES, CandidateProfile } from '../data/hdspData';

interface CandidateRosterProps {
  onRequestCandidate: (candidate: CandidateProfile) => void;
}

export const CandidateRoster: React.FC<CandidateRosterProps> = ({
  onRequestCandidate,
}) => {
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredCandidates =
    filterRole === 'all'
      ? VERIFIED_CANDIDATES
      : VERIFIED_CANDIDATES.filter((c) =>
          c.role.toLowerCase().includes(filterRole.toLowerCase())
        );

  return (
    <section id="roster" className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Active Karachi Staff Roster
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sample Pre-Vetted Candidates Ready for Interview
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Each candidate has undergone mandatory CNIC inspection, police verification, and provided 3 registered local guarantors.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Candidates' },
            { id: 'cook', label: 'Cooks & Chefs' },
            { id: 'driver', label: 'Family Drivers' },
            { id: 'nurse', label: 'Patient Attendants' },
            { id: 'nanny', label: 'Babysitters & Nannies' },
            { id: 'security', label: 'Security Guards' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterRole(btn.id)}
              className={`text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                filterRole === btn.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-emerald-900 text-white font-bold flex items-center justify-center text-base shadow-inner">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base">{candidate.name}</h3>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700">
                        {candidate.experienceYears} Years Experience
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {candidate.availability}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block">{candidate.role}</span>
                  <span className="text-[11px] text-slate-500 block urdu-font">{candidate.urduRole}</span>
                </div>

                {/* Key attributes */}
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Preferred Shift:</span>
                    <span className="font-semibold text-slate-800">{candidate.preferredWorkType}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Languages:</span>
                    <span className="font-semibold text-slate-800">{candidate.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Preferred Areas:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                      {candidate.preferredAreas.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Skills Chips */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Skills & Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Badges */}
                <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CNIC & NADRA Biometric Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sindh Police & CPLC Cleared</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>3 Registered CNIC Guarantors on File</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onRequestCandidate(candidate)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <span>Request Interview / Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
