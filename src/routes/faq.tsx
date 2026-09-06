import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import {
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Truck,
  CreditCard,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Zap,
  Package,
  Layers,
  Headphones,
  SlidersHorizontal,
  X,
  LayoutGrid,
} from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { useCart } from "@/lib/cartStore";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Help Center & FAQs — The Gadget Zone" },
      {
        name: "description",
        content:
          "Find quick, transparent answers about Cash on Delivery (COD), EasyPaisa, Karachi express delivery, nationwide shipping across Pakistan, 7-day warranty, and authentic smart tech at The Gadget Zone.",
      },
      { property: "og:title", content: "FAQs & Support — The Gadget Zone" },
      {
        property: "og:description",
        content:
          "Everything you need to know about ordering, shipping, payments, and warranties across Pakistan.",
      },
    ],
  }),
  component: FaqPage,
});

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  badge?: string;
  highlight?: string;
}

const FAQ_CATEGORIES = [
  { id: "all", name: "All FAQs", icon: LayoutGrid },
  { id: "shipping", name: "Orders & Shipping", icon: Truck },
  { id: "payment", name: "Payments & COD", icon: CreditCard },
  { id: "warranty", name: "Warranty & Returns", icon: ShieldCheck },
  { id: "quality", name: "Authenticity & Products", icon: Sparkles },
  { id: "karachi", name: "Karachi Express", icon: Zap },
];

const FAQ_DATA: FaqItem[] = [
  // 1. Orders & Shipping
  {
    id: "ship-1",
    category: "shipping",
    badge: "Delivery Timeline",
    question: "How long does delivery take across Pakistan?",
    answer:
      "For customers in Karachi, orders are usually delivered within 24 to 48 hours directly from our Scheme 33 fulfillment hub. For all other cities in Pakistan (Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Multan, Quetta, etc.), delivery takes 2 to 4 business days via registered courier services like Trax, Leopards, and TCS.",
    highlight: "Karachi: 24-48 Hours | Nationwide: 2-4 Business Days",
  },
  {
    id: "ship-2",
    category: "shipping",
    badge: "Delivery Charges",
    question: "What are the shipping charges for orders?",
    answer:
      "We offer special flat-rate delivery of Rs. 200 for standard orders across all of Pakistan. Furthermore, all promotional bundles or high-value orders above Rs. 15,000 qualify for 100% FREE nationwide home delivery.",
    highlight: "Flat Rs. 200 standard shipping | FREE above Rs. 15,000",
  },
  {
    id: "ship-3",
    category: "shipping",
    badge: "Order Tracking",
    question: "How can I track the live status of my parcel?",
    answer:
      "As soon as your package is dispatched from our Karachi hub, you will receive an SMS and WhatsApp message with your tracking ID. You can also view your live order updates on our storefront 'Track Order' page or WhatsApp our team at 0342 0024369 anytime with your 4-digit Order ID.",
  },
  {
    id: "ship-4",
    category: "shipping",
    badge: "Safe Transit",
    question: "How are delicate gadgets packaged for transit?",
    answer:
      "Every electronic device is secured in multi-layered impact-absorbing bubble wrap, placed inside heavy-duty corrugated cardboard boxes, and sealed with tamper-evident security tape to ensure safe arrival without any transit shock.",
  },

  // 2. Payments & COD
  {
    id: "pay-1",
    category: "payment",
    badge: "Payment Methods",
    question: "Is Cash on Delivery (COD) available in my city?",
    answer:
      "Yes! Cash on Delivery (COD) is available in over 250+ cities, towns, and districts throughout Pakistan. You only pay the courier representative at your doorstep when the parcel arrives.",
    highlight: "COD available nationwide with zero advance payment needed",
  },
  {
    id: "pay-2",
    category: "payment",
    badge: "Mobile Wallets",
    question: "Can I pay using EasyPaisa, JazzCash, or Direct Bank Transfer?",
    answer:
      "Yes, we fully support instant payments via EasyPaisa, JazzCash, and 1Link Online Bank Transfer. When selecting EasyPaisa/JazzCash at checkout, you will receive our verified merchant account details, and orders with advance payment receive prioritized priority dispatch.",
    highlight: "EasyPaisa & JazzCash payments receive priority packing",
  },
  {
    id: "pay-3",
    category: "payment",
    badge: "Receipts & Invoice",
    question: "Will I receive a formal bill/invoice with my order?",
    answer:
      "Yes, an itemized invoice containing your order reference number, product names, warranty terms, and total breakdown is included inside your delivery parcel as well as stored in your online account receipt.",
  },

  // 3. Warranty & Returns
  {
    id: "war-1",
    category: "warranty",
    badge: "Checking Warranty",
    question: "What is your 7-Day Checking & Replacement Warranty?",
    answer:
      "Every item sold at The Gadget Zone comes backed with our transparent 7-Day Checking & Replacement Warranty. If you discover any manufacturing defect, battery issue, or functional problem within 7 days of receiving your package, we provide a hassle-free replacement.",
    highlight: "7-Day No-Hassle Checking & Replacement Coverage",
  },
  {
    id: "war-2",
    category: "warranty",
    badge: "Claims Process",
    question: "How do I claim a warranty or request a replacement?",
    answer:
      "Simply send a WhatsApp message to 0342 0024369 with your Order ID along with a short 10-second video demonstrating the defect. Our support squad will inspect the issue within 2 hours and coordinate a doorstep exchange or return pickup.",
  },
  {
    id: "war-3",
    category: "warranty",
    badge: "Damaged Package",
    question: "What should I do if the parcel box arrives damaged?",
    answer:
      "Please inspect the exterior packaging upon courier arrival. If the box appears torn or tampered with, take a photo and immediately notify our WhatsApp support desk before opening so we can record courier claims instantly.",
  },

  // 4. Authenticity & Products
  {
    id: "qua-1",
    category: "quality",
    badge: "100% Genuine",
    question: "Are all smart gadgets brand new and authentic?",
    answer:
      "Absolutely. We only stock 100% authentic, brand-new, factory-sealed gadgets. We strictly reject counterfeit replicas, clones, or refurbished goods. What you see described with technical specifications is exactly what you receive in original manufacturer packaging.",
    highlight: "Strict zero-replica policy • Factory fresh original boxes",
  },
  {
    id: "qua-2",
    category: "quality",
    badge: "Compatibility",
    question: "Are the smartwatches and wireless earbuds compatible with iPhone and Android?",
    answer:
      "Yes! All our wireless earbuds, Bluetooth headphones, and smartwatches feature universal Bluetooth 5.0+ connectivity and work seamlessly across Apple iOS (iPhone/iPad) and Android smartphones (Samsung, Xiaomi, Vivo, Oppo, Realme, Infinix, Tecno, etc.).",
  },
  {
    id: "qua-3",
    category: "quality",
    badge: "Setup Assistance",
    question: "Can your team help me connect and set up my new smartwatch or earbuds?",
    answer:
      "Yes! If you need assistance downloading companion apps (like FitPro, Wearfit, DaFit), pairing Bluetooth, or adjusting equalizer settings, our Karachi tech squad is happy to guide you step-by-step via WhatsApp voice or video chat.",
  },

  // 5. Karachi Express Delivery
  {
    id: "khi-1",
    category: "karachi",
    badge: "Karachi Hub",
    question: "Can I get same-day urgent delivery in Karachi?",
    answer:
      "Yes! For orders placed before 2:00 PM within Karachi (Scheme 33, Gulshan-e-Iqbal, Johar, North Nazimabad, Malir, DHA, Clifton, etc.), we can arrange same-day express courier dispatch upon request. Contact our WhatsApp support desk after placing your order to request priority dispatch.",
    highlight: "Same-Day dispatch available for Karachi orders before 2:00 PM",
  },
  {
    id: "khi-2",
    category: "karachi",
    badge: "Self-Pickup",
    question: "Can I collect my order in person from your Karachi center?",
    answer:
      "Yes, customer self-collection is available by prior appointment from our hub in Gulzar-e-Hijri, Scheme 33, Karachi. Please message us on WhatsApp after ordering to schedule your convenient pickup slot.",
  },
];

function FaqPage() {
  const { cartCount } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<string[]>(["ship-1", "pay-1", "war-1"]);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, "yes" | "no">>({});
  const pillsScrollRef = useRef<HTMLDivElement>(null);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timeout);
  }, [toast]);

  // Scroll category pills
  const scrollPills = (direction: "left" | "right") => {
    if (pillsScrollRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      pillsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Toggle open accordion item
  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Expand all or collapse all
  const expandAll = () => {
    setOpenItems(filteredFaqs.map((f) => f.id));
  };
  const collapseAll = () => {
    setOpenItems([]);
  };

  // Handle feedback rating
  const handleFeedback = (faqId: string, type: "yes" | "no") => {
    setHelpfulFeedback((prev) => ({ ...prev, [faqId]: type }));
    notify(type === "yes" ? "Thanks for your feedback! 😊" : "Feedback noted. We'll improve this answer! 👍");
  };

  // Filtered FAQ calculation
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query)) ||
        (item.highlight && item.highlight.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-royal selection:text-white">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* ========================================================================= */}
      {/* HERO SECTION - Exact Height & Layout matching Shop & Deals Pages          */}
      {/* ========================================================================= */}
      <div
        className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14"
        style={{
          background:
            "linear-gradient(140deg, #081836 0%, #0b2352 20%, #0f357f 45%, #154caa 72%, #1d60d3 100%)",
        }}
      >
        {/* Grid Texture Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-semibold">Help Center &amp; FAQs</span>
            {activeCategory !== "all" && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-gold font-bold">
                  {FAQ_CATEGORIES.find((c) => c.id === activeCategory)?.name}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFC400] tracking-tight">
                {activeCategory === "all"
                  ? "Frequently Asked Questions"
                  : `${FAQ_CATEGORIES.find((c) => c.id === activeCategory)?.name} FAQs`}
              </h1>
              <p className="mt-2 text-white/85 text-xs sm:text-sm max-w-xl leading-relaxed">
                Quick, transparent answers regarding Cash on Delivery, EasyPaisa, Karachi express shipping, 7-day checking warranties, and genuine smart tech.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md text-white text-xs font-bold w-fit">
              <Sparkles className="h-4 w-4 text-gold" />
              <span>{FAQ_DATA.length} Verified Answers Available</span>
            </div>
          </div>

          {/* Integrated Category Pills Carousel - Same exact pattern as Shop page */}
          <div className="relative mt-8 flex items-center">
            <button
              onClick={() => scrollPills("left")}
              aria-label="Scroll categories left"
              className="mr-2 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35 transition-all shadow-md active:scale-95 cursor-pointer z-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              ref={pillsScrollRef}
              className="flex gap-2 overflow-x-auto pb-1 no-scrollbar items-center scroll-smooth flex-1"
            >
              {FAQ_CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = activeCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? FAQ_DATA.length
                    : FAQ_DATA.filter((f) => f.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gold text-slate-950 shadow-md scale-105 font-extrabold"
                        : "bg-white/15 text-white hover:bg-white/25 hover:text-white border border-white/15"
                    }`}
                  >
                    <IconComp className={`h-3.5 w-3.5 ${isSelected ? "text-slate-950" : "text-white"}`} />
                    <span>{cat.name}</span>
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                        isSelected ? "bg-slate-950/15 text-slate-950" : "bg-white/20 text-white"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollPills("right")}
              aria-label="Scroll categories right"
              className="ml-2 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35 transition-all shadow-md active:scale-95 cursor-pointer z-10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEARCH COMMAND & CONTROLS BAR                                             */}
      {/* ========================================================================= */}
      <div className="border-b border-border/80 bg-card/60 backdrop-blur-md sticky top-0 z-30 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic (e.g. COD, Trax, Warranty, EasyPaisa, Karachi)..."
              className="w-full rounded-2xl border border-border bg-background pl-10 pr-9 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-royal focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                title="Clear"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Expand / Collapse & Question Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-muted-foreground font-semibold shrink-0">
            <span className="text-[11px] font-bold text-royal bg-sky-soft px-2.5 py-1 rounded-full">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? "Question" : "Questions"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={expandAll}
                className="hover:text-royal transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-sky-soft/40"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                onClick={collapseAll}
                className="hover:text-royal transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-sky-soft/40"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN BODY: Two-Column FAQs Accordions & Sticky Support Cards              */}
      {/* ========================================================================= */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Search Query Feedback Banner */}
        {searchQuery && (
          <div className="flex items-center justify-between rounded-2xl bg-sky-soft/60 border border-royal/20 px-4 py-2.5 text-xs font-bold text-royal animate-fade-in">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-royal shrink-0" />
              <span>
                Found <strong>{filteredFaqs.length}</strong> question(s) matching "
                <span className="text-foreground">{searchQuery}</span>"
              </span>
            </div>
            <button
              onClick={() => setSearchQuery("")}
              className="underline text-royal hover:text-royal-deep cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Primary Column: Questions Accordion */}
          <div className="lg:col-span-8 space-y-3.5">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center space-y-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-royal/10 text-royal mx-auto">
                  <Search className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    No answers found for "{searchQuery}"
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    Try searching different keywords, or message our Karachi support desk on WhatsApp directly.
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setSearchQuery("")}
                    className="rounded-full border border-border px-4 py-2 text-xs font-bold text-foreground hover:bg-sky-soft/40 transition-colors cursor-pointer"
                  >
                    View All Questions
                  </button>
                  <a
                    href="https://wa.me/923420024369"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Ask on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openItems.includes(faq.id);
                const feedback = helpfulFeedback[faq.id];
                const askWaUrl = `https://wa.me/923420024369?text=${encodeURIComponent(`Hi The Gadget Zone, I have a question regarding this FAQ: "${faq.question}"`)}`;

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-card ${
                      isOpen
                        ? "border-royal/40 shadow-md shadow-royal/5 ring-1 ring-royal/20"
                        : "border-border/80 hover:border-royal/30 hover:shadow-sm"
                    }`}
                  >
                    {/* Accordion Trigger Header */}
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="space-y-1 flex-1">
                        {faq.badge && (
                          <span className="inline-block rounded-full bg-sky-soft border border-royal/20 px-2.5 py-0.5 text-[9px] font-extrabold text-royal uppercase tracking-wider">
                            {faq.badge}
                          </span>
                        )}
                        <h2 className="font-display text-sm sm:text-base font-bold text-foreground leading-snug">
                          {faq.question}
                        </h2>
                      </div>

                      <div
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-all duration-300 mt-0.5 ${
                          isOpen
                            ? "bg-royal text-white rotate-180 shadow-sm"
                            : "bg-sky-soft/60 text-muted-foreground"
                        }`}
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    </button>

                    {/* Accordion Answer Content */}
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 space-y-3.5 border-t border-border/40 animate-fade-in text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        <p>{faq.answer}</p>

                        {faq.highlight && (
                          <div className="flex items-center gap-2 rounded-xl bg-sky-soft/60 border border-royal/20 p-2.5 text-xs font-bold text-royal">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>{faq.highlight}</span>
                          </div>
                        )}

                        {/* Bottom Feedback & WhatsApp Query Link */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-semibold">
                              Was this answer helpful?
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleFeedback(faq.id, "yes")}
                                className={`p-1 rounded-lg border transition-colors cursor-pointer ${
                                  feedback === "yes"
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 font-bold"
                                    : "border-border hover:bg-sky-soft text-muted-foreground"
                                }`}
                                title="Helpful"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleFeedback(faq.id, "no")}
                                className={`p-1 rounded-lg border transition-colors cursor-pointer ${
                                  feedback === "no"
                                    ? "bg-destructive/10 border-destructive/30 text-destructive font-bold"
                                    : "border-border hover:bg-sky-soft text-muted-foreground"
                                }`}
                                title="Not helpful"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          <a
                            href={askWaUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>Have more questions? Ask us on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right / Secondary Column: Sticky Highlights & Contact Card */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Quick Inquiry Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-royal/10 text-royal">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">
                    Personalized Tech Help
                  </h3>
                  <p className="text-[10px] text-muted-foreground">Karachi Customer Service Desk</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Need guidance choosing between models, checking watch compatibility, or placing a phone booking? Message us directly.
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href="https://wa.me/923420024369?text=Hello%20The%20Gadget%20Zone,%20I%20have%20a%20question."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs font-bold text-white transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp: 0342 0024369
                </a>

                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background hover:bg-sky-soft/40 py-2 text-xs font-bold text-foreground transition-colors"
                >
                  <span>Inquiry &amp; Support Form</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Quick Guarantees Pill Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm space-y-3.5">
              <h4 className="font-display text-xs font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>The Gadget Zone Guarantee</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-[11px]">7-Day Checking Warranty</p>
                    <p className="text-muted-foreground text-[10px]">Doorstep replacements for any defect</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Truck className="h-3.5 w-3.5 text-royal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-[11px]">Cash on Delivery (COD)</p>
                    <p className="text-muted-foreground text-[10px]">Pay safely upon physical delivery</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-[11px]">100% Brand New &amp; Original</p>
                    <p className="text-muted-foreground text-[10px]">Factory-sealed authentic devices only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM PROMO CTA                                                          */}
      {/* ========================================================================= */}
      <section className="bg-sky-soft/40 border-t border-border/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-royal-deep via-royal to-sky-600 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <span className="inline-block rounded-full bg-white/20 border border-white/30 px-3 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#FFC400]">
              READY TO ORDER?
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              Explore Our Top-Rated Tech Gadgets
            </h3>
            <p className="text-xs text-white/85 max-w-lg leading-relaxed">
              Enjoy limited-time discounts, verified checking warranties, and swift nationwide home delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 shrink-0">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-royal-deep hover:bg-slate-100 transition-all shadow-md active:scale-95"
            >
              <Package className="h-3.5 w-3.5" /> Browse Shop
            </Link>
            <Link
              to="/deals"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-black text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-slate-950" /> Flash Deals
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-4 z-[70] rounded-2xl border border-royal/30 bg-royal-deep px-4 py-2.5 text-xs font-bold text-white shadow-2xl animate-fade-in sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
}
