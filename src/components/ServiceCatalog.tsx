import React, { useState } from 'react';
import {
  Sparkles,
  UtensilsCrossed,
  Car,
  Baby,
  HeartPulse,
  UserCheck,
  Shield,
  Building2,
  Flower2,
  Wrench,
  Check,
  ArrowRight,
  Bot,
  MapPin,
  Clock
} from 'lucide-react';
import { SERVICES_LIST, StaffService } from '../data/hdspData';

interface ServiceCatalogProps {
  onBookRole: (roleTitle: string) => void;
  onAskAi: (prompt: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  onBookRole,
  onAskAi,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-amber-600" />;
      case 'Car':
        return <Car className="w-5 h-5 text-blue-600" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-pink-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-teal-600" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-indigo-600" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-slate-600" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-emerald-600" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-orange-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Verified Staffing Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Domestic & Care Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Every candidate is interview-tested, police-cleared, and backed by a minimum of 3 registered guarantors.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Services (10)' },
            { id: 'domestic', label: 'Domestic Staff (Maids, Cooks, Drivers)' },
            { id: 'medical', label: 'Medical & Patient Care (Nurses, Attendants)' },
            { id: 'commercial', label: 'Commercial & Office Support' },
            { id: 'maintenance', label: 'Maintenance & Technical' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition flex flex-col overflow-hidden group"
            >
              {/* Card top */}
              <div className="p-5 border-b border-slate-100 flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-105 transition">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {service.salaryRangePKR}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5 urdu-font">
                  {service.urduTitle}
                </p>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Duties */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Typical Responsibilities:
                  </span>
                  {service.duties.map((duty, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{duty}</span>
                    </div>
                  ))}
                </div>

                {/* Hiring Formats */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.options.map((opt, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      {opt}
                    </span>
                  ))}
                </div>

                {/* Karachi Hotspots */}
                <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">Popular in: {service.popularIn.join(', ')}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onBookRole(service.title)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <span>Book Candidate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() =>
                    onAskAi(
                      `I want to know more about hiring a ${service.title} in Karachi. What are the salary standards, work timings, and verification steps?`
                    )
                  }
                  title="Ask HDSP AI Assistant"
                  className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 py-2 px-3 rounded-xl text-xs flex items-center gap-1 font-semibold transition cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
