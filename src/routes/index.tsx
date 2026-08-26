import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Headphones,
  Smartphone,
  Laptop,
  Tablet,
  Speaker,
  Camera,
  Gamepad2,
  BatteryCharging,
  Cable,
  CheckCircle2,
  Clock,
  Watch,
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  Instagram,
  Music2,
  MessageCircle,
  Tv,
  Home as HomeIcon,
  Plug,
} from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal, Overlay } from "@/components/store/ProductModal";
import { LiveVisitors } from "@/components/store/LiveVisitors";
import { Footer } from "@/components/store/Footer";
import { LazyImage } from "@/components/store/LazyImage";
import { SkeletonProductGrid, SkeletonCategoryCard } from "@/components/store/SkeletonCard";
import { products, categories, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import logo from "@/assets/logo.png";
import heroProducts from "@/assets/hero-products.png";
import banner from "@/assets/banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gadget Zone — Premium Gadgets & Smart Tech in Karachi" },
      {
        name: "description",
        content:
          "Shop earbuds, smart watches, headphones, speakers and power banks at The Gadget Zone. Enhancing your life style with smarter gadgets.",
      },
      { property: "og:title", content: "The Gadget Zone — Premium Gadgets & Smart Tech" },
      {
        property: "og:description",
        content:
          "Discover the latest gadgets and smart technology designed to make everyday life easier.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { cartCount, addToCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  const notify = useCallback((message: string) => setToast(message), []);

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

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} onNotify={notify} />

      {/* Hero Section */}
      <section
        className="relative isolate overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32"
        style={{
          background: `
            radial-gradient(
              circle at 82% 30%,
              rgba(139, 199, 247, 0.28) 0%,
              rgba(139, 199, 247, 0) 38%
            ),
            linear-gradient(
              120deg,
              #0B2545 0%,
              #134074 42%,
              #2F73D9 72%,
              #5B9BEF 100%
            )
          `,
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 py-8 sm:gap-12 sm:py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
            {/* Left Column (Content) */}
            <div className="z-10 flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-[#051124]/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC400] sm:px-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400] animate-pulse" /> Welcome to
                The Gadget Zone
              </span>

              <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.98] text-white">
                Upgrade Your
                <span className="block">Lifestyle With</span>
                <span className="text-[#FFC400]">Smarter Tech</span>
              </h1>

              <p className="mt-6 max-w-[34rem] text-sm font-medium leading-relaxed text-white/78 sm:text-base">
                Discover the latest gadgets and smart technology designed to make your everyday life
                easier.
              </p>

              <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start">
                <Link
                  to="/shop"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#FFC400] px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-[0_4px_20px_rgba(255,196,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD033] sm:flex-none"
                >
                  <ShoppingCart className="h-4 w-4 shrink-0" /> Shop Now
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:flex-none"
                >
                  Explore Gadgets <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Column (Transparent Product Composite) */}
            <div className="relative z-10 flex items-center justify-center lg:col-span-6">
              <div className="relative w-full max-w-[min(100%,38rem)] transition-transform duration-700 hover:scale-[1.015] motion-safe:animate-pop">
                <img
                  src={heroProducts}
                  alt="Premium Smart Gadgets Collection"
                  loading="eager"
                  width={962}
                  height={621}
                  className="h-auto w-full select-none object-contain drop-shadow-[0_20px_35px_rgba(7,28,57,0.32)]"
                />
              </div>
            </div>
          </div>

          {/* Spacing Divider */}
          <div className="h-px w-full bg-white/10 my-6" />

          {/* Trust / Feature Row */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 py-6 sm:gap-6 md:grid-cols-4">
            {[
              { icon: Shield, title: "100% Original", desc: "Genuine Products" },
              { icon: Truck, title: "Fast Delivery", desc: "Across Pakistan" },
              { icon: CreditCard, title: "Secure Payment", desc: "100% Protected" },
              { icon: Clock, title: "24/7 Support", desc: "We're Here to Help" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#FFC400] border border-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-white tracking-wide">
                    {title}
                  </h4>
                  <p className="text-[10px] text-white/60 font-semibold">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Product Category Bar - Infinite Scrolling Marquee */}
          <div className="relative mt-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#051124]/40 py-4 backdrop-blur-sm">
            {/* Soft fade-out gradients on left/right edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#051124]/90 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#051124]/90 to-transparent z-10" />

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
              {/* Set 1 */}
              <div className="flex items-center gap-12 px-6">
                {[
                  { icon: Headphones, name: "Headphones" },
                  { icon: Headphones, name: "Earbuds" },
                  { icon: Watch, name: "Smart Watches" },
                  { icon: Smartphone, name: "Smartphones" },
                  { icon: Laptop, name: "Laptops" },
                  { icon: Tablet, name: "Tablets" },
                  { icon: Speaker, name: "Speakers" },
                  { icon: Camera, name: "Cameras" },
                  { icon: Gamepad2, name: "Gaming" },
                  { icon: BatteryCharging, name: "Power Banks" },
                  { icon: Cable, name: "Chargers & Cables" },
                  { icon: Tv, name: "Smart TVs" },
                  { icon: HomeIcon, name: "Home Appliances" },
                  { icon: Plug, name: "Smart Plug & Power" },
                ].map((cat, idx) => (
                  <Link
                    key={`${cat.name}-1`}
                    to="/shop"
                    search={{ category: cat.name }}
                    className="flex flex-col items-center gap-1.5 group transition-colors shrink-0"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-[#FFC400] group-hover:bg-[#FFC400] group-hover:text-slate-950 transition-colors border border-white/5">
                      <cat.icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] font-bold text-white/80 group-hover:text-white transition-colors text-center whitespace-nowrap">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Set 2 (Duplicate for infinite seamless looping) */}
              <div className="flex items-center gap-12 px-6" aria-hidden="true">
                {[
                  { icon: Headphones, name: "Headphones" },
                  { icon: Headphones, name: "Earbuds" },
                  { icon: Watch, name: "Smart Watches" },
                  { icon: Smartphone, name: "Smartphones" },
                  { icon: Laptop, name: "Laptops" },
                  { icon: Tablet, name: "Tablets" },
                  { icon: Speaker, name: "Speakers" },
                  { icon: Camera, name: "Cameras" },
                  { icon: Gamepad2, name: "Gaming" },
                  { icon: BatteryCharging, name: "Power Banks" },
                  { icon: Cable, name: "Chargers & Cables" },
                  { icon: Tv, name: "Smart TVs" },
                  { icon: HomeIcon, name: "Home Appliances" },
                  { icon: Plug, name: "Smart Plug & Power" },
                ].map((cat, idx) => (
                  <Link
                    key={`${cat.name}-2`}
                    to="/shop"
                    search={{ category: cat.name }}
                    className="flex flex-col items-center gap-1.5 group transition-colors shrink-0"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-[#FFC400] group-hover:bg-[#FFC400] group-hover:text-slate-950 transition-colors border border-white/5">
                      <cat.icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] font-bold text-white/80 group-hover:text-white transition-colors text-center whitespace-nowrap">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section id="trending" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading title="Trending Gadgets" subtitle="Explore our most popular gadgets" />
        <div className="mt-10">
          {isLoading ? (
            <SkeletonProductGrid count={8} />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p, idx) => (
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
          )}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-royal/30 px-7 py-3.5 text-sm font-bold text-royal transition-colors hover:bg-sky-soft"
          >
            See All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="bg-sky-soft/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            title="Shop By Category"
            subtitle="Find exactly what you're looking for"
          />
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCategoryCard key={i} />)
              : categories.map((c) => (
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
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-deep/80 via-royal-deep/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                      <h3 className="font-display text-base font-extrabold text-primary-foreground sm:text-xl">
                        {c.name}
                      </h3>
                      <p className="text-xs text-primary-foreground/70">{c.count}</p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Promotional banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-royal-gradient">
          <img
            src={banner}
            alt="Premium gadgets collection"
            loading="lazy"
            width={1600}
            height={704}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="relative grid gap-6 px-6 py-16 sm:px-14 lg:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                Technology That Fits Your Lifestyle
              </h2>
              <p className="mt-4 text-base text-primary-foreground/80">
                Discover smart gadgets made for everyday life.
              </p>
              <Link
                to="/shop"
                className="mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-royal-deep transition-transform hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-sky-soft/45 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Why Choose The Gadget Zone?"
              subtitle="Everything you need for a confident, convenient purchase"
            />
            <Link
              to="/faq"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-royal transition-colors hover:text-royal-deep"
            >
              Read our FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-royal/10 bg-royal/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Buy with confidence",
                text: "Every gadget is checked for quality and authenticity before it reaches you.",
              },
              {
                icon: CreditCard,
                title: "Fair, clear pricing",
                text: "See the price upfront with no confusing steps or hidden surprises.",
              },
              {
                icon: Truck,
                title: "Delivery that fits",
                text: "Get your order delivered conveniently across Pakistan.",
              },
              {
                icon: Clock,
                title: "Helpful support",
                text: "Questions about setup, warranty, or delivery? We are ready to help.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-card p-5 transition-colors hover:bg-sky-soft/60 sm:p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal/10 text-royal">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-royal-deep">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="bg-sky-soft/60 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold text-royal-deep sm:text-4xl">
            Stay Connected With The Gadget Zone
          </h2>
          <p className="mt-3 text-muted-foreground">
            Follow us for the latest gadgets, deals and updates.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-royal-deep px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Music2 className="h-4 w-4" /> TikTok
            </a>
            <a
              href="https://wa.me/923420024369"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-royal-deep transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

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

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]">
          <CheckCircle2 className="h-4 w-4 text-gold" />
          {toast}
        </div>
      )}
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-extrabold text-royal-deep sm:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
