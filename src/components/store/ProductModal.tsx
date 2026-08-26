import { useEffect, useState } from "react";
import { X, Star, Minus, Plus, Heart } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useWishlist } from "@/lib/wishlistStore";
import { LazyImage } from "./LazyImage";

export function ProductModal({
  product,
  onClose,
  onAdd,
  onBuy,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (qty: number) => void;
  onBuy: () => void;
}) {
  const [active, setActive] = useState(product.gallery[0]);
  const [qty, setQty] = useState(1);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);

  useEffect(() => {
    setActive(product.gallery[0]);
    setQty(1);
  }, [product]);

  return (
    <Overlay onClose={onClose}>
      <div
        role="document"
        className="grid max-h-[calc(100vh-2rem)] gap-8 overflow-y-auto p-6 sm:p-8 md:grid-cols-2"
      >
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-sky-soft/60">
            {product.gallery.map((g, i) => (
              <div
                key={g}
                className={`absolute inset-0 transition-opacity duration-500 ${active === g ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <LazyImage
                  src={g}
                  alt={i === 0 ? product.name : ""}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.gallery.map((g) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                type="button"
                aria-label={`View product image ${product.gallery.indexOf(g) + 1}`}
                aria-pressed={active === g}
                className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-colors ${
                  active === g ? "border-royal" : "border-transparent hover:border-royal/30"
                }`}
              >
                <LazyImage src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="font-display text-2xl font-extrabold text-foreground">{product.name}</h3>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="flex text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            {product.rating} rating
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-extrabold text-royal">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold">Quantity</span>
            <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={qty === 1}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-sm font-bold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onAdd(qty)}
              className="flex-1 rounded-full border border-royal/30 px-5 py-3 text-sm font-bold text-royal transition-colors hover:bg-sky-soft"
            >
              Add to Cart
            </button>
            <button
              onClick={onBuy}
              className="flex-1 rounded-full bg-royal px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`rounded-full border p-3.5 transition-colors ${
                isFav
                  ? "border-rose-500/20 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                  : "border-border text-muted-foreground hover:bg-sky-soft hover:text-foreground"
              }`}
              aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className="h-5 w-5" fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

export function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-royal-deep/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Product details"
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl rounded-3xl bg-card shadow-[var(--shadow-float)]"
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground/70 transition-colors hover:bg-sky-soft"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
