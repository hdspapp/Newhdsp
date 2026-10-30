import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  ShieldCheck,
  PhoneCall,
  MapPin,
  Sparkles,
  ExternalLink,
  RotateCcw,
  MessageCircle,
  Copy,
  Check,
  ChevronDown,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/hdspData';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

interface HdspChatAssistantProps {
  initialPrompt?: string;
  onOpenBookingModal?: (prefillRole?: string) => void;
  className?: string;
  isFloating?: boolean;
  onClose?: () => void;
}

const SAMPLE_QUESTIONS = [
  { label: 'Live-In Maid in DHA', prompt: 'I need a 24-hour live-in house maid for my home in DHA Phase 6 Karachi. What is the process and salary?' },
  { label: 'Cook in Clifton', prompt: 'Mujhe Clifton ke liye Pakistani khana banane wala experienced cook chahiye. Kya rates hain?' },
  { label: 'Verification Standards', prompt: 'How does HDSP verify domestic staff? Tell me about your police and CNIC guarantor checks.' },
  { label: 'Patient Attendant / Nurse', prompt: 'We require a 24/7 patient attendant for an elderly bedridden patient in Gulshan-e-Iqbal. Can you provide trained staff?' },
  { label: 'Family Driver', prompt: 'I need a family driver for school pickup and office in PECHS. What are the timings and verification?' },
  { label: 'Office Address & Hours', prompt: 'Where is your Karachi office located and what are your visiting hours?' }
];

export const HdspChatAssistant: React.FC<HdspChatAssistantProps> = ({
  initialPrompt,
  onOpenBookingModal,
  className = '',
  isFloating = false,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Assalam o Alaikum! Welcome to **HDSP (Home Domestic Service Provider)**. 

I am your official AI customer service and booking assistant. We provide **100% verified domestic staff** across all areas of Karachi (DHA, Clifton, Gulshan, PECHS, Bahria Town & more).

Our multi-step verification includes:
- **Mandatory CNIC & Address Verification**
- **Sindh Police Clearance & CPLC record checks**
- **Minimum 3 Registered Guarantors**
- **In-person HR Interviews & Replacement Guarantee**

How can I assist you today? Feel free to ask in **English or Urdu**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMessageId,
        role: 'user',
        content: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation payload for backend server
      const payloadMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          userMessage: textToSend,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || 'Thank you for your message. Please contact us on WhatsApp at 0303 2632605.';

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          content: `I am currently experiencing a minor connection delay. You can connect directly with our recruitment team via WhatsApp or call at **0303 2632605** or visit our office at **Office UF-61, Defence Mall, DHA Phase 1, Karachi**.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Assalam o Alaikum! I'm your HDSP Assistant. How can we help you hire verified domestic staff in Karachi today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to render markdown bolding and bullet points neatly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-1.5 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-2" />;

          // Check if bullet point
          const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
          const cleanLine = isBullet ? line.trim().substring(2) : line;

          // Parse **bold** inside text
          const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

          const parsedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          });

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="flex-1">{parsedLine}</span>
              </div>
            );
          }

          return <p key={idx}>{parsedLine}</p>;
        })}
      </div>
    );
  };

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS_DETAILS.whatsappIntl}?text=${encodeURIComponent(
    'Assalam o Alaikum HDSP, I was consulting with your AI Assistant and would like to proceed with domestic staff booking.'
  )}`;

  return (
    <div
      className={`flex flex-col bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden transition-all ${
        isFloating
          ? isExpanded
            ? 'fixed inset-4 z-50 md:inset-auto md:right-6 md:bottom-6 md:w-[680px] md:h-[650px]'
            : 'fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          : className
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/60 border border-emerald-400/40 flex items-center justify-center text-white shadow-inner">
              <Bot className="w-5 h-5 text-emerald-200" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1">
                HDSP Assistant
                <span className="text-[10px] font-medium bg-emerald-500/40 border border-emerald-400/30 text-emerald-100 px-1.5 py-0.2 rounded-full">
                  Official AI
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-emerald-200/90 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              Verified Staff Booking • Karachi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            title="Reset Conversation"
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-600/40 rounded-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isFloating && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Minimize' : 'Expand'}
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-600/40 rounded-lg transition"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              title="Close chat"
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-600/40 rounded-lg transition"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-emerald-50/80 border-b border-emerald-100/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-900 shrink-0">
        <span className="flex items-center gap-1 font-medium">
          <MapPin className="w-3 h-3 text-emerald-600" />
          Office UF-61, Defence Mall, DHA 1
        </span>
        <a
          href={`tel:${BUSINESS_DETAILS.phoneRaw}`}
          className="flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800"
        >
          <PhoneCall className="w-3 h-3" />
          {BUSINESS_DETAILS.phone}
        </a>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-xs font-bold">
                H
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs relative group ${
                msg.role === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
              }`}
            >
              {msg.role === 'assistant' ? (
                renderFormattedContent(msg.content)
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              )}

              <div
                className={`flex items-center justify-between mt-2 pt-1 border-t text-[10px] ${
                  msg.role === 'user'
                    ? 'border-emerald-600/60 text-emerald-200'
                    : 'border-slate-100 text-slate-400'
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="hover:text-slate-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition"
                    title="Copy text"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <User className="w-4 h-4 text-slate-200" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 items-center">
            <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm text-xs font-bold">
              H
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-slate-500 font-medium ml-2">HDSP Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 pt-2 pb-1 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex gap-1.5 pb-1">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.prompt)}
              disabled={isLoading}
              className="text-xs whitespace-nowrap bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80 transition flex items-center gap-1 disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3 text-emerald-600" />
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direct Booking Quick Bar */}
      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs shrink-0">
        <span className="text-slate-500 font-medium">Ready to hire?</span>
        <div className="flex items-center gap-2">
          {onOpenBookingModal && (
            <button
              onClick={() => onOpenBookingModal()}
              className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Open Booking Form
            </button>
          )}
          <span className="text-slate-300">•</span>
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp: 0303 2632605
          </a>
        </div>
      </div>

      {/* Input box */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your requirement in English or Urdu..."
            disabled={isLoading}
            className="flex-1 bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-emerald-700 hover:bg-emerald-800 text-white p-2.5 rounded-xl disabled:opacity-40 disabled:hover:bg-emerald-700 transition flex items-center justify-center shrink-0 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
