import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, Phone, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "system";
  timestamp: Date;
}

interface Lead {
  name: string;
  phone: string;
  timestamp: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Assalamu Alaikum! Welcome to The Gadget Zone AI Assistant. How can I help you upgrade your lifestyle with smarter tech today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Lead generation states
  const [leadState, setLeadState] = useState<"none" | "ask_name" | "ask_phone">("none");
  const [tempLead, setTempLead] = useState({ name: "", phone: "" });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const saveLead = (name: string, phone: string) => {
    try {
      const existingLeadsRaw = localStorage.getItem("gz_leads");
      const leads: Lead[] = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      leads.push({
        name,
        phone,
        timestamp: new Date().toLocaleString(),
      });
      localStorage.setItem("gz_leads", JSON.stringify(leads));
      console.log("Logged lead:", { name, phone });
    } catch (e) {
      console.error("Failed to save lead:", e);
    }
  };

  const getAIResponse = (
    input: string,
  ): { reply: string; nextState?: "none" | "ask_name" | "ask_phone" } => {
    const text = input.toLowerCase().trim();

    // 1. If currently in lead gen flow
    if (leadState === "ask_name") {
      setTempLead((prev) => ({ ...prev, name: input }));
      return {
        reply: `Thanks, ${input}! Now, please provide your Phone Number so our support team can contact you.`,
        nextState: "ask_phone",
      };
    }

    if (leadState === "ask_phone") {
      const finalName = tempLead.name;
      saveLead(finalName, input);
      setTempLead({ name: "", phone: "" });
      return {
        reply: `Perfect! Thank you, ${finalName}. I've logged your request. Our support team will contact you at ${input} shortly. Is there anything else I can help you with?`,
        nextState: "none",
      };
    }

    // 2. Keyword detection
    if (
      text.includes("price") ||
      text.includes("how much") ||
      text.includes("cost") ||
      text.includes("rs") ||
      text.includes("rate")
    ) {
      return {
        reply:
          "Our premium smartwatches start from Rs. 4,500, earbuds from Rs. 2,900, and gaming headsets from Rs. 3,500. We also offer special discounts of up to 40% on select trending items!",
      };
    }

    if (
      text.includes("delivery") ||
      text.includes("shipping") ||
      text.includes("karachi") ||
      text.includes("pakistan") ||
      text.includes("days") ||
      text.includes("cod")
    ) {
      return {
        reply:
          "We offer Cash on Delivery (COD) across Pakistan! Delivery inside Karachi takes 1-2 business days. For other cities (Lahore, Islamabad, etc.), it takes 3-4 business days. Delivery is FREE for orders above Rs. 5,000!",
      };
    }

    if (
      text.includes("warranty") ||
      text.includes("guarantee") ||
      text.includes("original") ||
      text.includes("authentic") ||
      text.includes("copy")
    ) {
      return {
        reply:
          "All our products are 100% authentic and original brand items (no replicas). We provide a 7-day hassle-free checking warranty and a 6-month product warranty on all premium gadgets.",
      };
    }

    if (
      text.includes("return") ||
      text.includes("refund") ||
      text.includes("exchange") ||
      text.includes("replace")
    ) {
      return {
        reply:
          "We offer a 7-day direct return and exchange policy! If you receive a damaged or incorrect device, just contact our support helpline for a quick exchange/refund.",
      };
    }

    if (
      text.includes("location") ||
      text.includes("shop") ||
      text.includes("where") ||
      text.includes("address") ||
      text.includes("outlet")
    ) {
      return {
        reply:
          "You can visit our outlet at: Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33, Karachi. We're open from 12 PM to 10 PM daily!",
      };
    }

    if (
      text.includes("contact") ||
      text.includes("phone") ||
      text.includes("whatsapp") ||
      text.includes("number") ||
      text.includes("call")
    ) {
      return {
        reply:
          "You can call or WhatsApp our team directly at 0342-0024369 or 0332-2205842. We're here to help!",
      };
    }

    if (
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey") ||
      text.includes("salam") ||
      text.includes("aora") ||
      text.includes("yo")
    ) {
      return {
        reply:
          "Assalamu Alaikum! Welcome back. How can I help you navigate our tech categories or products today?",
      };
    }

    // 3. Default fallback triggers Lead Gen
    return {
      reply:
        "I'd be happy to have our support representative contact you directly to help you with that! Could you please tell me your Name first?",
      nextState: "ask_name",
    };
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking and typing delay
    setTimeout(() => {
      const { reply, nextState } = getAIResponse(userMessage.text);

      if (nextState) {
        setLeadState(nextState);
      }

      const botMessage: Message = {
        id: `msg-${Date.now()}-bot`,
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="zone-ai-assistant"
        className="group fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-royal/30 bg-[#051124] text-white shadow-[0_8px_30px_rgba(98,157,250,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
        aria-label="Toggle AI Assistant"
      >
        {/* Pulsing Ripple Background */}
        <span className="absolute inset-0 rounded-full bg-royal/20 animate-ping opacity-75 group-hover:bg-royal/30" />

        {/* Rotating Outer Tech Ring */}
        <span className="absolute inset-1 rounded-full border border-dashed border-royal/40 animate-[spin_15s_linear_infinite]" />

        {/* Glowing Inner Gradient Sphere */}
        <span className="absolute inset-2 rounded-full bg-gradient-to-tr from-royal via-royal-deep to-[#629dfa] opacity-95 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-inner">
          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
          ) : (
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 2v20M12 12h10M12 12H2M12 12l7-7M12 12L5 5M12 12l7 7M12 12l-7 7"
                  strokeWidth="0.75"
                  strokeOpacity="0.3"
                  strokeDasharray="2,2"
                />
                <path
                  d="M12 4C9.5 4 7.5 5.8 7.5 8c0 1 .5 2 1.2 2.7-.8.5-1.2 1.3-1.2 2.3 0 1.5 1.2 2.8 2.8 2.8.2 0 .4 0 .6-.1.2.6.8 1.1 1.6 1.1.5 0 1-.2 1.3-.6.5.4 1.2.6 1.8.6h.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4c2.5 0 4.5 1.8 4.5 4c0 1-.5 2-1.2 2.7.8.5 1.2 1.3 1.2 2.3 0 1.5-1.2 2.8-2.8 2.8-.2 0-.4 0-.6-.1-.2.6-.8 1.1-1.6 1.1-.5 0-1-.2-1.3-.6-.5.4-1.2.6-1.8.6h-.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="4" r="0.75" fill="#FFC400" className="animate-ping" />
                <circle cx="7.5" cy="8" r="0.75" fill="#FFC400" />
                <circle cx="16.5" cy="8" r="0.75" fill="#FFC400" />
                <circle cx="6.3" cy="13" r="0.75" fill="#629dfa" />
                <circle cx="17.7" cy="13" r="0.75" fill="#629dfa" />
                <circle cx="9.5" cy="17.6" r="0.75" fill="#FFC400" />
                <circle cx="14.5" cy="17.6" r="0.75" fill="#FFC400" />
                <circle cx="12" cy="12" r="1" fill="#fff" />
              </svg>
              <Sparkles className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-[#FFC400] animate-bounce" />
            </div>
          )}
        </span>
        <span className="absolute right-18 scale-0 rounded bg-slate-950/90 border border-white/10 px-3 py-1.5 text-xs font-extrabold text-white transition-all duration-200 group-hover:scale-100 whitespace-nowrap shadow-md">
          Chat with AI Assistant
        </span>
      </button>

      {/* Chat Drawer Window */}
      <div
        id="zone-ai-assistant"
        role="dialog"
        aria-modal="false"
        aria-label="Zone AI Assistant"
        aria-hidden={!isOpen}
        className={`fixed bottom-20 right-4 z-50 flex h-[min(500px,calc(100dvh-6rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#051124]/95 text-white shadow-2xl backdrop-blur-md transition-all duration-500 sm:bottom-24 sm:right-6 sm:w-[380px] ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-royal/50 to-royal-deep/50 px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-royal/20 border border-royal/30 text-[#FFC400]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5.5 w-5.5 text-white animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M12 2v20M12 12h10M12 12H2M12 12l7-7M12 12L5 5M12 12l7 7M12 12l-7 7"
                    strokeWidth="0.75"
                    strokeOpacity="0.3"
                    strokeDasharray="2,2"
                  />
                  <path
                    d="M12 4C9.5 4 7.5 5.8 7.5 8c0 1 .5 2 1.2 2.7-.8.5-1.2 1.3-1.2 2.3 0 1.5 1.2 2.8 2.8 2.8.2 0 .4 0 .6-.1.2.6.8 1.1 1.6 1.1.5 0 1-.2 1.3-.6.5.4 1.2.6 1.8.6h.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 4c2.5 0 4.5 1.8 4.5 4c0 1-.5 2-1.2 2.7.8.5 1.2 1.3 1.2 2.3 0 1.5-1.2 2.8-2.8 2.8-.2 0-.4 0-.6-.1-.2.6-.8 1.1-1.6 1.1-.5 0-1-.2-1.3-.6-.5.4-1.2.6-1.8.6h-.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="4" r="0.75" fill="#FFC400" className="animate-ping" />
                  <circle cx="7.5" cy="8" r="0.75" fill="#FFC400" />
                  <circle cx="16.5" cy="8" r="0.75" fill="#FFC400" />
                  <circle cx="6.3" cy="13" r="0.75" fill="#629dfa" />
                  <circle cx="17.7" cy="13" r="0.75" fill="#629dfa" />
                  <circle cx="9.5" cy="17.6" r="0.75" fill="#FFC400" />
                  <circle cx="14.5" cy="17.6" r="0.75" fill="#FFC400" />
                  <circle cx="12" cy="12" r="1" fill="#fff" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#051124]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-display font-bold text-sm">Zone AI Assistant</h4>
                <Sparkles className="h-3.5 w-3.5 text-[#FFC400]" />
              </div>
              <p className="text-[10px] text-white/50 font-semibold tracking-wide">
                24/7 Smart Support
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close AI Assistant"
            title="Close AI Assistant"
            className="rounded-full h-8 w-8 grid place-items-center bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Message Panel Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {msg.sender !== "user" && (
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-royal/20 border border-royal/30 text-[#FFC400]">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-royal text-white rounded-tr-none shadow-md"
                    : "bg-white/5 border border-white/5 text-white/90 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator bubbles */}
          {isTyping && (
            <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-royal/20 border border-royal/30 text-[#FFC400]">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex gap-1 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* User Input Area */}
        <div className="p-4 border-t border-white/10 bg-slate-950/20 flex gap-2">
          <input
            aria-label="Message for Zone AI Assistant"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              leadState === "ask_name"
                ? "Enter your name..."
                : leadState === "ask_phone"
                  ? "Enter your phone number..."
                  : "Ask about price, delivery, warranty..."
            }
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-royal/50 transition-colors text-white placeholder-white/30"
          />
          <button
            onClick={handleSend}
            className="rounded-xl bg-royal text-primary-foreground px-4 py-2.5 transition-colors hover:bg-royal-deep grid place-items-center shadow-md shadow-royal/10"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
