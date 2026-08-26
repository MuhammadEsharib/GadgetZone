import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Heart, ArrowLeft, Package, Trash2, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal } from "@/components/store/ProductModal";
import { SkeletonProductGrid } from "@/components/store/SkeletonCard";
import { products, type Product } from "@/data/products";
import { useWishlist } from "@/lib/wishlistStore";
import { useCart } from "@/lib/cartStore";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — The Gadget Zone" },
      {
        name: "description",
        content: "View your saved items and favorite gadgets at The Gadget Zone.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, clearWishlist, removeFromWishlist } = useWishlist();
  const { cartCount, addToCart } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Map wishlist IDs to full product objects
  const wishlistedProducts = items
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  const handleAddToCart = (product: Product, qty = 1) => {
    addToCart(product.id, qty);
    notify(`Added "${product.name}" to cart`);
  };

  const handleBuy = (product: Product) => {
    addToCart(product.id, 1);
    notify(`Added to cart. Redirecting...`);
    window.location.href = "/cart";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* Header Banner */}
      <div
        className="pt-24 pb-10 sm:pt-28"
        style={{
          background: "linear-gradient(135deg, #0B2545 0%, #134074 40%, #2F73D9 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                My Wishlist
              </h1>
              {wishlistedProducts.length > 0 && (
                <p className="mt-1 text-white/70 text-sm">
                  {wishlistedProducts.length} item{wishlistedProducts.length > 1 ? "s" : ""} saved
                </p>
              )}
            </div>
            {wishlistedProducts.length > 0 && (
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold text-white transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <SkeletonProductGrid count={4} />
        ) : wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-sky-soft text-royal">
              <Heart className="h-12 w-12 text-royal/40" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Your wishlist is empty
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Tap the heart icon on any gadget in our catalog to save it for later.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep"
              >
                <Package className="h-4 w-4" /> Browse Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistedProducts.map((p, idx) => (
              <div key={p.id} className="relative group">
                <ProductCard
                  product={p}
                  index={idx}
                  onOpen={() => setSelected(p)}
                  onAdd={() => handleAddToCart(p)}
                  onBuy={() => handleBuy(p)}
                />
              </div>
            ))}
          </div>
        )}
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
