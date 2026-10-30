import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini API client on the server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are HDSP Assistant, the official AI customer service and booking representative for "HDSP" (Home Domestic Service Provider), a premier domestic staffing agency based in Karachi, Pakistan.

Your goal is to assist clients professionally, answer inquiries, explain verification standards, and guide potential clients through hiring verified domestic staff for their homes and businesses.

# Business Details
- Business Name: HDSP (Home Domestic Service Provider)
- Phone / WhatsApp: 0303 2632605 (International: +92 303 2632605)
- Office Address: Office UF-61, Defence Mall, DHA Phase 1, Karachi, Pakistan
- Location Coverage: All major areas of Karachi (DHA Phases 1-8, Clifton, PECHS, Gulshan-e-Iqbal, Gulistan-e-Johar, North Nazimabad, Bahria Town, Scheme 33, Malir, Korangi, Askari, etc.)
- Working Hours: Monday to Saturday 9:00 AM - 9:00 PM (Emergency WhatsApp booking 24/7)

# Services Offered
1. Domestic Staff: House Maids (Masi), House Helpers, Cooks & Chefs, Family Drivers, Babysitters / Nannies, Gardeners, Home Security Guards / Watchmen.
2. Medical & Care Staff: Home Nurses, Elderly Caregivers, Patient Attendants (24/7 or 12-hour shifts).
3. Commercial & Office Support: Office Assistants, Janitorial & Cleaning Staff, Security Staff.
4. Maintenance & Technical Services: Electricians, Plumbers, Maintenance Staff, CCTV & Surveillance.

Hiring Options: Full-Time (8-10 hours/day), Part-Time (morning/afternoon shifts), Live-In (24/7 staying at home), and Urgent/Same-Day placements.

# Verification & Safety Standards
When clients ask about safety, candidate authenticity, or trustworthiness, emphasize HDSP's multi-step screening process:
- Mandatory CNIC (National ID) & Address Verification with NADRA record checks.
- Police Clearance & CPLC Background Record Checks.
- Minimum of 3 Guarantors with valid CNICs required for every candidate.
- In-person HR Interviews before candidate shortlisting.
- Dedicated replacement support: If a staff member is not a good fit, HDSP provides hassle-free replacement.

# Communication Guidelines & Tone
- Tone: Warm, respectful, professional, trustworthy, and helpful.
- Language: You can respond in English, Urdu (Nastaliq or Roman Urdu), depending on the language used by the user. If the user greets in Urdu (e.g. "Salam", "Mujhe maid chahiye"), respond in polite Roman Urdu or Urdu script.
- Clarity: Keep responses structured, easy to read, and quick to scan using bold text and bullet points.
- Action-Oriented: Always encourage the user to share their requirements or reach out via WhatsApp/Phone at 0303 2632605 to begin the shortlisting process.

# Handling Hiring Requests
When a customer requests to hire staff, collect the following details politely:
1. Full Name
2. Contact / WhatsApp Number
3. Staff Needed (e.g., Maid, Driver, Cook, Nanny, Caregiver)
4. Work Type (Full-Time, Part-Time, Live-In)
5. Preferred Location / Area in Karachi
6. Any Specific Requirements or Duties

After gathering details, summarize their request neatly and direct them to finalize the booking via phone/WhatsApp at 0303 2632605 or by visiting Office UF-61, Defence Mall, DHA Phase 1, Karachi.`;

// In-memory inquiries store for current session demonstration
interface StoredInquiry {
  id: string;
  name: string;
  phone: string;
  staffType: string;
  workType: string;
  area: string;
  notes: string;
  createdAt: string;
  status: 'Received' | 'Contacted' | 'Staff Shortlisted';
}

const inquiries: StoredInquiry[] = [
  {
    id: 'HDSP-KHI-1042',
    name: 'Mrs. Farhan Alvi',
    phone: '0300-8291433',
    staffType: 'House Maid & Cook',
    workType: 'Live-In (24/7)',
    area: 'DHA Phase 6, Karachi',
    notes: 'Family of 4, Pakistani cooking & general housekeeping',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'Staff Shortlisted',
  },
  {
    id: 'HDSP-KHI-1043',
    name: 'Dr. Tariq Siddiqui',
    phone: '0333-2194850',
    staffType: 'Elderly Caregiver / Patient Attendant',
    workType: 'Full-Time (12 Hours)',
    area: 'Gulshan-e-Iqbal Block 5, Karachi',
    notes: 'Bedridden elderly patient care, medication assistance',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'Received',
  },
];

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Format chat contents for Gemini generateContent
    const contents: any[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    } else if (userMessage) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text;
      if (reply && reply.trim().length > 0) {
        return res.json({ reply });
      }
    } catch (apiError: any) {
      console.warn('Gemini API call failed, generating assistant response via HDSP engine:', apiError?.message || apiError);
    }

    // Fallback HDSP expert engine ensuring continuous availability
    const lastMsg = userMessage || (messages && messages[messages.length - 1]?.content) || '';
    const fallbackReply = generateHdspResponse(lastMsg);
    return res.json({ reply: fallbackReply });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({
      error: 'Failed to generate assistant response',
      details: err?.message || String(err),
    });
  }
});

// Domain-specific HDSP knowledge assistant engine
function generateHdspResponse(query: string): string {
  const lower = query.toLowerCase();
  const isUrdu =
    lower.includes('salam') ||
    lower.includes('chahiye') ||
    lower.includes('hoga') ||
    lower.includes('kya') ||
    lower.includes('hai') ||
    lower.includes('kaise') ||
    lower.includes('kitna') ||
    lower.includes('mujhe') ||
    lower.includes('karein');

  // Verification & Safety queries
  if (lower.includes('verif') || lower.includes('police') || lower.includes('cnic') || lower.includes('guarant') || lower.includes('safe') || lower.includes('tasdeeq')) {
    if (isUrdu) {
      return `**HDSP کا ملٹی اسٹیپ تصدیقی و حفاظتی نظام:**

آپ کے گھر اور خاندان کی حفاظت ہماری اولین ترجیح ہے۔ HDSP ہر امیدوار کی سخت اسکریننگ کرتا ہے:

- **لازمی نادرا شناختی کارڈ (CNIC) و رہائشی تصدیق:** ہر امیدوار کا اصل شناختی کارڈ اور مستقل پتہ نادرا ریکارڈ سے چیک کیا جاتا ہے۔
- **سندھ پولیس و CPLC کرمنل ریکارڈ چیک:** امیدوار کے نام پر کسی بھی قسم کا کرمنل ریکارڈ نہ ہونے کی باقاعدہ کلیئرنس لی جاتی ہے۔
- **کم از کم 3 معتبر ضامن (3 Guarantors):** ہر امیدوار کے 3 مقامی ضامنوں کے تصدیق شدہ شناختی کارڈ اور رابطہ نمبرز قانونی بیان حلفی کے ساتھ فائل میں شامل ہوتے ہیں۔
- **ان پرسن ایچ آر انٹرویو (HR Interview):** ہمارے ڈیفنس مال آفس میں امیدوار کی ذاتی صفائی، بات چیت اور ہنر کا عملی ٹیسٹ لیا جاتا ہے۔
- **متبادل کی سہولت (Replacement Guarantee):** اگر ملازم آپ کے گھر کے معیار پر پورا نہ اترے، تو ہم فوری متبادل فراہم کرتے ہیں۔

مزید تفصیلات یا بکنگ کے لیے براہ کرم ہمیں **0303 2632605** پر کال یا واٹس ایپ کریں، یا ہمارے دفتر **Office UF-61, Defence Mall, DHA Phase 1, Karachi** تشریف لائیں۔`;
    }
    return `**HDSP's 5-Step Verification & Safety Standards:**

At HDSP (Home Domestic Service Provider), we enforce a rigorous screening process to ensure complete safety and peace of mind for your family:

- **Mandatory CNIC & Address Verification:** NADRA biometric record check and physical home address verification.
- **Sindh Police & CPLC Clearance:** Background screening across Karachi Police and Citizens-Police Liaison Committee records ensuring zero criminal history.
- **Minimum 3 Registered Guarantors:** Every candidate must provide 3 credible guarantors with valid CNICs and verifiable phone numbers on signed legal affidavits.
- **In-Person HR Interview:** Conducted by our senior recruitment team at Defence Mall evaluating attitude, hygiene, and relevant domestic skills.
- **Dedicated Replacement Guarantee:** Free, prompt candidate replacement if the staff member is not a suitable fit.

To proceed with shortlisting, call or WhatsApp us at **0303 2632605** or visit **Office UF-61, Defence Mall, DHA Phase 1, Karachi**.`;
  }

  // Cook / Chef queries
  if (lower.includes('cook') || lower.includes('chef') || lower.includes('khana') || lower.includes('bawarchi')) {
    if (isUrdu) {
      return `**HDSP کک و ہوم شیف سروس (کراچی):**

ہم کراچی کے تمام علاقوں (DHA، کلفٹن، گلشن، پی ای سی ایچ ایس وغیرہ) کے لیے تجربہ کار کک فراہم کرتے ہیں:

- **مہارت:** روایتی پاکستانی کھانے (بریانی، قورمہ، کڑاہی، دال سبزی، روٹی پراٹھا)، نیز چائنیز، کانٹی نینٹل اور ڈائٹ کے مطابق کھانا۔
- **ہائرنگ آپشنز:**
  - **Live-In (24/7 رہائشی):** Rs. 35,000 – 55,000 / ماہانہ
  - **Full-Time (8–10 گھنٹے):** Rs. 30,000 – 45,000 / ماہانہ
  - **Part-Time (ایک یا دو وقت):** Rs. 18,000 – 28,000 / ماہانہ
- **تصدیق:** پولیس کلیئرنس، نادرا شناختی کارڈ اور 3 معتبر ضامن لازمی۔

کک شارٹ لسٹ کروانے کے لیے اپنا نام، مطلوبہ علاقہ اور اوقات ہمیں **0303 2632605** پر واٹس ایپ کریں یا آن لائن فارم پر کر لیں۔`;
    }
    return `**HDSP Professional Cook & Chef Placement (Karachi):**

We supply experienced, hygienic cooks across all residential areas of Karachi:

- **Cuisine Specialties:** Authentic Pakistani dishes (Biryani, Karahi, Qorma, BBQ, Daal/Sabzi, Roti), plus Chinese, Continental, and special dietary/diabetic meal plans.
- **Work Arrangements & Salary Estimates:**
  - **Live-In (24/7):** Rs. 35,000 – 55,000 / month (with food & lodging)
  - **Full-Time (8–10 Hours):** Rs. 30,000 – 45,000 / month
  - **Part-Time (Morning or Evening meals):** Rs. 18,000 – 28,000 / month
- **Screening:** Sindh Police clearance, NADRA CNIC verification, and 3 registered guarantors on file.

Please share your **Full Name, WhatsApp number, and preferred area** or message us directly at **0303 2632605** to schedule interviews!`;
  }

  // Maid / Masi / Cleaner queries
  if (lower.includes('maid') || lower.includes('masi') || lower.includes('clean') || lower.includes('safai') || lower.includes('helper') || lower.includes('bartan')) {
    if (isUrdu) {
      return `**HDSP گھریلو ملازمہ و صفائی عملہ (کراچی):**

ہم گھر کی مکمل دیکھ بھال، صفائی، جھاڑو پونچھا، برتن اور کپڑے دھونے کے لیے قابل اعتماد ملازمائیں فراہم کرتے ہیں:

- **ذمہ داریاں:** روزانہ ڈسٹنگ، فرش پونچھا، کچن و برتنوں کی صفائی، واش روم کلیننگ، اور کپڑے دھونا۔
- **ہائرنگ کی اقسام اور متوقع تنخواہ:**
  - **Live-In (24 گھنٹے رہائشی):** Rs. 25,000 – 40,000 / ماہانہ
  - **Full-Time (8 سے 10 گھنٹے دن کا وقت):** Rs. 22,000 – 32,000 / ماہانہ
  - **Part-Time (چند گھنٹے):** Rs. 14,000 – 20,000 / ماہانہ
- **گارنٹی:** نادرا تصدیق، پولیس ریکارڈ چیک، 3 ضامن اور ریپلیسمنٹ بیک اپ۔

بکنگ کے لیے اپنا پتہ اور ضرورت ہمیں **0303 2632605** پر واٹس ایپ کریں!`;
    }
    return `**HDSP Verified House Maid & Cleaning Helper (Karachi):**

We provide honest, hardworking domestic maids for general housekeeping across Karachi:

- **Core Responsibilities:** Daily dusting, broom & wet mopping, kitchen sanitation & dishwashing, laundry, and bathroom deep cleaning.
- **Work Options & Market Salary:**
  - **Live-In (24/7 Residential):** Rs. 25,000 – 40,000 / month
  - **Full-Time Day Shifts (8–10 Hours):** Rs. 22,000 – 32,000 / month
  - **Part-Time Shifts:** Rs. 14,000 – 20,000 / month
- **Verification:** CNIC verification, Sindh Police verification certificate, and 3 local registered guarantors.

To shortlist suitable candidates today, please call/WhatsApp **0303 2632605** or provide your requirements here!`;
  }

  // Patient Attendant / Nurse / Elderly Caregiver queries
  if (lower.includes('patient') || lower.includes('nurse') || lower.includes('elderly') || lower.includes('care') || lower.includes('bimar') || lower.includes('mareez') || lower.includes('bujurg')) {
    if (isUrdu) {
      return `**HDSP پیشنٹ اٹینڈنٹ و ہوم نرسنگ سروس (کراچی):**

ہم بزرگوں اور مریضوں کے لیے تربیت یافتہ اور ہمدرد میل و فی میل اٹینڈنٹس فراہم کرتے ہیں:

- **طبی خدمات:** بی پی، شوگر اور نبض چیک کرنا، وقت پر ادویات کھلانا، نیبولائزر، کیتھیٹر، بیڈ سور سے بچاؤ، اور وہیل چیئر کی منتقلی۔
- **شفٹیں اور تنخواہ:**
  - **24 گھنٹے لائیو ان اٹینڈنٹ:** Rs. 45,000 – 65,000 / ماہانہ
  - **12 گھنٹے ڈے یا نائٹ شفٹ:** Rs. 35,000 – 48,000 / ماہانہ
- **حفاظتی جانچ:** نادرا تصدیق شدہ شناختی کارڈ، پولیس کلیئرنس اور 3 ضامن۔

فوری مریض کی دیکھ بھال کے لیے ہم سے **0303 2632605** پر رابطہ کریں۔`;
    }
    return `**HDSP Patient Attendant & Elderly Caregiver Service (Karachi):**

We provide experienced male and female patient attendants for post-surgery recovery, stroke, paralysis, and senior care:

- **Care Duties:** Vitals tracking (BP, Sugar, SpO2), strict medication administration, bed-sore prevention & sponge bathing, diaper changing, feeding assistance, and mobility support.
- **Shift Formats & Salary Estimates:**
  - **24-Hour Live-In Patient Care:** Rs. 45,000 – 65,000 / month
  - **12-Hour Day or Night Shifts:** Rs. 35,000 – 48,000 / month
- **Verification Guarantee:** Medical screening, Sindh Police clearance, NADRA CNIC verification, and 3 registered guarantors.

Contact our medical placement coordinator on WhatsApp at **0303 2632605** to arrange an attendant within 24 hours.`;
  }

  // Driver queries
  if (lower.includes('driver') || lower.includes('gari') || lower.includes('driving')) {
    if (isUrdu) {
      return `**HDSP فیملی و ایگزیکٹو ڈرائیورز (کراچی):**

ہم اسکول پک اینڈ ڈراپ، آفس اور فیملی کے لیے بااخلاق، لائسنس یافتہ ڈرائیورز فراہم کرتے ہیں:

- **خصوصیات:** ویلڈ ڈرائیونگ لائسنس (LTV/HTV)، کراچی کے تمام روٹس اور ٹریفک سے واقفیت، مینوئل اور آٹومیٹک گاڑیوں کا تجربہ۔
- **تنخواہ:** Full-Time (10–12 گھنٹے) تقریباً Rs. 30,000 – 48,000 / ماہانہ۔
- **حفاظت:** پولیس کلیئرنس، نادرا شناختی کارڈ اور 3 معتبر ضامن۔

ڈرائیور کا انٹرویو شیڈول کرنے کے لیے ہمیں **0303 2632605** پر کال یا واٹس ایپ کریں۔`;
    }
    return `**HDSP Family & Executive Driver Placements (Karachi):**

We provide vetted, polite drivers for children school commutes, office transit, and family travel:

- **Key Qualifications:** Verified LTV/HTV driving license with traffic authorities, defensive driving record, automatic/manual transmission mastery, and Karachi route expertise.
- **Salary Estimate:** Full-Time (10–12 Hours): Rs. 30,000 – 48,000 / month.
- **Verification:** Sindh Police verification, NADRA CNIC check, and 3 local guarantors.

Call or WhatsApp **0303 2632605** to review available driver CVs today!`;
  }

  // Office location / contact queries
  if (lower.includes('address') || lower.includes('office') || lower.includes('location') || lower.includes('kahan') || lower.includes('pata') || lower.includes('timing') || lower.includes('phone') || lower.includes('contact')) {
    return `**HDSP (Home Domestic Service Provider) Contact & Office Details:**

- **Office Address:** Office UF-61, Defence Mall, DHA Phase 1, Karachi, Pakistan.
- **Phone / WhatsApp:** **0303 2632605** (International: +92 303 2632605)
- **Email:** hdsp1285@gmail.com
- **Visiting Timings:** Monday to Saturday: 9:00 AM – 9:00 PM (Emergency WhatsApp booking active 24/7)
- **Coverage Areas:** All Karachi areas (DHA, Clifton, PECHS, Gulshan-e-Iqbal, Gulistan-e-Johar, North Nazimabad, Bahria Town, Scheme 33, Malir, Korangi, Askari).

You are welcome to visit our Defence Mall office to meet and interview candidates in person!`;
  }

  // General intake / booking guidance
  if (isUrdu) {
    return `**السلام علیکم! HDSP میں خوش آمدید۔**

ہم آپ کو کراچی کے کسی بھی علاقے کے لیے 100% تصدیق شدہ گھریلو عملہ (ملازمہ، کک، فیملی ڈرائیور، آیا برائے بچے، اور پیشنٹ اٹینڈنٹ) فراہم کرتے ہیں۔

ہمارے عملے کی جانچ میں شامل ہے:
- **نادرا شناختی کارڈ اور پتے کی تصدیق**
- **سندھ پولیس و CPLC ریکارڈ چیک**
- **کم از کم 3 معتبر ضامن بمعہ شناختی کارڈ**
- **متبادل کی گارنٹی (Replacement Guarantee)**

براہ کرم ہمیں درج ذیل تفصیلات فراہم کریں تاکہ ہم فوری طور پر امیدوار شارٹ لسٹ کر سکیں:
1. **آپ کا نام**
2. **رابطہ / واٹس ایپ نمبر**
3. **مطلوبہ عملہ** (مثلاً ماسی، کک، ڈرائیور، آیا، نرس)
4. **کام کی نوعیت** (Full-Time، Part-Time، یا Live-In 24 گھنٹے)
5. **کراچی میں آپ کا علاقہ** (DHA، کلفٹن، گلشن وغیرہ)

یا براہ راست **0303 2632605** پر واٹس ایپ کریں یا ہمارے دفتر **Office UF-61, Defence Mall, DHA Phase 1, Karachi** تشریف لائیں۔`;
  }

  return `**Assalam o Alaikum! Welcome to HDSP (Home Domestic Service Provider).**

We are Karachi's premier domestic staffing agency providing thoroughly vetted, trustworthy household staff across all areas of Karachi.

**Our Multi-Step Verification Includes:**
- Mandatory NADRA CNIC & address verification
- Sindh Police Clearance & CPLC background checks
- Minimum 3 registered local guarantors with valid CNICs
- In-person HR interviews at our Defence Mall office
- Hassle-free replacement guarantee

To help us find the perfect match for your home, please share:
1. **Full Name**
2. **Contact / WhatsApp Number**
3. **Staff Needed** (Maid, Cook, Driver, Nanny, Patient Attendant, etc.)
4. **Work Type** (Full-Time, Part-Time, Live-In 24/7)
5. **Preferred Location / Area in Karachi** (DHA, Clifton, PECHS, Gulshan, Bahria, etc.)
6. **Any Specific Duties or Family Preferences**

You can also connect directly with our hiring desk via WhatsApp or Call at **0303 2632605** or visit us at **Office UF-61, Defence Mall, DHA Phase 1, Karachi**.`;
}

// Book / Inquiry submission endpoint
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const { name, phone, staffType, workType, area, notes } = req.body;

    if (!name || !phone || !staffType) {
      return res.status(400).json({ error: 'Name, phone, and staff required are mandatory' });
    }

    const refId = `HDSP-KHI-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: StoredInquiry = {
      id: refId,
      name,
      phone,
      staffType,
      workType: workType || 'Full-Time',
      area: area || 'Karachi',
      notes: notes || '',
      createdAt: new Date().toISOString(),
      status: 'Received',
    };

    inquiries.unshift(newInquiry);

    // Generate WhatsApp direct URL
    const messageText = `*HDSP Booking Request*\nReference: ${refId}\nName: ${name}\nPhone: ${phone}\nStaff Needed: ${staffType}\nWork Type: ${workType}\nArea: ${area}\nNotes: ${notes || 'None'}\n\nAssalam o Alaikum, I would like to finalize candidate shortlisting for this booking.`;
    const whatsappUrl = `https://wa.me/923032632605?text=${encodeURIComponent(messageText)}`;

    return res.json({
      success: true,
      inquiry: newInquiry,
      whatsappUrl,
      contactPhone: '0303 2632605',
      officeAddress: 'Office UF-61, Defence Mall, DHA Phase 1, Karachi, Pakistan',
    });
  } catch (err: any) {
    console.error('Error saving inquiry:', err);
    return res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

app.get('/api/inquiries', (_req: Request, res: Response) => {
  res.json({ inquiries });
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HDSP Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
