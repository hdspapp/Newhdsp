import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Check,
  Calendar,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Building
} from 'lucide-react';
import { categoryImages } from '../assets/images/index';

export interface DetailedCategory {
  id: string;
  title: string;
  urdu: string;
  categoryGroup: 'domestic' | 'medical' | 'commercial';
  tag: string;
  image: string;
  summary: string;
  salaryRange: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  shifts: {
    name: string;
    hours: string;
    salary: string;
    details: string;
  }[];
  roleVerifications: string[];
  faq: { q: string; a: string }[];
}

export const DETAILED_CATEGORIES: Record<string, DetailedCategory> = {
  maid: {
    id: 'maid',
    title: 'House Maid & Cleaning Helper (Masi)',
    urdu: 'گھریلو ملازمہ / ماسی',
    categoryGroup: 'domestic',
    tag: 'Most Requested',
    image: categoryImages.maid,
    summary: 'Trustworthy, verified female domestic helpers for daily dusting, deep mopping, laundry washing, dish cleaning, and complete home hygiene in Karachi.',
    salaryRange: 'Rs. 25,000 – 40,000 / month',
    overview: 'At HDSP, our house maids (masis) are trained in thorough household sanitation, respect for privacy, and modern cleaning standards. Whether you need a 24/7 live-in maid in DHA or a morning shift helper in Gulshan, every candidate is thoroughly pre-screened with NADRA biometric CNIC verification, local police clearance, and three verified local guarantors before placement.',
    responsibilities: [
      'Daily dusting of all furniture, surfaces, glass frames, and decorative items',
      'Floor sweeping and wet mopping using disinfectant floor cleaners',
      'Kitchen sink dishwashing, counter cleaning, and kitchen cabinet wiping',
      'Operating washing machine, hand washing delicate garments, drying and folding',
      'Bathroom deep scrubbing, tile cleaning, mirror polish, and sanitizing toilets',
      'Bed making, changing bed linens, and organizing bedroom wardrobes',
      'Garbage collection, waste bin lining, and prompt disposal outside the premises',
    ],
    qualifications: [
      'Minimum 2 to 7 years verifiable domestic housekeeping experience',
      'Mandatory original NADRA CNIC with biometric verification on file',
      'Neat personal hygiene, polite demeanor, and respect for household rules',
      'Ability to follow specific household cleaning routines and detergent instructions',
      'Sindh Police clearance certificate and clean CPLC background record',
    ],
    shifts: [
      {
        name: 'Live-In (24/7 Residential)',
        hours: '24 Hours (Residential staying at your home)',
        salary: 'Rs. 25,000 – 40,000 / month',
        details: 'Employer provides private room, 3 daily meals, and 2–4 days off per month.',
      },
      {
        name: 'Full-Time Day Shift',
        hours: '8 to 10 Hours daily (e.g. 9:00 AM – 6:00 PM)',
        salary: 'Rs. 22,000 – 32,000 / month',
        details: 'Daily commute. Lunch and morning tea customarily provided by the family.',
      },
      {
        name: 'Part-Time Morning / Evening',
        hours: '3 to 5 Hours (Specific tasks like dusting, mopping & utensils)',
        salary: 'Rs. 15,000 – 22,000 / month',
        details: 'Best for smaller apartments or routine daily cleaning.',
      },
      {
        name: 'Urgent Same-Day Replacement',
        hours: 'Immediate Placement within 24 Hours',
        salary: 'Market standard based on shift',
        details: 'Fast candidate interview for emergencies when previous maid has abruptly left.',
      },
    ],
    roleVerifications: [
      'NADRA CNIC Biometric inspection & permanent home address confirmation',
      'Sindh Police Station criminal record clearance check',
      '3 Registered local Karachi guarantors with signed legal affidavits',
      'Personal hygiene, demeanor, and practical cleaning interview at Defence Mall office',
      '100% Free replacement guarantee within placement contract period',
    ],
    faq: [
      {
        q: 'How fast can a live-in maid start working in Karachi?',
        a: 'We usually shortlist and arrange candidate interviews within 24 to 48 hours for areas like DHA, Clifton, Gulshan, and PECHS. Urgent placements can be arranged the same day.',
      },
      {
        q: 'What holidays and off-days are standard for a live-in maid?',
        a: 'In Karachi, live-in domestic staff typically receive 2 to 4 off-days per month (often alternate Sundays), as mutually agreed upon in the HDSP placement agreement.',
      },
      {
        q: 'What if the maid is unable to adjust to our home routine?',
        a: 'HDSP provides a complete replacement guarantee. If a candidate leaves or is unsatisfactory within the agreed period, we provide an immediate replacement without hassle.',
      },
    ],
  },

  cook: {
    id: 'cook',
    title: 'Cook & Professional Home Chef',
    urdu: 'باورچی / کک',
    categoryGroup: 'domestic',
    tag: 'Family Favorite',
    image: categoryImages.cook,
    summary: 'Skilled Pakistani, Desi, Chinese, and Continental home cooks providing fresh, hygienic, and appetizing family meals tailored to your taste.',
    salaryRange: 'Rs. 32,000 – 55,000 / month',
    overview: 'HDSP provides experienced male and female cooks skilled in Pakistani family meals, baking, BBQ, Chinese, and dietary requirements (such as diabetic-friendly, low-oil, or children snacks). Every cook undergoes a practical cooking assessment and food hygiene review to guarantee delicious and safe dining for your family.',
    responsibilities: [
      'Preparing fresh breakfast, lunch, afternoon tea snacks, and family dinner',
      'Authentic Pakistani dishes: Biryani, Qorma, Karahi, Haleem, Nihari, Daal, Sabzi',
      'Fresh Roti, Naan, Parathas, and breakfast egg preparations',
      'Continental & Chinese dishes: Chow mein, fried rice, pasta, grilled chicken, soups',
      'Managing kitchen grocery stock, spices, and providing timely purchase lists',
      'Maintaining kitchen counter sanitation, refrigerator hygiene, and utensil cleanliness',
      'Cooking special diet meals for elders or infants upon instruction',
    ],
    qualifications: [
      'Minimum 3 to 10 years experience cooking for residential families in Karachi',
      'Strong hygiene practices: clean apron, trimmed nails, hair covering',
      'Knowledge of grocery quality, vegetable freshness, and spice proportions',
      'Mandatory CNIC verification and Sindh Police clearance on record',
      'Three credible local guarantors with signed legal affidavits',
    ],
    shifts: [
      {
        name: 'Live-In Cook (24/7 Residential)',
        hours: 'Residential cook available for all household meal times',
        salary: 'Rs. 35,000 – 55,000 / month',
        details: 'Includes room, food, and 2–4 days off per month. Ideal for large families.',
      },
      {
        name: 'Full-Time Day Cook',
        hours: '8 to 10 Hours (Prepares lunch, dinner and afternoon tea)',
        salary: 'Rs. 30,000 – 45,000 / month',
        details: 'Non-residential. Arrives in morning and leaves after dinner prep.',
      },
      {
        name: 'Part-Time (Single or Double Meal)',
        hours: '3 to 5 Hours daily (Prepares 1 or 2 main meals in advance)',
        salary: 'Rs. 18,000 – 28,000 / month',
        details: 'Cost-effective for working couples or smaller families.',
      },
    ],
    roleVerifications: [
      'Hands-on trial cooking test or recipe interview at recruitment desk',
      'Medical screening for communicable health conditions and food safety',
      'NADRA Biometric CNIC record check and Karachi address verification',
      '3 local guarantors with verified contact numbers and CNIC photocopies',
      'Free replacement warranty if food taste or consistency is unsatisfactory',
    ],
    faq: [
      {
        q: 'Can we conduct a trial cooking test before finalizing?',
        a: 'Yes, HDSP encourages a one-meal trial cooking session at your home or an interview at our Defence Mall office so you can assess taste, spice level, and cleanliness.',
      },
      {
        q: 'Can the cook make both Pakistani and Chinese dishes?',
        a: 'Yes, most of our experienced cooks specialize in both authentic Pakistani family dishes and popular Chinese/Continental meals like chow mein, pasta, and grilled dishes.',
      },
    ],
  },

  driver: {
    id: 'driver',
    title: 'Family & Executive Driver',
    urdu: 'فیملی ڈرائیور',
    categoryGroup: 'domestic',
    tag: 'Verified License',
    image: categoryImages.driver,
    summary: 'Punctual, polite, and licensed drivers for school runs, corporate office commutes, airport transfers, and family travel in Karachi.',
    salaryRange: 'Rs. 30,000 – 48,000 / month',
    overview: 'Navigating Karachi traffic requires patience, route expertise, and defensive driving. HDSP provides verified family chauffeurs who have passed traffic police license checks, route familiarity assessments, and complete background checks. Our drivers are courteous, discreet, and strictly follow road safety protocols.',
    responsibilities: [
      'Punctual morning school, college, and tuition pickup & drop for children',
      'Executive office transit, meeting commutes, and airport pick-and-drop',
      'Daily vehicle care: engine oil check, coolant, tire pressure, and exterior washing',
      'Family grocery runs, shopping trips, and weekend outings across Karachi',
      'Safe navigation using Google Maps and knowledge of Karachi bypasses and shortcuts',
      'Safe parking, avoiding unauthorized stopping, and ensuring vehicle security',
    ],
    qualifications: [
      'Valid driving license (LTV / HTV) verified with Karachi Traffic Police',
      'Minimum 5 years driving experience with automatic and manual vehicles',
      'Clean traffic accident record and zero criminal background verified by Police',
      'Non-smoker or polite in-vehicle etiquette, no phone usage while driving',
      'Three verified local guarantors with signed legal affidavits',
    ],
    shifts: [
      {
        name: 'Full-Time Day Shift',
        hours: '10 to 12 Hours daily (e.g. 7:30 AM – 7:30 PM)',
        salary: 'Rs. 30,000 – 45,000 / month',
        details: 'Standard shift covering school commute in morning and office return.',
      },
      {
        name: 'Live-In Family Driver',
        hours: 'Residential driver with accommodation provided',
        salary: 'Rs. 32,000 – 48,000 / month',
        details: 'Available for late night airport runs or early morning requirements.',
      },
      {
        name: 'Weekend / Overtime On-Call',
        hours: 'Additional hours compensated per agreed overtime rate',
        salary: 'Hourly overtime as mutually agreed',
        details: 'Flexibility for weddings, out-of-city travel, or weekend shopping.',
      },
    ],
    roleVerifications: [
      'Karachi Traffic Police driving license validation',
      'Practical driving skills and Karachi route familiarity test',
      'Sindh Police & CPLC criminal record clearance certificate',
      '3 local guarantors with physical address verification',
      'Free driver replacement if conduct or punctuality is not up to standard',
    ],
    faq: [
      {
        q: 'Can the driver drive luxury automatic cars and SUVs?',
        a: 'Yes, our drivers are experienced with modern automatic sedans, Japanese crossovers, and luxury SUVs (Civic, Grande, Fortuner, Prado, Land Cruiser).',
      },
      {
        q: 'Is overtime paid if we need the driver past 12 hours?',
        a: 'Yes, standard overtime rates in Karachi are typically Rs. 100 to Rs. 150 per extra hour or dinner allowance if retained past 9:00 PM.',
      },
    ],
  },

  patient: {
    id: 'patient',
    title: 'Patient Attendant & Home Nurse',
    urdu: 'مریض کی دیکھ بھال / ہوم نرس',
    categoryGroup: 'medical',
    tag: 'Medical Support',
    image: categoryImages.patient,
    summary: 'Qualified male and female home nurses and patient attendants for bedridden individuals, post-surgery recovery, stroke rehabilitation, and 24/7 care.',
    salaryRange: 'Rs. 40,000 – 65,000 / month',
    overview: 'When a family member is recovering from surgery, stroke, or requires continuous medical attention, HDSP provides trained patient attendants. Our medical care staff understands vital signs, medication administration, bedsore prevention, catheter care, and hygiene for patients in home settings.',
    responsibilities: [
      'Continuous vital signs monitoring (Blood pressure, blood sugar, pulse rate, SpO2)',
      'Strict medication administration following the doctor’s prescription chart',
      'Preventing bedsores through regular scheduled body turning every 2 hours',
      'Sponge baths, patient hygiene, diaper changing, and clothing assistance',
      'Operating patient equipment: nebulizers, oxygen concentrators, suction machines',
      'Managing feeding tubes (NG tube) and urine catheters with sterile precautions',
      'Wheelchair transfers, passive physical therapy exercises, and mobility aid',
    ],
    qualifications: [
      'Certified Patient Care Attendant diploma or nursing assistant training',
      'Minimum 2 to 6 years clinical or private home patient care experience',
      'Gentle, compassionate, and patient temperament with bedridden individuals',
      'Mandatory CNIC verification, police record clearance, and health screening',
      'Three verified guarantors with registered contact numbers and addresses',
    ],
    shifts: [
      {
        name: '24-Hour Live-In Patient Care',
        hours: '24/7 Dedicated residential patient care',
        salary: 'Rs. 45,000 – 65,000 / month',
        details: 'Continuous day and night bedside care. Food and sleeping quarters provided.',
      },
      {
        name: '12-Hour Day Shift',
        hours: '12 Hours (e.g. 8:00 AM – 8:00 PM)',
        salary: 'Rs. 35,000 – 48,000 / month',
        details: 'Daytime medication, feeding, exercise, and vitals tracking.',
      },
      {
        name: '12-Hour Night Shift',
        hours: '12 Hours (e.g. 8:00 PM – 8:00 AM)',
        salary: 'Rs. 38,000 – 50,000 / month',
        details: 'Night supervision, diaper changing, and medical emergency responsiveness.',
      },
    ],
    roleVerifications: [
      'Verification of patient care certificate or hospital nursing training',
      'Medical fitness screening to prevent transmission of health conditions',
      'Police station verification and CPLC background clearance',
      '3 local guarantors on signed legal affidavits',
      'Free immediate replacement if attendant is unable to continue',
    ],
    faq: [
      {
        q: 'Do you provide male attendants for male patients?',
        a: 'Yes, we provide both male patient attendants for male patients and female nurses for female patients according to family preference.',
      },
      {
        q: 'Can the attendant handle catheter and NG tube feeding?',
        a: 'Yes, our certified attendants are trained in handling catheter hygiene, suction machines, and feeding via nasogastric (NG) tube under medical guidance.',
      },
    ],
  },

  nanny: {
    id: 'nanny',
    title: 'Babysitter & Infant Nanny',
    urdu: 'بے بی سٹر / آیا',
    categoryGroup: 'domestic',
    tag: 'Child Care',
    image: categoryImages.nanny,
    summary: 'Loving, patient, and hygienic female nannies providing attentive childcare, infant feeding, diapering, safety supervision, and engaging playtime.',
    salaryRange: 'Rs. 30,000 – 45,000 / month',
    overview: 'Nothing is more precious than your child. HDSP connects families with kind, motherly, and pre-screened babysitters and nannies who ensure your child is safe, clean, well-fed, and happily engaged. We verify every nanny’s background meticulously so parents can work or manage their routine with complete confidence.',
    responsibilities: [
      'Infant care: formula preparation, bottle washing & steam sterilization, burping',
      'Diaper changing, sponge baths, gentle skin moisturizing, and dressing',
      'Managing baby nap schedules and soothing toddlers to sleep',
      'Preparing healthy toddler meals: porridge, mashed fruits, khichdi, finger foods',
      'Reading storybooks, singing rhymes, and educational toy play',
      'Constant child supervision to prevent falls, burns, or choking hazards',
      'Washing, drying, and ironing baby clothes with baby-safe detergents',
    ],
    qualifications: [
      'Prior proven experience caring for infants and toddlers in private homes',
      'High standard of personal cleanliness and gentle, soothing communication',
      'Basic first-aid awareness and immediate emergency alertness',
      'NADRA biometric CNIC verification and Sindh Police clearance on file',
      '3 verified local guarantors with signed legal affidavits',
    ],
    shifts: [
      {
        name: 'Live-In Nanny (24/7 Residential)',
        hours: '24 Hours (Living with family for around-the-clock childcare)',
        salary: 'Rs. 32,000 – 45,000 / month',
        details: 'Includes room and meals. Ideal for mothers with newborn twins or demanding jobs.',
      },
      {
        name: 'Full-Time Day Nanny',
        hours: '8 to 10 Hours daily (e.g. 9:00 AM – 6:00 PM)',
        salary: 'Rs. 28,000 – 38,000 / month',
        details: 'Daytime childcare while parents are at office or working remotely.',
      },
      {
        name: 'Urgent Weekend / Event Care',
        hours: 'Temporary care for family weddings or short travel',
        salary: 'Daily rate as mutually agreed',
        details: 'On-demand reliable childcare assistance.',
      },
    ],
    roleVerifications: [
      'Thorough identity check & permanent home address inspection',
      'Health checkup ensuring zero communicable conditions',
      'Sindh Police & CPLC background clearance',
      '3 local guarantors with verified contact numbers',
      'Free replacement warranty for peace of mind',
    ],
    faq: [
      {
        q: 'Can the nanny also help with baby food cooking and laundry?',
        a: 'Yes, our babysitters specifically manage all child-related chores, including sterilizing bottles, cooking baby food, and washing baby clothes.',
      },
      {
        q: 'Do you verify the nanny’s past child care experience?',
        a: 'Yes, our HR team verifies previous employer references regarding patient temperament, punctuality, and child safety.',
      },
    ],
  },

  elderly: {
    id: 'elderly',
    title: 'Elderly Caregiver & Companion',
    urdu: 'بزرگوں کی دیکھ بھال',
    categoryGroup: 'medical',
    tag: 'Senior Care',
    image: categoryImages.elderly,
    summary: 'Compassionate, respectful companions providing mobility support, medication management, and warm conversation for senior citizens.',
    salaryRange: 'Rs. 35,000 – 55,000 / month',
    overview: 'Elderly family members require respect, patience, and empathetic care. HDSP provides trained caregivers who assist seniors with daily physical mobility, bathroom support, timely medicine intake, meal companionship, and gentle conversation to prevent loneliness and ensure safety against slips or falls.',
    responsibilities: [
      'Assisting with daily walking, standing, and wheelchair or walker support',
      'Helping with bathroom visits, hygiene, bathing, and dressing with dignity',
      'Tracking daily medication schedules, eye drops, and hydration reminders',
      'Accompanying to peaceful park walks, neighborhood strolls, and hospital visits',
      'Serving warm meals, cutting food if needed, and encouraging proper nutrition',
      'Offering respectful conversation, reading newspapers, and positive companionship',
      'Immediate alert to family members in case of any dizziness or discomfort',
    ],
    qualifications: [
      'Patient, gentle, and respectful demeanor toward elderly individuals',
      'Physically fit to assist seniors with balance and mobility',
      'Minimum 2 years experience working with senior citizens',
      'Verified NADRA CNIC and Sindh Police clearance certificate',
      'Three credible local guarantors with verified contacts',
    ],
    shifts: [
      {
        name: 'Live-In Senior Caregiver (24/7)',
        hours: '24 Hours residential stay with elderly person',
        salary: 'Rs. 38,000 – 55,000 / month',
        details: 'Continuous supervision day & night. Room, meals, and 2–4 off-days monthly.',
      },
      {
        name: 'Full-Day Shift (10–12 Hours)',
        hours: 'Daytime companion (e.g. 8:00 AM – 7:00 PM)',
        salary: 'Rs. 30,000 – 42,000 / month',
        details: 'Assists senior throughout the day while family members are away at work.',
      },
    ],
    roleVerifications: [
      'Interview on empathy, patience, and senior mobility handling',
      'Police clearance check and NADRA biometric verification',
      '3 local registered guarantors on signed legal affidavits',
      '100% Replacement guarantee if personality fit is not optimal',
    ],
    faq: [
      {
        q: 'Can the caregiver accompany our elderly parents on visits?',
        a: 'Yes, the caregiver can travel with your senior parents to clinic checkups, family gatherings, or evening walks in the garden.',
      },
    ],
  },

  security: {
    id: 'security',
    title: 'Home Security Guard / Watchman',
    urdu: 'سیکیورٹی گارڈ / چوکیدار',
    categoryGroup: 'domestic',
    tag: 'Security Alert',
    image: categoryImages.security,
    summary: 'Alert, disciplined, and vetted residential security guards for bungalows, apartment complexes, gated communities, and farmhouses in Karachi.',
    salaryRange: 'Rs. 30,000 – 45,000 / month',
    overview: 'HDSP provides disciplined residential security guards (chowkidars) who maintain a vigilant physical presence, enforce strict gate entry procedures, log visiting vehicles, and deter unauthorized trespassing. Options include civilian trained guards as well as ex-servicemen (Army/Rangers) upon request.',
    responsibilities: [
      'Main entrance gate control, visitor verification, and delivery logging',
      'Perimeter patrolling of the bungalow, boundary walls, and parking spaces',
      'Operating surveillance gate locks, intercoms, and monitoring CCTV displays',
      'Preventing unauthorized loitering and managing street car parking outside',
      'Immediate alert during suspicious activities or emergencies',
      'Maintaining gate cleanliness, exterior lighting, and generator switch-on',
    ],
    qualifications: [
      'Physically fit, alert, and capable of active patrolling and gatekeeping',
      'Clean background record checked with local Police and CPLC databases',
      'Ex-army / ex-Rangers or minimum 3 years private residential security experience',
      'Verified CNIC and permanent address verification in Sindh',
      'Three credible local guarantors with signed affidavits',
    ],
    shifts: [
      {
        name: '12-Hour Day Shift',
        hours: '7:00 AM to 7:00 PM daily gate duty',
        salary: 'Rs. 30,000 – 40,000 / month',
        details: 'Monitoring day visitors, delivery parcels, and household staff entry.',
      },
      {
        name: '12-Hour Night Shift',
        hours: '7:00 PM to 7:00 AM vigilant night watch',
        salary: 'Rs. 32,000 – 45,000 / month',
        details: 'Perimeter check, alert gate presence throughout the night hours.',
      },
      {
        name: '24-Hour Relieving Guards Pair',
        hours: 'Two rotating guards for 24/7 continuous gate protection',
        salary: 'Combined standard package',
        details: 'Seamless shift handover for high-security residences and bungalows.',
      },
    ],
    roleVerifications: [
      'Sindh Police clearance certificate and CPLC record check',
      'Verification of ex-military discharge book (for armed guards)',
      'NADRA biometric CNIC check and physical residential check',
      '3 verified local guarantors with contact details',
      'Free guard replacement if vigilance or punctuality is lacking',
    ],
    faq: [
      {
        q: 'Do you offer armed security guards?',
        a: 'Yes, ex-military or ex-Rangers guards with verified personal weapon licenses can be provided upon request.',
      },
    ],
  },

  office: {
    id: 'office',
    title: 'Office Boy & Janitor',
    urdu: 'آفس بوائے و صفائی عملہ',
    categoryGroup: 'commercial',
    tag: 'Commercial',
    image: categoryImages.office,
    summary: 'Polite, active office assistants and janitorial staff for corporate offices, clinics, law chambers, and commercial showrooms in Karachi.',
    salaryRange: 'Rs. 28,000 – 38,000 / month',
    overview: 'HDSP provides punctual, smart office assistants who manage corporate hospitality, serve tea and coffee to clients and executive staff, maintain pristine office cleanliness, handle basic filing and photocopying, and perform local bank and postal errands in Karachi.',
    responsibilities: [
      'Preparing and serving tea, coffee, water, and lunch to executives and clients',
      'Daily office cleaning: dusting workstations, sweeping, and mopping floors',
      'Emptying waste bins, maintaining restroom sanitation, and air freshener spray',
      'Document photocopying, scanning, binding, and file dispatch',
      'Local outdoor errands: bank deposits, post office, stationary purchases',
      'Opening the office punctually in the morning and securing locks in the evening',
    ],
    qualifications: [
      'Minimum Matriculation or basic literacy to read addresses and documents',
      'Neat, professional corporate presentation and polite hospitality etiquette',
      'Clean background check with Karachi Police and CPLC',
      'Mandatory NADRA biometric CNIC verification',
      'Three credible registered local guarantors',
    ],
    shifts: [
      {
        name: 'Standard Business Hours',
        hours: '9:00 AM to 6:00 PM (Monday to Saturday)',
        salary: 'Rs. 28,000 – 38,000 / month',
        details: 'Corporate full-time office boy for day-to-day operations.',
      },
      {
        name: 'Evening / Clinic Shift',
        hours: '2:00 PM to 10:00 PM (Ideal for clinics and evening consultancies)',
        salary: 'Rs. 26,000 – 34,000 / month',
        details: 'Specialized for medical clinics, tuition centers, or evening firms.',
      },
    ],
    roleVerifications: [
      'HR interview on corporate etiquette, cleanliness, and punctuality',
      'Police clearance record check & NADRA verification',
      '3 local guarantors with signed legal affidavits',
      'Hassle-free replacement guarantee within contract period',
    ],
    faq: [
      {
        q: 'Can the office boy handle outdoor errands and bank runs?',
        a: 'Yes, our office assistants are experienced with Karachi routes and can run local bank errands, purchase office supplies, and deliver documents.',
      },
    ],
  },
};

interface CategoryDetailPageProps {
  categoryId: string;
  onBack: () => void;
  onBookNow: (categoryTitle: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  categoryId,
  onBack,
  onBookNow,
}) => {
  const category = DETAILED_CATEGORIES[categoryId] || DETAILED_CATEGORIES.maid;
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const phoneIntl = '923032632605';
  const whatsappUrl = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(
    `*Inquiry for ${category.title}*\nAssalam o Alaikum, I would like to hire a verified ${category.title} in Karachi. Please share available candidate profiles and packages.`
  )}`;

  return (
    <div className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 mb-6 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </button>

        {/* Hero Card for Category */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Image Left */}
            <div className="md:col-span-5 relative bg-slate-100 min-h-[300px] md:min-h-full">
              <img
                src={category.image}
                alt={category.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {category.tag}
              </div>
            </div>

            {/* Content Right */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold uppercase tracking-wider mb-1">
                  <span>HDSP Karachi Verified Category</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {category.title}
                </h1>
                <p className="text-sm font-semibold text-emerald-700 mt-0.5 urdu-font">
                  {category.urdu}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {category.summary}
                </p>

                {/* Salary & Timings Pill */}
                <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      Estimated Monthly Salary:
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-900">
                      {category.salaryRange}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      Placement Speed:
                    </span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1 justify-end">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Within 24–48 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onBookNow(category.title)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book {category.title}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 0303 2632605</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Overview */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8 space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-2">Role Overview & Standards</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {category.overview}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-3">
              Standard Duties & Responsibilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {category.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications & Candidate Background */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-3">
              Candidate Qualifications & Pre-Vetting
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {category.qualifications.map((q, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shift Options and Karachi Packages */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">
            Available Shifts & Working Arrangements
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Choose the shift format that best fits your household or corporate schedule:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {category.shifts.map((shift, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{shift.name}</h4>
                  <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-2">
                    {shift.salary}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{shift.hours}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{shift.details}</p>
                </div>

                <button
                  onClick={() => onBookNow(`${category.title} (${shift.name})`)}
                  className="mt-4 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  Select this shift
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Checkpoints */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verification Security Standards
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            Verification Protocol for {category.title}
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            Before shortlisting any candidate for this category, HDSP completes mandatory security steps:
          </p>

          <div className="space-y-3">
            {category.roleVerifications.map((v, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category FAQs */}
        {category.faq && category.faq.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">
              Frequently Asked Questions About {category.title}
            </h2>

            <div className="space-y-3">
              {category.faq.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                    >
                      <span>{item.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold">
            Ready to Shortlist a Verified {category.title}?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            Contact our recruitment team directly on WhatsApp or submit a booking request. We will dispatch matched candidate CVs with 3 guarantors immediately.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onBookNow(category.title)}
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Fill Booking Form
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-950/50 hover:bg-emerald-950/70 border border-emerald-400/40 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp: 0303 2632605</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
