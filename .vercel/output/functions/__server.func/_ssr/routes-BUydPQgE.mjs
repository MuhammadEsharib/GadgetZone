import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as categories, n as Navbar, s as products, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { G as Gamepad2, H as House, J as CreditCard, M as MessageCircle, R as Laptop, T as Plug, W as Headphones, Y as Clock, Z as CircleCheck, a as Tv, et as Camera, f as Speaker, g as ShoppingCart, it as ArrowRight, k as Music2, l as Tablet, m as Smartphone, o as Truck, r as Watch, rt as BatteryCharging, tt as Cable, v as Shield, z as Instagram } from "../_libs/lucide-react.mjs";
import { t as LiveVisitors } from "./LiveVisitors-BGuUhSx6.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { o as SkeletonProductGrid, r as SkeletonCategoryCard } from "./SkeletonCard-C6Aiiu2v.mjs";
import { n as ProductCard, r as ProductModal } from "./ProductCard-Dk1ZAr7F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BUydPQgE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var hero_products_default = "/assets/hero-products-D3hkE_be.png";
var banner_default = "/assets/banner-AhnyyYG4.jpg";
function Home() {
	const { cartCount, addToCart } = useCart();
	const navigate = useNavigate();
	const [toast, setToast] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const frame = requestAnimationFrame(() => setIsLoading(false));
		return () => cancelAnimationFrame(frame);
	}, []);
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(id);
	}, [toast]);
	const handleAddToCart = (product, qty = 1) => {
		addToCart(product.id, qty);
		notify("Added to cart");
	};
	const handleBuy = (product) => {
		if (product) addToCart(product.id, 1);
		setSelected(null);
		navigate({ to: "/checkout" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative isolate overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32",
				style: { background: `
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
          ` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid items-center gap-10 py-8 sm:gap-12 sm:py-12 lg:grid-cols-12 lg:gap-8 lg:py-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "z-10 flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-[#051124]/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC400] sm:px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[#FFC400] animate-pulse" }), " Welcome to The Gadget Zone"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "mt-5 max-w-[12ch] font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.98] text-white",
										children: [
											"Upgrade Your",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block",
												children: "Lifestyle With"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[#FFC400]",
												children: "Smarter Tech"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 max-w-[34rem] text-sm font-medium leading-relaxed text-white/78 sm:text-base",
										children: "Discover the latest gadgets and smart technology designed to make your everyday life easier."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/shop",
											className: "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#FFC400] px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-[0_4px_20px_rgba(255,196,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD033] sm:flex-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4 shrink-0" }), " Shop Now"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/shop",
											className: "inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:flex-none",
											children: ["Explore Gadgets ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 shrink-0" })]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-10 flex items-center justify-center lg:col-span-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative w-full max-w-[min(100%,38rem)] transition-transform duration-700 hover:scale-[1.015] motion-safe:animate-pop",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: hero_products_default,
										alt: "Premium Smart Gadgets Collection",
										loading: "eager",
										width: 962,
										height: 621,
										className: "h-auto w-full select-none object-contain drop-shadow-[0_20px_35px_rgba(7,28,57,0.32)]"
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-white/10 my-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 py-6 sm:gap-6 md:grid-cols-4",
							children: [
								{
									icon: Shield,
									title: "100% Original",
									desc: "Genuine Products"
								},
								{
									icon: Truck,
									title: "Fast Delivery",
									desc: "Across Pakistan"
								},
								{
									icon: CreditCard,
									title: "Secure Payment",
									desc: "100% Protected"
								},
								{
									icon: Clock,
									title: "24/7 Support",
									desc: "We're Here to Help"
								}
							].map(({ icon: Icon, title, desc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#FFC400] border border-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-xs font-bold text-white tracking-wide",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-white/60 font-semibold",
									children: desc
								})] })]
							}, title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#051124]/40 py-4 backdrop-blur-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#051124]/90 to-transparent z-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#051124]/90 to-transparent z-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-12 px-6",
										children: [
											{
												icon: Headphones,
												name: "Headphones"
											},
											{
												icon: Headphones,
												name: "Earbuds"
											},
											{
												icon: Watch,
												name: "Smart Watches"
											},
											{
												icon: Smartphone,
												name: "Smartphones"
											},
											{
												icon: Laptop,
												name: "Laptops"
											},
											{
												icon: Tablet,
												name: "Tablets"
											},
											{
												icon: Speaker,
												name: "Speakers"
											},
											{
												icon: Camera,
												name: "Cameras"
											},
											{
												icon: Gamepad2,
												name: "Gaming"
											},
											{
												icon: BatteryCharging,
												name: "Power Banks"
											},
											{
												icon: Cable,
												name: "Chargers & Cables"
											},
											{
												icon: Tv,
												name: "Smart TVs"
											},
											{
												icon: House,
												name: "Home Appliances"
											},
											{
												icon: Plug,
												name: "Smart Plug & Power"
											}
										].map((cat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/shop",
											search: { category: cat.name },
											className: "flex flex-col items-center gap-1.5 group transition-colors shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-[#FFC400] group-hover:bg-[#FFC400] group-hover:text-slate-950 transition-colors border border-white/5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: "h-4.5 w-4.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-white/80 group-hover:text-white transition-colors text-center whitespace-nowrap",
												children: cat.name
											})]
										}, `${cat.name}-1`))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-12 px-6",
										"aria-hidden": "true",
										children: [
											{
												icon: Headphones,
												name: "Headphones"
											},
											{
												icon: Headphones,
												name: "Earbuds"
											},
											{
												icon: Watch,
												name: "Smart Watches"
											},
											{
												icon: Smartphone,
												name: "Smartphones"
											},
											{
												icon: Laptop,
												name: "Laptops"
											},
											{
												icon: Tablet,
												name: "Tablets"
											},
											{
												icon: Speaker,
												name: "Speakers"
											},
											{
												icon: Camera,
												name: "Cameras"
											},
											{
												icon: Gamepad2,
												name: "Gaming"
											},
											{
												icon: BatteryCharging,
												name: "Power Banks"
											},
											{
												icon: Cable,
												name: "Chargers & Cables"
											},
											{
												icon: Tv,
												name: "Smart TVs"
											},
											{
												icon: House,
												name: "Home Appliances"
											},
											{
												icon: Plug,
												name: "Smart Plug & Power"
											}
										].map((cat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/shop",
											search: { category: cat.name },
											className: "flex flex-col items-center gap-1.5 group transition-colors shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-[#FFC400] group-hover:bg-[#FFC400] group-hover:text-slate-950 transition-colors border border-white/5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: "h-4.5 w-4.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-white/80 group-hover:text-white transition-colors text-center whitespace-nowrap",
												children: cat.name
											})]
										}, `${cat.name}-2`))
									})]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "trending",
				className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Trending Gadgets",
						subtitle: "Explore our most popular gadgets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonProductGrid, { count: 8 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
							children: products.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
								product: p,
								index: idx,
								onOpen: () => setSelected(p),
								onAdd: () => handleAddToCart(p, 1),
								onBuy: () => handleBuy(p)
							}, p.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "group inline-flex items-center gap-2 rounded-full border border-royal/30 px-7 py-3.5 text-sm font-bold text-royal transition-colors hover:bg-sky-soft",
							children: ["See All Products", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "categories",
				className: "bg-sky-soft/50 py-16 lg:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Shop By Category",
						subtitle: "Find exactly what you're looking for"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3",
						children: isLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCategoryCard, {}, i)) : categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							search: { category: c.name },
							className: "group relative aspect-[4/3] overflow-hidden rounded-2xl text-left shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.image,
									alt: c.name,
									loading: "lazy",
									width: 800,
									height: 600,
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-royal-deep/80 via-royal-deep/10 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-0 left-0 p-4 sm:p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-base font-extrabold text-primary-foreground sm:text-xl",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-primary-foreground/70",
										children: c.count
									})]
								})
							]
						}, c.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl bg-royal-gradient",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: banner_default,
						alt: "Premium gadgets collection",
						loading: "lazy",
						width: 1600,
						height: 704,
						className: "absolute inset-0 h-full w-full object-cover opacity-60"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative grid gap-6 px-6 py-16 sm:px-14 lg:py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl",
									children: "Technology That Fits Your Lifestyle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-base text-primary-foreground/80",
									children: "Discover smart gadgets made for everyday life."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-royal-deep transition-transform hover:scale-105",
									children: "Shop Now"
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-sky-soft/45 py-16 sm:py-20 lg:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							title: "Why Choose The Gadget Zone?",
							subtitle: "Everything you need for a confident, convenient purchase"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/faq",
							className: "inline-flex shrink-0 items-center gap-2 text-sm font-bold text-royal transition-colors hover:text-royal-deep",
							children: ["Read our FAQs ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-px overflow-hidden rounded-2xl border border-royal/10 bg-royal/10 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							{
								icon: Shield,
								title: "Buy with confidence",
								text: "Every gadget is checked for quality and authenticity before it reaches you."
							},
							{
								icon: CreditCard,
								title: "Fair, clear pricing",
								text: "See the price upfront with no confusing steps or hidden surprises."
							},
							{
								icon: Truck,
								title: "Delivery that fits",
								text: "Get your order delivered conveniently across Pakistan."
							},
							{
								icon: Clock,
								title: "Helpful support",
								text: "Questions about setup, warranty, or delivery? We are ready to help."
							}
						].map(({ icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card p-5 transition-colors hover:bg-sky-soft/60 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-11 w-11 place-items-center rounded-xl bg-royal/10 text-royal",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-base font-bold text-royal-deep",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: text
								})
							]
						}, title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-sky-soft/60 py-16 lg:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-4 text-center sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-extrabold text-royal-deep sm:text-4xl",
							children: "Stay Connected With The Gadget Zone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "Follow us for the latest gadgets, deals and updates."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://instagram.com",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" }), " Instagram"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://tiktok.com",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full bg-royal-deep px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "h-4 w-4" }), " TikTok"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/923420024369",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-royal-deep transition-transform hover:scale-105",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " WhatsApp"]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveVisitors, {}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductModal, {
				product: selected,
				onClose: () => setSelected(null),
				onAdd: (qty) => handleAddToCart(selected, qty),
				onBuy: () => handleBuy(selected)
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), toast]
			})
		]
	});
}
function SectionHeading({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-extrabold text-royal-deep sm:text-4xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted-foreground",
			children: subtitle
		})]
	});
}
//#endregion
export { Home as component };
