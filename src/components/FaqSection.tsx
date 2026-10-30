import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, PhoneCall } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/hdspData';

interface FaqItem {
  q: string;
  urQ: string;
  a: string;
  urA: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How fast can HDSP provide a house maid or cook in Karachi?',
    urQ: 'کراچی میں گھریلو ملازمہ یا کک کتنی جلدی مل سکتا ہے؟',
    a: 'For major areas like DHA, Clifton, Gulshan, and PECHS, we typically shortlist and arrange candidate interviews within 24 to 48 hours. Urgent same-day placements are also available upon request.',
    urA: 'ڈیفنس، کلفٹن، گلشن اور پی ای سی ایچ ایس میں ہم 24 سے 48 گھنٹے کے اندر تصدیق شدہ امیدواروں کے انٹرویوز کروا دیتے ہیں۔ ارجنٹ ضرورت کی صورت میں اسی دن بھی بندوبست ممکن ہے۔',
  },
  {
    q: 'What verification documents will I receive as an employer?',
    urQ: 'بطور مالک مجھے ملازم کے کون سے تصدیقی دستاویزات ملیں گے؟',
    a: 'Every client receives a complete verification dossier containing: (1) Verified NADRA CNIC copy, (2) Sindh Police / CPLC clearance check, (3) Three signed local guarantor affidavits with valid CNIC copies & phone numbers, and (4) Official HDSP staffing agreement.',
    urA: 'ہر گاہک کو تصدیقی فائل دی جاتی ہے جس میں نادرا شناختی کارڈ، سندھ پولیس و سی پی ایل سی کلیئرنس، 3 مقامی ضامنوں کے بیان حلفی بمعہ شناختی کارڈ و فون نمبر، اور ایچ ڈی ایس پی کا معاہدہ شامل ہوتا ہے۔',
  },
  {
    q: 'What if the hired candidate does not meet our expectations?',
    urQ: 'اگر ملازم پسند نہ آئے یا کام صحیح نہ کرے تو کیا ہوگا؟',
    a: 'HDSP provides a 100% Hassle-Free Replacement Guarantee. If the candidate is not a good fit or discontinues within your contract period, our recruitment team provides a prompt replacement without delay.',
    urA: 'ایچ ڈی ایس پی متبادل کی مکمل گارنٹی دیتا ہے۔ اگر ملازم آپ کے گھر کے معیار پر پورا نہ اترے تو ہم فوری طور پر دوسرا تصدیق شدہ ملازم فراہم کرتے ہیں۔',
  },
  {
    q: 'Can I interview candidates in person at your Karachi office?',
    urQ: 'کیا ہم آپ کے دفتر آ کر امیدواروں کا انٹرویو لے سکتے ہیں؟',
    a: 'Yes, absolutely. We welcome clients to our air-conditioned recruitment center at Office UF-61, Defence Mall, DHA Phase 1, Karachi for face-to-face interviews. We can also arrange WhatsApp video calls if you prefer.',
    urA: 'جی بالکل، آپ ہمارے دفتر (آفس UF-61، ڈیفنس مال، ڈی ایچ اے فیز 1، کراچی) آ کر اطمینان سے انٹرویو کر سکتے ہیں، یا واٹس ایپ ویڈیو کال پر بھی بات کر سکتے ہیں۔',
  },
  {
    q: 'What are the customary arrangements for live-in staff in Karachi?',
    urQ: '24 گھنٹے (لائیو ان) عملے کے لیے کیا سہولیات دینا ضروری ہیں؟',
    a: 'For live-in staff (e.g. 24/7 maid, cook, patient attendant), the employer provides safe accommodation, daily meals, toiletries, and 2 to 4 days off per month as mutually agreed upon in the contract.',
    urA: 'لائیو ان عملے کے لیے رہائش، تین وقت کا کھانا، اور مہینے میں 2 سے 4 چھٹیاں دی جاتی ہیں جو معاہدے میں طے ہوتی ہیں۔',
  },
  {
    q: 'Are your family drivers verified for road safety & license validity?',
    urQ: 'کیا فیملی ڈرائیورز کا لائسنس اور ریکارڈ چیک ہوتا ہے؟',
    a: 'Yes. All family drivers undergo verification of their driving license (LTV/HTV) with Karachi traffic authorities, background police clearance, in-person test of route familiarity, and 3 guarantor checks.',
    urA: 'جی ہاں، ڈرائیورز کا ڈرائیونگ لائسنس ٹریفک پولیس کے ریکارڈ سے چیک ہوتا ہے، اور روٹس کی واقفیت و ڈرائیونگ ٹیسٹ کے بعد ہی بھیجا جاتا ہے۔',
  },
];

interface FaqSectionProps {
  onOpenBooking: () => void;
  lang: 'en' | 'ur';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking, lang }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ur' ? 'اکثر پوچھے جانے والے سوالات' : 'Everything You Need to Know'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {lang === 'ur'
              ? 'کراچی میں گھریلو عملہ رکھنے سے متعلق اہم معلومات'
              : 'Common questions about verification, contracts, replacement, and hiring through HDSP.'}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition"
                >
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-emerald-800' : 'text-slate-900'} ${lang === 'ur' ? 'urdu-font text-right' : ''}`}>
                    {lang === 'ur' ? faq.urQ : faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className={lang === 'ur' ? 'urdu-font text-right' : ''}>
                      {lang === 'ur' ? faq.urA : faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-emerald-950 text-sm">Have specific requirements or questions?</h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Call or WhatsApp our recruitment coordinator at {BUSINESS_DETAILS.phone}.
            </p>
          </div>
          <a
            href={`https://wa.me/${BUSINESS_DETAILS.whatsappIntl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
