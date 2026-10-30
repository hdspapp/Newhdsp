import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Bot,
  Info,
  Calendar,
  Home
} from 'lucide-react';
import { SERVICES_LIST, KARACHI_AREAS } from '../data/hdspData';

interface SalaryEstimatorProps {
  onBookStaff: (roleTitle: string, workType: string) => void;
  onAskAi: (prompt: string) => void;
}

export const SalaryEstimator: React.FC<SalaryEstimatorProps> = ({
  onBookStaff,
  onAskAi,
}) => {
  const [role, setRole] = useState(SERVICES_LIST[0].title);
  const [workType, setWorkType] = useState('Live-In (24/7)');
  const [area, setArea] = useState('DHA Phase 1 to 8 & Extension');
  const [familySize, setFamilySize] = useState('Medium (3–5 persons)');

  // Salary calculation logic tailored to Karachi domestic market
  const calculateEstimate = () => {
    let baseMin = 25000;
    let baseMax = 35000;

    if (role.includes('Cook') || role.includes('Chef')) {
      baseMin = 34000;
      baseMax = 50000;
    } else if (role.includes('Driver')) {
      baseMin = 30000;
      baseMax = 45000;
    } else if (role.includes('Patient') || role.includes('Nurse')) {
      baseMin = 42000;
      baseMax = 65000;
    } else if (role.includes('Elderly Caregiver')) {
      baseMin = 36000;
      baseMax = 55000;
    } else if (role.includes('Nanny') || role.includes('Babysitter')) {
      baseMin = 30000;
      baseMax = 44000;
    } else if (role.includes('Security')) {
      baseMin = 30000;
      baseMax = 42000;
    } else if (role.includes('Office Assistant')) {
      baseMin = 28000;
      baseMax = 38000;
    }

    // Work type multiplier
    if (workType === 'Part-Time') {
      baseMin = Math.round(baseMin * 0.55);
      baseMax = Math.round(baseMax * 0.6);
    } else if (workType === 'Full-Time (8-10h)') {
      baseMin = Math.round(baseMin * 0.9);
      baseMax = Math.round(baseMax * 0.95);
    } else if (workType === 'Urgent / Same-Day') {
      baseMin = Math.round(baseMin * 1.15);
      baseMax = Math.round(baseMax * 1.2);
    }

    // Family size multiplier
    if (familySize === 'Large (6+ persons / Joint Family)') {
      baseMin += 4000;
      baseMax += 6000;
    }

    return {
      minPKR: baseMin.toLocaleString(),
      maxPKR: baseMax.toLocaleString(),
    };
  };

  const estimate = calculateEstimate();

  const handleConsultAi = () => {
    onAskAi(
      `I want to know the exact salary breakdown for a ${role} in ${area}, Karachi for a ${familySize} under a ${workType} arrangement. What benefits, food, and leave are customary?`
    );
  };

  return (
    <section id="salary-calculator" className="py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Karachi Domestic Staff Salary Estimator
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Calculate realistic Karachi market compensation based on role, shift type, and neighborhood requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Staff Category
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {SERVICES_LIST.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Work Arrangement
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Live-In (24/7)', 'Full-Time (8-10h)', 'Part-Time', 'Urgent / Same-Day'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setWorkType(type)}
                    className={`py-2 px-2 text-xs rounded-xl font-medium border text-center transition cursor-pointer ${
                      workType === type
                        ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Karachi Locality
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {KARACHI_AREAS.map((a, idx) => (
                    <option key={idx} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Family / Household Size
                </label>
                <select
                  value={familySize}
                  onChange={(e) => setFamilySize(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Small (1–2 persons / Couple)">Small (1–2 persons)</option>
                  <option value="Medium (3–5 persons)">Medium (3–5 persons)</option>
                  <option value="Large (6+ persons / Joint Family)">Large (6+ Joint Family)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Salaries vary based on candidate experience, skills, and overtime requirements.</span>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/70 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Estimated Monthly Salary
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Rs. {estimate.minPKR} – {estimate.maxPKR}
                <span className="text-xs font-normal text-slate-400 block sm:inline sm:ml-1">/ month</span>
              </div>

              {/* Perks / Norms in Karachi */}
              <div className="mt-5 space-y-2 text-xs border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Home className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {workType.includes('Live-In')
                      ? 'Accommodation & 3 daily meals provided by employer'
                      : 'Non-residential; commute allowance or lunch typically offered'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Standard Leave: 2 to 4 off-days per month</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full CNIC, Police & 3 Guarantors check included</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => onBookStaff(role, workType)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <span>Book Staff with this Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleConsultAi}
                className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ask AI for Custom Negotiation Tips</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
