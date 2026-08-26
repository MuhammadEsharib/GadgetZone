/**
 * SkeletonCard & friends — shared shimmer placeholders
 * Used on every route while data / images are loading.
 */

/** Single product card placeholder */
export function SkeletonProductCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
      {/* Image */}
      <div className="skeleton aspect-square w-full" />
      <div className="flex flex-col gap-3 p-4">
        {/* Title */}
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-5 w-12" />
        </div>
        {/* Buttons */}
        <div className="flex gap-2">
          <div className="skeleton h-8 flex-1 rounded-full" />
          <div className="skeleton h-8 flex-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/** 4-column product grid skeleton */
export function SkeletonProductGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

/** Category card placeholder (image + title overlay) */
export function SkeletonCategoryCard() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <div className="skeleton h-full w-full" />
      <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-1.5">
        <div className="skeleton h-4 w-28 bg-white/30" />
        <div className="skeleton h-3 w-16 bg-white/20" />
      </div>
    </div>
  );
}

/** Hero section skeleton */
export function SkeletonHero() {
  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-10 bg-gradient-to-br from-[#0B2545] to-[#2F73D9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 pt-8 pb-12 items-center lg:grid-cols-12">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="skeleton h-6 w-36 rounded-full bg-white/10" />
            <div className="skeleton h-14 w-full rounded-xl bg-white/10" />
            <div className="skeleton h-14 w-4/5 rounded-xl bg-white/10" />
            <div className="skeleton h-5 w-3/4 rounded-lg bg-white/10" />
            <div className="skeleton h-5 w-2/3 rounded-lg bg-white/10" />
            <div className="flex gap-4 mt-2">
              <div className="skeleton h-12 w-32 rounded-full bg-white/10" />
              <div className="skeleton h-12 w-40 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="skeleton w-full max-w-[400px] aspect-[4/3] rounded-3xl bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Cart item placeholder */
export function SkeletonCartItem() {
  return (
    <div className="flex gap-4 rounded-2xl border border-border/40 bg-card p-4 sm:p-5">
      <div className="skeleton h-5 w-5 rounded-full shrink-0" />
      <div className="skeleton h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24" />
      <div className="flex flex-1 flex-col gap-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex items-center justify-between mt-auto">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/** Order summary skeleton */
export function SkeletonOrderSummary() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
      <div className="skeleton h-16 w-full rounded-none" />
      <div className="p-5 flex flex-col gap-4">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-3/5" />
        <div className="skeleton h-px w-full" />
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-12 w-full rounded-full mt-2" />
        <div className="skeleton h-4 w-32 mx-auto" />
      </div>
    </div>
  );
}

/** Small icon-category tile skeleton */
export function SkeletonCategoryTile() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card p-5">
      <div className="skeleton h-12 w-12 rounded-2xl" />
      <div className="skeleton h-4 w-20" />
      <div className="skeleton h-3 w-14" />
    </div>
  );
}

/** Page-level banner / header skeleton */
export function SkeletonPageBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pt-24 pb-14 sm:pt-28 bg-gradient-to-br from-[#0B2545] to-[#2F73D9] ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-2 mb-4">
          <div className="skeleton h-3 w-12 rounded bg-white/15" />
          <div className="skeleton h-3 w-2 rounded bg-white/10" />
          <div className="skeleton h-3 w-16 rounded bg-white/15" />
        </div>
        <div className="skeleton h-10 w-56 rounded-xl bg-white/15 mb-3" />
        <div className="skeleton h-4 w-80 rounded-lg bg-white/10 mb-2" />
        <div className="skeleton h-4 w-64 rounded-lg bg-white/10" />
      </div>
    </div>
  );
}
