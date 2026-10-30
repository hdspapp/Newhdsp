import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  FileCheck,
  Building
} from 'lucide-react';
import { BUSINESS_DETAILS, KARACHI_AREAS, SERVICES_LIST } from '../data/hdspData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStaff?: string;
  preselectedWorkType?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedStaff,
  preselectedWorkType,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [staffType, setStaffType] = useState(preselectedStaff || 'House Maid & Cleaning Helper (Masi)');
  const [workType, setWorkType] = useState(preselectedWorkType || 'Live-In (24/7)');
  const [area, setArea] = useState('DHA Phase 1 to 8 & Extension');
  const [customArea, setCustomArea] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('Urgent / As Soon As Possible');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    referenceId: string;
    whatsappUrl: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !staffType) return;

    setIsSubmitting(true);
    const resolvedArea = area === 'Other Karachi Area' ? customArea || 'Karachi' : area;

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          staffType,
          workType,
          area: resolvedArea,
          notes: `${notes} [Start: ${startDate}]`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedResult({
          referenceId: data.inquiry.id,
          whatsappUrl: data.whatsappUrl,
        });
      } else {
        // Fallback reference code
        const refId = `HDSP-KHI-${Math.floor(1000 + Math.random() * 9000)}`;
        const messageText = `*HDSP Booking Request*\nRef: ${refId}\nName: ${name}\nPhone: ${phone}\nStaff: ${staffType}\nWork Type: ${workType}\nArea: ${resolvedArea}\nStart: ${startDate}\nNotes: ${notes || 'None'}`;
        const fallbackUrl = `https://wa.me/${BUSINESS_DETAILS.whatsappIntl}?text=${encodeURIComponent(messageText)}`;

        setSubmittedResult({
          referenceId: refId,
          whatsappUrl: fallbackUrl,
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      const refId = `HDSP-KHI-${Math.floor(1000 + Math.random() * 9000)}`;
      const messageText = `*HDSP Booking Request*\nRef: ${refId}\nName: ${name}\nPhone: ${phone}\nStaff: ${staffType}\nWork Type: ${workType}\nArea: ${resolvedArea}\nNotes: ${notes}`;
      const fallbackUrl = `https://wa.me/${BUSINESS_DETAILS.whatsappIntl}?text=${encodeURIComponent(messageText)}`;

      setSubmittedResult({
        referenceId: refId,
        whatsappUrl: fallbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedResult(null);
    setName('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                Verified Domestic Placement
              </span>
              <span className="text-xs text-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                3 Guarantors Verified
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {submittedResult ? 'Booking Request Registered' : 'Hire Verified Domestic Staff'}
            </h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              HDSP Karachi • Fast shortlisting within 24 hours
            </p>
          </div>
          <button
            onClick={resetForm}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedResult ? (
          <div className="p-6 space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 text-base">Booking Ingested Successfully!</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Your reference ID is <strong className="font-mono text-emerald-950 font-bold">{submittedResult.referenceId}</strong>.
                  Our HR coordinator in Defence Mall is preparing candidate dossiers that match your criteria.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 pb-1 border-b border-slate-200">
                Summary of Request
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500">Client Name:</span>
                  <p className="font-semibold text-slate-800">{name}</p>
                </div>
                <div>
                  <span className="text-slate-500">Contact Number:</span>
                  <p className="font-semibold text-slate-800">{phone}</p>
                </div>
                <div>
                  <span className="text-slate-500">Staff Required:</span>
                  <p className="font-semibold text-slate-800">{staffType}</p>
                </div>
                <div>
                  <span className="text-slate-500">Work Type:</span>
                  <p className="font-semibold text-slate-800">{workType}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500">Karachi Location:</span>
                  <p className="font-semibold text-slate-800">{area === 'Other Karachi Area' ? customArea : area}</p>
                </div>
              </div>
            </div>

            {/* Step to finalize */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-amber-700" />
                Final Step to Dispatch Candidates:
              </p>
              <p className="text-[11px] text-amber-800">
                To receive candidate CVs, CNIC copies, and guarantor records immediately on your phone, click below to launch WhatsApp with our hiring coordinator.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <a
                href={submittedResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Finalize via WhatsApp (0303 2632605)
              </a>

              <a
                href={`tel:${BUSINESS_DETAILS.phoneRaw}`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                Call HDSP Office: {BUSINESS_DETAILS.phone}
              </a>
            </div>

            <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <p className="flex items-center justify-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                {BUSINESS_DETAILS.address}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* 1. Staff Needed */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                1. Staff Category Needed *
              </label>
              <select
                value={staffType}
                onChange={(e) => setStaffType(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
              >
                {SERVICES_LIST.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title} ({s.urduTitle})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Work Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                2. Work Arrangement / Shift *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Live-In (24/7)', label: 'Live-In (24/7)' },
                  { id: 'Full-Time (8-10h)', label: 'Full-Time' },
                  { id: 'Part-Time', label: 'Part-Time' },
                  { id: 'Urgent / Same-Day', label: 'Urgent (24h)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setWorkType(item.id)}
                    className={`py-2 px-2.5 text-xs rounded-xl border text-center font-medium transition ${
                      workType === item.id
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Location in Karachi */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                3. Preferred Location in Karachi *
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
              >
                {KARACHI_AREAS.map((a, idx) => (
                  <option key={idx} value={a.name}>
                    {a.name} ({a.zone})
                  </option>
                ))}
                <option value="Other Karachi Area">Other Karachi Area (Specify below)</option>
              </select>

              {area === 'Other Karachi Area' && (
                <input
                  type="text"
                  placeholder="Enter your Karachi neighborhood / sector..."
                  value={customArea}
                  onChange={(e) => setCustomArea(e.target.value)}
                  className="mt-2 w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              )}
            </div>

            {/* 4. Client Details (Full Name & WhatsApp Number) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Siddiqui"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  WhatsApp / Phone *
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* 5. Specific Requirements & Start Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Specific Requirements / Duties (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Family of 5 in DHA, must know Sindhi/Pakistani cooking, female maid preferred, Sunday off."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
              />
            </div>

            {/* Timing */}
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>When do you need staff?</span>
              <select
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="ml-auto bg-white border border-slate-300 rounded-lg text-xs px-2 py-1 text-slate-700 focus:outline-none"
              >
                <option value="Urgent / Immediately (Within 24 Hours)">Urgent / Today or Tomorrow</option>
                <option value="Within 3 to 5 Days">Within 3 to 5 Days</option>
                <option value="Next Week / 1st of Month">Next Week / 1st of Month</option>
              </select>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !phone.trim()}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Shortlist Request...</span>
                ) : (
                  <>
                    <span>Submit & Connect with Coordinator</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Free Consultation
              </span>
              <span>Direct WhatsApp: 0303 2632605</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
