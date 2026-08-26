import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useWishlist, n as Navbar, s as products, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { O as Package, U as Heart, Z as CircleCheck, s as Trash2 } from "../_libs/lucide-react.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { o as SkeletonProductGrid } from "./SkeletonCard-C6Aiiu2v.mjs";
import { n as ProductCard, r as ProductModal } from "./ProductCard-Dk1ZAr7F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-CtE871kD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function WishlistPage() {
	const { items, clearWishlist, removeFromWishlist } = useWishlist();
	const { cartCount, addToCart } = useCart();
	const [toast, setToast] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const wishlistedProducts = items.map((id) => products.find((p) => p.id === id)).filter(Boolean);
	(0, import_react.useEffect)(() => {
		const frame = requestAnimationFrame(() => setIsLoading(false));
		return () => cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(id);
	}, [toast]);
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	const handleAddToCart = (product, qty = 1) => {
		addToCart(product.id, qty);
		notify(`Added "${product.name}" to cart`);
	};
	const handleBuy = (product) => {
		addToCart(product.id, 1);
		notify(`Added to cart. Redirecting...`);
		window.location.href = "/cart";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-24 pb-10 sm:pt-28",
				style: { background: "linear-gradient(135deg, #0B2545 0%, #134074 40%, #2F73D9 100%)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-extrabold text-white sm:text-4xl",
							children: "My Wishlist"
						}), wishlistedProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-white/70 text-sm",
							children: [
								wishlistedProducts.length,
								" item",
								wishlistedProducts.length > 1 ? "s" : "",
								" saved"
							]
						})] }), wishlistedProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: clearWishlist,
							className: "flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold text-white transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Clear All"]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonProductGrid, { count: 4 }) : wishlistedProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center gap-5 py-20 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative grid h-28 w-28 place-items-center rounded-full bg-sky-soft text-royal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-12 w-12 text-royal/40" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-bold text-foreground",
							children: "Your wishlist is empty"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: "Tap the heart icon on any gadget in our catalog to save it for later."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-3 justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Browse Catalog"]
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: wishlistedProducts.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative group",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
							product: p,
							index: idx,
							onOpen: () => setSelected(p),
							onAdd: () => handleAddToCart(p),
							onBuy: () => handleBuy(p)
						})
					}, p.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
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
export { WishlistPage as component };
