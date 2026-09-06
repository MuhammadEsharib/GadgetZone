import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ContactForm } from "@/components/ContactForm";
import { useCart } from "@/lib/cartStore";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Truck,
  HelpCircle,
  ExternalLink,
  Navigation,
  Compass,
  ArrowRight,
  Zap,
  Copy,
  Check,
  ChevronDown,
  Headphones,
  Users,
  Store,
  ShieldAlert,
  Package,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Store Location — The Gadget Zone Karachi" },
      {
        name: "description",
        content:
          "Connect with The Gadget Zone support desk in Karachi. Direct WhatsApp 0342 0024369, hotline, store address at Scheme 33, and 24/7 inquiry desk.",
      },
      { property: "og:title", content: "Contact The Gadget Zone — Karachi Support & Storefront" },
      {
        property: "og:description",
        content:
          "Fast customer support, WhatsApp inquiries, and storefront pickup details for The Gadget Zone in Scheme 33, Karachi, Pakistan.",
      },
    ],
  }),
  component: Contact,
});

// FAQ items tailored for the contact page
const QUICK_CONTACT_FAQS = [
  {
    id: "cf-1",
    question: "How fast can I get a response on WhatsApp vs Email?",
    answer:
      "Our WhatsApp support desk (0342 0024369) typically responds within 5 to 15 minutes during business hours (11 AM – 9 PM PKT). Email inquiries submitted through the contact form are reviewed within 2 to 4 hours.",
  },
  {
    id: "cf-2",
    question: "Can I inspect the gadget before purchasing at the Karachi store?",
    answer:
      "Yes! You are welcome to visit our storefront at Shop #B-172, Alhaseeb Residency, Scheme 33, Karachi. Our team will happily unbox and demonstrate the device features before you purchase.",
  },
  {
    id: "cf-3",
    question: "How do I claim a 7-day checking warranty or replacement?",
    answer:
      "Simply shoot a 10-second video of the issue and WhatsApp it to 0342 0024369 along with your order receipt/name. Our claims manager will approve the replacement within 2 hours.",
  },
  {
    id: "cf-4",
    question: "Do you provide Cash on Delivery (COD) for online orders?",
    answer:
      "Yes, we provide 100% Cash on Delivery nationwide across 250+ cities in Pakistan. Karachi deliveries arrive within 24–48 hours, while other cities take 2–4 working days.",
  },
];

function Contact() {
  const { cartCount } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>("Order Inquiry");
  const [openFaq, setOpenFaq] = useState<string | null>("cf-1");
  const pillsScrollRef = useRef<HTMLDivElement>(null);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  // Live store open/closed indicator based on Pakistan Standard Time (UTC+5)
  const storeStatus = useMemo(() => {
    try {
      const now = new Date();
      // PKT is UTC+5
      const pktHours = (now.getUTCHours() + 5) % 24;
      const pktDay = now.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      if (pktDay === 0) {
        return {
          isOpen: false,
          label: "Storefront Closed on Sundays",
          sublabel: "WhatsApp active 24/7",
          color: "text-amber-400 bg-amber-500/10 border-amber-400/20",
          dotColor: "bg-amber-400",
        };
      }

      if (pktHours >= 11 && pktHours < 21) {
        return {
          isOpen: true,
          label: "Storefront Open Now",
          sublabel: "Closes at 9:00 PM PKT",
          color: "text-emerald-400 bg-emerald-500/15 border-emerald-400/30",
          dotColor: "bg-emerald-400",
        };
      }

      return {
        isOpen: false,
        label: "Storefront Currently Closed",
        sublabel: "Opens Mon–Sat at 11:00 AM PKT",
        color: "text-sky-300 bg-sky-500/10 border-sky-400/20",
        dotColor: "bg-sky-400",
      };
    } catch {
      return {
        isOpen: true,
        label: "Storefront Open Mon–Sat",
        sublabel: "11:00 AM – 9:00 PM",
        color: "text-emerald-400 bg-emerald-500/15 border-emerald-400/30",
        dotColor: "bg-emerald-400",
      };
    }
  }, []);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    notify(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollPills = (direction: "left" | "right") => {
    if (pillsScrollRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      pillsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-royal selection:text-white">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* ========================================================================= */}
      {/* HERO SECTION - Exact Height & Royal Gradient matching Shop, Deals, FAQ & About */}
      {/* ========================================================================= */}
      <div
        className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14"
        style={{
          background:
            "linear-gradient(140deg, #081836 0%, #0b2352 20%, #0f357f 45%, #154caa 72%, #1d60d3 100%)",
        }}
      >
        {/* Geometric Grid Texture Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-semibold">Contact &amp; Storefront</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFC400] tracking-tight">
                Get in Touch with Us
              </h1>
              <p className="mt-2 text-white/85 text-xs sm:text-sm max-w-xl leading-relaxed">
                Connect with our Karachi support desk for fast order assistance, 7-day warranty support,
                product advice, or visit our Scheme 33 experience storefront.
              </p>
            </div>

            {/* Live Operational Status Pill */}
            <div className={`flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-md text-xs font-bold w-fit ${storeStatus.color}`}>
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${storeStatus.dotColor}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${storeStatus.dotColor}`} />
              </span>
              <span>{storeStatus.label}</span>
              <span className="text-white/60 font-normal hidden sm:inline">• {storeStatus.sublabel}</span>
            </div>
          </div>

          {/* Quick Anchor Navigation Carousel */}
          <div className="relative mt-8 flex items-center">
            <button
              onClick={() => scrollPills("left")}
              aria-label="Scroll left"
              className="mr-2 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35 transition-all shadow-md active:scale-95 cursor-pointer z-10 sm:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              ref={pillsScrollRef}
              className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar items-center scroll-smooth flex-1"
            >
              {[
                { icon: MessageCircle, label: "WhatsApp Direct Chat", targetId: "contact-matrix" },
                { icon: Send, label: "Send Message Form", targetId: "contact-form-section" },
                { icon: MapPin, label: "Karachi Store & Map", targetId: "store-location-card" },
                { icon: Clock, label: "Business Hours", targetId: "store-location-card" },
                { icon: HelpCircle, label: "Quick FAQs", targetId: "contact-faq-section" },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={idx}
                    href={`#${item.targetId}`}
                    className="inline-flex items-center gap-2 shrink-0 rounded-full bg-white/15 text-white hover:bg-white/25 hover:text-white border border-white/15 px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 hover:scale-105"
                  >
                    <IconComp className="h-3.5 w-3.5 text-gold" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <button
              onClick={() => scrollPills("right")}
              aria-label="Scroll right"
              className="ml-2 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35 transition-all shadow-md active:scale-95 cursor-pointer z-10 sm:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 PRIMARY CONTACT CHANNEL CARDS (LUXURY FLOATING MATRIX)                 */}
      {/* ========================================================================= */}
      <section id="contact-matrix" className="relative -mt-6 z-20 mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: WhatsApp (Primary) */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-card p-5 shadow-xl shadow-emerald-500/5 hover:border-emerald-500 hover:shadow-emerald-500/20 transition-all hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-extrabold text-emerald-600 border border-emerald-500/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  ~5 Min Reply
                </span>
              </div>
              <h3 className="font-display text-base font-extrabold text-foreground">WhatsApp Direct</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Instant answers, live gadget photos, order tracking, and claim requests.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
              <a
                href="https://wa.me/923420024369?text=Hi%20The%20Gadget%20Zone,%20I%20have%20an%20inquiry%20regarding%20products/order"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <span>0342 0024369</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => handleCopy("03420024369", "wa", "WhatsApp number")}
                title="Copy Number"
                className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                {copiedKey === "wa" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Card 2: Phone Hotline */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-5 shadow-xl shadow-black/5 hover:border-royal/40 hover:shadow-royal/10 transition-all hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-royal/10 text-royal border border-royal/20 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-royal/10 px-3 py-1 text-[11px] font-bold text-royal border border-royal/20">
                  Usama Bin Abid
                </span>
              </div>
              <h3 className="font-display text-base font-extrabold text-foreground">Phone Hotline</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Direct phone call with our store management team in Karachi.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
              <a
                href="tel:03420024369"
                className="flex items-center gap-1.5 text-xs font-bold text-royal hover:text-royal-deep transition-colors"
              >
                <span>0342 0024369</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => handleCopy("03420024369", "phone", "Phone number")}
                title="Copy Number"
                className="grid h-7 w-7 place-items-center rounded-lg bg-royal/10 text-royal hover:bg-royal/20 transition-colors cursor-pointer"
              >
                {copiedKey === "phone" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Card 3: Email Desk */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-5 shadow-xl shadow-black/5 hover:border-royal/40 hover:shadow-royal/10 transition-all hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-600 border border-amber-500/20">
                  &lt; 4h Reply
                </span>
              </div>
              <h3 className="font-display text-base font-extrabold text-foreground">Email Inquiries</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                For official billing, wholesale, corporate quotations, and feedback.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
              <a
                href="mailto:thegadgetzone70@gmail.com"
                className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors truncate"
              >
                <span className="truncate">thegadgetzone70@...</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </a>
              <button
                onClick={() => handleCopy("thegadgetzone70@gmail.com", "email", "Email address")}
                title="Copy Email"
                className="grid h-7 w-7 place-items-center rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors cursor-pointer shrink-0"
              >
                {copiedKey === "email" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Card 4: Karachi Storefront */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-5 shadow-xl shadow-black/5 hover:border-purple-500/40 hover:shadow-purple-500/10 transition-all hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-[11px] font-bold text-purple-600 border border-purple-500/20">
                  Scheme 33 Hub
                </span>
              </div>
              <h3 className="font-display text-base font-extrabold text-foreground">Karachi Experience Hub</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Alhaseeb Residency, Sector 18-A, Quetta Town, Scheme 33.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
              <a
                href="https://maps.google.com/?q=Alhaseeb+Residency+Quetta+Town+Sector+18-A+Gulzar-e-Hijri+Scheme+33+Karachi"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
              >
                <span>View on Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="#store-location-card"
                className="grid h-7 w-7 place-items-center rounded-lg bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition-colors"
                title="Store Details"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN SPLIT SECTION: CONTACT FORM + STORE LOCATION & INTERACTIVE MAP      */}
      {/* ========================================================================= */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Form Card with Topic Pill Selector */}
          <div id="contact-form-section" className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-lg shadow-black/5 relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3 py-0.5 text-[11px] font-bold text-royal uppercase tracking-wider">
                    Direct Inquiry Desk
                  </span>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                    Send Us a Message
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    Pick a topic below to auto-customize your inquiry, and our support reps will assist you.
                  </p>
                </div>
                <div className="hidden sm:grid h-14 w-14 place-items-center rounded-2xl bg-royal/10 text-royal border border-royal/15 shrink-0">
                  <Send className="h-6 w-6" />
                </div>
              </div>

              {/* Topic Selector Chips */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-foreground mb-2">
                  Select Inquiry Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Order Status", icon: Package },
                    { label: "Warranty & Replacement", icon: ShieldCheck },
                    { label: "Product Recommendation", icon: Sparkles },
                    { label: "Wholesale & Bulk", icon: Store },
                    { label: "General Feedback", icon: MessageCircle },
                  ].map((topic) => {
                    const IconComp = topic.icon;
                    const isSelected = selectedTopic === topic.label;
                    return (
                      <button
                        key={topic.label}
                        type="button"
                        onClick={() => setSelectedTopic(topic.label)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-royal text-white shadow-md scale-105"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
                        }`}
                      >
                        <IconComp className="h-3 w-3" />
                        <span>{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Contact Form Component */}
              <ContactForm
                selectedTopic={selectedTopic}
                onSuccess={() => setIsSuccessOpen(true)}
              />

              <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>100% Privacy Protected • Zero Spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-royal" />
                  <span>Guaranteed Follow-up within 2–4h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Location, Interactive Google Map & Route Guide */}
          <div id="store-location-card" className="lg:col-span-5 space-y-6">
            {/* Storefront Detail Card */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg shadow-black/5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-0.5 text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                    Storefront &amp; Pickup Hub
                  </span>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-foreground">
                    Karachi Storefront
                  </h3>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  <Store className="h-6 w-6" />
                </div>
              </div>

              {/* Interactive Embedded Google Map */}
              <div className="relative rounded-2xl overflow-hidden border border-border aspect-[16/9] w-full shadow-inner bg-muted">
                <iframe
                  title="The Gadget Zone Store Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.472658514934!2d67.1189421!3d24.9499893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338c037bfb603%3A0x6b772921a221ee90!2sAl%20Haseeb%20Residency!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 z-10">
                  <a
                    href="https://maps.google.com/?q=Alhaseeb+Residency+Quetta+Town+Sector+18-A+Gulzar-e-Hijri+Scheme+33+Karachi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950/90 text-white px-3 py-1.5 text-[11px] font-bold backdrop-blur-md shadow-lg hover:bg-slate-900 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 text-gold" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Physical Store Address
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-foreground leading-relaxed mt-0.5">
                      Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33, Karachi, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 mt-0.5">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Operating Schedule
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                      Mon — Sat: 11:00 AM – 9:00 PM PKT
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Sunday: Storefront Closed (WhatsApp Open 24/7)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mt-0.5">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Express Doorstep Pickup
                    </span>
                    <p className="text-xs font-semibold text-foreground mt-0.5 leading-relaxed">
                      Collect pre-ordered gadgets directly from our store within 1 hour with on-spot device testing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Directions Button */}
              <a
                href="https://maps.google.com/?q=Alhaseeb+Residency+Quetta+Town+Sector+18-A+Gulzar-e-Hijri+Scheme+33+Karachi"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-royal hover:bg-royal-deep text-white py-3.5 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Navigation className="h-4 w-4 text-gold" />
                <span>Navigate via Google Maps</span>
              </a>
            </div>

            {/* Travel Guide Landmark Card */}
            <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-royal/5 via-sky-soft/30 to-background p-6 space-y-3">
              <div className="flex items-center gap-2 text-royal font-bold text-sm">
                <Compass className="h-4.5 w-4.5 text-gold" />
                <h4>Driving Landmarks &amp; Access</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Take the <strong>Gulzar-e-Hijri exit</strong> from Superhighway (M-9) or Lyari Expressway. Turn into Quetta Town Sector 18-A. Customer parking is conveniently located right outside Alhaseeb Residency.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-foreground">
                <div className="rounded-xl bg-card border border-border/70 p-2.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-royal" />
                  <span>3 Mins from M-9 Superhighway</span>
                </div>
                <div className="rounded-xl bg-card border border-border/70 p-2.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>8 Mins from Karachi University</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE FAQ ACCORDION SECTION                                        */}
        {/* ========================================================================= */}
        <section id="contact-faq-section" className="mt-16 sm:mt-20 pt-12 border-t border-border/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/30 px-3 py-0.5 text-[11px] font-bold text-gold-darker uppercase tracking-wider">
                Instant Assistance
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                Frequently Asked Inquiries
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Got quick questions? Tap any topic below for verified answers.
              </p>
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-xs font-bold text-royal hover:text-royal-deep transition-colors group"
            >
              <span>Explore all FAQs &amp; Help Center</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUICK_CONTACT_FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? "border-royal/40 bg-card shadow-md" : "border-border/80 bg-card/60 hover:border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-sm text-foreground cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-royal" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRUST SIGNALS & SERVICE PILLARS                                          */}
        {/* ========================================================================= */}
        <section className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-border/60">
          <div className="rounded-2xl bg-card border border-border/80 p-4 text-center space-y-1">
            <span className="font-display text-2xl font-extrabold text-royal">99.4%</span>
            <p className="text-[11px] font-bold text-foreground">Inquiry Resolution Rate</p>
            <p className="text-[10px] text-muted-foreground">Dedicated support team</p>
          </div>

          <div className="rounded-2xl bg-card border border-border/80 p-4 text-center space-y-1">
            <span className="font-display text-2xl font-extrabold text-emerald-600">&lt; 5 Min</span>
            <p className="text-[11px] font-bold text-foreground">WhatsApp Response</p>
            <p className="text-[10px] text-muted-foreground">Fastest support in Pakistan</p>
          </div>

          <div className="rounded-2xl bg-card border border-border/80 p-4 text-center space-y-1">
            <span className="font-display text-2xl font-extrabold text-amber-500">7 Days</span>
            <p className="text-[11px] font-bold text-foreground">Checking Warranty</p>
            <p className="text-[10px] text-muted-foreground">Replacement guarantee</p>
          </div>

          <div className="rounded-2xl bg-card border border-border/80 p-4 text-center space-y-1">
            <span className="font-display text-2xl font-extrabold text-purple-600">250+</span>
            <p className="text-[11px] font-bold text-foreground">Cities COD Network</p>
            <p className="text-[10px] text-muted-foreground">Doorstep courier delivery</p>
          </div>
        </section>
      </main>

      {/* Success Dialog Overlay */}
      {isSuccessOpen && (
        <Overlay onClose={() => setIsSuccessOpen(false)}>
          <div className="max-w-md p-8 sm:p-10 text-center mx-auto space-y-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-foreground">Message Sent Successfully!</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you for contacting The Gadget Zone. Your message has been routed to our support squad. We will follow up via email or WhatsApp within 2–4 hours.
            </p>
            <button
              onClick={() => setIsSuccessOpen(false)}
              className="mt-4 w-full rounded-full bg-royal px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep cursor-pointer"
            >
              Back to Store
            </button>
          </div>
        </Overlay>
      )}

      <Footer />

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]">
          <CheckCircle2 className="h-4 w-4 text-gold" />
          {toast}
        </div>
      )}
    </div>
  );
}

// Custom overlay modal helper
function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-md rounded-3xl bg-card shadow-[0_30px_70px_-30px_rgba(5,17,36,0.3)] border border-border"
      >
        {children}
      </div>
    </div>
  );
}
