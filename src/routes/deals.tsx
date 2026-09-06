import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal } from "@/components/store/ProductModal";
import { SkeletonProductGrid } from "@/components/store/SkeletonCard";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import { useProducts } from "@/lib/productsStore";
import {
  Clock,
  Tag,
  Percent,
  Flame,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
  Truck,
  Zap,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  ShoppingBag,
  Star,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Flash Deals & Limited-Time Discounts — The Gadget Zone" },
      {
        name: "description",
        content:
          "Save big on premium gadgets with exclusive flash deals and limited-time discounts on Earbuds, Smart Watches, Headphones, and Power Banks.",
      },
      { property: "og:title", content: "Flash Deals & Discounts — The Gadget Zone" },
      {
        property: "og:description",
        content:
          "Claim premium gadgets at special reduced prices. Limited-time discounts across Pakistan.",
      },
    ],
  }),
  component: Deals,
});

function Deals() {
  const { cartCount, addToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("discount");

  // Scroll container ref
  const pillsScrollRef = useRef<HTMLDivElement>(null);

  const scrollPills = (direction: "left" | "right") => {
    if (pillsScrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      pillsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Live Countdown Timer (14h 32m 15s)
  const [timeLeft, setTimeLeft] = useState(14 * 3600 + 32 * 60 + 15);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    setIsLoading(false);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 24 * 3600));
    }, 1000);

    return () => clearInterval(timer);
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
    if (product) {
      addToCart(product.id, 1);
      if (typeof window !== "undefined") {
        localStorage.setItem("gz_checkout_items", JSON.stringify([product.id]));
      }
    }
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

  // Mock inventories for deals urgency
  const mockStocks: Record<number, { left: number; total: number }> = {
    1: { left: 4, total: 20 },
    2: { left: 7, total: 30 },
    3: { left: 9, total: 25 },
    4: { left: 3, total: 15 },
    5: { left: 6, total: 20 },
    6: { left: 12, total: 40 },
    7: { left: 8, total: 20 },
    8: { left: 15, total: 35 },
  };

  // Filter products with active discounts or special deals
  const allDealProducts = useMemo(() => {
    return (products || []).filter((p) => {
      if (!p) return false;
      const discount = Number(p.discount) || 0;
      const hasOldPrice = Boolean(p.oldPrice && p.oldPrice > p.price);
      return Boolean(p.isDeal || p.isDealOfTheDay || discount > 0 || hasOldPrice);
    });
  }, [products]);

  // Spotlight Deal (Prioritize explicitly selected Deal of the Day, else highest discount product)
  const spotlightDeal = useMemo(() => {
    if (!allDealProducts.length) return null;
    const explicitlyMarked = allDealProducts.find((p) => p.isDealOfTheDay);
    if (explicitlyMarked) return explicitlyMarked;
    return [...allDealProducts].sort((a, b) => (b.discount || 0) - (a.discount || 0))[0];
  }, [allDealProducts]);

  // Categories with available deals
  const dealCategories = useMemo(() => {
    const cats = new Set<string>();
    allDealProducts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [allDealProducts]);

  // Filtered and Sorted Deals
  const filteredDeals = useMemo(() => {
    return allDealProducts
      .filter((p) => {
        if (activeCategory === "all") return true;
        if (activeCategory === "heavy") return (p.discount || 0) >= 20;
        return p.category?.toLowerCase() === activeCategory.toLowerCase();
      })
      .sort((a, b) => {
        const discountA = Number(a.discount) || 0;
        const discountB = Number(b.discount) || 0;
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        const ratingA = Number(a.rating) || 0;
        const ratingB = Number(b.rating) || 0;

        if (sortBy === "discount") return discountB - discountA;
        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return ratingB - ratingA;
        return 0;
      });
  }, [allDealProducts, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* Hero Header Section - Exact height matching Shop, FAQ, and About page hero */}
      <div
        className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14"
        style={{
          background:
            "linear-gradient(140deg, #081836 0%, #0b2352 20%, #0f357f 45%, #154caa 72%, #1d60d3 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-semibold">Deals & Discounts</span>
            {activeCategory !== "all" && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-gold font-bold">
                  {activeCategory === "heavy" ? "20%+ Mega Deals" : activeCategory}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFC400] tracking-tight">
                {activeCategory === "all"
                  ? "Special Deals & Discounts"
                  : activeCategory === "heavy"
                    ? "20%+ Mega Flash Deals"
                    : `${activeCategory} Deals`}
              </h1>
              <p className="mt-2 text-white/85 text-xs sm:text-sm max-w-xl leading-relaxed">
                Claim genuine smart gadgets at special reduced prices. Limited stock available with
                fast nationwide delivery across Pakistan.
              </p>
            </div>

            {/* Compact Luxury Countdown Timer Badge (Matches Shop & FAQ badge height) */}
            <div className="flex items-center gap-2.5 rounded-full border border-amber-400/40 bg-white/10 px-4 py-2 backdrop-blur-md text-white text-xs font-bold w-fit shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_8px_#ef4444]" />
              </span>
              <span className="text-[#FFC400] font-extrabold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Flame className="h-3.5 w-3.5" /> Deal Ends In:
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm tracking-wide text-white">
                <span className="rounded bg-white/15 px-1.5 py-0.5">{timeObj.hours}h</span>
                <span className="text-[#FFC400]">:</span>
                <span className="rounded bg-white/15 px-1.5 py-0.5">{timeObj.minutes}m</span>
                <span className="text-[#FFC400]">:</span>
                <span className="rounded bg-amber-400/25 text-[#FFC400] px-1.5 py-0.5">{timeObj.seconds}s</span>
              </div>
            </div>
          </div>

          {/* Deals Category Filter Pills Strip with Left/Right Scroll Navigation */}
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
              <button
                onClick={() => setActiveCategory("all")}
                className={`inline-flex items-center gap-1.5 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-gold text-slate-950 shadow-md scale-105 font-extrabold"
                    : "bg-white/15 text-white hover:bg-white/25 border border-white/15"
                }`}
              >
                All Deals ({allDealProducts.length})
              </button>

              <button
                onClick={() => setActiveCategory("heavy")}
                className={`inline-flex items-center gap-1.5 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === "heavy"
                    ? "bg-white text-royal-deep shadow-lg scale-105 border-2 border-white font-extrabold"
                    : "bg-white/10 text-white/90 hover:bg-white/20 border border-white/10"
                }`}
              >
                <Flame className="h-3.5 w-3.5 text-[#FFC400]" /> 20%+ Mega Deals
              </button>

              {dealCategories.map((cat) => {
                const isSelected = activeCategory === cat;
                const count = allDealProducts.filter(
                  (p) => p.category?.toLowerCase() === cat.toLowerCase(),
                ).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-royal-deep shadow-lg scale-105 border-2 border-white font-extrabold"
                        : "bg-white/10 text-white/90 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <span>{cat}</span>
                    {count > 0 && (
                      <span
                        className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                          isSelected ? "bg-royal/10 text-royal" : "bg-white/20 text-white"
                        }`}
                      >
                        {count}
                      </span>
                    )}
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

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Spotlight Mega Deal Banner */}
        {spotlightDeal && (
          <section className="mb-12">
            <div className="relative overflow-hidden rounded-3xl border border-royal/20 bg-gradient-to-br from-blue-50/80 via-white to-sky-soft/60 p-6 sm:p-8 lg:p-10 shadow-[var(--shadow-card)]">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-royal/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 grid gap-8 md:grid-cols-12 items-center">
                {/* Product Image */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-2xl bg-white border border-border shadow-md">
                    <img
                      src={spotlightDeal.image}
                      alt={spotlightDeal.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-xs font-black text-slate-950 shadow-md">
                      {spotlightDeal.discount}% OFF
                    </div>
                    <div className="absolute top-3 right-3 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-gold" /> Deal of the Day
                    </div>
                  </div>
                </div>

                {/* Deal Details */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-royal/10 px-3 py-0.5 text-xs font-bold text-royal">
                      {spotlightDeal.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" /> {spotlightDeal.rating} (50+ reviews)
                    </div>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground leading-snug">
                    {spotlightDeal.name}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {spotlightDeal.description}
                  </p>

                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-royal">
                      {formatPrice(spotlightDeal.price)}
                    </span>
                    {spotlightDeal.oldPrice && (
                      <span className="text-sm sm:text-base text-muted-foreground line-through font-semibold">
                        {formatPrice(spotlightDeal.oldPrice)}
                      </span>
                    )}
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                      Save {formatPrice(spotlightDeal.oldPrice! - spotlightDeal.price)}
                    </span>
                  </div>

                  {/* Stock progress */}
                  <div className="space-y-1.5 pt-2 max-w-md">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span className="text-red-600 flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5" /> Almost Sold Out (4 left)
                      </span>
                      <span className="text-muted-foreground">80% Claimed</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-royal to-blue-500 rounded-full w-[80%]" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-3">
                    <button
                      onClick={() => handleBuy(spotlightDeal)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-royal px-7 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md hover:bg-royal-deep transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" /> Claim Spotlight Deal
                    </button>
                    <button
                      onClick={() => setSelected(spotlightDeal)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-royal/30 bg-card px-6 py-3 text-xs sm:text-sm font-bold text-royal hover:bg-sky-soft transition-all active:scale-95 cursor-pointer"
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Deals Controls Bar */}
        <section className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
              <Percent className="h-5 w-5 text-royal" /> Available Deals & Offers
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Showing {filteredDeals.length} discounted {filteredDeals.length === 1 ? "gadget" : "gadgets"} ready to ship
            </p>
          </div>

          {/* Sort & Reset */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-xs font-bold text-royal hover:underline flex items-center gap-1 cursor-pointer"
              >
                Clear Filter
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground focus:border-royal focus:outline-none cursor-pointer shadow-sm"
              >
                <option value="discount">Highest Discount %</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </section>

        {/* Deals Product Grid (2 columns on mobile, 4-5 on desktop) */}
        <section>
          {isLoading ? (
            <SkeletonProductGrid count={8} />
          ) : filteredDeals.length > 0 ? (
            <div className="grid grid-cols-2 gap-3.5 sm:gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 animate-fade-in">
              {filteredDeals.map((p, idx) => {
                const stock = mockStocks[p.id] || { left: 5, total: 20 };
                const claimedPercent = Math.round(((stock.total - stock.left) / stock.total) * 100);

                return (
                  <div key={p.id} className="relative group flex flex-col">
                    <ProductCard
                      product={p}
                      index={idx}
                      onOpen={() => setSelected(p)}
                      onAdd={() => handleAddToCart(p, 1)}
                      onBuy={() => handleBuy(p)}
                    />

                    {/* Stock Urgency Progress Bar */}
                    <div className="mt-2.5 px-1 space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-700">
                        <span className="text-red-600">Only {stock.left} left</span>
                        <span className="text-muted-foreground">{claimedPercent}% claimed</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500 rounded-full"
                          style={{ width: `${claimedPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card py-16 px-4 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-soft text-royal mb-3">
                <RotateCcw className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">No Deals Found</h3>
              <p className="mt-1.5 text-xs text-muted-foreground max-w-sm">
                No active deals currently match the selected category filter.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 rounded-full bg-royal px-5 py-2 text-xs font-bold text-white hover:bg-royal-deep transition-all cursor-pointer"
              >
                Show All Deals
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />

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
