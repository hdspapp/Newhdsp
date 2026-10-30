import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Users2,
  UserCheck,
  RefreshCw,
  Building,
  CheckCircle2,
  FileText,
  BadgeAlert,
  ArrowRight
} from 'lucide-react';
import { VERIFICATION_PILLARS, BUSINESS_DETAILS } from '../data/hdspData';

interface VerificationSectionProps {
  onOpenBooking: () => void;
  onAskAi: (prompt: string) => void;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  onOpenBooking,
  onAskAi,
}) => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'dossier'>('pillars');

  return (
    <section id="verification" className="py-16 md:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Uncompromising Safety & Screening
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How HDSP Verifies Every Domestic Candidate
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Your home and family’s security is our highest priority. Unlike informal agencies, HDSP enforces a rigorous, multi-layered background verification before any staff member enters your home.
          </p>

          {/* Toggle buttons */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl mt-6 border border-slate-200">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer ${
                activeTab === 'pillars'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5-Step Verification Protocol
            </button>
            <button
              onClick={() => setActiveTab('dossier')}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer ${
                activeTab === 'dossier'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Client Safety Dossier (What You Receive)
            </button>
          </div>
        </div>

        {activeTab === 'pillars' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFICATION_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                      {pillar.step}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>

                  <h3 className="font-bold text-base text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5 urdu-font">
                    {pillar.urduTitle}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center text-[11px] font-semibold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  Verified on Record at DHA Office
                </div>
              </div>
            ))}

            {/* Replacement banner */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  Peace of Mind
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  Dedicated Replacement Warranty
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If any domestic helper, driver, or caregiver proves unsuitable or requests leave within your contract, our recruitment desk at Defence Mall coordinates an immediate backup replacement.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={onOpenBooking}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition cursor-pointer text-center"
                >
                  Hire Verified Staff
                </button>
                <button
                  onClick={() =>
                    onAskAi(
                      'What is your replacement policy if the maid or cook is not a good fit for my house in Karachi?'
                    )
                  }
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition cursor-pointer text-center"
                >
                  Ask Replacement Terms
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Client Safety Dossier Preview */
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Official Verification Package
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  What Every Employer Receives Before Staff Placement
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-800">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                Physical Legal Folder
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: '1. NADRA CNIC Copy & Biometric Scan',
                  desc: 'High-resolution colored copy of candidate’s original CNIC with permanent & current address records.',
                },
                {
                  title: '2. Sindh Police Verification Certificate',
                  desc: 'Karachi Police clearance form and background verification check from the candidate’s local police station.',
                },
                {
                  title: '3. Three Signed Guarantors Dossier',
                  desc: 'Signed affidavits from three local Karachi guarantors with their verified CNIC copies, workplace, and phone numbers.',
                },
                {
                  title: '4. Physical Address Verification',
                  desc: 'Field verification of the candidate’s residential quarters in Karachi prior to shortlisting.',
                },
                {
                  title: '5. Medical & Hygiene Clearance',
                  desc: 'Basic health checkup for communicable health conditions, especially for cooks, infant nannies, and patient care.',
                },
                {
                  title: '6. Official HDSP Placement Agreement',
                  desc: 'Legal staffing contract specifying agreed monthly salary, working hours, weekly off, and free replacement clause.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 text-center sm:text-left">
                All records stored securely at HDSP Office UF-61, Defence Mall, DHA Phase 1, Karachi.
              </span>
              <button
                onClick={onOpenBooking}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Request Candidate Dossiers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
