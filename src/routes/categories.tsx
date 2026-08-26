import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import {
  Headphones,
  Smartphone,
  Laptop,
  Tablet,
  Speaker,
  Camera,
  Gamepad2,
  BatteryCharging,
  Cable,
  Watch,
  Tv,
  Home as HomeIcon,
  Plug,
  ChevronRight,
  Star,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductModal, Overlay } from "@/components/store/ProductModal";
import {
  SkeletonCategoryCard,
  SkeletonProductGrid,
  SkeletonCategoryTile,
} from "@/components/store/SkeletonCard";
import { products, categories, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import { ProductCard } from "@/components/store/ProductCard";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Shop by Category — The Gadget Zone" },
      {
        name: "description",
        content:
          "Browse all gadget categories at The Gadget Zone. Find earbuds, smart watches, headphones, speakers, power banks and more.",
      },
    ],
  }),
  component: CategoriesPage,
});

// All category definitions with icons
const ALL_CATEGORIES = [
  { name: "Earbuds", icon: Headphones, color: "from-purple-500 to-indigo-600" },
  { name: "Smart Watches", icon: Watch, color: "from-blue-500 to-cyan-600" },
  { name: "Headphones", icon: Headphones, color: "from-pink-500 to-rose-600" },
  { name: "Speakers", icon: Speaker, color: "from-orange-500 to-amber-600" },
  { name: "Power Banks", icon: BatteryCharging, color: "from-emerald-500 to-teal-600" },
  { name: "Mobile Accessories", icon: Cable, color: "from-sky-500 to-blue-600" },
  { name: "Smartphones", icon: Smartphone, color: "from-violet-500 to-purple-600" },
  { name: "Laptops", icon: Laptop, color: "from-slate-600 to-gray-700" },
  { name: "Tablets", icon: Tablet, color: "from-red-500 to-rose-600" },
  { name: "Cameras", icon: Camera, color: "from-amber-500 to-yellow-600" },
  { name: "Gaming", icon: Gamepad2, color: "from-green-500 to-emerald-600" },
  { name: "Chargers & Cables", icon: Plug, color: "from-teal-500 to-cyan-600" },
  { name: "Smart TVs", icon: Tv, color: "from-indigo-500 to-blue-600" },
  { name: "Home Appliances", icon: HomeIcon, color: "from-rose-500 to-pink-600" },
];

function CategoriesPage() {
  const { cartCount, addToCart } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [dialog, setDialog] = useState<null | "checkout">(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const notify = useCallback((m: string) => setToast(m), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const handleAddToCart = (product: Product, qty = 1) => {
    addToCart(product.id, qty);
    notify("Added to cart");
  };

  const handleBuy = () => {
    setSelected(null);
    setDialog("checkout");
  };

  // Products grouped by category
  const grouped = ALL_CATEGORIES.reduce<Record<string, Product[]>>((acc, cat) => {
    acc[cat.name] = products.filter((p) => p.category === cat.name);
    return acc;
  }, {});

  // Categories that have actual products
  const populatedCategories = ALL_CATEGORIES.filter((c) => (grouped[c.name]?.length ?? 0) > 0);
  // Categories only shown in the catalog grid (no products yet)
  const catalogCategories = ALL_CATEGORIES.filter((c) => (grouped[c.name]?.length ?? 0) === 0);

  // For quick filter — find the matching rich category object
  const richCategories = categories; // from products.ts (has images)

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* Header spacer */}
      <div
        className="relative overflow-hidden pt-24 pb-14 sm:pt-28"
        style={{
          background: "linear-gradient(135deg, #0B2545 0%, #134074 45%, #2F73D9 100%)",
        }}
      >
        {/* Decorative rings */}
        <div className="absolute right-[5%] top-[-10%] h-[380px] w-[380px] rounded-full border border-white/10 pointer-events-none hidden md:block" />
        <div className="absolute right-[12%] top-[-4%] h-[270px] w-[270px] rounded-full border border-white/5 pointer-events-none hidden md:block" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Categories</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            Shop by Category
          </h1>
          <p className="mt-3 text-white/70 text-base max-w-xl">
            Explore our curated collection of gadgets organized by category. Find exactly what you
            need.
          </p>

          {/* Category pill quick-scroll */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeCategory === null
                  ? "bg-gold text-royal-deep"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              All
            </button>
            {ALL_CATEGORIES.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setActiveCategory(c.name === activeCategory ? null : c.name);
                  setTimeout(() => {
                    document.getElementById(`cat-${c.name.replace(/\s+/g, "-")}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === c.name
                    ? "bg-white text-royal-deep"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Image-based category showcase */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-royal-deep sm:text-3xl">
                Featured Categories
              </h2>
              <p className="mt-1 text-muted-foreground text-sm">
                Shop our most popular product groups
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-1 text-sm font-bold text-royal hover:text-royal-deep transition-colors"
            >
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCategoryCard key={i} />)
              : richCategories.map((c) => (
                  <Link
                    key={c.name}
                    to="/shop"
                    search={{ category: c.name }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl text-left shadow-[var(--shadow-card)]"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-deep/80 via-royal-deep/10 to-transparent" />
                    <div className="absolute inset-0 bg-royal/0 group-hover:bg-royal/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                      <h3 className="font-display text-base font-extrabold text-white sm:text-xl">
                        {c.name}
                      </h3>
                      <p className="text-xs text-white/70">{c.count}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Shop now <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
          </div>
        </section>

        {/* Products grouped by category */}
        {!isLoading &&
          populatedCategories.map((cat) => {
            const catProducts = grouped[cat.name] || [];
            if (catProducts.length === 0) return null;
            const IconComp = cat.icon;
            return (
              <section
                key={cat.name}
                id={`cat-${cat.name.replace(/\s+/g, "-")}`}
                className="mb-14 scroll-mt-28"
              >
                {/* Section header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg`}
                    >
                      <IconComp className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {catProducts.length} product{catProducts.length > 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/shop"
                    search={{ category: cat.name }}
                    className="flex items-center gap-1 rounded-full border border-border/60 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-royal/40 hover:bg-sky-soft hover:text-royal"
                  >
                    See all <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Product cards horizontal row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {catProducts.map((p, idx) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      index={idx}
                      onOpen={() => setSelected(p)}
                      onAdd={() => handleAddToCart(p, 1)}
                      onBuy={handleBuy}
                    />
                  ))}
                </div>
              </section>
            );
          })}

        {/* Full catalog grid — categories coming soon */}
        <section className="mb-12">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
                More Categories
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Expanding catalog — new products arriving soon
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonCategoryTile key={i} />)
              : ALL_CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  const count = grouped[cat.name]?.length ?? 0;
                  return (
                    <Link
                      key={cat.name}
                      to="/shop"
                      search={{ category: cat.name }}
                      id={`cat-${cat.name.replace(/\s+/g, "-")}`}
                      className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 text-center transition-all duration-300 hover:border-royal/30 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                    >
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                      >
                        <IconComp className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-foreground">{cat.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {count > 0 ? `${count} product${count > 1 ? "s" : ""}` : "Coming soon"}
                        </p>
                      </div>
                      <span className="flex items-center gap-0.5 text-[11px] font-bold text-royal opacity-0 group-hover:opacity-100 transition-opacity">
                        Browse <ChevronRight className="h-3 w-3" />
                      </span>
                    </Link>
                  );
                })}
          </div>
        </section>
      </div>

      <Footer />

      {/* Product Details Modal */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={(qty) => handleAddToCart(selected, qty)}
          onBuy={handleBuy}
        />
      )}

      {/* Checkout dialog */}
      {dialog && (
        <Overlay onClose={() => setDialog(null)}>
          <div className="max-w-md p-10 text-center">
            <h3 className="font-display text-2xl font-extrabold text-royal-deep">
              Ready to Checkout
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              This is a demo store. Checkout is not enabled yet.
            </p>
            <button
              onClick={() => setDialog(null)}
              className="mt-7 w-full rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep"
            >
              Continue Browsing
            </button>
          </div>
        </Overlay>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-float)]">
          <CheckCircle2 className="h-4 w-4 text-gold" />
          {toast}
        </div>
      )}
    </div>
  );
}
