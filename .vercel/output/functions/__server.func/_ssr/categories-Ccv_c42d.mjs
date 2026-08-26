import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as categories, n as Navbar, s as products, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { G as Gamepad2, H as House, Q as ChevronRight, R as Laptop, T as Plug, W as Headphones, Z as CircleCheck, a as Tv, et as Camera, f as Speaker, h as SlidersHorizontal, it as ArrowRight, l as Tablet, m as Smartphone, r as Watch, rt as BatteryCharging, tt as Cable } from "../_libs/lucide-react.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { i as SkeletonCategoryTile, r as SkeletonCategoryCard } from "./SkeletonCard-C6Aiiu2v.mjs";
import { n as ProductCard, r as ProductModal, t as Overlay } from "./ProductCard-Dk1ZAr7F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-Ccv_c42d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ALL_CATEGORIES = [
	{
		name: "Earbuds",
		icon: Headphones,
		color: "from-purple-500 to-indigo-600"
	},
	{
		name: "Smart Watches",
		icon: Watch,
		color: "from-blue-500 to-cyan-600"
	},
	{
		name: "Headphones",
		icon: Headphones,
		color: "from-pink-500 to-rose-600"
	},
	{
		name: "Speakers",
		icon: Speaker,
		color: "from-orange-500 to-amber-600"
	},
	{
		name: "Power Banks",
		icon: BatteryCharging,
		color: "from-emerald-500 to-teal-600"
	},
	{
		name: "Mobile Accessories",
		icon: Cable,
		color: "from-sky-500 to-blue-600"
	},
	{
		name: "Smartphones",
		icon: Smartphone,
		color: "from-violet-500 to-purple-600"
	},
	{
		name: "Laptops",
		icon: Laptop,
		color: "from-slate-600 to-gray-700"
	},
	{
		name: "Tablets",
		icon: Tablet,
		color: "from-red-500 to-rose-600"
	},
	{
		name: "Cameras",
		icon: Camera,
		color: "from-amber-500 to-yellow-600"
	},
	{
		name: "Gaming",
		icon: Gamepad2,
		color: "from-green-500 to-emerald-600"
	},
	{
		name: "Chargers & Cables",
		icon: Plug,
		color: "from-teal-500 to-cyan-600"
	},
	{
		name: "Smart TVs",
		icon: Tv,
		color: "from-indigo-500 to-blue-600"
	},
	{
		name: "Home Appliances",
		icon: House,
		color: "from-rose-500 to-pink-600"
	}
];
function CategoriesPage() {
	const { cartCount, addToCart } = useCart();
	const [toast, setToast] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [dialog, setDialog] = (0, import_react.useState)(null);
	const [activeCategory, setActiveCategory] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const notify = (0, import_react.useCallback)((m) => setToast(m), []);
	(0, import_react.useEffect)(() => {
		const frame = requestAnimationFrame(() => setIsLoading(false));
		return () => cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const t = setTimeout(() => setToast(null), 2400);
		return () => clearTimeout(t);
	}, [toast]);
	const handleAddToCart = (product, qty = 1) => {
		addToCart(product.id, qty);
		notify("Added to cart");
	};
	const handleBuy = () => {
		setSelected(null);
		setDialog("checkout");
	};
	const grouped = ALL_CATEGORIES.reduce((acc, cat) => {
		acc[cat.name] = products.filter((p) => p.category === cat.name);
		return acc;
	}, {});
	const populatedCategories = ALL_CATEGORIES.filter((c) => (grouped[c.name]?.length ?? 0) > 0);
	ALL_CATEGORIES.filter((c) => (grouped[c.name]?.length ?? 0) === 0);
	const richCategories = categories;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden pt-24 pb-14 sm:pt-28",
				style: { background: "linear-gradient(135deg, #0B2545 0%, #134074 45%, #2F73D9 100%)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[5%] top-[-10%] h-[380px] w-[380px] rounded-full border border-white/10 pointer-events-none hidden md:block" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[12%] top-[-4%] h-[270px] w-[270px] rounded-full border border-white/5 pointer-events-none hidden md:block" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl px-4 sm:px-6 relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-white/60 text-sm mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										className: "hover:text-white transition-colors",
										children: "Home"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white",
										children: "Categories"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl font-extrabold text-white sm:text-5xl",
								children: "Shop by Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-white/70 text-base max-w-xl",
								children: "Explore our curated collection of gadgets organized by category. Find exactly what you need."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveCategory(null),
									className: `shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${activeCategory === null ? "bg-gold text-royal-deep" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"}`,
									children: "All"
								}), ALL_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setActiveCategory(c.name === activeCategory ? null : c.name);
										setTimeout(() => {
											document.getElementById(`cat-${c.name.replace(/\s+/g, "-")}`)?.scrollIntoView({
												behavior: "smooth",
												block: "start"
											});
										}, 100);
									},
									className: `shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${activeCategory === c.name ? "bg-white text-royal-deep" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"}`,
									children: c.name
								}, c.name))]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-extrabold text-royal-deep sm:text-3xl",
								children: "Featured Categories"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted-foreground text-sm",
								children: "Shop our most popular product groups"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "hidden sm:flex items-center gap-1 text-sm font-bold text-royal hover:text-royal-deep transition-colors",
								children: ["View all products ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3",
							children: isLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCategoryCard, {}, i)) : richCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								search: { category: c.name },
								className: "group relative aspect-[4/3] overflow-hidden rounded-2xl text-left shadow-[var(--shadow-card)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: c.image,
										alt: c.name,
										loading: "lazy",
										className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-royal-deep/80 via-royal-deep/10 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-royal/0 group-hover:bg-royal/20 transition-colors duration-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute bottom-0 left-0 p-4 sm:p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-base font-extrabold text-white sm:text-xl",
												children: c.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-white/70",
												children: c.count
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300",
												children: ["Shop now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
											})
										]
									})
								]
							}, c.name))
						})]
					}),
					!isLoading && populatedCategories.map((cat) => {
						const catProducts = grouped[cat.name] || [];
						if (catProducts.length === 0) return null;
						const IconComp = cat.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: `cat-${cat.name.replace(/\s+/g, "-")}`,
							className: "mb-14 scroll-mt-28",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComp, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-extrabold text-foreground sm:text-2xl",
										children: cat.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											catProducts.length,
											" product",
											catProducts.length > 1 ? "s" : "",
											" available"
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									search: { category: cat.name },
									className: "flex items-center gap-1 rounded-full border border-border/60 px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-royal/40 hover:bg-sky-soft hover:text-royal",
									children: ["See all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
								children: catProducts.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
									product: p,
									index: idx,
									onOpen: () => setSelected(p),
									onAdd: () => handleAddToCart(p, 1),
									onBuy: handleBuy
								}, p.id))
							})]
						}, cat.name);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-extrabold text-foreground sm:text-2xl",
									children: "More Categories"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Expanding catalog — new products arriving soon"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
							children: isLoading ? Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCategoryTile, {}, i)) : ALL_CATEGORIES.map((cat) => {
								const IconComp = cat.icon;
								const count = grouped[cat.name]?.length ?? 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									search: { category: cat.name },
									id: `cat-${cat.name.replace(/\s+/g, "-")}`,
									className: "group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 text-center transition-all duration-300 hover:border-royal/30 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComp, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-sm font-bold text-foreground",
											children: cat.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: count > 0 ? `${count} product${count > 1 ? "s" : ""}` : "Coming soon"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-0.5 text-[11px] font-bold text-royal opacity-0 group-hover:opacity-100 transition-opacity",
											children: ["Browse ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
										})
									]
								}, cat.name);
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductModal, {
				product: selected,
				onClose: () => setSelected(null),
				onAdd: (qty) => handleAddToCart(selected, qty),
				onBuy: handleBuy
			}),
			dialog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				onClose: () => setDialog(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-extrabold text-royal-deep",
							children: "Ready to Checkout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "This is a demo store. Checkout is not enabled yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDialog(null),
							className: "mt-7 w-full rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep",
							children: "Continue Browsing"
						})
					]
				})
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-float)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), toast]
			})
		]
	});
}
//#endregion
export { CategoriesPage as component };
