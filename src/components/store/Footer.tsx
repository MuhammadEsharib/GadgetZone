import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  MapPin,
  ArrowUp,
  Instagram,
  Youtube,
  Music2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import { api } from "@/lib/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitting(true);
    try {
      const res = await api.subscribeNewsletter({ email, source: "footer" });
      if (res.success) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-[#0b1f49] via-[#09193d] to-[#06122c] text-white/90 font-sans relative overflow-hidden">
      {/* ─── Top Hairline Accent (Yellow Glow Streak) ──────────────────── */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFC400]/60 to-transparent" />

      {/* Subtle Background Mesh & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute -top-24 right-1/4 w-96 h-40 bg-[#FFC400]/5 rounded-full blur-[90px] pointer-events-none" />

      {/* ─── Main Content Columns ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Brand & About */}
          <div className="space-y-3.5">
            <Link to="/" className="inline-block">
              <div className="rounded-xl bg-[#629dfa] inline-flex items-center h-11 px-3 shadow-md shadow-blue-900/30">
                <img
                  src={logoDark}
                  alt="The Gadget Zone"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-blue-100/75 leading-relaxed max-w-xs">
              Authentic smart gadgets, wireless earbuds, smartwatches and mobile accessories with genuine 7-day checking warranty in Karachi.
            </p>

            {/* Social Icons with subtle yellow hover */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-[#FFC400] text-white hover:text-slate-950 grid place-items-center transition-all duration-200 hover:scale-105"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-[#FFC400] text-white hover:text-slate-950 grid place-items-center transition-all duration-200 hover:scale-105"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-[#FFC400] text-white hover:text-slate-950 grid place-items-center transition-all duration-200 hover:scale-105"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/923420024369"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-[#FFC400] text-white hover:text-slate-950 grid place-items-center transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC400] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/75">
              <li>
                <Link to="/" className="hover:text-[#FFC400] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#FFC400] transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-[#FFC400] hover:text-amber-300 font-semibold transition-colors inline-flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Flash Deals
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#FFC400] transition-colors">
                  FAQs &amp; Warranty Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFC400] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFC400] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC400] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />
              <span>Contact &amp; Visit</span>
            </h4>
            <div className="space-y-2 text-xs text-blue-100/75">
              <a
                href="tel:03420024369"
                className="flex items-center gap-2 hover:text-[#FFC400] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#FFC400] shrink-0" />
                <span>0342 0024369</span>
              </a>
              <a
                href="tel:03322205842"
                className="flex items-center gap-2 hover:text-[#FFC400] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#FFC400] shrink-0" />
                <span>0332 2205842</span>
              </a>
              <div className="flex items-start gap-2 pt-0.5">
                <MapPin className="h-3.5 w-3.5 text-[#FFC400] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Gulzar-e-Hijri, Scheme 33, Karachi, Pakistan
                </span>
              </div>
              <p className="text-[11px] text-blue-200/60 pt-0.5">
                Timings: Mon – Sun (11:00 AM – 10:00 PM)
              </p>
            </div>
          </div>

          {/* Newsletter Box with White Subscribe Button */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC400] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />
              <span>Get Updates</span>
            </h4>
            <p className="text-xs text-blue-100/75 leading-relaxed">
              Subscribe to get secret discount codes and earliest alerts on new stock.
            </p>
            {subscribed ? (
              <p className="text-xs text-[#FFC400] font-bold pt-1">
                ✓ Subscribed successfully!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-blue-400/25 bg-[#061430] px-3 py-2 text-xs text-white placeholder:text-blue-200/40 focus:border-[#FFC400] focus:ring-1 focus:ring-[#FFC400]/40 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-white hover:bg-slate-100 text-[#0b1f49] px-3 py-2 text-xs font-bold transition-all shadow-sm active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* ─── Bottom Copyright Bar (Hero Light Blue with Soft Grid & Tiny Dots) ── */}
      <div className="border-t border-white/20 bg-gradient-to-r from-[#508ff4] via-[#6ba5ff] to-[#508ff4] text-[#06142e] py-3.5 text-xs font-medium relative z-10 overflow-hidden shadow-inner">
        {/* Very Light Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-60" />

        {/* Scattered Soft Low-Opacity White Circles/Dots */}
        <div className="absolute left-[8%] top-[25%] h-2 w-2 rounded-full bg-white/25 pointer-events-none" />
        <div className="absolute left-[22%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-white/20 pointer-events-none" />
        <div className="absolute left-[38%] top-[60%] h-2.5 w-2.5 rounded-full bg-white/15 pointer-events-none" />
        <div className="absolute left-[52%] top-[15%] h-1.5 w-1.5 rounded-full bg-white/30 pointer-events-none" />
        <div className="absolute left-[68%] bottom-[30%] h-2 w-2 rounded-full bg-white/20 pointer-events-none" />
        <div className="absolute left-[84%] top-[35%] h-3 w-3 rounded-full bg-white/15 pointer-events-none" />
        <div className="absolute right-[6%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-white/25 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <p>© {new Date().getFullYear()} <strong className="font-black text-[#041026]">The Gadget Zone</strong>. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#041026] hover:text-white px-3 py-1 rounded-lg bg-[#041026]/10 hover:bg-[#041026]/80 text-xs font-black transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
