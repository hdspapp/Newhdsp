export interface StaffService {
  id: string;
  title: string;
  urduTitle: string;
  category: 'domestic' | 'medical' | 'commercial' | 'maintenance';
  description: string;
  duties: string[];
  options: string[];
  salaryRangePKR: string;
  popularIn: string[];
  icon: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  urduRole: string;
  experienceYears: number;
  age: number;
  gender: 'Female' | 'Male';
  preferredWorkType: 'Live-In' | 'Full-Time' | 'Part-Time';
  preferredAreas: string[];
  languages: string[];
  skills: string[];
  verification: {
    cnicVerified: boolean;
    policeClearance: boolean;
    guarantorsCount: number;
    hrInterviewed: boolean;
  };
  availability: 'Available Immediately' | 'Interview in Progress' | 'Placed';
}

export interface KarachiArea {
  zone: string;
  name: string;
  dispatchTime: string;
  activeStaffCount: number;
}

export const BUSINESS_DETAILS = {
  name: 'HDSP (Home Domestic Service Provider)',
  shortName: 'HDSP Karachi',
  phone: '0303 2632605',
  phoneRaw: '03032632605',
  whatsappIntl: '923032632605',
  address: 'Office UF-61, Defence Mall, DHA Phase 1, Karachi, Pakistan',
  timings: 'Monday to Saturday: 9:00 AM – 9:00 PM (WhatsApp 24/7)',
  email: 'hdsp1285@gmail.com',
};

export const SERVICES_LIST: StaffService[] = [
  {
    id: 'house-maid',
    title: 'House Maid & Cleaning Helper (Masi)',
    urduTitle: 'گھریلو ملازمہ / ماسی',
    category: 'domestic',
    description: 'Trained, verified domestic maids for thorough dusting, mopping, laundry, utensil washing, and day-to-day household upkeep.',
    duties: [
      'Daily dusting, broom & wet mopping with disinfectants',
      'Washing dishes, kitchen counter sanitation & trash disposal',
      'Laundry washing, drying, folding and fabric care',
      'Bathroom deep-cleaning and bedroom bed-making',
    ],
    options: ['Live-In (24/7)', 'Full-Time (8-10 Hours)', 'Part-Time Morning/Evening', 'Urgent Replacement'],
    salaryRangePKR: 'Rs. 25,000 – 40,000 / month',
    popularIn: ['DHA Phase 1-8', 'Clifton', 'PECHS', 'Gulshan-e-Iqbal', 'Bahria Town'],
    icon: 'Sparkles',
  },
  {
    id: 'cook-chef',
    title: 'Cook & Professional Home Chef',
    urduTitle: 'کھانا پکانے والا کک / شیف',
    category: 'domestic',
    description: 'Expert Pakistani, Continental, and Desi cuisine cooks skilled in hygienic preparation, grocery list planning, and family meal management.',
    duties: [
      'Pakistani dishes (Biryani, Karahi, Qorma, Daal, Sabzi, Roti, Parathas)',
      'Chinese & Continental favorites (Pasta, Soups, Fried Rice, Grilled dishes)',
      'Special dietary meals (low sodium, diabetic-friendly, infant food)',
      'Kitchen hygiene, grocery pantry maintenance & dish presentation',
    ],
    options: ['Live-In (24/7)', 'Full-Time (Breakfast, Lunch & Dinner)', 'Part-Time (Single or Double Meal)'],
    salaryRangePKR: 'Rs. 32,000 – 55,000 / month',
    popularIn: ['DHA Phase 5 & 6', 'Clifton Blocks 2-5', 'North Nazimabad', 'PECHS'],
    icon: 'UtensilsCrossed',
  },
  {
    id: 'family-driver',
    title: 'Family & Executive Driver',
    urduTitle: 'ذاتی و فیملی ڈرائیور',
    category: 'domestic',
    description: 'Polite, licensed, road-safe drivers for children school runs, office commutes, grocery errands, and intercity travel across Sindh.',
    duties: [
      'Punctual school, college & tuition pick and drop for children',
      'Office, airport and family social commutes in Karachi traffic',
      'Basic car maintenance, engine fluid checks, wash & tire pressure',
      'Safe defensive driving, valid Driving License (LTV/HTV) & clean record',
    ],
    options: ['Full-Time (10-12 Hours)', 'Live-In with Accommodation', 'Overtime / On-Call'],
    salaryRangePKR: 'Rs. 30,000 – 48,000 / month',
    popularIn: ['DHA', 'Clifton', 'Gulistan-e-Johar', 'Askari 4', 'Bahria Town'],
    icon: 'Car',
  },
  {
    id: 'babysitter-nanny',
    title: 'Babysitter & Infant Nanny',
    urduTitle: 'بے بی سٹر / آیا / آیا برائے بچے',
    category: 'domestic',
    description: 'Compassionate, patient, and hygienic female caregivers for newborns, toddlers, and young kids with constant supervision.',
    duties: [
      'Feeding, formula preparation, bottle sterilization & burping',
      'Diaper changing, sponge baths, dressing and sleep scheduling',
      'Engaging indoor play, reading stories and educational activities',
      'Child safety oversight, outdoor park supervision and hygiene',
    ],
    options: ['Live-In (24/7)', 'Full-Time Day Shifts', 'Urgent Weekend / Event care'],
    salaryRangePKR: 'Rs. 30,000 – 45,000 / month',
    popularIn: ['DHA Phase 6-8', 'Clifton', 'Gulshan-e-Iqbal', 'Bahria Town'],
    icon: 'Baby',
  },
  {
    id: 'patient-attendant',
    title: 'Patient Attendant & Home Nurse',
    urduTitle: 'مریض کی دیکھ بھال / ہوم نرس',
    category: 'medical',
    description: 'Trained attendants for post-operative recovery, stroke, paralysis, bedridden individuals, catheter care, and vital signs monitoring.',
    duties: [
      'Vital signs check (Blood pressure, sugar, SpO2, pulse rate)',
      'Medication administration strictly as prescribed by doctor',
      'Bed sore prevention, position turning, sponge bath & grooming',
      'Assistance with feeding tube (NG tube), catheter & nebulizer',
    ],
    options: ['12-Hour Day Shift', '12-Hour Night Shift', '24-Hour Live-In Patient Care'],
    salaryRangePKR: 'Rs. 40,000 – 65,000 / month',
    popularIn: ['DHA', 'Clifton', 'PECHS', 'North Nazimabad', 'Gulshan'],
    icon: 'HeartPulse',
  },
  {
    id: 'elderly-caregiver',
    title: 'Elderly Caregiver & Companion',
    urduTitle: 'بزرگوں کی نگہداشت / کیئرگیور',
    category: 'medical',
    description: 'Respectful, gentle caregivers providing companionship, mobility support, medication reminders, and daily assistance to senior citizens.',
    duties: [
      'Assisting with walking, wheelchair transfers, bathroom & dressing',
      'Timely medicine intake and hydration tracking',
      'Friendly companionship, conversation and cognitive stimulation',
      'Accompanying to clinic appointments and evening park strolls',
    ],
    options: ['Live-In (24/7)', 'Full-Day (10-12 Hours)', 'Emergency Night Attendant'],
    salaryRangePKR: 'Rs. 35,000 – 55,000 / month',
    popularIn: ['Clifton', 'DHA', 'Gulshan', 'PECHS', 'KDA Scheme 1'],
    icon: 'UserCheck',
  },
  {
    id: 'security-guard',
    title: 'Home Security Guard / Watchman (Chowkidar)',
    urduTitle: 'سیکیورٹی گارڈ / چوکیدار',
    category: 'domestic',
    description: 'Vetted, physically fit security guards for bungalows, apartments, farmhouses, and gated compounds with strict visitor screening.',
    duties: [
      'Gate control, visitor verification, vehicle entry logging',
      'Perimeter patrolling, surveillance camera observation',
      'Emergency response, alert gatekeeper presence day & night',
      'Ex-army / armed security guard options available upon request',
    ],
    options: ['12-Hour Day Shift', '12-Hour Night Shift', '24-Hour Relieving Guards'],
    salaryRangePKR: 'Rs. 30,000 – 45,000 / month',
    popularIn: ['DHA Phase 1-8', 'Clifton', 'Scheme 33', 'Bahria Town', 'Malir Cantt'],
    icon: 'Shield',
  },
  {
    id: 'office-assistant',
    title: 'Office Assistant & Janitorial Staff',
    urduTitle: 'آفس بوائے و صفائی عملہ',
    category: 'commercial',
    description: 'Reliable office boys, tea servers, and commercial cleaning staff for corporate offices, clinics, showrooms, and firms in Karachi.',
    duties: [
      'Serving tea, coffee, refreshments to executive staff & guests',
      'Daily office dusting, mopping, trash disposal & restroom hygiene',
      'Document filing, photocopying, bank runs & local outdoor errands',
      'Punctual office opening and lockup procedures',
    ],
    options: ['Full-Time Business Hours (8-9 Hours)', 'Evening Office Shift'],
    salaryRangePKR: 'Rs. 28,000 – 40,000 / month',
    popularIn: ['I.I. Chundrigar Road', 'Shahrah-e-Faisal', 'Clifton', 'DHA Commercial'],
    icon: 'Building2',
  },
  {
    id: 'gardener',
    title: 'Gardener (Maali)',
    urduTitle: 'مالی / باغبانی',
    category: 'domestic',
    description: 'Skilled gardeners for lawn maintenance, flower beds, seasonal pruning, watering, and organic soil fertilization for homes.',
    duties: [
      'Lawn mowing, weed removal, hedging and decorative plant shaping',
      'Watering schedules, plant pest control & organic fertilizer use',
      'Pot arrangement, seasonal flowering plants & indoor plant care',
    ],
    options: ['Part-Time (Weekly 2-3 visits)', 'Full-Time (Daily)', 'Live-In'],
    salaryRangePKR: 'Rs. 15,000 – 35,000 / month',
    popularIn: ['DHA Phase 2, 5, 6, 8', 'KDA Scheme 1', 'PECHS', 'Clifton'],
    icon: 'Flower2',
  },
  {
    id: 'technician-electrician',
    title: 'Electrician, Plumber & CCTV Technician',
    urduTitle: 'الیکٹریشن، پلمبر اور مینٹیننس',
    category: 'maintenance',
    description: 'Certified technicians for household wiring, UPS & inverter installations, water pump repairs, sanitary fixtures, and security cameras.',
    duties: [
      'UPS, solar inverter and generator changeover wiring',
      'Sanitary plumbing, leakage diagnosis, water motor repair',
      'CCTV camera installation, DVR configuration & mobile app setup',
      'General maintenance handyman solutions for residences',
    ],
    options: ['On-Call Visit', 'Monthly Retainer Maintenance', 'Project Contract'],
    salaryRangePKR: 'Per visit or Rs. 35,000 – 50,000 / retainer',
    popularIn: ['All Karachi Areas'],
    icon: 'Wrench',
  },
];

export const KARACHI_AREAS: KarachiArea[] = [
  { zone: 'District South', name: 'DHA Phase 1 to 8 & Extension', dispatchTime: 'Within 2–4 Hours', activeStaffCount: 42 },
  { zone: 'District South', name: 'Clifton (Blocks 1–9 & Sea View)', dispatchTime: 'Within 2–4 Hours', activeStaffCount: 38 },
  { zone: 'District South', name: 'Bath Island & Civil Lines', dispatchTime: 'Within 3 Hours', activeStaffCount: 16 },
  { zone: 'District East', name: 'PECHS (Blocks 2, 3 & 6)', dispatchTime: 'Within 3–5 Hours', activeStaffCount: 29 },
  { zone: 'District East', name: 'Gulshan-e-Iqbal (Blocks 1–19)', dispatchTime: 'Within 3–5 Hours', activeStaffCount: 45 },
  { zone: 'District East', name: 'Gulistan-e-Johar (Blocks 1–20)', dispatchTime: 'Within 4–6 Hours', activeStaffCount: 34 },
  { zone: 'District East', name: 'Bahadurabad & Dhoraji Colony', dispatchTime: 'Within 3–5 Hours', activeStaffCount: 19 },
  { zone: 'District Central', name: 'North Nazimabad (Blocks A–T)', dispatchTime: 'Within 4–6 Hours', activeStaffCount: 31 },
  { zone: 'District Central', name: 'Federal B Area (FB Area)', dispatchTime: 'Within 4–6 Hours', activeStaffCount: 22 },
  { zone: 'Suburban & Gated', name: 'Bahria Town Karachi (All Precincts)', dispatchTime: 'Same Day / 24 Hours', activeStaffCount: 27 },
  { zone: 'Suburban & Gated', name: 'Scheme 33 & Saadi Town', dispatchTime: 'Within 4–6 Hours', activeStaffCount: 25 },
  { zone: 'District Malir', name: 'Malir Cantt & Askari 4 & 5', dispatchTime: 'Within 3–5 Hours', activeStaffCount: 21 },
  { zone: 'District Korangi', name: 'Korangi & Defence View', dispatchTime: 'Within 4–6 Hours', activeStaffCount: 18 },
];

export const VERIFIED_CANDIDATES: CandidateProfile[] = [
  {
    id: 'CAN-801',
    name: 'Fatima Bibi',
    role: 'Experienced Cook & Housekeeper',
    urduRole: 'ماہر باورچن و گھریلو ملازمہ',
    experienceYears: 7,
    age: 38,
    gender: 'Female',
    preferredWorkType: 'Live-In',
    preferredAreas: ['DHA Phase 5 & 6', 'Clifton Block 4', 'PECHS'],
    languages: ['Urdu', 'Punjabi'],
    skills: ['Traditional Pakistani Dishes', 'Biryani / Karahi', 'Baking basics', 'Child hygiene'],
    verification: {
      cnicVerified: true,
      policeClearance: true,
      guarantorsCount: 3,
      hrInterviewed: true,
    },
    availability: 'Available Immediately',
  },
  {
    id: 'CAN-802',
    name: 'Muhammad Rashid',
    role: 'VIP Family Driver',
    urduRole: 'وی آئی پی فیملی ڈرائیور',
    experienceYears: 9,
    age: 36,
    gender: 'Male',
    preferredWorkType: 'Full-Time',
    preferredAreas: ['DHA', 'Clifton', 'Askari 4', 'Gulshan'],
    languages: ['Urdu', 'Basic English', 'Pashto'],
    skills: ['Automatic & Manual', 'School Runs', 'Defensive driving', 'Clean Traffic Record'],
    verification: {
      cnicVerified: true,
      policeClearance: true,
      guarantorsCount: 3,
      hrInterviewed: true,
    },
    availability: 'Available Immediately',
  },
  {
    id: 'CAN-803',
    name: 'Sultana Maryam',
    role: 'Patient Attendant & Home Nurse',
    urduRole: 'مریض کی دیکھ بھال / ہوم نرس',
    experienceYears: 6,
    age: 34,
    gender: 'Female',
    preferredWorkType: 'Live-In',
    preferredAreas: ['DHA', 'Clifton', 'PECHS', 'North Nazimabad'],
    languages: ['Urdu', 'Sindhi', 'English'],
    skills: ['Post-surgery care', 'Vitals & BP', 'Diabetic Insulin', 'Wheelchair transfer'],
    verification: {
      cnicVerified: true,
      policeClearance: true,
      guarantorsCount: 3,
      hrInterviewed: true,
    },
    availability: 'Interview in Progress',
  },
  {
    id: 'CAN-804',
    name: 'Zainab Akhtar',
    role: 'Nanny & Babysitter',
    urduRole: 'بچوں کی دیکھ بھال / آیا',
    experienceYears: 5,
    age: 29,
    gender: 'Female',
    preferredWorkType: 'Full-Time',
    preferredAreas: ['DHA Phase 2 & 8', 'Bahria Town', 'Gulshan Block 7'],
    languages: ['Urdu', 'English basics'],
    skills: ['Toddler meal preparation', 'Sterilization', 'Storytelling', 'First Aid Trained'],
    verification: {
      cnicVerified: true,
      policeClearance: true,
      guarantorsCount: 3,
      hrInterviewed: true,
    },
    availability: 'Available Immediately',
  },
  {
    id: 'CAN-805',
    name: 'Akram Subhan (Ex-Rangers)',
    role: 'Residential Security Guard',
    urduRole: 'رہائشی سیکیورٹی گارڈ',
    experienceYears: 11,
    age: 44,
    gender: 'Male',
    preferredWorkType: 'Live-In',
    preferredAreas: ['DHA Phase 7', 'Clifton', 'Bahria Town', 'Scheme 33'],
    languages: ['Urdu', 'Punjabi'],
    skills: ['Gate protocol', 'Perimeter surveillance', 'Armed license', 'Emergency alert'],
    verification: {
      cnicVerified: true,
      policeClearance: true,
      guarantorsCount: 3,
      hrInterviewed: true,
    },
    availability: 'Available Immediately',
  },
];

export const VERIFICATION_PILLARS = [
  {
    step: '01',
    title: 'NADRA CNIC & Biometric Verification',
    urduTitle: 'شناختی کارڈ و نادرا بائیو میٹرک تصدیق',
    description: 'Mandatory original CNIC check with digital NADRA verisys to ensure 100% legal identity, active citizen status, and verified permanent home address.',
  },
  {
    step: '02',
    title: 'Sindh Police & CPLC Clearance',
    urduTitle: 'سندھ پولیس و سی پی ایل سی کرمنل ریکارڈ کلیئرنس',
    description: 'Comprehensive background screening across Karachi Police station records and Citizens-Police Liaison Committee (CPLC) databases to verify zero prior criminal history.',
  },
  {
    step: '03',
    title: 'Minimum 3 Registered CNIC Guarantors',
    urduTitle: 'کم از کم 3 معتبر ضامن بمعہ شناختی کارڈ',
    description: 'Every applicant must provide three credible local guarantors who sign physical liability affidavits with verified phone numbers, residences, and workplace contacts.',
  },
  {
    step: '04',
    title: 'In-Person HR Interview & Skill Assessment',
    urduTitle: 'دفتر میں تفصیلی انٹرویو اور ٹیسٹ',
    description: 'Rigorous vetting at Office UF-61, Defence Mall, DHA Phase 1 by experienced recruiters assessing demeanor, personal hygiene, communication, and work competencies.',
  },
  {
    step: '05',
    title: 'Hassle-Free Replacement Guarantee',
    urduTitle: 'تبدیلی کی مکمل سہولت و گارنٹی',
    description: 'If hired staff is unable to continue or does not meet your expectations within the agreed placement duration, HDSP provides an immediate replacement at zero hassle.',
  },
];
