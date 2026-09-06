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
      className={`animate-fade-in-up stagger-${stagger + 1} group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-[var(--shadow-card)]`}
    >
      <div className="relative aspect-square overflow-hidden bg-sky-soft/50">
        <button
          onClick={onOpen}
          className="relative block h-full w-full cursor-pointer"
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
          className="absolute right-1.5 top-1.5 sm:right-2.5 sm:top-2.5 z-20 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-card/90 text-foreground border border-border/50 shadow-sm hover:bg-card hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 ${
              wishlisted ? "fill-red-500 text-red-500 scale-105" : "text-muted-foreground"
            }`}
          />
        </button>

        {product.discount && product.inStock !== false && (
          <span className="absolute left-1.5 top-1.5 sm:left-2.5 sm:top-2.5 z-10 rounded-full bg-gold px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10.5px] font-extrabold text-royal-deep shadow-sm">
            {product.discount}% OFF
          </span>
        )}

        {/* Out of Stock Overlay */}
        {product.inStock === false && (
          <div className="absolute inset-0 z-10 bg-slate-950/60 backdrop-blur-[1.5px] flex items-center justify-center p-2">
            <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg border border-rose-400/40">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 sm:gap-1.5 p-2.5 sm:p-4">
        <div className="flex items-center justify-between gap-1">
          <span className="inline-block rounded-full bg-sky-soft px-1.5 py-0.5 text-[8.5px] sm:text-[10px] font-bold text-royal w-fit">
            {product.category}
          </span>
          {product.inStock === false && (
            <span className="text-[9px] sm:text-[10px] font-extrabold text-rose-600">
              Unavailable
            </span>
          )}
        </div>
        <h3 className="font-display text-[11.5px] sm:text-[14px] font-bold leading-tight sm:leading-snug text-foreground line-clamp-2 min-h-[2.2rem] sm:min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
          <span className="flex text-gold">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold">{product.rating}</span>
        </div>
        <div className="flex items-baseline gap-1.5 flex-wrap mt-0.5">
          <span className="font-display text-xs sm:text-base font-extrabold text-royal">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {product.inStock === false ? (
          <div className="mt-auto pt-2 sm:pt-3">
            <button
              type="button"
              disabled
              className="w-full rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 sm:py-2 text-[9px] sm:text-xs font-bold cursor-not-allowed text-center uppercase tracking-wider opacity-90"
            >
              Out of Stock
            </button>
          </div>
        ) : (
          <div className="mt-auto flex gap-1 sm:gap-2 pt-2 sm:pt-3">
            <button
              onClick={onAdd}
              type="button"
              aria-label={`Add ${product.name} to cart`}
              className="flex-1 rounded-full border border-royal/25 px-1.5 py-1.5 sm:px-3 sm:py-2 text-[9px] sm:text-xs font-bold text-royal transition-colors hover:bg-sky-soft active:scale-95 cursor-pointer text-center whitespace-nowrap"
            >
              Add to Cart
            </button>
            <button
              onClick={onBuy}
              type="button"
              aria-label={`Buy ${product.name} now`}
              className="flex-1 rounded-full bg-royal px-1.5 py-1.5 sm:px-3 sm:py-2 text-[9px] sm:text-xs font-bold text-primary-foreground transition-colors hover:bg-royal-deep active:scale-95 cursor-pointer text-center whitespace-nowrap"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
