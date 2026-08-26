import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal, Overlay } from "@/components/store/ProductModal";
import { LiveVisitors } from "@/components/store/LiveVisitors";
import { SkeletonProductGrid } from "@/components/store/SkeletonCard";
import { products, categories, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import { Filter, RotateCcw, SlidersHorizontal, CheckCircle2 } from "lucide-react";

const shopSearchSchema = z.object({
  search: z.string().optional().catch(""),
  category: z.string().optional().catch(""),
});

export const Route = createFileRoute("/shop")({
  validateSearch: (search) => shopSearchSchema.parse(search),
  component: Shop,
});

function Shop() {
  const { search: searchParam, category: categoryParam } = Route.useSearch();
  const routeNavigate = Route.useNavigate();
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchVal, setSearchVal] = useState(searchParam || "");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Update search input when query param changes (e.g. from header search)
  useEffect(() => {
    setSearchVal(searchParam || "");
  }, [searchParam]);

  // Update category when query param changes
  useEffect(() => {
    setSelectedCategory(categoryParam || "");
  }, [categoryParam]);

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

  // Sync state filters back to URL
  const updateUrlParams = (updatedCategory: string, updatedSearch: string) => {
    routeNavigate({
      to: "/shop",
      search: {
        category: updatedCategory || undefined,
        search: updatedSearch || undefined,
      },
    });
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

  // Filtering Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        !searchVal ||
        product.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        product.description.toLowerCase().includes(searchVal.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        product.name
          .toLowerCase()
          .includes(
            selectedCategory
              .replace("Smart Watches", "Watch")
              .replace("Earbuds", "Earbuds")
              .replace("Speakers", "Speaker")
              .replace("Power Banks", "Power")
              .replace("Mobile Accessories", "Charger")
              .toLowerCase(),
          );

      // If category has a custom mapping, check it
      const categoryMapping: Record<string, string[]> = {
        Earbuds: ["earbuds"],
        "Smart Watches": ["watch", "fitness"],
        Headphones: ["headset", "earbuds"],
        Speakers: ["speaker"],
        "Power Banks": ["power bank"],
        "Mobile Accessories": ["charger", "cable", "power bank"],
      };

      const words = categoryMapping[selectedCategory];
      const matchesCategoryMapping =
        !selectedCategory ||
        (words && words.some((word) => product.name.toLowerCase().includes(word)));

      const finalCategoryMatch = matchesCategory || matchesCategoryMapping;

      const price = product.price;
      const matchesMin = !minPrice || price >= Number(minPrice);
      const matchesMax = !maxPrice || price <= Number(maxPrice);

      return matchesSearch && finalCategoryMatch && matchesMin && matchesMax;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured
    });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* Header Spacer */}
      <div className="pt-24 sm:pt-28 md:pt-32" />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Page title and banner */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="font-display text-4xl font-extrabold text-royal-deep sm:text-5xl">
            Explore Gadgets
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl">
            Find the perfect smartwatch, audio device, or accessory tailored to fit your lifestyle.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters - Desktop (Sidebar) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-royal" /> Filters
                </span>
                {(searchVal ||
                  selectedCategory ||
                  minPrice ||
                  maxPrice ||
                  sortBy !== "featured") && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-xs font-bold text-royal hover:text-royal-deep transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                )}
              </div>

              {/* Search filter inside page */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Refine Search
                </label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchVal}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-royal focus:outline-none"
                />
              </div>

              {/* Categories list */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Categories
                </label>
                <div className="space-y-1.5">
                  {categories.map((c) => {
                    const isSelected = selectedCategory === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => handleCategorySelect(c.name)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                          isSelected
                            ? "bg-royal/10 text-royal"
                            : "hover:bg-sky-soft text-foreground/80 hover:text-foreground"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span
                          className={`text-[10px] ${isSelected ? "text-royal/80" : "text-muted-foreground"}`}
                        >
                          {c.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price range filter */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price (Rs.)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-center focus:border-royal focus:outline-none"
                  />
                  <span className="self-center text-muted-foreground text-xs">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-center focus:border-royal focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Product showcase area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sorting and Mobile Filter triggers */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3.5 py-1.5 text-sm font-bold text-foreground/80 hover:bg-sky-soft hover:text-foreground lg:hidden"
                >
                  <Filter className="h-4 w-4" /> Filters
                </button>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground/80 focus:border-royal focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products grid */}
            {isLoading ? (
              <SkeletonProductGrid count={6} />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in">
                {filteredProducts.map((p, idx) => (
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
            ) : (
              /* Empty state matching premium aesthetic */
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card py-20 px-4 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-sky-soft text-royal mb-4">
                  <RotateCcw className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  No Products Found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  We couldn't find any gadgets matching your filter criteria. Try resetting or
                  adjustments.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 rounded-full bg-royal px-6 py-2.5 text-xs font-bold text-primary-foreground hover:bg-royal-deep transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Sheet */}
      {isMobileFilterOpen && (
        <Overlay onClose={() => setIsMobileFilterOpen(false)}>
          <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-display text-base font-bold text-foreground">Filters</span>
              <button
                onClick={() => {
                  handleResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="text-xs font-bold text-royal"
              >
                Reset All
              </button>
            </div>

            {/* Mobile Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={searchVal}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-royal focus:outline-none"
              />
            </div>

            {/* Mobile Categories */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Categories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => {
                  const isSelected = selectedCategory === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => handleCategorySelect(c.name)}
                      className={`rounded-lg border px-3 py-2 text-center text-xs font-bold transition-all ${
                        isSelected
                          ? "border-royal bg-royal/10 text-royal"
                          : "border-border bg-card text-foreground/80 hover:bg-sky-soft"
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-royal focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-royal focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-4 w-full rounded-full bg-royal py-3 text-sm font-bold text-primary-foreground hover:bg-royal-deep transition-all"
            >
              Apply Filters
            </button>
          </div>
        </Overlay>
      )}

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
