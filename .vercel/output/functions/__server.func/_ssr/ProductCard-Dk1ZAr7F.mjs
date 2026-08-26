import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { c as useWishlist, o as formatPrice } from "./Footer-CRWS6sk9.mjs";
import { U as Heart, d as Star, j as Minus, n as X, w as Plus } from "../_libs/lucide-react.mjs";
import { t as LazyImage } from "./SkeletonCard-C6Aiiu2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-Dk1ZAr7F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ProductModal({ product, onClose, onAdd, onBuy }) {
	const [active, setActive] = (0, import_react.useState)(product.gallery[0]);
	const [qty, setQty] = (0, import_react.useState)(1);
	const { toggleWishlist, isInWishlist } = useWishlist();
	const isFav = isInWishlist(product.id);
	(0, import_react.useEffect)(() => {
		setActive(product.gallery[0]);
		setQty(1);
	}, [product]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "document",
			className: "grid max-h-[calc(100vh-2rem)] gap-8 overflow-y-auto p-6 sm:p-8 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative aspect-square overflow-hidden rounded-2xl bg-sky-soft/60",
				children: product.gallery.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `absolute inset-0 transition-opacity duration-500 ${active === g ? "opacity-100" : "opacity-0 pointer-events-none"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						src: g,
						alt: i === 0 ? product.name : "",
						className: "h-full w-full object-cover"
					})
				}, g))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-3 gap-3",
				children: product.gallery.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActive(g),
					type: "button",
					"aria-label": `View product image ${product.gallery.indexOf(g) + 1}`,
					"aria-pressed": active === g,
					className: `relative aspect-square overflow-hidden rounded-xl border-2 transition-colors ${active === g ? "border-royal" : "border-transparent hover:border-royal/30"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						src: g,
						alt: "",
						className: "h-full w-full object-cover"
					})
				}, g))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-extrabold text-foreground",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-1.5 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex text-gold",
								children: [
									0,
									1,
									2,
									3,
									4
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									className: "h-4 w-4",
									fill: "currentColor",
									strokeWidth: 0
								}, i))
							}),
							product.rating,
							" rating"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-3xl font-extrabold text-royal",
							children: formatPrice(product.price)
						}), product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base text-muted-foreground line-through",
							children: formatPrice(product.oldPrice)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Quantity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-full border border-border px-3 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Decrease quantity",
									disabled: qty === 1,
									onClick: () => setQty((q) => Math.max(1, q - 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 text-center text-sm font-bold",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Increase quantity",
									onClick: () => setQty((q) => q + 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onAdd(qty),
								className: "flex-1 rounded-full border border-royal/30 px-5 py-3 text-sm font-bold text-royal transition-colors hover:bg-sky-soft",
								children: "Add to Cart"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onBuy,
								className: "flex-1 rounded-full bg-royal px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep",
								children: "Buy Now"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleWishlist(product.id),
								className: `rounded-full border p-3.5 transition-colors ${isFav ? "border-rose-500/20 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20" : "border-border text-muted-foreground hover:bg-sky-soft hover:text-foreground"}`,
								"aria-label": isFav ? "Remove from wishlist" : "Add to wishlist",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									className: "h-5 w-5",
									fill: isFav ? "currentColor" : "none"
								})
							})
						]
					})
				]
			})]
		})
	});
}
function Overlay({ children, onClose }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-royal-deep/40 p-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Product details",
			onClick: (e) => e.stopPropagation(),
			className: "relative my-auto w-full max-w-4xl rounded-3xl bg-card shadow-[var(--shadow-float)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Close",
				onClick: onClose,
				className: "absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground/70 transition-colors hover:bg-sky-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			}), children]
		})
	});
}
function ProductCard({ product, onOpen, onAdd, onBuy, index = 0 }) {
	const stagger = Math.min(index, 7);
	const { isInWishlist, toggleWishlist } = useWishlist();
	const wishlisted = isInWishlist(product.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `animate-fade-in-up stagger-${stagger + 1} group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-[var(--shadow-card)]`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square overflow-hidden bg-sky-soft/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onOpen,
					className: "relative block h-full w-full",
					"aria-label": `View ${product.name}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						src: product.image,
						alt: product.name,
						className: "h-full w-full object-cover transition-all duration-500 group-hover:scale-105 animate-product-pulse",
						style: { animationDelay: `${index * .4}s` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => {
						e.stopPropagation();
						toggleWishlist(product.id);
					},
					className: "absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-card/85 text-foreground border border-border/50 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-card hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200",
					"aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 transition-all duration-300 ${wishlisted ? "fill-red-500 text-red-500 scale-105" : "text-muted-foreground"}` })
				}),
				product.discount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-3 top-3 z-10 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-royal-deep",
					children: [product.discount, "% OFF"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-block rounded-full bg-sky-soft px-2 py-0.5 text-[10px] font-bold text-royal w-fit",
					children: product.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-[15px] font-bold leading-snug text-foreground line-clamp-2",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex text-gold",
						children: [
							0,
							1,
							2,
							3,
							4
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							className: "h-3.5 w-3.5",
							fill: "currentColor",
							strokeWidth: 0
						}, i))
					}), product.rating]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-extrabold text-royal",
						children: formatPrice(product.price)
					}), product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground line-through",
						children: formatPrice(product.oldPrice)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex min-h-10 gap-2 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onAdd,
						type: "button",
						"aria-label": `Add ${product.name} to cart`,
						className: "min-h-10 flex-1 rounded-full border border-royal/25 px-3 py-2 text-xs font-bold text-royal transition-colors hover:bg-sky-soft active:scale-95",
						children: "Add to Cart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onBuy,
						type: "button",
						"aria-label": `Buy ${product.name} now`,
						className: "min-h-10 flex-1 rounded-full bg-royal px-3 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-royal-deep active:scale-95",
						children: "Buy Now"
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as n, ProductModal as r, Overlay as t };
