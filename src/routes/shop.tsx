import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, useRef } from "react";
import { z } from "zod";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal } from "@/components/store/ProductModal";
import { SkeletonProductGrid } from "@/components/store/SkeletonCard";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import { useProducts } from "@/lib/productsStore";
import {
  Filter,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  Headphones,
  Watch,
  Speaker,
  BatteryCharging,
  Cable,
  Smartphone,
  Laptop,
  Gamepad2,
  Plug,
  Tv,
  Home as HomeIcon,
  Sparkles,
  LayoutGrid,
  X,
  ChevronRight,
  ChevronLeft,
  Search,
} from "lucide-react";

import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";
import c5 from "@/assets/c5.jpg";
import c6 from "@/assets/c6.jpg";

const ALL_CATEGORY_META = [
  { name: "Earbuds", icon: Headphones, image: c1 },
  { name: "Smart Watches", icon: Watch, image: c2 },
  { name: "Headphones", icon: Headphones, image: c3 },
  { name: "Speakers", icon: Speaker, image: c4 },
  { name: "Power Banks", icon: BatteryCharging, image: c5 },
  { name: "Mobile Accessories", icon: Cable, image: c6 },
  { name: "Gaming", icon: Gamepad2, image: c1 },
  { name: "Laptops", icon: Laptop, image: c2 },
  { name: "Smartphones", icon: Smartphone, image: c3 },
  { name: "Smart TVs", icon: Tv, image: c4 },
  { name: "Chargers & Cables", icon: Plug, image: c5 },
  { name: "Home Appliances", icon: HomeIcon, image: c6 },
];

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    search: typeof search["search"] === "string" ? (search["search"] as string) : undefined,
    category: typeof search["category"] === "string" ? (search["category"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Explore All Products & Categories — The Gadget Zone" },
      {
        name: "description",
        content:
          "Browse our curated collection of gadgets by category: Earbuds, Smart Watches, Headphones, Speakers, Power Banks and more.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const searchParams = Route.useSearch();
  const searchParam = searchParams?.search || "";
  const categoryParam = searchParams?.category || "";
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const { products } = useProducts();
  const safeProducts = Array.isArray(products) ? products : [];
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchVal, setSearchVal] = useState(searchParam || "");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Scroll container refs
  const pillsScrollRef = useRef<HTMLDivElement>(null);
  const cardsScrollRef = useRef<HTMLDivElement>(null);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setSearchVal(searchParam || "");
  }, [searchParam]);

  useEffect(() => {
    setSelectedCategory(categoryParam || "");
  }, [categoryParam]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const handleAddToCart = (product: Product, qty = 1) => {
    if (!product?.id) return;
    addToCart(product.id, qty);
    notify("Added to cart");
  };

  const handleBuy = (product?: Product) => {
    if (product?.id) addToCart(product.id, 1);
    setSelected(null);
    navigate({ to: "/checkout" });
  };

  const updateUrlParams = (updatedCategory: string, updatedSearch: string) => {
    try {
      navigate({
        to: "/shop",
        search: {
          category: updatedCategory || undefined,
          search: updatedSearch || undefined,
        },
      });
    } catch {}
  };

  const handleCategorySelect = (catName: string) => {
    const newCat = selectedCategory === catName ? "" : catName;
    setSelectedCategory(newCat);
    updateUrlParams(newCat, searchVal);
  };

  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    updateUrlParams(selectedCategory, val);
  };

  const handleResetFilters = () => {
    setSearchVal("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");
    updateUrlParams("", "");
  };

  const scrollPills = (direction: "left" | "right") => {
    if (pillsScrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      pillsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollCards = (direction: "left" | "right") => {
    if (cardsScrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      cardsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const categoryCounts = ALL_CATEGORY_META.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.name] = safeProducts.filter(
      (p) =>
        (p?.category && p.category.toLowerCase() === cat.name.toLowerCase()) ||
        (p?.name && p.name.toLowerCase().includes(cat.name.toLowerCase())),
    ).length;
    return acc;
  }, {});

  const filteredProducts = safeProducts
    .filter((product) => {
      if (!product) return false;
      const name = product.name || "";
      const desc = product.description || "";
      const cat = product.category || "";

      const matchesSearch =
        !searchVal ||
        name.toLowerCase().includes(searchVal.toLowerCase()) ||
        desc.toLowerCase().includes(searchVal.toLowerCase());

      const directCategoryMatch =
        !selectedCategory || cat.toLowerCase() === selectedCategory.toLowerCase();

      const matchesCategory =
        directCategoryMatch ||
        (selectedCategory
          ? name
              .toLowerCase()
              .includes(
                selectedCategory
                  .replace("Smart Watches", "Watch")
                  .replace("Earbuds", "Earbuds")
                  .replace("Speakers", "Speaker")
                  .replace("Power Banks", "Power")
                  .replace("Mobile Accessories", "Charger")
                  .toLowerCase(),
              )
          : true);

      const categoryMapping: Record<string, string[]> = {
        Earbuds: ["earbuds", "airpods", "tws"],
        "Smart Watches": ["watch", "fitness", "series"],
        Headphones: ["headset", "earbuds", "wireless headphones"],
        Speakers: ["speaker", "soundbar", "bluetooth speaker"],
        "Power Banks": ["power bank", "battery"],
        "Mobile Accessories": ["charger", "cable", "power bank", "accessories", "pad"],
      };

      const words = selectedCategory ? categoryMapping[selectedCategory] : undefined;
      const matchesCategoryMapping =
        !selectedCategory ||
        (words && words.some((word) => name.toLowerCase().includes(word)));

      const finalCategoryMatch = directCategoryMatch || matchesCategory || matchesCategoryMapping;

      const price = Number(product.price) || 0;
      const matchesMin = !minPrice || price >= Number(minPrice);
      const matchesMax = !maxPrice || price <= Number(maxPrice);

      return matchesSearch && finalCategoryMatch && matchesMin && matchesMax;
    })
    .sort((a, b) => {
      const priceA = Number(a?.price) || 0;
      const priceB = Number(b?.price) || 0;
      const ratingA = Number(a?.rating) || 0;
      const ratingB = Number(b?.rating) || 0;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "rating") return ratingB - ratingA;
      return 0;
    });

  const hasActiveFilters =
    Boolean(searchVal) ||
    Boolean(selectedCategory) ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    sortBy !== "featured";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} onNotify={notify} />

      <div
        className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14"
        style={{
          background: "linear-gradient(140deg, #081836 0%, #0b2352 20%, #0f357f 45%, #154caa 72%, #1d60d3 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-semibold">Shop & Categories</span>
            {selectedCategory && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-gold font-bold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFC400] tracking-tight">
                {selectedCategory ? `${selectedCategory} Collection` : "Explore All Gadgets"}
              </h1>
              <p className="mt-2 text-white/85 text-xs sm:text-sm max-w-xl leading-relaxed">
                Browse through all top-tier smart tech, earphones, watches, and accessories. Filter
                by category or refine with your custom budget.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md text-white text-xs font-bold w-fit">
              <Sparkles className="h-4 w-4 text-gold" />
              <span>{safeProducts.length} Products Available</span>
            </div>
          </div>

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
                onClick={() => handleCategorySelect("")}
                className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  !selectedCategory
                    ? "bg-gold text-slate-950 shadow-md scale-105 font-extrabold"
                    : "bg-white/15 text-white hover:bg-white/25 hover:text-white border border-white/15"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> All Gadgets
              </button>

              {ALL_CATEGORY_META.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.name;
                const count = categoryCounts[cat.name] || 0;

                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-royal-deep shadow-lg scale-105 border-2 border-white font-extrabold"
                        : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white border border-white/10"
                    }`}
                  >
                    <IconComp className={`h-3.5 w-3.5 ${isSelected ? "text-royal" : "text-white/80"}`} />
                    <span>{cat.name}</span>
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-royal" /> Featured Categories
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Browse popular categories or use arrows to slide through
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedCategory && (
                <button
                  onClick={() => handleCategorySelect("")}
                  className="mr-2 text-xs font-bold text-royal hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Clear Category <X className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={() => scrollCards("left")}
                aria-label="Scroll category cards left"
                className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground hover:bg-sky-soft hover:text-royal transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollCards("right")}
                aria-label="Scroll category cards right"
                className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground hover:bg-sky-soft hover:text-royal transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={cardsScrollRef}
            className="flex gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth"
          >
            {ALL_CATEGORY_META.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              const count = categoryCounts[cat.name] || 0;

              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`group relative flex flex-col shrink-0 w-[170px] sm:w-[195px] overflow-hidden rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-royal ring-2 ring-royal ring-offset-2 ring-offset-background shadow-lg scale-[1.02]"
                      : "border-border/70 bg-card hover:border-royal/40 hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky-soft/40">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    {isSelected && (
                      <div className="absolute top-2 right-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-black text-slate-950 shadow">
                        ACTIVE
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-card flex flex-col justify-between flex-1">
                    <span
                      className={`font-display text-xs sm:text-sm font-bold line-clamp-1 ${
                        isSelected ? "text-royal" : "text-foreground group-hover:text-royal"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground mt-0.5">
                      {count > 0 ? `${count} items` : "Catalog"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mb-8 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products by name or keywords..."
                value={searchVal}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-9 py-2.5 text-sm focus:border-royal focus:outline-none"
              />
              {searchVal && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0 hidden sm:inline">
                Price (Rs.):
              </span>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-24 sm:w-28 rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm text-center focus:border-royal focus:outline-none"
              />
              <span className="text-muted-foreground text-xs">—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 sm:w-28 rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm text-center focus:border-royal focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm font-semibold text-foreground/80 focus:border-royal focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs text-royal">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-royal" /> Filters:
              </span>

              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-semibold text-royal shadow-sm border border-blue-200">
                  Category: <strong>{selectedCategory}</strong>
                  <button
                    onClick={() => handleCategorySelect(selectedCategory)}
                    className="hover:text-red-500 cursor-pointer"
                    aria-label="Remove category filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {searchVal && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-semibold text-royal shadow-sm border border-blue-200">
                  Search: <strong>"{searchVal}"</strong>
                  <button
                    onClick={() => handleSearchChange("")}
                    className="hover:text-red-500 cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-semibold text-royal shadow-sm border border-blue-200">
                  Price:{" "}
                  <strong>
                    {minPrice ? `Rs. ${minPrice}` : "0"} — {maxPrice ? `Rs. ${maxPrice}` : "Max"}
                  </strong>
                  <button
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="hover:text-red-500 cursor-pointer"
                    aria-label="Clear price filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">
            Showing <span className="font-bold text-royal">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
            {selectedCategory && (
              <span className="text-muted-foreground"> in {selectedCategory}</span>
            )}
          </p>
        </div>

        {isLoading ? (
          <SkeletonProductGrid count={8} />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 animate-fade-in">
            {filteredProducts.map((p, idx) => (
              <ProductCard
                key={p.id}
                product={p}
                index={idx}
                onOpen={() => setSelected(p)}
                onAdd={() => handleAddToCart(p, 1)}
                onBuy={() => handleBuy(p)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card py-20 px-4 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-sky-soft text-royal mb-4">
              <RotateCcw className="h-7 w-7" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">No Products Found</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              We couldn't find any gadgets matching your active filter criteria. Try resetting or
              selecting another category.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 rounded-full bg-royal px-6 py-2.5 text-xs font-bold text-primary-foreground hover:bg-royal-deep transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={(qty) => handleAddToCart(selected, qty)}
          onBuy={() => handleBuy(selected)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]">
          <CheckCircle2 className="h-4 w-4 text-gold" />
          {toast}
        </div>
      )}
    </div>
  );
}
