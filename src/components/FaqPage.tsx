import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Building,
  CheckCircle2
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'verification' | 'salaries' | 'process' | 'replacement';
  question: string;
  urduQuestion: string;
  answer: string;
  urduAnswer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    category: 'process',
    question: 'How fast can HDSP provide a house maid or cook in Karachi?',
    urduQuestion: 'کراچی میں گھریلو ملازمہ یا کک کتنی جلدی مل سکتا ہے؟',
    answer: 'For major areas like DHA, Clifton, Gulshan, and PECHS, we shortlist and arrange candidate interviews within 24 to 48 hours. If you have an urgent requirement, same-day placements can also be coordinated upon request.',
    urduAnswer: 'ڈیفنس، کلفٹن، گلشن اور پی ای سی ایچ ایس میں ہم 24 سے 48 گھنٹے کے اندر امیدواروں کے انٹرویو کروا دیتے ہیں۔ ایمرجنسی میں اسی دن بھی بندوبست ممکن ہے۔',
  },
  {
    id: 'f2',
    category: 'verification',
    question: 'What background verification is performed before a candidate is sent to my home?',
    urduQuestion: 'امیدوار کو گھر بھیجنے سے پہلے کیا تصدیق کی جاتی ہے؟',
    answer: 'Every candidate goes through HDSP’s 5-step screening process: (1) Mandatory original NADRA CNIC biometric inspection and home address check, (2) Sindh Police station verification and CPLC record clearance, (3) Minimum of 3 registered local guarantors with signed legal affidavits, and (4) In-person HR interview at our Defence Mall office.',
    urduAnswer: 'ہر امیدوار کا نادرا شناختی کارڈ بائیو میٹرک چیک، سندھ پولیس و سی پی ایل سی کرمنل کلیئرنس، کم از کم 3 مقامی ضامنوں کے بیان حلفی اور دفتر میں تفصیلی انٹرویو لیا جاتا ہے۔',
  },
  {
    id: 'f3',
    category: 'verification',
    question: 'Who are the 3 guarantors, and what documents do you hold from them?',
    urduQuestion: '3 ضامن کون ہوتے ہیں اور ان کے کون سے دستاویزات آپ کے پاس ہوتے ہیں؟',
    answer: 'Every candidate must present three credible local Karachi guarantors (family members, respected community members, or shopkeepers/employers). HDSP collects signed legal guarantor affidavits, verified CNIC copies, active phone numbers, and physical residential verification.',
    urduAnswer: 'امیدوار کے تینوں ضامنوں کے شناختی کارڈ کی کاپیاں، دستخط شدہ قانونی بیان حلفی اور موبائل نمبرز ہماری فائل میں محفوظ ہوتے ہیں جس کی کاپی گاہک کو دی جاتی ہے۔',
  },
  {
    id: 'f4',
    category: 'replacement',
    question: 'What is HDSP’s replacement policy if the staff member is not a good fit?',
    urduQuestion: 'اگر ملازم کام پر پورا نہ اترے تو تبدیلی کی کیا پالیسی ہے؟',
    answer: 'HDSP provides a 100% Hassle-Free Replacement Guarantee. If the candidate discontinues or fails to meet your household standards within the agreed contract period, our recruitment desk will provide a prompt replacement without delay.',
    urduAnswer: 'ایچ ڈی ایس پی متبادل ملازم کی مکمل گارنٹی دیتا ہے۔ اگر ملازم غیر تسلی بخش ہو تو ہم معاہدے کی مدت کے اندر بلا معاوضہ فوری دوسرا امیدوار دیتے ہیں۔',
  },
  {
    id: 'f5',
    category: 'salaries',
    question: 'What are the customary salary ranges for domestic staff in Karachi?',
    urduQuestion: 'کراچی میں گھریلو عملے کی اوسط تنخواہیں کیا ہیں؟',
    answer: 'Salaries vary based on shift and experience: Live-In Maids (Rs. 25,000 – 40,000/mo), Full-Time Cooks (Rs. 32,000 – 50,000/mo), Family Drivers (Rs. 30,000 – 48,000/mo), Babysitters (Rs. 30,000 – 45,000/mo), and Patient Attendants (Rs. 40,000 – 65,000/mo).',
    urduAnswer: 'لائیو ان ماسی 25 سے 40 ہزار، کک 32 سے 50 ہزار، فیملی ڈرائیور 30 سے 48 ہزار، اور پیشنٹ اٹینڈنٹ 40 سے 65 ہزار کے درمیان ہوتے ہیں۔',
  },
  {
    id: 'f6',
    category: 'salaries',
    question: 'What living and meal provisions are expected for live-in staff?',
    urduQuestion: '24 گھنٹے (لائیو ان) عملے کو کیا سہولیات دینا ضروری ہیں؟',
    answer: 'For 24/7 residential staff, the employer provides safe, private sleeping quarters, clean washroom access, 3 daily meals, and 2 to 4 days off per month as mutually agreed upon in the placement agreement.',
    urduAnswer: 'لائیو ان ملازم کے لیے رہائش، تین وقت کا کھانا، اور مہینے میں 2 سے 4 چھٹیاں دی جاتی ہیں جو معاہدے میں طے ہوتی ہیں۔',
  },
  {
    id: 'f7',
    category: 'process',
    question: 'Can I interview candidates in person at your Karachi office?',
    urduQuestion: 'کیا ہم آپ کے دفتر آ کر امیدواروں سے مل سکتے ہیں؟',
    answer: 'Yes, absolutely. We welcome all clients to visit Office UF-61, Defence Mall, DHA Phase 1, Karachi from Monday to Saturday (9:00 AM to 9:00 PM) for comfortable face-to-face interviews. WhatsApp video interviews are also available.',
    urduAnswer: 'جی ہاں، آپ ہمارے دفتر (آفس UF-61، ڈیفنس مال، ڈی ایچ اے فیز 1، کراچی) آ کر اطمینان سے انٹرویو کر سکتے ہیں یا واٹس ایپ ویڈیو کال پر بھی بات کر سکتے ہیں۔',
  },
  {
    id: 'f8',
    category: 'salaries',
    question: 'Are there extra charges for drivers working overtime?',
    urduQuestion: 'اگر ڈرائیور سے اضافی وقت کام لیں تو کیا اوور ٹائم دینا ہوتا ہے؟',
    answer: 'Yes, if a full-time driver is required past their standard 10–12 hour shift, customary overtime in Karachi is Rs. 100 to Rs. 150 per hour, along with a dinner allowance if retained past 9:00 PM.',
    urduAnswer: 'جی ہاں، 12 گھنٹے سے زیادہ وقت کے لیے عام طور پر 100 سے 150 روپے فی گھنٹہ اوور ٹائم یا رات کے کھانے کا الاؤنس دیا جاتا ہے۔',
  },
  {
    id: 'f9',
    category: 'process',
    question: 'Can I have a trial session with a cook or maid before signing?',
    urduQuestion: 'کیا مستقل رکھنے سے پہلے ایک دن کا ٹرائل ممکن ہے؟',
    answer: 'Yes. We can coordinate a trial cooking meal or day trial at your home to evaluate cooking quality, punctuality, and personal cleanliness prior to final placement.',
    urduAnswer: 'جی ہاں، کک کے کھانے کا ذائقہ یا ماسی کے کام کا معیار دیکھنے کے لیے ایک وقت کا ٹرائل کروایا جا سکتا ہے۔',
  },
  {
    id: 'f10',
    category: 'verification',
    question: 'Are health and medical checks conducted for cooks and infant nannies?',
    urduQuestion: 'کیا باورچی اور آیا کا میڈیکل ٹیسٹ ہوتا ہے؟',
    answer: 'Yes. For food handlers (cooks) and caregivers (nannies & patient attendants), HDSP prioritizes medical screening to ensure freedom from communicable conditions.',
    urduAnswer: 'جی ہاں، کک اور بچوں کی آیا کے لیے بنیادی صحت اور صفائی کی جانچ کو خاص اہمیت دی جاتی ہے۔',
  },
];

interface FaqPageProps {
  onBookStaff: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onBookStaff }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verification' | 'salaries' | 'process' | 'replacement'>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ f1: true, f2: true });

  const phoneIntl = '923032632605';

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      item.question.toLowerCase().includes(term) ||
      item.answer.toLowerCase().includes(term) ||
      item.urduQuestion.includes(term);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Official Help & Support Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Everything you need to know about domestic staff verification, 3 guarantors, Karachi salary guides, and replacement warranties.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs mb-6 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Search questions (e.g., salary, guarantors, trial, police, driver)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-slate-600 mr-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All FAQs (10)' },
            { id: 'verification', label: 'Verification & 3 Guarantors' },
            { id: 'salaries', label: 'Salaries & Shift Norms' },
            { id: 'replacement', label: 'Replacement Policy' },
            { id: 'process', label: 'Hiring Process & Office' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedFilter(btn.id as any)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                selectedFilter === btn.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3.5 mb-10">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
                  >
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold ${isOpen ? 'text-emerald-900' : 'text-slate-900'}`}>
                        {faq.question}
                      </h3>
                      <p className="text-xs text-emerald-700 font-semibold mt-0.5 urdu-font text-right">
                        {faq.urduQuestion}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                      <p>{faq.answer}</p>
                      <p className="text-slate-700 font-medium urdu-font text-right pt-1 border-t border-slate-50">
                        {faq.urduAnswer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
              No matching questions found for "{searchTerm}". Please call or WhatsApp us at 0303 2632605.
            </div>
          )}
        </div>

        {/* Need personalized help callout */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Still Have a Question?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Speak Directly with an HDSP Recruitment Officer
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              We provide free guidance regarding domestic contracts, salary expectations, and candidate availability in Karachi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${phoneIntl}?text=${encodeURIComponent('Assalam o Alaikum HDSP, I have a question regarding domestic staff hiring in Karachi.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-emerald-50 text-emerald-900 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp: 0303 2632605</span>
            </a>

            <button
              onClick={onBookStaff}
              className="bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/50 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition cursor-pointer"
            >
              Book Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
