import { Star, Heart } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { LazyImage } from "./LazyImage";
import { useWishlist } from "@/lib/wishlistStore";

export function ProductCard({
  product,
  onOpen,
  onAdd,
  onBuy,
  index = 0,
}: {
  product: Product;
  onOpen: () => void;
  onAdd: () => void;
  onBuy: () => void;
  index?: number;
}) {
  const stagger = Math.min(index, 7); // cap at 8 stagger classes
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <article
      className={`animate-fade-in-up stagger-${stagger + 1} group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-[var(--shadow-card)]`}
    >
      <div className="relative aspect-square overflow-hidden bg-sky-soft/50">
        <button
          onClick={onOpen}
          className="relative block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <LazyImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 animate-product-pulse"
            style={{ animationDelay: `${index * 0.4}s` }}
          />
        </button>

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-card/85 text-foreground border border-border/50 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-card hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              wishlisted ? "fill-red-500 text-red-500 scale-105" : "text-muted-foreground"
            }`}
          />
        </button>

        {product.discount && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-royal-deep">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="inline-block rounded-full bg-sky-soft px-2 py-0.5 text-[10px] font-bold text-royal w-fit">
          {product.category}
        </span>
        <h3 className="font-display text-[15px] font-bold leading-snug text-foreground line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex text-gold">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          {product.rating}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold text-royal">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto flex min-h-10 gap-2 pt-3">
          <button
            onClick={onAdd}
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="min-h-10 flex-1 rounded-full border border-royal/25 px-3 py-2 text-xs font-bold text-royal transition-colors hover:bg-sky-soft active:scale-95"
          >
            Add to Cart
          </button>
          <button
            onClick={onBuy}
            type="button"
            aria-label={`Buy ${product.name} now`}
            className="min-h-10 flex-1 rounded-full bg-royal px-3 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-royal-deep active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
