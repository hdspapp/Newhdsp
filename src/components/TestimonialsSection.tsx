import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Quote,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

export interface Testimonial {
  id: string;
  clientName: string;
  initials: string;
  avatarBg: string;
  area: string;
  zone: 'dha-clifton' | 'gulshan-jauhar' | 'pechs-malir' | 'bahria-nazimabad';
  serviceHired: string;
  rating: number;
  verifiedDuration: string;
  quoteHighlight: string;
  reviewText: string;
  verificationBadges: string[];
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Dr. Ayesha Tariq & Family',
    initials: 'AT',
    avatarBg: 'bg-emerald-700 text-white',
    area: 'DHA Phase 6, Karachi',
    zone: 'dha-clifton',
    serviceHired: 'Live-In House Maid & Home Cook',
    rating: 5,
    verifiedDuration: 'Active Client • 8 Months',
    quoteHighlight: 'Complete peace of mind with 3 guarantor dossiers and police clearance.',
    reviewText:
      'Finding trustworthy live-in staff in DHA used to be stressful after multiple bad experiences with informal agents. HDSP provided complete NADRA biometric records and 3 registered guarantor files before our maid and cook arrived. Both are punctual, polite, and cook clean family meals. Their Defence Mall team even followed up after 2 weeks to ensure satisfaction.',
    verificationBadges: ['NADRA Biometric Checked', 'Sindh Police Cleared', '3 Local Guarantors'],
  },
  {
    id: 't2',
    clientName: 'Syed Farhan Raza (Bank Executive)',
    initials: 'FR',
    avatarBg: 'bg-slate-800 text-emerald-300',
    area: 'Clifton Block 4 (Near Sea View), Karachi',
    zone: 'dha-clifton',
    serviceHired: 'Trained Male Patient Attendant',
    rating: 5,
    verifiedDuration: 'Active Client • 1 Year',
    quoteHighlight: 'Dispatched within 24 hours when we had an urgent post-surgery medical need.',
    reviewText:
      'We urgently required an experienced patient attendant for my 78-year-old father after his orthopaedic surgery. HDSP sent two verified candidate dossiers within 24 hours. The attendant deployed has been extraordinarily gentle, handles wheelchair transfers safely, records vitals accurately, and is 100% honest. Easily the most professional agency in Karachi.',
    verificationBadges: ['Hospital Attendant Trained', 'Police Record Checked', '24h Urgent Dispatch'],
  },
  {
    id: 't3',
    clientName: 'Mrs. Naila & Mansoor Siddiqui',
    initials: 'NS',
    avatarBg: 'bg-teal-800 text-white',
    area: 'PECHS Block 2 (Tariq Road), Karachi',
    zone: 'pechs-malir',
    serviceHired: 'Experienced Child Nanny & Babysitter',
    rating: 5,
    verifiedDuration: 'Active Client • 6 Months',
    quoteHighlight: 'Warm, trustworthy, and properly trained in toddler hygiene and safety.',
    reviewText:
      'As working parents with two young toddlers, handing our home and kids over to a new caregiver felt daunting. The nanny HDSP placed with us has prior daycare experience and genuine warmth. She follows our feeding schedules strictly, keeps the play areas sanitized, and our children love her. The free replacement guarantee gave us total peace of mind.',
    verificationBadges: ['Daycare Trained', 'NADRA Verified', 'Replacement Warranty'],
  },
  {
    id: 't4',
    clientName: 'Brig. (R) Tariq Mahmood & Begum',
    initials: 'TM',
    avatarBg: 'bg-emerald-800 text-amber-300',
    area: 'Malir Cantt (Askari 4), Karachi',
    zone: 'pechs-malir',
    serviceHired: 'Ex-Military Security Guard & Attendant',
    rating: 5,
    verifiedDuration: 'Active Client • 1.5 Years',
    quoteHighlight: 'Strict discipline, verifiable credentials, and exemplary punctuality.',
    reviewText:
      'Living in Malir Cantt requires domestic personnel who pass cantonment security passes without hitch. HDSP provided full military discharge papers, Nadra verification, and local guarantor verification within two days. The security guard and evening attendant are exceptionally well-disciplined, polite, and vigilant.',
    verificationBadges: ['Ex-Servicemen Vetted', 'Cantt Pass Verified', '3 Guarantors Signed'],
  },
  {
    id: 't5',
    clientName: 'Imran Hashmi (Tech Co-founder)',
    initials: 'IH',
    avatarBg: 'bg-slate-900 text-emerald-400',
    area: 'DHA Phase 8 (Zone B), Karachi',
    zone: 'dha-clifton',
    serviceHired: 'Professional Family & VIP Driver',
    rating: 5,
    verifiedDuration: 'Active Client • 10 Months',
    quoteHighlight: 'Impeccable driving test, valid Sindh license, and zero speeding.',
    reviewText:
      'We needed a dependable driver for daily school runs and evening office commutes through Karachi traffic. HDSP conducted a complete driving track check, license authenticity test, and police verification. Our driver is consistently punctual, maintains the vehicles immaculately, and never uses his phone while driving.',
    verificationBadges: ['Sindh License Verified', 'Clean Driving Record', 'NADRA Biometrics'],
  },
  {
    id: 't6',
    clientName: 'Dr. Huma & Salman Abbasi',
    initials: 'HA',
    avatarBg: 'bg-emerald-900 text-white',
    area: 'Gulshan-e-Iqbal (Block 13-D), Karachi',
    zone: 'gulshan-jauhar',
    serviceHired: 'Full-Time Maid & Deep Housekeeping',
    rating: 5,
    verifiedDuration: 'Active Client • 7 Months',
    quoteHighlight: 'No unannounced leaves, thorough dusting, and transparent agreement.',
    reviewText:
      'Both my husband and I are physicians at Civil Hospital and Aga Khan. We desperately needed reliable day housekeeping without the headache of daily absences. HDSP assigned an experienced maid who handles laundry, mopping, and kitchen upkeep with great care. Having a signed formal contract made all expectations clear.',
    verificationBadges: ['Medical Cleared', '100% Police Verified', 'Strict Attendance Policy'],
  },
  {
    id: 't7',
    clientName: 'Kashif Qureshi (Corporate Director)',
    initials: 'KQ',
    avatarBg: 'bg-teal-900 text-emerald-200',
    area: 'Bahria Town Karachi (Precinct 1)',
    zone: 'bahria-nazimabad',
    serviceHired: 'Live-In Master Cook & Housekeeper',
    rating: 5,
    verifiedDuration: 'Active Client • 9 Months',
    quoteHighlight: 'Outstanding Pakistani & Chinese cuisine with spotless kitchen hygiene.',
    reviewText:
      'Finding high-caliber staff willing to relocate to Bahria Town Karachi was always a hurdle. HDSP dispatched a skilled live-in cook who specializes in diet-conscious desi cuisine, biryani, and continental breakfasts. The food quality is restaurant-grade, the pantry is managed prudently, and kitchen hygiene is 10/10.',
    verificationBadges: ['Hygienic Cooking Certified', '3 Local Guarantors', 'Bahria Dispatch'],
  },
  {
    id: 't8',
    clientName: 'Mrs. Samina Zubair',
    initials: 'SZ',
    avatarBg: 'bg-slate-700 text-teal-300',
    area: 'North Nazimabad (Block H), Karachi',
    zone: 'bahria-nazimabad',
    serviceHired: 'Elderly Female Attendant / Patient Nurse',
    rating: 5,
    verifiedDuration: 'Active Client • 5 Months',
    quoteHighlight: 'Gentle, patient-centric care for my diabetic mother with genuine warmth.',
    reviewText:
      'My mother requires insulin administration, blood sugar charting, and assistance with mobility. The female attendant provided by HDSP is compassionate, attentive, and treats my mother like family. When we needed a replacement during her Eid leave, HDSP arranged a standby attendant without extra charges.',
    verificationBadges: ['Vitals Charting Trained', 'Police Record Checked', 'Guaranteed Replacement'],
  },
  {
    id: 't9',
    clientName: 'Bilal Ahmed Sheikh (Textile Exporter)',
    initials: 'BS',
    avatarBg: 'bg-emerald-950 text-emerald-300',
    area: 'DHA Phase 5 (Khayaban-e-Shamsheer)',
    zone: 'dha-clifton',
    serviceHired: '24/7 Live-In Cook & Housekeeping Couple',
    rating: 5,
    verifiedDuration: 'Active Client • 1.2 Years',
    quoteHighlight: 'Hygienic cooking and organized household management for our joint family.',
    reviewText:
      'We have a busy household with frequent business guests. HDSP provided an experienced couple where the husband cooks authentic Pakistani dishes and the wife takes care of deep housekeeping. Their documentation was flawless with 3 verifiable guarantors in Karachi.',
    verificationBadges: ['Background Cleared', '3 Local Guarantors', 'NADRA Verified'],
  },
  {
    id: 't10',
    clientName: 'Dr. Madiha & Zeeshan Merchant',
    initials: 'ZM',
    avatarBg: 'bg-blue-900 text-white',
    area: 'Clifton Block 2 (Near Bilawal House)',
    zone: 'dha-clifton',
    serviceHired: 'Twin Infant Trained Nanny & Aya',
    rating: 5,
    verifiedDuration: 'Active Client • 11 Months',
    quoteHighlight: 'Sterilization, feed logs, and sleep schedules managed professionally.',
    reviewText:
      'Caring for infant twins while working as doctors required someone exceptionally reliable. HDSP deployed a nanny trained in infant safety, bottle sterilization, and newborn burping techniques. She is patient, honest, and truly like a family elder to our babies.',
    verificationBadges: ['Infant Care Certified', 'Police Verified', 'Medical Check Passed'],
  },
  {
    id: 't11',
    clientName: 'Engr. Asim Javed (Software Architect)',
    initials: 'AJ',
    avatarBg: 'bg-slate-800 text-teal-300',
    area: 'Gulistan-e-Jauhar (Block 14)',
    zone: 'gulshan-jauhar',
    serviceHired: 'Reliable Day Maid & Kitchen Cleaner',
    rating: 5,
    verifiedDuration: 'Active Client • 4 Months',
    quoteHighlight: 'Punctual 9 AM arrival every single day without sudden absences.',
    reviewText:
      'In Jauhar, maids often disappear after taking advances. HDSP completely changed this experience with their formal agency agreement and substitute guarantee. The maid is honest, does clean floor mopping, and respects household privacy.',
    verificationBadges: ['Sindh Police Clearance', 'NADRA Biometrics', 'Strict Attendance'],
  },
  {
    id: 't12',
    clientName: 'Begum Razia Sultana (Senior Citizen)',
    initials: 'RS',
    avatarBg: 'bg-emerald-800 text-white',
    area: 'Bath Island, Clifton, Karachi',
    zone: 'dha-clifton',
    serviceHired: 'Post-Stroke Patient Attendant (Female)',
    rating: 5,
    verifiedDuration: 'Active Client • 1.4 Years',
    quoteHighlight: 'Compassionate assistance with physiotherapy exercises and daily routine.',
    reviewText:
      'After my mother suffered a mild stroke, we needed a patient caregiver who could handle walker mobility and medication management. The female attendant from HDSP has been an angel for our home. She is polite, respectful, and always alert.',
    verificationBadges: ['Patient Care Trained', 'Guarantors Cleared', 'Police Verified'],
  },
  {
    id: 't13',
    clientName: 'Fawad Mukhtar (Chartered Accountant)',
    initials: 'FM',
    avatarBg: 'bg-slate-900 text-amber-300',
    area: 'DHA Phase 2 Extension, Karachi',
    zone: 'dha-clifton',
    serviceHired: 'Experienced Family Driver',
    rating: 5,
    verifiedDuration: 'Active Client • 8 Months',
    quoteHighlight: 'Zero traffic violations, knows all Karachi bypasses and shortcuts.',
    reviewText:
      'I commute daily between DHA Phase 2 and I.I. Chundrigar Road. HDSP assigned a mature driver with 12 years of accident-free record. He handles vehicle maintenance responsibly and is extremely courteous with my wife and elderly parents.',
    verificationBadges: ['License Authenticated', 'NADRA Biometrics', 'Driving Tested'],
  },
  {
    id: 't14',
    clientName: 'Dr. Sarah Khattak (Pediatrician)',
    initials: 'SK',
    avatarBg: 'bg-teal-700 text-white',
    area: 'PECHS Block 6, Karachi',
    zone: 'pechs-malir',
    serviceHired: 'Trained Newborn Care Nurse (Aya)',
    rating: 5,
    verifiedDuration: 'Active Client • 6 Months',
    quoteHighlight: 'Understands pediatric hygiene standards and infant development milestones.',
    reviewText:
      'As a pediatrician, I am very strict about baby hygiene and handling. The newborn aya provided by HDSP exceeded my high expectations. She washes hands diligently, prepares sterilized feeds accurately, and is gentle during colic episodes.',
    verificationBadges: ['Aya Training Cleared', 'Police Record Checked', 'NADRA Verified'],
  },
  {
    id: 't15',
    clientName: 'Capt. (R) Rehan Munir',
    initials: 'RM',
    avatarBg: 'bg-slate-950 text-emerald-400',
    area: 'Askari 5 (Malir Cantt), Karachi',
    zone: 'pechs-malir',
    serviceHired: 'Armed Security Guard (Ex-SSG)',
    rating: 5,
    verifiedDuration: 'Active Client • 1 Year',
    quoteHighlight: 'Vigilant gate management and formal military discipline.',
    reviewText:
      'We engaged HDSP for our bungalow perimeter security in Askari 5. The guard provided is an ex-serviceman with valid weapon verification, sharp vigilance, and respectable etiquette. HDSP handled all Cantonment pass documentation smoothly.',
    verificationBadges: ['Armed License Verified', 'Ex-Military Dossier', 'Police Cleared'],
  },
  {
    id: 't16',
    clientName: 'Farzana & Tariq Lari',
    initials: 'TL',
    avatarBg: 'bg-emerald-900 text-amber-200',
    area: 'KDA Scheme 1 (Karsaz Vicinity)',
    zone: 'pechs-malir',
    serviceHired: 'Full-Time Domestic Helper & Tea Boy',
    rating: 5,
    verifiedDuration: 'Active Client • 7 Months',
    quoteHighlight: 'Honest, hardworking, and takes great pride in household cleanliness.',
    reviewText:
      'Our previous domestic helper left without notice. HDSP replaced him within 36 hours with an exceptionally honest helper whose family resides in Karachi with verifiable addresses. He manages our garden, errands, and house cleaning flawlessly.',
    verificationBadges: ['100% Police Cleared', '3 Local Guarantors', 'Rapid 36h Dispatch'],
  },
  {
    id: 't17',
    clientName: 'Naveed Chughtai (Business Owner)',
    initials: 'NC',
    avatarBg: 'bg-slate-800 text-white',
    area: 'North Nazimabad (Block B)',
    zone: 'bahria-nazimabad',
    serviceHired: 'Full-Time Domestic Helper (Masi)',
    rating: 5,
    verifiedDuration: 'Active Client • 9 Months',
    quoteHighlight: 'No gold or cash worries; full biometric background verification.',
    reviewText:
      'Security is always our main concern when letting domestic staff inside the house. HDSP provided the candidate original CNIC copy, NADRA family tree verification, and local guarantor contacts. She has proven to be 100% trustworthy.',
    verificationBadges: ['NADRA Biometric Cleared', 'Sindh Police Checked', '3 Guarantors'],
  },
  {
    id: 't18',
    clientName: 'Dr. Kamran Siddique (Cardiologist)',
    initials: 'KS',
    avatarBg: 'bg-teal-950 text-emerald-300',
    area: 'DHA Phase 7 Extension, Karachi',
    zone: 'dha-clifton',
    serviceHired: 'Male Elderly Companion & Mobility Assistant',
    rating: 5,
    verifiedDuration: 'Active Client • 1.1 Years',
    quoteHighlight: 'Helped my bedridden uncle regain mobility and morale.',
    reviewText:
      'My uncle required full-time companionship, bathing assistance, and emotional support after hospital discharge. The HDSP attendant has been wonderfully patient, taking him on wheelchair walks every evening. Outstanding service from HDSP.',
    verificationBadges: ['Elderly Care Trained', 'Police Clearance', '24/7 Agency Support'],
  },
  {
    id: 't19',
    clientName: 'Shazia & Owais Lakhani',
    initials: 'OL',
    avatarBg: 'bg-emerald-700 text-white',
    area: 'Civil Lines / Old Clifton, Karachi',
    zone: 'dha-clifton',
    serviceHired: 'Gourmet Pakistani & Continental Master Cook',
    rating: 5,
    verifiedDuration: 'Active Client • 8 Months',
    quoteHighlight: 'Every dinner party was praised; hygienically stores groceries.',
    reviewText:
      'We love entertaining guests on weekends. HDSP connected us with an experienced cook who previously worked in top Karachi clubs. He prepares superb Nihari, Biryani, BBQ, and continental soups with exceptional kitchen tidiness.',
    verificationBadges: ['Culinary Skill Tested', 'Hygienic Kitchen Certified', 'Guarantors Verified'],
  },
  {
    id: 't20',
    clientName: 'Atif Memon (Wholesale Distributor)',
    initials: 'AM',
    avatarBg: 'bg-slate-700 text-emerald-300',
    area: 'Federal B Area (Block 14), Karachi',
    zone: 'bahria-nazimabad',
    serviceHired: 'House Maid & Daily Laundry Helper',
    rating: 5,
    verifiedDuration: 'Active Client • 5 Months',
    quoteHighlight: 'Takes care of large family laundry, ironing, and floor washing.',
    reviewText:
      'We have a joint family of 8 members in FB Area. The maid HDSP provided works quickly and efficiently, washing clothes, ironing school uniforms, and mopping floors without needing reminders. Truly dependable.',
    verificationBadges: ['Police Verified', 'Local Karachi Address', 'Affidavit Signed'],
  },
  {
    id: 't21',
    clientName: 'Mahnoor & Daniyal Alavi',
    initials: 'DA',
    avatarBg: 'bg-emerald-800 text-white',
    area: 'DHA Phase 4 (Commercial Area)',
    zone: 'dha-clifton',
    serviceHired: 'Day Babysitter & Play Nanny',
    rating: 5,
    verifiedDuration: 'Active Client • 6 Months',
    quoteHighlight: 'Engages our toddler in creative games instead of screen time.',
    reviewText:
      'Our 2-year old daughter needed active engagement while we work remotely. The babysitter HDSP deployed is polite, cheerful, reads storybooks, and maintains strict hand sanitization. We could not have asked for a better nanny.',
    verificationBadges: ['Child Safety Vetted', 'NADRA Verified', 'Police Record Checked'],
  },
  {
    id: 't22',
    clientName: 'Prof. Dr. Haroon Rasheed',
    initials: 'HR',
    avatarBg: 'bg-blue-950 text-white',
    area: 'Scheme 33 (Saadi Town Vicinity)',
    zone: 'bahria-nazimabad',
    serviceHired: '24/7 Live-In Attendant for Senior Citizen',
    rating: 5,
    verifiedDuration: 'Active Client • 10 Months',
    quoteHighlight: 'Never leaves patient unattended; manages nighttime medicine alertly.',
    reviewText:
      'Finding live-in medical attendants willing to serve in Scheme 33 was difficult until we reached out to HDSP. Within 48 hours, they arranged an interview with a qualified male caregiver. Their professionalism is unmatched in Karachi.',
    verificationBadges: ['Medical Attendant Cleared', '3 Local Guarantors', 'Police Verified'],
  },
  {
    id: 't23',
    clientName: 'Mrs. Tehmina Durrani',
    initials: 'TD',
    avatarBg: 'bg-teal-900 text-emerald-300',
    area: 'DHA Phase 1 (Near Defence Mall)',
    zone: 'dha-clifton',
    serviceHired: 'Deep Housekeeping & Window Cleaning Maid',
    rating: 5,
    verifiedDuration: 'Active Client • 1 Year',
    quoteHighlight: 'Spotless bathrooms, clean glass partitions, and thorough mopping.',
    reviewText:
      'Since HDSP office is right here in Defence Mall, their service turnaround is instant. The housekeeping helper assigned to us is hardworking, knows how to use modern vacuum cleaners, and keeps our 500-yard bungalow sparkling.',
    verificationBadges: ['Deep Cleaning Trained', 'NADRA Biometrics', 'Police Record Checked'],
  },
  {
    id: 't24',
    clientName: 'Adnan Wahid (Supply Chain Head)',
    initials: 'AW',
    avatarBg: 'bg-slate-900 text-white',
    area: 'Clifton Block 8 (Near Do Talwar)',
    zone: 'dha-clifton',
    serviceHired: 'Office Boy & Outdoor Errand Runner',
    rating: 5,
    verifiedDuration: 'Active Client • 8 Months',
    quoteHighlight: 'Serves executive tea, handles bank deposits, and maintains meeting room.',
    reviewText:
      'We hired an office boy for our regional office in Clifton through HDSP. He is well-groomed, wears clean uniform, prepares excellent chai and green tea for foreign delegates, and handles outdoor courier tasks with accountability.',
    verificationBadges: ['Corporate Etiquette Vetted', 'Police Clearance', '3 Guarantors'],
  },
  {
    id: 't25',
    clientName: 'Saira & Murtaza Hashwani',
    initials: 'SH',
    avatarBg: 'bg-emerald-950 text-amber-300',
    area: 'DHA Phase 5 (Badar Commercial)',
    zone: 'dha-clifton',
    serviceHired: 'Live-In House Maid & Breakfast Cook',
    rating: 5,
    verifiedDuration: 'Active Client • 7 Months',
    quoteHighlight: 'Fresh parathas and omelettes daily with complete household upkeep.',
    reviewText:
      'Both of us have demanding corporate jobs. Waking up to fresh breakfast and returning home to a clean, orderly house has changed our daily life. HDSP contract was transparent with zero hidden agency commissions.',
    verificationBadges: ['Cooking & Maid Cleared', '100% Police Verified', 'Guarantor Bond Signed'],
  },
  {
    id: 't26',
    clientName: 'Mrs. Afshan Junaid',
    initials: 'AJ',
    avatarBg: 'bg-slate-800 text-teal-200',
    area: 'Gulshan-e-Iqbal (Block 7, University Road)',
    zone: 'gulshan-jauhar',
    serviceHired: 'Experienced Female Caregiver & Patient Helper',
    rating: 5,
    verifiedDuration: 'Active Client • 6 Months',
    quoteHighlight: 'Assists my elderly aunt with bathing, medicines, and walking support.',
    reviewText:
      'The attendant is soft-spoken, patient, and very careful with medication timings. HDSP customer care called us twice during the first month to confirm if everything was running smoothly. Outstanding customer commitment.',
    verificationBadges: ['Female Caregiver Vetted', 'Police Records Checked', 'Replacement Warranty'],
  },
  {
    id: 't27',
    clientName: 'Umair Khalid (Fintech VP)',
    initials: 'UK',
    avatarBg: 'bg-emerald-900 text-white',
    area: 'Bahria Town Karachi (Precinct 10)',
    zone: 'bahria-nazimabad',
    serviceHired: 'Dedicated Family Driver for Highway Commutes',
    rating: 5,
    verifiedDuration: 'Active Client • 9 Months',
    quoteHighlight: 'Smooth daily driving on M-9 Motorway with absolute road safety.',
    reviewText:
      'Commuting from Bahria Town to Karachi city center via Super Highway requires a calm, experienced driver. HDSP placed a driver who is extremely cautious, never overtakes recklessly, and knows vehicle electronics well.',
    verificationBadges: ['Highway Tested', 'Sindh Driving License', 'NADRA Verified'],
  },
  {
    id: 't28',
    clientName: 'Dr. Rabia Basri (Gynecologist)',
    initials: 'RB',
    avatarBg: 'bg-teal-800 text-white',
    area: 'PECHS Block 3 (Off Kashmir Road)',
    zone: 'pechs-malir',
    serviceHired: 'Night Nanny for Newborn Care',
    rating: 5,
    verifiedDuration: 'Active Client • 5 Months',
    quoteHighlight: 'Alert night feeds and infant soothing so I could rest after hospital calls.',
    reviewText:
      'As a surgeon on night call, getting proper rest between shifts is vital. The night nurse provided by HDSP handles infant soothing, diaper changes, and burping with medical-level cleanliness. She is completely dependable.',
    verificationBadges: ['Night Shift Trained', 'Police Record Checked', 'NADRA Biometrics'],
  },
  {
    id: 't29',
    clientName: 'Waseem Baig (Customs Clearing Agent)',
    initials: 'WB',
    avatarBg: 'bg-slate-900 text-emerald-400',
    area: 'Gulistan-e-Jauhar (Block 3)',
    zone: 'gulshan-jauhar',
    serviceHired: 'All-Rounder Domestic Maid (Masi)',
    rating: 5,
    verifiedDuration: 'Active Client • 1.1 Years',
    quoteHighlight: 'Dusting, laundry, dishes, and mopping managed with zero supervision.',
    reviewText:
      'We have had the same maid placed by HDSP for over a year now. She is like a permanent part of our home now. HDSP handled all verification renewal documents automatically. The best domestic service agency in Karachi.',
    verificationBadges: ['Long-Term Verified', '3 Registered Guarantors', 'Police Cleared'],
  },
  {
    id: 't30',
    clientName: 'Khurram Parvez (Industrialist)',
    initials: 'KP',
    avatarBg: 'bg-emerald-950 text-white',
    area: 'DHA Phase 6 (Khayaban-e-Rahat)',
    zone: 'dha-clifton',
    serviceHired: '24/7 Estate Security Guard & Gate Attendant',
    rating: 5,
    verifiedDuration: 'Active Client • 1.3 Years',
    quoteHighlight: 'Keeps visitor logs, CCTV monitoring, and handles night gate security.',
    reviewText:
      'For our 1000-sq-yard residence in Rahat, security is non-negotiable. HDSP guards are sharp, alert during late night hours, and properly trained in gate management and emergency protocols. Highly recommended for DHA residents.',
    verificationBadges: ['CCTV & Gate Trained', 'Police Record Checked', 'Guarantors Cleared'],
  },
  {
    id: 't31',
    clientName: 'Begum Parveen Akhtar (Retired Teacher)',
    initials: 'PA',
    avatarBg: 'bg-teal-900 text-amber-200',
    area: 'North Nazimabad (Block L)',
    zone: 'bahria-nazimabad',
    serviceHired: 'Patient Attendant with BP & Sugar Monitoring',
    rating: 5,
    verifiedDuration: 'Active Client • 8 Months',
    quoteHighlight: 'Maintains daily blood pressure log and prepares diabetic meals.',
    reviewText:
      'I live alone as my children reside overseas. The female attendant HDSP dispatched for me is so respectful, prepares light salt-free soups, checks my sugar levels daily, and gives my children complete peace of mind abroad.',
    verificationBadges: ['Diabetic Care Attendant', '100% Police Cleared', 'Overseas Family Coordination'],
  },
  {
    id: 't32',
    clientName: 'Daniyal & Maria Sethi',
    initials: 'MS',
    avatarBg: 'bg-slate-800 text-white',
    area: 'Clifton Block 5 (Behind Schön Circle)',
    zone: 'dha-clifton',
    serviceHired: 'Full-Time Maid & Wardrobe Organizer',
    rating: 5,
    verifiedDuration: 'Active Client • 6 Months',
    quoteHighlight: 'Meticulous clothes pressing, closet organization, and daily deep cleaning.',
    reviewText:
      'Our apartment stays immaculate thanks to the maid placed by HDSP. She handles delicate designer clothes with care, folds laundry neatly, and is consistently honest. Having HDSP backup guarantee removes all hiring anxiety.',
    verificationBadges: ['NADRA Biometric Checked', 'Sindh Police Cleared', '3 Local Guarantors'],
  },
];

interface TestimonialsSectionProps {
  onBookStaff: () => void;
  phoneIntl?: string;
  phoneDisplay?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onBookStaff,
  phoneIntl = '923030230847',
  phoneDisplay = '0303 0230847',
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtered testimonials
  const filteredTestimonials =
    selectedZone === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.zone === selectedZone);

  // Responsive calculation for slider
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet: 2 cards
      } else {
        setVisibleCount(3); // Desktop: 3 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedZone]);

  const maxIndex = Math.max(0, filteredTestimonials.length - visibleCount);

  // Auto-play timer (with pause on hover, no manual pause button UI)
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current && maxIndex > 0) {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-b border-slate-200 relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300/60 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-700"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>30+ Verified Karachi Client Reviews</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Families Across Karachi
          </h2>

          <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-1 urdu-font">
            کراچی کے باوقار خاندانوں کا قابلِ اعتماد اور مصدقہ گھریلو عملہ
          </p>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Read authentic reviews from homeowners across DHA, Clifton, PECHS, Gulshan, Malir Cantt & Bahria Town who rely on HDSP for police-cleared, background-verified domestic staff.
          </p>

          {/* Social Proof Rating Badge */}
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-2xs text-xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-slate-900">4.9 / 5.0 Rating</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">{TESTIMONIALS_DATA.length}+ Verified Karachi Placements</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-emerald-700 font-semibold hidden sm:inline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Police & NADRA Verified
            </span>
          </div>
        </div>

        {/* Karachi Area Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setSelectedZone('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedZone === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>All Karachi ({TESTIMONIALS_DATA.length})</span>
          </button>

          <button
            onClick={() => setSelectedZone('dha-clifton')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedZone === 'dha-clifton'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>DHA & Clifton ({TESTIMONIALS_DATA.filter((t) => t.zone === 'dha-clifton').length})</span>
          </button>

          <button
            onClick={() => setSelectedZone('gulshan-jauhar')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedZone === 'gulshan-jauhar'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Gulshan & Jauhar ({TESTIMONIALS_DATA.filter((t) => t.zone === 'gulshan-jauhar').length})</span>
          </button>

          <button
            onClick={() => setSelectedZone('pechs-malir')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedZone === 'pechs-malir'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>PECHS, KDA & Malir Cantt ({TESTIMONIALS_DATA.filter((t) => t.zone === 'pechs-malir').length})</span>
          </button>

          <button
            onClick={() => setSelectedZone('bahria-nazimabad')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedZone === 'bahria-nazimabad'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Bahria, Nazimabad & FB Area ({TESTIMONIALS_DATA.filter((t) => t.zone === 'bahria-nazimabad').length})</span>
          </button>
        </div>

        {/* Carousel Header Bar with Navigation Arrows (Pause button removed) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-2xs border border-slate-200">
              {filteredTestimonials.length} Verified Reviews in this View
            </span>
            <span className="text-xs text-slate-500 hidden md:inline">
              Hover over any review card to pause auto-scroll
            </span>
          </div>

          {/* Slider Arrows & Counter (NO pause button) */}
          <div className="flex items-center gap-2">
            {/* Previous Slide Button */}
            <button
              onClick={handlePrev}
              title="Previous reviews"
              className="p-2 text-slate-700 hover:text-emerald-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Index Counter */}
            <span className="text-xs font-bold text-slate-700 px-2 min-w-[70px] text-center font-mono">
              {currentIndex + 1}–{Math.min(currentIndex + visibleCount, filteredTestimonials.length)} / {filteredTestimonials.length}
            </span>

            {/* Next Slide Button */}
            <button
              onClick={handleNext}
              title="Next reviews"
              className="p-2 text-slate-700 hover:text-emerald-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Slider Track Container */}
        <div
          className="overflow-hidden rounded-2xl py-2"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          ref={containerRef}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {filteredTestimonials.map((t) => (
              <div
                key={t.id}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:border-emerald-500/50 relative">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-t-full opacity-80" />

                  <div>
                    {/* Header: Avatar, Name, Area & Star Rating */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-inner shrink-0 relative ${t.avatarBg}`}
                        >
                          {t.initials}
                          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </span>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-emerald-900 transition">
                            {t.clientName}
                          </h3>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="font-medium text-emerald-950">{t.area}</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Service Hired Badge & Verified Duration */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                      <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                        {t.serviceHired}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {t.verifiedDuration}
                      </span>
                    </div>

                    {/* Quote Highlight Box */}
                    <div className="bg-slate-50/80 rounded-xl p-3 border-l-3 border-emerald-600 mb-3.5">
                      <p className="text-xs font-semibold text-slate-800 italic leading-snug">
                        "{t.quoteHighlight}"
                      </p>
                    </div>

                    {/* Full Review Text */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                      {t.reviewText}
                    </p>
                  </div>

                  {/* Bottom Verification Badges */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {t.verificationBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-6 mb-10 overflow-x-auto max-w-full py-1">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                title={`Slide to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 bg-emerald-700'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Trust Action Bar */}
        <div className="bg-white border border-emerald-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 hidden sm:flex">
              <Users className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                Join 480+ Satisfied Karachi Families Today
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Receive interviewed candidate CVs with police clearance and NADRA checks within 24 to 48 hours.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onBookStaff}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>Book Verified Staff</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${phoneIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 animate-icon-wiggle" />
              <span>WhatsApp: {phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
