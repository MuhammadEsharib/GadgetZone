import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Navbar, s as products, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { D as Percent, Y as Clock, Z as CircleCheck, q as Flame } from "../_libs/lucide-react.mjs";
import { t as LiveVisitors } from "./LiveVisitors-BGuUhSx6.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { o as SkeletonProductGrid } from "./SkeletonCard-C6Aiiu2v.mjs";
import { n as ProductCard, r as ProductModal } from "./ProductCard-Dk1ZAr7F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deals-BNanSXKs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Deals() {
	const { cartCount, addToCart } = useCart();
	const navigate = useNavigate();
	const [toast, setToast] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(52335);
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	(0, import_react.useEffect)(() => {
		const frame = requestAnimationFrame(() => setIsLoading(false));
		const timer = setInterval(() => {
			setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
		}, 1e3);
		return () => {
			clearInterval(timer);
			cancelAnimationFrame(frame);
		};
	}, []);
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
	const formatTime = (seconds) => {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor(seconds % 3600 / 60);
		const s = seconds % 60;
		return {
			hours: String(h).padStart(2, "0"),
			minutes: String(m).padStart(2, "0"),
			seconds: String(s).padStart(2, "0")
		};
	};
	const timeObj = formatTime(timeLeft);
	const dealProducts = products.filter((p) => p.discount && p.discount > 0);
	const mockStocks = {
		1: {
			left: 4,
			total: 20
		},
		2: {
			left: 7,
			total: 30
		},
		3: {
			left: 9,
			total: 25
		},
		4: {
			left: 3,
			total: 15
		},
		6: {
			left: 12,
			total: 40
		},
		7: {
			left: 8,
			total: 20
		},
		8: {
			left: 15,
			total: 35
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-24 sm:pt-28 md:pt-32" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-12 md:p-16 border border-white/10 mb-12 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/5 pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-12 bottom-4 w-32 h-32 rounded-full border border-dashed border-white/5 pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 max-w-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/25 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-wider",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5" }), " Flash Tech Sale"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl font-extrabold sm:text-5xl tracking-tight leading-none text-white",
										children: "Limited Time Deals"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-white/75 leading-relaxed font-medium",
										children: "Claim premium gadgets at special reduced prices. Offers only valid while stock remains. Exclusive shipment discounts apply."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm self-start md:self-auto shrink-0 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }), " Offer Ends In"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-3",
									children: [
										{
											value: timeObj.hours,
											label: "Hrs"
										},
										{
											value: timeObj.minutes,
											label: "Mins"
										},
										{
											value: timeObj.seconds,
											label: "Secs"
										}
									].map((unit, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center",
										children: [idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl font-bold text-white/40 mr-3",
											children: ":"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-2xl sm:text-3xl font-extrabold bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white",
												children: unit.value
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold text-white/50 block mt-1",
												children: unit.label
											})]
										})]
									}, idx))
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-border/60 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-5 w-5 text-royal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-extrabold text-foreground",
							children: "Discount Items"
						})]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonProductGrid, { count: 4 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: dealProducts.map((p, idx) => {
							const stock = mockStocks[p.id] || {
								left: 5,
								total: 20
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group flex flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-4 right-4 z-10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full bg-destructive/15 border border-destructive/20 px-2 py-0.5 text-[9px] font-bold text-destructive",
											children: [
												"Only ",
												stock.left,
												" Left"
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
										product: p,
										index: idx,
										onOpen: () => setSelected(p),
										onAdd: () => handleAddToCart(p, 1),
										onBuy: handleBuy
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3.5 px-1 space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-[10px] font-semibold text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Claimed: ",
												Math.round((stock.total - stock.left) / stock.total * 100),
												"%"
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												stock.left,
												" / ",
												stock.total,
												" left"
											] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 w-full bg-sky-soft rounded-full overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-royal transition-all duration-500 rounded-full",
												style: { width: `${(stock.total - stock.left) / stock.total * 100}%` }
											})
										})]
									})
								]
							}, p.id);
						})
					})]
				})]
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
//#endregion
export { Deals as component };
