import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal, Overlay } from "@/components/store/ProductModal";
import { LiveVisitors } from "@/components/store/LiveVisitors";
import { SkeletonProductGrid } from "@/components/store/SkeletonCard";
import { products, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import { Clock, Tag, Percent, Flame, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/deals")({
  component: Deals,
});

function Deals() {
  const { cartCount, addToCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState(14 * 3600 + 32 * 60 + 15);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false));

    // Timer Tick
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const handleAddToCart = (product: Product, qty = 1) => {
    addToCart(product.id, qty);
    notify("Added to cart");
  };

  const handleBuy = (product?: Product) => {
    if (product) addToCart(product.id, 1);
    setSelected(null);
    navigate({ to: "/checkout" });
  };

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      seconds: String(s).padStart(2, "0"),
    };
  };

  const timeObj = formatTime(timeLeft);

  // Filter products with active discounts
  const dealProducts = products.filter((p) => p.discount && p.discount > 0);

  // Mock inventories for deals
  const mockStocks: Record<number, { left: number; total: number }> = {
    1: { left: 4, total: 20 },
    2: { left: 7, total: 30 },
    3: { left: 9, total: 25 },
    4: { left: 3, total: 15 },
    6: { left: 12, total: 40 },
    7: { left: 8, total: 20 },
    8: { left: 15, total: 35 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* Header Spacer */}
      <div className="pt-24 sm:pt-28 md:pt-32" />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Deal Announcement Banner (Premium typography and subtle gradient outline) */}
        <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-12 md:p-16 border border-white/10 mb-12 shadow-sm">
          {/* Faint tech circles */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute right-12 bottom-4 w-32 h-32 rounded-full border border-dashed border-white/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/25 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-wider">
                <Flame className="h-3.5 w-3.5" /> Flash Tech Sale
              </span>
              <h1 className="font-display text-3xl font-extrabold sm:text-5xl tracking-tight leading-none text-white">
                Limited Time Deals
              </h1>
              <p className="text-sm text-white/75 leading-relaxed font-medium">
                Claim premium gadgets at special reduced prices. Offers only valid while stock
                remains. Exclusive shipment discounts apply.
              </p>
            </div>

            {/* Premium Countdown Clock */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm self-start md:self-auto shrink-0 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                <Clock className="h-4 w-4" /> Offer Ends In
              </div>
              <div className="flex items-center gap-3">
                {[
                  { value: timeObj.hours, label: "Hrs" },
                  { value: timeObj.minutes, label: "Mins" },
                  { value: timeObj.seconds, label: "Secs" },
                ].map((unit, idx) => (
                  <div key={idx} className="flex items-center">
                    {idx > 0 && <span className="text-xl font-bold text-white/40 mr-3">:</span>}
                    <div className="text-center">
                      <div className="font-display text-2xl sm:text-3xl font-extrabold bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white">
                        {unit.value}
                      </div>
                      <span className="text-[10px] font-semibold text-white/50 block mt-1">
                        {unit.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deals Listing */}
        <section className="space-y-8">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-4">
            <Percent className="h-5 w-5 text-royal" />
            <h2 className="font-display text-xl font-extrabold text-foreground">Discount Items</h2>
          </div>

          {isLoading ? (
            <SkeletonProductGrid count={4} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dealProducts.map((p, idx) => {
                const stock = mockStocks[p.id] || { left: 5, total: 20 };
                return (
                  <div key={p.id} className="relative group flex flex-col">
                    {/* Stock countdown indicator above card */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 border border-destructive/20 px-2 py-0.5 text-[9px] font-bold text-destructive">
                        Only {stock.left} Left
                      </span>
                    </div>

                    <ProductCard
                      product={p}
                      index={idx}
                      onOpen={() => setSelected(p)}
                      onAdd={() => handleAddToCart(p, 1)}
                      onBuy={handleBuy}
                    />

                    {/* Stock progress bar underneath card */}
                    <div className="mt-3.5 px-1 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                        <span>
                          Claimed: {Math.round(((stock.total - stock.left) / stock.total) * 100)}%
                        </span>
                        <span>
                          {stock.left} / {stock.total} left
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-sky-soft rounded-full overflow-hidden">
                        <div
                          className="h-full bg-royal transition-all duration-500 rounded-full"
                          style={{ width: `${((stock.total - stock.left) / stock.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <LiveVisitors />

      {/* Product Details Modal */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={(qty) => handleAddToCart(selected, qty)}
          onBuy={() => handleBuy(selected)}
        />
      )}

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
