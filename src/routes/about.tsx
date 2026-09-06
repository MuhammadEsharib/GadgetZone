import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { useCart } from "@/lib/cartStore";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Headphones,
  Compass,
  Heart,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Package,
  Zap,
  Star,
  Layers,
  ArrowRight,
  RotateCcw,
  Building2,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — The Gadget Zone" },
      {
        name: "description",
        content:
          "Discover The Gadget Zone: Karachi's trusted online gadget store delivering authentic smartwatches, wireless earbuds, speakers, and electronics with 7-day warranty across Pakistan.",
      },
      { property: "og:title", content: "About Us — The Gadget Zone" },
      {
        property: "og:description",
        content:
          "Curating authentic smart gadgets, swift nationwide shipping, and dedicated customer support in Karachi, Pakistan.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { cartCount } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const pillsScrollRef = useRef<HTMLDivElement>(null);
  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

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
      {/* HERO SECTION - Exact Height & Royal Gradient matching Shop, Deals & FAQs  */}
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
            <span className="text-white font-semibold">About Our Store</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFC400] tracking-tight">
                About The Gadget Zone
              </h1>
              <p className="mt-2 text-white/85 text-xs sm:text-sm max-w-xl leading-relaxed">
                Based in Scheme 33, Karachi, we curate premium smart technology, wireless earbuds, smartwatches, and high-performance audio for tech enthusiasts across Pakistan.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md text-white text-xs font-bold w-fit">
              <Sparkles className="h-4 w-4 text-gold" />
              <span>Established in Karachi • 100% Authentic Tech</span>
            </div>
          </div>

          {/* Quick Anchor Navigation Carousel matching Shop, Deals, and FAQ carousels */}
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
                { icon: Compass, label: "Our Story & Vision", targetId: "our-story" },
                { icon: Award, label: "Quality Testing Benchmarks", targetId: "quality-standards" },
                { icon: ShieldCheck, label: "4 Operating Pillars", targetId: "operating-pillars" },
                { icon: Zap, label: "Growth Milestones", targetId: "milestones" },
                { icon: MapPin, label: "Karachi Scheme 33 Hub", targetId: "karachi-hub" },
                { icon: MessageCircle, label: "Contact & Support Desk", targetId: "contact-desk" },
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
      {/* MAIN STORY & MISSION SECTION                                              */}
      {/* ========================================================================= */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        {/* Two Column Narrative Grid */}
        <section id="our-story" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-royal/10 border border-royal/20 px-3.5 py-1 text-xs font-bold text-royal uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5" />
              <span>Our Vision &amp; Heritage</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-royal-deep tracking-tight">
              Elevating Everyday Living With Authentic Smart Gadgets
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Founded in 2026, <strong>The Gadget Zone</strong> was created to address a critical challenge in Pakistan’s tech market: finding dependable, high-performing smart devices without worrying about clone replicas or overpriced middle-men.
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground">
              We believe technology should seamlessly amplify your day—whether it is crystal-clear wireless audio during a commute, all-day biometric health tracking on your wrist, or rapid power banks that keep your mobile ready on the go.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-royal hover:bg-royal-deep px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md active:scale-95"
              >
                <Package className="h-4 w-4" /> Explore Catalog
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-sky-soft/40 px-5 py-2.5 text-xs font-bold text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-royal" /> Contact Desk
              </Link>
            </div>
          </div>

          {/* Right Highlights Showcase Box */}
          <div id="quality-standards" className="lg:col-span-6 scroll-mt-24">
            <div className="rounded-3xl border border-royal/20 bg-gradient-to-br from-royal/5 via-sky-soft/40 to-background p-6 sm:p-8 shadow-lg space-y-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-royal text-white shadow-md">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Strict Quality Standards
                  </h3>
                  <p className="text-xs text-muted-foreground">Zero Counterfeit / Replicas Policy</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Unlike unverified marketplace sellers, every wireless earbud, smartwatch, Bluetooth speaker, and charger in our store undergoes physical bench-testing by our technician squad. We verify real battery life, speaker impedance, Bluetooth latency, and button durability before inventory is listed.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl border border-border/80 bg-card p-3.5 space-y-1">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 100% Genuine
                  </span>
                  <p className="text-[11px] text-muted-foreground">Original factory packaging</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-card p-3.5 space-y-1">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-royal" /> 7-Day Warranty
                  </span>
                  <p className="text-[11px] text-muted-foreground">Prompt replacement support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4 CORE OPERATING PILLARS                                                  */}
        {/* ========================================================================= */}
        <section id="operating-pillars" className="space-y-8 border-t border-border/70 pt-14 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block rounded-full bg-royal/10 border border-royal/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-royal">
              WHY THOUSANDS CHOOSE US
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Our 4 Operating Pillars
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Building long-term customer trust with transparent policies and exceptional service across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "100% Original Tech",
                desc: "Direct partner sourcing with verified manufacturer batches. Zero replicas, clones, or refurbished items.",
                badge: "Factory Sealed",
                color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
              },
              {
                icon: Truck,
                title: "Swift Delivery",
                desc: "24-48 hour delivery in Karachi. Nationwide delivery in 2-4 business days with Trax, Leopards, and TCS.",
                badge: "All Pakistan COD",
                color: "text-royal bg-royal/10 border-royal/20",
              },
              {
                icon: RotateCcw,
                title: "7-Day Warranty",
                desc: "Every gadget comes with a 7-day checking and replacement guarantee for complete peace of mind.",
                badge: "Hassle-Free",
                color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
              },
              {
                icon: Headphones,
                title: "Dedicated Support",
                desc: "Need assistance pairing, setting up, or downloading apps? Our Karachi squad is active on WhatsApp.",
                badge: "Karachi Desk",
                color: "text-sky-600 bg-sky-500/10 border-sky-500/20",
              },
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border/80 bg-card p-6 space-y-4 hover:border-royal/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`grid h-11 w-11 place-items-center rounded-2xl border ${pillar.color} transition-transform group-hover:scale-105`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-soft text-royal uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STATS & IMPACT ROW                                                        */}
        {/* ========================================================================= */}
        <section id="milestones" className="rounded-3xl bg-gradient-to-r from-royal-deep via-royal to-sky-600 text-white p-8 sm:p-12 shadow-xl scroll-mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFC400]">25k+</div>
              <p className="text-xs font-bold text-white/85 uppercase tracking-wider">Gadgets Shipped</p>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">250+</div>
              <p className="text-xs font-bold text-white/85 uppercase tracking-wider">Cities &amp; Towns</p>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFC400]">99.8%</div>
              <p className="text-xs font-bold text-white/85 uppercase tracking-wider">Customer Approval</p>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">7 Days</div>
              <p className="text-xs font-bold text-white/85 uppercase tracking-wider">Checking Warranty</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* KARACHI HEADQUARTERS & DISTRIBUTION CENTER                                */}
        {/* ========================================================================= */}
        <section id="karachi-hub" className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 scroll-mt-24">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-royal font-bold text-xs uppercase tracking-wider">
              <MapPin className="h-4 w-4" />
              <span>Karachi Hub Frontline</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Scheme 33 Central Office &amp; Fulfillment
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Our central office, inventory packaging center, and customer support desk are based in <strong>Gulzar-e-Hijri, Scheme 33, Karachi</strong>. We ensure quick same-day dispatches and personalized support for every client.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-foreground pt-1">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-royal" /> 10:00 AM – 10:00 PM
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 text-emerald-600" /> 0342 0024369
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/923420024369?text=Hi%20The%20Gadget%20Zone!%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-xs font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background hover:bg-sky-soft/40 px-5 py-3 text-xs font-bold text-foreground transition-colors"
            >
              <span>View Store FAQs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM PROMO CTA                                                          */}
      {/* ========================================================================= */}
      <section id="contact-desk" className="bg-sky-soft/40 border-t border-border/80 py-10 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-royal-deep via-royal to-sky-600 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <span className="inline-block rounded-full bg-white/20 border border-white/30 px-3 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#FFC400]">
              EXPERIENCE SMART LIVING
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              Ready to Discover New Tech?
            </h3>
            <p className="text-xs text-white/85 max-w-lg leading-relaxed">
              Explore our full collection of earbuds, smartwatches, speakers, and power banks with Cash on Delivery anywhere in Pakistan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 shrink-0">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-royal-deep hover:bg-slate-100 transition-all shadow-md active:scale-95"
            >
              <Package className="h-3.5 w-3.5" /> Explore Shop
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

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-2xl border border-royal/30 bg-royal-deep px-4 py-2.5 text-xs font-bold text-white shadow-2xl animate-fade-in sm:right-6">
          <CheckCircle2 className="h-4 w-4 text-gold" />
          {toast}
        </div>
      )}
    </div>
  );
}
