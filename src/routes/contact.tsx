import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { LiveVisitors } from "@/components/store/LiveVisitors";
import { ContactForm } from "@/components/ContactForm";
import { useCart } from "@/lib/cartStore";
import { Phone, MapPin, Mail, Clock, Send, MessageCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const { cartCount } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* Header Spacer */}
      <div className="pt-24 sm:pt-28 md:pt-32" />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3.5 py-1 text-[10px] font-bold text-royal uppercase tracking-wider">
            Contact Desk
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-royal-deep sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Have questions about a product, warranty, or delivery? Reach out and we'll reply
            shortly.
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Connect Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-6">
              <h3 className="font-display text-lg font-bold text-foreground">Karachi Store Info</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Phone Call
                    </span>
                    <p className="text-sm font-bold text-foreground">0342 0024369</p>
                    <p className="text-xs text-muted-foreground">Usama Bin Abid</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Email Support
                    </span>
                    <p className="text-sm font-bold text-foreground">thegadgetzone70@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Storefront Address
                    </span>
                    <p className="text-xs text-foreground leading-relaxed font-bold">
                      Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri,
                      Scheme 33, Karachi
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Operating Hours
                    </span>
                    <p className="text-xs font-bold text-foreground">
                      Mon — Sat: 11:00 AM – 9:00 PM
                    </p>
                    <p className="text-[10px] text-muted-foreground">Closed on Sundays</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp CTA */}
              <a
                href="https://wa.me/923420024369"
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-xs font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]"
              >
                <MessageCircle className="h-4.5 w-4.5" /> Chat on WhatsApp
              </a>
            </div>

            {/* Scheme 33 visitor guide card */}
            <div className="rounded-2xl bg-sky-soft/40 border border-border/60 p-6 space-y-3">
              <h4 className="font-display text-sm font-bold text-foreground">Visiting Us?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If you are arriving via the Karachi Lyari Expressway or Superhighway (M-9), take the
                Gulzar-e-Hijri exit. Alhaseeb Residency is located right in Quetta Town Sector 18-A.
                Customer parking is accessible directly in front of the storefront.
              </p>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
            <h3 className="font-display text-lg font-bold text-foreground mb-6">Send a Message</h3>

            <ContactForm onSuccess={() => setIsSuccessOpen(true)} />
          </div>
        </div>
      </main>

      {/* Success Dialog Overlay */}
      {isSuccessOpen && (
        <Overlay onClose={() => setIsSuccessOpen(false)}>
          <div className="max-w-md p-10 text-center mx-auto space-y-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-foreground">Message Sent</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you for contacting us. Your ticket has been logged. A support representative
              will follow up via email within 4 hours.
            </p>
            <button
              onClick={() => setIsSuccessOpen(false)}
              className="mt-4 w-full rounded-full bg-royal px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep"
            >
              Close
            </button>
          </div>
        </Overlay>
      )}

      <Footer />
      <LiveVisitors />

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

// Custom mock overlay component locally if needed
function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
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
