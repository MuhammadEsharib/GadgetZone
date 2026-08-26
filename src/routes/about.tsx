import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { LiveVisitors } from "@/components/store/LiveVisitors";
import { useCart } from "@/lib/cartStore";
import { CheckCircle2, ShieldCheck, Truck, Headphones, Compass, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { cartCount } = useCart();
  const [toast, setToast] = useState<string | null>(null);
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

      <main className="mx-auto max-w-4xl space-y-16 px-4 pb-24 sm:px-6 lg:px-8">
        {/* Typographical Hero Section */}
        <section className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3.5 py-1 text-[10px] font-bold text-royal uppercase tracking-wider">
            Our Story
          </span>
          <h1 className="font-display text-4xl font-extrabold text-royal-deep sm:text-6xl tracking-tight">
            We are The Gadget Zone
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
            Based in Karachi, Pakistan, we curate premium smart technology and high-quality
            accessories designed to enhance your everyday lifestyle.
          </p>
        </section>

        {/* Narrative Section - Two Columns */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/60 pt-12">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              A Mission of Smart Living
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Founded in 2026, The Gadget Zone set out to bridge the gap between premium
              international smart gadgets and tech enthusiasts in Pakistan. We understand that tech
              is no longer just a hobby; it is a vital companion to daily productivity, fitness, and
              lifestyle optimization.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Rigorous Quality Standards
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Unlike generic catalog stores, every earbud, smartwatch, speaker, or charger featured
              in our store is handpicked and thoroughly tested by our engineering squad. We verify
              real-world battery cycles, audio latency, snappiness, and durability before listing
              them on our platform.
            </p>
          </div>
        </section>

        {/* Operational Pillars (Editorial list layout, avoiding card cards) */}
        <section className="space-y-8 border-t border-border/60 pt-12">
          <h2 className="font-display text-2xl font-bold text-foreground text-center">
            Our Operating Pillars
          </h2>

          <div className="divide-y divide-border/50">
            {[
              {
                icon: ShieldCheck,
                title: "100% Original Products",
                desc: "We work directly with manufacturer partners to source authentic inventory. Zero replicas, clone models, or second-hand items. You receive exactly what is printed on the package.",
              },
              {
                icon: Truck,
                title: "Swift Nationwide Delivery",
                desc: "Dispatched straight from our Karachi hub in Scheme 33, our delivery system works with premium courier networks to guarantee safe transit and quick arrivals to your door across Pakistan.",
              },
              {
                icon: Headphones,
                title: "Reliable Post-Purchase Support",
                desc: "Have inquiries about setups or Bluetooth pairing? Our local support desk in Karachi is open for instant support. Give us a ring or reach out on WhatsApp for friendly diagnostic help.",
              },
            ].map((pillar, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 items-start">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-base font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Operational Footprint */}
        <section className="rounded-2xl bg-sky-soft/40 border border-border/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-foreground">
              Karachi Hub Frontline
            </h3>
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              Our central office, inventory warehouse, and localized service desk are based in
              Gulzar-e-Hijri, Scheme 33. We welcome you to experience high-quality tech in-hand or
              consult about wholesale shipments.
            </p>
          </div>
          <div className="shrink-0 flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-royal font-display">24k+</div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                Gadgets Shipped
              </span>
            </div>
            <div className="border-l border-border h-10 self-center" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-royal font-display">99.8%</div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                Satisfaction Rate
              </span>
            </div>
          </div>
        </section>
      </main>

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
