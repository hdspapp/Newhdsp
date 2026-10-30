// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
app.use(express.json());
var ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
var SYSTEM_INSTRUCTION = `You are HDSP Assistant, the official AI customer service and booking representative for "HDSP" (Home Domestic Service Provider), a premier domestic staffing agency based in Karachi, Pakistan.

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
var inquiries = [
  {
    id: "HDSP-KHI-1042",
    name: "Mrs. Farhan Alvi",
    phone: "0300-8291433",
    staffType: "House Maid & Cook",
    workType: "Live-In (24/7)",
    area: "DHA Phase 6, Karachi",
    notes: "Family of 4, Pakistani cooking & general housekeeping",
    createdAt: new Date(Date.now() - 36e5 * 4).toISOString(),
    status: "Staff Shortlisted"
  },
  {
    id: "HDSP-KHI-1043",
    name: "Dr. Tariq Siddiqui",
    phone: "0333-2194850",
    staffType: "Elderly Caregiver / Patient Attendant",
    workType: "Full-Time (12 Hours)",
    area: "Gulshan-e-Iqbal Block 5, Karachi",
    notes: "Bedridden elderly patient care, medication assistance",
    createdAt: new Date(Date.now() - 36e5 * 2).toISOString(),
    status: "Received"
  }
];
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: "Message is required" });
    }
    const contents = [];
    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        });
      }
    } else if (userMessage) {
      contents.push({
        role: "user",
        parts: [{ text: userMessage }]
      });
    }
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7
        }
      });
      const reply = response.text;
      if (reply && reply.trim().length > 0) {
        return res.json({ reply });
      }
    } catch (apiError) {
      console.warn("Gemini API call failed, generating assistant response via HDSP engine:", apiError?.message || apiError);
    }
    const lastMsg = userMessage || messages && messages[messages.length - 1]?.content || "";
    const fallbackReply = generateHdspResponse(lastMsg);
    return res.json({ reply: fallbackReply });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return res.status(500).json({
      error: "Failed to generate assistant response",
      details: err?.message || String(err)
    });
  }
});
function generateHdspResponse(query) {
  const lower = query.toLowerCase();
  const isUrdu = lower.includes("salam") || lower.includes("chahiye") || lower.includes("hoga") || lower.includes("kya") || lower.includes("hai") || lower.includes("kaise") || lower.includes("kitna") || lower.includes("mujhe") || lower.includes("karein");
  if (lower.includes("verif") || lower.includes("police") || lower.includes("cnic") || lower.includes("guarant") || lower.includes("safe") || lower.includes("tasdeeq")) {
    if (isUrdu) {
      return `**HDSP \u06A9\u0627 \u0645\u0644\u0679\u06CC \u0627\u0633\u0679\u06CC\u067E \u062A\u0635\u062F\u06CC\u0642\u06CC \u0648 \u062D\u0641\u0627\u0638\u062A\u06CC \u0646\u0638\u0627\u0645:**

\u0622\u067E \u06A9\u06D2 \u06AF\u06BE\u0631 \u0627\u0648\u0631 \u062E\u0627\u0646\u062F\u0627\u0646 \u06A9\u06CC \u062D\u0641\u0627\u0638\u062A \u06C1\u0645\u0627\u0631\u06CC \u0627\u0648\u0644\u06CC\u0646 \u062A\u0631\u062C\u06CC\u062D \u06C1\u06D2\u06D4 HDSP \u06C1\u0631 \u0627\u0645\u06CC\u062F\u0648\u0627\u0631 \u06A9\u06CC \u0633\u062E\u062A \u0627\u0633\u06A9\u0631\u06CC\u0646\u0646\u06AF \u06A9\u0631\u062A\u0627 \u06C1\u06D2:

- **\u0644\u0627\u0632\u0645\u06CC \u0646\u0627\u062F\u0631\u0627 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688 (CNIC) \u0648 \u0631\u06C1\u0627\u0626\u0634\u06CC \u062A\u0635\u062F\u06CC\u0642:** \u06C1\u0631 \u0627\u0645\u06CC\u062F\u0648\u0627\u0631 \u06A9\u0627 \u0627\u0635\u0644 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688 \u0627\u0648\u0631 \u0645\u0633\u062A\u0642\u0644 \u067E\u062A\u06C1 \u0646\u0627\u062F\u0631\u0627 \u0631\u06CC\u06A9\u0627\u0631\u0688 \u0633\u06D2 \u0686\u06CC\u06A9 \u06A9\u06CC\u0627 \u062C\u0627\u062A\u0627 \u06C1\u06D2\u06D4
- **\u0633\u0646\u062F\u06BE \u067E\u0648\u0644\u06CC\u0633 \u0648 CPLC \u06A9\u0631\u0645\u0646\u0644 \u0631\u06CC\u06A9\u0627\u0631\u0688 \u0686\u06CC\u06A9:** \u0627\u0645\u06CC\u062F\u0648\u0627\u0631 \u06A9\u06D2 \u0646\u0627\u0645 \u067E\u0631 \u06A9\u0633\u06CC \u0628\u06BE\u06CC \u0642\u0633\u0645 \u06A9\u0627 \u06A9\u0631\u0645\u0646\u0644 \u0631\u06CC\u06A9\u0627\u0631\u0688 \u0646\u06C1 \u06C1\u0648\u0646\u06D2 \u06A9\u06CC \u0628\u0627\u0642\u0627\u0639\u062F\u06C1 \u06A9\u0644\u06CC\u0626\u0631\u0646\u0633 \u0644\u06CC \u062C\u0627\u062A\u06CC \u06C1\u06D2\u06D4
- **\u06A9\u0645 \u0627\u0632 \u06A9\u0645 3 \u0645\u0639\u062A\u0628\u0631 \u0636\u0627\u0645\u0646 (3 Guarantors):** \u06C1\u0631 \u0627\u0645\u06CC\u062F\u0648\u0627\u0631 \u06A9\u06D2 3 \u0645\u0642\u0627\u0645\u06CC \u0636\u0627\u0645\u0646\u0648\u06BA \u06A9\u06D2 \u062A\u0635\u062F\u06CC\u0642 \u0634\u062F\u06C1 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688 \u0627\u0648\u0631 \u0631\u0627\u0628\u0637\u06C1 \u0646\u0645\u0628\u0631\u0632 \u0642\u0627\u0646\u0648\u0646\u06CC \u0628\u06CC\u0627\u0646 \u062D\u0644\u0641\u06CC \u06A9\u06D2 \u0633\u0627\u062A\u06BE \u0641\u0627\u0626\u0644 \u0645\u06CC\u06BA \u0634\u0627\u0645\u0644 \u06C1\u0648\u062A\u06D2 \u06C1\u06CC\u06BA\u06D4
- **\u0627\u0646 \u067E\u0631\u0633\u0646 \u0627\u06CC\u0686 \u0622\u0631 \u0627\u0646\u0679\u0631\u0648\u06CC\u0648 (HR Interview):** \u06C1\u0645\u0627\u0631\u06D2 \u0688\u06CC\u0641\u0646\u0633 \u0645\u0627\u0644 \u0622\u0641\u0633 \u0645\u06CC\u06BA \u0627\u0645\u06CC\u062F\u0648\u0627\u0631 \u06A9\u06CC \u0630\u0627\u062A\u06CC \u0635\u0641\u0627\u0626\u06CC\u060C \u0628\u0627\u062A \u0686\u06CC\u062A \u0627\u0648\u0631 \u06C1\u0646\u0631 \u06A9\u0627 \u0639\u0645\u0644\u06CC \u0679\u06CC\u0633\u0679 \u0644\u06CC\u0627 \u062C\u0627\u062A\u0627 \u06C1\u06D2\u06D4
- **\u0645\u062A\u0628\u0627\u062F\u0644 \u06A9\u06CC \u0633\u06C1\u0648\u0644\u062A (Replacement Guarantee):** \u0627\u06AF\u0631 \u0645\u0644\u0627\u0632\u0645 \u0622\u067E \u06A9\u06D2 \u06AF\u06BE\u0631 \u06A9\u06D2 \u0645\u0639\u06CC\u0627\u0631 \u067E\u0631 \u067E\u0648\u0631\u0627 \u0646\u06C1 \u0627\u062A\u0631\u06D2\u060C \u062A\u0648 \u06C1\u0645 \u0641\u0648\u0631\u06CC \u0645\u062A\u0628\u0627\u062F\u0644 \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA\u06D4

\u0645\u0632\u06CC\u062F \u062A\u0641\u0635\u06CC\u0644\u0627\u062A \u06CC\u0627 \u0628\u06A9\u0646\u06AF \u06A9\u06D2 \u0644\u06CC\u06D2 \u0628\u0631\u0627\u06C1 \u06A9\u0631\u0645 \u06C1\u0645\u06CC\u06BA **0303 2632605** \u067E\u0631 \u06A9\u0627\u0644 \u06CC\u0627 \u0648\u0627\u0679\u0633 \u0627\u06CC\u067E \u06A9\u0631\u06CC\u06BA\u060C \u06CC\u0627 \u06C1\u0645\u0627\u0631\u06D2 \u062F\u0641\u062A\u0631 **Office UF-61, Defence Mall, DHA Phase 1, Karachi** \u062A\u0634\u0631\u06CC\u0641 \u0644\u0627\u0626\u06CC\u06BA\u06D4`;
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
  if (lower.includes("cook") || lower.includes("chef") || lower.includes("khana") || lower.includes("bawarchi")) {
    if (isUrdu) {
      return `**HDSP \u06A9\u06A9 \u0648 \u06C1\u0648\u0645 \u0634\u06CC\u0641 \u0633\u0631\u0648\u0633 (\u06A9\u0631\u0627\u0686\u06CC):**

\u06C1\u0645 \u06A9\u0631\u0627\u0686\u06CC \u06A9\u06D2 \u062A\u0645\u0627\u0645 \u0639\u0644\u0627\u0642\u0648\u06BA (DHA\u060C \u06A9\u0644\u0641\u0679\u0646\u060C \u06AF\u0644\u0634\u0646\u060C \u067E\u06CC \u0627\u06CC \u0633\u06CC \u0627\u06CC\u0686 \u0627\u06CC\u0633 \u0648\u063A\u06CC\u0631\u06C1) \u06A9\u06D2 \u0644\u06CC\u06D2 \u062A\u062C\u0631\u0628\u06C1 \u06A9\u0627\u0631 \u06A9\u06A9 \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA:

- **\u0645\u06C1\u0627\u0631\u062A:** \u0631\u0648\u0627\u06CC\u062A\u06CC \u067E\u0627\u06A9\u0633\u062A\u0627\u0646\u06CC \u06A9\u06BE\u0627\u0646\u06D2 (\u0628\u0631\u06CC\u0627\u0646\u06CC\u060C \u0642\u0648\u0631\u0645\u06C1\u060C \u06A9\u0691\u0627\u06C1\u06CC\u060C \u062F\u0627\u0644 \u0633\u0628\u0632\u06CC\u060C \u0631\u0648\u0679\u06CC \u067E\u0631\u0627\u0679\u06BE\u0627)\u060C \u0646\u06CC\u0632 \u0686\u0627\u0626\u0646\u06CC\u0632\u060C \u06A9\u0627\u0646\u0679\u06CC \u0646\u06CC\u0646\u0679\u0644 \u0627\u0648\u0631 \u0688\u0627\u0626\u0679 \u06A9\u06D2 \u0645\u0637\u0627\u0628\u0642 \u06A9\u06BE\u0627\u0646\u0627\u06D4
- **\u06C1\u0627\u0626\u0631\u0646\u06AF \u0622\u067E\u0634\u0646\u0632:**
  - **Live-In (24/7 \u0631\u06C1\u0627\u0626\u0634\u06CC):** Rs. 35,000 \u2013 55,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
  - **Full-Time (8\u201310 \u06AF\u06BE\u0646\u0679\u06D2):** Rs. 30,000 \u2013 45,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
  - **Part-Time (\u0627\u06CC\u06A9 \u06CC\u0627 \u062F\u0648 \u0648\u0642\u062A):** Rs. 18,000 \u2013 28,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
- **\u062A\u0635\u062F\u06CC\u0642:** \u067E\u0648\u0644\u06CC\u0633 \u06A9\u0644\u06CC\u0626\u0631\u0646\u0633\u060C \u0646\u0627\u062F\u0631\u0627 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688 \u0627\u0648\u0631 3 \u0645\u0639\u062A\u0628\u0631 \u0636\u0627\u0645\u0646 \u0644\u0627\u0632\u0645\u06CC\u06D4

\u06A9\u06A9 \u0634\u0627\u0631\u0679 \u0644\u0633\u0679 \u06A9\u0631\u0648\u0627\u0646\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 \u0627\u067E\u0646\u0627 \u0646\u0627\u0645\u060C \u0645\u0637\u0644\u0648\u0628\u06C1 \u0639\u0644\u0627\u0642\u06C1 \u0627\u0648\u0631 \u0627\u0648\u0642\u0627\u062A \u06C1\u0645\u06CC\u06BA **0303 2632605** \u067E\u0631 \u0648\u0627\u0679\u0633 \u0627\u06CC\u067E \u06A9\u0631\u06CC\u06BA \u06CC\u0627 \u0622\u0646 \u0644\u0627\u0626\u0646 \u0641\u0627\u0631\u0645 \u067E\u0631 \u06A9\u0631 \u0644\u06CC\u06BA\u06D4`;
    }
    return `**HDSP Professional Cook & Chef Placement (Karachi):**

We supply experienced, hygienic cooks across all residential areas of Karachi:

- **Cuisine Specialties:** Authentic Pakistani dishes (Biryani, Karahi, Qorma, BBQ, Daal/Sabzi, Roti), plus Chinese, Continental, and special dietary/diabetic meal plans.
- **Work Arrangements & Salary Estimates:**
  - **Live-In (24/7):** Rs. 35,000 \u2013 55,000 / month (with food & lodging)
  - **Full-Time (8\u201310 Hours):** Rs. 30,000 \u2013 45,000 / month
  - **Part-Time (Morning or Evening meals):** Rs. 18,000 \u2013 28,000 / month
- **Screening:** Sindh Police clearance, NADRA CNIC verification, and 3 registered guarantors on file.

Please share your **Full Name, WhatsApp number, and preferred area** or message us directly at **0303 2632605** to schedule interviews!`;
  }
  if (lower.includes("maid") || lower.includes("masi") || lower.includes("clean") || lower.includes("safai") || lower.includes("helper") || lower.includes("bartan")) {
    if (isUrdu) {
      return `**HDSP \u06AF\u06BE\u0631\u06CC\u0644\u0648 \u0645\u0644\u0627\u0632\u0645\u06C1 \u0648 \u0635\u0641\u0627\u0626\u06CC \u0639\u0645\u0644\u06C1 (\u06A9\u0631\u0627\u0686\u06CC):**

\u06C1\u0645 \u06AF\u06BE\u0631 \u06A9\u06CC \u0645\u06A9\u0645\u0644 \u062F\u06CC\u06A9\u06BE \u0628\u06BE\u0627\u0644\u060C \u0635\u0641\u0627\u0626\u06CC\u060C \u062C\u06BE\u0627\u0691\u0648 \u067E\u0648\u0646\u0686\u06BE\u0627\u060C \u0628\u0631\u062A\u0646 \u0627\u0648\u0631 \u06A9\u067E\u0691\u06D2 \u062F\u06BE\u0648\u0646\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 \u0642\u0627\u0628\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0644\u0627\u0632\u0645\u0627\u0626\u06CC\u06BA \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA:

- **\u0630\u0645\u06C1 \u062F\u0627\u0631\u06CC\u0627\u06BA:** \u0631\u0648\u0632\u0627\u0646\u06C1 \u0688\u0633\u0679\u0646\u06AF\u060C \u0641\u0631\u0634 \u067E\u0648\u0646\u0686\u06BE\u0627\u060C \u06A9\u0686\u0646 \u0648 \u0628\u0631\u062A\u0646\u0648\u06BA \u06A9\u06CC \u0635\u0641\u0627\u0626\u06CC\u060C \u0648\u0627\u0634 \u0631\u0648\u0645 \u06A9\u0644\u06CC\u0646\u0646\u06AF\u060C \u0627\u0648\u0631 \u06A9\u067E\u0691\u06D2 \u062F\u06BE\u0648\u0646\u0627\u06D4
- **\u06C1\u0627\u0626\u0631\u0646\u06AF \u06A9\u06CC \u0627\u0642\u0633\u0627\u0645 \u0627\u0648\u0631 \u0645\u062A\u0648\u0642\u0639 \u062A\u0646\u062E\u0648\u0627\u06C1:**
  - **Live-In (24 \u06AF\u06BE\u0646\u0679\u06D2 \u0631\u06C1\u0627\u0626\u0634\u06CC):** Rs. 25,000 \u2013 40,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
  - **Full-Time (8 \u0633\u06D2 10 \u06AF\u06BE\u0646\u0679\u06D2 \u062F\u0646 \u06A9\u0627 \u0648\u0642\u062A):** Rs. 22,000 \u2013 32,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
  - **Part-Time (\u0686\u0646\u062F \u06AF\u06BE\u0646\u0679\u06D2):** Rs. 14,000 \u2013 20,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
- **\u06AF\u0627\u0631\u0646\u0679\u06CC:** \u0646\u0627\u062F\u0631\u0627 \u062A\u0635\u062F\u06CC\u0642\u060C \u067E\u0648\u0644\u06CC\u0633 \u0631\u06CC\u06A9\u0627\u0631\u0688 \u0686\u06CC\u06A9\u060C 3 \u0636\u0627\u0645\u0646 \u0627\u0648\u0631 \u0631\u06CC\u067E\u0644\u06CC\u0633\u0645\u0646\u0679 \u0628\u06CC\u06A9 \u0627\u067E\u06D4

\u0628\u06A9\u0646\u06AF \u06A9\u06D2 \u0644\u06CC\u06D2 \u0627\u067E\u0646\u0627 \u067E\u062A\u06C1 \u0627\u0648\u0631 \u0636\u0631\u0648\u0631\u062A \u06C1\u0645\u06CC\u06BA **0303 2632605** \u067E\u0631 \u0648\u0627\u0679\u0633 \u0627\u06CC\u067E \u06A9\u0631\u06CC\u06BA!`;
    }
    return `**HDSP Verified House Maid & Cleaning Helper (Karachi):**

We provide honest, hardworking domestic maids for general housekeeping across Karachi:

- **Core Responsibilities:** Daily dusting, broom & wet mopping, kitchen sanitation & dishwashing, laundry, and bathroom deep cleaning.
- **Work Options & Market Salary:**
  - **Live-In (24/7 Residential):** Rs. 25,000 \u2013 40,000 / month
  - **Full-Time Day Shifts (8\u201310 Hours):** Rs. 22,000 \u2013 32,000 / month
  - **Part-Time Shifts:** Rs. 14,000 \u2013 20,000 / month
- **Verification:** CNIC verification, Sindh Police verification certificate, and 3 local registered guarantors.

To shortlist suitable candidates today, please call/WhatsApp **0303 2632605** or provide your requirements here!`;
  }
  if (lower.includes("patient") || lower.includes("nurse") || lower.includes("elderly") || lower.includes("care") || lower.includes("bimar") || lower.includes("mareez") || lower.includes("bujurg")) {
    if (isUrdu) {
      return `**HDSP \u067E\u06CC\u0634\u0646\u0679 \u0627\u0679\u06CC\u0646\u0688\u0646\u0679 \u0648 \u06C1\u0648\u0645 \u0646\u0631\u0633\u0646\u06AF \u0633\u0631\u0648\u0633 (\u06A9\u0631\u0627\u0686\u06CC):**

\u06C1\u0645 \u0628\u0632\u0631\u06AF\u0648\u06BA \u0627\u0648\u0631 \u0645\u0631\u06CC\u0636\u0648\u06BA \u06A9\u06D2 \u0644\u06CC\u06D2 \u062A\u0631\u0628\u06CC\u062A \u06CC\u0627\u0641\u062A\u06C1 \u0627\u0648\u0631 \u06C1\u0645\u062F\u0631\u062F \u0645\u06CC\u0644 \u0648 \u0641\u06CC \u0645\u06CC\u0644 \u0627\u0679\u06CC\u0646\u0688\u0646\u0679\u0633 \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA:

- **\u0637\u0628\u06CC \u062E\u062F\u0645\u0627\u062A:** \u0628\u06CC \u067E\u06CC\u060C \u0634\u0648\u06AF\u0631 \u0627\u0648\u0631 \u0646\u0628\u0636 \u0686\u06CC\u06A9 \u06A9\u0631\u0646\u0627\u060C \u0648\u0642\u062A \u067E\u0631 \u0627\u062F\u0648\u06CC\u0627\u062A \u06A9\u06BE\u0644\u0627\u0646\u0627\u060C \u0646\u06CC\u0628\u0648\u0644\u0627\u0626\u0632\u0631\u060C \u06A9\u06CC\u062A\u06BE\u06CC\u0679\u0631\u060C \u0628\u06CC\u0688 \u0633\u0648\u0631 \u0633\u06D2 \u0628\u0686\u0627\u0624\u060C \u0627\u0648\u0631 \u0648\u06C1\u06CC\u0644 \u0686\u06CC\u0626\u0631 \u06A9\u06CC \u0645\u0646\u062A\u0642\u0644\u06CC\u06D4
- **\u0634\u0641\u0679\u06CC\u06BA \u0627\u0648\u0631 \u062A\u0646\u062E\u0648\u0627\u06C1:**
  - **24 \u06AF\u06BE\u0646\u0679\u06D2 \u0644\u0627\u0626\u06CC\u0648 \u0627\u0646 \u0627\u0679\u06CC\u0646\u0688\u0646\u0679:** Rs. 45,000 \u2013 65,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
  - **12 \u06AF\u06BE\u0646\u0679\u06D2 \u0688\u06D2 \u06CC\u0627 \u0646\u0627\u0626\u0679 \u0634\u0641\u0679:** Rs. 35,000 \u2013 48,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1
- **\u062D\u0641\u0627\u0638\u062A\u06CC \u062C\u0627\u0646\u0686:** \u0646\u0627\u062F\u0631\u0627 \u062A\u0635\u062F\u06CC\u0642 \u0634\u062F\u06C1 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688\u060C \u067E\u0648\u0644\u06CC\u0633 \u06A9\u0644\u06CC\u0626\u0631\u0646\u0633 \u0627\u0648\u0631 3 \u0636\u0627\u0645\u0646\u06D4

\u0641\u0648\u0631\u06CC \u0645\u0631\u06CC\u0636 \u06A9\u06CC \u062F\u06CC\u06A9\u06BE \u0628\u06BE\u0627\u0644 \u06A9\u06D2 \u0644\u06CC\u06D2 \u06C1\u0645 \u0633\u06D2 **0303 2632605** \u067E\u0631 \u0631\u0627\u0628\u0637\u06C1 \u06A9\u0631\u06CC\u06BA\u06D4`;
    }
    return `**HDSP Patient Attendant & Elderly Caregiver Service (Karachi):**

We provide experienced male and female patient attendants for post-surgery recovery, stroke, paralysis, and senior care:

- **Care Duties:** Vitals tracking (BP, Sugar, SpO2), strict medication administration, bed-sore prevention & sponge bathing, diaper changing, feeding assistance, and mobility support.
- **Shift Formats & Salary Estimates:**
  - **24-Hour Live-In Patient Care:** Rs. 45,000 \u2013 65,000 / month
  - **12-Hour Day or Night Shifts:** Rs. 35,000 \u2013 48,000 / month
- **Verification Guarantee:** Medical screening, Sindh Police clearance, NADRA CNIC verification, and 3 registered guarantors.

Contact our medical placement coordinator on WhatsApp at **0303 2632605** to arrange an attendant within 24 hours.`;
  }
  if (lower.includes("driver") || lower.includes("gari") || lower.includes("driving")) {
    if (isUrdu) {
      return `**HDSP \u0641\u06CC\u0645\u0644\u06CC \u0648 \u0627\u06CC\u06AF\u0632\u06CC\u06A9\u0679\u0648 \u0688\u0631\u0627\u0626\u06CC\u0648\u0631\u0632 (\u06A9\u0631\u0627\u0686\u06CC):**

\u06C1\u0645 \u0627\u0633\u06A9\u0648\u0644 \u067E\u06A9 \u0627\u06CC\u0646\u0688 \u0688\u0631\u0627\u067E\u060C \u0622\u0641\u0633 \u0627\u0648\u0631 \u0641\u06CC\u0645\u0644\u06CC \u06A9\u06D2 \u0644\u06CC\u06D2 \u0628\u0627\u0627\u062E\u0644\u0627\u0642\u060C \u0644\u0627\u0626\u0633\u0646\u0633 \u06CC\u0627\u0641\u062A\u06C1 \u0688\u0631\u0627\u0626\u06CC\u0648\u0631\u0632 \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA:

- **\u062E\u0635\u0648\u0635\u06CC\u0627\u062A:** \u0648\u06CC\u0644\u0688 \u0688\u0631\u0627\u0626\u06CC\u0648\u0646\u06AF \u0644\u0627\u0626\u0633\u0646\u0633 (LTV/HTV)\u060C \u06A9\u0631\u0627\u0686\u06CC \u06A9\u06D2 \u062A\u0645\u0627\u0645 \u0631\u0648\u0679\u0633 \u0627\u0648\u0631 \u0679\u0631\u06CC\u0641\u06A9 \u0633\u06D2 \u0648\u0627\u0642\u0641\u06CC\u062A\u060C \u0645\u06CC\u0646\u0648\u0626\u0644 \u0627\u0648\u0631 \u0622\u0679\u0648\u0645\u06CC\u0679\u06A9 \u06AF\u0627\u0691\u06CC\u0648\u06BA \u06A9\u0627 \u062A\u062C\u0631\u0628\u06C1\u06D4
- **\u062A\u0646\u062E\u0648\u0627\u06C1:** Full-Time (10\u201312 \u06AF\u06BE\u0646\u0679\u06D2) \u062A\u0642\u0631\u06CC\u0628\u0627\u064B Rs. 30,000 \u2013 48,000 / \u0645\u0627\u06C1\u0627\u0646\u06C1\u06D4
- **\u062D\u0641\u0627\u0638\u062A:** \u067E\u0648\u0644\u06CC\u0633 \u06A9\u0644\u06CC\u0626\u0631\u0646\u0633\u060C \u0646\u0627\u062F\u0631\u0627 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688 \u0627\u0648\u0631 3 \u0645\u0639\u062A\u0628\u0631 \u0636\u0627\u0645\u0646\u06D4

\u0688\u0631\u0627\u0626\u06CC\u0648\u0631 \u06A9\u0627 \u0627\u0646\u0679\u0631\u0648\u06CC\u0648 \u0634\u06CC\u0688\u0648\u0644 \u06A9\u0631\u0646\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 \u06C1\u0645\u06CC\u06BA **0303 2632605** \u067E\u0631 \u06A9\u0627\u0644 \u06CC\u0627 \u0648\u0627\u0679\u0633 \u0627\u06CC\u067E \u06A9\u0631\u06CC\u06BA\u06D4`;
    }
    return `**HDSP Family & Executive Driver Placements (Karachi):**

We provide vetted, polite drivers for children school commutes, office transit, and family travel:

- **Key Qualifications:** Verified LTV/HTV driving license with traffic authorities, defensive driving record, automatic/manual transmission mastery, and Karachi route expertise.
- **Salary Estimate:** Full-Time (10\u201312 Hours): Rs. 30,000 \u2013 48,000 / month.
- **Verification:** Sindh Police verification, NADRA CNIC check, and 3 local guarantors.

Call or WhatsApp **0303 2632605** to review available driver CVs today!`;
  }
  if (lower.includes("address") || lower.includes("office") || lower.includes("location") || lower.includes("kahan") || lower.includes("pata") || lower.includes("timing") || lower.includes("phone") || lower.includes("contact")) {
    return `**HDSP (Home Domestic Service Provider) Contact & Office Details:**

- **Office Address:** Office UF-61, Defence Mall, DHA Phase 1, Karachi, Pakistan.
- **Phone / WhatsApp:** **0303 2632605** (International: +92 303 2632605)
- **Email:** hdsp1285@gmail.com
- **Visiting Timings:** Monday to Saturday: 9:00 AM \u2013 9:00 PM (Emergency WhatsApp booking active 24/7)
- **Coverage Areas:** All Karachi areas (DHA, Clifton, PECHS, Gulshan-e-Iqbal, Gulistan-e-Johar, North Nazimabad, Bahria Town, Scheme 33, Malir, Korangi, Askari).

You are welcome to visit our Defence Mall office to meet and interview candidates in person!`;
  }
  if (isUrdu) {
    return `**\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u06CC\u06A9\u0645! HDSP \u0645\u06CC\u06BA \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F\u06D4**

\u06C1\u0645 \u0622\u067E \u06A9\u0648 \u06A9\u0631\u0627\u0686\u06CC \u06A9\u06D2 \u06A9\u0633\u06CC \u0628\u06BE\u06CC \u0639\u0644\u0627\u0642\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 100% \u062A\u0635\u062F\u06CC\u0642 \u0634\u062F\u06C1 \u06AF\u06BE\u0631\u06CC\u0644\u0648 \u0639\u0645\u0644\u06C1 (\u0645\u0644\u0627\u0632\u0645\u06C1\u060C \u06A9\u06A9\u060C \u0641\u06CC\u0645\u0644\u06CC \u0688\u0631\u0627\u0626\u06CC\u0648\u0631\u060C \u0622\u06CC\u0627 \u0628\u0631\u0627\u0626\u06D2 \u0628\u0686\u06D2\u060C \u0627\u0648\u0631 \u067E\u06CC\u0634\u0646\u0679 \u0627\u0679\u06CC\u0646\u0688\u0646\u0679) \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062A\u06D2 \u06C1\u06CC\u06BA\u06D4

\u06C1\u0645\u0627\u0631\u06D2 \u0639\u0645\u0644\u06D2 \u06A9\u06CC \u062C\u0627\u0646\u0686 \u0645\u06CC\u06BA \u0634\u0627\u0645\u0644 \u06C1\u06D2:
- **\u0646\u0627\u062F\u0631\u0627 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688 \u0627\u0648\u0631 \u067E\u062A\u06D2 \u06A9\u06CC \u062A\u0635\u062F\u06CC\u0642**
- **\u0633\u0646\u062F\u06BE \u067E\u0648\u0644\u06CC\u0633 \u0648 CPLC \u0631\u06CC\u06A9\u0627\u0631\u0688 \u0686\u06CC\u06A9**
- **\u06A9\u0645 \u0627\u0632 \u06A9\u0645 3 \u0645\u0639\u062A\u0628\u0631 \u0636\u0627\u0645\u0646 \u0628\u0645\u0639\u06C1 \u0634\u0646\u0627\u062E\u062A\u06CC \u06A9\u0627\u0631\u0688**
- **\u0645\u062A\u0628\u0627\u062F\u0644 \u06A9\u06CC \u06AF\u0627\u0631\u0646\u0679\u06CC (Replacement Guarantee)**

\u0628\u0631\u0627\u06C1 \u06A9\u0631\u0645 \u06C1\u0645\u06CC\u06BA \u062F\u0631\u062C \u0630\u06CC\u0644 \u062A\u0641\u0635\u06CC\u0644\u0627\u062A \u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u06CC\u06BA \u062A\u0627\u06A9\u06C1 \u06C1\u0645 \u0641\u0648\u0631\u06CC \u0637\u0648\u0631 \u067E\u0631 \u0627\u0645\u06CC\u062F\u0648\u0627\u0631 \u0634\u0627\u0631\u0679 \u0644\u0633\u0679 \u06A9\u0631 \u0633\u06A9\u06CC\u06BA:
1. **\u0622\u067E \u06A9\u0627 \u0646\u0627\u0645**
2. **\u0631\u0627\u0628\u0637\u06C1 / \u0648\u0627\u0679\u0633 \u0627\u06CC\u067E \u0646\u0645\u0628\u0631**
3. **\u0645\u0637\u0644\u0648\u0628\u06C1 \u0639\u0645\u0644\u06C1** (\u0645\u062B\u0644\u0627\u064B \u0645\u0627\u0633\u06CC\u060C \u06A9\u06A9\u060C \u0688\u0631\u0627\u0626\u06CC\u0648\u0631\u060C \u0622\u06CC\u0627\u060C \u0646\u0631\u0633)
4. **\u06A9\u0627\u0645 \u06A9\u06CC \u0646\u0648\u0639\u06CC\u062A** (Full-Time\u060C Part-Time\u060C \u06CC\u0627 Live-In 24 \u06AF\u06BE\u0646\u0679\u06D2)
5. **\u06A9\u0631\u0627\u0686\u06CC \u0645\u06CC\u06BA \u0622\u067E \u06A9\u0627 \u0639\u0644\u0627\u0642\u06C1** (DHA\u060C \u06A9\u0644\u0641\u0679\u0646\u060C \u06AF\u0644\u0634\u0646 \u0648\u063A\u06CC\u0631\u06C1)

\u06CC\u0627 \u0628\u0631\u0627\u06C1 \u0631\u0627\u0633\u062A **0303 2632605** \u067E\u0631 \u0648\u0627\u0679\u0633 \u0627\u06CC\u067E \u06A9\u0631\u06CC\u06BA \u06CC\u0627 \u06C1\u0645\u0627\u0631\u06D2 \u062F\u0641\u062A\u0631 **Office UF-61, Defence Mall, DHA Phase 1, Karachi** \u062A\u0634\u0631\u06CC\u0641 \u0644\u0627\u0626\u06CC\u06BA\u06D4`;
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
app.post("/api/inquiries", (req, res) => {
  try {
    const { name, phone, staffType, workType, area, notes } = req.body;
    if (!name || !phone || !staffType) {
      return res.status(400).json({ error: "Name, phone, and staff required are mandatory" });
    }
    const refId = `HDSP-KHI-${Math.floor(1e3 + Math.random() * 9e3)}`;
    const newInquiry = {
      id: refId,
      name,
      phone,
      staffType,
      workType: workType || "Full-Time",
      area: area || "Karachi",
      notes: notes || "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "Received"
    };
    inquiries.unshift(newInquiry);
    const messageText = `*HDSP Booking Request*
Reference: ${refId}
Name: ${name}
Phone: ${phone}
Staff Needed: ${staffType}
Work Type: ${workType}
Area: ${area}
Notes: ${notes || "None"}

Assalam o Alaikum, I would like to finalize candidate shortlisting for this booking.`;
    const whatsappUrl = `https://wa.me/923032632605?text=${encodeURIComponent(messageText)}`;
    return res.json({
      success: true,
      inquiry: newInquiry,
      whatsappUrl,
      contactPhone: "0303 2632605",
      officeAddress: "Office UF-61, Defence Mall, DHA Phase 1, Karachi, Pakistan"
    });
  } catch (err) {
    console.error("Error saving inquiry:", err);
    return res.status(500).json({ error: "Failed to process inquiry" });
  }
});
app.get("/api/inquiries", (_req, res) => {
  res.json({ inquiries });
});
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HDSP Server running at http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
