import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MessageCircle,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  User,
  Send,
  Calendar,
  Building,
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  FileCheck,
  Home as HomeIcon,
  Grid,
  Map,
  HelpCircle,
  Phone,
  Eye,
  Search
} from 'lucide-react';
import { HdspChatAssistant } from './components/HdspChatAssistant';
import { CategoryDetailPage, DETAILED_CATEGORIES } from './components/CategoryDetailPage';
import { FaqPage } from './components/FaqPage';
import { CategoryCarousel } from './components/CategoryCarousel';
import { categoryImages } from './assets/images/index';

export type PageTab = 'home' | 'categories' | 'verification' | 'areas' | 'faqs' | 'book' | 'assistant';

interface ServiceCategory {
  id: string;
  title: string;
  urdu: string;
  categoryGroup: 'domestic' | 'medical' | 'commercial';
  timing: string;
  salary: string;
  desc: string;
  duties: string[];
  image: string;
  tag: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageTab>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'domestic' | 'medical' | 'commercial'>('all');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    staffType: 'House Maid (Masi)',
    workType: 'Live-In (24/7)',
    area: 'DHA Phase 1-8',
    notes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const phoneDisplay = '0303 2632605';
  const phoneIntl = '923032632605';
  const officeAddress = 'Office UF-61, Defence Mall, DHA Phase 1, Karachi';

  // Scroll to top on page or category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedCategoryId]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const text = `*New Hiring Request - HDSP Karachi*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Phone / WhatsApp:* ${formData.phone}\n` +
      `*Staff Needed:* ${formData.staffType}\n` +
      `*Work Type:* ${formData.workType}\n` +
      `*Location in Karachi:* ${formData.area}\n` +
      `*Special Requirements:* ${formData.notes || 'None'}\n\n` +
      `Assalam o Alaikum, please share verified candidate profiles for this requirement.`;

    const waUrl = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(text)}`;
    setFormSubmitted(true);
    window.open(waUrl, '_blank');
  };

  const services: ServiceCategory[] = [
    {
      id: 'maid',
      title: 'House Maid (Masi)',
      urdu: 'گھریلو ملازمہ / ماسی',
      categoryGroup: 'domestic',
      timing: 'Live-In (24/7) or Full-Time',
      salary: 'Rs. 25,000 – 40,000 / mo',
      desc: 'Trained, verified domestic maids for thorough dusting, mopping, laundry, utensil washing, and daily home upkeep.',
      duties: ['Daily dusting, floor broom & wet mopping', 'Dishwashing and kitchen counter sanitation', 'Washing, drying & folding clothes', 'Bathroom deep cleaning'],
      image: categoryImages.maid,
      tag: 'Most Requested',
    },
    {
      id: 'cook',
      title: 'Cook & Home Chef',
      urdu: 'باورچی / کک',
      categoryGroup: 'domestic',
      timing: 'Live-In, Full-Time or Part-Time',
      salary: 'Rs. 32,000 – 55,000 / mo',
      desc: 'Skilled cooks for hygienic, delicious Pakistani dishes (Biryani, Qorma, Karahi, Roti/Paratha), Chinese, and special diet meals.',
      duties: ['Fresh breakfast, lunch and dinner preparation', 'Grocery inventory & pantry management', 'Hygienic kitchen upkeep & food storage', 'Diabetic, low-sodium & children meals'],
      image: categoryImages.cook,
      tag: 'Family Favorite',
    },
    {
      id: 'driver',
      title: 'Family & Executive Driver',
      urdu: 'فیملی ڈرائیور',
      categoryGroup: 'domestic',
      timing: 'Full-Time (10–12 Hours)',
      salary: 'Rs. 30,000 – 48,000 / mo',
      desc: 'Punctual, polite chauffeurs for school pickup/drop, office commutes, grocery runs, and city errands.',
      duties: ['Safe defensive driving in Karachi traffic', 'Punctual school, college & office commutes', 'Vehicle fluid check, tire pressure & car wash', 'Verified driving license with clean traffic record'],
      image: categoryImages.driver,
      tag: 'Verified License',
    },
    {
      id: 'patient',
      title: 'Patient Attendant & Home Nurse',
      urdu: 'مریض کی دیکھ بھال / ہوم نرس',
      categoryGroup: 'medical',
      timing: '12h Day / 12h Night / 24h Live-In',
      salary: 'Rs. 40,000 – 65,000 / mo',
      desc: 'Qualified male & female attendants for bedridden patients, stroke, paralysis, post-surgery care, and vitals monitoring.',
      duties: ['Vital signs tracking (BP, Sugar, Pulse, SpO2)', 'Timely medication as prescribed by doctor', 'Bed sore prevention, diaper changing & sponge bath', 'Wheelchair transfer, mobility & feeding aid'],
      image: categoryImages.patient,
      tag: 'Medical Support',
    },
    {
      id: 'nanny',
      title: 'Babysitter & Infant Nanny',
      urdu: 'بے بی سٹر / آیا',
      categoryGroup: 'domestic',
      timing: 'Live-In or Day Shift',
      salary: 'Rs. 30,000 – 45,000 / mo',
      desc: 'Warm, patient, and hygienic female caregivers for newborns, toddlers, and young children.',
      duties: ['Feeding, formula milk preparation & sterilization', 'Diapering, sponge bath, dressing & grooming', 'Educational indoor playtime & nap supervision', 'Active safety monitoring around the home'],
      image: categoryImages.nanny,
      tag: 'Child Care',
    },
    {
      id: 'elderly',
      title: 'Elderly Caregiver & Companion',
      urdu: 'بزرگوں کی دیکھ بھال',
      categoryGroup: 'medical',
      timing: 'Live-In or Full-Time',
      salary: 'Rs. 35,000 – 55,000 / mo',
      desc: 'Respectful, gentle caregivers providing companionship, walking assistance, and daily medication reminders for seniors.',
      duties: ['Assisting with walking, transfers & bathroom', 'Accompanying to park strolls and clinic visits', 'Friendly companionship & conversation', 'Hydration and timely medicine schedule'],
      image: categoryImages.elderly,
      tag: 'Senior Care',
    },
    {
      id: 'security',
      title: 'Home Security Guard / Watchman',
      urdu: 'سیکیورٹی گارڈ / چوکیدار',
      categoryGroup: 'domestic',
      timing: '12-Hour Shift or 24-Hour',
      salary: 'Rs. 30,000 – 45,000 / mo',
      desc: 'Alert, physically fit security guards for bungalows, apartments, gated compounds, and private residences.',
      duties: ['Main gate control & visitor identity check', 'Vehicle logging and delivery supervision', 'Perimeter patrolling & CCTV monitoring', 'Emergency alert & vigilant presence'],
      image: categoryImages.security,
      tag: 'Security Alert',
    },
    {
      id: 'office',
      title: 'Office Boy & Janitor',
      urdu: 'آفس بوائے و صفائی عملہ',
      categoryGroup: 'commercial',
      timing: 'Full-Time Business Hours',
      salary: 'Rs. 28,000 – 38,000 / mo',
      desc: 'Reliable office boys for corporate offices, clinics, law firms, and commercial establishments in Karachi.',
      duties: ['Serving tea, water & refreshments to staff and guests', 'Daily office dusting, vacuuming & trash disposal', 'Restroom cleaning and hygiene upkeep', 'Filing, photocopies, bank & outdoor errands'],
      image: categoryImages.office,
      tag: 'Commercial',
    },
  ];

  const verificationPoints = [
    {
      step: '1',
      title: 'CNIC & NADRA Biometric Verification',
      desc: 'Original National ID card check with NADRA biometric records, ensuring verified legal identity and permanent residential address.',
    },
    {
      step: '2',
      title: 'Sindh Police Clearance & CPLC Checks',
      desc: 'Background screening with Karachi Police station records and Citizens-Police Liaison Committee (CPLC) databases for a clean record.',
    },
    {
      step: '3',
      title: 'Minimum 3 Registered Local Guarantors',
      desc: 'Every applicant provides 3 credible local guarantors with valid CNIC copies, active phone numbers, and signed liability affidavits.',
    },
    {
      step: '4',
      title: 'In-Person HR Interview & Assessment',
      desc: 'Face-to-face evaluation of personal demeanor, communication, domestic skills, and cleanliness conducted at our Defence Mall office.',
    },
    {
      step: '5',
      title: '100% Replacement Warranty',
      desc: 'Prompt, hassle-free replacement if hired staff does not meet your household expectations within the agreed contract duration.',
    },
  ];

  const areas = [
    { name: 'DHA (Phases 1 to 8 & Extension)', dispatch: 'Within 2–4 Hours', tag: 'High Priority' },
    { name: 'Clifton (Blocks 1 to 9 & Sea View)', dispatch: 'Within 2–4 Hours', tag: 'High Priority' },
    { name: 'PECHS & Tariq Road Vicinity', dispatch: 'Within 3–5 Hours', tag: 'Fast Dispatch' },
    { name: 'Gulshan-e-Iqbal (Blocks 1 to 19)', dispatch: 'Within 3–5 Hours', tag: 'Fast Dispatch' },
    { name: 'Gulistan-e-Johar (Blocks 1 to 20)', dispatch: 'Within 4–6 Hours', tag: 'Available' },
    { name: 'North Nazimabad & FB Area', dispatch: 'Within 4–6 Hours', tag: 'Available' },
    { name: 'Bahria Town Karachi (All Precincts)', dispatch: 'Same Day / 24 Hours', tag: 'Gated Community' },
    { name: 'Scheme 33 & Saadi Town', dispatch: 'Within 4–6 Hours', tag: 'Available' },
    { name: 'Malir Cantt & Askari 4 & 5', dispatch: 'Within 3–5 Hours', tag: 'Fast Dispatch' },
    { name: 'Korangi & Defence View', dispatch: 'Within 4–6 Hours', tag: 'Available' },
  ];

  const handleHireClick = (categoryTitle: string) => {
    setFormData((prev) => ({ ...prev, staffType: categoryTitle }));
    setSelectedCategoryId(null);
    setCurrentPage('book');
  };

  const openCategoryDetailPage = (catId: string) => {
    setSelectedCategoryId(catId);
    setCurrentPage('categories');
  };

  const filteredServices =
    categoryFilter === 'all'
      ? services
      : services.filter((s) => s.categoryGroup === categoryFilter);

  const switchPage = (page: PageTab) => {
    setCurrentPage(page);
    setSelectedCategoryId(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      {/* Top Header Bar */}
      <div>
        <div className="bg-emerald-950 text-white text-xs py-2 px-4 border-b border-emerald-900">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-700 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Karachi
              </span>
              <span className="font-medium">HDSP: Home Domestic Service Provider • 100% Verified Domestic Staff</span>
            </div>
            <div className="flex items-center gap-4 font-bold text-xs">
              <a href="tel:03032632605" className="text-emerald-300 hover:text-white flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>0303 2632605</span>
              </a>
              <span className="text-emerald-800">|</span>
              <a
                href={`https://wa.me/${phoneIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-white flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: 0303 2632605</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Brand */}
            <button
              onClick={() => switchPage('home')}
              className="flex items-center gap-2.5 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
                H
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">HDSP</span>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Karachi Domestic Staffing
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-700">
              <button
                onClick={() => switchPage('home')}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentPage === 'home'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              <button
                onClick={() => switchPage('categories')}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentPage === 'categories'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Categories</span>
              </button>

              <button
                onClick={() => switchPage('verification')}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentPage === 'verification'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verification</span>
              </button>

              <button
                onClick={() => switchPage('areas')}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentPage === 'areas'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Karachi Areas</span>
              </button>

              <button
                onClick={() => switchPage('faqs')}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentPage === 'faqs'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>FAQs</span>
              </button>

              <button
                onClick={() => switchPage('assistant')}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  currentPage === 'assistant'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Assistant</span>
              </button>

              <button
                onClick={() => switchPage('book')}
                className={`ml-1.5 px-4 py-2 rounded-xl text-white font-bold transition shadow-xs cursor-pointer ${
                  currentPage === 'book'
                    ? 'bg-emerald-900 hover:bg-emerald-950'
                    : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                Book Staff
              </button>
            </nav>

            {/* Mobile Hamburger Trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => switchPage('book')}
                className="bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1.5 text-sm font-semibold text-slate-800">
              <button
                onClick={() => switchPage('home')}
                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2 ${
                  currentPage === 'home' ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                }`}
              >
                <HomeIcon className="w-4 h-4 text-emerald-700" />
                <span>Home Page</span>
              </button>

              <button
                onClick={() => switchPage('categories')}
                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2 ${
                  currentPage === 'categories' ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                }`}
              >
                <Grid className="w-4 h-4 text-emerald-700" />
                <span>Categories & Detailed Pages</span>
              </button>

              <button
                onClick={() => switchPage('verification')}
                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2 ${
                  currentPage === 'verification' ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verification Standards (3 Guarantors)</span>
              </button>

              <button
                onClick={() => switchPage('areas')}
                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2 ${
                  currentPage === 'areas' ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                }`}
              >
                <Map className="w-4 h-4 text-emerald-700" />
                <span>Karachi Locations Covered</span>
              </button>

              <button
                onClick={() => switchPage('faqs')}
                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2 ${
                  currentPage === 'faqs' ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                }`}
              >
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Frequently Asked Questions (FAQs)</span>
              </button>

              <button
                onClick={() => switchPage('assistant')}
                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2 ${
                  currentPage === 'assistant' ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                }`}
              >
                <Bot className="w-4 h-4 text-emerald-700" />
                <span>Ask HDSP Assistant (AI)</span>
              </button>

              <button
                onClick={() => switchPage('book')}
                className="w-full text-center bg-emerald-700 text-white font-bold py-2.5 rounded-xl mt-2 block"
              >
                Book Staff Online (WhatsApp)
              </button>
            </div>
          )}
        </header>

        {/* Main Content Render by Page */}
        <main>
          {/* ================= PAGE 1: HOME ================= */}
          {currentPage === 'home' && (
            <div>
              {/* Home Page Heading Banner */}
              <section className="bg-gradient-to-b from-white to-emerald-50/50 py-12 md:py-16 border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Premier Karachi Domestic Staff Agency</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Hire 100% Verified Domestic Staff in Karachi
                  </h1>

                  <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    House Maids (Masi), Experienced Cooks, Family Drivers, Babysitters, and Patient Attendants. Screened with <strong className="text-slate-800">Sindh Police Clearance</strong>, <strong className="text-slate-800">NADRA CNIC</strong>, and <strong className="text-slate-800">3 Local Guarantors</strong>.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs text-slate-700">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{officeAddress}</span>
                    </div>
                    <a
                      href="tel:03032632605"
                      className="flex items-center gap-1.5 bg-emerald-800 text-white px-4 py-2 rounded-xl shadow-2xs font-bold hover:bg-emerald-900 transition"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>0303 2632605</span>
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => switchPage('book')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>Book Domestic Staff</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => switchPage('categories')}
                      className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold py-3 px-6 rounded-xl text-sm shadow-2xs transition flex items-center gap-2 cursor-pointer"
                    >
                      <Grid className="w-4 h-4 text-emerald-700" />
                      <span>Explore Category Pages</span>
                    </button>

                    <button
                      onClick={() => switchPage('faqs')}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold py-3 px-5 rounded-xl text-sm shadow-2xs transition flex items-center gap-2 cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-emerald-700" />
                      <span>View FAQs</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Direct Quick Category Links */}
              <section className="py-6 bg-emerald-900 text-white text-xs">
                <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="font-bold text-emerald-300 mr-2 uppercase tracking-wider">
                    Quick Category Pages:
                  </span>
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => openCategoryDetailPage(s.id)}
                      className="bg-emerald-800/80 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg border border-emerald-700 transition cursor-pointer"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </section>

              {/* All Categories Carousel Section */}
              <section className="py-14 bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4">
                  <CategoryCarousel
                    services={services}
                    onViewDetails={openCategoryDetailPage}
                    onHire={handleHireClick}
                  />
                </div>
              </section>

              {/* 3 Steps to Hire */}
              <section className="py-12 bg-slate-50 border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">
                    Simple 3-Step Hiring Process
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold flex items-center justify-center text-sm mb-3">
                        1
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">Share Requirements</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Specify maid, cook, driver or attendant needed, timing (Live-In or Day), and your Karachi area.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold flex items-center justify-center text-sm mb-3">
                        2
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">Candidate Profiles & Interview</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        We send vetted CVs with CNIC checks and arrange face-to-face interviews at your home or our Defence Mall office.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold flex items-center justify-center text-sm mb-3">
                        3
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">Guarantors & Placement</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Candidate is deployed with police clearance, 3 guarantor forms, and our free replacement guarantee.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => switchPage('book')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition cursor-pointer"
                    >
                      Start Hiring Request Now
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ================= PAGE 2: CATEGORIES (GRID OR DETAIL PAGE) ================= */}
          {currentPage === 'categories' && (
            <div>
              {selectedCategoryId ? (
                <CategoryDetailPage
                  categoryId={selectedCategoryId}
                  onBack={() => setSelectedCategoryId(null)}
                  onBookNow={handleHireClick}
                />
              ) : (
                <div className="py-12 bg-slate-50 min-h-[70vh]">
                  <div className="max-w-6xl mx-auto px-4">
                    {/* Categories Page Heading Banner */}
                    <div className="text-center max-w-2xl mx-auto mb-10">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                        Official Catalog & Individual Pages
                      </span>
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                        Staff Categories & Dedicated Details
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        Click on any category to view its dedicated page with comprehensive job duties, shift timings, verified candidate photos, and transparent Karachi salary packages.
                      </p>

                      {/* Category Filter Pills */}
                      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                        {[
                          { id: 'all', label: 'All Roles (8)' },
                          { id: 'domestic', label: 'Domestic Staff' },
                          { id: 'medical', label: 'Patient & Senior Care' },
                          { id: 'commercial', label: 'Commercial' },
                        ].map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setCategoryFilter(f.id as any)}
                            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                              categoryFilter === f.id
                                ? 'bg-emerald-800 text-white shadow-xs'
                                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredServices.map((s) => (
                        <div
                          key={s.id}
                          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                        >
                          <div>
                            {/* Photo clicking opens detail page */}
                            <div
                              onClick={() => openCategoryDetailPage(s.id)}
                              className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 cursor-pointer"
                            >
                              <img
                                src={s.image}
                                alt={s.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                              <div className="absolute top-2.5 right-2.5 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                                {s.tag}
                              </div>
                            </div>

                            <div className="p-4">
                              <h3
                                onClick={() => openCategoryDetailPage(s.id)}
                                className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition cursor-pointer"
                              >
                                {s.title}
                              </h3>
                              <p className="text-xs text-emerald-700 font-semibold mb-2">{s.urdu}</p>
                              <p className="text-xs text-slate-600 leading-relaxed mb-3">{s.desc}</p>
                            </div>
                          </div>

                          <div className="p-4 pt-0">
                            <div className="pt-3 border-t border-slate-100 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-medium">Estimated:</span>
                                <span className="font-bold text-emerald-800">{s.salary}</span>
                              </div>
                              <div className="text-[11px] text-slate-500">{s.timing}</div>

                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <button
                                  onClick={() => openCategoryDetailPage(s.id)}
                                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                                  <span>View Page</span>
                                </button>
                                <button
                                  onClick={() => handleHireClick(s.title)}
                                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer shadow-xs"
                                >
                                  <span>Hire</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= PAGE 3: VERIFICATION ================= */}
          {currentPage === 'verification' && (
            <div className="py-12 bg-white min-h-[70vh]">
              <div className="max-w-4xl mx-auto px-4">
                {/* Verification Page Heading Banner */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Safety, Security & Peace of Mind
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    5-Step Candidate Verification Protocol
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Your family and home's security is our highest priority. Here is how HDSP inspects original CNICs, conducts police checks, and verifies 3 local guarantors before placement.
                  </p>
                </div>

                <div className="space-y-4">
                  {verificationPoints.map((p) => (
                    <div
                      key={p.step}
                      className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center justify-center shrink-0 text-base shadow-xs">
                        {p.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* What You Receive Dossier */}
                <div className="mt-8 bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck className="w-5 h-5 text-emerald-700" />
                    <h3 className="font-bold text-slate-900 text-base">Employer Legal Dossier Provided to You</h3>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">
                    Upon candidate hiring, you receive a complete verified physical and digital record folder:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-800">
                    <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Original CNIC photocopy & NADRA verification report</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sindh Police station clearance & CPLC record slip</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>3 Guarantor signed affidavits with CNIC copies</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Official HDSP replacement agreement & warranty</span>
                    </div>
                  </div>
                </div>

                {/* Replacement Warranty Card */}
                <div className="mt-8 bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <h3 className="font-bold text-base text-emerald-300">Replacement Guarantee Policy</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      If staff leaves or does not suit your household, HDSP coordinates an immediate replacement candidate without hassle.
                    </p>
                  </div>
                  <button
                    onClick={() => switchPage('book')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs shrink-0 cursor-pointer"
                  >
                    Hire with Warranty
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 4: KARACHI AREAS ================= */}
          {currentPage === 'areas' && (
            <div className="py-12 bg-slate-50 min-h-[70vh]">
              <div className="max-w-4xl mx-auto px-4">
                {/* Karachi Areas Heading Banner */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    City-Wide Karachi Coverage
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                    Karachi Locations Covered & Fast Dispatch
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    We deploy pre-screened domestic helpers across all major residential sectors with prompt candidate interviews and trial sessions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {areas.map((a, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-2xs hover:border-emerald-400 transition"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{a.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Interview setup: {a.dispatch}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {a.tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Office Box */}
                <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <Building className="w-4 h-4 text-emerald-700" />
                      <span>Visit HDSP Head Office for In-Person Interviews</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Address:</strong> {officeAddress}
                    </p>
                    <p className="text-xs text-slate-500">
                      Timings: Monday to Saturday (9:00 AM – 9:00 PM) • WhatsApp: 0303 2632605
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${phoneIntl}?text=${encodeURIComponent('Assalam o Alaikum, I would like to visit your Defence Mall office for candidate interviews.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs shrink-0 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Schedule Office Visit</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 5: FAQS PAGE ================= */}
          {currentPage === 'faqs' && (
            <FaqPage onBookStaff={() => switchPage('book')} />
          )}

          {/* ================= PAGE 6: BOOK STAFF ================= */}
          {currentPage === 'book' && (
            <div className="py-12 bg-white min-h-[70vh]">
              <div className="max-w-2xl mx-auto px-4">
                {/* Booking Page Heading Banner */}
                <div className="border-2 border-emerald-600/30 bg-emerald-50/20 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="text-center mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Hiring Intake Form
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                      Book Verified Domestic Staff in Karachi
                    </h1>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Share your requirements and we will send candidate CVs with 3 guarantors directly to your WhatsApp.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-emerald-100/70 border border-emerald-300 rounded-xl p-6 text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                      <h3 className="font-bold text-emerald-950 text-base">Request Prepared for WhatsApp!</h3>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Your hiring request is ready for HDSP coordinator at <strong>0303 2632605</strong>. Click below to initiate WhatsApp chat:
                      </p>
                      <div className="pt-2 flex flex-col gap-2">
                        <a
                          href={`https://wa.me/${phoneIntl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-sm inline-flex items-center justify-center gap-2 shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Open WhatsApp Chat (0303 2632605)</span>
                        </a>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="text-slate-600 text-xs hover:underline cursor-pointer"
                        >
                          Submit another requirement
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            1. Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Tariq Siddiqui"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            2. WhatsApp / Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 0300 1234567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            3. Staff Needed *
                          </label>
                          <select
                            value={formData.staffType}
                            onChange={(e) => setFormData({ ...formData, staffType: e.target.value })}
                            className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:border-emerald-600 focus:outline-none"
                          >
                            {services.map((s) => (
                              <option key={s.id} value={s.title}>
                                {s.title} ({s.urdu})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            4. Work Arrangement *
                          </label>
                          <select
                            value={formData.workType}
                            onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                            className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:border-emerald-600 focus:outline-none"
                          >
                            <option value="Live-In (24/7)">Live-In (24/7)</option>
                            <option value="Full-Time (8–10 Hours)">Full-Time (8–10 Hours)</option>
                            <option value="Part-Time (Morning or Evening)">Part-Time (Few hours)</option>
                            <option value="Urgent (Today / Tomorrow)">Urgent (Same-Day)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          5. Preferred Area in Karachi *
                        </label>
                        <select
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:border-emerald-600 focus:outline-none"
                        >
                          {areas.map((a, idx) => (
                            <option key={idx} value={a.name}>
                              {a.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          6. Specific Requirements or Duties (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="e.g. Need experienced Sindhi/Pakistani cook in Clifton, Sunday off, family of 4."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Request to WhatsApp (0303 2632605)</span>
                      </button>

                      <p className="text-center text-[11px] text-slate-500 pt-1">
                        Direct helpline: <strong>0303 2632605</strong> • Free consultation & candidate shortlisting
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 7: AI ASSISTANT ================= */}
          {currentPage === 'assistant' && (
            <div className="py-10 bg-slate-50 min-h-[75vh]">
              <div className="max-w-3xl mx-auto px-4">
                {/* AI Assistant Heading Banner */}
                <div className="text-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Official AI Representative
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                    Consult HDSP Assistant (English & Urdu)
                  </h1>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Ask any question in English, Urdu (اردو), or Roman Urdu regarding staff salaries, verification standards, or booking.
                  </p>
                </div>

                <HdspChatAssistant
                  className="w-full h-[600px] shadow-lg rounded-2xl"
                  onOpenBookingModal={(role) => {
                    if (role) setFormData((prev) => ({ ...prev, staffType: role }));
                    switchPage('book');
                  }}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Quick Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {currentPage !== 'assistant' && (
          <button
            onClick={() => switchPage('assistant')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3.5 rounded-full shadow-lg text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>Ask AI Assistant</span>
          </button>
        )}

        <a
          href={`https://wa.me/${phoneIntl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-full shadow-lg text-xs flex items-center gap-1.5 transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp: 0303 2632605</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <div className="font-bold text-white text-base">
            HDSP (Home Domestic Service Provider) Karachi
          </div>
          <p className="text-slate-400">
            Address: {officeAddress} • Phone / WhatsApp: <a href="tel:03032632605" className="text-white underline">0303 2632605</a>
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-slate-400 pt-1">
            <button onClick={() => switchPage('home')} className="hover:text-white cursor-pointer">Home</button>
            <span>•</span>
            <button onClick={() => switchPage('categories')} className="hover:text-white cursor-pointer">Categories</button>
            <span>•</span>
            <button onClick={() => switchPage('verification')} className="hover:text-white cursor-pointer">Verification</button>
            <span>•</span>
            <button onClick={() => switchPage('areas')} className="hover:text-white cursor-pointer">Karachi Areas</button>
            <span>•</span>
            <button onClick={() => switchPage('faqs')} className="hover:text-white cursor-pointer">FAQs</button>
            <span>•</span>
            <button onClick={() => switchPage('book')} className="hover:text-white cursor-pointer">Book Staff</button>
            <span>•</span>
            <button onClick={() => switchPage('assistant')} className="hover:text-white cursor-pointer">AI Assistant</button>
          </div>
          <p className="text-[11px] text-slate-600 pt-2 border-t border-slate-800">
            © {new Date().getFullYear()} HDSP Karachi. Verified domestic staffing & home care.
          </p>
        </div>
      </footer>
    </div>
  );
}
