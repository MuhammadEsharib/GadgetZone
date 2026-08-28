import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Star,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Package,
  Tag,
  X,
  Heart,
  RefreshCcw,
} from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { LazyImage } from "@/components/store/LazyImage";
import { SkeletonCartItem, SkeletonOrderSummary } from "@/components/store/SkeletonCard";
import { products, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — The Gadget Zone" },
      {
        name: "description",
        content:
          "Review your cart items, check prices and complete your purchase at The Gadget Zone.",
      },
    ],
  }),
  component: CartPage,
});

export type CartItem = {
  product: Product;
  qty: number;
};

// Toast
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex max-w-[calc(100vw-2rem)] items-start gap-3 rounded-2xl border border-emerald-500/25 bg-card px-5 py-4 text-foreground shadow-[0_20px_60px_-15px_rgba(16,185,129,0.35)] animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
        <CheckCircle2 className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-bold text-foreground">{message}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Your order will arrive in 2-4 business days
        </p>
      </div>
      <button
        onClick={onDone}
        className="ml-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Image gallery with smooth crossfade
function ProductImages({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-sky-soft/40">
        {product.gallery.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-500 ${i === activeIdx ? "opacity-100" : "opacity-0"}`}
          >
            <LazyImage
              src={img}
              alt={i === 0 ? product.name : ""}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {product.discount && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-royal-deep">
            {product.discount}% OFF
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {product.gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`relative aspect-square w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
              activeIdx === i
                ? "border-royal shadow-[0_0_0_2px_rgba(30,90,210,0.15)]"
                : "border-border/40 hover:border-royal/50"
            }`}
            aria-label={`Image ${i + 1}`}
          >
            <LazyImage src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Cart item card
function CartItemCard({
  item,
  onQtyChange,
  onRemove,
  isSelected,
  onSelect,
}: {
  item: CartItem;
  onQtyChange: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  isSelected: boolean;
  onSelect: (id: number) => void;
}) {
  const { product, qty } = item;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl border bg-card transition-all duration-300 ${
        isSelected
          ? "border-royal shadow-[var(--shadow-card)]"
          : "border-border/60 hover:border-royal/30"
      }`}
    >
      <div className="flex gap-4 p-4 sm:gap-5 sm:p-5">
        {/* Select checkbox */}
        <button
          onClick={() => onSelect(product.id)}
          className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${
            isSelected ? "border-royal bg-royal" : "border-border group-hover:border-royal/50"
          }`}
          aria-label="Select item"
        >
          {isSelected && (
            <svg viewBox="0 0 10 10" className="h-full w-full p-0.5 text-white" fill="none">
              <polyline
                points="1.5,5 4,7.5 8.5,2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Thumbnail */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sky-soft/50 sm:h-24 sm:w-24"
          aria-label="Expand product details"
        >
          <LazyImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </button>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-soft px-2 py-0.5 text-[10px] font-bold text-royal mb-1">
                <Tag className="h-2.5 w-2.5" />
                {product.category}
              </span>
              <h3 className="font-display text-sm font-bold leading-snug text-foreground sm:text-base line-clamp-2">
                {product.name}
              </h3>
            </div>
            <button
              onClick={() => onRemove(product.id)}
              className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label="Remove from cart"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="flex text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3 w-3" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            {product.rating}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-extrabold text-royal sm:text-lg">
                {formatPrice(product.price * qty)}
              </span>
              {qty > 1 && (
                <span className="text-xs text-muted-foreground">
                  ({formatPrice(product.price)} each)
                </span>
              )}
              {product.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.oldPrice * qty)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-background px-2 py-1">
              <button
                onClick={() => onQtyChange(product.id, Math.max(1, qty - 1))}
                disabled={qty <= 1}
                className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sky-soft hover:text-royal disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-5 text-center text-xs font-bold tabular-nums">{qty}</span>
              <button
                onClick={() => onQtyChange(product.id, qty + 1)}
                className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sky-soft hover:text-royal"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable detail panel with image gallery */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border/40 px-4 py-5 sm:px-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <ProductImages product={product} />
            <div className="flex flex-col gap-3">
              <h4 className="font-display text-lg font-bold text-foreground">{product.name}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 text-xs">
                {product.discount && (
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 font-bold text-amber-700 border border-amber-200">
                    Save {product.discount}%
                  </span>
                )}
                <span className="rounded-full bg-sky-soft px-3 py-1.5 font-semibold text-royal border border-royal/10">
                  {product.rating} Rating
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700 border border-emerald-100">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-1 border-t border-border/30 py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-sky-soft/30 hover:text-royal rounded-b-2xl"
      >
        {expanded ? "Hide details" : "View details & images"}
        <ChevronRight
          className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
        />
      </button>
    </div>
  );
}

// Order Summary
function OrderSummary({
  items,
  selectedIds,
  onPlaceOrder,
}: {
  items: CartItem[];
  selectedIds: Set<number>;
  onPlaceOrder: () => void;
}) {
  const selectedItems = items.filter((i) => selectedIds.has(i.product.id));
  const subtotal = selectedItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const savedAmount = selectedItems.reduce(
    (sum, i) => sum + (i.product.oldPrice ? (i.product.oldPrice - i.product.price) * i.qty : 0),
    0,
  );
  const shipping = subtotal > 5000 ? 0 : 299;
  const total = subtotal + shipping;

  return (
    <div className="sticky top-24 rounded-2xl border border-border/60 bg-card overflow-hidden shadow-[0_4px_32px_-12px_rgba(30,90,210,0.1)]">
      <div className="bg-royal px-5 py-4">
        <h3 className="font-display text-base font-bold text-white">Order Summary</h3>
        <p className="text-xs text-white/70 mt-0.5">
          {selectedItems.length === 0
            ? "Select items to see your total"
            : `${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""} selected`}
        </p>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>

        {savedAmount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-600">You save</span>
            <span className="font-semibold text-emerald-600">-{formatPrice(savedAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className={shipping === 0 ? "font-semibold text-emerald-600" : "font-semibold"}>
            {shipping === 0 ? "FREE" : formatPrice(shipping)}
          </span>
        </div>

        {subtotal > 0 && subtotal < 5000 && (
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700 border border-amber-100">
            Add {formatPrice(5000 - subtotal)} more for free shipping!
          </p>
        )}

        <div className="border-t border-border/40 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-foreground">Total</span>
            <span className="font-display text-xl font-extrabold text-royal">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={selectedItems.length === 0}
          id="place-order-btn"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-royal py-3.5 text-sm font-bold text-white transition-all hover:bg-royal-deep hover:shadow-[0_8px_24px_-8px_rgba(30,90,210,0.5)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.97]"
        >
          <Sparkles className="h-4 w-4" />
          Place Order
        </button>

        <Link
          to="/shop"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-royal"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Continue Shopping
        </Link>

        <div className="mt-1 grid grid-cols-3 gap-2 border-t border-border/30 pt-4">
          {[
            { icon: ShieldCheck, label: "Secure" },
            { icon: Truck, label: "Fast Ship" },
            { icon: RefreshCcw, label: "Returns" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl bg-sky-soft/40 p-2 text-center"
            >
              <Icon className="h-4 w-4 text-royal" />
              <span className="text-[10px] font-semibold text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Empty cart
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="relative grid h-28 w-28 place-items-center rounded-full bg-sky-soft">
        <ShoppingCart className="h-12 w-12 text-royal/40" />
        <span className="absolute -top-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-gold text-xs font-bold text-royal-deep">
          0
        </span>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Your cart is empty</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Looks like you haven't added anything yet.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep"
        >
          <Package className="h-4 w-4" /> Browse Products
        </Link>
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-royal/40 hover:bg-sky-soft"
        >
          Shop by Category
        </Link>
      </div>

      <div className="w-full max-w-3xl mt-6">
        <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">
          You might like
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to="/shop"
              className="group rounded-xl border border-border/60 bg-card p-3 text-left transition-all hover:border-royal/30 hover:shadow-[var(--shadow-card)]"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-sky-soft/40 mb-2">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs font-bold line-clamp-2 text-foreground">{p.name}</p>
              <p className="text-xs font-extrabold text-royal mt-0.5">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main page
function CartPage() {
  const navigate = useNavigate();
  const { items, cartCount: navCartCount, updateQty, removeFromCart, clearCart } = useCart();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Map CartItemData (id, qty) to CartItem (product, qty)
  const cartItems: CartItem[] = items
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { product, qty: item.qty } : null;
    })
    .filter(Boolean) as CartItem[];

  useEffect(() => {
    // Keep selected IDs in sync with cart items (remove unselected)
    setSelectedIds((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const id of next) {
        if (!items.find((i) => i.id === id)) {
          next.delete(id);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [items]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleQtyChange = (id: number, qty: number) => {
    updateQty(id, qty);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === cartItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cartItems.map((i) => i.product.id)));
    }
  };

  const handlePlaceOrder = useCallback(() => {
    const sel = cartItems.filter((i) => selectedIds.has(i.product.id));
    if (sel.length === 0) {
      setToast("Select at least one item to continue to checkout.");
      return;
    }
    localStorage.setItem("gz_checkout_items", JSON.stringify(sel.map((item) => item.product.id)));
    // Navigate to dedicated secure checkout page
    navigate({ to: "/checkout" });
  }, [cartItems, selectedIds, navigate]);

  const notify = useCallback((m: string) => setToast(m), []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={navCartCount} onNotify={notify} />

      {/* Page header */}
      <div
        className="pt-24 pb-10 sm:pt-28"
        style={{
          background: "linear-gradient(135deg, #0B2545 0%, #134074 40%, #2F73D9 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Cart</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                Shopping Cart
              </h1>
              {cartItems.length > 0 && (
                <p className="mt-1 text-white/70 text-sm">
                  {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
                </p>
              )}
            </div>
            {cartItems.length > 0 && (
              <Link
                to="/shop"
                className="flex items-center gap-1.5 text-sm font-bold text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Continue Shopping
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {isLoading ? (
          /* Skeleton loading state */
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="flex flex-col gap-4">
              <div className="skeleton h-12 w-full rounded-xl" />
              <SkeletonCartItem />
              <SkeletonCartItem />
              <SkeletonCartItem />
            </div>
            <SkeletonOrderSummary />
          </div>
        ) : cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Left: items */}
            <div className="flex flex-col gap-4">
              {/* Select all bar */}
              <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3">
                <button
                  onClick={toggleSelectAll}
                  id="select-all-btn"
                  className="flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-royal transition-colors"
                >
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${
                      selectedIds.size === cartItems.length
                        ? "border-royal bg-royal"
                        : "border-border"
                    }`}
                  >
                    {selectedIds.size === cartItems.length && (
                      <svg
                        viewBox="0 0 10 10"
                        className="h-full w-full p-0.5 text-white"
                        fill="none"
                      >
                        <polyline
                          points="1.5,5 4,7.5 8.5,2"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  Select All ({cartItems.length})
                </button>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{selectedIds.size} selected</span>
                  {selectedIds.size > 0 && (
                    <button
                      onClick={() => Array.from(selectedIds).forEach(handleRemove)}
                      className="flex items-center gap-1 text-red-500 font-semibold hover:underline"
                    >
                      <Trash2 className="h-3 w-3" /> Remove selected
                    </button>
                  )}
                </div>
              </div>

              {cartItems.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                  isSelected={selectedIds.has(item.product.id)}
                  onSelect={handleSelect}
                />
              ))}

              {/* Wishlist hint */}
              <div className="rounded-xl border border-dashed border-border/60 bg-sky-soft/20 px-4 py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-red-400 shrink-0" />
                  <span>
                    Want to save items for later? Manage your favorite gadgets in your{" "}
                    <Link to="/wishlist" className="font-bold text-royal hover:underline">
                      Wishlist
                    </Link>
                    .
                  </span>
                </div>
              </div>

              {/* Payment methods */}
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/40 px-4 py-3">
                <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">
                  We accept: Cash on Delivery · Bank Transfer · EasyPaisa · JazzCash
                </span>
              </div>
            </div>

            {/* Right: summary */}
            <OrderSummary
              items={cartItems}
              selectedIds={selectedIds}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        )}
      </div>

      <Footer />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
