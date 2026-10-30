import React from 'react';
import {
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Heart,
  Bot
} from 'lucide-react';
import { BUSINESS_DETAILS, SERVICES_LIST, KARACHI_AREAS } from '../data/hdspData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenChat }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                HDSP
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight">HDSP</span>
                <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  Home Domestic Service Provider
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Premier domestic staffing and home care agency based in Karachi, Pakistan. Dedicated to providing 100% verified, trustworthy household and commercial staff.
            </p>

            <div className="pt-2 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${BUSINESS_DETAILS.phoneRaw}`} className="text-white hover:underline font-bold">
                  {BUSINESS_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{BUSINESS_DETAILS.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{BUSINESS_DETAILS.timings}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Offered */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Staffing Services
            </h4>
            <ul className="space-y-2">
              {SERVICES_LIST.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-emerald-400 transition flex items-center justify-between">
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Karachi Areas */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Karachi Coverage
            </h4>
            <ul className="space-y-1.5">
              {[
                'DHA Phases 1 through 8',
                'Clifton Blocks 1 to 9 & Sea View',
                'PECHS & Tariq Road Vicinity',
                'Gulshan-e-Iqbal & Gulistan-e-Johar',
                'North Nazimabad & FB Area',
                'Bahria Town Karachi & Scheme 33',
                'Malir Cantt, Askari 4 & 5',
                'Korangi & Defence View',
              ].map((area, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="text-emerald-500">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Safety & Quick Action */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-2">
              Verification Standards
            </h4>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Mandatory CNIC & Address Check</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Police Clearance & CPLC Records</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Min 3 Registered Guarantors</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Hassle-Free Replacement Policy</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 px-3 rounded-xl transition text-center cursor-pointer"
              >
                Book Domestic Staff
              </button>

              <button
                onClick={onOpenChat}
                className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat with HDSP Assistant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} HDSP (Home Domestic Service Provider) Karachi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Official Agency Address: Office UF-61, Defence Mall, DHA Phase 1, Karachi, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};
